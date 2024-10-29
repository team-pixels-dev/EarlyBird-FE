import { useMemo, useState } from "react";
import { mergeDateTime } from "@/util/date_formatting";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/modules/redux/root-reducer";
import { useMinuteChangeEffect } from "./useMinuateChange";
import { useScheduleTimes } from "./useScheduleTimes";
import { setFinalExecuteMode } from "@/modules/redux/slice/execute-schedule-data-slice";



export function useExecuteMode() {  
  const final_excute_mode = useSelector((state: RootState)=>state.executeScheduleData.final_excute_mode);
  const scheduleDateTime = new Date(useSelector((state: RootState)=>state.scheduleCache.schedule_date));
  const { startDateTime, moveDateTime } = useScheduleTimes();
  
  const dispatch = useDispatch();

  const currentMinute = useMinuteChangeEffect(()=>{
    const now = new Date();
    const remain_time_for_ready = Math.floor((startDateTime.getTime() - now.getTime()) / 60000) + 1;
    const remain_time_for_move = Math.floor((moveDateTime.getTime() - now.getTime()) / 60000) + 1;
    const remain_time_for_schedule = Math.floor((scheduleDateTime.getTime() - now.getTime()) / 60000) + 1;

    if(remain_time_for_ready > 0 && final_excute_mode !== "before_start"){
      dispatch(setFinalExecuteMode("before_start"));
    } else if (remain_time_for_ready <= 0
      && final_excute_mode === "before_start"
      && remain_time_for_schedule > 0) {
      dispatch(setFinalExecuteMode("wait_start")); // 조건을 충족하면 wait_start 모드로 진입
    } else if (remain_time_for_move <= 0
      && final_excute_mode === "ready"
      && remain_time_for_schedule > 0) { // 조건을 충족하면 자동으로 moving 모드 진입
      dispatch(setFinalExecuteMode("moving"));
    } else if (remain_time_for_schedule <= 1
      && remain_time_for_schedule >= -2
      && final_excute_mode === "moving") {
      dispatch(setFinalExecuteMode("wait_done")); 
    } else if (remain_time_for_schedule < -10){
      dispatch(setFinalExecuteMode("done"));
    }
  });
  return currentMinute;
}
