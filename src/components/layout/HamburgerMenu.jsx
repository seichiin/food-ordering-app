import React from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import CartButton from "./../Cart/CartButton";
import classes from "./HamburgerMenu.module.css";
import { useDispatch } from "react-redux";
import { uiActions } from "../../store/ui-slice";

const HamburgerMenu = ({
  onSignOut: handleSignOut,
  onToggleCart: handleToggleCart,
  isToggleHamburger,
  onToggleAddMeal: handleToggleAddNewMeal,
  onToggleCheckoutList: handleToggleCheckoutList,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const currentUser = useSelector((state) => state.auth.currentUser);
  const handleChangePassword = () => {
    dispatch(uiActions.disableAllState());
    navigate("/change-password");
  };

  return (
    <ul
      className={`${classes["hamburger-nav"]} ${
        isToggleHamburger ? classes["hamburger-nav__open"] : classes["hamburger-nav__close"]
      }`}
    >
      {isLoggedIn && currentUser && (
        <li>
          <p>Hello, {currentUser.displayName}</p>
        </li>
      )}
      <li>
        {isLoggedIn ? (
          <Link onClick={handleSignOut} className={classes.link} to="/">
            Sign out
          </Link>
        ) : (
          <Link className={classes.link} to="/signin">
            Sign in
          </Link>
        )}
      </li>
      {isLoggedIn && currentUser?.role.includes("user") && (
        <li>
          <span className={classes.link} onClick={handleChangePassword}>
            Change Password
          </span>
        </li>
      )}
      {isLoggedIn && currentUser?.role.includes("admin") && (
        <li>
          <span className={classes.link} onClick={handleToggleAddNewMeal(true)}>
            New meal
          </span>
        </li>
      )}
      {isLoggedIn && currentUser?.role.includes("admin") && (
        <li>
          <span className={classes.link} onClick={handleToggleCheckoutList(true)}>
            Checkout List
          </span>
        </li>
      )}
      <li>
        <CartButton onClick={handleToggleCart(true)} />
      </li>
    </ul>
  );
};

export default HamburgerMenu;
