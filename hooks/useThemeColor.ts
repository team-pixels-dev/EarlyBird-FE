/**
 * Learn more about light and dark modes:
 * https://docs.expo.dev/guides/color-schemes/
 */

import { useColorScheme } from 'react-native';

import { Colors } from '@/constants/Colors';

export function useThemeColor(
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark
) {
  // 다크모드 비활성화
  const theme = useColorScheme() ?? 'light';
  // const theme = 'light';

  return Colors[theme][colorName];
}
