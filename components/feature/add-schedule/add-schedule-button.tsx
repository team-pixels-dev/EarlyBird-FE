import { FloatingPlusButton } from "@/components/ui/buttons/floating-plus-button";
import { hScale } from "@/util/scaling";
import { router } from "expo-router";
import { GestureResponderEvent } from "react-native";

export type AddScheduleButtonProps = {
    onPress?: (event: GestureResponderEvent) => void;
}

export function AddScheduleButton({onPress} : AddScheduleButtonProps){
    return (
        <FloatingPlusButton 
            style={{position: 'absolute', bottom:hScale(71)}}
            onPress={onPress}
        />
    )
}