import uuid from 'react-native-uuid';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';

export function useMakeDeviceId() {
    async function setAsyncStorageItem(){
        const deviceId = await AsyncStorage.getItem('deviceId');
        if(deviceId) {
            console.log(deviceId);
            return;
        } else {
            const id = uuid.v4();
            AsyncStorage.setItem('deviceId', id.toString());
        }
        
    }

    useEffect(()=>{
        setAsyncStorageItem();
    },[])
}