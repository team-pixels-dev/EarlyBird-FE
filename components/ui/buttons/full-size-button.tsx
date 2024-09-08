import { StyleSheet, Pressable, ViewProps } from 'react-native';
import { CustomAnimatedPressable } from './animated-pressable';
import  { RegularText } from '@/components/ui/texts/regular-text'
import { PropsWithChildren } from 'react';
import * as Haptics from 'expo-haptics';
import { useThemeColor } from '@/hooks/useThemeColor';

const {wScale, hScale} = require('@/util/scaling');

export type fullSizeButtonProps = Partial<{
    textColor: string;
    onPress: () => void;
    disabled: boolean;
}> & ViewProps & PropsWithChildren;

export function FullSizeButton({style = {}, textColor = "black", children, onPress = () => {}, disabled = false} : fullSizeButtonProps){
    const tint = useThemeColor("tint");
    const gray = useThemeColor("brightGray");
    return (
        <CustomAnimatedPressable 
            style={[styles.base, style, {backgroundColor:disabled?gray:tint}]} 
            onPress={disabled ? 
                ()=> Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error) 
                : onPress}>
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