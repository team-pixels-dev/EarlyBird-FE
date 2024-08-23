import React, { useState } from 'react';
import Modal from "react-native-modal";
import { Platform, StyleSheet, View } from "react-native";
import { AddScheduleScreen1 }from "./screen1";
import { AddScheduleScreen2 } from "./screen2/add-schedule-screen2";
import { ThemedView } from '@/components/ui/themed-view';
import { hScale, SCREEN_WIDTH, wScale } from '@/util/scaling';

export type modalProps  = {
  modalOpen: boolean,
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export function AddScheduleModal({ modalOpen, setModalOpen }: modalProps) {
  const [screen, setScreen] = useState(1);
  const closeModal = () => {
    setModalOpen(false)
    setScreen(1)
  }

  const renderScreen = () => {
    if (screen === 1) {
      return <AddScheduleScreen1 setScreen={setScreen} />;
    } else if (screen === 2) {
      return <AddScheduleScreen2 setScreen={setScreen} />;
    }
  };

  return (
    <Modal 
      isVisible={modalOpen} 
      backdropTransitionOutTiming={0} 
      animationInTiming={500}
      animationOutTiming={500}
      backdropTransitionInTiming={0}
      onBackButtonPress={closeModal} 
      onSwipeComplete={closeModal}
      onBackdropPress={closeModal}
      swipeDirection={['down']}
      swipeThreshold={100}
      style={styles.view}>
      <ThemedView style={styles.modalArea}>
        {renderScreen()}
      </ThemedView>
    </Modal>
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
    ...Platform.select({
      ios:{
        height:hScale(760),
      },
      android:{
        height:hScale(760),
      }
    })
  }
});
