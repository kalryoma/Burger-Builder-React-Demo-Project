import React from 'react';

import logoFile from "../../assets/images/burger-logo.png";
import css from "./Logo.css";

const logo = props => (
  <div className={css.Logo}>
    <img src={logoFile} alt="My Burger"/>
  </div>
);

export default logo;