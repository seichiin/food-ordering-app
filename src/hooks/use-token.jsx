import { useCallback, useEffect } from "react";
import { authActions } from "./../store/auth-slice";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "./../others/firebase";
import { cartActions } from "../store/cart-slice";
import jwt_decode from "jwt-decode";

const useToken = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const signOut = useCallback(() => {
    dispatch(authActions.signOut());
    auth.signOut();
  }, [dispatch]);

  useEffect(() => {
    let timeoutId;
    dispatch(cartActions.clearCart());

    if (token) {
      const decodedToken = jwt_decode(token);
      const remainingTime = decodedToken.exp * 1000 - new Date().getTime();
      if (!remainingTime) signOut();

      dispatch(authActions.setIsLoggedIn(true));

      timeoutId = setTimeout(() => {
        signOut();
      }, remainingTime);
      return () => {
        clearTimeout(timeoutId);
      };
    } else dispatch(authActions.setIsLoggedIn(false));
  }, [dispatch, token, signOut]);

  return { token, signOut };
};

export default useToken;
