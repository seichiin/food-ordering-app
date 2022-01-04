import React from "react";
import classes from "./Meals.module.css";
import MealItem from "./MealItem";
import { useSelector } from "react-redux";
import LoadingSpinner from "./../UI/LoadingSpinner";

const Meals = (props) => {
  const menuItems = useSelector((state) => state.menu.menu);

  return (
    <>
      <section className={classes.meals}>
        <ul>
          {!menuItems.length ? (
            <LoadingSpinner />
          ) : (
            menuItems.map((item) => (
              <MealItem
                key={item.id}
                id={item.id}
                image={item.image}
                name={item.name}
                description={item.description}
                price={item.price}
              />
            ))
          )}
        </ul>
      </section>
    </>
  );
};

export default Meals;
