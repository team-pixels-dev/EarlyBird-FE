import { ThemedText } from "@/components/ui/texts/themed-text";
import { Image, StyleSheet, View } from "react-native";
import { hScale, wScale } from "@/util/scaling";
import { modalOption, TwoOptionModal } from "@/components/ui/modal/two-option-modal";
import { useEffect, useState } from "react";
import { CustomAnimatedPressable } from "@/components/ui/buttons/animated-pressable";
import { useDispatch, useSelector } from "react-redux";
import { setFinalExecuteMode } from "@/modules/redux/slice/execute-schedule-data-slice";
import { RootState } from "@/modules/redux/root-reducer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import client from "@/modules/axios/client";
import { convertScheduleIdClientToServer } from "@/util/convert-schedule-id";

  
export default function Moving() {
    const [modalOpen, setModalOpen] = useState(false);
    
    const dispatch = useDispatch();

    const final_execute_mode = useSelector((state:RootState)=>state.executeScheduleData.final_excute_mode);
    const schedule_id = useSelector((state:RootState)=>state.executeScheduleData.schedule_id);

    const modalOptions: modalOption[] = [
        {
          text: "시간 내에 도착",
          task: async () => {
            console.log("도착!");

            const formData = {
                "appointmentId": convertScheduleIdClientToServer(schedule_id),
                "clientId": await AsyncStorage.getItem('deviceId')
              }
              client.post('/api/v1/log/arrive-on-time-event', formData)
              .then((res)=>{console.log(res)})
              .catch((err)=>{console.log(err)});

              
            dispatch(setFinalExecuteMode("done"));
          }
        },
        {
          text: "지각",
          task: () => {
            console.log("지각!");
            dispatch(setFinalExecuteMode("done_rate"));
          }
        }
      ];

    useEffect(()=>{
        if(final_execute_mode === "wait_done") {
            setModalOpen(true);
        }
    }, [final_execute_mode])

    

    return (
        <>
            <View style={styles.titleArea}>
                <ThemedText type="ONEMobilePOP" style={styles.titleText}>어서 빨리 가야겠어요</ThemedText>
            </View>
            <Image source={require("@/assets/images/mascot/mascot_run_noeffect.png")} style={styles.mascote}/>
            <TwoOptionModal
                modalOpen={modalOpen} 
                setModalOpen={setModalOpen} 
                title={"1분 이내에 지각여부를 \n체크해주세요!"}
                option1={modalOptions[0]}
                option2={modalOptions[1]}
                />
        </>
    )
}

const styles = StyleSheet.create({
    titleArea: {
        height: hScale(170),
        width: '100%',
        justifyContent: "flex-end",
        alignItems: "center",
    },
    titleText:{
        fontSize: hScale(26),
        lineHeight: hScale(40)
    },
    mascote: {
        marginTop: hScale(85),
        width: hScale(206),
        height: hScale(216),
        objectFit: "contain",
    }
});