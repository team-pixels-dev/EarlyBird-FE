import { ThemedText } from "@/components/ui/texts/themed-text";
import { ThemedView } from "@/components/ui/themed-view";
import useSchedulInfoText from "@/hooks/useScheduleInfoTextById";
import { useThemeColor } from "@/hooks/useThemeColor";
import { scheduleState } from "@/modules/redux/slice/template-schedule-cache-slice";
import { hScale, wScale } from "@/util/scaling";
import { StyleSheet, ViewProps } from "react-native";

type ScheduleTimeTextLabelProps = ViewProps & {
    schedule : scheduleState;
}

export function ScheduleTimeTextLabel({schedule, style}: ScheduleTimeTextLabelProps){
    const scheduleText = useSchedulInfoText(schedule);
    const scheduleTimeText = scheduleText.split('-').at(0)?.trimEnd();
    
    const brightTint = useThemeColor("brightTint");
    const textColor = useThemeColor("text3");
    return (
        <ThemedView style={[
            style, 
            styles.base,
            {
                borderColor:brightTint,
            }
            ]}>
            <ThemedText style={[
                    styles.text,
                    {
                        color: textColor,
                    }
                ]}
                type="defaultSemiBold"
            >{scheduleTimeText}</ThemedText>
        </ThemedView>
    )
}

const styles = StyleSheet.create({
    base : {
        width: wScale(147),
        height: hScale(44),
        borderWidth: 4,
        borderRadius: 9999,
        alignItems: "center",
        justifyContent: "center",
    },
    text : {
        fontSize: hScale(16),
    }
})