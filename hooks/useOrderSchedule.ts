import { RootState } from "@/modules/redux/root-reducer";
import { getFullDates } from "@/util/date_formatting";
import { useSelector } from "react-redux";

export function useOrderSchedule() {
    const schedule = useSelector((state: RootState)=>state.schedule);
    let keys = Object.keys(schedule);
    keys.sort((a, b) => new Date(schedule[a].schedule_date).getTime() 
        - new Date(schedule[b].schedule_date).getTime());
    return keys;
}

export default useOrderSchedule;