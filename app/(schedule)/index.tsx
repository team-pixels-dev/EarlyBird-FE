import { Alert, BackHandler, ScrollView, Text, View } from "react-native";
import { StyleSheet } from "react-native";
import { FullScreen } from "@/components/layout/full_screen";
import { ThemedText } from "@/components/ui/texts/themed-text";
import { StartLeftView } from "@/components/layout/start_left_view";
import { ScheduleList } from "@/components/feature/showSchedule/schedule-list";
import { AddScheduleButton } from "@/components/feature/add-schedule/add-schedule-button";
import { AddScheduleModal } from "@/components/feature/add-schedule/add-schedule-modal"
import { useCallback, useEffect, useState } from "react";
import { useNavigation } from "expo-router";

const { hScale } = require('@/util/scaling');

export default function Index() {
  const [modalOpen, setModalOpen] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    
    const handlePressBack = () => {
      if (navigation.isFocused()) {
        Alert.alert(
          "앱 종료",
          "앱을 종료하시겠습니까?",
          [
            {
              text: "아니요",
              onPress: () => null,
              style: "cancel"
            },
            { text: "네", onPress: () => BackHandler.exitApp() }
          ],
          { cancelable: false }
        );
      return true;
      };
    };

    BackHandler.addEventListener('hardwareBackPress', handlePressBack);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handlePressBack);
    };
  }, []);

  return (
    <FullScreen>
      <StartLeftView style={styles.top1}>
          <ThemedText type="defaultSemiBold" style={{fontSize: hScale(20)}}>나의 약속</ThemedText>
      </StartLeftView>
      <ScrollView>
        <ScheduleList type="soon"></ScheduleList>
        <ScheduleList type="other"></ScheduleList>
      </ScrollView>
      <AddScheduleButton onPress={() => setModalOpen(!modalOpen)}/>
      <AddScheduleModal setModalOpen={setModalOpen} modalOpen={modalOpen}/>
    </FullScreen>
  );
}

const styles = StyleSheet.create({
  top1: {
    marginTop: hScale(65),
    marginBottom: hScale(53)
  },
})