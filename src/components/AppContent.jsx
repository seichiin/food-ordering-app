import { useEffect } from "react";
import { auth } from "./../others/firebase";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { fetchUserData } from "../store/auth-actions";
import { authActions } from "../store/auth-slice";
import { fetchMenuData, putMenuData } from "../store/menu-actions";
import { fetchCartData, putCartData } from "../store/cart-actions";
import useToken from "../hooks/use-token";
import Header from "./layout/Header";
import Footer from "./layout/Footer";
import HeroBanner from "./layout/HeroBanner";
import Meals from "./Meals/Meals";
import { uiActions } from "../store/ui-slice";
import Cart from "./Cart/Cart";
import NewMeal from "./Meals/NewMeal";
import CheckoutList from "./Meals/CheckoutList";

const AppContent = () => {
  const { token, removeToken } = useToken();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const menu = useSelector((state) => state.menu.menu);
  const isShownCart = useSelector((state) => state.ui.isShownCart);
  const isAddingNewMealPopup = useSelector((state) => state.ui.isAddingNewMealPopup);
  const isShownCheckoutList = useSelector((state) => state.ui.isShownCheckoutList);
  const user = useSelector((state) => state.auth.currentUser);

  // Handler:
  const handleToggleCart = (bool) => () => {
    dispatch(uiActions.toggleCart(bool));
  };
  const handleToggleAddNewMeal = (bool) => () => {
    dispatch(uiActions.toggleAddNewMealPopup(bool));
  };
  const handleToggleCheckoutList = (bool) => () => {
    dispatch(uiActions.toggleCheckoutList(bool));
  };
  const handleSignOut = async () => {
    auth.signOut();
    removeToken();
  };
  //////////////////////////////////////////////////////////////////////////////////
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch(fetchUserData(user));
      } else {
        dispatch(authActions.updateCurrentUser(null));
      }
    });

    return () => {
      unsubscribe();
    };
  }, [dispatch, token]);
  //////////////////////////////////////////////////////////////////////////////////
  //Fetch menu data:
  useEffect(() => {
    dispatch(fetchMenuData());
  }, [dispatch]);
  useEffect(() => {
    if (menu.length > 0) {
      dispatch(putMenuData(menu));
    }
  }, [dispatch, menu]);

  // Fetch and send cart data:
  useEffect(() => {
    dispatch(fetchCartData());
  }, [dispatch]);
  useEffect(() => {
    const putDataIndex = setTimeout(() => {
      dispatch(putCartData(cart));
    }, 700);

    return () => {
      clearTimeout(putDataIndex);
    };
  }, [dispatch, cart]);
  return (
    <>
      {isShownCart && <Cart onHideCart={handleToggleCart} />}
      {isAddingNewMealPopup && user?.role.includes("admin") && (
        <NewMeal onToggleAddMeal={handleToggleAddNewMeal} />
      )}
      {isShownCheckoutList && <CheckoutList onClose={handleToggleCheckoutList} />}

      <Header
        onToggleCart={handleToggleCart}
        onSignOut={handleSignOut}
        onToggleAddMeal={handleToggleAddNewMeal}
        onToggleCheckoutList={handleToggleCheckoutList}
      />
      <main>
        <HeroBanner />
        <Meals />
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default AppContent;
