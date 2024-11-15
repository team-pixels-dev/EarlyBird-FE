import { hScale } from "@/util/scaling";
import { AddScheduleSetTime } from "./set-time/add-schedule-set-time";
import { AddScheduleSetReadyTime } from "./set-ready-time/add-schedule-set-ready-time";
import { AddScheduleNextPageButton } from "./add-schedule-next-page-button";
import { useState } from "react";
import { RemaindModal } from "@/components/ui/modal/remaind-modal";


export function AddScheduleScreen1() {
  return (
    <>
      <AddScheduleSetTime style={{marginTop:hScale(60)}}/>
      <AddScheduleSetReadyTime style={{marginTop:hScale(44)}}/>
      <AddScheduleNextPageButton type={"add"}/>
    </>
  );
}