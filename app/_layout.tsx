import { ThemeProvider } from '@react-navigation/native';
import { DarkTheme, DefaultTheme } from '@/theme';
import * as Font from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [fontsLoaded, setFontsLoaded] = useState(false);

  const loadFonts = async () => {
    await Font.loadAsync({
      'ONE_Mobile_POP': require('../assets/fonts/ONE_Mobile_POP.ttf'),
      'Pretendard-Light': require('../assets/fonts/Pretendard-Light.ttf'),
      'Pretendard-Regular': require('../assets/fonts/Pretendard-Regular.ttf'),
      'Pretendard-Bold': require('../assets/fonts/Pretendard-Bold.ttf'),
      'Pretendard-SemiBold': require('../assets/fonts/Pretendard-SemiBold.ttf'),
      'Pretendard-ExtraBold': require('../assets/fonts/Pretendard-ExtraBold.ttf'),
    });
    setFontsLoaded(true);
  };

  useEffect(() => {
    loadFonts();
  }, []);

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack screenOptions={{
        headerShown:false,
        animation: 'ios',
        }}>
        <Stack.Screen name="index"/>
        <Stack.Screen name="(schedule)"/>
        <Stack.Screen name="+not-found" />
      </Stack>
    </ThemeProvider>
  );
}
