import React from "react";
import { StyleSheet, View } from "react-native";
import Modal from "react-native-modal";
import { ThemedText } from "@/components/ui/texts/themed-text";
import { ThemedView } from "@/components/ui/themed-view";
import { useThemeColor } from "@/hooks/useThemeColor";
import { hScale, wScale } from "@/util/scaling";
import { CustomAnimatedPressable } from "../buttons/animated-pressable";
import { ModalComfirmButton } from "../buttons/modal-conform-button";

export type modalProps = {
  title: string;
  text: string;
  modalOpen: boolean;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export function RemaindModal({
  title,
  text,
  modalOpen,
  setModalOpen,
}: modalProps) {
  const textColor = useThemeColor("text");
  const brightGray = useThemeColor("brightGray");

  function onModalClose() {
    setModalOpen(false);
  }

  return (
    <Modal
      style={styles.view}
      isVisible={modalOpen}
      backdropTransitionOutTiming={0}
      animationInTiming={250}
      animationOutTiming={250}
      backdropTransitionInTiming={0}
      onBackButtonPress={() => setModalOpen(false)}
      onBackdropPress={() => setModalOpen(false)}
    >
      <ThemedView style={styles.base}>
        <View style={{paddingTop: hScale(66), paddingLeft: wScale(20)}}>
          <ThemedText type="ONEMobilePOP">
            {title.substring(0, 11)}
          </ThemedText>
          <ThemedText type="ONEMobilePOP">
            {title.substring(12)}
          </ThemedText>
          <ThemedText type="description" style={{marginTop:hScale(15)}}>
            {text.substring(0, 9)}
          </ThemedText>
          <ThemedText type="description">
            {text.substring(9)}
          </ThemedText>
        </View>
        <ModalComfirmButton onPress={()=>(setModalOpen(false))}/>
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
    height: hScale(365),
    alignItems: "flex-start",
    justifyContent: "space-between",
  }
});
