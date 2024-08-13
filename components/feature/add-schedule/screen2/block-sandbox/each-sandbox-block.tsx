import { ThemedText } from "@/components/ui/texts/themed-text";
import { ThemedView } from "@/components/ui/themed-view";
import { useThemeColor } from "@/hooks/useThemeColor";
import { hScale, wScale } from "@/util/scaling";
import { StyleSheet, View } from "react-native";

export function EachSandBoxBlock() {
    const color = useThemeColor("background")
    return (
        <View style={[styles.eachProcess, {backgroundColor:color}]}>
            <ThemedText type="defaultSemiBold" style={{fontSize:hScale(14)}}>은행가기</ThemedText>
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
    }
})