import { StartLeftView } from "@/components/layout/start_left_view";
import { ThemedText } from "@/components/ui/texts/themed-text";
import { hScale, wScale } from "@/util/scaling";
import { Image, StyleSheet, View, ViewProps } from "react-native";
import { AddScheduleDatePicker } from "./time-picker";
import { CustomAnimatedPressable } from "@/components/ui/buttons/animated-pressable";
import { useState } from "react";
import { CalenderPickerModal } from "./calendar-picker-modal";

export function AddScheduleSetTime({style} : ViewProps){
    const [modalOpen, setModalOpen] = useState(false);

    return (
        <View style={[styles.base, style]}>
            <StartLeftView style={styles.StartLeftView}>
                <ThemedText type="defaultSemiBold">약속시간</ThemedText>
                <CustomAnimatedPressable onPress={()=>setModalOpen(true)}style={{marginRight:wScale(25)}}>
                    <Image style={styles.icon} source={require('@/assets/images/icon/calendar.png')}/>
                </CustomAnimatedPressable>
            </StartLeftView>
            <AddScheduleDatePicker/>
            <CalenderPickerModal modalOpen={modalOpen} setModalOpen={setModalOpen}/>
        </View>
    )
}

const styles = StyleSheet.create({
    base:{
        height:hScale(175),
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    icon: {
        height: hScale(24), 
        width: hScale(22),
        resizeMode: 'stretch',
    },
    StartLeftView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    }
})