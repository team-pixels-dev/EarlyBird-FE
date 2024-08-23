import { ThemedText } from "@/components/ui/texts/themed-text";
import { ThemedView } from "@/components/ui/themed-view";
import { useThemeColor } from "@/hooks/useThemeColor";
import { hScale, wScale } from "@/util/scaling";
import { StyleSheet, View, ViewProps } from "react-native";
import { EachNecessary } from "./each-necessary";
import { AddNecessary } from "./add-necessary";
import { useSelector } from "react-redux";
import { RootState } from "@/modules/redux/root-reducer";

export function ListNecessary({style} : ViewProps) {
    const color = useThemeColor("brightTint")
    const schedule_necessary = useSelector((state:RootState)=>state.templateScheduleCache.schedule_necessary);

    return (
        <View style={[styles.base, style]}>
            {schedule_necessary.map((item, index) => <EachNecessary key={index} children={item}/>)}
            <AddNecessary/>
        </View>
    )
}

const styles = StyleSheet.create({
    base:{
        height: hScale(88),
        flexDirection: 'row',
        columnGap: wScale(12)
    }
})