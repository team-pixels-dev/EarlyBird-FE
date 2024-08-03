import { Text, View } from "react-native";
import { StyleSheet } from "react-native";
import { RegularText } from '@/components/ui/texts/regular-text'
import { FullScreen } from "@/components/layout/full_screen";
import { FullSizeButton } from "@/components/ui/buttons/full-size-button";
import { useColorScheme } from '@/hooks/useColorScheme';
import { ThemedText } from "@/components/ui/texts/ThemedText";
import { StartLeftView } from "@/components/layout/start_left_view";

const { hScale } = require('@/util/scaling');

export default function Index() {
  const colorScheme = useColorScheme();
  return (
    <FullScreen>
      <View>
        <StartLeftView>
          <ThemedText type="defaultSemiBold" style={styles.text}>나의 약속</ThemedText>
        </StartLeftView>
        <ThemedText type="defaultSemiBold" style={styles.text}>나의 약속</ThemedText>
      </View>
    </FullScreen>
  );
}

const styles = StyleSheet.create({
  text:{
    fontSize: hScale(20)
  }
})