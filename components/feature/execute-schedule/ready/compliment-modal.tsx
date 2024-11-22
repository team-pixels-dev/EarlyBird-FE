import React from "react";
import { StyleSheet, View, Image, Text } from "react-native";
import Modal from "react-native-modal";
import { ThemedText } from "@/components/ui/texts/themed-text";
import { ThemedView } from "@/components/ui/themed-view";
import { useThemeColor } from "@/hooks/useThemeColor";
import { hScale, wScale } from "@/util/scaling";
import { ModalComfirmButton } from "@/components/ui/buttons/modal-conform-button";

export type modalProps = {
  modalOpen: boolean;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export function ComplimentModal({
  modalOpen,
  setModalOpen,
}: modalProps) {
  const textColor = useThemeColor("text");
  const brightGray = useThemeColor("brightGray");

  const image = require("@/assets/images/mascot/mascot_run_noeffect.png");

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
            {"시작할 마음을 먹었다니,\n굉장한걸요?"}
          </ThemedText>
          <Image source={image} style={styles.mascote}/>
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
    height: hScale(241),
    alignItems: "center",
    justifyContent: "space-between",
  },
  textArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mascote: {
    marginTop: hScale(10),
    width: hScale(62),
    height: hScale(65),
    objectFit: "contain",
  },
});
