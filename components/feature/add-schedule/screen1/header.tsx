import { CustomAnimatedPressable } from "@/components/ui/buttons/animated-pressable";
import { themedTextstyles } from "@/components/ui/texts/themed-text";
import { useThemeColor } from "@/hooks/useThemeColor";
import { RootState } from "@/modules/redux/root-reducer";
import { setScheduleTitle } from "@/modules/redux/slice/template-schedule-cache-slice";
import { hScale, SCREEN_WIDTH, wScale } from "@/util/scaling";
import { router } from "expo-router";
import { createContext, useEffect, useRef, useState } from "react";
import { Image, ImageBackground, Keyboard, LayoutAnimation, Platform, StyleSheet, TextInput, UIManager, View, ViewProps } from "react-native";
import { useDispatch, useSelector } from "react-redux";

export type AddScheduleHeaderProps = ViewProps & {
    keyboardUp : boolean,
}

export function AddScheduleHeader({ style, keyboardUp }: AddScheduleHeaderProps){
    const gray = useThemeColor("gray");
    const schedule_title = useSelector((state: RootState) => state.scheduleCache.schedule_title);
    const dispatch = useDispatch();

    const textColor = useThemeColor('text');
    const textInputRef = useRef<TextInput>(null);
    const [text, setText] = useState(schedule_title);

    const [lineWidth, setLineWidth] = useState(wScale(100));

    // Android에서 Layout Animation 활성화
    if (Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental) {
        UIManager.setLayoutAnimationEnabledExperimental(true);
    }

    useEffect(() => {
        setText(schedule_title);
    }, [schedule_title]);

    useEffect(() => {
        if (keyboardUp) {
            const timer = setTimeout(() => {
                if (textInputRef.current) {
                    textInputRef.current.focus();
                    textInputRef.current.setSelection(0, text.length);
                }
            }, 500);
    
            return () => clearTimeout(timer);
        }
    }, [keyboardUp]);

    function saveTitle() {
        dispatch(setScheduleTitle(text));
        console.log('saved');
    }

    function handleTextChange(inputText : string) {
        setText(inputText);
        console.log("inputText : " + inputText);
        if(inputText.length === 0) {
            setLineWidth(wScale(100));
        }
    }

    const handleLayout = (event : any) => {
        const { width } = event.nativeEvent.layout;
        if(text.length === 0) {
            setLineWidth(wScale(100));
        } else {
            setLineWidth(width + wScale(20));
        }
    };

    function handleBack() {
        router.back();
    }
    
    return (
        <View style={[style, styles.base]}>
            <CustomAnimatedPressable style={styles.backButton} onPress={handleBack}>
                <Image style={{width:13, height:23, objectFit:"contain"}}source={require("@/assets/images/icon/back-button.png")}/>
            </CustomAnimatedPressable>
            <TextInput
                ref={textInputRef}
                style={[{ color: textColor }, themedTextstyles.defaultSemiBold]}
                value={text}
                onChangeText={(text)=>handleTextChange(text)}
                onEndEditing={saveTitle}
                maxLength={12}
                placeholder={text.length === 0 ? "약속 이름" : ""}
                placeholderTextColor={gray}
                onLayout={handleLayout}
            />
            <View style={[styles.line, { backgroundColor: gray, width : lineWidth }]} />
        </View>
    );
}

const styles = StyleSheet.create({
    base: {
        height: hScale(57),
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    backButton: {
        position: 'static',
        left: -wScale(170),
        top: hScale(28)
    },
    line: {
        marginTop: hScale(6),
        height: 2,
    }
});

