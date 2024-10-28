import { hScale } from "@/util/scaling";
import { AddScheduleHeader } from "./header";
import { AddScheduleSetTime } from "./set-time/add-schedule-set-time";
import { AddScheduleRepeat } from "./repeat/add-schedule-repeat";
import { AddScheduleSetReadyTime } from "./set-ready-time/add-schedule-set-ready-time";
import { AddScheduleNextPageButton } from "./add-schedule-next-page-button";
import { useState } from "react";
import { TouchableWithoutFeedback } from "react-native";
import { RemaindModal } from "@/components/ui/modal/remaind-modal";

export function AddScheduleScreen1() {
  const [modalOpen, setModalOpen] = useState(true);
  return (
    <>
      <AddScheduleHeader keyboardUp={!modalOpen}/>
      <AddScheduleSetTime style={{marginTop:hScale(60)}}/>
      <AddScheduleRepeat style={{marginTop:hScale(40)}}/>
      <AddScheduleSetReadyTime style={{marginTop:hScale(44)}}/>
      <AddScheduleNextPageButton/>
      <RemaindModal 
        title={"약속과정을 설정하면서\n준비과정을 리마인드 해봐요!"}
        text={"과정이 정리되면 지각할 확률이\n점점 줄어들어요!"}
        modalOpen={modalOpen} 
        setModalOpen={setModalOpen}/>
    </>
  );
}