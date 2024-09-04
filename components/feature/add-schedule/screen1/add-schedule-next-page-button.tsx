import { FullSizeButton } from "@/components/ui/buttons/full-size-button";
import { useScheduleValidation } from "@/hooks/useScheduleValidation";
import { hScale } from "@/util/scaling";
import * as Haptics from 'expo-haptics';
import { AddScheduleScreenProps } from "./index";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/modules/redux/root-reducer";
import { getFullDates } from "@/util/date_formatting";

export type AddScheduleNextPageButtonProps = {
  setScreen: React.Dispatch<React.SetStateAction<number>>;
}

export function AddScheduleNextPageButton({setScreen} : AddScheduleNextPageButtonProps) {
    const { checkScheduleValid } = useScheduleValidation();
    const [ buttonText, setButtonText ] = useState('다음');
    const scheduleCache = useSelector((state:RootState)=>state.templateScheduleCache);
    useEffect(()=>{
        const result = checkScheduleValid();
          if (result === "valid") {
            setButtonText('다음')
          } else if (result === "invalid_move_time") {
            setButtonText('출발 시간이 약속 시간보다 늦습니다.');
          } else if (result === "invalid_schedule_time"){
            setButtonText('약속 시간이 현재시간보다 늦습니다.');
          } else if (result === "invalid_start_time_too_fast") {
            setButtonText('준비 시작 시간이 현재 시간보다 빠릅니다.');
          } else {
            setButtonText('준비 시작 시간이 출발 시간보다 늦습니다.');
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
        onPress={handleNextPress}
        >{buttonText}</FullSizeButton>
    )
}