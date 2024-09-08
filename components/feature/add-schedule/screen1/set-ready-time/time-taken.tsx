import { ThemedText } from "@/components/ui/texts/themed-text";
import { useScheduleTimes } from "@/hooks/useScheduleTimes";
import { useScheduleValidation } from "@/hooks/useScheduleValidation";
import { useThemeColor } from "@/hooks/useThemeColor";
import { minutesToHoursMinutes } from "@/util/date_formatting";
import { useEffect, useState } from "react";

export type timeTakenProps = {
    type : "ready" | "move";
}

export function TimeTaken({type} : timeTakenProps){
    const { moving_time, preparing_time } = useScheduleTimes();
    const { checkScheduleValid } = useScheduleValidation();
    const [errorText, setErrorText] = useState("");
    const time = (type === "ready" ? preparing_time : moving_time);
    const text = (type === "ready" ? " 준비 할 수 있어요." : " 이동해요.");

    useEffect(()=>{
        const result = checkScheduleValid();
        if (type === "ready") {
            if (result === "invalid_start_time")
                setErrorText("출발 시간보다 느려요!");
            else if (result === "invalid_start_time_too_fast")
                setErrorText("현재 시간보다 빨라요!");
            else 
                setErrorText("");
        } else {
            if(result === "invalid_move_time")
                setErrorText("약속시간보다 느려요!");
            else
                setErrorText("");
        }
    }, [checkScheduleValid])
    // const errorText = (type === "ready" ? "현재시간 보다 빨라요!" : "약속시간보다 느려요!");
    const color = useThemeColor("gray")
    return (
        <ThemedText style={{
            color: errorText === "" ? color : 'red'
        }}
        type="description">
            {errorText === "" ? minutesToHoursMinutes(time)+text : errorText}
        </ThemedText>
    )
}