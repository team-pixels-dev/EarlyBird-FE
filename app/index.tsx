import { ScrollView, StyleSheet } from "react-native";
import { FullScreen } from "@/components/layout/full_screen";
import { ThemedText } from "@/components/ui/texts/themed-text";
import { StartLeftView } from "@/components/layout/start_left_view";
import { ScheduleList } from "@/components/feature/show-schedule/schedule-list";
import { AddScheduleButton } from "@/components/feature/add-schedule/add-schedule-button";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/modules/redux/root-reducer";
import { ConfirmModal } from "@/components/ui/modal/confirm-modal";
import { setMainDeleteConfrimModalOpen } from "@/modules/redux/slice/modal-slice";
import useExitConfirmation from "@/hooks/useExitConfirmation";
import { useEffect } from "react";
import { cleanPastSchedule, sortSchedule } from "@/modules/redux/slice/template-schedule-slice";
import { setCanBack } from "@/modules/redux/slice/execute-schedule-data-slice";
import { useAllowPushNotification } from "@/hooks/push-notification/useAllowPushNotification";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useMakeDeviceId } from "@/hooks/device-id/useMakeDeviceId";

const { hScale } = require('@/util/scaling');

export default function Index() {
  const dispatch = useDispatch();
  useExitConfirmation(); // 뒤로가기 버튼이 눌렸을 시 앱을 닫을지 확인하는 alert창 띄움
  useAllowPushNotification();
  useMakeDeviceId();



  const schedule = useSelector((state:RootState)=>state.schedule);
  const schedule_keys = Object.keys(schedule);
  const first_key = schedule_keys.length !== 0 ? schedule_keys[0] : -1;

  useEffect(()=>{
    dispatch(setCanBack(true));
    dispatch(cleanPastSchedule());
    dispatch(sortSchedule());

    // console.log(schedule);
    console.log(first_key);
  }, []);

  const modalOpen = useSelector((state: RootState)=>state.modal.main_delete_confirm.modalOpen);

  return (
    <FullScreen>
      <StartLeftView style={styles.top1}>
          <ThemedText type="defaultSemiBold" style={{fontSize: hScale(20)}}>나의 약속</ThemedText>
      </StartLeftView>
      <ScrollView>
        <ScheduleList type="soon"></ScheduleList>
        <ScheduleList type="other"></ScheduleList>
      </ScrollView>
      <AddScheduleButton/>
      <ConfirmModal title="삭제하시겠습니까?" modalOpen={modalOpen} setModalOpen={setMainDeleteConfrimModalOpen} text={""}/>
    </FullScreen>
  );
}

const styles = StyleSheet.create({
  top1: {
    marginTop: hScale(65),
    marginBottom: hScale(53)
  },
})