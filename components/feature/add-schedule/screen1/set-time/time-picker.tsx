import { useThemeColor } from '@/hooks/useThemeColor'
import { hScale } from '@/util/scaling'
import React, { useEffect, useState } from 'react'
import { Keyboard, View } from 'react-native'
import DatePicker from 'react-native-date-picker'
import { useDispatch, useSelector } from "react-redux";
import { setScheduleTime } from '@/modules/redux/slice/template-schedule-cache-slice'
import { RootState } from '@/modules/redux/root-reducer'

export function AddScheduleDatePicker() {
  const dispatch = useDispatch()
  const schedule_date = useSelector((state: RootState) => state.scheduleCache.schedule_date);

  const color = useThemeColor('tint')

  function handleDataCange(date: Date) {
    Keyboard.dismiss();
    date.setSeconds(0,0);
    dispatch(setScheduleTime(date.toISOString()));
  }
  
  return (
    <View style={{
      width:'100%',
      alignItems:'center',
    }}>
      <DatePicker
        mode='time'
        date={new Date(schedule_date)}
        onDateChange={handleDataCange}
        is24hourSource={'locale'}
        locale='ko-KR-ko'
        dividerColor={color}
        style={{height:hScale(138)}}
        />
    </View>
  )
}