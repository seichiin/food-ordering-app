import { configureStore } from "@reduxjs/toolkit";
import cartSliceReducer from "./cart-slice";
import menuSliceReducer from "./menu-slice";
import uiSliceReducer from "./ui-slice";
import authSliceReducer from "./auth-slice";
import checkoutSliceReducer from "./checkout-slice";
import thunk from "redux-thunk";

const store = configureStore({
    reducer: {
        ui: uiSliceReducer,
        auth: authSliceReducer,
        cart: cartSliceReducer,
        menu: menuSliceReducer,
        checkout: checkoutSliceReducer,
    },
    middleware: [thunk],
});

export default store;