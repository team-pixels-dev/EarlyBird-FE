import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ModalState {
    main_delete_confirm : {
        modalOpen : boolean;
        schedule_id : string;
    },
    feedback_modal : {
        modalOpen : boolean;
        schedule_id : string;
    },
}

const initialState: ModalState = {
    main_delete_confirm : {
        modalOpen : false,
        schedule_id : "",
    },
    feedback_modal : {
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
        setFeedbackModalOpen(state, action: PayloadAction<boolean>){
            state.feedback_modal.modalOpen = action.payload;
        },
        setFeedbackModalScheduleId(state, action: PayloadAction<string>){
            state.feedback_modal.schedule_id = action.payload;
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
    setFeedbackModalOpen,
    setFeedbackModalScheduleId,
    resetModals
} = ModalStateSlice.actions;

export default ModalStateSlice.reducer;
