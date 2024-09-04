import { setScheduleDate, setScheduleType } from '@/modules/redux/slice/template-schedule-cache-slice';
import { hScale, wScale } from '@/util/scaling';
import React, {useState} from 'react';
import { StyleSheet, View, Button } from 'react-native';
import {Calendar, CalendarList} from 'react-native-calendars';
import Modal from "react-native-modal";
import { useDispatch } from 'react-redux';

export type modalProps  = {
    modalOpen: boolean,
    setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export function CalenderPickerModal({modalOpen, setModalOpen} : modalProps) {
  const [selected, setSelected] = useState('');
  const now = new Date();
  const dispatch = useDispatch();
  
  const closeModal = () => {
    if(selected !== '') {
        dispatch(setScheduleType("date"));
        dispatch(setScheduleDate(selected));
    }
    setModalOpen(false)
  }

  return (
    <Modal
        animationIn='fadeIn'
        animationOut='fadeOut'
        isVisible={modalOpen}
        backdropTransitionOutTiming={0} 
        animationInTiming={100}
        animationOutTiming={100}
        backdropTransitionInTiming={0}
        onBackdropPress={closeModal}
        onBackButtonPress={closeModal}
        style={styles.view}
    >
        <View style={styles.content}>
            <Calendar
                onDayPress={(day: { dateString: React.SetStateAction<string>; }) => {
                    setSelected(day.dateString);
                }}
                markedDates={{
                    [selected]: {selected: true, disableTouchEvent: true}
                }}
                enableSwipeMonths={true}
                minDate={now.getFullYear()+'-'+(now.getMonth()+1)+'-'+now.getDate()}
            />
            <Button title="확인" onPress={closeModal} />
        </View>
    </Modal>
  );
};

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
        backgroundColor: 'white',  // 추가한 버튼이 명확하게 보이도록 배경색 설정
        borderRadius: wScale(28),
        padding: hScale(20),
    },
    base : {
        borderRadius: wScale(28),
        width: '100%',
        height: hScale(200),
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: hScale(20),
        paddingBottom: hScale(20),
    }
});
