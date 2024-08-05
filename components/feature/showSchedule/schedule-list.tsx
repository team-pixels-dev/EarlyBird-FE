import { View } from "react-native";
import { FullSizeButton } from "@/components/ui/buttons/full-size-button";
import { StyleSheet } from "react-native";
import { StartLeftView } from "@/components/layout/start_left_view";
import { ThemedText } from "@/components/ui/texts/themed-text";
import { EachSchedule } from "./each-schedule";
import { hScale, SCREEN_WIDTH, wScale } from "@/util/scaling";

export type SoonScheduleListProps = {
    type : 'soon' | 'other'
}

export function ScheduleList({type} : SoonScheduleListProps) {
    return (
        <View style={styles.base}>
            <StartLeftView>
            <ThemedText type="defaultSemiBold">
                {type === 'soon' ? '얼마 남지 않았어요!' : '다가올 약속'}</ThemedText>
            </StartLeftView>
            <View style={{marginTop: hScale(26), gap:hScale(16)}}>
                <EachSchedule type="soon">7/15(월) 09:00 - 출근하기</EachSchedule>
                <EachSchedule type="soon">7/15(월) 09:00 - 출근하기</EachSchedule>
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