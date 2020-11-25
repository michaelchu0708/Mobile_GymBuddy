import * as types from "./actionTypes";

//currentWorkout Modals
export const setExerciseModalVisibility = visible => ({
    type: types.UPDATE_WEIGHT_DATA,
    payload:visible
})
export const setAddWeightModalVisibilityAction = visible => ({
    type: types.SET_ADD_WEIGHT_MODAL_VISIBILITY,
    payload:visible
})
export const setEditWeightRepsModalVisibilityAction = visible => ({
    type: types.SET_EDIT_WEIGHT_REPS_MODAL_VISIBILITY,
    payload:visible
})
export const addExerciseAction = exercise => ({
    type: types.ADD_EXERCISE,
    payload:exercise
})
export const addExerciseToSectionListAction = exercise => ({
    type: types.ADD_EXERCISE_TO_SECTIONLIST,
    payload:exercise
})
export const deleteExerciseFromSectionListAction = exercise => ({
    type: types.DELETE_EXERCISE_FROM_SECTIONLIST,
    payload:exercise
})
export const clearCurrentWorkoutAction = () => ({
    type: types.CLEAR_CURRENT_WORKOUT
})
export const updateEmptyAction = bool => ({
    type: types.UPDATE_EMPTY,
    payload:bool
})
export const setCurrentDateAction = date => ({
    type: types.SET_CURRENT_DATE,
    payload:date
})
export const addMarkedDateAction = date => ({
    type: types.ADD_MARKED_DATE,
    payload:date
})
export const addNewExerciseListAction = data => ({
    type: types.ADD_NEW_EXERCISE_LIST,
    payload:data
})
export const addWeightToExercisesAction = data => ({
    type: types.ADD_WEIGHT_TO_EXERCISE,
    payload:data
})
export const editWeightRepsInWorkoutAction = data => ({
    type: types.EDIT_WEIGHT_REPS_IN_EXERCISE,
    payload:data
})
export const deleteExerciseFromWorkoutListAction = data => ({
    type: types.DELETE_EXERCISE_FROM_WORKOUTLIST,
    payload:data
})
// export const updateWeightBFRFromProgressPicsAction = data =>
//   createAction(types.UPDATE_WEIGHT_BFR_FROM_PROGRESS_PICS)(data);

export const update_exercise_score = data =>({
    type: types.UPDATE_EXERCISE_SCORE,
    payload: data
})

//statistic 
export const updateWeightAction = data => {
    return {
        type: types.UPDATE_WEIGHT_DATA,
        payload:data
    }
}
export const updateBfrAction = data =>{
    return {
        type: types.UPDATE_BFR_DATA,
        payload:data
    }
}
//calendar

export const setEditHistoryExerciseModalVisibilityAction = data => ({
    type: types.SET_EDIT_HISTORY_EXERCISE_MODAL_VISIBILITY,
    payload:data
})
export const addHistoryMarkedDateAction = data => ({
    type: types.ADD_HISTORY_MARKED_DATE,
    payload:data
})
export const setCalendarEditHistoryAddWeightModalVisibilityAction = data => ({
    type: types.SET_CALENDAR_EDIT_HISTORY_ADD_WEIGHT_MODAL_VISIBILITY,
    payload:data
})
export const setCalendarEditHistoryEditWeightRepsModalVisibilityAction = data => ({
    type: types.SET_CALENDAR_EDIT_HISTORY_EDIT_WEIGHT_REPS_MODAL_VISIBILITY,
    payload:data
})
export const addWeightRepsToExerciseInCalendarHistoryAction = data => ({
    type: types.ADD_WEIGHT_REPS_TO_EXERCISE_IN_CALENDAR_HISTORY,
    payload:data
})
export const editWeightRepsInWorkoutOfCalendarHistoryAction = data => ({
    type: types.EDIT_WEIGHT_REPS_IN_WORKOUT_OF_CALENDAR_HISTORY_ACTION,
    payload:data
})
export const addExercisesToExerciseListOfWorkoutHistoryAction = data => ({
    type: types.ADD_EXERCISES_TO_EXERCISE_LIST_OF_WORKOUT_HISTORY,
    payload:data
})
export const addExerciseListToWorkoutHistoryAction = data => ({
    type: types.ADD_EXERCISES_LIST_TO_WORKOUT_HISTORY,
    payload:data
})
export const deleteExercisesFromExerciseListOfWorkoutHistoryAction = data => ({
    type: types.DELETE_EXERCISES_FROM_EXERCISE_LIST_OF_WORKOUT_HISTORY,
    payload:data
})
export const setReminderModalInEditHistoryAction = data => ({
    type: types.SET_REMINDER_MODAL_IN_EDIT_HISTORY,
    payload:data
})

//Set notifications
export const setNotificationModalVisibilityAction = data => ({
    type: types.SET_NOTIFICATION_MODAL_VISIBILITY,
    payload:data
})
export const chooseDayInWeekAction = data => ({
    type: types.CHOOSE_DAY_IN_WEEK,
    payload:data
})

// Ken's custom actions
export const addWorkoutsToDate = data => ({
    type: types.ADD_WORKOUTS_TO_DATE,
    payload: data
})

export const deleteWorkoutsFromDate = data => ({
    type: types.DELETE_WORKOUTS_FROM_DATE,
    payload: data
});