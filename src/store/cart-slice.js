import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        items: [],
        totalAmount: 0,
        totalQuantity: 0,
    },
    reducers: {
        addItem(state, action) {
            const existedItemIndex = state.items.findIndex(
                (item) => item.id === action.payload.id
            );
            const existedItem = state.items[existedItemIndex];

            if (existedItem) {
                const updatedItem = {
                    ...existedItem,
                    quantity: existedItem.quantity + action.payload.quantity,
                };

                state.items[existedItemIndex] = updatedItem;
            } else {
                state.items.push(action.payload);
            }

            state.totalAmount += action.payload.price * action.payload.quantity;
            state.totalQuantity++;
        },
        removeItem(state, action) {
            const removedItemIndex = state.items.findIndex(
                (item) => item.id === action.payload
            );
            const removedItem = state.items[removedItemIndex];

            if (removedItem.quantity <= 1) {
                state.items.splice(removedItemIndex, 1);
            } else {
                state.items[removedItemIndex].quantity--;
            }

            state.totalAmount -= removedItem.price;
            state.totalQuantity--;
        },
        replaceFetchedCart(state, action) {
            state.items = action.payload.items || [];
            state.totalAmount = action.payload.totalAmount || 0;
            state.totalQuantity = action.payload.totalQuantity || 0;
        },
        clearCart(state) {
            state.items = [];
            state.totalAmount = 0;
            state.totalQuantity = 0;
        },
    },
});

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;