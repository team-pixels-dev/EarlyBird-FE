import { StartLeftView } from "@/components/layout/start_left_view";
import { ThemedText } from "@/components/ui/texts/themed-text";
import { hScale, SCREEN_WIDTH, wScale } from "@/util/scaling";
import { StyleSheet, View, ViewProps } from "react-native";
import { CustomAnimatedPressable } from "@/components/ui/buttons/animated-pressable";
import { EachDay } from "./each-day";
import { useState } from "react";

export function AddScheduleRepeat({style}: ViewProps){
    const daysOfWeek = ["월", "화", "수", "목", "금", "토", "일"];
    const [repeatDays, setRepeatDays] = useState([0,0,0,0,0,0,0])
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