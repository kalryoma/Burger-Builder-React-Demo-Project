import React, { Component } from "react";

import Summary from "../../components/Order/Summary/Summary";

class CheckOut extends Component {
  constructor(props) {
    super(props);
    const query = new URLSearchParams(this.props.location.search);
    const ingredients = {};
    for (let param of query.entries())
      ingredients[param[0]] = +param[1];
    this.state = {
      ingredients: ingredients
    };
  }

  componentDidMount(){
    
  }

  cancelHandler = () => {
    this.props.history.goBack();
  };

  continueHandler = () => {
    this.props.history.replace("/checkout/data");
  };

  render() {
    return (
      <div>
        <Summary
          ingredients={this.state.ingredients}
          canceled={this.cancelHandler}
          continued={this.continueHandler}
        />
      </div>
    );
  }
}

export default CheckOut;
