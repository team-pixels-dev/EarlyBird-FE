import { StyleSheet, TextStyle, ViewProps } from 'react-native';
import { RegularText } from '@/components/ui/texts/regular-text'
import { CustomAnimatedPressable } from './animated-pressable';
import { PropsWithChildren } from 'react';

const { wScale, hScale } = require("@/util/scaling");


export type CircleButtonProps = ViewProps & PropsWithChildren & {
    color: string;
    onPress?: () => void;
    backgroundC: string;
  };

export function CircleButton({style, children, color, onPress, backgroundC} : CircleButtonProps) {
    return (
        <CustomAnimatedPressable style={[styles.circle1, {borderColor: color}]} onPress={onPress}>
            <CustomAnimatedPressable style={[styles.circle2, {borderColor: color, backgroundColor: backgroundC}]} onPress={onPress}>
                <RegularText style={[styles.font, style]} >{children}</RegularText>
            </CustomAnimatedPressable>
        </CustomAnimatedPressable>
    )
};

const styles = StyleSheet.create({
    circle1: {
        width: wScale(78),
        height: hScale(78),
        justifyContent: 'center',
        alignItems:'center',
        borderRadius: wScale(50),
        backgroundColor: '#FFFFFF',
        borderWidth: wScale(1),
    },
    circle2: {
        width: wScale(70),
        height: hScale(70),
        justifyContent: 'center',
        alignItems:'center',
        borderRadius: wScale(50),
        backgroundColor: '#FFFFFF',
        borderWidth: wScale(1),
    },
    font: {
        fontFamily:'Pretendard-Bold',
        fontSize: wScale(20)
    }
})

