import { ScrollView, StyleSheet } from "react-native";
import { FullScreen } from "@/components/layout/full_screen";
import { ThemedText } from "@/components/ui/texts/themed-text";
import { StartLeftView } from "@/components/layout/start_left_view";
import { AddScheduleButton } from "@/components/feature/add-schedule/add-schedule-button";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/modules/redux/root-reducer";
import { ConfirmModal } from "@/components/ui/modal/confirm-modal";
import { setMainDeleteConfrimModalOpen } from "@/modules/redux/slice/modal-slice";
import useExitConfirmation from "@/hooks/useExitConfirmation";
import { Suspense, useEffect, useState } from "react";
import { cleanPastSchedule, sortSchedule } from "@/modules/redux/slice/template-schedule-slice";
import { setCanBack, setScheduleId } from "@/modules/redux/slice/execute-schedule-data-slice";
import { useAllowPushNotification } from "@/hooks/push-notification/useAllowPushNotification";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useMakeDeviceId } from "@/hooks/device-id/useMakeDeviceId";
import React from "react";
import { router } from "expo-router";
import { useMinuteChangeEffect } from "@/hooks/useMinuateChange";
import { loadScheduleToCache } from "@/modules/redux/slice/template-schedule-cache-slice";

const ScheduleList = React.lazy(() => import("@/components/feature/show-schedule/schedule-list"));

const { hScale } = require('@/util/scaling');

export default function Index() {
  const [isAppReady, setIsAppReady] = useState(false);

  const dispatch = useDispatch();
  useExitConfirmation(); // 뒤로가기 버튼이 눌렸을 시 앱을 닫을지 확인하는 alert창 띄움
  useMakeDeviceId();
  useAllowPushNotification();
  
  const currentMinute = useMinuteChangeEffect(()=>{});
  const schedule = useSelector((state:RootState)=>state.schedule);
  const schedule_keys = Object.keys(schedule);
  const first_key = schedule_keys.length !== 0 ? schedule_keys[0] : '-1';

  const first_schedule = useSelector((state: RootState) => state.schedule[first_key]);

  useEffect(() => {
    // 네비게이션 준비 완료 후 상태 업데이트
    setIsAppReady(true);
  }, []);

  useEffect(()=>{
    dispatch(setCanBack(true));
    if (!isAppReady) return;
    if (!first_schedule) return;
    // 분이 바뀔때마다 수행
    dispatch(cleanPastSchedule());
    dispatch(sortSchedule());
    
    const now = new Date();

    const moveDateTime = new Date(new Date(first_schedule.schedule_date).getTime() - first_schedule.schedule_move * 1000 * 60);
    const startDateTime = new Date(moveDateTime.getTime() - first_schedule.schedule_ready * 1000 * 60);
    const remain_time_for_ready = Math.floor((startDateTime.getTime() - now.getTime()) / 60000);

    console.log("remain_time_for_ready : " + remain_time_for_ready);
    if(remain_time_for_ready <= 4){
      // 준비시작까지 5분 이하로 남았을 때, 약속 실행 모드로 진입
      dispatch(setCanBack(false));
      dispatch(setScheduleId(first_key));
      dispatch(loadScheduleToCache(first_schedule));
      router.navigate('/(schedule)/execute-schedule');
    }
  }, [currentMinute, isAppReady]);

  const modalOpen = useSelector((state: RootState)=>state.modal.main_delete_confirm.modalOpen);

  return (
    <FullScreen>
      <StartLeftView style={styles.top1}>
          <ThemedText type="defaultSemiBold" style={{fontSize: hScale(20)}}>{"나의 약속"}</ThemedText>
      </StartLeftView>
      <Suspense>
        <ScrollView>
          <ScheduleList type="soon"></ScheduleList>
          <ScheduleList type="other"></ScheduleList>
        </ScrollView>
      </Suspense>
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