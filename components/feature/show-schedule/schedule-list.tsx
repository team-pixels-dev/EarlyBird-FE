import { View } from "react-native";
import { StyleSheet } from "react-native";
import { StartLeftView } from "@/components/layout/start_left_view";
import { ThemedText } from "@/components/ui/texts/themed-text";
import { EachSchedule } from "./each-schedule";
import { hScale, SCREEN_WIDTH, wScale } from "@/util/scaling";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/modules/redux/root-reducer";
import { Edit } from "./edit-schedule";

export type ScheduleListProps = {
    type : 'soon' | 'other'
}

export default function ScheduleList({type} : ScheduleListProps) {
    const schedule = useSelector((state:RootState)=>state.schedule);
    const schedule_keys = Object.keys(schedule);
    const keys = type === "soon" ?  schedule_keys.length !== 0 ? [schedule_keys[0]] : [] : schedule_keys.slice(1);

    return (
        <View style={styles.base}>
            <StartLeftView>
            <ThemedText type="defaultSemiBold">
                {type === 'soon' ? '얼마 남지 않았어요!' : '다가올 약속'}</ThemedText>
            </StartLeftView>
            <View style={{marginTop: hScale(26), marginBottom: hScale(26), gap:hScale(16)}}>
                {keys.map((value, index)=>
                <View key={index} style={{alignItems: "flex-end"}}>
                    <Edit schedule_id={value}/>
                    <EachSchedule 
                        type={type} 
                        schedule_id={value}/>
                </View>
                )}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    base:{
        width:SCREEN_WIDTH,
        minHeight: hScale(192),
        alignItems:'center',
    }
})