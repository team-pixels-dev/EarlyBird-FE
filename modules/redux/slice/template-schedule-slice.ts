import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { scheduleState } from "./template-schedule-cache-slice";
import uuid from 'react-native-uuid';

interface scheduleStateMap {
    [id: string]: scheduleState;  // 각 상태를 ID로 관리하는 객체
}

const initialState:scheduleStateMap = {};  // 초기 상태는 빈 객체

const scheduleSlice = createSlice({
    name: 'schedule',
    initialState,
    reducers: {
        //  스케줄 추가
        addschedule(state, action: PayloadAction<scheduleState>) {
            const id = uuid.v4();
            state[id.toString()] = action.payload;
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

        sortSchedule(state){
            const sortedEntries = Object.entries(state).sort(([, a], [, b]) => {
                return new Date(a.schedule_date).getTime() - new Date(b.schedule_date).getTime();
            });

            // 새로운 객체로 반환
            const sortedState: scheduleStateMap = sortedEntries.reduce((acc, [id, schedule]) => {
                acc[id] = schedule;
                return acc;
            }, {} as scheduleStateMap);

            return sortedState; // 정렬된 새로운 상태 반환
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