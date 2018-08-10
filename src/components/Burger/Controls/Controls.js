import React from "react";

import Control from "./Control/Control";

import css from "./Controls.css";

const list = [
  { label: "Meat", type: "meat" },
  { label: "Cheese", type: "cheese" },
  { label: "Salad", type: "salad" },
  { label: "Bacon", type: "bacon" }
];

const controls = props => {
  return (
    <div className={css.Controls}>
      <p>
        Current Price: <strong>{props.price.toFixed(2)}</strong>
      </p>
      {list.map(ctrl => (
        <Control
          key={ctrl.label}
          label={ctrl.label}
          add={() => {
            props.addHandler(ctrl.type);
          }}
          remove={() => {
            props.removeHandler(ctrl.type);
          }}
          disabled={props.disabled[ctrl.type]}
        />
      ))}
      <button className={css.OrderButton} disabled={!props.purchasable} onClick={props.orderClicked}>
        Order Now
      </button>
    </div>
  );
};

export default controls;
