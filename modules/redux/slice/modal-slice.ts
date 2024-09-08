import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ModalState {
    main_delete_confirm : {
        modalOpen : boolean;
        schedule_id : string;
    }
}

const initialState: ModalState = {
    main_delete_confirm : {
        modalOpen : false,
        schedule_id : "",
    }
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
        }
    }
});

export const {
    setMainDeleteConfrimModalOpen,
    setMainDeleteConfrimScheduleId,
} = ModalStateSlice.actions;

export default ModalStateSlice.reducer;
