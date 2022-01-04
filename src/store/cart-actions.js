import { cartActions } from "./cart-slice";

export const fetchCartData = (uid) => async(dispatch) => {
    const getCart = async(uid) => {
        const response = await fetch(`${process.env.REACT_APP_FIREBASE_DATABASE_URL}/cart/${uid}.json`);
        if (!response.ok) throw new Error("Could not fetch cart data!");

        const data = await response.json();
        return data;
    };

    try {
        const cartData = await getCart(uid);
        dispatch(cartActions.replaceFetchedCart(cartData));
    } catch (error) {
        console.log(error);
    }
};

export const putCartData = (cartData, uid) => async(dispatch) => {
    try {
        const response = await fetch(
            `${process.env.REACT_APP_FIREBASE_DATABASE_URL}/cart/${uid}.json`, {
                method: "PUT",
                body: JSON.stringify(cartData),
                headers: { "Content-Type": "application/json" },
            }
        );
        if (!response.ok) throw new Error("Sending cart data failed!");
        // const data = await response.json();
        // console.log(data);
    } catch (error) {
        console.log(error.message);
    }
};