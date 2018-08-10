import React from "react";

import css from "./Button.css";

const button = props => (
  <button
    className={[css.Button, css[props.type]].join(" ")}
    onClick={props.clicked}
  >
    {props.children}
  </button>
);

export default button;
