import { ThemedText } from "@/components/ui/texts/themed-text";
import { ThemedView } from "@/components/ui/themed-view";
import { useThemeColor } from "@/hooks/useThemeColor";
import { hScale, wScale } from "@/util/scaling";
import { StyleSheet, View, ViewProps } from "react-native";

export function EachNecessary({children} : ViewProps) {
    const color = useThemeColor("brightTint")
    return (
        <View style={[styles.eachNecessary, {backgroundColor:color}]}>
            <ThemedText type="defaultSemiBold" style={{fontSize:hScale(14)}}>{children}</ThemedText>
        </View>
    )
}

const styles = StyleSheet.create({
    eachNecessary:{
        width: wScale(67),
        height: hScale(38),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: wScale(8)
    }
})