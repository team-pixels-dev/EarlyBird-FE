import { Stack } from 'expo-router';

export default function SetScheduleLayout() {
  return (
    <Stack screenOptions={{ 
      headerShown: false,
      }}>
      <Stack.Screen name="execute-schedule"/>
      <Stack.Screen name="add-schedule-1"/>
      <Stack.Screen name="add-schedule-2"/>
    </Stack>
  );
}
