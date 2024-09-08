import { StartLeftView } from "@/components/layout/start_left_view";
import { ThemedText } from "@/components/ui/texts/themed-text";
import { hScale, wScale } from "@/util/scaling";
import { Image, StyleSheet, View, ViewProps } from "react-native";
import { AddScheduleDatePicker } from "./time-picker";
import { CustomAnimatedPressable } from "@/components/ui/buttons/animated-pressable";
import { useState } from "react";
import { CalenderPickerModal } from "./calendar-picker-modal";
import { useSelector } from "react-redux";
import { RootState } from "@/modules/redux/root-reducer";
import { getDates } from "@/util/date_formatting";

export function AddScheduleSetTime({style} : ViewProps){
    const [modalOpen, setModalOpen] = useState(false);
    const schedule_type = useSelector((state: RootState)=>state.templateScheduleCache.schedule_type);
    const schedule_date = useSelector((state: RootState)=>state.templateScheduleCache.schedule_date);

    return (
        <View style={[styles.base, style]}>
            <StartLeftView style={styles.StartLeftView}>
                <ThemedText type="defaultSemiBold">약속시간</ThemedText>
                <CustomAnimatedPressable
                    onPress={()=>setModalOpen(true)} 
                    style={{
                        marginRight:wScale(25),
                        flexDirection: "row",
                        alignItems: "center"
                    }}>
                    <ThemedText type="default" style={{fontSize:hScale(14), marginRight:wScale(10)}}>
                        {schedule_type === "date" ? getDates(new Date(schedule_date)) : ''}
                    </ThemedText>
                    <Image style={styles.icon} source={schedule_type === "date" ? require('@/assets/images/icon/calender_dark.png') : require('@/assets/images/icon/calender.png')}/>
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