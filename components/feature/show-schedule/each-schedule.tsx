import { CustomAnimatedPressable } from "@/components/ui/buttons/animated-pressable";
import { ThemedText } from "@/components/ui/texts/themed-text";
import { ViewProps } from "react-native";
import { StyleSheet } from "react-native";
import { hScale, wScale } from "@/util/scaling";
import { useThemeColor } from "@/hooks/useThemeColor";
import { router } from "expo-router";
import useSchedulInfoTexteById from "@/hooks/useScheduleInfoTextById";
import { useDispatch, useSelector } from "react-redux";
import { removeTemplateSchedule } from "@/modules/redux/slice/template-schedule-slice";
import { setMainDeleteConfrimModalOpen, setMainDeleteConfrimScheduleId } from "@/modules/redux/slice/modal-slice";
import { RootState } from "@/modules/redux/root-reducer";
import { ResultState } from "expo-router/build/fork/getStateFromPath";

export type EachScheduleProps =  {
    type: 'soon' | 'other';
    schedule_id: string;
}

export function EachSchedule({type, schedule_id} : EachScheduleProps){
    const dispatch = useDispatch();
    const scheduleInfoText = useSchedulInfoTexteById(schedule_id);
    const color = type === 'soon' ? useThemeColor('brightTint') : useThemeColor('brightGray');
    const navigateNextPage = () => {
        router.navigate('./remaind-schedule');
    }
    function onDelete(schedule_id : string){
        dispatch(setMainDeleteConfrimModalOpen(true));
        dispatch(setMainDeleteConfrimScheduleId(schedule_id));
    }
    return (
        <CustomAnimatedPressable style={[styles.base, {backgroundColor:color}]} onPress={navigateNextPage}>
            <ThemedText style={{fontSize:hScale(16)}} type="defaultSemiBold">{scheduleInfoText}</ThemedText>
            <CustomAnimatedPressable style={styles.delete} onPress={()=>onDelete(schedule_id)}>
                <ThemedText type="description">삭제</ThemedText>
            </CustomAnimatedPressable>
        </CustomAnimatedPressable>
    )
}

const styles = StyleSheet.create({
    base: {
        height: hScale(51),
        width: wScale(342),
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        
        borderRadius:wScale(38.5),
      },
    delete: {
        position:"absolute",
        right: wScale(20),
    }
})