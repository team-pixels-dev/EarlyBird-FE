import { FloatingPlusButton } from "@/components/ui/buttons/floating-plus-button";
import { hScale } from "@/util/scaling";
import { GestureResponderEvent } from "react-native";
import * as Haptics from 'expo-haptics';
import { useDispatch } from "react-redux";
import { resetScheduleCache } from "@/modules/redux/slice/template-schedule-cache-slice";
import { router } from "expo-router";

export function AddScheduleButton() {
    const dispatch = useDispatch();

    const handlePress = (event: GestureResponderEvent) => {
        // 햅틱 피드백 실행
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

        router.navigate('/(schedule)/add-schedule-1');
        
        // schedule 초기화
        dispatch(resetScheduleCache());
    };

    return (
        <FloatingPlusButton 
            style={{ position: 'absolute', bottom: hScale(71) }}
            onPress={handlePress}
        />
    );
}
