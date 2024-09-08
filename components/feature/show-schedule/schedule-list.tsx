import { View } from "react-native";
import { FullSizeButton } from "@/components/ui/buttons/full-size-button";
import { StyleSheet } from "react-native";
import { StartLeftView } from "@/components/layout/start_left_view";
import { ThemedText } from "@/components/ui/texts/themed-text";
import { EachSchedule } from "./each-schedule";
import { hScale, SCREEN_WIDTH, wScale } from "@/util/scaling";
import { useSelector } from "react-redux";
import { RootState } from "@/modules/redux/root-reducer";

export type ScheduleListProps = {
    type : 'soon' | 'other'
}

export function ScheduleList({type} : ScheduleListProps) {
    const templateSchedule = useSelector((state: RootState)=>state.templateSchedule);
    const keys = Object.keys(templateSchedule);

    return (
        <View style={styles.base}>
            <StartLeftView>
            <ThemedText type="defaultSemiBold">
                {type === 'soon' ? '얼마 남지 않았어요!' : '다가올 약속'}</ThemedText>
            </StartLeftView>
            <View style={{marginTop: hScale(26), marginBottom: hScale(26), gap:hScale(16)}}>
                {keys.map((value, index)=>
                    <EachSchedule 
                        key={index} 
                        type={type} 
                        schedule_id={value}/>)}
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