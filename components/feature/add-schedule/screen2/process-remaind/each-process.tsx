import { ThemedText } from "@/components/ui/texts/themed-text";
import { ThemedView } from "@/components/ui/themed-view";
import { useThemeColor } from "@/hooks/useThemeColor";
import { hScale, wScale } from "@/util/scaling";
import { StyleSheet, View } from "react-native";

export function EachProcess() {
    const color = useThemeColor("brightTint")
    return (
        <View style={[styles.eachProcess, {borderColor:color}]}>
            <ThemedText type="defaultSemiBold" style={{fontSize:hScale(14)}}>샤워</ThemedText>
        </View>
    )
}

const styles = StyleSheet.create({
    eachProcess:{
        paddingHorizontal: wScale(20),
        height: hScale(38),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: wScale(8),
        borderWidth: 3
    }
})