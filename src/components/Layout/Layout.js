import React from "react";

import Toolbar from "../Navigation/Toolbar/Toolbar";

import css from "./Layout.css";

const layout = props => (
  <React.Fragment>
    <Toolbar />
    <main className={css.Content}>{props.children}</main>
  </React.Fragment>
);

export default layout;
