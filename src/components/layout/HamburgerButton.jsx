import React from "react";
import classes from "./HamburgerButton.module.css";

const HamburgerButton = ({ isToggle, onToggleHamburger }) => {
  // console.log(123);
  const handleToggle = () => {
    onToggleHamburger();
  };

  return (
    <div
      className={`${classes["hamburger-button"]} ${isToggle && classes.open}`}
      onClick={handleToggle}
    >
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
  );
};

export default React.memo(HamburgerButton);
