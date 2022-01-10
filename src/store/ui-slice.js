import { createSlice } from "@reduxjs/toolkit";

const disableAllStates = (state) => {
    Object.keys(state).forEach((ui) => (state[ui] = false));
};

const uiSlice = createSlice({
    name: "ui",
    initialState: {
        isShownCart: false,
        isAddingNewMealPopup: false,
        isShownCheckoutList: false,
        isShownHamburgerMenu: false,
    },
    reducers: {
        toggleCart(state, action) {
            Object.keys(state).forEach((ui) => (state[ui] = false));
            state.isShownCart = action.payload;
        },
        toggleHamburgerMenu(state) {
            state.isShownHamburgerMenu = !state.isShownHamburgerMenu;
        },
        disableAllState(state) {
            disableAllStates(state);
        },
        toggleAddNewMealPopup(state, action) {
            disableAllStates(state);
            state.isAddingNewMealPopup = action.payload;
        },
        toggleCheckoutList(state, action) {
            disableAllStates(state);
            state.isShownCheckoutList = action.payload;
        },
    },
});

export const uiActions = uiSlice.actions;
export default uiSlice.reducer;