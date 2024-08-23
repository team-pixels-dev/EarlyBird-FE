import { AddScheduleScreenProps } from "../screen1";
import { FullSizeButton } from "@/components/ui/buttons/full-size-button";
import { hScale } from "@/util/scaling";
import { AddScheduleNecessary } from "./necessary/add-schedule-necessary";
import { AddScheduleRemaind } from "./process-remaind/add-schedule-remaind";
import { AddScheduleBlockSanBox } from "./block-sandbox/add-schedule-block-sandbox";

export function AddScheduleScreen2({setScreen} : AddScheduleScreenProps) {
    return (
        <>
            <AddScheduleNecessary style={{marginTop:hScale(86)}}/>
            <AddScheduleRemaind/>
            <AddScheduleBlockSanBox/>
            <FullSizeButton 
                style={{position:"absolute", bottom:hScale(50)}}
                onPress={()=>setScreen(1)}
            >이전</FullSizeButton>
        </>
    )
}