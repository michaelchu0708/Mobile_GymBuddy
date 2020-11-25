

import { formatYYYYMMDDFromDate } from "./dateFormatUtil";

export const accumulateExercisesData = ({
  list,
  todayNumber,
  todayDate,
  period,
}) => {
  let reps = 0,
    sets = 0,
    workouts = 0,
    volume = 0;
  // const todayNumber = parseInt(todayNumber, 10);
  const startDateNumber = calculateStartDate({ today: todayDate, period });
  for (const key in list) {
    if (list.hasOwnProperty(key)) {
      if (belongToRange({ startDateNumber, todayNumber, key })) {
        workouts++;
        //date loop
        [list[key].workouts].map((item, index) => {
          // console.log("item",item)
          // [item].forEach(e=>{
          //   console.log("E",e)
          // })
          Object.values(item).map(e=>{
            if(e.repCount){
              reps += e.repCount
            }
          })

          // if (item.weightRepsDataArr?.length) {
          //   item.weightRepsDataArr.map((item, index) => {
          //     if (item.reps && item.weight) {
          //       reps += parseInt(item.reps);
          //       volume += item.reps * item.weight;
          //     }
          //   });
          // }
        });
      }
    }
  }
  return { sets, reps, workouts, volume };
};

export const belongToRange = ({ startDateNumber, todayNumber, key }) => {
  const keyString = key.replace('-','').replace('-','')
  // console.log("ABC",startDateNumber, todayNumber, keyString )
  return keyString  >= startDateNumber && keyString <= todayNumber;
};

export const calculateStartDate = ({ today, period }) => {
  const date = new Date(today.getTime() - period * 24 * 3600 * 1000);
  const year = date.getFullYear();
  const month =
    date.getMonth() + 1 > 9 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`;
  const day = date.getDate() > 9 ? date.getDate() : `0${date.getDate()}`;
  return ""+ year + month + day;
};
