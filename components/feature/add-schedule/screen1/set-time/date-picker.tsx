import { useThemeColor } from '@/hooks/useThemeColor'
import { hScale } from '@/util/scaling'
import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import DatePicker from 'react-native-date-picker'

export function AddScheduleDatePicker() {
  const [date, setDate] = useState(new Date())

  const color = useThemeColor('tint')

  function handleDataCange(date: Date) {
    setDate(date);
  }
  
  return (
    <View style={{
      width:'100%',
      alignItems:'center',
    }}>
      <DatePicker 
        date={date}
        onDateChange={handleDataCange}
        locale='ko-KR-ko'
        dividerColor={color}
        style={{height:hScale(138)}}
        />
    </View>
  )
}