import { ThemeProvider } from '@react-navigation/native';
import { DarkTheme, DefaultTheme } from '@/theme';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    ONE_Mobile_POP: require('../assets/fonts/ONE_Mobile_POP.ttf'),
    Pretendard_Light: require('../assets/fonts/Pretendard-Light.ttf'),
    Pretendard_Regular: require('../assets/fonts/Pretendard-Regular.ttf'),
    Pretendard_Bold: require('../assets/fonts/Pretendard-Bold.ttf'),
    Pretendard_SemiBold: require('../assets/fonts/Pretendard-SemiBold.ttf'),
    Pretendard_ExtraBold: require('../assets/fonts/Pretendard-ExtraBold.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DefaultTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(screen)/index" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
    </ThemeProvider>
  );
}
