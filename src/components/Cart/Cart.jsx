import React, { useState } from "react";
import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import classes from "./Cart.module.css";

import { useSelector, useDispatch } from "react-redux";
import { cartActions } from "../../store/cart-slice";
import Checkout from "./Checkout";
import { putCheckoutData } from "../../store/cart-actions";

const Cart = (props) => {
  const [isCheckout, setIsCheckout] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loginWarn, setLoginWarn] = useState("");

  const allCartItems = useSelector((state) => state.cart.items);
  const storedTotalAmount = useSelector((state) => state.cart.totalAmount);
  const storedTotalQuantity = useSelector((state) => state.cart.totalQuantity);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();

  const totalAmount = `$${storedTotalAmount.toFixed(2)}`;
  const hasItem = allCartItems.length > 0;

  const handleCartItemAdd = (cartItem) => {
    dispatch(cartActions.addItem({ ...cartItem, quantity: 1 }));
  };
  const handleCartItemRemove = (cartItemId) => {
    dispatch(cartActions.removeItem(cartItemId));
  };
  const handleOrder = () => {
    if (!isLoggedIn) {
      setLoginWarn("Please login to perform checkout!");
      return;
    }

    setLoginWarn("");
    setIsCheckout(true);
  };

  const handleSubmittedOrder = (userData) => {
    setIsSubmitting(true);
    dispatch(putCheckoutData(userData, allCartItems, storedTotalAmount));
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {allCartItems.map((cartItem) => {
        return (
          <CartItem
            key={cartItem.id}
            id={cartItem.id}
            name={cartItem.name}
            image={cartItem.image}
            price={cartItem.price}
            quantity={cartItem.quantity}
            onAdd={handleCartItemAdd.bind(null, cartItem)}
            onRemove={handleCartItemRemove.bind(null, cartItem.id)}
          />
        );
      })}
    </ul>
  );

  const cartModalContent = (
    <>
      {hasItem ? (
        cartItems
      ) : (
        <h2 style={{ textAlign: "center", padding: "1rem 0" }}>No item in cart</h2>
      )}
      {loginWarn && <p className={classes["login-warn"]}>{loginWarn}</p>}
      <div className={classes.total}>
        <span>Total Amount/Quantity: </span>
        <span>
          {totalAmount} ({storedTotalQuantity})
        </span>
      </div>
      <div className={classes.actions}>
        {!isCheckout && (
          <button onClick={props.onHideCart(false)} className={classes["button--alt"]}>
            Close
          </button>
        )}
        {hasItem && !isCheckout && (
          <button onClick={handleOrder} className={classes.button}>
            Order
          </button>
        )}
      </div>
      {isCheckout && <Checkout onConfirm={handleSubmittedOrder} onCancel={props.onHideCart} />}
    </>
  );

  return (
    <Modal onClose={props.onHideCart}>
      {!isSubmitting &&
        !isSubmitted &&
        (isLoggedIn ? cartModalContent : <h2 className={classes.warn}>You haven't login yet!</h2>)}
      {isSubmitting && !isSubmitted && isLoggedIn && <h2 className={classes.warn}>Sending...</h2>}
      {!isSubmitting && isSubmitted && isLoggedIn && (
        <h2 className={classes.warn}>Successfully sent the order!</h2>
      )}
    </Modal>
  );
};

export default Cart;
