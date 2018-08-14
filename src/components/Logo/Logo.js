import React, { Component } from "react";
import { Link } from "react-router-dom";

import logoFile from "../../assets/images/burger-logo.png";
import css from "./Logo.css";

class Logo extends Component {
  render() {
    return <div className={css.Logo}>
        <Link to="/">
          <img src={logoFile} alt="My Burger" />
        </Link>
      </div>;
  }
}

export default Logo;
