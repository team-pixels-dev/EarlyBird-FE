import { ThemedText } from "@/components/ui/texts/themed-text";
import { Image, StyleSheet, TextInput, View } from "react-native";
import { hScale, wScale } from "@/util/scaling";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/modules/redux/root-reducer";
import { TextInputModal } from "@/components/ui/modal/text-input-modal";
import { setExecuteScheduleDoneModalOpen } from "@/modules/redux/slice/modal-slice";
import { LongTextInputModal } from "@/components/ui/modal/long-text-input-modal";
import { RatingModal } from "../feedback/rating-modal";

  
export default function Done() {
    const dispatch = useDispatch();
    const feedBackModalOpen = useSelector((state:RootState)=>state.modal.execute_schedule_done_modal.modalOpen);
    const final_excute_mode = useSelector((state:RootState)=>state.executeScheduleData.final_excute_mode);
    
    function setFeedBackModalOpen(_modalOpen:boolean) {
        dispatch(setExecuteScheduleDoneModalOpen(_modalOpen));
    }

    const [feedBackText, setFeedBackText] = useState("");

    function handleDispatchText(text: string) {
        setFeedBackText(text);
    }

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
            <LongTextInputModal
                title="서비스에 대한 피드백을 작성해주세요"
                defaultText=""
                placeHolder="300자 이내"
                modalOpen={feedBackModalOpen}
                setModalOpen={setFeedBackModalOpen}
                dispatchText={handleDispatchText}
                maxLength={300}
            />
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