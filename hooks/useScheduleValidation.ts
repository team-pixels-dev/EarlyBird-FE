import { useEffect } from "react";
import { useScheduleTimes } from "./useScheduleTimes";  // 새로 만든 훅을 임포트

export function useScheduleValidation() {
  const { moving_time, preparing_time, remain_time_for_schedule } = useScheduleTimes();

  function checkScheduleValid() {
    if (remain_time_for_schedule <= 0) {
      console.log('약속 시간이 현재시간보다 늦습니다.');
      return "invalid_schedule_time";
    }
    if (moving_time <= 0) {
      console.log('출발 시간이 약속 시간보다 늦습니다.');
      return "invalid_move_time";
    }
    if (preparing_time <= 0) {
      console.log('준비 시작 시간이 출발 시간보다 늦습니다.');
      return "invalid_start_time";
    }
    if ((remain_time_for_schedule + 1) < (moving_time + preparing_time)){
      return "invalid_start_time_too_fast";
    }
    return "valid";
  }

  return { checkScheduleValid };
}
