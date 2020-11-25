import React from "react";
import {
  View,
  Text,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Button,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { useSelector, useDispatch } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";

import * as types from "../store/actionTypes";
import {
  formatYYYY_MM_DDFromDate,
  formatYYYYMMDDFromDate,
} from "../utils/dateFormatUtil";

const styles = StyleSheet.create({
  workoutListItemButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  workoutListItemText: {
    fontSize: 20,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    minHeight: 200,
  },
  modalTitle: {
    fontSize: 18,
  },
  inlineView: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  repCountInput: {
    borderWidth: 1,
    borderColor: "black",
    paddingVertical: 0,
    paddingHorizontal: 5,
  },
  buttonsWrapper: {
    flex: 1,
    flexDirection: "row",
    // height: 20,
  },
  modalButton: {
    marginHorizontal: 5,
    backgroundColor: "blue",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    textAlign: "center",
    height: 40,
  },
  modalButtonText: {
    color: "white",
  },
});

const HomeWorkoutList = ({ route, navigation }) => {
  const { date } = route.params;
  

  const [modalVisible, setModalVisible] = React.useState(false);
  const [selectedWorkout, setSelectedWorkout] = React.useState("");
  const [repCount, setRepCount] = React.useState(0);
  const [score, setScore] = React.useState(0);
  const [workouts, setWorkouts] = React.useState([
    { name: "Squat" },
    { name: "Push Up" },
    { name: "Deadlift" },
    { name: "Sit Up" },
    { name: "Shoulder Press" },
  ]);

  const dispatch = useDispatch();

  const setWorkoutAndPopModal = (workoutName) => {
    setSelectedWorkout(workoutName);
    setModalVisible(true);
  };

  const setRepCountWrapper = (text) => {
    if (text === "") setRepCount(0);
    else setRepCount(Math.abs(parseInt(text)));
  };

  const renderWorkoutListItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.workoutListItemButton}
        onPress={() => setWorkoutAndPopModal(item.name)}
      >
        <Text style={styles.workoutListItemText}>{item.name}</Text>
      </TouchableOpacity>
    );
  };
  const dispatchAddWorkoutsToDate_AI = () => {
    if (repCount == 0) return;
    else {
      dispatch({
        type: types.ADD_WORKOUTS_TO_DATE,
        payload: {
          formattedDate: date,
          workoutType: selectedWorkout,
          workoutRepCount: repCount,
          workoutScore: score,
        },
      });

      setRepCount(0);
      setModalVisible(false);
      navigation.navigate("WorkoutScreen");
    }
  };
  const dispatchAddWorkoutsToDate = () => {
    if (repCount == 0) return;
    else {
      dispatch({
        type: types.ADD_WORKOUTS_TO_DATE,
        payload: {
          formattedDate: date,
          workoutType: selectedWorkout,
          workoutRepCount: repCount,
          workoutScore: score,
        },
      });

      setRepCount(0);
      setModalVisible(false);
    }
  };

  return (
    <View>
      <Modal animationType="fade" transparent={true} visible={modalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>{selectedWorkout}</Text>
            <View style={styles.inlineView}>
              <Text>Count:</Text>
              <TextInput
                keyboardType="numeric"
                onChangeText={(text) => setRepCountWrapper(text)}
                value={repCount.toString()}
                style={styles.repCountInput}
              />
            </View>

            {selectedWorkout === "Squat" && (
              <View style={styles.inlineView}>
                <Text>Score: {score}</Text>
                <TouchableOpacity
                  onPress={() => dispatchAddWorkoutsToDate_AI()}
                  style={{ ...styles.modalButton, backgroundColor: "#00BFEA" }}
                >
                  <Text style={styles.modalButtonText}>AI-Valuate™</Text>
                </TouchableOpacity>
              </View>
            )}

            <View style={styles.buttonsWrapper}>
              <TouchableOpacity
                onPress={() => dispatchAddWorkoutsToDate()}
                style={styles.modalButton}
              >
                <Text style={styles.modalButtonText}>Add</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={styles.modalButton}
              >
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <FlatList
        data={workouts}
        renderItem={renderWorkoutListItem}
        keyExtractor={(item) => item.name}
      />
    </View>
  );
};

export default HomeWorkoutList;
