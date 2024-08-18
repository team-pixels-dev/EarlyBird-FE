import { CustomAnimatedPressable } from "@/components/ui/buttons/animated-pressable";
import { ThemedText } from "@/components/ui/texts/themed-text";
import { ViewProps } from "react-native";
import { StyleSheet } from "react-native";
import { hScale, wScale } from "@/util/scaling";
import { useThemeColor } from "@/hooks/useThemeColor";
import { router } from "expo-router";

export type EachScheduleProps = ViewProps & {
    type : 'soon' | 'other'
}

export function EachSchedule({type, children} : EachScheduleProps){
    const color = type === 'soon' ? useThemeColor('brightTint') : useThemeColor('brightGray')
    const navigateNextPage = () => {
        router.navigate('(schedule)/remaind-schedule');
    }
    return (
        <CustomAnimatedPressable style={[styles.base, {backgroundColor:color}]} onPress={navigateNextPage}>
            <ThemedText style={{fontSize:hScale(16)}} type="defaultSemiBold">{children}</ThemedText>
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