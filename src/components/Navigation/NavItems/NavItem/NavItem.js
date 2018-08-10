import React from "react";

import css from "./NavItem.css";

const navItem = props => (
  <li className={css.NavItem}>
    <a href={props.link} className={props.active ? css.active : null}>
      {props.children}
    </a>
  </li>
);

export default navItem;
