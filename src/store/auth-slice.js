import { createSlice } from "@reduxjs/toolkit";
import { auth } from "../others/firebase";

const initialState = {
    currentUser: null,
    isLoggedIn: false,
    token: "",
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        updateCurrentUser(state, action) {
            if (action.payload === null) {
                state = initialState;
                return;
            }
            const keys = Object.keys(action.payload);
            const userInfo = keys
                .filter((key) => key !== "token")
                .reduce((obj, key) => {
                    obj[key] = action.payload[key];
                    return obj;
                }, {});
            state.currentUser = userInfo;
            state.token = action.payload.token;
        },
        setIsLoggedIn(state, action) {
            state.isLoggedIn = action.payload;
        },
        signOut(state) {
            state.token = "";
            state.isLoggedIn = false;
        },
        signIn(state, action) {
            auth.signInWithEmailAndPassword(action.payload.email, action.payload.password);
        },
    },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;