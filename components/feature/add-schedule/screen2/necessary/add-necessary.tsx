import { CustomAnimatedPressable } from "@/components/ui/buttons/animated-pressable";
import { useThemeColor } from "@/hooks/useThemeColor";
import { RootState } from "@/modules/redux/root-reducer";
import { hScale, wScale } from "@/util/scaling";
import { ImageBackground, StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";

type AddNecessaryProps = {
    onPress : () => void
}

export function AddNecessary({onPress} : AddNecessaryProps) {
    const color = useThemeColor("brightTint")
    const schedule_necessary = useSelector((state:RootState)=>state.scheduleCache.schedule_necessary)
    
    return (
        <CustomAnimatedPressable style={styles.eachNecessary} onPress={onPress}>
            <ImageBackground style={styles.icon} source={require('@/assets/images/icon/plus2.png')}/>
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
        height: hScale(16),
        resizeMode: 'contain'
    }
})