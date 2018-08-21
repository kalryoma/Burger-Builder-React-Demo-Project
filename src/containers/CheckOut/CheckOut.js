import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
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
    return this.props.ingredients ? (
      <div>
        {this.props.purchased? <Redirect to="/orders" /> : null}
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
    ) : (
      <Redirect to="/" />
    );
  }
}

const mapStateToProps = state => ({
  ingredients: state.builder.ingredients,
  price: state.builder.totalPrice,
  purchased: state.order.purchased
});

export default connect(mapStateToProps)(CheckOut);
