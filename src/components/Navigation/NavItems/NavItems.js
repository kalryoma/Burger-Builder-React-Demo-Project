import React from "react";

import css from "./NavItems.css";
import NavItem from "./NavItem/NavItem";

const navItems = props => (
  <ul className={css.NavItems}>
    <NavItem link={"/"}>Buger Builder</NavItem>
    <NavItem link={"/orders"}>Check Out</NavItem>
    <NavItem link={"/auth"}>Authenticate</NavItem>
  </ul>
);

export default navItems;
