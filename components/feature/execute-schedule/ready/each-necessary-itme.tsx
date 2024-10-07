import { ThemedText } from "@/components/ui/texts/themed-text";
import { useThemeColor } from "@/hooks/useThemeColor";
import { addScheduleNecessaryChecked, removeScheduleNecessaryChecked } from "@/modules/redux/slice/template-schedule-cache-slice";
import { hScale, wScale } from "@/util/scaling";
import { useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { useDispatch } from "react-redux";

type EachNecessaryItemProps = {
    value: string;
    index: number;
}

export function EachNecessaryItem({ value, index }: EachNecessaryItemProps) {
    const [check, setCheck] = useState(false);
    const dispatch = useDispatch();
    const errorColor = useThemeColor("error");

    function onChecked() {
        setCheck(!check);
        if (!check) {
            dispatch(addScheduleNecessaryChecked(index));
        } else {
            dispatch(removeScheduleNecessaryChecked(index));
        }
    }

    return (
        <View style={styles.base}>
            <Text 
                style={[
                    styles.text, 
                    check && [styles.checkedText, {textDecorationColor:errorColor}] // 체크 시 스타일 추가
                ]}
            >
                {value}
            </Text>
            <Pressable style={styles.checkBox} onPress={onChecked}>
                {check ? (
                    <Image source={require("@/assets/images/icon/check.png")} style={styles.check} resizeMode="contain" />
                ) : null}
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    base: {
        width: wScale(232),
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: "center",  // To vertically center text and checkbox
    },
    text: {
        fontFamily: "Pretendard-Medium",
        fontSize: hScale(20),
        color: "black",  // 기본 텍스트 색상
    },
    checkedText: {
        textDecorationLine: "line-through",  // 취소선
    },
    checkBox: {
        width: hScale(20),
        height: hScale(20),
        backgroundColor: "#FFFFFF",
    },
    check: {
        width: hScale(23),
        height: hScale(16),
    },
});
