import { combineReducers } from "@reduxjs/toolkit";
import scheduleSlice from "./slice/template-schedule-slice";
import scheduleCacheSlice from "./slice/template-schedule-cache-slice";
import modalSlice from "./slice/modal-slice";
import executeScheduleDataSlice from "./slice/execute-schedule-data-slice";
/**
 * 사용 목적에 따라서 Slice 단위로 분리하여서 Root Reducer를 구성합니다.
 */
const RootReducer = combineReducers({
    schedule: scheduleSlice,
    scheduleCache: scheduleCacheSlice,
    modal: modalSlice,
    executeScheduleData: executeScheduleDataSlice
});

export type RootState = ReturnType<typeof RootReducer>;

export default RootReducer;