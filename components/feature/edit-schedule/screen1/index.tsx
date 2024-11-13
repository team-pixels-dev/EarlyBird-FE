import { hScale } from "@/util/scaling";
import { useState } from "react";
import { RemaindModal } from "@/components/ui/modal/remaind-modal";
import { AddScheduleSetTime } from "@/components/feature/add-schedule/screen1/set-time/add-schedule-set-time";
import { AddScheduleSetReadyTime } from "@/components/feature/add-schedule/screen1/set-ready-time/add-schedule-set-ready-time";
import { AddScheduleNextPageButton } from "@/components/feature/add-schedule/screen1/add-schedule-next-page-button";

export function EditScheduleScreen1() {
  const [modalOpen, setModalOpen] = useState(true);
  return (
    <>
      <AddScheduleSetTime style={{marginTop:hScale(60)}}/>
      <AddScheduleSetReadyTime style={{marginTop:hScale(44)}}/>
      <AddScheduleNextPageButton type={"edit"}/>
    </>
  );
}