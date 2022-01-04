import { useEffect, useState } from "react";
import { authActions } from "./../store/auth-slice";
import { useDispatch } from "react-redux";
import jwt_decode from "jwt-decode";
import { auth } from "./../others/firebase";
import { cartActions } from "../store/cart-slice";

const useToken = () => {
  const dispatch = useDispatch();
  const [token, setToken] = useState(localStorage.getItem("token"));

  const addToken = async (token) => {
    localStorage.setItem("token", token);
    dispatch(authActions.setIsLoggedIn(true));
    setToken(token);
  };
  const removeToken = () => {
    localStorage.removeItem("token");
    setToken("");
  };

  useEffect(() => {
    let timeoutId;

    dispatch(cartActions.clearCart());
    if (token) {
      const decodedToken = jwt_decode(token);
      const remainingTime = decodedToken.exp * 1000 - new Date().getTime();

      if (!remainingTime) {
        removeToken();
        dispatch(authActions.setIsLoggedIn(false));
      }

      dispatch(authActions.setIsLoggedIn(true));
      timeoutId = setTimeout(() => {
        removeToken();
        auth.signOut();
      }, remainingTime);
      return () => {
        clearTimeout(timeoutId);
      };
    } else dispatch(authActions.setIsLoggedIn(false));
  }, [dispatch, token]);

  return { token, addToken, removeToken };
};

export default useToken;
