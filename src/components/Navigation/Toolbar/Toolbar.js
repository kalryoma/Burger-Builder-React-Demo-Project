import React from "react";

import css from "./Toolbar.css";
import Logo from "../../Logo/Logo";
import NavItems from "../NavItems/NavItems";

const toolbar = props => (
  <header className={css.Toolbar}>
    <div>MENU</div>
    <div className={css.Logo}>
      <Logo />
    </div>
    <nav className={css.DesktopOnly}>
      <NavItems />
    </nav>
  </header>
);

export default toolbar;
