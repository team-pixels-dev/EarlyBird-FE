import { FullSizeButton } from "@/components/ui/buttons/full-size-button";
import { useScheduleValidation } from "@/hooks/useScheduleValidation";
import { hScale } from "@/util/scaling";
import * as Haptics from 'expo-haptics';
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/modules/redux/root-reducer";
import { useThemeColor } from "@/hooks/useThemeColor";
import { router } from "expo-router";

type AddScheduleNextPageButtonProps = {
  type : "add" | "edit"
}

export function AddScheduleNextPageButton({type} : AddScheduleNextPageButtonProps) {
    const defaultTextColor = useThemeColor("buttonText");
    const errorTextColor = useThemeColor("error");
    const { checkScheduleValid } = useScheduleValidation();
    const [ buttonText, setButtonText ] = useState('다음');
    const [ textColor, setTextColor ] = useState(defaultTextColor);
    const scheduleCache = useSelector((state:RootState)=>state.scheduleCache);
    useEffect(()=>{
        const result = checkScheduleValid();
          if (result === "invalid_title") {
            setButtonText('약속 이름을 설정해주세요');
            setTextColor(errorTextColor);
          } else if (result === "invalid_schedule_time"){
            setButtonText('약속 시간이 현재시간보다 늦습니다.');
            setTextColor(errorTextColor);
          } else if (result !== "valid"){
            setButtonText('이동 시간 설정을 확인해주세요.');
            setTextColor(errorTextColor);
          } else {
            setButtonText('다음');
            setTextColor(defaultTextColor);
          }
        console.log(result)
    }, [checkScheduleValid]);

    function handleNextPress() {
        const result = checkScheduleValid();
          if (result === "valid") {
            if(type === "add")
              router.navigate("/(schedule)/add-schedule-2");
            else
              router.navigate("/(schedule)/edit-schedule-2");
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