import { useRef, useState } from "react";
import Modal from "../UI/Modal";
import classes from "./NewMeal.module.css";
import { useDispatch } from "react-redux";
import { menuActions } from "../../store/menu-slice";

const NewMeal = ({ onToggleAddMeal: handleToggleAddMeal }) => {
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const nameRef = useRef();
  const urlRef = useRef();
  const priceRef = useRef();
  const descriptionRef = useRef();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (
      !nameRef.current.value ||
      !urlRef.current.value ||
      !priceRef.current.value ||
      !descriptionRef.current.value
    ) {
      setError("Please enter valid values!");
      return;
    }
    if (+priceRef.current.value < 0 || +priceRef.current.value > 100) {
      setError("Price must be in the range of 0 and 100.");
      return;
    }

    let generateId = Math.floor(Math.random() * 10000 + 1);
    try {
      dispatch(
        menuActions.addDish({
          id: `meal_` + generateId,
          name: nameRef.current.value,
          description: descriptionRef.current.value,
          price: priceRef.current.value,
          image: urlRef.current.value,
        })
      );
    } catch (error) {
      setError("Can't add new dish: " + error.message);
    }
    handleToggleAddMeal(false);
  };

  return (
    <Modal onClose={handleToggleAddMeal}>
      <h2 className={classes.title}>Adding new dish</h2>
      <form className={classes["form-group"]} onSubmit={handleSubmit}>
        <div className={classes["control-group"]}>
          <label htmlFor="name">Name</label>
          <input type="text" id="name" ref={nameRef} />
        </div>
        <div className={classes["control-group"]}>
          <label htmlFor="imageURL">Image URL</label>
          <input type="text" id="imageURL" ref={urlRef} />
        </div>
        <div className={classes["control-group"]}>
          <label htmlFor="price">Price</label>
          <input className={classes.price} type="text" id="price" ref={priceRef} />
        </div>
        <div className={classes["control-group"]}>
          <label htmlFor="description">Description</label>
          <input type="text" id="description" ref={descriptionRef} />
        </div>

        {error && <p className={classes.error}>{error}</p>}

        <div className={classes.actions}>
          <button>Add</button>
          <button type="button" onClick={handleToggleAddMeal(false)}>
            Cancel
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default NewMeal;
