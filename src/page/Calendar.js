import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  FlatList,
  TouchableWithoutFeedback,
  Dimensions,
  ScrollView, 
  Button
} from "react-native";
import { Calendar as CalendarComp } from "react-native-calendars";
import { connect } from "react-redux";
import { LinearGradient } from 'expo-linear-gradient';
import Icon from "react-native-vector-icons/MaterialIcons";
import { TopBar } from "../component/TopBar";
import {
//   addWeightToExercisesAction,
  deleteExerciseFromWorkoutListAction,
  setEditHistoryExerciseModalVisibilityAction,
  setReminderModalInEditHistoryAction,
  updateEmptyAction,
} from "../store/actions";
// import { AddWeightToExercise } from "../component/AddWeightToExercise";
import { PeriodAnalysis } from "../component/PeriodAnalysis";

import {
  formatYYYY_MM_DDFromDate,
  formatYYYYMMDDFromDate,
} from "../utils/dateFormatUtil";
import { useNavigation } from "@react-navigation/core";

const { width, height } = Dimensions.get("window");

const marginTop = height / width >= 18.5 / 9 ? 35 : 20;

export class _Calendar extends Component {
  state = {
    isModalListVisible: false,
    pressedDay: "",
    displayExercisesList: [],
    time: "",
    showAddWeightModal: false,
  };

  render() {
    // console.warn("allExerciseList", this.props.allExercisesList);
    return (
      <LinearGradient colors={["#1b98d9", "#51c0bb"]} style={{ flex: 1 }}>
        <TopBar style={styles.topBar}>
          {this.props.fontLoaded ? (
            <Text style={styles.textBar}>Calendar</Text>
          ) : null}
        </TopBar>
        <ScrollView>
          {/*<LinearGradient colors={["#1b98d9", "#57c5b8"]} style={{flex: 1}}>*/}
          {/*<View style={{marginTop:30}}>*/}
          {/*</View>*/}
          <View style={{ marginTop: 10 }}>
            <CalendarComp
              theme={{
                // backgroundColor: '#c69',
                calendarBackground: "transparent",
                textSectionTitleColor: "#cc6699",
                // selectedDayBackgroundColor: '#cc6699',
                selectedDayTextColor: "#eee",
                todayTextColor: "#cc6699",
                dayTextColor: "#eee",
                textDisabledColor: "#aaa",
                dotColor: "#00adf5",
                selectedDotColor: "#ffffff",
                arrowColor: "#fff",
                monthTextColor: "#eee",
                indicatorColor: "blue",
                // textDayFontFamily: "PattayaRegular",
                // textMonthFontFamily: "PattayaRegular",
                // textDayHeaderFontFamily: "PattayaRegular",
                textDayFontWeight: "300",
                textMonthFontWeight: "bold",
                textDayHeaderFontWeight: "300",
                textDayFontSize: 16,
                textMonthFontSize: 16,
                textDayHeaderFontSize: 16,
              }}
              pastScrollRange={50}
              futureScrollRange={50}
              scrollEnabled
              markedDates={this.props.markedDates}
              onDayPress={day => {
                const date = day.dateString;
                if (
                  formatYYYY_MM_DDFromDate(new Date()) === date &&
                  !Object.keys(this.props.markedDates).includes(date)
                ) {
                  return;
                }

                this.props.navigation.navigate("Detail", {
                  date: date
                });
                // console.warn(date);
              }}
            />
            <View
              style={{ flexDirection: "row", marginTop: 10, marginLeft: 20 }}>
              <View
                style={{
                  flex: 0.3,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                }}>
                <View
                  style={{
                    width: 22,
                    height: 22,
                    backgroundColor: "#fab839",
                    borderRadius: 11,
                  }}>
                  <Text> </Text>
                </View>
                <Text style={{ color: "#EFEFEF", marginLeft: 10 }}>after</Text>
              </View>
              <View
                style={{
                  flex: 0.3,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                }}>
                <View
                  style={{
                    width: 22,
                    height: 22,
                    backgroundColor: "#c69",
                    borderRadius: 11,
                  }}>
                  <Text> </Text>
                </View>
                <Text style={{ color: "#EFEFEF", marginLeft: 10 }}>
                  on-time
                </Text>
              </View>
              <View
                style={{
                  flex: 0.3,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                }}>
                <View
                  style={{
                    width: 22,
                    height: 22,
                    backgroundColor: "#009966",
                    borderRadius: 11,
                  }}>
                  <Text> </Text>
                </View>
                <Text style={{ color: "#EFEFEF", marginLeft: 10 }}>before</Text>
              </View>
            </View>
          </View>
          {/*<View style={{marginTop: 20}}>*/}
          {/*    <Text style={{color: "#ccc", fontFamily: "PattayaRegular", fontSize: 20, marginLeft: 20}}>*/}
          {/*        Click day in the calendar to check/edit workout history*/}
          {/*    </Text>*/}
          {/*</View>*/}
          <View style={{ marginTop: 20 }}>
            <Text style={styles.analysisTitle}>Analysis</Text>
            <PeriodAnalysis />
          </View>
          <Modal
            visible={this.state.isModalListVisible}
            style={{ flex: 1 }}
            onRequestClose={() => null}>
            <LinearGradient
              colors={["#4a168c", "#880e4f"]}
              style={styles.container}>
              <Button
                style={styles.closeButton}
                onPress={() => {
                  this.setState({
                    isModalListVisible: false,
                  });
                }}
                title="Cancel"
                // children={
                //   <Icon name="cancel" size={24} color="#bbb" key="cancel" />
                // }
              />
              <View style={styles.topTitle}>
                {this.props.fontLoaded ? (
                  <Text style={styles.title}>
                    {parseInt(formatYYYYMMDDFromDate(new Date()), 10) >=
                    parseInt(this.state.pressedDay.replace(/-/g, ""), 10)
                      ? "Workout History"
                      : "Future Plan"}
                  </Text>
                ) : null}
              </View>
              <View style={{ margin: 12 }}>
                {this.props.fontLoaded ? (
                  <Text style={styles.subTitle}>{this.state.pressedDay}</Text>
                ) : null}
              </View>
              <FlatList
                style={{
                  marginTop: 2,
                  borderTopColor: "#ccc",
                  borderTopWidth: 0.6,
                  marginLeft: 15,
                  marginRight: 15,
                  paddingTop: 10,
                }}
                data={this.state.displayExercisesList}
                renderItem={this._renderItem}
                keyExtractor={(item, index) => item + index}
              />
              {/* {this.state.showAddWeightModal && (
                <AddWeightToExercise
                  showAddWeightModal={this.state.showAddWeightModal}
                  handleCloseWeightModal={this.handleCloseWeightModal}
                  addWeightRepsToExercise={this.props.addWeightRepsToExercise}
                  time={this.state.time}
                />
              )} */}
            </LinearGradient>
          </Modal>
        </ScrollView>
      </LinearGradient>
    );
  }

//   handleCloseWeightModal = bool => {
//     this.setState({
//       showAddWeightModal: bool,
//     });
//   };

