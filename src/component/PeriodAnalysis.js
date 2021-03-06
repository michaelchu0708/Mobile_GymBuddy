import React, { Component } from "react";
import { View, Text, StyleSheet, Dimensions ,Button,TouchableOpacity} from "react-native";
import ModalDropdown from "./ModalDropDown";
import { connect } from "react-redux";
import { formatYYYYMMDDFromDate } from "../utils/dateFormatUtil";
import { accumulateExercisesData } from "../utils/accumulateExercisesData";
import LoadingUtil from "../utils/LoadingUtil";

// data source:  state.savedExerciseForEachDay.allExercisesList
const { width } = Dimensions.get("window");

class _PeriodAnalysis extends Component {
  state = {
    newAllExerciseList: {},
    selectedCategory: "",
    selectedIndex: 0,
    sets: 0,
    reps: 0,
    workouts: 0,
    volume: 0,
  };

  handleSelect = (index, value) => {
    this.setState({ selectedCategory: value, selectedIndex: index });
  };
  handleSetData = period => {
    const todayDate = new Date();
    const todayDateYYYYMMDD = formatYYYYMMDDFromDate(todayDate);
    const { sets, reps, volume, workouts } = accumulateExercisesData({
      // list: this.props.newAllExerciseListWithout_,
      list: this.props.markedDates,
      todayNumber: parseInt(todayDateYYYYMMDD, 10),
      todayDate,
      period: period,
    });
    this.setState({
      sets,
      reps,
      volume,
      workouts,
    });
  };
  handleConfirmPressed = async () => {
    // console.warn("enterConfirmPressed",this.state.selectedIndex);
    await LoadingUtil.showLoading();
    switch (parseInt(this.state.selectedIndex)) {
      case 0:
        this.handleSetData(0);
        break;
      case 1:
        this.handleSetData(7);
        break;
      case 2:
        this.handleSetData(30);
        break;
      case 3:
        this.handleSetData(180);
        break;
      case 4:
        this.handleSetData(365);
        break;
    }
    await LoadingUtil.dismissLoading();
  };

  render() {
    //convert date from 2019-05-19 to 20190519 and then convert to number
    // so that these dates can be compared easily
    return (
      <View style={styles.wholeContainer}>
        <View style={styles.dropdownContainer}>
          <ModalDropdown
            style={[styles.dropdownMenu]}
            textStyle={[styles.dropdownMenuText]}
            dropdownStyle={[styles.dropdownList]}
            dropdownTextStyle={[styles.dropdownListText]}
            dropdownTextHighlightStyle={[styles.dropdownSelection]}
            options={["Today", "7 Days", "1 Month", "6 Months", "1 Year"]}
            defaultValue={"Today"}
            onSelect={this.handleSelect.bind(this)}
          />

          <TouchableOpacity
            style={[styles.confirmButton]}
            containerStyle={styles.confirmButton}
            onPress={this.handleConfirmPressed.bind(this)}
            title="Confirm"
          >
              <Text
                key="confirm"
                style={{
                  color: "#c69",
                  fontSize: 16,
                }}>
                Confirm
              </Text>
          </TouchableOpacity>
        </View>
        <View style={{ marginTop: -40 }}>
          <View style={styles.textLine}>
            {/* <Text style={styles.textTerm}>Sets:{this.state.sets}</Text> */}
            <Text style={styles.textTerm}>Reps:{this.state.reps}</Text>
          </View>
          <View style={styles.textLine}>
            <Text style={styles.textTerm}>Workouts:{this.state.workouts}</Text>
            {/* <Text style={styles.textTerm}>Volume:{this.state.volume} KG</Text> */}
          </View>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  markedDates: state.calendar.markedDates,
  newAllExerciseListWithout_:
    state.savedExerciseForEachDay.newAllExerciseListWithout_,
});

export const PeriodAnalysis = connect(
  mapStateToProps,
  null
)(_PeriodAnalysis);

const styles = StyleSheet.create({
  wholeContainer: {
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: "#c69",
    margin: 10,
    shadowColor: "#666",
    shadowOffset: { height: 5, width: 5 },
    shadowOpacity: 1.0,
  },
  analysisTitle: {
    color: "#ddd",
    fontSize: 22,
    height: 30,
    // textAlign: "center",
    margin: 10,
    marginLeft: 0,
    // marginTop:5,
    marginBottom: 0,
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "PattayaRegular",
  },
  textLine: {
    flexDirection: "row",
    height: 30,
  },
  textTerm: {
    fontSize: 16,
    color: "#ddd",
    width: width * 0.4,
    marginLeft: width * 0.04,
  },
  dropdownContainer: {
    // shadowColor: "transparent",
    // shadowOpacity: 0,
    height: 110,
    padding: width * 0.03,
    paddingTop: width * 0.02,
    flexDirection: "row",
  },
  dropdownMenu: {
    width: width * 0.28,
    height: 40,
    borderRadius: 6,
    marginRight: width * 0.02,
    borderWidth: 1.5,
    borderColor: "#c69",
    fontWeight: "bold",

    // backgroundColor:'#EEE',
    justifyContent: "center",
  },
  dropdownMenuText: {
    marginLeft: 10,
    fontSize: 18,
    color: "#c69",
  },
  dropdownList: {
    width: width * 0.28,
    marginTop: 15,
  },
  dropdownListText: {
    fontSize: 18,
    marginLeft: 10,
    color: "#c69",
  },
  dropdownSelection: {
    color: "#00cccc",
  },
  confirmButton: {
    backgroundColor: "rgba(200,200,200,0.1)",
    marginLeft: 36,
    height: 40,
    width: width * 0.25,
    borderColor: "#c69",
    borderWidth: 1.5,
    // fontWeight: "bold",
  },
});
