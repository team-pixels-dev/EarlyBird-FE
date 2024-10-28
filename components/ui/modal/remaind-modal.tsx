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
        <View style={styles.textArea}>
          <ThemedText type="ONEMobilePOP" style={{textAlign:'center'}}>
            {title}
          </ThemedText>
          <ThemedText type="description" style={{textAlign:'center', marginTop:hScale(15)}}>
            {text}
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
    height: hScale(212),
    alignItems: "center",
    justifyContent: "space-between",
  },
  textArea: {
    flex: 1,
    justifyContent: 'center'
  }
});
