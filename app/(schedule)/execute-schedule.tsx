import { FullScreen } from "@/components/layout/full_screen";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/modules/redux/root-reducer";
import { StyleSheet, View } from "react-native";
import { TimerButton } from "@/components/feature/execute-schedule/timer-button";
import { PostPhoneButton } from "@/components/feature/execute-schedule/postphone/postphone-button";
import { hScale, wScale } from "@/util/scaling";
import { useEffect, useState } from "react";
import { PostPhoneModal } from "@/components/feature/execute-schedule//postphone/postphone-modal";
import Ready from "@/components/feature/execute-schedule/ready";
import Moving from "@/components/feature/execute-schedule/moving";
import Done from "@/components/feature/execute-schedule/done";
import { setCanBack } from "@/modules/redux/slice/execute-schedule-data-slice";
import { CancelScheduleButton } from "@/components/feature/execute-schedule/cancel-schedule-button";

export default function ExecuteSchedule() {
    const final_execute_mode = useSelector((state:RootState)=>state.executeScheduleData.final_excute_mode);
    const [modalOpen, setModalOpen] = useState(false);
    const [screen, setScreen] = useState(<Ready/>);
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(setCanBack(false));
        switch(final_execute_mode) {
            case "before_start" :
            case "wait_start" :
            case "ready" : setScreen(<Ready/>);
                break;
            case "moving" :
            case "wait_done" : setScreen(<Moving/>);
                break;
            case "done_rate" :
            case "done" : setScreen(<Done/>);
        }
    }, [final_execute_mode]);
    
    return (
        <FullScreen>
            <CancelScheduleButton style={{position:"absolute", top:hScale(70), right:wScale(20), zIndex:10}}/>
            {screen}
                 <View style={styles.buttonsArea}>
                 {final_execute_mode === "done" || final_execute_mode === "done_rate" || final_execute_mode === "wait_start" ? null :
                    <PostPhoneButton type="schedule" onPress={()=>setModalOpen(true)} style={{marginBottom:hScale(15)}}/>}          
                 <TimerButton/>
             </View>
            <PostPhoneModal modalOpen={modalOpen} setModalOpen={setModalOpen}/>
        </FullScreen>
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