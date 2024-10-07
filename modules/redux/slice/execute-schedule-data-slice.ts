import { createSlice, PayloadAction } from "@reduxjs/toolkit";


export interface ExecuteScheduleDataState {
    schedule_id : string;
    final_excute_mode : "before_start" | "wait_start" | "ready" | "moving" | "wait_done" |"done" | "done_rate";
    start_button_pressed : boolean;
    start_button_pressed_time : string;
    arrive_button_pressed : boolean;
    arrive_button_pressed_time : string;
}

const initialState: ExecuteScheduleDataState = {
    schedule_id: "",
    start_button_pressed: false,
    start_button_pressed_time: "",
    final_excute_mode: "before_start",
    arrive_button_pressed : false,
    arrive_button_pressed_time : ""
}

const ExecuteScheduleDataSlice = createSlice({
    name: "executeScheduleData",
    initialState,
    reducers: {
        setScheduleId(state, action: PayloadAction<string>){
            state.schedule_id = action.payload;
        },

        setStartButtonPressed(state, action: PayloadAction<boolean>){
            state.start_button_pressed = action.payload;
        },

        setStartButtonPresssedTime(state, action: PayloadAction<string>){
            state.start_button_pressed_time = new Date(action.payload).toISOString();
        },

        setFinalExecuteMode(state, action: PayloadAction<"before_start" | "wait_start" | "ready" | "moving" | "wait_done" | "done" | "done_rate">){
            state.final_excute_mode = action.payload;
        },

        resetExecuteScheduleData(state) {
            return initialState;
        }
    }
});

export const {
    setScheduleId,
    setStartButtonPressed,
    setStartButtonPresssedTime,
    setFinalExecuteMode,
    resetExecuteScheduleData,
} = ExecuteScheduleDataSlice.actions;

export default ExecuteScheduleDataSlice.reducer;