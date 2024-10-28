import React, { useRef } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import Modal from "react-native-modal";
import { ThemedText } from "@/components/ui/texts/themed-text";
import { ThemedView } from "@/components/ui/themed-view";
import { hScale, SCREEN_HEIGHT, SCREEN_WIDTH, wScale } from "@/util/scaling";
import { ModalComfirmButton } from "@/components/ui/buttons/modal-conform-button";
import { useDispatch } from "react-redux";

export function RatingModal() {
  const dispatch = useDispatch();

  function onModalClose() {
    
  }

  return (
    <ThemedView style={styles.base}>
        <ThemedText type="ONEMobilePOP" style={styles.title}>
          {"얼리버드를 주변에 얼마나\n추천하고 싶으신가요?"}
        </ThemedText>
        <ModalComfirmButton onPress={onModalClose}/>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: wScale(8),
    width: wScale(270),
    height: hScale(380),
    alignItems: "flex-start",
    justifyContent: "space-between",
    paddingTop: hScale(36),
  },
  title: {
    marginLeft:wScale(20),
    fontSize:hScale(16), 
    lineHeight:hScale(20)
  }
});
