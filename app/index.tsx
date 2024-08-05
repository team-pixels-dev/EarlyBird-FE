import { ScrollView, Text, View } from "react-native";
import { StyleSheet } from "react-native";
import { RegularText } from '@/components/ui/texts/regular-text'
import { FullScreen } from "@/components/layout/full_screen";
import { FullSizeButton } from "@/components/ui/buttons/full-size-button";
import { useColorScheme } from '@/hooks/useColorScheme';
import { ThemedText } from "@/components/ui/texts/themed-text";
import { StartLeftView } from "@/components/layout/start_left_view";
import { ScheduleList } from "@/components/feature/showSchedule/schedule-list";
import { FloatingPlusButton } from "@/components/ui/buttons/floating-plus-button";

const { hScale } = require('@/util/scaling');

export default function Index() {
  return (
    <FullScreen>
      <StartLeftView style={styles.top1}>
          <ThemedText type="defaultSemiBold" style={{fontSize: hScale(20)}}>나의 약속</ThemedText>
      </StartLeftView>
      <ScrollView>
        <ScheduleList type="soon"></ScheduleList>
        <ScheduleList type="other"></ScheduleList>
      </ScrollView>
      <FloatingPlusButton></FloatingPlusButton>
    </FullScreen>
  );
}

const styles = StyleSheet.create({
  top1: {
    marginTop: hScale(65),
    marginBottom: hScale(53)
  },
})