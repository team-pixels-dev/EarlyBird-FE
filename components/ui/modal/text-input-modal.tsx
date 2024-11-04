import React, { useEffect, useRef, useState } from "react";
import { Animated, StyleSheet, TextInput, View } from "react-native";
import Modal from "react-native-modal";
import { ThemedText, themedTextstyles } from "@/components/ui/texts/themed-text";
import { ThemedView } from "@/components/ui/themed-view";
import { useThemeColor } from "@/hooks/useThemeColor";
import { hScale, wScale } from "@/util/scaling";

export type modalProps = {
  title: string;
  defaultText: string;
  placeHolder: string;
  modalOpen: boolean;
  setModalOpen: any;
  maxLength: number;
  dispatchText: (text: string) => void;
};

export function TextInputModal({
  title,
  defaultText,
  placeHolder,
  modalOpen,
  maxLength,
  setModalOpen,
  dispatchText,
}: modalProps) {
  const textColor = useThemeColor("text");
  const placeholderTextColor = useThemeColor("placeholderTextColor");
  const brightGray = useThemeColor("brightGray");
  const textInputRef = useRef<TextInput>(null);
  const [text, setText] = useState(defaultText);
  const [isOverLimit, setIsOverLimit] = useState(false);

  // Animation value for shaking
  const shakeAnimation = useRef(new Animated.Value(0)).current;

  // Function to trigger shake animation
  const triggerShake = () => {
    Animated.sequence([
      Animated.timing(shakeAnimation, { toValue: 10, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnimation, { toValue: -10, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnimation, { toValue: 10, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnimation, { toValue: 0, duration: 50, useNativeDriver: true }),
    ]).start();
  };

  // Handle text input change
  const handleTextChange = (input: string) => {
    if (input.length > maxLength) {
      setIsOverLimit(true);
      triggerShake(); // Trigger shake animation
      setText(input.slice(0, 12)); // Limit text to 12 characters
    } else {
      setIsOverLimit(false);
      setText(input);
    }
  };

  // Focus TextInput on modal open
  useEffect(() => {
    if (modalOpen) {
      const timer = setTimeout(() => {
        if (textInputRef.current) {
          textInputRef.current.focus();
          textInputRef.current.setSelection(0, text.length);
        }
      }, 100);

      return () => clearTimeout(timer);
    } else {
        setText('');
    }
  }, [modalOpen]);

  function onModalClose() {
    dispatchText(text);
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
        <ThemedText type="defaultSemiBold" style={{ width: wScale(310) }}>
          {title}
        </ThemedText>
        <Animated.View style={{ transform: [{ translateX: shakeAnimation }] }}>
          <TextInput
            ref={textInputRef}
            style={[
              {
                color: isOverLimit ? "red" : textColor, // Change text color to red if over limit
                backgroundColor: brightGray,
              },
              themedTextstyles.default,
              styles.input,
            ]}
            onChangeText={handleTextChange}
            placeholder={placeHolder}
            placeholderTextColor={placeholderTextColor}
            value={text}
            onBlur={onModalClose}
          />
        </Animated.View>
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
    borderRadius: wScale(8),
    width: wScale(350),
    height: hScale(182),
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: hScale(29),
    paddingBottom: hScale(20),
  },
  input: {
    width: wScale(310),
    height: hScale(90),
    padding: wScale(10),
  },
});
