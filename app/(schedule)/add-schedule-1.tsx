import React from 'react';
import { Keyboard, Pressable, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { AddScheduleScreen1 }from "../../components/feature/add-schedule/screen1";
import { wScale } from '@/util/scaling';
import { FullScreen } from '@/components/layout/full_screen';

export type modalProps  = {
  modalOpen: boolean,
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function AddScheduleModal({ modalOpen, setModalOpen }: modalProps) {

  return (
        <Pressable onPress={()=>{Keyboard.dismiss()}}>
          <FullScreen>
            <AddScheduleScreen1/>
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
