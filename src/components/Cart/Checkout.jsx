import classes from "./Checkout.module.css";
import useInput from "../../hooks/use-input";

const Checkout = (props) => {
  const {
    value: nameValue,
    isValid: nameIsValid,
    hasError: nameHasError,
    handleChangedValue: handleChangedValueName,
    handleBlurInput: handleBlurInputName,
    resetFunc: nameResetFunc,
  } = useInput((name) => name.trim().length > 0);
  const {
    value: phoneValue,
    isValid: phoneIsValid,
    hasError: phoneHasError,
    handleChangedValue: handleChangedValuePhone,
    handleBlurInput: handleBlurInputPhone,
    resetFunc: phoneResetFunc,
  } = useInput((phone) => phone.trim().length === 10 && !isNaN(phone));
  const {
    value: addressValue,
    isValid: addressIsValid,
    hasError: addressHasError,
    handleChangedValue: handleChangedValueAddress,
    handleBlurInput: handleBlurInputAddress,
    resetFunc: addressResetFunc,
  } = useInput((address) => address.trim().length > 0);

  let formIsValid = false;
  if (nameIsValid && phoneIsValid && addressIsValid) formIsValid = true;

  const confirmHandler = (event) => {
    event.preventDefault();

    if (!formIsValid) return;

    nameResetFunc();
    phoneResetFunc();
    addressResetFunc();

    props.onConfirm({
      name: nameValue,
      phoneNumber: phoneValue,
      address: addressValue,
    });
  };

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={classes.controlGroup}>
        <div className={`${classes.control} ${nameHasError && classes.invalid}`}>
          <label htmlFor="name">Receiver Name:</label>
          <input
            onChange={handleChangedValueName}
            onBlur={handleBlurInputName}
            value={nameValue}
            type="text"
            id="name"
          />
        </div>
        {nameHasError && <p className={classes.error}>Please enter a valid name!</p>}
      </div>

      {/*  */}

      <div className={classes.controlGroup}>
        <div className={`${classes.control} ${phoneHasError && classes.invalid}`}>
          <label htmlFor="phone">Phone Number:</label>
          <input
            onChange={handleChangedValuePhone}
            onBlur={handleBlurInputPhone}
            value={phoneValue}
            type="text"
            id="phone"
          />
        </div>
        {phoneHasError && <p className={classes.error}>Please enter a valid number!</p>}
      </div>

      {/*  */}

      <div className={classes.controlGroup}>
        <div className={`${classes.control} ${addressHasError && classes.invalid}`}>
          <label htmlFor="postal">Address:</label>
          <input
            onChange={handleChangedValueAddress}
            onBlur={handleBlurInputAddress}
            value={addressValue}
            type="text"
            id="postal"
          />
        </div>
        {addressHasError && <p className={classes.error}>Please enter a valid address!</p>}
      </div>

      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel(false)}>
          Cancel
        </button>
        <button className={classes.submit} disabled={!formIsValid}>
          Confirm
        </button>
      </div>
    </form>
  );
};

export default Checkout;
