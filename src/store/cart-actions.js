import { cartActions } from "./cart-slice";

export const fetchCartData = () => async(dispatch) => {
    const getCart = async() => {
        const response = await fetch(`${process.env.REACT_APP_FIREBASE_DATABASE_URL}/cart.json`);
        if (!response.ok) throw new Error("Could not fetch cart data!");

        const data = await response.json();
        // console.log(data);
        return data;
    };

    try {
        const cartData = await getCart();
        dispatch(cartActions.replaceFetchedCart(cartData));
    } catch (error) {
        console.log(error.message);
    }
};

export const putCartData = (cartData) => async(dispatch) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_FIREBASE_DATABASE_URL}/cart.json`, {
            method: "PUT",
            body: JSON.stringify(cartData),
            headers: { "Content-Type": "application/json" },
        });
        if (!response.ok) throw new Error("Sending cart data failed!");
        // const data = await response.json();
        // console.log(data);
    } catch (error) {
        console.log(error.message);
    }
};

export const putCheckoutData = (userData, cartItems, totalAmount) => async(dispatch) => {
    try {
        await fetch(`${process.env.REACT_APP_FIREBASE_DATABASE_URL}/checkout.json`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                user: userData,
                orderedItems: cartItems,
                COD: totalAmount.toFixed(2),
            }),
        });
        dispatch(cartActions.clearCart());
    } catch (error) {
        alert(error.message);
    }
};