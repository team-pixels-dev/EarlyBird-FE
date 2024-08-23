import { hScale } from "@/util/scaling";
import { AddScheduleHeader } from "./add-schedule-header";
import { AddScheduleSetTime } from "./set-time/add-schedule-set-time";
import { AddScheduleRepeat } from "./repeat/add-schedule-repeat";
import { AddScheduleSetReadyTime } from "./set-ready-time/add-schedule-set-ready-time";
import { AddScheduleNextPageButton } from "./add-schedule-next-page-button";

export type AddScheduleScreenProps  = {
  setScreen: React.Dispatch<React.SetStateAction<number>>;
}

export function AddScheduleScreen1({setScreen} : AddScheduleScreenProps) {
  return (
    <>
      <AddScheduleHeader/>
      <AddScheduleSetTime style={{marginTop:hScale(37)}}/>
      <AddScheduleRepeat style={{marginTop:hScale(55)}}/>
      <AddScheduleSetReadyTime style={{marginTop:hScale(49)}}/>
      <AddScheduleNextPageButton setScreen={setScreen}/>
    </>
  );
}