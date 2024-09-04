import { CustomAnimatedPressable } from "@/components/ui/buttons/animated-pressable";
import { ThemedText } from "@/components/ui/texts/themed-text";
import { useThemeColor } from "@/hooks/useThemeColor";
import { hScale, wScale } from "@/util/scaling";
import { Pressable, StyleSheet, View, ViewProps } from "react-native";

type EachDayProps = {
    index : number,
    day : string,
    repeatDays : boolean[],
    setRepeatDays: React.Dispatch<React.SetStateAction<boolean[]>>
}

export function EachDay({index, day, repeatDays, setRepeatDays} : EachDayProps) {
    const brightGray = useThemeColor("brightGray");
    const brightTint = useThemeColor("brightTint");

    function handleDayPress(){
        setRepeatDays(repeatDays => repeatDays.map((item, i) => (i === index ? !item : item)))
    }

    return(
        <Pressable style={[
            // {backgroundColor: brightGray},
            {backgroundColor: repeatDays[index] ? brightTint : brightGray},
            styles.default]}
            onPress={handleDayPress}
            >
            <ThemedText type="default" style={{fontSize: wScale(16)}}>{day}</ThemedText>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    default:{
        width: wScale(40),
        height: wScale(40),
        borderRadius: wScale(40),
        justifyContent: 'center',
        alignItems: 'center',
    },
})