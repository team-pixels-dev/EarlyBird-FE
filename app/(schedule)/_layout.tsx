import { Stack } from 'expo-router';

export default function SetScheduleLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="remaind-schedule" options={{ headerShown: false }}/>
    </Stack>
  );
}
