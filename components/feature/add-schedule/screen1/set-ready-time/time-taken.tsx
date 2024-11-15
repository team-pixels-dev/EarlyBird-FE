import { ThemedText } from "@/components/ui/texts/themed-text";
import { useScheduleTimes } from "@/hooks/useScheduleTimes";
import { useScheduleValidation } from "@/hooks/useScheduleValidation";
import { useThemeColor } from "@/hooks/useThemeColor";
import { RootState } from "@/modules/redux/root-reducer";
import { getHoursMinutesWithAMPM } from "@/util/date_formatting";
import { hScale } from "@/util/scaling";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export type timeTakenProps =  {
    type : "ready" | "move";
}

export function TimeTaken({type} : timeTakenProps){
    const { startDateTime, moveDateTime, remain_time_for_ready, remain_time_for_move } = useScheduleTimes();
    const schedule_ready = useSelector((state:RootState)=>state.scheduleCache.schedule_ready);
    const schedule_move = useSelector((state:RootState)=>state.scheduleCache.schedule_move);
    const { checkScheduleValid } = useScheduleValidation();
    const [errorText, setErrorText] = useState("");
    
    useEffect(()=>{
        const result = checkScheduleValid();
        if(type === "ready") {
            if(schedule_ready <= 0) {
                setErrorText("시간을 0보다 크게 설정해주세요.")
            } else if(result == "invalid_start_time_too_fast")
                setErrorText("준비 시간이 현재시간보다 늦습니다.")
            else
                setErrorText("");
        } else {
            if(schedule_move <= 0) {
                setErrorText("시간을 0보다 크게 설정해주세요.")
            } else if(result == "invalid_move_time_too_fast")
                setErrorText("이동 시간이 현재시간보다 늦습니다.")
            else
                setErrorText("");
        }
    },[checkScheduleValid]);

    const time = (type === "ready" ? startDateTime : moveDateTime);
    const text = (type === "ready" ? "에 준비 시작해야 해요." : "에 이동해야 해요.");

    const color = useThemeColor("timeTaken")
    return (
        <ThemedText style={{width: '100%', color: errorText === "" ? color : 'red', fontSize:hScale(12)}}
        type="description">
            {errorText === "" ? getHoursMinutesWithAMPM(time)+text : errorText}
        </ThemedText>
    )
}