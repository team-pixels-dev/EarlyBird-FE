import React from "react";
import { StyleSheet, View } from "react-native";
import Modal from "react-native-modal";
import { ThemedText } from "@/components/ui/texts/themed-text";
import { ThemedView } from "@/components/ui/themed-view";
import { useThemeColor } from "@/hooks/useThemeColor";
import { hScale, wScale } from "@/util/scaling";
import { CustomAnimatedPressable } from "../buttons/animated-pressable";
import { ModalComfirmButton } from "../buttons/modal-conform-button";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { removeTemplateSchedule } from "@/modules/redux/slice/template-schedule-slice";
import { RootState } from "@/modules/redux/root-reducer";

export type modalProps = {
  title: string;
  text: string;
  modalOpen: boolean;
  setModalOpen: ActionCreatorWithPayload<boolean>;
};

export function ConfirmModal({
  title,
  modalOpen,
  setModalOpen,
}: modalProps) {
  const textColor = useThemeColor("text");
  const brightGray = useThemeColor("brightGray");
  const schedule_id = useSelector((state: RootState)=>state.modal.main_delete_confirm.schedule_id);

  const dispatch = useDispatch();

  function onModalClose() {
    dispatch(setModalOpen(false));
    dispatch(removeTemplateSchedule(schedule_id));
  }

  return (
    <Modal
      style={styles.view}
      isVisible={modalOpen}
      backdropTransitionOutTiming={0}
      animationInTiming={250}
      animationOutTiming={250}
      backdropTransitionInTiming={0}
      onBackButtonPress={() => dispatch(setModalOpen(false))}
      onBackdropPress={() => dispatch(setModalOpen(false))}
    >
      <ThemedView style={styles.base}>
        <View style={{width:'100%', alignItems:"center", paddingTop:hScale(50), paddingBottom:hScale(50)}}>
            <ThemedText type="defaultSemiBold">{title}</ThemedText>
        </View>
        <ModalComfirmButton onPress={onModalClose}/>
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
    
    alignItems: "flex-start",
    justifyContent: "space-between",
  }
});
