import React from "react";

import css from "./SideDrawer.css";
import Logo from "../../Logo/Logo";
import NavItems from "../NavItems/NavItems";
import Backdrop from "../../UI/Backdrop/Backdrop";

const sideDrawer = props => {
  let sideClass = [css.SideDrawer];
  if (props.open) sideClass.push(css.Open);
  else sideClass.push(css.Close);

  return (
    <React.Fragment>
      <Backdrop show={props.open} clicked={props.toggleSideDrawer} />
      <div className={sideClass.join(" ")}>
        <div className={css.Logo}>
          <Logo />
        </div>
        <nav onClick={props.toggleSideDrawer}>
          <NavItems />
        </nav>
      </div>
    </React.Fragment>
  );
};

export default sideDrawer;
