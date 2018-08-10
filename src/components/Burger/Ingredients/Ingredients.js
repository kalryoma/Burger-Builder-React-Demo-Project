import React, { Component } from "react";
import PropTypes from "prop-types";

import css from "./Ingredients.css";

class Ingredients extends Component {
  render() {
    let ingredients = null;
    switch (this.props.type) {
      case "bread-bottom":
        ingredients = <div className={css.BreadBottom} />;
        break;
      case "bread-top":
        ingredients = (
          <div className={css.BreadTop}>
            <div className={css.Seeds1} />
            <div className={css.Seeds2} />
          </div>
        );
        break;
      case "meat":
        ingredients = <div className={css.Meat} />;
        break;
      case "cheese":
        ingredients = <div className={css.Cheese} />;
        break;
      case "salad":
        ingredients = <div className={css.Salad} />;
        break;
      case "bacon":
        ingredients = <div className={css.Bacon} />;
        break;
      default:
        ingredients = null;
        break;
    }

    return ingredients;
  }
}

Ingredients.propTypes = {
  type: PropTypes.oneOf([
    "bread-top",
    "bread-bottom",
    "meat",
    "cheese",
    "salad",
    "bacon"
  ])
};

export default Ingredients;
