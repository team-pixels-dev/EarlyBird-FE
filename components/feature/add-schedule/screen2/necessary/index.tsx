import { StartLeftView } from "@/components/layout/start_left_view";
import { ThemedText } from "@/components/ui/texts/themed-text";
import { ListNecessary } from "./list-necessary";
import { hScale } from "@/util/scaling";
import { ViewProps } from "react-native";

export function ScheduleNecessary({style} : ViewProps) {
    return (
        <StartLeftView style={style}>
            <ThemedText type="defaultSemiBold">준비사항</ThemedText>
            <ThemedText type="description" style={{marginTop:hScale(4)}}>미리 챙겨두는 것을 추천드려요</ThemedText>
            <ListNecessary style={{marginTop:hScale(44)}}/>
        </StartLeftView>
    )
}