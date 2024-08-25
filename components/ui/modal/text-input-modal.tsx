import { FullSizeButton } from "@/components/ui/buttons/full-size-button";
import { ThemedText } from "@/components/ui/texts/themed-text";
import { ThemedView } from "@/components/ui/themed-view";
import { useThemeColor } from "@/hooks/useThemeColor";
import { hScale, wScale } from "@/util/scaling";
import { useEffect, useRef, useState } from "react";
import { Keyboard, StyleSheet, TextInput, View } from "react-native";
import Modal from "react-native-modal";
import { useDispatch } from "react-redux";

export type modalProps  = {
    modalOpen: boolean,
    setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  }

export function TextInputModal({ modalOpen, setModalOpen }: modalProps) {
    const color = useThemeColor('tint');
    const dispatch = useDispatch();
    const textInputRef = useRef<TextInput>(null);

    const [text, setText] = useState('');

    useEffect(() => {
        const timer = setTimeout(() => {
            textInputRef.current?.focus(); // 컴포넌트가 마운트된 후 포커스를 설정하여 키보드를 엽니다.
        }, 100); // 짧은 지연 시간 추가

        return () => clearTimeout(timer);  // 타이머를 정리합니다.
    }, [modalOpen]);

    function handleDataCange(date: Date) {
        // dispatch(setScheduleStartTimeDate(date.toISOString()));
    }
    return (
        <Modal
            style={styles.view}
            isVisible={modalOpen}
            backdropTransitionOutTiming={0} 
            animationInTiming={250}
            animationOutTiming={250}
            backdropTransitionInTiming={0}
            onBackButtonPress={()=>setModalOpen(false)}
            onBackdropPress={()=>setModalOpen(false)}
        >
            <ThemedView style={styles.base}>
                <ThemedText type="defaultSemiBold">기본텍스트</ThemedText>
                <View style={styles.content}>
                <TextInput
                    ref={textInputRef}
                    style={styles.input}
                    onChangeText={setText}
                    value={text}
                    placeholder={text}
                />
                </View>
            <FullSizeButton onPress={()=>{setModalOpen(false)}}>확인</FullSizeButton>
            </ThemedView>
        </Modal>
    )
}

const styles = StyleSheet.create({
    view: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 0,
    },
    content: {
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    base : {
        borderRadius:wScale(28),
        width: '100%',
        height: hScale(200),
        alignItems: 'center',
        justifyContent: 'space-evenly'
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
      },
})