import React from "react";
import { StyleSheet, View } from "react-native";
import Modal from "react-native-modal";
import { ThemedText } from "@/components/ui/texts/themed-text";
import { ThemedView } from "@/components/ui/themed-view";
import { useThemeColor } from "@/hooks/useThemeColor";
import { hScale, wScale } from "@/util/scaling";
import { CustomAnimatedPressable } from "@/components/ui/buttons/animated-pressable";
import { ModalComfirmButton } from "@/components/ui/buttons/modal-conform-button";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { removeschedule } from "@/modules/redux/slice/template-schedule-slice";
import { RootState } from "@/modules/redux/root-reducer";
import { FullSizeButton } from "../buttons/full-size-button";

export interface modalOption {
  text : string;
  task : ()=>void;
}

export type modalProps = {
  title: string;
  modalOpen: boolean;
  option1: modalOption,
  option2 : modalOption,
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export function TwoOptionModal({
  title,
  modalOpen,
  option1,
  option2,
  setModalOpen,
}: modalProps) {
  const brightGray = useThemeColor("brightGray");

  const dispatch = useDispatch();

  function onModalClose(option : number) {
    setModalOpen(false);
    if(option === 1) {
      option1.task();
    } else if (option === 2) {
      option2.task();
    }
  }

  return (
    <Modal
      style={styles.view}
      isVisible={modalOpen}
      backdropTransitionOutTiming={0}
      animationInTiming={250}
      animationOutTiming={250}
      backdropTransitionInTiming={0}
    >
      <ThemedView style={styles.base}>
        <ThemedText style={{width : wScale(220)}} type="defaultSemiBold">{title}</ThemedText>
        <FullSizeButton style={styles.button} onPress={()=>onModalClose(1)}>{option1.text}</FullSizeButton>
        <FullSizeButton style={[styles.button, {backgroundColor:brightGray}]} onPress={()=>onModalClose(2)}>{option2.text}</FullSizeButton>
      </ThemedView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 0,
  },
  base: {
    borderRadius: hScale(8),
    width: wScale(270),
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: hScale(20),
    rowGap: hScale(15)
  },
  button : {
    width : wScale(220),
    height: hScale(48)
  }
});
