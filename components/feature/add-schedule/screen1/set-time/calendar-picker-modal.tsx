import { CustomAnimatedPressable } from '@/components/ui/buttons/animated-pressable';
import { ThemedText } from '@/components/ui/texts/themed-text';
import { ThemedView } from '@/components/ui/themed-view';
import { setScheduleDate, setScheduleType } from '@/modules/redux/slice/template-schedule-cache-slice';
import { hScale, wScale } from '@/util/scaling';
import React, {useState} from 'react';
import { StyleSheet, View, Button } from 'react-native';
import {Calendar, CalendarList} from 'react-native-calendars';
import Modal from "react-native-modal";
import { useDispatch } from 'react-redux';
import {LocaleConfig} from 'react-native-calendars';
import { useCalenderTheme } from '@/hooks/useCalenderTheme';
import { calendarLocale } from '@/constants/calendar-locale';
import { useThemeColor } from '@/hooks/useThemeColor';
import { getRNCalendarFormet } from '@/util/date_formatting';

LocaleConfig.locales['ko'] = calendarLocale;

LocaleConfig.defaultLocale = 'ko';

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
        <ThemedView style={styles.content}>
            <Calendar
                theme={useCalenderTheme()}
                onDayPress={(day: { dateString: React.SetStateAction<string>; }) => {
                    setSelected(day.dateString);
                }}
                markedDates={{
                    [selected]: {selected: true, disableTouchEvent: true}
                }}
                enableSwipeMonths={true}
                minDate={getRNCalendarFormet(now)}
            />
            <CustomAnimatedPressable style={[{backgroundColor:useThemeColor("tint")}, styles.okButton]} onPress={closeModal}>
                <ThemedText type="default" style={{color:"#000000"}}>확인</ThemedText>
            </CustomAnimatedPressable>
        </ThemedView>
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
        borderRadius: hScale(8),
        width: wScale(270),
        paddingTop: hScale(20),
        rowGap: hScale(20),
    },
    okButton : {
        width:'100%',
        height: wScale(54),
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomLeftRadius: hScale(8),
        borderBottomRightRadius: hScale(8),
    }
});
