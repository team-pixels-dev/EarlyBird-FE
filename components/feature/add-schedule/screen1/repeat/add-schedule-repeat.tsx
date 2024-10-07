import { StartLeftView } from "@/components/layout/start_left_view";
import { ThemedText } from "@/components/ui/texts/themed-text";
import { hScale, wScale } from "@/util/scaling";
import { StyleSheet, View, ViewProps } from "react-native";
import { EachDay } from "./each-day";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setScheduleRepeat, setScheduleType } from "@/modules/redux/slice/template-schedule-cache-slice";
import { RootState } from "@/modules/redux/root-reducer";

export function AddScheduleRepeat({style}: ViewProps){
    const daysOfWeek = ["월", "화", "수", "목", "금", "토", "일"];
    const defaultDays = [false,false,false,false,false,false,false];
    const schedule_repeat = useSelector((state: RootState)=>state.scheduleCache.schedule_repeat);
    const [repeatDays, setRepeatDays] = useState(schedule_repeat)
    const schedule_type = useSelector((state:RootState)=>state.scheduleCache.schedule_type);
    const dispatch = useDispatch();

    // repeatDays에 true값이 없으면 schedule_type은 date, 있으면 repeat
    useEffect(()=>{
        dispatch(setScheduleRepeat(repeatDays));
        let numOfRepeat = 0;
        repeatDays.forEach(value=>{if(value) numOfRepeat++});
        if(numOfRepeat === 0) {
            dispatch(setScheduleType("date"));
        } else {
            dispatch(setScheduleType("repeat"));
        }
    },[repeatDays])

    // schedule_type이 date면 days를 리셋
    useEffect(()=>{
        if(schedule_type === "date") {
            console.log('reset')
            setRepeatDays(defaultDays);
        }
    },[schedule_type])
    return(
        <View style={[styles.base, style]}>
            <StartLeftView>
                <ThemedText type="defaultSemiBold">반복 요일</ThemedText>
            </StartLeftView>
            <View style={styles.selectDayArea}>
                {daysOfWeek.map((day, index) => (
                    <EachDay 
                        key={index}
                        index={index} 
                        day={day} 
                        repeatDays={repeatDays}
                        setRepeatDays={setRepeatDays}
                    />
                ))}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    base:{
        height:hScale(84),
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    selectDayArea:{
        width: wScale(350),
        flexDirection:'row',
        justifyContent:'space-between'
    }
    
})