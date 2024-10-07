import { CustomAnimatedPressable } from "@/components/ui/buttons/animated-pressable";
import { hScale, wScale } from "@/util/scaling";
import { ImageBackground, StyleSheet } from "react-native";

type AddNecessaryProps = {
    onPress : () => void
}

export function AddNecessary({onPress} : AddNecessaryProps) {
    return (
        <CustomAnimatedPressable style={styles.eachNecessary} onPress={onPress}>
            <ImageBackground style={styles.icon} source={require('@/assets/images/icon/plus.png')}/>
        </CustomAnimatedPressable>
    )
}

const styles = StyleSheet.create({
    eachNecessary:{
        width: wScale(57),
        height: hScale(38),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: wScale(8)
    },
    icon: {
        width: hScale(16),
        height: hScale(16)
    }
})