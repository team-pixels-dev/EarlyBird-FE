import { FullSizeButton } from "@/components/ui/buttons/full-size-button";
import { ThemedText } from "@/components/ui/texts/themed-text";
import { ThemedView } from "@/components/ui/themed-view";
import { useThemeColor } from "@/hooks/useThemeColor";
import { hScale, wScale } from "@/util/scaling";
import { StyleSheet, View } from "react-native";
import Modal from "react-native-modal";
import { StateType } from "./add-schedule-set-ready-time";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/modules/redux/root-reducer";
import WheelPicker from '@quidone/react-native-wheel-picker';
import WheelPickerFeedback from '@quidone/react-native-wheel-picker-feedback';
import { useEffect, useState } from "react";
import { minutesToHoursMinutesValue } from "@/util/date_formatting";
import { setScheduleMove, setScheduleReady } from "@/modules/redux/slice/template-schedule-cache-slice";


export type modalProps  = {
    modalOpen: boolean,
    setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    type: StateType;
}

const minutes = [...Array(12).keys()].map((index) => ({
    value: index*5,
    label: (index*5).toString(),
}));

const hours = [...Array(13).keys()].map((index) => ({
    value: index,
    label: (index).toString(),
}));


export function DatePickerModal({ modalOpen, setModalOpen, type }: modalProps) {
    const color = useThemeColor('tint');
    const textColor = useThemeColor('text');
    const overlayItemColor = useThemeColor('tint');

    const dispatch = useDispatch();

    const schedule_ready = useSelector((state:RootState)=>state.scheduleCache.schedule_ready);
    const schedule_move = useSelector((state:RootState)=>state.scheduleCache.schedule_move);

    const init = (type === "ready" ? schedule_ready : schedule_move);
    const text = (type === "ready" ? '준비 ' : '이동 ');

    const [minute, setMinuate] = useState(minutesToHoursMinutesValue(init)[1]);
    const [hour, setHour] = useState(minutesToHoursMinutesValue(init)[0]);

    function handleModalClose(){
        
        if(type === "ready")
            dispatch(setScheduleReady(hour*60 + minute));
        else
            dispatch(setScheduleMove(hour*60 + minute));
        setModalOpen(false);
    }

    useEffect(()=>{
        console.log(schedule_ready);
        if(type === "ready") {
            setMinuate(minutesToHoursMinutesValue(schedule_ready)[1]);
            setHour(minutesToHoursMinutesValue(schedule_ready)[0]);
        } else {
            setMinuate(minutesToHoursMinutesValue(schedule_move)[1]);
            setHour(minutesToHoursMinutesValue(schedule_move)[0]);
        }
    }, [type])

    return (
        <Modal
            style={styles.view}
            isVisible={modalOpen}
            backdropTransitionOutTiming={0} 
            animationInTiming={250}
            animationOutTiming={250}
            backdropTransitionInTiming={0}
            onBackButtonPress={handleModalClose}
            onBackdropPress={handleModalClose}
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
                        onValueChanging={({item: {value}}) => {
                            WheelPickerFeedback.triggerSoundAndImpact();
                            setHour(value);
                        }}
                    />
                    <ThemedText>{"  시간  "}</ThemedText>
                   <WheelPicker
                        itemTextStyle={{color:textColor}}
                        overlayItemStyle={{backgroundColor:overlayItemColor, opacity:0.2}}
                        data={minutes}
                        value={minute}
                        width={wScale(50)}
                        onValueChanging={({item: {value}}) => {
                            WheelPickerFeedback.triggerSoundAndImpact();
                            setMinuate(value);
                        }}
                   />
                   <ThemedText>{"  분"}</ThemedText>
                </View>
            <FullSizeButton onPress={handleModalClose}>확인</FullSizeButton>
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