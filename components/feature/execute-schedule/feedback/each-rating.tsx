import { CustomAnimatedPressable } from "@/components/ui/buttons/animated-pressable";
import { ThemedText } from "@/components/ui/texts/themed-text";
import { useThemeColor } from "@/hooks/useThemeColor";
import { setRating } from "@/modules/redux/slice/execute-schedule-data-slice";
import { hScale, wScale } from "@/util/scaling";
import { Pressable, StyleSheet, View, ViewProps } from "react-native";
import { useDispatch } from "react-redux";

type EachDayProps = {
    index : number,
    rating : number,
    selected_rating : number
}

export function EachRating({index, rating, selected_rating} : EachDayProps) {
    const brightGray = useThemeColor("brightGray");
    const brightTint = useThemeColor("brightTint");
    const defaultButtonText = useThemeColor("defaultButtonText");
    const seletedButtonText = useThemeColor("selectedButtonText");
    const dispatch = useDispatch()

    function handleRatingPress(){
        dispatch(setRating(rating));
    }

    return(
        <Pressable style={[
            {
                backgroundColor: (selected_rating === rating) ? brightTint : brightGray,
            },
            styles.default]}
            onPress={handleRatingPress}
            >
            <ThemedText type="defaultSemiBold" style={{
                fontSize: wScale(16),
                color: (selected_rating === rating) ? seletedButtonText : defaultButtonText
            }}>{rating}</ThemedText>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    default:{
        width: wScale(48),
        height: wScale(48),
        borderRadius: wScale(40),
        justifyContent: 'center',
        alignItems: 'center',
    },
})