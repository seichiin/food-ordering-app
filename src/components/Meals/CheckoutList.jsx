import { useEffect } from "react";
import Modal from "../UI/Modal";
import classes from "./CheckoutList.module.css";
import CheckoutItem from "./CheckoutItem";
import { useDispatch } from "react-redux";
import { fetchCheckoutData } from "../../store/checkout-actions";
import { useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";

const CheckoutList = ({ onClose: handleToggleCheckoutList }) => {
  const dispatch = useDispatch();
  const checkoutList = useSelector((state) => state.checkout.checkoutList);

  useEffect(() => {
    dispatch(fetchCheckoutData());
  }, [dispatch]);

  return (
    <Modal onClose={handleToggleCheckoutList}>
      {checkoutList.length === 0 ? (
        <h3 className={classes.text}>Empty</h3>
      ) : (
        <>
          <div className={classes["table-header"]}>
            <h3>Client Information</h3>
            <h3>Checkout List</h3>
          </div>
          <div className={classes["table-body"]}>
            {checkoutList.map((checkout) => (
              <CheckoutItem key={uuidv4()} checkout={checkout} />
            ))}
          </div>
        </>
      )}
    </Modal>
  );
};

export default CheckoutList;
