import { hScale, wScale } from "@/util/scaling";
import { ThemedText } from "../texts/themed-text";
import { CustomAnimatedPressable } from "./animated-pressable";
import { StyleSheet } from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";

export type ModalComfirmButtonProps = {
    onPress : () => void;
}

export function ModalComfirmButton({onPress} : ModalComfirmButtonProps){
    const tint = useThemeColor("tint")
    const buttonText = useThemeColor("buttonText");
    return (
        <CustomAnimatedPressable 
            onPress={onPress}
            style={[{backgroundColor:tint}, styles.base]}
            >
          <ThemedText type="title" style={{fontSize:hScale(16), color:buttonText}}>확인</ThemedText>
        </CustomAnimatedPressable>
    )
}

const styles = StyleSheet.create({
    base : {
        width:"100%",
        height:hScale(54),
        borderBottomRightRadius: hScale(8),
        borderBottomLeftRadius: hScale(8),
        justifyContent: "center",
        alignItems: "center"
    }
})