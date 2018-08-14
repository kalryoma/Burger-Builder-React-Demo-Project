import React from "react";

import Burger from "../../Burger/Burger";
import Button from "../../UI/Button/Button";
import css from "./Summary.css";

const summary = props => {
  return (
    <div className={css.Summary}>
      <h1>We hope it tastes well!</h1>
      <div style={{ width: "100%", margin: "auto" }}>
        <Burger ingredients={props.ingredients} />
      </div>
      <Button type="Danger" clicked={props.canceled}>
        CANCEL
      </Button>
      <Button type="Success" clicked={props.continued}>
        CONTINUE
      </Button>
    </div>
  );
};

export default summary;
