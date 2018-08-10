import React, { Component } from "react";

import css from "./Burger.css";
import Ingredients from "./Ingredients/Ingredients";

class Burger extends Component {
  render() {
    // let ingredients = [];
    // for (const key in this.props.ingredients)
    //     for (let num=0; num<this.props.ingredients[key]; num++)
    //         ingredients.push(<Ingredients type={key} key={key+num}/>)
    let ingredients = Object.keys(this.props.ingredients)
      .map(igKey =>
        [...Array(this.props.ingredients[igKey])].map((_, index) => (
          <Ingredients type={igKey} key={igKey + index} />
        ))
      )
      .reduce((a, b) => a.concat(b), []);
    if (ingredients.length === 0)
      ingredients = <p>Please start adding ingredients!</p>

    return (
      <div className={css.Burger}>
        <Ingredients type="bread-top" />
        {ingredients}
        <Ingredients type="bread-bottom" />
      </div>
    );
  }
}

export default Burger;
