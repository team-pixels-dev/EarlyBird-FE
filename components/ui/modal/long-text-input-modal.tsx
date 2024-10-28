import React, { useEffect, useRef, useState } from "react";
import { Animated, Keyboard, Pressable, StyleSheet, TextInput, View } from "react-native";
import Modal from "react-native-modal";
import { ThemedText, themedTextstyles } from "@/components/ui/texts/themed-text";
import { ThemedView } from "@/components/ui/themed-view";
import { useThemeColor } from "@/hooks/useThemeColor";
import { hScale, wScale } from "@/util/scaling";
import { ModalComfirmButton } from "../buttons/modal-conform-button";
import { RatingModal } from "@/components/feature/execute-schedule/feedback/rating-modal";

export type modalProps = {
  title: string;
  defaultText: string;
  placeHolder: string;
  modalOpen: boolean;
  setModalOpen: (modalOpen: boolean) => void;
  maxLength: number;
  dispatchText: (text: string) => void;
};

export function LongTextInputModal({
    title,
    defaultText,
    placeHolder,
    modalOpen,
    maxLength,
    setModalOpen,
    dispatchText,
  } : modalProps) {
  const textColor = useThemeColor("text");
  const brightGray = useThemeColor("brightGray");
  const textInputRef = useRef<TextInput>(null);
  const [text, setText] = useState(defaultText);
  const [page, setPage] = useState(1);
  // Handle text input change
  const handleTextChange = (input: string) => {
    setText(input);
  };

  // Focus TextInput on modal open
  useEffect(() => {
    console.log("open");
    if (modalOpen) {
      const timer = setTimeout(() => {
        if (textInputRef.current) {
          textInputRef.current.focus();
          // textInputRef.current.setSelection(0, text.length);
        }
      }, 100);

      return () => clearTimeout(timer);
    } else {
        setText('');
    }
  }, [modalOpen]);

  function onModalComfirm() {
    dispatchText(text);
    setPage(2);
    // setModalOpen(false);
  }

  return (
    <Pressable onPress={()=>{Keyboard.dismiss()}}>
      <Modal
        style={
          [
            page === 1 ? {
              justifyContent: "flex-start",
              marginTop: hScale(80),
            } : {}, styles.view
          ]}
        isVisible={modalOpen}
        backdropTransitionOutTiming={0}
        animationInTiming={250}
        animationOutTiming={250}
        backdropTransitionInTiming={0}
      >
        { page === 1 ?
        <ThemedView style={styles.base}>
          <ThemedText type="defaultSemiBold" style={{ width: wScale(310) }}>
            {title}
          </ThemedText>
            <TextInput
              ref={textInputRef}
              style={[
                {
                  color: textColor,
                  backgroundColor: brightGray,
                },
                themedTextstyles.default,
                styles.input,
              ]}
              onChangeText={handleTextChange}
              placeholder={placeHolder}
              value={text}
              textAlignVertical="top"
              multiline={true}
              numberOfLines={4}
              maxLength={maxLength}
            />
          <ModalComfirmButton onPress={onModalComfirm}/>
        </ThemedView> : 
        <RatingModal/>
        }
      </Modal>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    alignItems: "center",
    margin: 0,
  },
  base: {
    borderRadius: wScale(8),
    width: wScale(350),
    height: hScale(400),
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: hScale(29),
  },
  input: {
    width: wScale(310),
    height: hScale(250),
    padding: wScale(10),
    fontSize: hScale(16)
  },
});
