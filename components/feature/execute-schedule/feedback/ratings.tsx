import { StartLeftView } from "@/components/layout/start_left_view";
import { ThemedText } from "@/components/ui/texts/themed-text";
import { hScale, wScale } from "@/util/scaling";
import { StyleSheet, View, ViewProps } from "react-native";
import { EachRating } from "./each-rating";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setScheduleRepeat, setScheduleType } from "@/modules/redux/slice/template-schedule-cache-slice";
import { RootState } from "@/modules/redux/root-reducer";

export function Ratings({style}: ViewProps){
    const daysOfWeek = [0,1,2,3,4,5,6,7,8,9,10];
    const defaultDays = [false,false,false,false,false,false,false];
    const schedule_repeat = useSelector((state: RootState)=>state.scheduleCache.schedule_repeat);
    const [repeatDays, setRepeatDays] = useState(schedule_repeat)
    const schedule_type = useSelector((state:RootState)=>state.scheduleCache.schedule_type);
    const selected_rate = useSelector((state:RootState)=>state.executeScheduleData.rating);
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
            setRepeatDays(defaultDays);
        }
    },[schedule_type])
    return(
        <View style={[styles.base, style]}>
            <ThemedText type="description" style={{width:'100%', paddingLeft:wScale(20)}}>추천 안해요</ThemedText>
            <View style={styles.selectDayArea}>
                {daysOfWeek.map((day, index) => (
                    <EachRating 
                        key={index}
                        index={index} 
                        rating={day} 
                        selected_rating={selected_rate}
                    />
                ))}
            </View>
            <ThemedText type="description" style={{width:'100%', paddingRight:wScale(20), textAlign:"right"}}>정말 추천해요</ThemedText>
        </View>
    )
}

const styles = StyleSheet.create({
    base:{
        width: wScale(270),
        height: hScale(212),
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    selectDayArea:{
        width: wScale(270),
        flexDirection:'row',
        rowGap: wScale(12),
        columnGap: hScale(14),
        justifyContent:'center',
        flexWrap: 'wrap'
    }
    
})