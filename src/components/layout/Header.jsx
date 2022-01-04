import React, { useState } from "react";
import classes from "./Header.module.css";
import HamburgerButton from "./HamburgerButton";
import HamburgerMenu from "./HamburgerMenu";
import { Link } from "react-router-dom";

const Header = (props) => {
  const [isToggleHamburger, setIsToggleHamburger] = useState(false);

  const handleToggleHamburger = (closeHamburgerMenu) => {
    setIsToggleHamburger((state) => !state);
  };

  return (
    <>
      <header className={classes.header}>
        <Link className={classes.link} to="/">
          <h2 className={classes.logo}>Fast Food</h2>
        </Link>
        <nav className={classes["full-nav"]}>
          <HamburgerButton isToggle={isToggleHamburger} onToggleHamburger={handleToggleHamburger} />
        </nav>
        {/* ------------------------------------------------- */}
        <HamburgerMenu
          isToggleHamburger={isToggleHamburger}
          onToggleCart={props.onToggleCart}
          onSignOut={props.onSignOut}
          onToggleAddMeal={props.onToggleAddMeal}
          onToggleCheckoutList={props.onToggleCheckoutList}
        />
      </header>
    </>
  );
};

export default Header;
