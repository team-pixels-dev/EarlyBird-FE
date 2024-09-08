import { hScale, wScale } from "@/util/scaling";
import { useState } from "react";
import { View, StyleSheet, ViewProps } from "react-native";
import { DatePickerModal } from "./date-picker-modal";
import { useScheduleTimes } from "@/hooks/useScheduleTimes";
import { TimeTaken } from "./time-taken";
import { SetTimeBox } from "./set-time-box";

export type StateType = "ready" | "move";

export function AddScheduleSetReadyTime({style} : ViewProps ) {
    const [modalOpen, setModalOpen] = useState(false);
    const [type, setType] = useState<StateType>('ready');

    return (
        <View style={[styles.base, style]}>
            <SetTimeBox type="move" setType={setType} setModalOpen={setModalOpen} />
            <SetTimeBox type="ready" setType={setType} setModalOpen={setModalOpen} />
            <DatePickerModal 
                modalOpen={modalOpen} 
                setModalOpen={setModalOpen} 
                type={type}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    base: {
        height: hScale(162),
        justifyContent: 'space-between',
        alignItems: 'flex-end'
    },
    setTimeView: {
        height: hScale(50),
        width: wScale(342),
        paddingHorizontal: wScale(20),
        borderRadius: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems:'center'
    },
    dateText: {
        fontSize: hScale(16),
        width: '50%',
        textAlign: 'right'
    }
})