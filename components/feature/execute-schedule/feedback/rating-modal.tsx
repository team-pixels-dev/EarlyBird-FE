import React, { useRef } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import Modal from "react-native-modal";
import { ThemedText } from "@/components/ui/texts/themed-text";
import { ThemedView } from "@/components/ui/themed-view";
import { hScale, SCREEN_HEIGHT, SCREEN_WIDTH, wScale } from "@/util/scaling";
import { ModalComfirmButton } from "@/components/ui/buttons/modal-conform-button";
import { useDispatch, useSelector } from "react-redux";
import { Ratings } from "./ratings";
import { setFeedbackModalOpen } from "@/modules/redux/slice/modal-slice";
import client from "@/modules/axios/client";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { RootState } from "@/modules/redux/root-reducer";
import { serverFomat } from "@/util/date_formatting";
import { removeschedule } from "@/modules/redux/slice/template-schedule-slice";
import { resetScheduleCache } from "@/modules/redux/slice/template-schedule-cache-slice";
import { resetExecuteScheduleData } from "@/modules/redux/slice/execute-schedule-data-slice";
import { router } from "expo-router";

export function RatingModal() {
  const dispatch = useDispatch();
  const rating = useSelector((state:RootState)=>state.executeScheduleData.rating);
  const schedule_id = useSelector((state:RootState)=>state.executeScheduleData.schedule_id);

  async function onComfirm() {
    const formData = {
      "score" : rating,
      "clientId" : await AsyncStorage.getItem('deviceId'),
      "createdAt" : serverFomat(new Date())
    }
    console.log(formData);
    client.post('/api/v1/feedbacks/scores', formData)
      .then((res)=>{console.log(res)})
      .catch((err)=>{console.log(err)});

    await Promise.all([
      dispatch(removeschedule(schedule_id)),
      dispatch(resetScheduleCache()),
      dispatch(resetExecuteScheduleData()),
      dispatch(setFeedbackModalOpen(false))
    ]);
  
    router.replace("/");
  }

  return (
    <ThemedView style={styles.base}>
        <ThemedText type="ONEMobilePOP" style={styles.title}>
          {"얼리버드를 주변에 얼마나\n추천하고 싶으신가요?"}
        </ThemedText>
        <Ratings/>
        <ModalComfirmButton onPress={onComfirm}/>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: wScale(8),
    width: wScale(270),
    height: hScale(380),
    alignItems: "flex-start",
    justifyContent: "space-between",
    paddingTop: hScale(36),
  },
  title: {
    marginLeft:wScale(20),
    fontSize:hScale(16), 
    lineHeight:hScale(20)
  }
});
