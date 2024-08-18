import { combineReducers } from "@reduxjs/toolkit";
import TemplateScheduleSlice from "./slice/template-schedule-slice";
/**
 * 사용 목적에 따라서 Slice 단위로 분리하여서 Root Reducer를 구성합니다.
 */
const RootReducer = combineReducers({
    templateSchedule: TemplateScheduleSlice,
});

export type RootState = ReturnType<typeof RootReducer>;

export default RootReducer;