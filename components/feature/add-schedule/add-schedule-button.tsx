import { FloatingPlusButton } from "@/components/ui/buttons/floating-plus-button";
import { hScale } from "@/util/scaling";
import { GestureResponderEvent } from "react-native";
import * as Haptics from 'expo-haptics';

export type AddScheduleButtonProps = {
    onPress?: (event: GestureResponderEvent) => void;
}

export function AddScheduleButton({ onPress }: AddScheduleButtonProps) {
    const handlePress = (event: GestureResponderEvent) => {
        // 햅틱 피드백 실행
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

        // 전달받은 onPress 콜백 실행
        if (onPress) {
            onPress(event);
        }
    };

    return (
        <FloatingPlusButton 
            style={{ position: 'absolute', bottom: hScale(71) }}
            onPress={handlePress}
        />
    );
}
