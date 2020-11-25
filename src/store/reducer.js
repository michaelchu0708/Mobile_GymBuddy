import {healthStatus} from "./reducers/healthStatus"
import {calendar} from "./reducers/calendar"
import { combineReducers } from "redux"
import {savedExerciseForEachDay} from "./reducers/savedExerciseForEachDay"
import {editHistoryExercisesList} from "./reducers/editHistoryExercisesList"
import {exercises} from "./reducers/exercises"

export const reducer = combineReducers({
    healthStatus,
    calendar,
    savedExerciseForEachDay,
    editHistoryExercisesList,
    exercises
})