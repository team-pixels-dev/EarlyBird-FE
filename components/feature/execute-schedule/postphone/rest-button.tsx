import { CustomAnimatedPressable } from "@/components/ui/buttons/animated-pressable";
import { ThemedText } from "@/components/ui/texts/themed-text";
import { useThemeColor } from "@/hooks/useThemeColor";
import { RootState } from "@/modules/redux/root-reducer";
import { changeScheduleTime } from "@/modules/redux/slice/template-schedule-cache-slice";

import { addMinutes } from "@/util/calculate_date";
import { hScale } from "@/util/scaling";
import { StyleSheet, ViewProps } from "react-native";
import { useDispatch, useSelector } from "react-redux";


export function ResetButton({style} : ViewProps) {
    const dispatch = useDispatch();
    const errorColor = useThemeColor("error");
    const schedule_postphone_minutes = useSelector((state: RootState)=>state.scheduleCache.schedule_postphone_minutes)
    function resetTime() {
        let schedule_postphone_minutes_minus: number[] = [];
        schedule_postphone_minutes.forEach((value) =>schedule_postphone_minutes_minus.push(value * -1));
        dispatch(changeScheduleTime(schedule_postphone_minutes_minus));
    }
    return (
        <CustomAnimatedPressable style={style} onPress={resetTime}>
            <ThemedText type="description" style={{color:errorColor}}>초기화</ThemedText>
        </CustomAnimatedPressable>
    )
}

const styles = StyleSheet.create({
    image: {
        width: hScale(14),
        height: hScale(14),
        resizeMode: "contain"
    }
});