import { CustomAnimatedPressable } from "@/components/ui/buttons/animated-pressable";
import { ThemedText } from "@/components/ui/texts/themed-text";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useSelector } from "react-redux";
import { StateType } from "./add-schedule-set-ready-time";
import { RootState } from "@/modules/redux/root-reducer";
import { hScale, wScale } from "@/util/scaling";
import { getHoursMinutes } from "@/util/date_formatting";
import { StyleSheet, View } from "react-native";
import { TimeTaken } from "./time-taken";
import { useScheduleTimes } from "@/hooks/useScheduleTimes";

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
            <View style={styles.textAndTime}>
                <ThemedText type="defaultSemiBold" style={{fontSize:hScale(16)}}>{text}</ThemedText>
                <ThemedText type="title" style={styles.dateText}>{dateText}</ThemedText>
            </View>
            <TimeTaken type={type} style={{width: '100%'}}/>
        </CustomAnimatedPressable>
    )
}


const styles = StyleSheet.create({
    setTimeView: {
        height: hScale(75),
        width: wScale(342),
        rowGap: hScale(5),
        paddingHorizontal: wScale(20),
        borderRadius: 8,
        justifyContent: 'center',
        alignItems:'center'
    },
    textAndTime: {
        width:'100%',
        flexDirection:"row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    dateText: {
        fontSize: hScale(16),
    }
})