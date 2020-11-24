import {WORKOUT} from '../actions';

const workout = (state ={}, action)=>{
    switch(action.type){
        case WORKOUT:
            let newState = Object.assign([], state, action.payload.data);
            return newState;
        default:
            return state;
    }
}

export default workout;