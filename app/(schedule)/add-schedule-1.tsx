import React, { useState } from 'react';
import { Keyboard, Pressable, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { AddScheduleScreen1 }from "../../components/feature/add-schedule/screen1";
import { wScale } from '@/util/scaling';
import { FullScreen } from '@/components/layout/full_screen';
import { AddScheduleHeader } from '@/components/feature/add-schedule/screen1/header';
import { RemaindModal } from '@/components/ui/modal/remaind-modal';

export default function AddScheduleModal() {
  const [modalOpen, setModalOpen] = useState(true);
  return (
        <Pressable onPress={()=>{Keyboard.dismiss()}}>
          <FullScreen>
            <AddScheduleHeader keyboardUp={!modalOpen}/>
            <AddScheduleScreen1 />
          </FullScreen>
          <RemaindModal 
            title={"약속과정을 설정하면서\n준비과정을 리마인드 해봐요!"}
            text={"과정이 정리되면 지각할 확률이\n점점 줄어들어요!"}
            modalOpen={modalOpen} 
            setModalOpen={setModalOpen}/>
        </Pressable>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalArea: {
    borderTopRightRadius:wScale(28),
    borderTopLeftRadius:wScale(28),
    alignItems:'center',
    height: '100%'
  }
});
