import { hScale, wScale } from "@/util/scaling"
import { useEffect, useState } from "react"
import { Pressable, StyleSheet, View } from "react-native"
import Animated, { useSharedValue, useAnimatedStyle, withTiming, Easing } from "react-native-reanimated";
import { ThemedText } from "../texts/themed-text";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useDispatch, useSelector } from "react-redux";
import { StateType } from "@/components/feature/add-schedule/screen1/set-ready-time/add-schedule-set-ready-time";
import { RootState } from "@/modules/redux/root-reducer";
import { setScheduleMoveTimeDay, setScheduleStartTimeDay } from "@/modules/redux/slice/template-schedule-cache-slice";

type ToggleType = {
    type : StateType
}
export function Toggle({type} : ToggleType)  {
    const [select, setSelect] = useState(1);
    const position = useSharedValue(0);  // 애니메이션 값 생성
    const dispatch = useDispatch();

    const tintColor = useThemeColor('tint')
    const backgroundColor = useThemeColor('background');
    const schedule_start_time = useSelector((state:RootState)=>state.templateScheduleCache.schedule_start_time);
    const schedule_move_time = useSelector((state:RootState)=>state.templateScheduleCache.schedule_move_time);
    const setter = type === "ready" ? setScheduleStartTimeDay : setScheduleMoveTimeDay;

    useEffect(()=>{
        // 모달 open 시 준비, 출발 시점이 당일인지 전날인지 판단
        const time = type === "ready" ? schedule_start_time : schedule_move_time;
        handleSelection(time.day === "today" ? 1 : 0);
    }, []);

    function handleSelection(idx : 0 | 1) {
        setSelect(idx);
        let newPosition = 0;
        // '당일(1)' 또는 '전날(0)'로 설정시
        if(idx === 1){
            newPosition = wScale(100);
            dispatch(setter("today"));
        } else {
            dispatch(setter("eve"));
        }
        position.value = withTiming(newPosition, { duration: 100, easing: Easing.out(Easing.ease) });
    }

    const animatedStyle = useAnimatedStyle(() => {
        return {
            left: position.value,
        };
    });

    return (
        <View style={[
            styles.parent,
            {backgroundColor: tintColor}
            ]}>
            <View style={[styles.base, {backgroundColor: tintColor}]}>
                <Pressable style={styles.element} onPress={() => handleSelection(0)}>
                    <ThemedText>전날</ThemedText>
                </Pressable>
                <Pressable style={styles.element} onPress={() => handleSelection(1)}>
                    <ThemedText>당일</ThemedText>
                </Pressable>
                <Animated.View style={[styles.switch, animatedStyle, {backgroundColor: backgroundColor}]}></Animated.View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    parent: {
        width: wScale(205),
        height: hScale(45),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius:8
    },
    base: {
        width: wScale(200),
        height: hScale(40),
        flexDirection:'row',
        overflow: 'hidden',
    },
    element: {
        width: wScale(100),
        height: hScale(40),
        zIndex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    switch: {
        width: wScale(100),
        height: hScale(40),
        position: 'absolute',
        borderRadius:8
    }
})