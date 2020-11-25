import * as types from "../actionTypes";
import { formatYYYYMMDDFromDate } from "../../utils/dateFormatUtil";

const defaultState = {
  markedDates: {
    // '2020-11-24': {selected: true, marked: true, selectedColor: '#1b98d9'},
    // '2018-11-05': {marked: true},
    // '2018-11-07': {marked: true, dotColor: 'red', activeOpacity: 0},
    // '2018-11-09': {disabled: true, disableTouchEvent: true},
    // '2018-11-11': {selected: true, marked: true, selectedColor: 'orange'}
    // '2018-11-12': {selected: true, marked: true, selectedColor: '#1b98d9'}
    // CUSTOM DATA TYPE EXAMPLE
    // '2020-11-24': {
    //   selected: true,
    //   marked: true,
    //   workouts: {
    //     'Squat': {
    //        repCount: 30,
    //        score: 77
    //     }
    //   }
    // }
  },
  currentDate: "",
  showEditHistory: false,
  showAddWeightModalForEditHistory: false,
  showEditWeightRepsForEditHistory: false,
  workoutHistoryDataSets: [],
};
export const calendar = (state = defaultState, action) => {
  switch (action.type) {
    case types.ADD_DATE:
      return { ...state, currentDate: action.payload };
    case types.ADD_MARKED_DATE:
      return {
        ...state,
        markedDates: {
          ...state.markedDates,
          [action.payload]: {
            selected: true,
            marked: true,
            selectedColor: "#cc6699",
          },
        },
      };
    case types.ADD_HISTORY_MARKED_DATE:
      return {
        ...state,
        markedDates: {
          ...state.markedDates,
          [action.payload]: {
            selected: true,
            marked: true,
            selectedColor:
              parseInt(formatYYYYMMDDFromDate(new Date()), 10) >
              parseInt(action.payload.replace(/-/g, ""), 10)
                ? "#fab839"
                : "#009966",
          },
        },
      };
    case types.SET_EDIT_HISTORY_EXERCISE_MODAL_VISIBILITY:
      return { ...state, showEditHistory: action.payload };
    case types.SET_CALENDAR_EDIT_HISTORY_ADD_WEIGHT_MODAL_VISIBILITY:
      return { ...state, showAddWeightModalForEditHistory: action.payload };
    case types.SET_CALENDAR_EDIT_HISTORY_EDIT_WEIGHT_REPS_MODAL_VISIBILITY:
      return { ...state, showEditWeightRepsForEditHistory: action.payload };
    case types.UPDATE_EXERCISE_SCORE:
      return {
        ...state,
        markedDates: {
          ...state.markedDates,
          [action.payload.formattedDate]: {
            workouts: {
              'Squat':{
                repCount:action.payload.repCount,
                score: action.payload.score,
              }
            },
          },
        },
      };

    case types.ADD_WORKOUTS_TO_DATE:
      let workoutsObject;
      if (!state.markedDates[action.payload.formattedDate]) {
        // No workouts yet
        workoutsObject = {
          [action.payload.workoutType]: {
            repCount: action.payload.workoutRepCount,
            score: action.payload.workoutScore,
          },
        };
      } else {
        workoutsObject = {
          ...state.markedDates[action.payload.formattedDate].workouts,
          [action.payload.workoutType]: {
            repCount: action.payload.workoutRepCount,
            score: action.payload.workoutScore,
          },
        };
      }

      return {
        ...state,
        markedDates: {
          ...state.markedDates,
          [action.payload.formattedDate]: {
            selected: true,
            marked: true,
            selectedColor: "#cc6699",
            workouts: workoutsObject,
          },
        },
      };

    case types.DELETE_WORKOUTS_FROM_DATE:
      return {
        ...state,
        markedDates: {
          ...state.markedDates,
          [action.payload.formattedDate]: {
            selected: false,
            marked: false,
            workouts: {},
          },
        },
      };

    default:
      return state;
  }
};
