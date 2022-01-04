import classes from "./CartItem.module.css";

const CartItem = (props) => {
  const price = `$${Number(props.price).toFixed(2)}`;

  return (
    <li className={classes["cart-item"]}>
      <div className={classes.info}>
        <div className={classes["info--text"]}>
          <h2>{props.name}</h2>
          <div className={classes.summary}>
            <span className={classes.price}>{price}</span>
            <span className={classes.amount}>x {props.quantity}</span>
          </div>
        </div>
        <img
          className={classes["info--image"]}
          src={props.image}
          alt={`img-${props.image}`}
        />
      </div>
      <div className={classes.actions}>
        <button onClick={props.onRemove}>−</button>
        <button onClick={props.onAdd}>+</button>
      </div>
    </li>
  );
};

export default CartItem;
