import React, { useEffect, useState } from 'react';
import { Keyboard, Pressable, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { AddScheduleScreen1 }from "../../components/feature/add-schedule/screen1";
import { AddScheduleScreen2 } from "../../components/feature/add-schedule/screen2";
import { wScale } from '@/util/scaling';
import { FullScreen } from '@/components/layout/full_screen';
import { CustomAnimatedPressable } from '@/components/ui/buttons/animated-pressable';

export type modalProps  = {
  modalOpen: boolean,
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function AddScheduleModal({ modalOpen, setModalOpen }: modalProps) {
  const [screen, setScreen] = useState(1);
  // 모달 내부 text input에 대한 focus 여부
  const [keyboardUp, setKeyboardUp] = useState(true);

  useEffect(()=>{
    if(screen === 2) setKeyboardUp(false);
  }, [screen])

  const renderScreen = () => {
    if (screen === 1) {
      return <AddScheduleScreen1 setScreen={setScreen} keyboardUp={keyboardUp}/>;
    } else if (screen === 2) {
      return <AddScheduleScreen2 setScreen={setScreen} keyboardUp={false}/>;
    }
  };

  return (
        <Pressable onPress={()=>{Keyboard.dismiss()}}>
          <FullScreen>
              {renderScreen()}
          </FullScreen>
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
