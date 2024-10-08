import { addMinutes, dateChangeAmount } from "@/util/calculate_date";
import { validateNecessroy } from "@/util/validate_text";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ScheduleTime {
    date: string;
    day: "eve" | "today";
}

export interface scheduleState {
    schedule_type: "date" | "repeat";
    schedule_title: string;
    schedule_date: string;
    schedule_repeat: boolean[];
    schedule_start_time: ScheduleTime
    schedule_move_time: ScheduleTime
    schedule_necessary: string[];
    schedule_necessary_checked: boolean[];
    schedule_postphone_minutes: number[];
    created_at: string;
}

let now = new Date().toISOString();

const initialState: scheduleState = {
    schedule_type: "date",
    schedule_title: "",
    schedule_date: (new Date(new Date(now).getTime()+10800000)).toISOString(),
    schedule_repeat: [false, false, false, false, false, false, false],
    schedule_start_time: {date : (new Date(new Date(now).getTime()+3600000)).toISOString(), day : "today"},
    schedule_move_time: {date : (new Date(new Date(now).getTime()+7200000)).toISOString(), day : "today"},
    schedule_necessary: [],
    schedule_necessary_checked: [],
    schedule_postphone_minutes: [0, 0, 0],
    created_at: now
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

        /** 스케쥴을 전체적으로 n분 미루거나 당김
         * 날짜가 변경됨에 따라 준비, 이동 시간의 전날 / 당일을 판단하여 반영
        */
        changeScheduleTime(state, action: PayloadAction<number[]>) {
            action.payload.forEach((value)=>{
                if(value > 3600 * 24) return;
            });
            const schedule_time_tmp = new Date(state.schedule_date);
            const schedule_time_added = addMinutes(schedule_time_tmp, action.payload[0]);
            const schedule_date_change_amount = dateChangeAmount(schedule_time_tmp, schedule_time_added);
            const start_time_tmp  = new Date(state.schedule_start_time.date);
            const start_time_added = addMinutes(start_time_tmp, action.payload[1]);
            const start_time_change_amount = dateChangeAmount(start_time_tmp, start_time_added);
            const move_time_tmp = new Date(state.schedule_move_time.date);
            const move_time_added = addMinutes(move_time_tmp, action.payload[2]);
            const move_time_change_amount = dateChangeAmount(move_time_tmp, move_time_added);

            state.schedule_date = schedule_time_added.toISOString();
            state.schedule_start_time.date = start_time_added.toISOString();
            state.schedule_move_time.date = move_time_added.toISOString();
            
            if(schedule_date_change_amount === 1) {
                if(start_time_change_amount === 0) {
                    state.schedule_start_time.day = "eve";
                }
                if(move_time_change_amount === 0) {
                    state.schedule_move_time.day = "eve";
                }
            } else if (schedule_date_change_amount === 0) {
                if(start_time_change_amount === 1) {
                    state.schedule_start_time.day = "today";
                } else if (start_time_change_amount === -1) {
                    state.schedule_start_time.day = "eve";
                }
                if(move_time_change_amount === 1) {
                    state.schedule_move_time.day = "today";
                } else if (move_time_change_amount === -1) {
                    state.schedule_move_time.day = "eve";
                }
            } else if (schedule_date_change_amount === -1){
                if(start_time_change_amount === 0) {
                    state.schedule_start_time.day = "today";
                }
                if(move_time_change_amount === 0) {
                    state.schedule_move_time.day = "today";
                }
            }

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
            state.schedule_date = (new Date(now_.getTime()+10800000)).toISOString();
            state.schedule_repeat = [false, false, false, false, false, false, false];
            state.schedule_start_time = {date : (new Date(now_.getTime()+3600000)).toISOString(), day : 
                now_.getDate() === new Date(state.schedule_date).getDate() ? 
                 "today" : "eve"};
            state.schedule_move_time = {date : (new Date(now_.getTime()+7200000)).toISOString(), day : 
                (new Date(now_.getTime()+3600000)).getDate() === new Date(state.schedule_date).getDate() ? 
                 "today" : "eve"};
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
    setScheduleStartTimeDate,
    setScheduleStartTimeDay,
    setScheduleMoveTimeDate,
    setScheduleMoveTimeDay,
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
