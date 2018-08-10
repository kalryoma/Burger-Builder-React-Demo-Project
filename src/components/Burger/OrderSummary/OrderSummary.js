import React from "react";

import Button from "../../UI/Button/Button";

const orderSummary = props => {
  const ingredientSummary = Object.keys(props.ingredients).map(key => (
    <li key={key}>
      <span style={{ textTransform: "capitalize" }}>{key}</span>:{" "}
      {props.ingredients[key]}
    </li>
  ));
  return (
    <React.Fragment>
      <h3>Your Order Summary</h3>
      <p>A delicious Burger with following Ingredients:</p>
      <ul>{ingredientSummary}</ul>
      <p><strong>Total Price: {props.price.toFixed(2)}</strong></p>
      <p>Continue to Checkout?</p>
      <Button type="Success" clicked={props.continue}>
        CONTINUE
      </Button>
      <Button type="Danger" clicked={props.cancel}>
        CANCEL
      </Button>
    </React.Fragment>
  );
};

export default orderSummary;
