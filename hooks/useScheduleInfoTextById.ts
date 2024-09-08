import { useSelector } from 'react-redux';
import { RootState } from '@/modules/redux/root-reducer';
import { getMainScreenDates } from '@/util/date_formatting';

export function useSchedulInfoTexteById(id: string) {
  const schedule = useSelector((state: RootState) => state.templateSchedule[id]);
  const scheduleDate = new Date(schedule.schedule_date);
  return getMainScreenDates(scheduleDate) + " - " + schedule.schedule_title;
};

export default useSchedulInfoTexteById;
