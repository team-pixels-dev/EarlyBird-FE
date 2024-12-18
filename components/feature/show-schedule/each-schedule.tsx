import React from "react";
import { CustomAnimatedPressable } from "@/components/ui/buttons/animated-pressable";
import { ThemedText } from "@/components/ui/texts/themed-text";
import { StyleSheet, View } from "react-native";
import { hScale, wScale } from "@/util/scaling";
import { useThemeColor } from "@/hooks/useThemeColor";
import { router } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import { setMainDeleteConfrimModalOpen, setMainDeleteConfrimScheduleId } from "@/modules/redux/slice/modal-slice";
import { loadScheduleToCache } from "@/modules/redux/slice/template-schedule-cache-slice";
import { RootState } from "@/modules/redux/root-reducer";
import { setScheduleId } from "@/modules/redux/slice/execute-schedule-data-slice";
import { getMainScreenDates } from "@/util/date_formatting";

export type EachScheduleProps = {
    type: 'soon' | 'other';
    schedule_id: string;
}

export function EachSchedule({ type, schedule_id }: EachScheduleProps) {
    
    const schedule = useSelector((state: RootState) => state.schedule[schedule_id]);
    const color = type === 'soon' ? useThemeColor('brightTint') : useThemeColor('brightGray');
    const textColor = type === 'soon' ? useThemeColor("buttonText") : useThemeColor("text");

    // 훅 호출 이후 조건부 렌더링 처리
    if (!schedule) return null;

    const scheduleInfoText = getMainScreenDates(new Date(schedule.schedule_date)) + " - " + schedule.schedule_title;

    return (
        <View style={[styles.base, { backgroundColor: color }]}>
            <ThemedText style={{ fontSize: hScale(16), color: textColor }} type="defaultSemiBold">{scheduleInfoText}</ThemedText>
        </View>
    )
}

const styles = StyleSheet.create({
    base: {
        height: hScale(51),
        width: wScale(342),
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: wScale(38.5),
    },
    delete: {
        position: "absolute",
        right: wScale(20),
    }
});
