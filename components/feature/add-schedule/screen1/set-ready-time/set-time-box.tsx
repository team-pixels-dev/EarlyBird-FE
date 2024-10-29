import { CustomAnimatedPressable } from "@/components/ui/buttons/animated-pressable";
import { ThemedText } from "@/components/ui/texts/themed-text";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useSelector } from "react-redux";
import { StateType } from "./add-schedule-set-ready-time";
import { RootState } from "@/modules/redux/root-reducer";
import { hScale, wScale } from "@/util/scaling";
import { getHoursMinutes, minutesToHoursMinutes } from "@/util/date_formatting";
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
    const brightText3 = useThemeColor("brightText3");

    const schedule_ready = useSelector((state:RootState)=>state.scheduleCache.schedule_ready);
    const schedule_move = useSelector((state:RootState)=>state.scheduleCache.schedule_move);
    const time = (type === "ready" ? schedule_ready : schedule_move);

    const text = (type === "ready" ? "준비 시간" : "이동 시간");
    
    function handleModalOpen(){
        setModalOpen(true);
        setType(type);
    }
    
    return (
        <CustomAnimatedPressable 
            style={[{backgroundColor:color}, styles.setTimeView]} 
            onPress={()=> handleModalOpen()}>
            <View style={styles.textAndTime}>
                <ThemedText type="defaultSemiBold" style={{fontSize:hScale(14)}}>{text}</ThemedText>
                <ThemedText type="title" style={[styles.dateText, {color:brightText3}]}>{minutesToHoursMinutes(time)}</ThemedText>
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
        fontSize: hScale(14),
    }
})