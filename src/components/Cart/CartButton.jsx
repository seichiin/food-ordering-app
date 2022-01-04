import React from "react";
import classes from "./CartButton.module.css";
import CartIcon from "./CartIcon";
import { useSelector } from "react-redux";

const CartButton = (props) => {
  const itemsInCart = useSelector((state) => state.cart.items);

  return (
    <button className={classes.button} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span className={classes.text}>Cart</span>
      <span className={classes.badge}>{itemsInCart.length}</span>
    </button>
  );
};

export default CartButton;
