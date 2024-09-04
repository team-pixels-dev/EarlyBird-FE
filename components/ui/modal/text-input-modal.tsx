import { FullSizeButton } from "@/components/ui/buttons/full-size-button";
import { ThemedText, themedTextstyles } from "@/components/ui/texts/themed-text";
import { ThemedView } from "@/components/ui/themed-view";
import { useThemeColor } from "@/hooks/useThemeColor";
import { hScale, wScale } from "@/util/scaling";
import { useEffect, useRef, useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import Modal from "react-native-modal";

export type modalProps  = {
    title: string;
    defaultText: string;
    modalOpen: boolean;
    setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    dispatchText: (text: string) => void;
  }

export function TextInputModal({ title, defaultText, modalOpen, setModalOpen, dispatchText }: modalProps) {
    const textColor = useThemeColor('text');
    const textInputRef = useRef<TextInput>(null);
    const [text, setText] = useState(defaultText);

    // 모달 open 시 focus 설정
    useEffect(() => {
        const timer = setTimeout(() => {
            if (textInputRef.current) {
                textInputRef.current.focus();
                textInputRef.current.setSelection(0, text.length);
            }
        }, 100);

        return () => clearTimeout(timer);
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
            onBackButtonPress={()=>setModalOpen(false)}
            onBackdropPress={()=>setModalOpen(false)}
        >
            <ThemedView style={styles.base}>
                <ThemedText type="defaultSemiBold">{title}</ThemedText>
                <View style={styles.content}>
                <TextInput
                    ref={textInputRef}
                    style={[{color:textColor}, themedTextstyles.defaultSemiBold]}
                    onChangeText={setText}
                    // placeholder={"여기에 입력하세요"}
                    value={text}
                />
                </View>
            <FullSizeButton onPress={onModalClose}>확인</FullSizeButton>
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
        justifyContent: 'center',
        alignItems: 'center',
    },
    base : {
        borderRadius:wScale(28),
        width: '100%',
        height: hScale(200),
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: hScale(20),
        paddingBottom: hScale(20),
    }
})