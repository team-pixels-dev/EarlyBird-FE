import { getMainScreenDates } from '@/util/date_formatting';
import { scheduleState } from '@/modules/redux/slice/template-schedule-cache-slice';

export function useSchedulInfoText(schedule : scheduleState) {
  const scheduleDate = new Date(schedule.schedule_date);
  return getMainScreenDates(scheduleDate) + " - " + schedule.schedule_title;
};

export default useSchedulInfoText;
