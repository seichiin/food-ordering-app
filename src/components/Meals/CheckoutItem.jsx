import React from "react";
import classes from "./CheckoutItem.module.css";

const CheckoutItem = ({ checkout, onDeleteCheckout: handleDeleteCheckout }) => {
  return (
    <div className={classes.row}>
      <div className={classes.column}>
        <span>Name: {checkout.user.name}</span>
        <span>COD: {checkout.COD}$</span>
        <span>Phone Number: {checkout.user.phoneNumber}</span>
        <span>Address: {checkout.user.address}</span>
      </div>
      <div className={classes.column}>
        <span>Ordered Items:</span>
        <div className={classes.items}>
          {checkout.orderedItems.map((item) => (
            <div className={classes.item} key={item.id}>
              <span>Name: {item.name}</span>
              <span>Price: {item.price}$</span>
              <span>Quantity: {item.quantity}</span>
              <br />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CheckoutItem;
