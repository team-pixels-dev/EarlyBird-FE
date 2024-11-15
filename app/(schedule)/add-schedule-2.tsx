import React from 'react';
import { Keyboard, Pressable, StyleSheet } from "react-native";
import { wScale } from '@/util/scaling';
import { FullScreen } from '@/components/layout/full_screen';
import { AddScheduleHeader } from '@/components/feature/add-schedule/screen1/header';
import { AddScheduleScreen2 } from '@/components/feature/add-schedule/screen2';

export default function AddScheduleModal() {

  return (
        <Pressable onPress={()=>{Keyboard.dismiss()}}>
          <FullScreen>
            <AddScheduleHeader keyboardUp={false}/>
            <AddScheduleScreen2/>
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
