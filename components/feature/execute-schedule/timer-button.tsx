import React, { useEffect, useState } from 'react';
import { StyleSheet, useColorScheme, View, ViewProps } from 'react-native';
import Animated, { Easing, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { CustomAnimatedPressable } from '@/components/ui/buttons/animated-pressable';
import { RegularText } from '@/components/ui/texts/regular-text';
import * as Haptics from 'expo-haptics';
import { useThemeColor } from '@/hooks/useThemeColor';
import { hScale, wScale } from '@/util/scaling';
import { useScheduleTimes } from '@/hooks/useScheduleTimes';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/modules/redux/root-reducer';
import { secondsToHoursMinutesSeconds } from '@/util/date_formatting';
import { setFinalExecuteMode } from '@/modules/redux/slice/execute-schedule-data-slice';
import { useExecuteMode } from '@/hooks/useExecuteMode';
import { resetModals, setFeedbackModalOpen, setFeedbackModalScheduleId } from '@/modules/redux/slice/modal-slice';
import { TwoOptionModal } from '@/components/ui/modal/two-option-modal';
import client from '@/modules/axios/client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { convertScheduleIdClientToServer } from '@/util/convert-schedule-id';
import { FiveSecondsModal } from './ready/five-seconds-modal';
import { ComplimentModal } from './ready/compliment-modal';


export function TimerButton({style} : ViewProps) {
  const tint = useThemeColor("tint");
  const brightGray = useThemeColor("brightGray");
  const errorColor = useThemeColor("error");
  const defaultButtonText = useThemeColor("buttonText");
  const [buttonTextColor, setButtonTextColor] = useState(defaultButtonText);
  const scale = wScale(347);
  const theme = useColorScheme() ?? 'light';

  const currentMinute = useExecuteMode(); // 분이 변경될 때마다 execute mode를 판단

  // Shared value to track animation progress (from 0 to 1)
  const progress = useSharedValue(0);

  const executeScheduleData = useSelector((state:RootState)=>state.executeScheduleData);
  const final_execute_mode = executeScheduleData.final_excute_mode;
  const scheduleDateTime = new Date(useSelector((state: RootState)=>state.scheduleCache.schedule_date));
  const { moveDateTime, startDateTime } = useScheduleTimes();
  const schedule_ready = useSelector((state:RootState)=>state.scheduleCache.schedule_ready);
  const schedule_move = useSelector((state:RootState)=>state.scheduleCache.schedule_move);

  const [buttonText, setButtonText] = useState("");
  const [backgroundColor, setBackgroundColor] = useState(brightGray);

  const [twoOptionModalOpen, setTwoOptionModalOpen] = useState(false);

  const [title, setTitle] = useState("");
  const [option1, setOption1] = useState({text : "1", task : ()=>{}});
  const [option2, setOption2] = useState({text : "2", task : ()=>{}});

  const [fiveSecondsModalOpen, setFiveSecondsModalOpen] = useState(false);
  const [complimentModalOpen, setComplimentModalOpen] = useState(false);
  
  function switchMode() {
    if(final_execute_mode === "wait_start") {
      dispatch(setFinalExecuteMode("ready"));
      setComplimentModalOpen(true);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    } else if (final_execute_mode === "done" || final_execute_mode === "done_rate"){
      // 피드백 및 종료를 위한 모달 open
      dispatch(setFeedbackModalOpen(true));
      dispatch(setFeedbackModalScheduleId(executeScheduleData.schedule_id));
    } else if (final_execute_mode === "before_start") {
      // setTitle("지금 준비 시작할까요?")
      // setOption1({text : "네, 지금 시작해요", task : ()=>{dispatch(setFinalExecuteMode("ready"))}});
      // setOption2({text : "아니요", task : ()=>{}});
      // setTwoOptionModalOpen(true);
    } else if (final_execute_mode === "ready") {
      // setTitle("지금 이동하시나요?")
      // setOption1({text : "네, 지금 이동해요", task : ()=>{dispatch(setFinalExecuteMode("moving"))}});
      // setOption2({text : "아니요", task : ()=>{}});
      // setTwoOptionModalOpen(true);
    } else if (final_execute_mode === "moving") {
      setTitle("일찍 도착하셨나요?")
      setOption1({text : "네, 도착했어요!", task : async ()=>{
        const formData = {
          "appointmentId": convertScheduleIdClientToServer(executeScheduleData.schedule_id),
          "clientId": await AsyncStorage.getItem('deviceId')
        }

        console.log(formData);
        client.post('/api/v1/log/arrive-on-time-event', formData)
        .then((res)=>{console.log(res)})
        .catch((err)=>{console.log(err)});

        dispatch(setFinalExecuteMode("done"));
      }});
      setOption2({text : "아직 가는 중이에요", task : ()=>{}});
      setTwoOptionModalOpen(true);
    } else {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    }
  }

  // 남은 시간 계산
  function getRemainTime(datetime : Date) {
    const now = new Date();
    return Math.floor((datetime.getTime() - now.getTime()) / 1000); // 남은 시간(초)
  }

  const dispatch = useDispatch();

  useEffect(() => {
    const updateTime = () => {
      console.log(final_execute_mode);
      const remain_time_for_schedule = getRemainTime(scheduleDateTime);

      switch (final_execute_mode) {
        case "before_start" : 
          const remain_time_for_ready = getRemainTime(startDateTime);
          if(remain_time_for_ready > 0){
            setButtonText("준비까지 " + secondsToHoursMinutesSeconds(remain_time_for_ready));
            if (remain_time_for_ready === 5) {
              setFiveSecondsModalOpen(true);
            }
          } else {
              setButtonText("준비 시작");
          }
          break;
        case "wait_start" : 
          clearInterval(interval);
          break;
        case "ready" :
          const remain_time_for_move = getRemainTime(moveDateTime);
          const ready_value = (remain_time_for_move / (schedule_ready * 60));
          const next_ready_value = ((remain_time_for_move-1) / (schedule_ready * 60));
          progress.value = Math.min(Math.max(ready_value, 0), 1);
          progress.value = withTiming(Math.min(Math.max(next_ready_value, 0), 1), { duration: 1000, easing: Easing.linear });
          setButtonText(secondsToHoursMinutesSeconds(remain_time_for_move > 0 ? remain_time_for_move : 0));
          break;
        case "wait_done" : 
        case "moving" :
          const moving_value = (remain_time_for_schedule / (schedule_move * 60));
          const next_moving_value = ((remain_time_for_schedule-1) / (schedule_move * 60));
          progress.value = Math.min(Math.max(moving_value, 0), 1);
          progress.value = withTiming(Math.min(Math.max(next_moving_value, 0), 1), { duration: 1000, easing: Easing.linear });
          setButtonText(secondsToHoursMinutesSeconds(remain_time_for_schedule > 0 ? remain_time_for_schedule : 0));
          break;
        case "done_rate" :
        case "done" :
          setButtonTextColor(defaultButtonText);
          setButtonText("완료하기");
          dispatch(resetModals());
        default : clearInterval(interval);
      }
      if(theme === "dark" && (final_execute_mode === "ready" || final_execute_mode === "moving")){
        if(progress.value <= 0.4)
          setButtonTextColor("#FFFFFF")
        else
          setButtonTextColor(defaultButtonText)
      }
    };

    // 초기 남은 시간 설정
    updateTime();

    // 1초마다 업데이트
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval); // 컴포넌트 언마운트 시 타이머 정리
  }, [final_execute_mode, startDateTime]);

  useEffect(()=>{
    // console.log("minutes chaged")
    switch (final_execute_mode) {
      case "before_start" : 
        if(theme == "dark")
          setButtonTextColor("#FFFFFF");
        setBackgroundColor(brightGray);
        progress.value = 0;
        break;
      case "wait_start" : 
        setButtonText("준비 시작");
        setBackgroundColor(tint);
        setButtonTextColor(defaultButtonText);
        break;
      case "ready" : 
        setBackgroundColor(brightGray);
        break;
      case "moving" : 
        setBackgroundColor(brightGray);
        break;
      case "wait_done" : break;
      case "done_rate" : 
      case "done" : 
        progress.value = 0;
        setButtonTextColor(defaultButtonText);
        setBackgroundColor(tint);
      default : break;
    }
  }, [final_execute_mode]);

  // Animated style for the button's background color
  const animatedStyle = useAnimatedStyle(() => {
    const backgroundColor = progress.value < 0.2 ? errorColor : tint;

    return {
      backgroundColor,
      width: scale * progress.value, // Animating width for fill effect
    };
  });

  return (
    <CustomAnimatedPressable 
      style={[styles.pressableBase, 
        style,
        {
            backgroundColor: backgroundColor
        }
    ]} 
      onPress={switchMode}
    >
      <Animated.View style={[
        styles.base, 
        animatedStyle,
        ]}>
      </Animated.View>
      <View style={{width: '100%', alignItems: "center"}}>
        <RegularText style={[styles.font, {color: buttonTextColor}]}>
          {buttonText}
        </RegularText>
      </View>
      <TwoOptionModal 
        title={title} 
        modalOpen={twoOptionModalOpen}
        setModalOpen={setTwoOptionModalOpen}
        option1={option1}
        option2={option2}
        />
      <FiveSecondsModal 
        modalOpen={fiveSecondsModalOpen} 
        setModalOpen={setFiveSecondsModalOpen}/>
      <ComplimentModal
        modalOpen={complimentModalOpen}
        setModalOpen={setComplimentModalOpen}/>
    </CustomAnimatedPressable>
  );
}

const styles = StyleSheet.create({
  pressableBase: {
    height: hScale(62),
    width: wScale(347),
    justifyContent: 'center',
    alignItems: 'flex-start',
    borderRadius:8,
  },
  base: {
    height: hScale(62),
    backgroundColor: "#FFF500",
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    position: "absolute"
  },
  font: {
    fontSize: wScale(16),
    fontFamily: "Pretendard-Bold",
  },
});