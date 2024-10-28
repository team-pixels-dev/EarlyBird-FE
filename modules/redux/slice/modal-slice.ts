import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ModalState {
    main_delete_confirm : {
        modalOpen : boolean;
        schedule_id : string;
    },
    execute_schedule_done_modal : {
        modalOpen : boolean;
        schedule_id : string;
    },
}

const initialState: ModalState = {
    main_delete_confirm : {
        modalOpen : false,
        schedule_id : "",
    },
    execute_schedule_done_modal : {
        modalOpen : false,
        schedule_id : "",
    },
}

const ModalStateSlice = createSlice({
    name: "Modal",
    initialState,
    reducers: {
        setMainDeleteConfrimModalOpen(state, action: PayloadAction<boolean>){
            state.main_delete_confirm.modalOpen = action.payload;
        },
        setMainDeleteConfrimScheduleId(state, action: PayloadAction<string>){
            state.main_delete_confirm.schedule_id = action.payload;
        },
        setExecuteScheduleDoneModalOpen(state, action: PayloadAction<boolean>){
            state.execute_schedule_done_modal.modalOpen = action.payload;
        },
        setExecuteScheduleDoneModalScheduleId(state, action: PayloadAction<string>){
            state.execute_schedule_done_modal.schedule_id = action.payload;
        },
        resetModals(){
            console.log("call init");
            return initialState;
        }
    }
});

export const {
    setMainDeleteConfrimModalOpen,
    setMainDeleteConfrimScheduleId,
    setExecuteScheduleDoneModalOpen,
    setExecuteScheduleDoneModalScheduleId,
    resetModals
} = ModalStateSlice.actions;

export default ModalStateSlice.reducer;
