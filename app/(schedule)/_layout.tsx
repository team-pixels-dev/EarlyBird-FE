import { Stack } from 'expo-router';

export default function SetScheduleLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index"/>
      <Stack.Screen name="remaind-schedule"/>
    </Stack>
  );
}
