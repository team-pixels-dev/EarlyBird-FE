import { useEffect } from "react";
import { useScheduleTimes } from "./useScheduleTimes";  // 새로 만든 훅을 임포트
import { useSelector } from "react-redux";
import { RootState } from "@/modules/redux/root-reducer";

export function useScheduleValidation() {
  const { moving_time, preparing_time, remain_time_for_schedule, remain_time_for_ready } = useScheduleTimes();
  const schedule_type = useSelector((state: RootState)=>state.templateScheduleCache.schedule_type);

  function checkScheduleValid() {
    if(schedule_type === "date") {
      if (remain_time_for_schedule <= 0) {
        console.log('약속 시간이 현재시간보다 늦습니다.');
        return "invalid_schedule_time";
      }
      if (remain_time_for_ready <= -5){
        return "invalid_start_time_too_fast";
      }
    }

    if (moving_time <= 0) {
      console.log('출발 시간이 약속 시간보다 늦습니다.');
      return "invalid_move_time";
    }
    if (preparing_time <= 0) {
      console.log('준비 시작 시간이 출발 시간보다 늦습니다.');
      return "invalid_start_time";
    }
    
    return "valid";
  }

  return { checkScheduleValid };
}
