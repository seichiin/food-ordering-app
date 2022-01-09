import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "../../store/ui-slice";
import classes from "./HamburgerButton.module.css";

const HamburgerButton = () => {
  const dispatch = useDispatch();
  const isShownHamburgerMenu = useSelector((state) => state.ui.isShownHamburgerMenu);
  const handleToggleHamburgerMenu = () => {
    dispatch(uiActions.toggleHamburgerMenu());
  };

  return (
    <div
      className={`${classes["hamburger-button"]} ${isShownHamburgerMenu && classes.open}`}
      onClick={handleToggleHamburgerMenu}
    >
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
  );
};

export default React.memo(HamburgerButton);
