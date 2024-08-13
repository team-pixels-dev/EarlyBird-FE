import { StartLeftView } from "@/components/layout/start_left_view";
import { ThemedText } from "@/components/ui/texts/themed-text";
import { ListNecessary } from "./list-necessary";
import { hScale } from "@/util/scaling";
import { ViewProps } from "react-native";

export function AddScheduleNecessary({style} : ViewProps) {
    return (
        <StartLeftView style={style}>
            <ThemedText type="defaultSemiBold">중요한 준비물</ThemedText>
            <ThemedText type="description" style={{marginTop:hScale(4)}}>미리 챙겨두는 것을 추천드려요</ThemedText>
            <ListNecessary style={{marginTop:hScale(22)}}/>
        </StartLeftView>
    )
}