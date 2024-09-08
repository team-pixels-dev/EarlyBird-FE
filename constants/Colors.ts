/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#FFF500';
const tintColorDark = '#FFF500';

export const Colors = {
  light: {
    text: '#000000',
    background: '#FFF',
    selected: '#FFFFFF',
    tint: tintColorLight,
    brightTint: '#FFFB99',
    brightGray: '#F7F7F7',
    gray: '#898989',
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
    error: '#FF6666',
    textDisabledColor: '#b8b8b8',
  },
  dark: {
    text: '#ECEDEE',
    background: '#424242',
    selected: '#000000',
    tint: tintColorDark,
    // brightTint: '#807a00',
    brightTint: '#666633',
    brightGray: '#787878',
    gray: '#898989',
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
    error: '#FF6666',
    textDisabledColor: '#666666',
  },
};
