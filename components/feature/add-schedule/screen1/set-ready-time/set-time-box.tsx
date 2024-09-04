import { CustomAnimatedPressable } from "@/components/ui/buttons/animated-pressable";
import { ThemedText } from "@/components/ui/texts/themed-text";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useSelector } from "react-redux";
import { StateType } from "./add-schedule-set-ready-time";
import { RootState } from "@/modules/redux/root-reducer";
import { hScale, wScale } from "@/util/scaling";
import { getHoursMinutes } from "@/util/date_formatting";
import { StyleSheet } from "react-native";

export type SetTimeBoxProps = {
    type : "ready" | "move";
    setType : React.Dispatch<React.SetStateAction<StateType>>;
    setModalOpen : React.Dispatch<React.SetStateAction<boolean>>;
}

export function SetTimeBox({type, setType, setModalOpen} : SetTimeBoxProps) {
    const color = useThemeColor("brightGray");

    const schedule_ready_time = useSelector((state: RootState) => state.templateScheduleCache.schedule_start_time);
    const schedule_move_time = useSelector((state: RootState) => state.templateScheduleCache.schedule_move_time);

    const text = (type === "ready" ? "준비 시작" : "이동 출발");
    const dateText = getHoursMinutes(new Date(type === "ready" ? schedule_ready_time.date : schedule_move_time.date));
    
    function handleModalOpen(){
        setModalOpen(true);
        setType(type);
    }
    
    return (
        <CustomAnimatedPressable 
            style={[{backgroundColor:color}, styles.setTimeView]} 
            onPress={()=> handleModalOpen()}>
            <ThemedText type="defaultSemiBold" style={{fontSize:hScale(16)}}>{text} 시간</ThemedText>
            <ThemedText type="title" style={styles.dateText}>{dateText}</ThemedText>
        </CustomAnimatedPressable>
    )
}


const styles = StyleSheet.create({
    setTimeView: {
        height: hScale(50),
        width: wScale(342),
        paddingHorizontal: wScale(20),
        borderRadius: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems:'center'
    },
    dateText: {
        fontSize: hScale(16),
        width: '50%',
        textAlign: 'right'
    }
})