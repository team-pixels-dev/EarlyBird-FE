import { FullSizeButton } from "@/components/ui/buttons/full-size-button";
import { ThemedText } from "@/components/ui/texts/themed-text";
import { ThemedView } from "@/components/ui/themed-view";
import { useThemeColor } from "@/hooks/useThemeColor";
import { hScale, wScale } from "@/util/scaling";
import { StyleSheet, View } from "react-native";
import Modal from "react-native-modal";
import { StateType } from "./add-schedule-set-ready-time";
import { useDispatch, useSelector } from "react-redux";
import { setScheduleMoveTimeDate, setScheduleStartTimeDate } from "@/modules/redux/slice/template-schedule-cache-slice";
import { RootState } from "@/modules/redux/root-reducer";
import WheelPicker from '@quidone/react-native-wheel-picker';
import WheelPickerFeedback from '@quidone/react-native-wheel-picker-feedback';
import { useEffect, useState } from "react";


export type modalProps  = {
    modalOpen: boolean,
    setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    type: StateType;
}

const minuates = [...Array(12).keys()].map((index) => ({
    value: index*5,
    label: (index*5).toString(),
}));

const hours = [...Array(13).keys()].map((index) => ({
    value: index,
    label: (index).toString(),
}));


export function DatePickerModal({ modalOpen, setModalOpen, type }: modalProps) {
    const [minuate, setMinuate] = useState(0);
    const [hour, setHour] = useState(0);
    const color = useThemeColor('tint');
    const textColor = useThemeColor('text');
    const overlayItemColor = useThemeColor('tint');

    const dispatch = useDispatch();

    const schedule_ready_time = useSelector((state: RootState) => state.scheduleCache.schedule_start_time.date);
    const schedule_move_time = useSelector((state: RootState) => state.scheduleCache.schedule_move_time.date);

    const date = (type === "ready" ? new Date(schedule_ready_time) : new Date(schedule_move_time));
    const text = (type === "ready" ? '준비 ' : '이동 ');

    function handleDataCange(date: Date) {
        date.setSeconds(0,0);
        if(type === "ready") {
            dispatch(setScheduleStartTimeDate(date.toISOString()));
        } else {
            dispatch(setScheduleMoveTimeDate(date.toISOString()));
        }
    }

    function handleModalClose(){
        
    }

    useEffect(()=>{
        console.log(minuate)
    }, [modalOpen])

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
                <ThemedText type="defaultSemiBold">{text}시간</ThemedText>
                <View style={styles.content}>
                    <WheelPicker
                        itemTextStyle={{color:textColor}}
                        overlayItemStyle={{backgroundColor:overlayItemColor, opacity:0.2}}
                        data={hours}
                        value={hour}
                        width={wScale(50)}
                        // onValueChanging={() => {
                        //     WheelPickerFeedback.triggerSoundAndImpact();
                        // }}
                        onValueChanged={({item: {value}}) => {
                            setHour(value);
                        }}
                    />
                    <ThemedText>{"  시간  "}</ThemedText>
                   <WheelPicker
                        itemTextStyle={{color:textColor}}
                        overlayItemStyle={{backgroundColor:overlayItemColor, opacity:0.2}}
                        data={minuates}
                        value={minuate}
                        width={wScale(50)}
                        // onValueChanging={() => {
                        //     WheelPickerFeedback.triggerSoundAndImpact();
                        // }}
                        onValueChanged={({item: {value}}) => {
                            setMinuate(value);
                        }}
                   />
                   <ThemedText>{"  분"}</ThemedText>
                </View>
            <FullSizeButton onPress={()=>setModalOpen(false)}>확인</FullSizeButton>
            </ThemedView>
        </Modal>
    )
}

const styles = StyleSheet.create({
    view: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        margin: 0,
    },
    content: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: hScale(150)
    },
    base : {
        borderTopRightRadius:wScale(28),
        borderTopLeftRadius:wScale(28),
        width: '100%',
        height: hScale(350),
        alignItems: 'center',
        justifyContent: 'space-evenly'
    },
})