import type { Theme } from './type';
import { DefaultTheme } from '@react-navigation/native';

const CustomDefaultTheme: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#FFF500',
    background: 'rgb(255, 255, 255)',
    card: 'rgb(255, 255, 255)',
    text: 'rgb(0, 0, 0)',
    border: 'rgb(216, 216, 216)',
    notification: 'rgb(0, 2, 133)',
  },
};

export default CustomDefaultTheme;
