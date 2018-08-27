import React from "react";

import css from "./NavItems.css";
import NavItem from "./NavItem/NavItem";
import AuthContext from "../../Context/Auth";

const navItems = props => (
  <ul className={css.NavItems}>
    <NavItem link={"/"}>Buger Builder</NavItem>
    <AuthContext.Consumer>
      {isAuthed =>
        isAuthed ? (
          <React.Fragment>
            <NavItem link={"/orders"}>Check Out</NavItem>
            <NavItem link={"/logout"}>Logout</NavItem>
          </React.Fragment>
        ) : (
          <NavItem link={"/auth"}>Login</NavItem>
        )
      }
    </AuthContext.Consumer>
  </ul>
);

export default navItems;
