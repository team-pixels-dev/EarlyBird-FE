import { useMemo } from "react";
import { mergeDateTime } from "@/util/date_formatting";
import { useSelector } from "react-redux";
import { RootState } from "@/modules/redux/root-reducer";



export function useScheduleTimes() {
  const scheduleCache = useSelector((state: RootState) => state.scheduleCache);
  const now = new Date();
  
  const { moving_time, preparing_time, remain_time_for_schedule, remain_time_for_ready, startDateTime, moveDateTime  } = useMemo(() => {
    const scheduleTime = new Date(scheduleCache.schedule_date);
    const remain_time_for_schedule = Math.floor((scheduleTime.getTime() - now.getTime()) / 60000);

    const startTime = new Date(scheduleCache.schedule_start_time.date);

    const startDate = new Date(scheduleTime.getTime()
      - (scheduleCache.schedule_start_time.day === "today" ? 0 : 3600000 * 24));
    const startDateTime = mergeDateTime(startDate, startTime);
    const remain_time_for_ready = Math.floor((startDateTime.getTime() - now.getTime()) / 60000);

    const moveTime = new Date(scheduleCache.schedule_move_time.date);
    const moveDate = new Date(scheduleTime.getTime()
      - (scheduleCache.schedule_move_time.day === "today" ? 0 : 3600000 * 24));
    const moveDateTime = mergeDateTime(moveDate, moveTime);

    const moving_time = Math.floor((scheduleTime.getTime() - moveDateTime.getTime()) / 60000);
    const preparing_time = Math.floor((moveDateTime.getTime() - startDateTime.getTime()) / 60000);

    return { moving_time, preparing_time, remain_time_for_schedule, remain_time_for_ready, startDateTime, moveDateTime };
  }, [scheduleCache.schedule_date, scheduleCache.schedule_move_time, scheduleCache.schedule_type, scheduleCache.schedule_start_time]);

  return { moving_time, preparing_time, remain_time_for_schedule, remain_time_for_ready, moveDateTime, startDateTime };
}
