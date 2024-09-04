import { AddScheduleScreenProps } from "../screen1";
import { FullSizeButton } from "@/components/ui/buttons/full-size-button";
import { hScale } from "@/util/scaling";
import { ScheduleNecessary } from "./necessary";
import { AddScheduleHeader } from "../screen1/header";

export function AddScheduleScreen2({setScreen, keyboardUp} : AddScheduleScreenProps) {
    return (
        <>
            <AddScheduleHeader keyboardUp={keyboardUp}></AddScheduleHeader>
            <ScheduleNecessary style={{marginTop:hScale(60)}}/>
            <FullSizeButton 
                style={{position:"absolute", bottom:hScale(50)}}
                onPress={()=>setScreen(1)}
            >이전</FullSizeButton>
        </>
    )
}