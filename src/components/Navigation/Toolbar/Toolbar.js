import React from "react";

import css from "./Toolbar.css";
import Logo from "../../Logo/Logo";
import NavItems from "../NavItems/NavItems";
import DrawerToggler from "../SideDrawer/DrawerToggler/DrawerToggler";

const toolbar = props => (
  <header className={css.Toolbar}>
    <DrawerToggler clicked={props.toggleSideDrawer} />
    <div className={css.Logo}>
      <Logo />
    </div>
    <nav className={css.DesktopOnly}>
      <NavItems />
    </nav>
  </header>
);

export default toolbar;
