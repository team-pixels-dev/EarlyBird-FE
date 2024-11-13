import { FullSizeButton } from "@/components/ui/buttons/full-size-button";
import { hScale } from "@/util/scaling";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/modules/redux/root-reducer";
import { scheduleState, setCreateAt } from "@/modules/redux/slice/template-schedule-cache-slice";
import { addschedule, resetAllSchedule, sortSchedule } from "@/modules/redux/slice/template-schedule-slice";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { serverFomat } from "@/util/date_formatting";
import { useScheduleTimes } from "@/hooks/useScheduleTimes";
import client from "@/modules/axios/client";
import { Alert } from "react-native";
import { ScheduleNecessary } from "@/components/feature/add-schedule/screen2/necessary";
import { convertScheduleIdClientToServer } from "@/util/convert-schedule-id";

export function EditScheduleScreen2() {
    const schedule_cache = useSelector((state:RootState)=>state.scheduleCache);
    const schedule_id = useSelector((state:RootState)=>state.executeScheduleData.schedule_id);
    const { startDateTime, moveDateTime } = useScheduleTimes();
    const dispatch = useDispatch();
    async function onEditSchedule(schedule_cache : scheduleState) {
        const formData = {
            "clientId":  await AsyncStorage.getItem('deviceId'),
            "deviceToken": await AsyncStorage.getItem('FCMToken'),
            "appointmentId" : convertScheduleIdClientToServer(schedule_id),
            "appointmentName": schedule_cache.schedule_title,
            "appointmentTime": serverFomat(new Date(schedule_cache.schedule_date)),
            "preparationTime": serverFomat(new Date(startDateTime)),
            "movingTime": serverFomat(new Date(moveDateTime)),
            "updateType" : "MODIFY"
        }

        console.log(formData)

        client.patch('/api/v1/message/fcm/token', formData)
            .then((res)=>{
                const appointmentId = String(res.data.appointmentId);
                console.log(appointmentId);
                dispatch(setCreateAt());
                dispatch(addschedule({id: appointmentId, data: schedule_cache}));
                dispatch(sortSchedule());
                Alert.alert("약속 수정","약속이 수정되었습니다.");
                router.navigate("/");
            })
            .catch((err)=>{
                console.log(err)
                Alert.alert("약속 수정 실패","네트워크 연결 상태를 확인해주세요.");
            })
    }
    return (
        <>
            <ScheduleNecessary style={{marginTop:hScale(60)}}/>
            <FullSizeButton 
                style={{position:"absolute", bottom:hScale(50)}}
                onPress={()=>onEditSchedule(schedule_cache)}>
                약속 수정하기
            </FullSizeButton>
        </>
    )
}