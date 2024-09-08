import { themedTextstyles } from "@/components/ui/texts/themed-text";
import { useThemeColor } from "@/hooks/useThemeColor";
import { RootState } from "@/modules/redux/root-reducer";
import { setScheduleTitle } from "@/modules/redux/slice/template-schedule-cache-slice";
import { hScale, wScale } from "@/util/scaling";
import { useEffect, useRef, useState } from "react";
import { Keyboard, Platform, StyleSheet, TextInput, View, ViewProps } from "react-native";
import { useDispatch, useSelector } from "react-redux";

export type AddScheduleHeaderProps = ViewProps & {
    keyboardUp : boolean
}

export function AddScheduleHeader({ style, keyboardUp }: AddScheduleHeaderProps) {
    const gray = useThemeColor("gray");
    const schedule_title = useSelector((state: RootState) => state.templateScheduleCache.schedule_title);
    const dispatch = useDispatch();

    const textColor = useThemeColor('text');
    const textInputRef = useRef<TextInput>(null);
    const [text, setText] = useState(schedule_title);

    const [inputWidth, setInputWidth] = useState(wScale(50));

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

    return (
        <View style={[style, styles.base, { width: inputWidth }]}>
            <TextInput
                ref={textInputRef} 
                style={[{ color: textColor }, themedTextstyles.defaultSemiBold]} 
                onChangeText={setText}
                onEndEditing={saveTitle}
                maxLength={12}
                onContentSizeChange={(e) => {
                    // TextInput의 콘텐츠 크기를 기반으로 부모 View 크기 조정
                    setInputWidth(e.nativeEvent.contentSize.width + wScale(10)); // 약간의 여백 추가
                }}
                placeholder="약속 이름"
                placeholderTextColor={gray}
            >
                {text}
            </TextInput> 
            <View style={[styles.line, { backgroundColor: gray }]} />
        </View>
    );
}

const styles = StyleSheet.create({
    base: {
        height: hScale(57),
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    line: {
        marginTop: hScale(6),
        height: 2,
        ...Platform.select({
            ios: {
                width: '100%',
            },
            android: {
                width: wScale(150),
            }
        })
    }
});