  _renderItem = ({
    item: { exercise, sets, weight, reps, time, weightRepsDataArr, minutes },
  }) => (
    <TouchableWithoutFeedback
      onPress={async () => {
        await this.setState({ time });
        // await this.setState({ showAddWeightModal: true });
      }}>
      <View style={styles.workoutContainer}>
        <View style={styles.listItem}>
          <View style={{ flex: 0.01 }} />
          <View style={{ flex: 0.75 }}>
            <Text style={styles.exerciseText}>{`  ${exercise}`}</Text>
          </View>
          <View style={{ flex: 0.24 }}>
            <Text style={styles.exerciseText}>
              {minutes ? `${minutes} mins` : `${sets} sets`}
            </Text>
          </View>
        </View>
        {weightRepsDataArr &&
          weightRepsDataArr.length > 0 &&
          weightRepsDataArr.map((item, index) => (
            <View
              style={{ ...styles.listItem, height: 30 }}
              key={item.weight + index + item.time}>
              <Text
                style={{
                  color: "#bbb",
                  marginRight: 20,
                }}>
                {` ${item.weight} KG ✖ ${item.reps} reps`}
              </Text>
            </View>
          ))}
      </View>
    </TouchableWithoutFeedback>
  );
}

const mapStateToProps = state => ({
  markedDates: state.calendar.markedDates,
  allExercisesList: state.savedExerciseForEachDay.allExercisesList,
  exercisesListForPressedDay:
    state.savedExerciseForEachDay.exercisesListForPressedDay,
  sectionExercises: state.exercises.sectionExercises,
  extraSectionExercises: state.exercises.extraSectionExercises,
  checkButtonAvailabilitySets:
    state.editHistoryExercisesList.checkButtonAvailabilitySets,
});

const mapActionsToProps = dispatch => ({
//   addWeightRepsToExercise: data => {
//     dispatch(addWeightToExercisesAction(data));
//   },
  deleteExerciseFromWorkoutList: data => {
    dispatch(deleteExerciseFromWorkoutListAction(data));
  },
  setEditHistoryExerciseModalVisibility: data => {
    dispatch(setEditHistoryExerciseModalVisibilityAction(data));
  },
  setReminderModalInEditHistory: data => {
    dispatch(setReminderModalInEditHistoryAction(data));
  },
  updateEmpty: bool => dispatch(updateEmptyAction(bool)),
});
export const Calendar = connect(
  mapStateToProps,
  mapActionsToProps
)(_Calendar);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: marginTop,
  },
  textBar: {
    textAlign: "center",
    color: "#ddd",
    fontSize: 25,
    // fontFamily: Fonts.PattayaRegular
    // fontFamily: "PattayaRegular",
  },
  topBar: {
    backgroundColor: "transparent",
    justifyContent: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#b0b0b0",
  },
  topTitle: {
    height: 60,
    alignItems: "center",
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#777",
  },
  title: {
    textAlign: "center",
    color: "#ddd",
    fontSize: 26,
    // fontFamily: Fonts.PattayaRegular
    // fontFamily: "PattayaRegular",
  },
  subTitle: {
    textAlign: "center",
    color: "#ddd",
    fontSize: 22,
    // fontFamily: Fonts.PattayaRegular
    // fontFamily: "PattayaRegular",
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    height: 40,
    justifyContent: "flex-end",
    // borderWidth: 1,
    // borderTopWidth:0,
  },
  exerciseText: {
    fontSize: 20,
    color: "#eee",
  },
  setsText: {
    fontSize: 20,
  },
  closeButton: {
    position: "absolute",
    borderColor: "transparent",
    marginTop,
    right: 20,
    top: 10,
    zIndex: 999,
  },
  workoutContainer: {
    borderBottomColor: "#ccc",
    borderBottomWidth: 0.6,
    marginBottom: 10,
    // marginLeft: 10,
    // marginRight: 10
  },
  analysisTitle: {
    color: "#ddd",
    fontSize: 26,
    height: 30,
    // textAlign: "center",
    margin: 10,
    marginLeft: 30,
    // marginTop:5,
    marginBottom: 8,
    alignItems: "center",
    justifyContent: "center",
    // fontFamily: "PattayaRegular",
  },
});
