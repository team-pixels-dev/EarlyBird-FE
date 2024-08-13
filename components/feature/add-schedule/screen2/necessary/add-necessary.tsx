import { ThemedText } from "@/components/ui/texts/themed-text";
import { ThemedView } from "@/components/ui/themed-view";
import { useThemeColor } from "@/hooks/useThemeColor";
import { hScale, wScale } from "@/util/scaling";
import { ImageBackground, StyleSheet, View } from "react-native";

export function AddNecessary() {
    const color = useThemeColor("brightTint")
    return (
        <View style={styles.eachNecessary}>
            <ImageBackground style={styles.icon} source={require('@/assets/images/icon/plus.png')}/>
        </View>
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