import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { scheduleState } from "./template-schedule-cache-slice";
import uuid from 'react-native-uuid';
import { convertScheduleIdServerToClient } from "@/util/convert-schedule-id";

interface scheduleStateMap {
    [id: string]: scheduleState;  // 각 상태를 ID로 관리하는 객체
}

const initialState:scheduleStateMap = {};  // 초기 상태는 빈 객체

const scheduleSlice = createSlice({
    name: 'schedule',
    initialState,
    reducers: {
        //  스케줄 추가
        addschedule(state, action: PayloadAction<{ id: string, data: scheduleState }>) {
            state[convertScheduleIdServerToClient(action.payload.id)] = action.payload.data;
        },

        // 특정 스케줄을 업데이트
        updateschedule(state, action: PayloadAction<{ id: string, data: scheduleState }>) {
            if (state[action.payload.id]) {
                state[action.payload.id] = action.payload.data;
            }
        },

        // 특정 스케줄을 삭제
        removeschedule(state, action: PayloadAction<string>) {
            delete state[action.payload];
        },
        

        // 지난 스케줄을 정리
        cleanPastSchedule(state) {
            const now = new Date();
            Object.keys(state).forEach(id=>{
                if(new Date(state[id].schedule_date).getTime() <= now.getTime()) {
                    delete state[id];
                }
            });
        },

        sortSchedule(state) {
            // Object.entries로 state 객체를 배열로 변환하여 schedule_date 기준으로 정렬
            const sortedEntries = Object.entries(state)
                .sort(([, a], [, b]) => new Date(a.schedule_date).getTime() - new Date(b.schedule_date).getTime());
        
            // 기존 state를 초기화
            Object.keys(state).forEach((key) => delete state[key]);
        
            // 정렬된 순서로 state에 다시 추가
            sortedEntries.forEach(([id, data]) => {
                state[id] = data;
            });
        
            
        },
        

        // 모든 스케줄 삭제
        resetAllSchedule(state, action: PayloadAction<string>) {
            if(action.payload === "delete") {
                return initialState;
            }
        }
    }
});

export const { 
    addschedule,
    updateschedule,
    removeschedule,
    sortSchedule,
    cleanPastSchedule,
    resetAllSchedule,
} = scheduleSlice.actions;

export default scheduleSlice.reducer;