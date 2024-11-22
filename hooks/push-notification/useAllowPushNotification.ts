import messaging from '@react-native-firebase/messaging';
import { useEffect } from 'react';
import { Alert, Linking, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function useAllowPushNotification() {
    async function requestUserPermission() {
        const authStatus = await messaging().hasPermission();

        if (authStatus === messaging.AuthorizationStatus.NOT_DETERMINED) {
            const newAuthStatus = await messaging().requestPermission({
                alert: true,
                badge: true, 
                sound: true,
            });
            const enabled =
              newAuthStatus === messaging.AuthorizationStatus.AUTHORIZED ||
              newAuthStatus === messaging.AuthorizationStatus.PROVISIONAL;

            if (enabled) {
                AsyncStorage.setItem('pushPermissionDenied', 'false');
            } else {
                // 권한 거부 상태를 저장
                await AsyncStorage.setItem('pushPermissionDenied', 'true');
                await setFCMToken();
            }
            const fcmToken = await AsyncStorage.getItem('FCMToken');
            console.log(fcmToken);
            if(!fcmToken)
                await setFCMToken(); // 권한이 허용되면 FCM 토큰 가져오기
        } else if (authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
                   authStatus === messaging.AuthorizationStatus.PROVISIONAL) {
            // 이미 권한이 있으면 FCM 토큰 가져오기
            AsyncStorage.setItem('pushPermissionDenied', 'false');
            console.log('User has already granted permission.');
            await setFCMToken();
        } else {
            console.log('Push notification permission denied.');
            await AsyncStorage.setItem('pushPermissionDenied', 'true');

            Alert.alert(
                '알림 권한이 꺼져있어요.',
                '알림 기능이 꺼져있으면\n 얼리버드가 도와줄 수 없어요.\n설정에서 알림을 허용해주세요.',
                [
                    { text: '취소', style: 'cancel' },
                    { text: '설정으로 이동', onPress: () => {
                        if (Platform.OS === 'android') {
                            Linking.openSettings(); // 안드로이드 설정 페이지로 이동
                        } else if (Platform.OS === 'ios') {
                            Linking.openURL('app-settings:'); // iOS 설정 페이지로 이동
                        }
                    }}
                ]
            );
        }
    }

    async function setFCMToken() {
        try {
            if (Platform.OS === 'ios') {
                const apnsToken = await messaging().getAPNSToken()
                console.log("apnToken : " + apnsToken)
                if (!apnsToken) {
                    console.log("No APNs token available yet.");
                    Alert.alert('ACM토큰 오류', '현재 알림이 정상작동하지 않습니다.\n 앱을 재설치해주세요.');
                    return;
                }
            }
            
            const fcmToken = await messaging().getToken();
            console.log("fcmToken : " + fcmToken)
            if (fcmToken) {
                await AsyncStorage.setItem('FCMToken', fcmToken);
                messaging().setBackgroundMessageHandler(async remoteMessage => {
                    console.log('Message handled in the background!', remoteMessage);
                });
            } else {
                console.log('Failed to get FCM token');
                Alert.alert('FCM토큰 오류', '현재 알림이 정상작동하지 않습니다.\n 앱을 재설치해주세요.');
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
        console.log("try to get token")
        checkPermissionAndRequestIfNeeded();
    }, []);
}
