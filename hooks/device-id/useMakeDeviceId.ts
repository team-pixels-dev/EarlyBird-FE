import uuid from 'react-native-uuid';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';
import client from '@/modules/axios/client';

export function useMakeDeviceId() {
    async function setAsyncStorageItem(){
        const deviceId = await AsyncStorage.getItem('deviceId');
        if(deviceId) {
            visitLog(deviceId);
            return;
        } else {
            const id = uuid.v4();
            visitLog(id.toString());
            AsyncStorage.setItem('deviceId', id.toString());
        }
    }

    function visitLog(deviceId : string){
        client.post('/api/v1/log/visit-event', {
            "clientId" : deviceId
        }).then((res)=>{console.log('visit 요청 성공')}).catch((err)=>{console.log('visit 요청 실패')});
    }

    useEffect(()=>{
        setAsyncStorageItem();
    },[])
}