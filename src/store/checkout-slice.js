import { createSlice } from "@reduxjs/toolkit";

const checkoutSlice = createSlice({
    name: "checkout",
    initialState: {
        checkoutList: [],
    },
    reducers: {
        replaceCheckoutList(state, action) {
            state.checkoutList = action.payload;
        },
    },
});

export const checkoutActions = checkoutSlice.actions;
export default checkoutSlice.reducer;