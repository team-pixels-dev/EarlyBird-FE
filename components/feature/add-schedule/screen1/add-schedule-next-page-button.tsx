import { FullSizeButton } from "@/components/ui/buttons/full-size-button";
import { useScheduleValidation } from "@/hooks/useScheduleValidation";
import { hScale } from "@/util/scaling";
import * as Haptics from 'expo-haptics';
import { AddScheduleScreenProps } from "./index";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/modules/redux/root-reducer";
import { getFullDates } from "@/util/date_formatting";
import { useThemeColor } from "@/hooks/useThemeColor";

export type AddScheduleNextPageButtonProps = {
  setScreen: React.Dispatch<React.SetStateAction<number>>;
}

export function AddScheduleNextPageButton({setScreen} : AddScheduleNextPageButtonProps) {
    const defaultTextColor = useThemeColor("text");
    const errorTextColor = useThemeColor("error");
    const { checkScheduleValid } = useScheduleValidation();
    const [ buttonText, setButtonText ] = useState('다음');
    const [ textColor, setTextColor ] = useState(defaultTextColor);
    const scheduleCache = useSelector((state:RootState)=>state.templateScheduleCache);
    useEffect(()=>{
        const result = checkScheduleValid();
          if (result === "invalid_title") {
            setButtonText('약속 이름을 설정해주세요');
            setTextColor(errorTextColor);
          } else if (result === "invalid_schedule_time"){
            setButtonText('약속 시간이 현재시간보다 늦습니다.');
            setTextColor(errorTextColor);
          } else {
            setButtonText('다음');
            setTextColor(defaultTextColor);
          }
    }, [checkScheduleValid]);

    function handleNextPress() {
        const result = checkScheduleValid();
          if (result === "valid") {
            console.log(getFullDates(new Date(scheduleCache.schedule_start_time.date)));
            setScreen(2);
          } else {
            Haptics.notificationAsync(
                Haptics.NotificationFeedbackType.Error
              )
          }
    }

    return (
        <FullSizeButton 
        style={{position:"absolute", bottom:hScale(50)}}
        textColor={textColor}
        onPress={handleNextPress}
        disabled={checkScheduleValid() === "valid" ? false : true}
        >{buttonText}</FullSizeButton>
    )
}