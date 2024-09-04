import { hScale, wScale } from '@/util/scaling';
import React, {useState} from 'react';
import { StyleSheet, View, Button } from 'react-native';
import {Calendar} from 'react-native-calendars';
import Modal from "react-native-modal";

export type modalProps  = {
    modalOpen: boolean,
    setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export function CalenderPickerModal({modalOpen, setModalOpen} : modalProps) {
  const [selected, setSelected] = useState('');
  
  const closeModal = () => {
    setModalOpen(false)
  }

  const handleConfirm = () => {
    // 선택된 날짜를 처리하는 로직을 여기에 추가할 수 있습니다.
    closeModal();
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
        scrollHorizontal={true}
        onSwipeComplete={closeModal}
        onBackdropPress={closeModal}
        style={styles.view}
    >
        <View style={styles.content}>
            <Calendar
                onDayPress={(day: { dateString: React.SetStateAction<string>; }) => {
                    setSelected(day.dateString);
                }}
                markedDates={{
                    [selected]: {selected: true, disableTouchEvent: true, selectedDotColor: 'orange'}
                }}
            />
            <Button title="확인" onPress={handleConfirm} />
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
