export const WORKOUT = 'WORKOUT';

export function updateWorkout(data){
    return{
        type: WORKOUT,
        payload:{
            data
        }
    }
}