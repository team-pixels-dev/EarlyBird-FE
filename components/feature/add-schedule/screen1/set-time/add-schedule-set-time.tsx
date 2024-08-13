import { StartLeftView } from "@/components/layout/start_left_view";
import { ThemedText } from "@/components/ui/texts/themed-text";
import { hScale } from "@/util/scaling";
import { StyleSheet, View, ViewProps } from "react-native";
import { AddScheduleDatePicker } from "./date-picker";

export function AddScheduleSetTime({style} : ViewProps){
    return (
        <View style={[styles.base, style]}>
            <StartLeftView>
                <ThemedText type="defaultSemiBold">약속시간</ThemedText>
            </StartLeftView>
            <AddScheduleDatePicker/>
        </View>
    )
}

const styles = StyleSheet.create({
    base:{
        height:hScale(175),
        justifyContent: 'space-between',
        alignItems: 'center'
    }
})