import { checkoutActions } from "./checkout-slice";

export const fetchCheckoutData = () => async(dispatch) => {
    try {
        const req = await fetch(`${process.env.REACT_APP_FIREBASE_DATABASE_URL}/checkout.json`);
        const res = await req.json();
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