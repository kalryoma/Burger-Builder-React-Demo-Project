import React, { Component } from "react";
import { Route } from "react-router-dom";

import Summary from "../../components/Order/Summary/Summary";
import ContactData from "./ContactData/ContactData";

class CheckOut extends Component {
  constructor(props) {
    super(props);
    const query = new URLSearchParams(this.props.location.search);
    const ingredients = {};
    let price = 0;
    for (let param of query.entries()) {
      if (param[0] === "price") price = param[1];
      else ingredients[param[0]] = +param[1];
    }
    this.state = {
      ingredients: ingredients,
      price: price
    };
  }

  componentDidMount() {}

  cancelHandler = () => {
    this.props.history.goBack();
  };

  continueHandler = () => {
    this.props.history.replace("/checkout/contact-data");
  };

  render() {
    return (
      <div>
        <Summary
          ingredients={this.state.ingredients}
          canceled={this.cancelHandler}
          continued={this.continueHandler}
        />
        <Route
          path={this.props.match.path + "/contact-data"}
          render={props => (
            <ContactData
              ingredients={this.state.ingredients}
              price={this.state.price}
              {...props}
            />
          )}
        />
      </div>
    );
  }
}

export default CheckOut;
