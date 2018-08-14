import React from "react";

import css from "./Order.css";

const order = props => {
  const ingredients = Object.keys(props.ingredients).map(key => {
    return props.ingredients[key] > 0 ? (
      <span
        key={key}
        style={{
          textTransform: "capitalize",
          display: "inline-block",
          margin: "0 8px",
          padding: "5px",
          border: "1px solid #ccc"
        }}
      >
        {key}({props.ingredients[key]})
      </span>
    ) : null;
  });
  return (
    <div className={css.Order}>
      <p>Ingredients: {ingredients}</p>
      <p>
        Price: <strong>{Number(props.price).toFixed(2)}</strong>
      </p>
    </div>
  );
};

export default order;
