import { themedTextstyles } from "@/components/ui/texts/themed-text";
import { useThemeColor } from "@/hooks/useThemeColor";
import { RootState } from "@/modules/redux/root-reducer";
import { setScheduleTitle } from "@/modules/redux/slice/template-schedule-cache-slice";
import { hScale, wScale } from "@/util/scaling";
import { useEffect, useRef, useState } from "react";
import { Keyboard, StyleSheet, TextInput, View, ViewProps } from "react-native";
import { useDispatch, useSelector } from "react-redux";

export type AddScheduleHeaderProps = ViewProps & {
    keyboardUp : boolean
}

export function AddScheduleHeader({style, keyboardUp} : AddScheduleHeaderProps) {
    const gray = useThemeColor("gray");
    const schedule_title = useSelector((state: RootState) => state.templateScheduleCache.schedule_title);
    const dispatch = useDispatch();

    const textColor = useThemeColor('text');
    const textInputRef = useRef<TextInput>(null);
    const [text, setText] = useState(schedule_title);

    // 모달 open 시 focus 설정
    useEffect(() => {
        if(keyboardUp){
            const timer = setTimeout(() => {
                if (textInputRef.current) {
                    textInputRef.current.focus();
                    textInputRef.current.setSelection(0, text.length);
                }
            }, 500);
    
            return () => clearTimeout(timer);
        }
    }, []);

    function saveTitle() {
        dispatch(setScheduleTitle(text));
        console.log('saved')
    }

    return (
        <View style={[style, styles.base]}>
            <TextInput 
                ref={textInputRef} 
                style={[{color:textColor}, themedTextstyles.defaultSemiBold]} 
                onChangeText={setText}
                onEndEditing={saveTitle}
                >
                {text}
            </TextInput> 
            <View style={[styles.line, {backgroundColor:gray}]} />
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
        minWidth: wScale(115),
    }
});
