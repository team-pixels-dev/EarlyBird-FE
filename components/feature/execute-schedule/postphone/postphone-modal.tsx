import Modal from "react-native-modal";
import { Alert, StyleSheet, View } from "react-native";
import { ThemedView } from '@/components/ui/themed-view';
import { hScale, SCREEN_HEIGHT, SCREEN_WIDTH, wScale } from '@/util/scaling';
import { XButton } from "@/components/ui/buttons/x_button";
import { ThemedText } from "@/components/ui/texts/themed-text";
import { IncreaseTimeButton } from "./increase-time-button";
import { ResetButton } from "./rest-button";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { convertScheduleIdClientToServer } from "@/util/convert-schedule-id";
import { serverFomat } from "@/util/date_formatting";
import client from "@/modules/axios/client";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/modules/redux/root-reducer";
import { useScheduleTimes } from "@/hooks/useScheduleTimes";
import { addschedule } from "@/modules/redux/slice/template-schedule-slice";

export type modalProps  = {
  modalOpen: boolean,
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export function PostPhoneModal({ modalOpen, setModalOpen }: modalProps) {
  const dispatch = useDispatch();
  const schedule_id = useSelector((state: RootState)=>state.executeScheduleData.schedule_id);
  const schedule_cache = useSelector((state:RootState)=>state.scheduleCache);
  const { startDateTime, moveDateTime } = useScheduleTimes();

  async function onEditSchedule() {
    const formData = {
        "clientId":  await AsyncStorage.getItem('deviceId'),
        "deviceToken": await AsyncStorage.getItem('FCMToken'),
        "appointmentId" : convertScheduleIdClientToServer(schedule_id),
        "appointmentName": schedule_cache.schedule_title,
        "appointmentTime": serverFomat(new Date(schedule_cache.schedule_date)),
        "preparationTime": serverFomat(new Date(startDateTime)),
        "movingTime": serverFomat(new Date(moveDateTime)),
        "updateType" : "POSTPONE"
    }

    console.log(formData)

    client.patch('/api/v1/message/fcm/token', formData)
        .then((res)=>{
            const appointmentId = String(res.data.appointmentId);
            console.log(appointmentId);
            dispatch(addschedule({id: appointmentId, data: schedule_cache}));
        })
        .catch((err)=>{
            console.log(err)
            Alert.alert("약속 미루기 실패","네트워크 연결 상태를 확인해주세요.");
        })
}

  async function closeModal() {
    onEditSchedule();
    setModalOpen(false);
  }

  return (
      <Modal 
        isVisible={modalOpen} 
        backdropTransitionOutTiming={0} 
        animationInTiming={150}
        animationOutTiming={150}
        backdropTransitionInTiming={0}
        onBackButtonPress={closeModal} 
        onSwipeComplete={closeModal}
        onBackdropPress={closeModal}
        swipeDirection={['down']}
        swipeThreshold={100}
        avoidKeyboard={false}
        style={styles.view}>
          <ThemedView style={styles.modalArea}>
            <View style={styles.headerArea}>
                <ResetButton style={styles.resetButton}/>
                <ThemedText type="title" style={{fontSize:hScale(20)}}>약속시간 미루기</ThemedText>
                <XButton style={styles.xButton} onPress={closeModal}/>
            </View>
            <View style={styles.buttonsArea}>
                  <IncreaseTimeButton value={1}/>
                  <IncreaseTimeButton value={10}/>
                </View>
          </ThemedView>
      </Modal>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalArea: {
    borderTopRightRadius:wScale(16),
    borderTopLeftRadius:wScale(16),
    alignItems:'center',
    height:hScale(276),
  },
  headerArea: {
    width: '100%',
    marginTop: hScale(20),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  resetButton: {
    position: "absolute",
    left: wScale(21),
  },
  xButton: {
    position: "absolute",
    right: wScale(21),
  },
  buttonsArea: {
    marginTop: hScale(45),
    flexDirection: "row",
    gap: wScale(56)
  }
});