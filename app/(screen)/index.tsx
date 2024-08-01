import { Text, View } from "react-native";
import { StyleSheet } from "react-native";
import { RegularText } from '@/components/texts/regular-text'
import { HScreen } from "@/components/layout/h_screen";
import { FullSizeButton } from "@/components/ui/buttons/full-size-button";
import { useColorScheme } from '@/hooks/useColorScheme';

export default function Index() {
  const colorScheme = useColorScheme();
  return (
    <HScreen>
      <RegularText style={styles.text}>나의 약속</RegularText>
    </HScreen>
  );
}

const styles = StyleSheet.create({
  text:{
    
  }
})