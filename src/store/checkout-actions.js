import { cartActions } from "./cart-slice";
import { checkoutActions } from "./checkout-slice";

export const fetchCheckoutData = () => async(dispatch) => {
    try {
        const req = await fetch(`${process.env.REACT_APP_FIREBASE_DATABASE_URL}/checkout.json`);
        const res = await req.json();
        console.log(res);
        const adjustedRes = [];
        for (const [key, value] of Object.entries(res)) {
            const newObj = { id: key, ...value };
            adjustedRes.push(newObj);
        }
        dispatch(checkoutActions.replaceCheckoutList(adjustedRes));
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