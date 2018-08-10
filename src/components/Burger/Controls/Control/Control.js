import React from "react";

import css from "./Control.css";

const control = props => {
  return (
    <div className={css.Control}>
      <div className={css.Label}>{props.label}</div>
      <button className={css.More} onClick={props.add}>+</button>
      <button className={css.Less} onClick={props.remove} disabled={props.disabled}>-</button>
    </div>
  );
};

export default control;
