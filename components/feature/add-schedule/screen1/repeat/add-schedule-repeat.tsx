import { StartLeftView } from "@/components/layout/start_left_view";
import { ThemedText } from "@/components/ui/texts/themed-text";
import { hScale, SCREEN_WIDTH, wScale } from "@/util/scaling";
import { StyleSheet, View, ViewProps } from "react-native";
import { CustomAnimatedPressable } from "@/components/ui/buttons/animated-pressable";
import { EachDay } from "./each-day";

export function AddScheduleRepeat({style}: ViewProps){
    return(
        <View style={[styles.base, style]}>
            <StartLeftView>
                <ThemedText type="defaultSemiBold">반복 요일</ThemedText>
            </StartLeftView>
            <View style={styles.selectDayArea}>
                    <EachDay day="월"/>
                    <EachDay day="화"/>
                    <EachDay day="수"/>
                    <EachDay day="목"/>
                    <EachDay day="금"/>
                    <EachDay day="토"/>
                    <EachDay day="일"/>
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