import classes from "./Header.module.css";
import HamburgerButton from "./HamburgerButton";
import HamburgerMenu from "./HamburgerMenu";
import { Link } from "react-router-dom";

const Header = (props) => {
  return (
    <>
      <header className={classes.header}>
        <Link className={classes.link} to="/">
          <h2 className={classes.logo}>FastFoodz</h2>
        </Link>
        <nav className={classes["full-nav"]}>
          <HamburgerButton />
        </nav>
        {/* ------------------------------------------------- */}
        <HamburgerMenu
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
