import { StartLeftView } from "@/components/layout/start_left_view";
import { ThemedText } from "@/components/ui/texts/themed-text";

import { hScale } from "@/util/scaling";
import { ViewProps } from "react-native";
import { ListProcess } from "./list-process";

export function AddScheduleRemaind({style} : ViewProps) {
    return (
        <StartLeftView style={style}>
            <ThemedText type="defaultSemiBold">준비과정 리마인드</ThemedText>
            <ListProcess style={{marginTop:hScale(20)}}/>
        </StartLeftView>
    )
}