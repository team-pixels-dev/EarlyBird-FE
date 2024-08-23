import { StartLeftView } from "@/components/layout/start_left_view";
import { ThemedText } from "@/components/ui/texts/themed-text";
import { hScale, wScale } from "@/util/scaling";
import { StyleSheet, View, ViewProps } from "react-native";
import { EachDay } from "./each-day";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setScheduleRepeat } from "@/modules/redux/slice/template-schedule-cache-slice";
import { RootState } from "@/modules/redux/root-reducer";

export function AddScheduleRepeat({style}: ViewProps){
    const daysOfWeek = ["월", "화", "수", "목", "금", "토", "일"];
    const [repeatDays, setRepeatDays] = useState([false,false,false,false,false,false,false])
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(setScheduleRepeat(repeatDays));
    },[repeatDays])
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