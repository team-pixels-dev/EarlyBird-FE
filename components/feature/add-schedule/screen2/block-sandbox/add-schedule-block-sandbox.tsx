import { StartLeftView } from "@/components/layout/start_left_view";
import { ThemedText } from "@/components/ui/texts/themed-text";

import { hScale } from "@/util/scaling";
import { ViewProps } from "react-native";
import { ListSandBoxBlock } from "./list-sandbox-block";

export function AddScheduleBlockSanBox({style} : ViewProps) {
    return (
        <StartLeftView style={style}>
            <ThemedText type="description" style={{fontSize:hScale(12)}}>*준비에 필요한 블록을 위로 드래그 해보세요!</ThemedText>
            <ListSandBoxBlock style={{marginTop:hScale(20)}}/>
        </StartLeftView>
    )
}