import { Platform, StyleSheet } from "react-native";
import { ThemedView } from "@/components/ui/themed-view";
import { hScale, wScale } from "@/util/scaling";
import { AddScheduleHeader } from "./add-schedule-header";
import { AddScheduleSetTime } from "./set-time/add-schedule-set-time";
import { AddScheduleRepeat } from "./repeat/add-schedule-repeat";
import { AddScheduleSetReadyTime } from "./set-ready-time/add-schedule-set-ready-time";
import { FullSizeButton } from "@/components/ui/buttons/full-size-button";
import { router } from "expo-router";

export type AddScheduleScreenProps  = {
  setScreen: React.Dispatch<React.SetStateAction<number>>;
}

export function AddScheduleScreen1({setScreen} : AddScheduleScreenProps) {
  return (
   <>
      <AddScheduleHeader/>
      <AddScheduleSetTime style={{marginTop:hScale(37)}}/>
      <AddScheduleRepeat style={{marginTop:hScale(55)}}/>
      <AddScheduleSetReadyTime style={{marginTop:hScale(49)}}/>
      <FullSizeButton 
        style={{position:"absolute", bottom:hScale(50)}}
        onPress={()=>setScreen(2)}
        >다음</FullSizeButton>
    </>
  );
}

const styles = StyleSheet.create({
  view:{
    flex:1,
    justifyContent: 'flex-end',
    margin:0,
  }
})
