import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ViewProps } from 'react-native';
import { Pressable } from 'react-native';
import Animated, { Easing, useAnimatedStyle, useSharedValue, withTiming, interpolateColor } from 'react-native-reanimated';
import { CustomAnimatedPressable } from '@/components/ui/buttons/animated-pressable';
import { RegularText } from '@/components/ui/texts/regular-text';
import * as Haptics from 'expo-haptics';
import { useThemeColor } from '@/hooks/useThemeColor';
import { hScale, wScale } from '@/util/scaling';
import { useScheduleTimes } from '@/hooks/useScheduleTimes';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/modules/redux/root-reducer';
import { getFullDates, secondsToHoursMinutesSeconds } from '@/util/date_formatting';
import { resetExecuteScheduleData, setFinalExecuteMode } from '@/modules/redux/slice/execute-schedule-data-slice';
import { useExecuteMode } from '@/hooks/useExecuteMode';
import { router } from 'expo-router';
import { removeschedule } from '@/modules/redux/slice/template-schedule-slice';
import { resetScheduleCache } from '@/modules/redux/slice/template-schedule-cache-slice';
import { resetModals, setExecuteScheduleDoneModalOpen, setExecuteScheduleDoneModalScheduleId } from '@/modules/redux/slice/modal-slice';

export type fullSizeButtonProps = Partial<{
  textColor: string;
  disabled: boolean;
}> & ViewProps;

export function TimerButton({style = {}, textColor = "black", disabled = false} : fullSizeButtonProps) {
  const tint = useThemeColor("tint");
  const brightGray = useThemeColor("brightGray");
  const errorColor = useThemeColor("error");
  const scale = wScale(347);

  const currentMinute = useExecuteMode(); // 분이 변경될 때마다 execute mode를 판단

  // Shared value to track animation progress (from 0 to 1)
  const progress = useSharedValue(0);

  const executeScheduleData = useSelector((state:RootState)=>state.executeScheduleData);
  const final_execute_mode = executeScheduleData.final_excute_mode;
  const scheduleDateTime = new Date(useSelector((state: RootState)=>state.scheduleCache.schedule_date));
  const { preparing_time, moving_time, moveDateTime, startDateTime } = useScheduleTimes();

  const [buttonText, setButtonText] = useState("");
  const [backgroundColor, setBackgroundColor] = useState(brightGray);

  function switchMode() {
    if(final_execute_mode === "wait_start") {
      dispatch(setFinalExecuteMode("ready"));
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    } else if (final_execute_mode === "done" || final_execute_mode === "done_rate"){
      // 피드백 및 종료를 위한 모달 open
      dispatch(resetModals());
      dispatch(setExecuteScheduleDoneModalOpen(true));
      dispatch(setExecuteScheduleDoneModalScheduleId(executeScheduleData.schedule_id));

      // 약속 관련 데이터 정리
      // dispatch(removeschedule(executeScheduleData.schedule_id));
      // dispatch(resetScheduleCache());
      // dispatch(resetExecuteScheduleData());
      // router.navigate("/");
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

      switch (final_execute_mode) {
        case "before_start" : 
          const remain_time_for_ready = getRemainTime(startDateTime);
          if(remain_time_for_ready > 0)
            setButtonText("준비까지 " + secondsToHoursMinutesSeconds(remain_time_for_ready));
          else {
              setButtonText("준비 시작");
            }
          break;
        case "wait_start" : 
          clearInterval(interval);
          break;
        case "ready" :
          const remain_time_for_move = getRemainTime(moveDateTime);
          const ready_value = (remain_time_for_move / (preparing_time * 60));
          const next_ready_value = ((remain_time_for_move-1) / (preparing_time * 60));
          progress.value = Math.min(Math.max(ready_value, 0), 1);
          progress.value = withTiming(Math.min(Math.max(next_ready_value, 0), 1), { duration: 1000, easing: Easing.linear });
          setButtonText(secondsToHoursMinutesSeconds(remain_time_for_move > 0 ? remain_time_for_move : 0));
          break;
        case "wait_done" : 
        case "moving" :
          const remain_time_for_schedule = getRemainTime(scheduleDateTime);
          const moving_value = (remain_time_for_schedule / (moving_time * 60));
          const next_moving_value = ((remain_time_for_schedule-1) / (moving_time * 60));
          progress.value = Math.min(Math.max(moving_value, 0), 1);
          progress.value = withTiming(Math.min(Math.max(next_moving_value, 0), 1), { duration: 1000, easing: Easing.linear });
          setButtonText(secondsToHoursMinutesSeconds(remain_time_for_schedule > 0 ? remain_time_for_schedule : 0));
          break;
        case "done_rate" :
        case "done" :
          setButtonText("완료하기");
        default : clearInterval(interval);
      }
      console.log(progress.value);
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
        setBackgroundColor(brightGray);
        progress.value = 0;
        break;
      case "wait_start" : 
        setButtonText("준비 시작");
        setBackgroundColor(tint);
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
        setBackgroundColor(tint);
      default : break;
    }
  }, [final_execute_mode, currentMinute, buttonText]);

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
        <RegularText style={[styles.font, {color: textColor}]}>
          {buttonText}
        </RegularText>
      </View>
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