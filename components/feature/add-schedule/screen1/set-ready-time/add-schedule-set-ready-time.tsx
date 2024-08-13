import { ThemedText } from "@/components/ui/texts/themed-text";
import { useThemeColor } from "@/hooks/useThemeColor";
import { hScale, wScale } from "@/util/scaling";
import { View, StyleSheet, ViewProps } from "react-native";

export function AddScheduleSetReadyTime({style} : ViewProps) {
    const color = useThemeColor("brightGray")
    return (
        <View style={[styles.base, style]}>
            <View style={[{backgroundColor:color}, styles.setTimeView]}>
                <ThemedText type="defaultSemiBold" style={{fontSize:hScale(16)}}>준비 시작 시간</ThemedText>
                <ThemedText type="title" style={{fontSize:hScale(16)}}>10:20</ThemedText>
            </View>
            <View style={[{backgroundColor:color}, styles.setTimeView]}>
                <ThemedText type="defaultSemiBold" style={{fontSize:hScale(16)}}>이동 출발 시간</ThemedText>
                <ThemedText type="title" style={{fontSize:hScale(16)}}>10:20</ThemedText>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    base: {
        height: hScale(116),
        justifyContent: 'space-between'
    },
    setTimeView: {
        height: hScale(50),
        width: wScale(342),
        paddingHorizontal: wScale(20),
        borderRadius: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems:'center'
    }
})