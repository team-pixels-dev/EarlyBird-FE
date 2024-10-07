import { ThemedText } from "@/components/ui/texts/themed-text";
import { FullScreen } from "@/components/layout/full_screen";
import { useSelector } from "react-redux";
import { RootState } from "@/modules/redux/root-reducer";
import { StyleSheet, View } from "react-native";
import { chooseSubjectParticle } from "@/util/choose-subject-particle";
import { ScheduleTimeTextLabel } from "@/components/feature/execute-schedule/ready/schedule-time-text-label";
import { NecessaryBox } from "@/components/feature/execute-schedule/ready/necessary-box";
import { TimerButton } from "@/components/feature/execute-schedule/timer-button";
import { PostPhoneButton } from "@/components/feature/execute-schedule/postphone/postphone-button";
import { hScale, wScale } from "@/util/scaling";
import { useState } from "react";
import { PostPhoneModal } from "@/components/feature/execute-schedule//postphone/postphone-modal";
import { CustomAnimatedPressable } from "@/components/ui/buttons/animated-pressable";

export default function Ready() {
    const schedule = useSelector((state: RootState)=>state.scheduleCache);
    const subjectParticleText = chooseSubjectParticle(schedule.schedule_title);
    const [modalOpen, setModalOpen] = useState(false);
    
    return (
        <>
            <View style={styles.titleArea}>
                <ThemedText type="ONEMobilePOP" style={styles.titleText}>오늘은</ThemedText>
                <ThemedText type="ONEMobilePOP" style={styles.titleText}>{subjectParticleText} 있네요!</ThemedText>
            </View>
            <CustomAnimatedPressable onPress={()=>setModalOpen(true)}>
                <ScheduleTimeTextLabel schedule={schedule} style={styles.scheduleTime}></ScheduleTimeTextLabel>
            </CustomAnimatedPressable>
            <NecessaryBox schedule={schedule} style={styles.necessaryArea}/>
        </>
    )
}

const styles = StyleSheet.create({
    titleArea: {
        height: hScale(130),
        width: '100%',
        paddingLeft: wScale(20),
        justifyContent: "flex-end"
    },
    titleText:{
        fontSize: hScale(26),
        lineHeight: hScale(40)
    },
    scheduleTime: {
        marginTop: hScale(78)
    },
    necessaryArea: {
        marginTop: hScale(33)
    },
    buttonsArea: {
        alignItems: "center",
        position: "absolute",
        bottom: hScale(50)
    }
})