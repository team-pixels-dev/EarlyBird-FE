import { ThemedText } from "@/components/ui/texts/themed-text";
import { ThemedView } from "@/components/ui/themed-view";
import { useThemeColor } from "@/hooks/useThemeColor";
import { hScale, wScale } from "@/util/scaling";
import { StyleSheet, View, ViewProps } from "react-native";
import { EachProcess } from "./each-process";

export function ListProcess({style} : ViewProps) {
    const color = useThemeColor("brightTint")
    return (
        <View style={[styles.base, style]}>
            <EachProcess/>
            <EachProcess/>
        </View>
    )
}

const styles = StyleSheet.create({
    base:{
        height: hScale(128),
        flexDirection: 'row',
        columnGap: wScale(12)
    }
})