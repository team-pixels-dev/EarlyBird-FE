import { hScale } from "@/util/scaling";
import { AddScheduleHeader } from "./header";
import { AddScheduleSetTime } from "./set-time/add-schedule-set-time";
import { AddScheduleRepeat } from "./repeat/add-schedule-repeat";
import { AddScheduleSetReadyTime } from "./set-ready-time/add-schedule-set-ready-time";
import { AddScheduleNextPageButton } from "./add-schedule-next-page-button";
import { useState } from "react";
import { TouchableWithoutFeedback } from "react-native";

export type AddScheduleScreenProps  = {
  setScreen: React.Dispatch<React.SetStateAction<number>>;
  keyboardUp: boolean
}

export function AddScheduleScreen1({setScreen, keyboardUp} : AddScheduleScreenProps) {
  return (
    <>
      <AddScheduleHeader keyboardUp={keyboardUp}/>
      <AddScheduleSetTime style={{marginTop:hScale(60)}}/>
      <AddScheduleRepeat style={{marginTop:hScale(40)}}/>
      <AddScheduleSetReadyTime style={{marginTop:hScale(44)}}/>
      <AddScheduleNextPageButton setScreen={setScreen}/>
    </>
  );
}