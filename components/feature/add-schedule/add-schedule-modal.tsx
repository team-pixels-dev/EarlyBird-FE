import Modal from "react-native-modal";
import { Platform, ScrollView, StyleSheet, View } from "react-native";
import { ThemedText } from "@/components/ui/texts/themed-text";
import { ThemedView } from "@/components/ui/themed-view";
import { hScale, SCREEN_HEIGHT, SCREEN_WIDTH, wScale } from "@/util/scaling";
import { AddScheduleHeader } from "./add-schedule-header";
import { AddScheduleSetTime } from "./set-time/add-schedule-set-time";
import { AddScheduleRepeat } from "./repeat/add-schedule-repeat";
import { AddScheduleSetReadyTime } from "./set-ready-time/add-schedule-set-ready-time";
import { FullSizeButton } from "@/components/ui/buttons/full-size-button";

export type modalProps  = {
  modalOpen: boolean,
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export function AddScheduleModal({modalOpen, setModalOpen} : modalProps) {
  return (
    <Modal 
      isVisible={modalOpen} 
      onBackButtonPress={()=>setModalOpen(false)} 
      backdropTransitionOutTiming={0} 
      onSwipeComplete={()=>setModalOpen(false)}
      swipeDirection={['down']}
      style={styles.view}>
      <ThemedView style={styles.modalArea}>
        <AddScheduleHeader/>
        <AddScheduleSetTime style={{marginTop:hScale(37)}}/>
        <AddScheduleRepeat style={{marginTop:hScale(55)}}/>
        <AddScheduleSetReadyTime style={{marginTop:hScale(49)}}/>
        <FullSizeButton style={{position:"absolute", bottom:hScale(50)}}>다음</FullSizeButton>
      </ThemedView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  view:{
    flex:1,
    justifyContent: 'flex-end',
    margin:0,
  },
  modalArea: {
    borderTopRightRadius:wScale(28),
    borderTopLeftRadius:wScale(28),
    alignItems:'center',
    ...Platform.select({
      ios:{
        height:hScale(760),
      },
      android:{
        height:hScale(760),
      }
    })
    
  }
})
