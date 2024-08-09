import { ThemedText } from "@/components/ui/texts/themed-text";
import { hScale } from "@/util/scaling";
import { StyleSheet, View } from "react-native";

export function AddScheduleHeader(){
    return (
        <View style={styles.base}>
            <ThemedText type="defaultSemiBold">출근하기</ThemedText>
            <View style={styles.line}/>
        </View>
    )
}

const styles = StyleSheet.create({
    base: {
        height:hScale(76),
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    line: {
        marginTop:hScale(6),
        height:2,
        width:115,
        backgroundColor:"#9D9D9D"
    }
})