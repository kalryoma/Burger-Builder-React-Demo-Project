import React from "react";

import Toolbar from "../Navigation/Toolbar/Toolbar";
import SideDrawer from "../Navigation/SideDrawer/SideDrawer";

import css from "./Layout.css";

const layout = props => (
  <React.Fragment>
    <Toolbar />
    <SideDrawer />
    <main className={css.Content}>{props.children}</main>
  </React.Fragment>
);

export default layout;
