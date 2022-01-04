import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
    name: "ui",
    initialState: {
        isShownCart: false,
        isAddingNewMealPopup: false,
        isShownCheckoutList: false,
    },
    reducers: {
        toggleCart(state, action) {
            Object.keys(state).forEach((ui) => (state[ui] = false));
            state.isShownCart = action.payload;
        },
        toggleAddNewMealPopup(state, action) {
            Object.keys(state).forEach((ui) => (state[ui] = false));
            state.isAddingNewMealPopup = action.payload;
        },
        toggleCheckoutList(state, action) {
            Object.keys(state).forEach((ui) => (state[ui] = false));
            state.isShownCheckoutList = action.payload;
        },
        disableAllState(state) {
            Object.keys(state).forEach((ui) => (state[ui] = false));
        },
    },
});

export const uiActions = uiSlice.actions;
export default uiSlice.reducer;