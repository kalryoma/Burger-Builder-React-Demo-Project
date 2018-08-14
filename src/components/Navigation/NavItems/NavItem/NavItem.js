import React from "react";
import { NavLink } from "react-router-dom";

import css from "./NavItem.css";

const navItem = props => (
  <li className={css.NavItem}>
    <NavLink exact to={props.link} activeClassName={css.active}>
      {props.children}
    </NavLink>
  </li>
);

export default navItem;
