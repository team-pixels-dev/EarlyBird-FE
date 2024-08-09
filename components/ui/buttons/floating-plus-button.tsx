import { useThemeColor } from "@/hooks/useThemeColor";
import { CustomAnimatedPressable } from "./animated-pressable";
import { GestureResponderEvent, StyleSheet, ViewProps } from "react-native";
import { hScale } from "@/util/scaling";
import { ImageBackground } from "react-native";

export type FloatingPlusButtonProps = ViewProps & {
    onPress?: (event: GestureResponderEvent) => void;
}

export function FloatingPlusButton({style, onPress} : FloatingPlusButtonProps){
    const color = useThemeColor("tint")
    return (
        <CustomAnimatedPressable style={[{backgroundColor:color}, style,styles.base]} onPress={onPress}>
            <ImageBackground style={styles.icon} source={require('@/assets/images/icon/plus.png')}/>
        </CustomAnimatedPressable>
    )
}

const styles = StyleSheet.create({
    base: {
        width: hScale(73),
        height: hScale(73),
        borderRadius: hScale(73),
        alignItems:'center',
        justifyContent:'center'
    },
    icon: {
        width: hScale(24),
        height: hScale(24)
    }

})