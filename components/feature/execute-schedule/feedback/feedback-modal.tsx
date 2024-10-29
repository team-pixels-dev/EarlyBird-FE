import React, { useEffect, useRef, useState } from "react";
import { Animated, Keyboard, Pressable, StyleSheet, TextInput, View } from "react-native";
import Modal from "react-native-modal";
import { ThemedText, themedTextstyles } from "@/components/ui/texts/themed-text";
import { ThemedView } from "@/components/ui/themed-view";
import { useThemeColor } from "@/hooks/useThemeColor";
import { hScale, wScale } from "@/util/scaling";
import { ModalComfirmButton } from "@/components/ui/buttons/modal-conform-button";
import { RatingModal } from "@/components/feature/execute-schedule/feedback/rating-modal";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/modules/redux/root-reducer";
import { setFeedBack } from "@/modules/redux/slice/execute-schedule-data-slice";
import client from "@/modules/axios/client";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { serverFomat } from "@/util/date_formatting";

export function FeedbackModal() {
  const textColor = useThemeColor("text");
  const brightGray = useThemeColor("brightGray");
  const textInputRef = useRef<TextInput>(null);
  const [text, setText] = useState("");
  const [page, setPage] = useState(1);
  const modalOpen = useSelector((state:RootState)=>state.modal.feedback_modal.modalOpen);
  const dispatch = useDispatch();

  // Focus TextInput on modal open
  useEffect(() => {
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

  // Handle text input change
  const handleTextChange = (input: string) => {
    setText(input);
  };

  async function onModalComfirm() {
    dispatch(setFeedBack(text));
    const formData = {
      "comment" : text,
      "clientId" : await AsyncStorage.getItem('deviceId'),
      "createdAt" : serverFomat(new Date())
    }
    console.log(formData);
    client.post('/api/v1/feedbacks/comments', formData)
      .then((res)=>{console.log(res)})
      .catch((err)=>{console.log(err)});
    setPage(2);
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
            서비스에 대한 피드백을 작성해주세요
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
              placeholder={"300자 이내"}
              value={text}
              textAlignVertical="top"
              multiline={true}
              numberOfLines={4}
              maxLength={300}
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
