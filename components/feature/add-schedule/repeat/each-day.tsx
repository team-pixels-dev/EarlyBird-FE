import { ThemedText } from "@/components/ui/texts/themed-text";
import { useThemeColor } from "@/hooks/useThemeColor";
import { hScale, wScale } from "@/util/scaling";
import { StyleSheet, View, ViewProps } from "react-native";

type EachDayProps = {
    day : string
}

export function EachDay({day} : EachDayProps) {
    const brightGray = useThemeColor("brightGray");
    const brightTint = useThemeColor("brightTint");

    return(
        <View style={[
            {backgroundColor: brightGray},
            {borderColor: brightTint},
            styles.default]}>
            <ThemedText type="default" style={{fontSize: wScale(16)}}>{day}</ThemedText>
        </View>
    )
}

const styles = StyleSheet.create({
    default:{
        width: wScale(40),
        height: wScale(40),
        borderRadius: wScale(40),
        justifyContent: 'center',
        alignItems: 'center',
        borderStyle: 'solid',
        borderWidth: 3
    },
})