import { ThemedText } from "@/components/ui/texts/themed-text";
import { ThemedView } from "@/components/ui/themed-view";
import { useThemeColor } from "@/hooks/useThemeColor";
import { hScale, wScale } from "@/util/scaling";
import { StyleSheet, View, ViewProps } from "react-native";
import { EachSandBoxBlock } from "./each-sandbox-block";

export function ListSandBoxBlock({style} : ViewProps) {
    const color = useThemeColor("brightGray")
    return (
        <View style={[
            styles.base,
            {backgroundColor: color}, 
            style]}>
            <EachSandBoxBlock/>
            <EachSandBoxBlock/>
            <EachSandBoxBlock/>
            <EachSandBoxBlock/>
            <EachSandBoxBlock/>
            <EachSandBoxBlock/>
        </View>
    )
}

const styles = StyleSheet.create({
    base:{
        padding:wScale(16),
        height: hScale(187),
        width: wScale(348),
        flexDirection: 'row',
        columnGap: wScale(12),
        rowGap: hScale(18),
        flexWrap:"wrap"
    }
})