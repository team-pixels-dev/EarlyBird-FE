import { hScale } from "@/util/scaling";
import { Image, Pressable, StyleSheet, ViewProps } from "react-native";

type XButtonProps = ViewProps & {
    onPress : () => void;
}

export function XButton({style, onPress} : XButtonProps) {
    
    return (
        <Pressable style={style} onPress={onPress}>
            <Image style={styles.image} source={require("@/assets/images/icon/x_gray.png")}/>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    image: {
        width: hScale(14),
        height: hScale(14),
        resizeMode: "contain"
    }
});