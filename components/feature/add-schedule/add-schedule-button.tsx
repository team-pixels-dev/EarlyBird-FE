import { FloatingPlusButton } from "@/components/ui/buttons/floating-plus-button";
import { hScale } from "@/util/scaling";
import { GestureResponderEvent } from "react-native";
import * as Haptics from 'expo-haptics';
import { useDispatch } from "react-redux";
import { resetSchedule } from "@/modules/redux/slice/template-schedule-cache-slice";

export type AddScheduleButtonProps = {
    setModalOpen : React.Dispatch<React.SetStateAction<boolean>>

}

export function AddScheduleButton({ setModalOpen }: AddScheduleButtonProps) {
    const dispatch = useDispatch();

    const handlePress = (event: GestureResponderEvent) => {
        // 햅틱 피드백 실행
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

        // 전달받은 onPress 콜백 실행
        if (setModalOpen) {
            setModalOpen(true);
        }
        
        // schedule 초기화
        dispatch(resetSchedule());
    };

    return (
        <FloatingPlusButton 
            style={{ position: 'absolute', bottom: hScale(71) }}
            onPress={handlePress}
        />
    );
}
