import React from "react";

import css from "./NavItems.css";
import NavItem from "./NavItem/NavItem";

const navItems = props => (
  <ul className={css.NavItems}>
    <NavItem active={true} link={""}>
      Buger Builder
    </NavItem>
    <NavItem active={false} link={""}>
      Check Out
    </NavItem>
  </ul>
);

export default navItems;
