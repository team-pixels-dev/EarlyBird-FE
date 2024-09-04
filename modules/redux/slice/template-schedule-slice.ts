import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TemplateScheduleState {
    schedule_title: string;
    schedule_data: string;
    schedule_repeat: string[];
    schedule_start_time: string;
    schedule_move_time: string;
    schedule_necessary: string[];
    schedule_process: string[];
}

interface TemplateScheduleStateMap {
    [id: number]: TemplateScheduleState;  // 각 상태를 ID로 관리하는 객체
}

const initialState: TemplateScheduleStateMap = {};  // 초기 상태는 빈 객체

const TemplateScheduleSlice = createSlice({
    name: 'templateSchedule',
    initialState,
    reducers: {
        addTemplateSchedule(state, action: PayloadAction<{ id: number, data: TemplateScheduleState }>) {
            state[action.payload.id] = action.payload.data;
        },

        // 특정 스케줄을 업데이트합니다.
        updateTemplateSchedule(state, action: PayloadAction<{ id: number, data: TemplateScheduleState }>) {
            if (state[action.payload.id]) {
                state[action.payload.id] = action.payload.data;
            }
        },

        // 특정 스케줄을 삭제합니다.
        removeTemplateSchedule(state, action: PayloadAction<number>) {
            delete state[action.payload];
        },

        // 특정 스케줄에 반복 일정을 추가합니다.
        appendScheduleRepeat(state, action: PayloadAction<{ id: number, repeat: string[] }>) {
            if (state[action.payload.id]) {
                state[action.payload.id].schedule_repeat.push(...action.payload.repeat);
            }
        },

        appendScheduleProcess(state, action: PayloadAction<{ id: number, repeat: string[] }>) {
            if (state[action.payload.id]) {
                state[action.payload.id].schedule_process.push(...action.payload.repeat);
            }
        },

        resetTemplateSchedule(state, action: PayloadAction<number>) {
            if (state[action.payload]) {
                state[action.payload] = {
                    schedule_title: '',
                    schedule_data: '',
                    schedule_repeat: [],
                    schedule_start_time: '',
                    schedule_move_time: '',
                    schedule_necessary: [],
                    schedule_process: []
                };
            }
        },
    }
});

export const { 
    addTemplateSchedule,
    updateTemplateSchedule,
    removeTemplateSchedule,
    appendScheduleRepeat,
} = TemplateScheduleSlice.actions;

export default TemplateScheduleSlice.reducer;
