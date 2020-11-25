import React from 'react';
import { View, Text, ScrollView,Button, StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native'
import { useSelector, useDispatch } from 'react-redux';

import { TopBar } from "../component/TopBar";
import { Calendar } from "./Calendar";
import HomeWorkoutList from "./HomeWorkoutList"
import * as types from "../store/actionTypes";
import {
  formatYYYY_MM_DDFromDate,
  formatYYYYMMDDFromDate,
} from "../utils/dateFormatUtil";
import ListWorkoutsOfDate from '../component/ListWorkoutsOfDate';

const CalendarPageStack = createStackNavigator();

const DetailPage = ({route, navigation}) => {
    const {date} = route.params;
    const dispatch = useDispatch();

    // const navigation = useNavigation()
    const styles = StyleSheet.create({
      container: {
        backgroundColor: "#ffffff"
      },
      topBar: {
        backgroundColor: "transparent",
        justifyContent: "center",
        borderBottomWidth: 1,
        borderBottomColor: "#b0b0b0",
      },
      textBar: {
        textAlign: "center",
        fontSize: 25,
      },

    });

    return(
      <View style={styles.container}>
        <ScrollView>
          <View>
            <Button
              title={"Add Workout to " + date}
              onPress={() => navigation.navigate('HomeWorkoutList', {
                date: date
              })}
            />
            <Button
            title={"Reset Workouts of " + date}
            onPress={() => dispatch({
              type: types.DELETE_WORKOUTS_FROM_DATE,
              payload: {
                formattedDate: date
              }
            })}
          />
          </View>
          <ListWorkoutsOfDate
            date={date}
          />
        </ScrollView>
      </View>
    )
  }
  
const CalendarPageStackScreen = () => {
    return (
        <CalendarPageStack.Navigator>
            <CalendarPageStack.Screen options={{headerShown: false}} name='Calendar' component={Calendar}/>
            <CalendarPageStack.Screen options={{title: 'Date Details'}} name='Detail' component={DetailPage}/>
            <CalendarPageStack.Screen options={{title: 'Add Workout'}} name='HomeWorkoutList' component={HomeWorkoutList}/>
        </CalendarPageStack.Navigator>
    )
}

export default CalendarPageStackScreen