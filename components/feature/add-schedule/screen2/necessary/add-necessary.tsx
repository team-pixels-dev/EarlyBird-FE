import { CustomAnimatedPressable } from "@/components/ui/buttons/animated-pressable";
import { ThemedText } from "@/components/ui/texts/themed-text";
import { ThemedView } from "@/components/ui/themed-view";
import { useThemeColor } from "@/hooks/useThemeColor";
import { RootState } from "@/modules/redux/root-reducer";
import { hScale, wScale } from "@/util/scaling";
import { ImageBackground, StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";

export function AddNecessary() {
    const color = useThemeColor("brightTint")
    const schedule_necessary = useSelector((state:RootState)=>state.templateScheduleCache.schedule_necessary)
    
    return (
        <CustomAnimatedPressable style={styles.eachNecessary}>
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