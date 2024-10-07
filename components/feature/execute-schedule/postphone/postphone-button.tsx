import { CustomAnimatedPressable } from "@/components/ui/buttons/animated-pressable";
import { ThemedText } from "@/components/ui/texts/themed-text";
import { StyleSheet, View, ViewProps } from "react-native";

type PostPhoneButtonProps = ViewProps & {
    type : "schedule" | "start";
    onPress : () => void
}

export function PostPhoneButton({type, onPress, style} : PostPhoneButtonProps) {
    const text = type === "schedule" ? "약속시간 " : "시작 ";

    return (
        <CustomAnimatedPressable 
            style={[style, styles.base]}
            onPress={onPress}
            >
            <ThemedText type="description">{text}미루기</ThemedText>
        </CustomAnimatedPressable>
    )
}

const styles = StyleSheet.create({
    base: {
        
    }
})