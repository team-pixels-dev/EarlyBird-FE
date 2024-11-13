import { CustomAnimatedPressable } from "@/components/ui/buttons/animated-pressable";
import { ThemedText } from "@/components/ui/texts/themed-text";
import { useThemeColor } from "@/hooks/useThemeColor";
import { RootState } from "@/modules/redux/root-reducer";
import { changeScheduleTime } from "@/modules/redux/slice/template-schedule-cache-slice";
import { hScale } from "@/util/scaling";
import { Image, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";

type IncreaseTimeButtonProps = {
    value : number
}

export function IncreaseTimeButton({value} : IncreaseTimeButtonProps) {
    const brightGray = useThemeColor("brightGray");
    const brightText4 = useThemeColor("brightText4");
    const dispatch = useDispatch();
    const final_excute_mode = useSelector((state:RootState)=>state.executeScheduleData.final_excute_mode)
    function increaseTime(){
        switch (final_excute_mode) {
            case "before_start" : dispatch(changeScheduleTime([0, 0, value]));
                break;
            case "ready" : dispatch(changeScheduleTime([value, 0, value]));
                break;
            case "moving" : dispatch(changeScheduleTime([0, value, value]));
            default : break;
        }
        // dispatch(changeScheduleTime(value));
    }
    return (
        <CustomAnimatedPressable style={[styles.base, {backgroundColor:brightGray, gap:hScale(4)}]} onPress={increaseTime}>
            <Image source={require("@/assets/images/icon/plus3.png")} style={styles.plus}/>
            <ThemedText type="medium" style={{color:brightText4, fontSize:hScale(14)}}>{value}분</ThemedText>
        </CustomAnimatedPressable>
    )
}

const styles = StyleSheet.create({
    base: {
        width: hScale(96),
        height: hScale(96),
        borderRadius: hScale(100),
        paddingTop: hScale(29),
        alignItems: "center"
    }, 
    plus: {
        width: hScale(19.2),
        height: hScale(19.2),
        resizeMode: "contain"
    }
})