import { ThemedText } from "@/components/ui/texts/themed-text";
import { Image, StyleSheet, View } from "react-native";
import { hScale, wScale } from "@/util/scaling";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/modules/redux/root-reducer";

  
export default function Done() {
    const [modalOpen, setModalOpen] = useState(false);
    
    const dispatch = useDispatch();

    const final_excute_mode = useSelector((state:RootState)=>state.executeScheduleData.final_excute_mode);

    const text = final_excute_mode === "done" ? 
        "오늘도 성공하셨네요!\n대단하신걸요?" : 
        "헐!!! 늦었다구요??\n그럴리가...OTL\n다음엔 안늦게 도와줄게요!";
    const image = final_excute_mode === "done" ?
        require("@/assets/images/mascot/mascot_run.png") :
        require("@/assets/images/mascot/mascot_cry.png")

    return (
        <>
            <View style={styles.titleArea}>
                <ThemedText type="ONEMobilePOP" style={styles.titleText}>{text}</ThemedText>
            </View>
            <Image source={image} style={styles.mascote}/>
        </>
    )
}

const styles = StyleSheet.create({
    titleArea: {
        marginTop: hScale(82),
        width: '100%',
        justifyContent: "flex-end",
        alignItems: "center",
    },
    titleText:{
        fontSize: hScale(24),
        lineHeight: hScale(28),
        textAlign: "center"
    },
    mascote: {
        position: "absolute",
        top: hScale(290),
        width: hScale(206),
        height: hScale(216),
        objectFit: "contain",
    }
});