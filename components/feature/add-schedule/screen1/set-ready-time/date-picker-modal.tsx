import { FullSizeButton } from "@/components/ui/buttons/full-size-button";
import { ThemedText } from "@/components/ui/texts/themed-text";
import { ThemedView } from "@/components/ui/themed-view";
import { useThemeColor } from "@/hooks/useThemeColor";
import { hScale, wScale } from "@/util/scaling";
import { StyleSheet, View } from "react-native";
import DatePicker from "react-native-date-picker";
import Modal from "react-native-modal";
import { Toggle } from "@/components/ui/toggles/toggle";
import { StateType } from "./add-schedule-set-ready-time";
import { useDispatch, useSelector } from "react-redux";
import { setScheduleMoveTimeDate, setScheduleStartTimeDate } from "@/modules/redux/slice/template-schedule-cache-slice";
import { RootState } from "@/modules/redux/root-reducer";
import { getFullDates } from "@/util/date_formatting";

export type modalProps  = {
    modalOpen: boolean,
    setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    type: StateType;
  }

export function DatePickerModal({ modalOpen, setModalOpen, type }: modalProps) {
    const color = useThemeColor('tint');

    const dispatch = useDispatch();

    const schedule_ready_time = useSelector((state: RootState) => state.scheduleCache.schedule_start_time.date);
    const schedule_move_time = useSelector((state: RootState) => state.scheduleCache.schedule_move_time.date);

    const date = (type === "ready" ? new Date(schedule_ready_time) : new Date(schedule_move_time));
    const text = (type === "ready" ? '준비 시작 ' : '이동 출발 ');

    function handleDataCange(date: Date) {
        date.setSeconds(0,0);
        if(type === "ready") {
            dispatch(setScheduleStartTimeDate(date.toISOString()));
        } else {
            dispatch(setScheduleMoveTimeDate(date.toISOString()));
        }
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
                <ThemedText type="defaultSemiBold">{text}시간</ThemedText>
                <View style={styles.content}>
                    <Toggle type={type}/>
                    <DatePicker
                        mode="time"
                        date={date}
                        is24hourSource={'locale'}
                        onDateChange={handleDataCange}
                        locale='ko-KR-ko'
                        dividerColor={color}
                        style={{height:hScale(138)}}
                        />
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
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    base : {
        borderTopRightRadius:wScale(28),
        borderTopLeftRadius:wScale(28),
        width: '100%',
        height: hScale(350),
        alignItems: 'center',
        justifyContent: 'space-evenly'
    }
})