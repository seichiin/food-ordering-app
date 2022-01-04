import { createSlice } from "@reduxjs/toolkit";
// export const DUMMY_MENU = [{
//         id: "meal_2543",
//         name: "Fried Chicken",
//         image: "https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
//         description: " Crispy as hell :3 ",
//         price: "10",
//     },
//     {
//         id: "meal_3001",
//         name: "Burger",
//         image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=999&q=80",
//         description: "Gorgeous beef burger.",
//         price: "14.99",
//     },
//     {
//         id: "meal_2342",
//         name: "Ramen",
//         image: "https://images.unsplash.com/photo-1557872943-16a5ac26437e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1131&q=80",
//         description: "A Japanese noodle soup.",
//         price: "10",
//     },
//     {
//         id: "meal_3489",
//         name: "Pho",
//         image: "https://images.unsplash.com/photo-1576577445504-6af96477db52?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
//         description: "Amazing Vietnamese noodle soup!",
//         price: "20",
//     },
// ];

const menuSlice = createSlice({
    name: "menu",
    initialState: {
        menu: [],
    },
    reducers: {
        replaceMenu(state, action) {
            state.menu = action.payload;
        },
        removeDish(state, action) {
            state.menu = state.menu.filter((item) => item.id !== action.payload);
        },
        addDish(state, action) {
            state.menu = state.menu.concat(action.payload);
        },
    },
});

export const menuActions = menuSlice.actions;
export default menuSlice.reducer;