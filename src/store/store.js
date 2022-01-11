import { configureStore, combineReducers } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

import cartSliceReducer from "./cart-slice";
import menuSliceReducer from "./menu-slice";
import uiSliceReducer from "./ui-slice";
import authSliceReducer from "./auth-slice";
import checkoutSliceReducer from "./checkout-slice";

// const persistConfig = {
//     key: "root",
//     storage,
//     whitelist: ["auth"],
// };

const reducer = combineReducers({
    ui: uiSliceReducer,
    auth: persistReducer({ key: "auth", storage: storage, whitelist: ["token"] }, authSliceReducer),
    cart: cartSliceReducer,
    menu: menuSliceReducer,
    checkout: checkoutSliceReducer,
});
// const persistedReducer = persistReducer(persistConfig, reducer);

const store = configureStore({
    reducer: reducer,
    middleware: [thunk],
});

export const persistor = persistStore(store);
export default store;