import React from 'react';
import { ScrollView, View, Text, Button, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
    marginVertical: 5,
    backgroundColor: '#FA8072'
  },
  text: {
    color: 'white',
    fontSize: 17
  }
});

const ListWorkoutsOfDate = (props) => {
  const markedDates = useSelector(state => state.calendar.markedDates);
  let workoutsArray = [];

  if (markedDates[props.date]) {
    Object.keys(markedDates[props.date].workouts).forEach(key => {
      workoutsArray.push({
        name: key,
        repCount: markedDates[props.date].workouts[key].repCount,
        score: markedDates[props.date].workouts[key].score
      });
    });
  }

  return (
    <View>
      {
        workoutsArray.map((workoutItem) => {
          return(
            <View key={workoutItem.name} style={styles.itemContainer}>
              {(workoutItem.name === 'Squat') && (
                <Text style={styles.text}>{workoutItem.name}, Rep Count: {workoutItem.repCount}, AI-Valuate Score: {workoutItem.score}</Text>
              )}
              {(workoutItem.name !== 'Squat') && (
                <Text style={styles.text}>{workoutItem.name}, Rep Count: {workoutItem.repCount}</Text>
              )}
            </View>
          )
        })
      }
    </View>
  )
}

export default ListWorkoutsOfDate;