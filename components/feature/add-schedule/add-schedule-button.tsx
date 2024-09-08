import { FloatingPlusButton } from "@/components/ui/buttons/floating-plus-button";
import { hScale } from "@/util/scaling";
import { GestureResponderEvent } from "react-native";
import * as Haptics from 'expo-haptics';
import { useDispatch } from "react-redux";
import { resetSchedule } from "@/modules/redux/slice/template-schedule-cache-slice";
import { router } from "expo-router";

export function AddScheduleButton() {
    const dispatch = useDispatch();

    const handlePress = (event: GestureResponderEvent) => {
        // 햅틱 피드백 실행
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

        router.navigate('/add-schedule');
        
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
