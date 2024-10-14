import messaging from '@react-native-firebase/messaging';
import { useEffect, useState } from 'react';
import { Alert, Linking, Platform } from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function useAllowPushNotification() {
    const [fcmModalOpen, setFcmModalOpen] = useState(false);
    async function requestUserPermission() {
        const authStatus = await messaging().hasPermission();

        if (authStatus === messaging.AuthorizationStatus.NOT_DETERMINED) {
            const newAuthStatus = await messaging().requestPermission();
            const enabled =
              newAuthStatus === messaging.AuthorizationStatus.AUTHORIZED ||
              newAuthStatus === messaging.AuthorizationStatus.PROVISIONAL;

            if (enabled) {
                console.log('Authorization status:', newAuthStatus);
                await getFCMToken(); // 권한이 허용되면 FCM 토큰 가져오기
            } else {
                // 권한 거부 상태를 저장
                await AsyncStorage.setItem('pushPermissionDenied', 'true');
            }
        } else if (authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
                   authStatus === messaging.AuthorizationStatus.PROVISIONAL) {
            // 이미 권한이 있으면 FCM 토큰 가져오기
            console.log('User has already granted permission.');
            await getFCMToken();
        } else {
            console.log('Push notification permission denied.');
            await AsyncStorage.setItem('pushPermissionDenied', 'true');

            // iOS의 경우 설정으로 이동하도록 권장
            if (Platform.OS === 'ios') {
                Alert.alert(
                    '푸시 알림 권한 비활성화됨',
                    '설정 드가서 푸시 알림 권한 활성화 ㄱㄱ',
                    [
                        { text: '취소', style: 'cancel' },
                        { text: '설정으로 이동', onPress: () => Linking.openURL('app-settings:') }
                    ]
                );
            }
        }
    }

    async function getFCMToken() {
        try {
            const fcmToken = await messaging().getToken();
            if (fcmToken) {
                console.log('FCM Token:', fcmToken);
                AsyncStorage.setItem('FCMToken', fcmToken);
                Clipboard.setString(fcmToken);
                Alert.alert('클립보드에 복사되었습니다', 'FCM 토큰이 클립보드에 복사되었습니다.');
            } else {
                console.log('Failed to get FCM token');
            }
        } catch (error) {
            console.error('Error getting FCM token:', error);
        }
    }

    async function checkPermissionAndRequestIfNeeded() {
        const permissionDenied = await AsyncStorage.getItem('pushPermissionDenied');

        if (permissionDenied === 'true') {
            console.log('Requesting permission again as it was denied before.');
            await requestUserPermission();
        } else {
            await requestUserPermission();
        }
    }

    useEffect(() => {
        checkPermissionAndRequestIfNeeded();
    }, []);
}
