import { CustomAnimatedPressable } from "@/components/ui/buttons/animated-pressable";
import { ThemedText } from "@/components/ui/texts/themed-text";
import { useThemeColor } from "@/hooks/useThemeColor";
import client from "@/modules/axios/client";
import { RootState } from "@/modules/redux/root-reducer";
import { resetExecuteScheduleData } from "@/modules/redux/slice/execute-schedule-data-slice";
import { changeScheduleTime, resetScheduleCache } from "@/modules/redux/slice/template-schedule-cache-slice";
import { removeschedule } from "@/modules/redux/slice/template-schedule-slice";

import { addMinutes } from "@/util/calculate_date";
import { convertScheduleIdClientToServer } from "@/util/convert-schedule-id";
import { hScale } from "@/util/scaling";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { Alert, StyleSheet, ViewProps } from "react-native";
import { useDispatch, useSelector } from "react-redux";


export function CancelScheduleButton({style} : ViewProps) {
    const dispatch = useDispatch();
    const errorColor = useThemeColor("error");
    const schedule_id = useSelector((state:RootState)=>state.executeScheduleData.schedule_id);
    function handleCancel() {
        Alert.alert("약속 취소", "진행중인 약속을 취소할까요?",
            [
                {
                  text: "아니요",
                  onPress: () => null,
                  style: "cancel"
                },
                { text: "네", onPress: cancelSchedule }
              ],
              { cancelable: false },
        )
    }

    async function cancelSchedule(){
        dispatch(removeschedule(schedule_id));
        console.log("schedule_id: " + schedule_id);
        client.delete('/api/v1/message/fcm/token', {
            headers: {
              "appointmentId": convertScheduleIdClientToServer(schedule_id),
              "clientId": await AsyncStorage.getItem('deviceId'),
            }}).then((res)=>{
              console.log(res);
            }).catch((err)=>{
              console.log(err);
            }).finally(()=>{
                dispatch(resetExecuteScheduleData());
                router.replace("/");
                dispatch(resetScheduleCache());
            });
    }

    
    return (
        <CustomAnimatedPressable style={style} onPress={handleCancel}>
            <ThemedText type="description" style={{color:errorColor}}>약속 취소</ThemedText>
        </CustomAnimatedPressable>
    )
}

const styles = StyleSheet.create({

});