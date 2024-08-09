import { StyleSheet, Pressable, ViewProps } from 'react-native';
import { CustomAnimatedPressable } from './animated-pressable';
import  { RegularText } from '@/components/ui/texts/regular-text'
import { PropsWithChildren } from 'react';

const {wScale, hScale} = require('@/util/scaling');

/**
 * 큰 사이즈의 버튼, 애니메이션과 폰트가 적용됨
 * @param textColor, onPress, disabled
 * @returns 
 */

export type fullSizeButtonProps = Partial<{
    textColor: string;
    onPress: () => void;
    disabled: boolean;
}> & ViewProps & PropsWithChildren;

export function FullSizeButton({style = {}, textColor = "black", children, onPress = () => {}, disabled = false} : fullSizeButtonProps){
    return (
        <CustomAnimatedPressable style={[styles.base, style, {backgroundColor:disabled?"#EBEBEB":"#FFF500"}]} onPress={onPress} disabled={disabled}>
                <RegularText style={[styles.font, {color:textColor}]}>{children}</RegularText>
        </CustomAnimatedPressable>
    )
}

const styles = StyleSheet.create({
    base: {
      height: hScale(62),
      width: wScale(347),
      backgroundColor: "#FFF500",
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius:8
    },
    font: {
        fontSize: wScale(16),
        fontFamily: "Pretendard-Bold",
    }
  });