import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TemplateScheduleState } from "./template-schedule-cache-slice";
import uuid from 'react-native-uuid';

interface TemplateScheduleStateMap {
    [id: string]: TemplateScheduleState;  // 각 상태를 ID로 관리하는 객체
}

const initialState:TemplateScheduleStateMap = {};  // 초기 상태는 빈 객체

const TemplateScheduleSlice = createSlice({
    name: 'templateSchedule',
    initialState,
    reducers: {
        //  스케줄 추가
        addTemplateSchedule(state, action: PayloadAction<TemplateScheduleState>) {
            const id = uuid.v4();
            state[id.toString()] = action.payload;
        },

        // 특정 스케줄을 업데이트
        updateTemplateSchedule(state, action: PayloadAction<{ id: string, data: TemplateScheduleState }>) {
            if (state[action.payload.id]) {
                state[action.payload.id] = action.payload.data;
            }
        },

        // 특정 스케줄을 삭제
        removeTemplateSchedule(state, action: PayloadAction<string>) {
            delete state[action.payload];
        },

        // 모든 스케줄 삭제
        resetTemplateSchedule(state) {
            return initialState;
        }
    }
});

export const { 
    addTemplateSchedule,
    updateTemplateSchedule,
    removeTemplateSchedule,
    resetTemplateSchedule,
} = TemplateScheduleSlice.actions;

export default TemplateScheduleSlice.reducer;
