import { FullSizeButton } from "@/components/ui/buttons/full-size-button";
import { hScale } from "@/util/scaling";
import { ScheduleNecessary } from "./necessary";
import { AddScheduleHeader } from "../screen1/header";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/modules/redux/root-reducer";
import { scheduleState, setCreateAt } from "@/modules/redux/slice/template-schedule-cache-slice";
import { addschedule, sortSchedule } from "@/modules/redux/slice/template-schedule-slice";
import { router } from "expo-router";

export function AddScheduleScreen2() {
    const schedule_cache = useSelector((state:RootState)=>state.scheduleCache);
    const dispatch = useDispatch();
    function onGenerateSchedule(schedule_cache : scheduleState) {
        dispatch(setCreateAt());
        dispatch(addschedule(schedule_cache));
        console.log(schedule_cache);
        dispatch(sortSchedule());
        // router.navigate("/");
    }
    return (
        <>
            <AddScheduleHeader keyboardUp={false}></AddScheduleHeader>
            <ScheduleNecessary style={{marginTop:hScale(60)}}/>
            <FullSizeButton 
                style={{position:"absolute", bottom:hScale(50)}}
                onPress={()=>onGenerateSchedule(schedule_cache)}>
                약속 생성하기!
            </FullSizeButton>
        </>
    )
}