import { CustomAnimatedPressable } from "@/components/ui/buttons/animated-pressable";
import { TextInputModal } from "@/components/ui/modal/text-input-modal";
import { ThemedText } from "@/components/ui/texts/themed-text";
import { useThemeColor } from "@/hooks/useThemeColor";
import { RootState } from "@/modules/redux/root-reducer";
import { setScheduleTitle } from "@/modules/redux/slice/template-schedule-cache-slice";
import { hScale, wScale } from "@/util/scaling";
import { useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

export function AddScheduleHeader() {
    const gray = useThemeColor("gray");
    const [modalOpen, setModalOpen] = useState(false);
    const schedule_title = useSelector((state: RootState) => state.templateScheduleCache.schedule_title);
    const [text, setText] = useState(schedule_title);
    const dispatch = useDispatch();

    function onSaveTitle() {
        console.log('save')
        dispatch(setScheduleTitle(text));
    }

    return (
        <CustomAnimatedPressable style={styles.base} onPress={()=>setModalOpen(true)}>
            <ThemedText type="defaultSemiBold">출근하기</ThemedText>
            <View style={[styles.line, {backgroundColor:gray}]} />
            <TextInputModal modalOpen={modalOpen} setModalOpen={setModalOpen} />
        </CustomAnimatedPressable>
    );
}

const styles = StyleSheet.create({
    base: {
        height: hScale(76),
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    line: {
        marginTop: hScale(6),
        height: 2,
        width: 115,
    }
});
