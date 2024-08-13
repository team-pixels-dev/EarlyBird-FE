import { ThemedText } from "@/components/ui/texts/themed-text";
import { ThemedView } from "@/components/ui/themed-view";
import { useThemeColor } from "@/hooks/useThemeColor";
import { hScale, wScale } from "@/util/scaling";
import { StyleSheet, View, ViewProps } from "react-native";
import { EachNecessary } from "./each-necessary";
import { AddNecessary } from "./add-necessary";

export function ListNecessary({style} : ViewProps) {
    const color = useThemeColor("brightTint")
    return (
        <View style={[styles.base, style]}>
            <EachNecessary/>
            <EachNecessary/>
            <AddNecessary/>
        </View>
    )
}

const styles = StyleSheet.create({
    base:{
        height: hScale(88),
        flexDirection: 'row',
        columnGap: wScale(12)
    }
})