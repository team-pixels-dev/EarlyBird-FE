/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#FFF500';
const tintColorDark = '#FFF500';

export const Colors = {
  light: {
    background: '#FFF',
    selected: '#FFFFFF',

    // textColors
    text: '#000000',
    darkText: '#191919',
    text1: '#3D3D3D',
    text2 : '#4B4B4B',
    text3 : '#4C4C4C',
    text4: '#3F3F3F',
    brightText1: '#7A7A7A',
    brightText2: '#BABABA',
    brightText3 : '#A5A5A5',
    brightText4 : '#B2B2B2',
    buttonText: '#000000',
    

    // yellows
    tint: tintColorLight,
    brightTint: '#FFFB99',
    memoTint: '#fffcb4',

    // calender
    today: '#00adf5',

    // button
    defaultButtonText: '#000000',
    selectedButtonText: '#000000',

    brightGray: '#F7F7F7',
    gray: '#898989',
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
    error: '#FF6666',
    textDisabledColor: '#b8b8b8',
  },
  dark: {
    background: '#262626',
    selected: '#000000',

    // textColors
    text: '#ECEDEE',
    darkText: '#FFFFFF',
    text1: '#3D3D3D',
    text2 : '#4B4B4B',
    text3 : '#4C4C4C',
    text4: '#3F3F3F',
    brightText1: '#7A7A7A',
    brightText2: '#BABABA',
    brightText3 : '#A5A5A5',
    brightText4 : '#B2B2B2',
    buttonText: '#000000',

    // yellows
    tint: tintColorDark,
    brightTint: '#FFF851',
    memoTint: '#fffcb4',

    // calender
    today: '#FFF500',

    // button
    defaultButtonText: '#ECEDEE',
    selectedButtonText: '#000000',

    brightGray: '#3F3F3F',
    gray: '#898989',
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
    error: '#FF6666',
    textDisabledColor: '#666666',
  },
};
