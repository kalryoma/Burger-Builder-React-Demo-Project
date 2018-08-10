import React from "react";

import css from "./DrawerToggler.css";

const drawerToggler = props => (
  <div className={css.DrawerToggle} onClick={props.clicked}>
    <div />
    <div />
    <div />
  </div>
);

export default drawerToggler;
