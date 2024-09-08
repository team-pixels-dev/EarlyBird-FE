import { CustomAnimatedPressable } from "@/components/ui/buttons/animated-pressable";
import { ThemedText } from "@/components/ui/texts/themed-text";
import { ViewProps } from "react-native";
import { StyleSheet } from "react-native";
import { hScale, wScale } from "@/util/scaling";
import { useThemeColor } from "@/hooks/useThemeColor";
import { router } from "expo-router";
import useSchedulInfoTexteById from "@/hooks/useScheduleInfoTextById";

export type EachScheduleProps =  {
    type: 'soon' | 'other';
    schedule_id: string;
}

export function EachSchedule({type, schedule_id} : EachScheduleProps){
    const scheduleInfoText = useSchedulInfoTexteById(schedule_id);
    const color = type === 'soon' ? useThemeColor('brightTint') : useThemeColor('brightGray');
    const navigateNextPage = () => {
        router.navigate('./remaind-schedule');
    }
    return (
        <CustomAnimatedPressable style={[styles.base, {backgroundColor:color}]} onPress={navigateNextPage}>
            <ThemedText style={{fontSize:hScale(16)}} type="defaultSemiBold">{scheduleInfoText}</ThemedText>
        </CustomAnimatedPressable>
    )
}

const styles = StyleSheet.create({
    base: {
        height: hScale(51),
        width: wScale(342),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius:wScale(38.5),
      },
})