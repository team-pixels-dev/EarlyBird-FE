import { AddScheduleScreenProps } from "../screen1";
import { FullSizeButton } from "@/components/ui/buttons/full-size-button";
import { hScale } from "@/util/scaling";
import { ScheduleNecessary } from "./necessary";
import { AddScheduleHeader } from "../screen1/header";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/modules/redux/root-reducer";
import { TemplateScheduleState } from "@/modules/redux/slice/template-schedule-cache-slice";
import { addTemplateSchedule } from "@/modules/redux/slice/template-schedule-slice";
import { router } from "expo-router";

export function AddScheduleScreen2({setScreen, keyboardUp} : AddScheduleScreenProps) {
    const schedule_cache = useSelector((state:RootState)=>state.templateScheduleCache);
    const dispatch = useDispatch();
    function onGenerateSchedule(schedule_cache : TemplateScheduleState) {
        dispatch(addTemplateSchedule(schedule_cache));
        router.navigate("/(schedule)");
    }
    return (
        <>
            <AddScheduleHeader keyboardUp={keyboardUp}></AddScheduleHeader>
            <ScheduleNecessary style={{marginTop:hScale(60)}}/>
            <FullSizeButton 
                style={{position:"absolute", bottom:hScale(50)}}
                onPress={()=>onGenerateSchedule(schedule_cache)}>
                약속 생성하기!
            </FullSizeButton>
        </>
    )
}