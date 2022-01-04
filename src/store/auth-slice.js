import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser: null,
    isLoggedIn: false,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        updateCurrentUser(state, action) {
            state.currentUser = action.payload;
        },
        setIsLoggedIn(state, action) {
            state.isLoggedIn = action.payload;
        },
    },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;