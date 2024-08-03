import { PropsWithChildren, useCallback } from 'react';
import {Text, StyleSheet} from "react-native";
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

const { wScale} = require("@/util/scaling");

export type LabelProps = any & PropsWithChildren

/** 사전 지정된 styled Text 컴포넌트 */
export function RegularText({ children, style } : LabelProps) {

  return (
    <Text style={[styles.base, style]} >{children}</Text>
  );
}

const styles = StyleSheet.create({
    base: {
      fontSize: wScale(28),
      fontWeight: "500",
      fontFamily: "Pretendard-Regular",
    }
  });