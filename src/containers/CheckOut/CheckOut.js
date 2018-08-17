import React, { Component } from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";

import Summary from "../../components/Order/Summary/Summary";
import ContactData from "./ContactData/ContactData";

class CheckOut extends Component {
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
          ingredients={this.props.ingredients}
          canceled={this.cancelHandler}
          continued={this.continueHandler}
        />
        <Route
          path={this.props.match.path + "/contact-data"}
          component={ContactData}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ingredients: state.ingredients,
    price: state.totalPrice
  };
};

export default connect(mapStateToProps)(CheckOut);
