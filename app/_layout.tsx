import { ThemeProvider } from '@react-navigation/native';
import { NavigationContainer } from '@react-navigation/native';
import { DarkTheme, DefaultTheme } from '@/theme';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { Persistor, Store } from "@/modules/redux/store";
import { useColorScheme } from '@/hooks/useColorScheme';
import RootStack from './__layout';
import messaging from '@react-native-firebase/messaging';
import client from '@/modules/axios/client';
import { useMakeDeviceId } from '@/hooks/device-id/useMakeDeviceId';
import { useAllowPushNotification } from '@/hooks/push-notification/useAllowPushNotification';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

// background에서 push 알림 수신 

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [fontsLoaded, setFontsLoaded] = useState(false);

  const loadFonts = async () => {
    await Font.loadAsync({
      'ONE_Mobile_POP': require('../assets/fonts/ONE_Mobile_POP.ttf'),
      'Pretendard-Light': require('../assets/fonts/Pretendard-Light.ttf'),
      'Pretendard-Regular': require('../assets/fonts/Pretendard-Regular.ttf'),
      'Pretendard-Medium': require('../assets/fonts/Pretendard-Medium.ttf'),
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
    <NavigationContainer>
      <Provider store={Store}>
        <PersistGate persistor={Persistor}>
          <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
            <RootStack/>
          </ThemeProvider>
        </PersistGate>
      </Provider>
    </NavigationContainer>
  );
}

