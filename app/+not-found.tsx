import { Link, Stack } from 'expo-router';
import { StyleSheet } from 'react-native';
import { RegularText } from '@/components/ui/texts/regular-text';
import { FullScreen } from '@/components/layout/full_screen';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <FullScreen style={styles.container}>
        <RegularText type="title">This screen doesn't exist.</RegularText>
        <Link href="/" style={styles.link}>
          <RegularText type="link">Go to home screen!</RegularText>
        </Link>
      </FullScreen>
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
