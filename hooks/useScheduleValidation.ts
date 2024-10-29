import { useEffect } from "react";
import { useScheduleTimes } from "./useScheduleTimes";  // 새로 만든 훅을 임포트
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/modules/redux/root-reducer";

export function useScheduleValidation() {
  const { remain_time_for_schedule, remain_time_for_ready, remain_time_for_move } = useScheduleTimes();
  const schedule_title = useSelector((state: RootState)=>state.scheduleCache.schedule_title);
  const schedule_type = useSelector((state: RootState)=>state.scheduleCache.schedule_type);
  const schedule_ready = useSelector((state:RootState)=>state.scheduleCache.schedule_ready);
  const schedule_move = useSelector((state:RootState)=>state.scheduleCache.schedule_move);

    
  function checkScheduleValid() {
    if(schedule_type === "date") {
      if (remain_time_for_schedule <= 0) {
        console.log('약속 시간이 현재시간보다 늦습니다.');
        return "invalid_schedule_time";
      }
      if (remain_time_for_move <= -1){
        return "invalid_move_time_too_fast";
      }
      if (remain_time_for_ready <= -1){
        return "invalid_start_time_too_fast";
      }
    }
    if (schedule_move <= 0) {
      console.log('이동 시간을 0분 보다 크게 설정해주세요.');
      return "invalid_move_time";
    }
    if (schedule_ready <= 0) {
      console.log('준비 시간을 0분 보다 크게 설정해주세요.');
      return "invalid_start_time";
    }
    if(schedule_title === ""){
      console.log("invalid_title");
      return "invalid_title";
    }

    return "valid";
  }

  return { checkScheduleValid };
}
