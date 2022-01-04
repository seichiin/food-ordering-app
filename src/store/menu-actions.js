import { menuActions } from "./menu-slice";

export const fetchMenuData = () => async(dispatch) => {
    try {
        const menuData = await (async() => {
            const response = await fetch(`${process.env.REACT_APP_FIREBASE_DATABASE_URL}/menu.json`);
            if (!response.ok) throw new Error("Could not fetch menu data!");
            const data = await response.json();
            // console.log(data);
            return data;
        })();
        dispatch(menuActions.replaceMenu(menuData || []));
        // dispatch(
        //     menuActions.replaceMenu()
        // );
    } catch (error) {
        console.log(error.message);
    }
};

export const putMenuData = (menuData) => async(dispatch) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_FIREBASE_DATABASE_URL}/menu.json`, {
            method: "PUT",
            body: JSON.stringify(menuData),
            headers: { "Content-Type": "application/json" },
        });
        if (!response.ok) throw new Error("Sending menu data failed!");
    } catch (error) {
        console.log(error.message);
    }
};