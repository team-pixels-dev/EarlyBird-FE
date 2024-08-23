import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ScheduleTime {
    date: string;
    day: "eve" | "today";
}

interface TemplateScheduleState {
    schedule_title: string;
    schedule_date: string;
    schedule_repeat: boolean[];
    schedule_start_time: ScheduleTime
    schedule_move_time: ScheduleTime
    schedule_necessary: string[];
    schedule_process: string[];
}

const now = new Date().toISOString()

const initialState: TemplateScheduleState = {
    schedule_title: '',
    schedule_date: (new Date(new Date(now).getTime()+7200000)).toISOString(),
    schedule_repeat: [false, false, false, false, false, false, false],
    schedule_start_time: {date : now, day : "today"},
    schedule_move_time: {date : (new Date(new Date(now).getTime()+3600000)).toISOString(), day : "today"},
    schedule_necessary: [],
    schedule_process: []
};

const TemplateScheduleSlice = createSlice({
    name: 'templateSchedule',
    initialState,
    reducers: {
        // 스케줄 제목 설정
        setScheduleTitle(state, action: PayloadAction<string>) {
            state.schedule_title = action.payload;
        },

        // 스케줄 시각 설정
        setScheduleDate(state, action: PayloadAction<string>) {
            state.schedule_date = action.payload;
        },

        // 스케줄 반복일 설정
        setScheduleRepeat(state, action: PayloadAction<boolean[]>) {
            state.schedule_repeat = action.payload;
        },

        // 스케줄 시작 시간 설정
        setScheduleStartTimeDate(state, action: PayloadAction<string>) {
            state.schedule_start_time.date = action.payload;
        },

        // 스케줄 시작 날 설정
        setScheduleStartTimeDay(state, action: PayloadAction<"eve"|"today">) {
            state.schedule_start_time.day = action.payload;
        },

        // 스케줄 이동 시간 설정
        setScheduleMoveTimeDate(state, action: PayloadAction<string>) {
            state.schedule_move_time.date = action.payload;
        },

        // 스케줄 이동 날 설정
        setScheduleMoveTimeDay(state, action: PayloadAction<"eve"|"today">) {
            state.schedule_move_time.day = action.payload;
        },

        // 스케줄에 필요한 항목 설정
        setScheduleNecessary(state, action: PayloadAction<string[]>) {
            state.schedule_necessary = action.payload;
        },

        // 스케줄 진행 과정 설정
        setScheduleProcess(state, action: PayloadAction<string[]>) {
            state.schedule_process = action.payload;
        },

        // 특정 스케줄 반복일 추가
        addScheduleRepeat(state, action: PayloadAction<number>) {
            if(action.payload > -1 && action.payload < 7) {
                state.schedule_repeat[action.payload] = true;
            }
        },

        // 특정 스케줄 반복일 제거
        removeScheduleRepeat(state, action: PayloadAction<number>) {
            if(action.payload > -1 && action.payload < 7) {
                state.schedule_repeat[action.payload] = false;
            }
        },

        // 스케줄 초기화
        resetSchedule(state) {
            const now_ = new Date().toISOString();
            state.schedule_title = '';
            state.schedule_date = (new Date(new Date(now_).getTime()+7200000)).toISOString();
            state.schedule_repeat = [false, false, false, false, false, false, false];
            state.schedule_start_time = {date : now_, day : "today"};
            state.schedule_move_time = {date : (new Date(new Date(now_).getTime()+3600000)).toISOString(), day : "today"};
            state.schedule_necessary = [];
            state.schedule_process = [];
        }
    }
});

export const { 
    setScheduleTitle,
    setScheduleDate,
    setScheduleRepeat,
    setScheduleStartTimeDate,
    setScheduleStartTimeDay,
    setScheduleMoveTimeDate,
    setScheduleMoveTimeDay,
    setScheduleNecessary,
    setScheduleProcess,
    addScheduleRepeat,
    removeScheduleRepeat,
    resetSchedule,
} = TemplateScheduleSlice.actions;

export default TemplateScheduleSlice.reducer;
