import React from 'react';
import { View, Text, ScrollView,Button, StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native'
import { useSelector, useDispatch } from 'react-redux';

import { TopBar } from "../component/TopBar";
import HomeWorkoutList from './HomeWorkoutList';
import * as types from "../store/actionTypes";
import {
  formatYYYY_MM_DDFromDate,
  formatYYYYMMDDFromDate,
} from "../utils/dateFormatUtil";
import ListWorkoutsOfDate from '../component/ListWorkoutsOfDate';

const HomePageStack = createStackNavigator();

const HomePage = ({navigation}) => {
  // const navigation = useNavigation();
  const dispatch = useDispatch();

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
      <TopBar style={styles.topBar}>
          <Text style={styles.textBar}>Home</Text>
      </TopBar>
      <ScrollView>
        <View>
          <Button
            title="Add Workout to Today"
            onPress={() =>
              navigation.navigate('HomeWorkoutList', {
                date: formatYYYY_MM_DDFromDate(new Date())
              })
            }
          />
          <Button
            title="Reset Workouts of Today"
            onPress={() => dispatch({
              type: types.DELETE_WORKOUTS_FROM_DATE,
              payload: {
                formattedDate: formatYYYY_MM_DDFromDate(new Date())
              }
            })}
          />
        </View>
        <ListWorkoutsOfDate
          date={formatYYYY_MM_DDFromDate(new Date())}
        />
      </ScrollView>
    </View>
  )
}

const HomePageStackScreen = () => {
  return (
    <HomePageStack.Navigator>
      <HomePageStack.Screen options={{headerShown: false}} name='HomePage' component={HomePage}/>
      <HomePageStack.Screen options={{title: 'Add Workout'}} name='HomeWorkoutList' component={HomeWorkoutList}/>
    </HomePageStack.Navigator>
  )
}

export default HomePageStackScreen;