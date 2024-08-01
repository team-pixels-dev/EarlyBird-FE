import { Link, Stack } from 'expo-router';
import { StyleSheet } from 'react-native';
import { RegularText } from '@/components/texts/regular-text';
import { HScreen } from '@/components/layout/h_screen';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <HScreen style={styles.container}>
        <RegularText type="title">This screen doesn't exist.</RegularText>
        <Link href="/" style={styles.link}>
          <RegularText type="link">Go to home screen!</RegularText>
        </Link>
      </HScreen>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
});
