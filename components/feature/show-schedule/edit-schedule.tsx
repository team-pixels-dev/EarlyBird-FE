import { CustomAnimatedPressable } from "@/components/ui/buttons/animated-pressable";
import { ThemedText } from "@/components/ui/texts/themed-text";
import { RootState } from "@/modules/redux/root-reducer";
import { setScheduleId } from "@/modules/redux/slice/execute-schedule-data-slice";
import { setMainDeleteConfrimModalOpen, setMainDeleteConfrimScheduleId } from "@/modules/redux/slice/modal-slice";
import { loadScheduleToCache } from "@/modules/redux/slice/template-schedule-cache-slice";
import { hScale, wScale } from "@/util/scaling";
import { router } from "expo-router";
import { StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

type EditProps = {
    schedule_id : string
}

export function Edit({schedule_id} : EditProps) {
    const dispatch = useDispatch();

    const schedule = useSelector((state: RootState) => state.schedule[schedule_id]);

    function onDelete() {
        dispatch(setMainDeleteConfrimModalOpen(true));
        dispatch(setMainDeleteConfrimScheduleId(schedule_id));
    }

    function onEdit() {
        // schedule-cache에 현재 schedule load.
        dispatch(loadScheduleToCache(schedule));
        dispatch(setScheduleId(schedule_id));
        router.navigate('./(schedule)/edit-schedule-1');
    }

    return (
        <View style={styles.base}>
            <CustomAnimatedPressable onPress={onEdit}>
                <ThemedText type="description">수정 |</ThemedText>
            </CustomAnimatedPressable>
            <CustomAnimatedPressable onPress={onDelete}>
                <ThemedText type="description"> 삭제</ThemedText>
            </CustomAnimatedPressable>
        </View>
    )
}

const styles = StyleSheet.create({
    base: {
        flexDirection : "row",
        alignItems: "center",
        justifyContent: "center",
        marginRight: wScale(10),
        marginBottom: hScale(5)
    },
});
