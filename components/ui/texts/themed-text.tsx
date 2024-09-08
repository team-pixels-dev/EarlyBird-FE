import { Text, type TextProps, StyleSheet } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';

const { hScale } = require('@/util/scaling');

export type type = {
  type?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link' | 'description' | 'ONEMobilePOP';
}

export type ThemedTextProps = TextProps & type & {
  lightColor?: string;
  darkColor?: string;
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = 'default',
  ...rest
}: ThemedTextProps) {
  const color = useThemeColor('text');

  return (
    <Text
      style={[
        { color },
        type === 'default' ? themedTextstyles.default : undefined,
        type === 'title' ? themedTextstyles.title : undefined,
        type === 'defaultSemiBold' ? themedTextstyles.defaultSemiBold : undefined,
        type === 'subtitle' ? themedTextstyles.subtitle : undefined,
        type === 'link' ? themedTextstyles.link : undefined,
        type === 'description' ? themedTextstyles.description : undefined,
        type === "ONEMobilePOP" ? themedTextstyles.ONEMobilePOP : undefined,
        style,
      ]}
      {...rest}
    />
  );
}

export const themedTextstyles = StyleSheet.create({
  default: {
    fontSize: hScale(18),
    lineHeight: 24,
  },
  defaultSemiBold: {
    fontSize: hScale(18),
    lineHeight: 24,
    fontFamily:'Pretendard-SemiBold'
  },
  title: {
    fontSize: hScale(32),
    fontWeight: 'bold',
    lineHeight: 32,
  },
  subtitle: {
    fontSize: hScale(20),
    fontFamily:'Pretendard-SemiBold'
  },
  link: {
    lineHeight: hScale(30),
    fontSize: 16,
    color: '#0a7ea4',
  },
  description: {
    fontSize: hScale(14),
    color: '#898989',
  },
  ONEMobilePOP: {
    fontSize: hScale(16),
    lineHeight: 24,
    fontFamily:'ONE_Mobile_POP'
  },
});
