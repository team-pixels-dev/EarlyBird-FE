import { useEffect } from 'react';
import { Alert, BackHandler } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const useExitConfirmation = () => {
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
        return true; // 안드로이드 백버튼 기본 동작 차단
      }
      return false; // 백버튼 기본 동작 허용
    };

    BackHandler.addEventListener('hardwareBackPress', handlePressBack);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handlePressBack);
    };
  }, [navigation]);
};

export default useExitConfirmation;
