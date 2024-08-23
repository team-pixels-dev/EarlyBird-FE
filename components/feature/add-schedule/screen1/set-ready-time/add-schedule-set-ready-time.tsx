import { CustomAnimatedPressable } from "@/components/ui/buttons/animated-pressable";
import { ThemedText } from "@/components/ui/texts/themed-text";
import { useThemeColor } from "@/hooks/useThemeColor";
import { hScale, wScale } from "@/util/scaling";
import { useState } from "react";
import { View, StyleSheet, ViewProps } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "@/modules/redux/root-reducer";
import { getHoursMinutes, minutesToHoursMinutes } from "@/util/date_formatting"; 
import { DatePickerModal } from "./date-picker-modal";
import { useScheduleTimes } from "@/hooks/useScheduleTimes";
import { TimeTaken } from "./time-taken";

export type StateType = "start" | "move";

export function AddScheduleSetReadyTime({style} : ViewProps ) {
    const color = useThemeColor("brightGray");
    const [modalOpen, setModalOpen] = useState(false);
    const schedule_start_time = useSelector((state: RootState) => state.templateScheduleCache.schedule_start_time);
    const schedule_move_time = useSelector((state: RootState) => state.templateScheduleCache.schedule_move_time);
    const [time, setTime] = useState(new Date(schedule_start_time.date));
    const [type, setType] = useState<StateType>('start');
    const { moving_time, preparing_time } = useScheduleTimes();
    
    function handleModalOpen(type : "start" | "move"){
        if(type === "start") {
            setTime(new Date(schedule_start_time.date));
        } else {
            setTime(new Date(schedule_move_time.date));
        }
        setModalOpen(true);
        setType(type);
    }
    return (
        <View style={[styles.base, style]}>
            <CustomAnimatedPressable 
                style={[{backgroundColor:color}, styles.setTimeView]} 
                onPress={()=> handleModalOpen("start")}>
                <ThemedText type="defaultSemiBold" style={{fontSize:hScale(16)}}>준비 시작 시간</ThemedText>
                <ThemedText type="title" style={styles.dateText}>{getHoursMinutes(new Date(schedule_start_time.date))}</ThemedText>
            </CustomAnimatedPressable>
            <TimeTaken text="준비 소요 시간 : " time={preparing_time}/>
            <CustomAnimatedPressable 
                style={[{backgroundColor:color}, styles.setTimeView]}
                onPress={()=> handleModalOpen("move")}>
                <ThemedText type="defaultSemiBold" style={{fontSize:hScale(16)}}>이동 출발 시간</ThemedText>
                <ThemedText type="title" style={styles.dateText}>{getHoursMinutes(new Date(schedule_move_time.date))}</ThemedText>
            </CustomAnimatedPressable>
            <TimeTaken text="이동 소요 시간 : " time={moving_time}/>
            <DatePickerModal modalOpen={modalOpen} setModalOpen={setModalOpen} time={time} type={type}/>
        </View>
    )
}

const styles = StyleSheet.create({
    base: {
        height: hScale(116),
        justifyContent: 'space-between',
        alignItems: 'flex-end'
    },
    setTimeView: {
        height: hScale(50),
        width: wScale(342),
        paddingHorizontal: wScale(20),
        borderRadius: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems:'center'
    },
    dateText: {
        fontSize: hScale(16),
        width: '50%',
        textAlign: 'right'
    }
})