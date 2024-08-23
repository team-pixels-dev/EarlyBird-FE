import { ThemedText } from "@/components/ui/texts/themed-text";
import { useScheduleTimes } from "@/hooks/useScheduleTimes";
import { useThemeColor } from "@/hooks/useThemeColor";
import { minutesToHoursMinutes } from "@/util/date_formatting";

export type timeTakenProps = {
    text : string;
    time : number;
}

export function TimeTaken({text, time} : timeTakenProps){
    const color = useThemeColor("gray")
    return (
        <ThemedText style={{
            color: time <= 0 ? 'red' : color
        }}
        type="description">
            {text + minutesToHoursMinutes(time)}
        </ThemedText>
    )
}