import React from "react";

import css from "./SideDrawer.css";
import Logo from "../../Logo/Logo";
import NavItems from "../NavItems/NavItems";

const sideDrawer = props => {
  return (
    <div className={css.SideDrawer}>
      <div className={css.Logo}>
        <Logo />
      </div>
      <nav>
        <NavItems />
      </nav>
    </div>
  );
};

export default sideDrawer;
