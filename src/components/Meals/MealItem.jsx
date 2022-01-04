import React, { useRef, useState } from "react";
import classes from "./MealItem.module.css";
import MealInputForm from "./MealInputForm";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../../store/cart-slice";
import { menuActions } from "../../store/menu-slice";

const MealItem = ({ id, name, image, description, price }) => {
  const [isAdjustingId, setIsAdjustingId] = useState(null);
  const dispatch = useDispatch();
  const adjustNameRef = useRef();
  const adjustPriceRef = useRef();
  const adjustDescriptionRef = useRef();
  const adjustUrlRef = useRef();
  const menu = useSelector((state) => state.menu.menu);

  // console.log(123);
  const handleSetAdjustingId = (id) => {
    setIsAdjustingId(id);
  };
  const handleConfirmAdjust = () => {
    const itemIndex = menu.findIndex((item) => item.id === isAdjustingId);
    const currentItem = menu.find((item) => item.id === isAdjustingId);
    const newMenu = menu.slice();
    newMenu[itemIndex] = {
      id: currentItem.id,
      name: !adjustNameRef.current.value ? currentItem.name : adjustNameRef.current.value,
      price:
        !adjustPriceRef.current.value ||
        adjustPriceRef.current.value < 0 ||
        adjustPriceRef.current.value > 100
          ? currentItem.price
          : adjustPriceRef.current.value,
      description: !adjustDescriptionRef.current.value
        ? currentItem.description
        : adjustDescriptionRef.current.value,
      image: !adjustUrlRef.current.value ? currentItem.image : adjustUrlRef.current.value,
    };
    setIsAdjustingId(null);
    dispatch(menuActions.replaceMenu(newMenu));
  };
  const handleRemoveDish = (id) => {
    if (window.confirm("Are you sure 'bout dat ?") === false) return;
    dispatch(menuActions.removeDish(id));
  };
  const handleAddOnCart = (quantityNumber) => {
    dispatch(
      cartActions.addItem({
        id,
        name,
        image,
        price,
        quantity: quantityNumber,
      })
    );
  };

  return (
    <li className={classes.meal}>
      <div>
        {id === isAdjustingId ? (
          <input
            className={classes["adjust-input"]}
            type="text"
            placeholder="Adjust name here"
            ref={adjustNameRef}
          />
        ) : (
          <h3>{name}</h3>
        )}
        {id === isAdjustingId ? (
          <input
            className={classes["adjust-input"]}
            type="text"
            placeholder="Adjust description here"
            ref={adjustDescriptionRef}
          />
        ) : (
          <div className={classes.description}>{description}</div>
        )}
        {id === isAdjustingId ? (
          <input
            className={classes["adjust-input"]}
            type="number"
            min="0"
            placeholder="Adjust price here"
            ref={adjustPriceRef}
          />
        ) : (
          <div className={classes.price}>${price}</div>
        )}
        {id === isAdjustingId && (
          <input
            className={classes["adjust-input"]}
            type="text"
            placeholder="Adjust image URL here"
            ref={adjustUrlRef}
          />
        )}
        <MealInputForm
          id={id}
          isAdjustingId={isAdjustingId}
          onAddOnCart={handleAddOnCart}
          onConfirmAdjust={handleConfirmAdjust}
          onRemoveDish={handleRemoveDish.bind(null, id)}
          onSetAdjustingId={handleSetAdjustingId.bind(null, id)}
        />
      </div>
      <div>
        <img className={classes["meal-image"]} src={image} alt={`img-${name}`} />
      </div>
    </li>
  );
};

export default React.memo(MealItem);
