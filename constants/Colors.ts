/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#FFF500';
const tintColorDark = '#FFF500';

export const Colors = {
  light: {
    text: '#000000',
    background: '#fff',
    tint: tintColorLight,
    brightTint: 'rgb(255,251,161)',
    brightGray: '#F7F7F7',
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#ECEDEE',
    background: '#424242',
    tint: tintColorDark,
    brightTint: 'rgb(255,251,161)',
    brightGray: '#F7F7F7',
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
  },
};
