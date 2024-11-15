import React, { useState } from 'react';
import { Keyboard, Pressable, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { AddScheduleScreen1 }from "../../components/feature/add-schedule/screen1";
import { wScale } from '@/util/scaling';
import { FullScreen } from '@/components/layout/full_screen';
import { AddScheduleHeader } from '@/components/feature/add-schedule/screen1/header';
import { EditScheduleScreen1 } from '@/components/feature/edit-schedule/screen1';


export default function AddScheduleModal() {
  return (
        <Pressable onPress={()=>{Keyboard.dismiss()}}>
          <FullScreen>
            <AddScheduleHeader keyboardUp={false}/>
            <EditScheduleScreen1/>
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
