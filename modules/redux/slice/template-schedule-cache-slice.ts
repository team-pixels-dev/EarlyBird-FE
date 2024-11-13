import { addMinutes, dateChangeAmount } from "@/util/calculate_date";
import { validateNecessroy } from "@/util/validate_text";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface scheduleState {
    schedule_type: "date" | "repeat";
    schedule_title: string;
    schedule_date: string;
    schedule_repeat: boolean[];
    schedule_ready: number,
    schedule_move: number,
    schedule_necessary: string[];
    schedule_necessary_checked: boolean[];
    schedule_postphone_minutes: number[];
    created_at: string;
}

let now = new Date();

const initialState: scheduleState = {
    schedule_type: "date",
    schedule_title: "",
    schedule_date: new Date(now.getTime() + 3600000).toISOString(),
    schedule_repeat: [false, false, false, false, false, false, false],
    schedule_ready: 5,
    schedule_move: 5,
    schedule_necessary: [],
    schedule_necessary_checked: [],
    schedule_postphone_minutes: [0, 0, 0], // ready, move, schedule
    created_at: now.toISOString()
};

const scheduleSlice = createSlice({
    name: "schedule",
    initialState,
    reducers: {
        loadScheduleToCache(state, action:PayloadAction<scheduleState>){
            return action.payload;
        },
        setScheduleType(state, action: PayloadAction<"date" | "repeat">){
            state.schedule_type = action.payload;
        },
        // 스케줄 제목 설정
        setScheduleTitle(state, action: PayloadAction<string>) {
            state.schedule_title = action.payload;
        },

        // 스케줄 날짜+시간 설정
        setScheduleDateTime(state, action: PayloadAction<string>) {
            state.schedule_date = new Date(action.payload).toISOString();
        },

        // 스케줄 날짜 설정
        setScheduleDate(state, action: PayloadAction<string>) {
            const dateTime = new Date(state.schedule_date);
            const year = parseInt(action.payload.split('-')[0]);
            const month = parseInt(action.payload.split('-')[1]);
            const day = parseInt(action.payload.split('-')[2]);
            dateTime.setFullYear(year, month - 1, day);
            state.schedule_date = dateTime.toISOString();
        },

        // 스케줄 시간 설정
        setScheduleTime(state, action: PayloadAction<string>) {
            const dateTime = new Date(state.schedule_date);
            const time = new Date(action.payload);
            dateTime.setHours(time.getHours(), time.getMinutes());
            state.schedule_date = action.payload;
        },

        // 스케줄 반복일 설정
        setScheduleRepeat(state, action: PayloadAction<boolean[]>) {
            state.schedule_repeat = action.payload;
        },

        // 스케줄 시작 시간 설정
        setScheduleReady(state, action: PayloadAction<number>){
            state.schedule_ready = action.payload;
        },

        setScheduleMove(state, action: PayloadAction<number>){
            state.schedule_move = action.payload;
        },

        // 스케줄에 필요한 항목 설정
        setScheduleNecessary(state, action: PayloadAction<string[]>) {
            state.schedule_necessary = action.payload;
        },

        // 스케줄에 필요한 항목 추가
        addScheduleNecessary(state, action: PayloadAction<string>) {
            if(state.schedule_necessary_checked)
            if(validateNecessroy(action.payload).valid){
                state.schedule_necessary.push(action.payload);
                state.schedule_necessary_checked.push(false);
            }
        },

        // 스케줄에 필요한 항목 제거(index 참조)
        removeScheduleNecessary(state, action: PayloadAction<number>) {
            const length = state.schedule_necessary.length
            const value = action.payload
            if(length === 0 || value < 0 || value >= length)
                return;
            state.schedule_necessary.splice(value, 1);
            state.schedule_necessary_checked.splice(value, 1);
        },

        // 체크된 necessary 설정
        addScheduleNecessaryChecked(state, action: PayloadAction<number>) {
            const length = state.schedule_necessary_checked.length;
            const value = action.payload;
            if(length === 0 || value < 0 || value >= length)
                return;
            state.schedule_necessary_checked[action.payload] = true;
        },

        // 체크된 necessary 설정
        removeScheduleNecessaryChecked(state, action: PayloadAction<number>) {
            const length = state.schedule_necessary_checked.length;
            const value = action.payload;
            if(length === 0 || value < 0 || value >= length)
                return;
            state.schedule_necessary_checked[action.payload] = false;
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

        /** 
         * 스케쥴을 전체적으로 n분 미루거나 당김
        */
        changeScheduleTime(state, action: PayloadAction<number[]>) {
            action.payload.forEach((value)=>{
                if(value > 3600 * 24) return;
            });
            const schedule_time_tmp = new Date(state.schedule_date);
            const schedule_time_added = addMinutes(schedule_time_tmp, action.payload[2]);
            const schedule_date_change_amount = dateChangeAmount(schedule_time_tmp, schedule_time_added);

            state.schedule_date = schedule_time_added.toISOString();
            state.schedule_ready += action.payload[0];
            state.schedule_move += action.payload[1];
            action.payload.forEach((value, index)=>{
                state.schedule_postphone_minutes[index] += value;
            });
        },

        // 스케줄 초기화
        resetScheduleCache(state) {
            let now_ = new Date();
            now_.setSeconds(0,0);
            state.schedule_type = "date";
            state.schedule_title = '';
            state.schedule_date = new Date(now_.getTime()+3600000).toISOString();
            state.schedule_repeat = [false, false, false, false, false, false, false];
            state.schedule_ready = 5;
            state.schedule_move = 5;
            state.schedule_necessary = [];
            state.schedule_necessary_checked = [];
            state.schedule_postphone_minutes = [0, 0, 0];
            state.created_at = now_.toISOString();
        },

        setCreateAt(state) {
            state.created_at = new Date().toISOString();
        }
    }
});

export const { 
    loadScheduleToCache,
    setScheduleType,
    setScheduleTitle,
    setScheduleDateTime,
    setScheduleDate,
    setScheduleTime,
    setScheduleRepeat,
    setScheduleReady,
    setScheduleMove,
    setScheduleNecessary,
    addScheduleNecessary,
    removeScheduleNecessary,
    addScheduleNecessaryChecked,
    removeScheduleNecessaryChecked,
    addScheduleRepeat,
    removeScheduleRepeat,
    changeScheduleTime,
    resetScheduleCache,
    setCreateAt
} = scheduleSlice.actions;

export default scheduleSlice.reducer;
