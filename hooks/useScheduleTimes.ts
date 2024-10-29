import { useMemo } from "react";
import { mergeDateTime } from "@/util/date_formatting";
import { useSelector } from "react-redux";
import { RootState } from "@/modules/redux/root-reducer";



export function useScheduleTimes() {
  const scheduleCache = useSelector((state: RootState) => state.scheduleCache);
  const now = new Date();
  
  const { remain_time_for_schedule, remain_time_for_ready, remain_time_for_move, startDateTime, moveDateTime  } = useMemo(() => {
    const scheduleTime = new Date(scheduleCache.schedule_date);
    const remain_time_for_schedule = Math.floor((scheduleTime.getTime() - now.getTime()) / 60000);

    const moveDateTime = new Date(new Date(scheduleCache.schedule_date).getTime() - scheduleCache.schedule_move * 1000 * 60);
    const remain_time_for_move = Math.floor((moveDateTime.getTime() - now.getTime()) / 60000);

    const startDateTime = new Date(moveDateTime.getTime() - scheduleCache.schedule_ready * 1000 * 60);
    const remain_time_for_ready = Math.floor((startDateTime.getTime() - now.getTime()) / 60000);

    

    return {  remain_time_for_schedule, remain_time_for_ready, remain_time_for_move, startDateTime, moveDateTime };
  }, [scheduleCache.schedule_ready, scheduleCache.schedule_move, scheduleCache.schedule_type, scheduleCache.schedule_date]);

  return { remain_time_for_schedule, remain_time_for_ready, remain_time_for_move, moveDateTime, startDateTime };
}
