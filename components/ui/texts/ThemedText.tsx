import { Text, type TextProps, StyleSheet } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';

const { hScale } = require('@/util/scaling');

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link';
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = 'default',
  ...rest
}: ThemedTextProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  return (
    <Text
      style={[
        { color },
        type === 'default' ? styles.default : undefined,
        type === 'title' ? styles.title : undefined,
        type === 'defaultSemiBold' ? styles.defaultSemiBold : undefined,
        type === 'subtitle' ? styles.subtitle : undefined,
        type === 'link' ? styles.link : undefined,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
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
});
