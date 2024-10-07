import { ThemedText } from "@/components/ui/texts/themed-text";
import { Image, StyleSheet, View } from "react-native";
import { hScale, wScale } from "@/util/scaling";
import { modalOption, TwoOptionModal } from "@/components/ui/modal/two-option-modal";
import { useEffect, useState } from "react";
import { CustomAnimatedPressable } from "@/components/ui/buttons/animated-pressable";
import { useDispatch, useSelector } from "react-redux";
import { setFinalExecuteMode } from "@/modules/redux/slice/execute-schedule-data-slice";
import { RootState } from "@/modules/redux/root-reducer";

  
export default function Done() {
    const [modalOpen, setModalOpen] = useState(false);
    
    const dispatch = useDispatch();

    return (
        <>
            <View style={styles.titleArea}>
                <ThemedText type="ONEMobilePOP" style={styles.titleText}>{"오늘도 성공하셨네요!\n대단하신걸요?"}</ThemedText>
            </View>
            <CustomAnimatedPressable onPress={()=>setModalOpen(true)}>
                <Image source={require("@/assets/images/mascot/mascot_run.png")} style={styles.mascote}/>
            </CustomAnimatedPressable>
        </>
    )
}

const styles = StyleSheet.create({
    titleArea: {
        height: hScale(170),
        width: '100%',
        justifyContent: "flex-end",
        alignItems: "center",
    },
    titleText:{
        fontSize: hScale(26),
        lineHeight: hScale(40)
    },
    mascote: {
        marginTop: hScale(85),
        width: hScale(206),
        height: hScale(216),
        objectFit: "contain",
    }
});