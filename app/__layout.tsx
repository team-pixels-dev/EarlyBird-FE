import { ThemeProvider } from '@react-navigation/native';
import { DarkTheme, DefaultTheme } from '@/theme';
import * as Font from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';
import { Provider, useSelector } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { Persistor, Store } from "@/modules/redux/store";

import { useColorScheme } from '@/hooks/useColorScheme';
import { RootState } from '@/modules/redux/root-reducer';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootStack() {
  const can_back = useSelector((state:RootState)=>state.executeScheduleData.can_back);
  console.log(can_back);
  return (
    <Stack screenOptions={{
      headerShown:false,
      gestureEnabled: can_back
      }}>
      <Stack.Screen name="(schedule)"/>
      <Stack.Screen name="index"/>
      <Stack.Screen name="+not-found" />
    </Stack>
  );
}
