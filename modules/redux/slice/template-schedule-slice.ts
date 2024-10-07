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

        // 모든 스케줄 삭제
        resetschedule(state) {
            return initialState;
        }
    }
});

export const { 
    addschedule,
    updateschedule,
    removeschedule,
    resetschedule,
} = scheduleSlice.actions;

export default scheduleSlice.reducer;