import messaging from '@react-native-firebase/messaging';
import { useEffect, useState } from 'react';
import { Alert, Linking, Platform } from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function useAllowPushNotification() {
    async function requestUserPermission() {
        const authStatus = await messaging().hasPermission();

        if (authStatus === messaging.AuthorizationStatus.NOT_DETERMINED) {
            const newAuthStatus = await messaging().requestPermission();
            const enabled =
              newAuthStatus === messaging.AuthorizationStatus.AUTHORIZED ||
              newAuthStatus === messaging.AuthorizationStatus.PROVISIONAL;

            if (enabled) {
                AsyncStorage.setItem('pushPermissionDenied', 'false');
                await setFCMToken(); // 권한이 허용되면 FCM 토큰 가져오기
            } else {
                // 권한 거부 상태를 저장
                await AsyncStorage.setItem('pushPermissionDenied', 'true');
            }
        } else if (authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
                   authStatus === messaging.AuthorizationStatus.PROVISIONAL) {
            // 이미 권한이 있으면 FCM 토큰 가져오기
            AsyncStorage.setItem('pushPermissionDenied', 'false');
            console.log('User has already granted permission.');
            await setFCMToken();
        } else {
            console.log('Push notification permission denied.');
            await AsyncStorage.setItem('pushPermissionDenied', 'true');

            // iOS의 경우 설정으로 이동하도록 권장
            if (Platform.OS === 'ios') {
                Alert.alert(
                    '알림 권한이 꺼져있어요.',
                    '알림 기능이 꺼져 있으면\n 얼리버드가 도와줄 수 없어요.\n설정에서 알림을 허용해주세요.',
                    [
                        { text: '취소', style: 'cancel' },
                        { text: '설정으로 이동', onPress: () => Linking.openURL('app-settings:') }
                    ]
                );
            }
        }
    }

    async function setFCMToken() {
        try {
            const fcmToken = await messaging().getToken();
            if (fcmToken) {
                AsyncStorage.setItem('FCMToken', fcmToken);        
            } else {
                console.log('Failed to get FCM token');
                Alert.alert('경고', '현재 알림이 정상작동하지 않습니다.\n 앱을 재설치해주세요.');
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
            AsyncStorage.setItem('pushPermissionDenied', 'false');
            await requestUserPermission();
        }
    }

    useEffect(() => {
        checkPermissionAndRequestIfNeeded();
    }, []);
}
