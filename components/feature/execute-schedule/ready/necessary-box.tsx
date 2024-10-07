import { ThemedText } from "@/components/ui/texts/themed-text";
import { useThemeColor } from "@/hooks/useThemeColor";
import { scheduleState } from "@/modules/redux/slice/template-schedule-cache-slice";
import { hScale, wScale } from "@/util/scaling";
import { ScrollView, StyleSheet, View, ViewProps } from "react-native";
import { EachNecessaryItem } from "./each-necessary-itme";

type NecessaryBoxProps = ViewProps & {
    schedule: scheduleState,
}

export function NecessaryBox({schedule, style} : NecessaryBoxProps) {
    const memoTint = useThemeColor("memoTint");
    const listNecessaty = schedule.schedule_necessary;
    return (
        <View style={[
            style,
            styles.base,
            {backgroundColor:memoTint}
        ]}>
            <ScrollView contentContainerStyle={{
                minHeight:"100%",
                justifyContent:"center", 
                alignItems:"center", 
                rowGap:hScale(18), 
                paddingVertical:hScale(18)}}>
                {listNecessaty.map((value, index)=>
                    <EachNecessaryItem key={index} value={value} index={index}/>
                )}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    base: {
        height: hScale(235),
        width: wScale(273),
        justifyContent: "center",
        shadowColor: '#000',
        shadowOffset: { width: 3, height: 3 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
    }

})