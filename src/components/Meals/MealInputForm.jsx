import React, { useRef, useState } from "react";
import Input from "./Input";
import classes from "./MealInputForm.module.css";
import { useSelector } from "react-redux";

const MealInputForm = ({
  id,
  isAdjustingId,
  onAddOnCart,
  onConfirmAdjust,
  onRemoveDish,
  onSetAdjustingId,
}) => {
  const [amountIsValid, setAmountIsValid] = useState(true);
  const amountInputRef = useRef();
  const user = useSelector((state) => state.auth.currentUser);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  // console.log(213);

  const handleConfirmAdjust = () => {
    onConfirmAdjust();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const enteredAmount = amountInputRef.current.value;
    const quantityNumber = +enteredAmount;
    if (!isLoggedIn) {
      alert("Please log in to process !");
      return;
    }
    if (enteredAmount.length === 0 || quantityNumber < 1 || quantityNumber > 5) {
      setAmountIsValid(false);
      return;
    }
    onAddOnCart(quantityNumber);
  };

  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      <Input
        ref={amountInputRef}
        label={`Amount`}
        input={{
          id: "amount_" + id,
          type: "number",
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
        }}
      />
      {!amountIsValid && <p>Enter a valid amount!</p>}
      <div className={classes.actions}>
        <button>+ Add</button>
        {user?.role.includes("admin") &&
          // (true ? (
          (isAdjustingId ? (
            // <button type="button">
            <button type="button" onClick={handleConfirmAdjust}>
              Confirm
            </button>
          ) : (
            // <button type="button">
            <button type="button" onClick={onSetAdjustingId}>
              Adjust
            </button>
          ))}
        {user?.role.includes("admin") && (
          // <button type="button">
          <button type="button" onClick={onRemoveDish}>
            Remove
          </button>
        )}
      </div>
    </form>
  );
};

export default React.memo(MealInputForm);
