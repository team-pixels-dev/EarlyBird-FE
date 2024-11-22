import React, { useEffect, useState } from "react";
import { Image, StyleSheet, View } from "react-native";
import Modal from "react-native-modal";
import { ThemedText } from "@/components/ui/texts/themed-text";
import { ThemedView } from "@/components/ui/themed-view";
import { useThemeColor } from "@/hooks/useThemeColor";
import { hScale, wScale } from "@/util/scaling";

export type modalProps = {
  modalOpen: boolean;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export function FiveSecondsModal({
  modalOpen,
  setModalOpen,
}: modalProps) {
  const brightGray = useThemeColor("brightGray");
  const textColor = useThemeColor("buttonText");
  const tint = useThemeColor("tint");

  const image = require("@/assets/images/mascot/mascot_cry.png");

  const [number, setNumber] = useState(5);

  function onModalClose() {
    setModalOpen(false);
  }

  useEffect(() => {
    if (modalOpen) {
      setNumber(5); // Reset timer when modal opens
      const interval = setInterval(() => {
        console.log(number);
        setNumber((prev) => {
          if (prev <= 1) {
            clearInterval(interval); // Stop timer at 1 seconds
            setTimeout(() => setModalOpen(false), 0);
          }
          return prev - 1;
        });
      }, 1000);

      return () => {
        clearInterval(interval); // Cleanup on unmount or modal close
      };
    }
  }, [modalOpen, setModalOpen]);

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
      <View style={[styles.base, {backgroundColor:tint}]}>
        <Image source={image} style={styles.mascote}/>
        <View style={styles.textArea}>
          <ThemedText type="title" style={{textAlign:'center', color:textColor, fontSize:hScale(16), lineHeight:hScale(20)}}>
            {"또 지각하지 않으려면\n5초가 지나기 전에 준비시작해야 해요!"}
          </ThemedText>
          <ThemedText type="ONEMobilePOP" 
            style={{
                textAlign:'center', 
                color:textColor, 
                marginTop:hScale(36), 
                fontSize:hScale(72), 
                lineHeight:hScale(72)
                }}>
            {Math.max(number, 1)}
          </ThemedText>
        </View>
      </View>
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
  mascote: {
    position: "absolute",
    top: hScale(-65),
    width: hScale(119),
    height: hScale(123),
    objectFit: "contain",
  },
  base: {
    borderRadius: hScale(8),
    width: wScale(291),
    height: hScale(271),
    alignItems: "center",
    justifyContent: "flex-start",
  },
  textArea: {
    marginTop: hScale(92),
    justifyContent: 'center'
  }
});
