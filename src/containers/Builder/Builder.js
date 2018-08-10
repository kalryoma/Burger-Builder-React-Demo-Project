import React, { Component } from "react";

import Burger from "../../components/Burger/Burger";
import Controls from "../../components/Burger/Controls/Controls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";

const INGREDIENT_PRICES = {
  meat: 1.3,
  cheese: 0.4,
  salad: 0.5,
  bacon: 0.7
};

class Builder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ingredients: {
        meat: 0,
        cheese: 0,
        salad: 0,
        bacon: 0
      },
      totoalPrice: 4,
      purchasable: false,
      purchasing: false
    };
  }

  updataPurchaseState = ingredients => {
    return 0 !== Object.values(ingredients).reduce((a, b) => a + b, 0);
  };

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    alert("continue");
  };

  addIngredient = type => {
    const newState = { ...this.state };
    newState.ingredients[type] += 1;
    newState.totoalPrice += INGREDIENT_PRICES[type];
    newState.purchasable = this.updataPurchaseState(newState.ingredients);
    this.setState(newState);
  };

  removeIngredient = type => {
    const newState = { ...this.state };
    if (newState.ingredients[type] - 1 < 0) return;
    newState.ingredients[type] -= 1;
    newState.totoalPrice -= INGREDIENT_PRICES[type];
    newState.purchasable = this.updataPurchaseState(newState.ingredients);
    this.setState(newState);
  };

  render() {
    const disabledCtrls = { ...this.state.ingredients };
    for (let key in disabledCtrls) disabledCtrls[key] = disabledCtrls[key] <= 0;
    return (
      <React.Fragment>
        <Modal show={this.state.purchasing} cancel={this.purchaseCancelHandler}>
          <OrderSummary
            ingredients={this.state.ingredients}
            cancel={this.purchaseCancelHandler}
            continue={this.purchaseContinueHandler}
            price={this.state.totoalPrice}
          />
        </Modal>
        <Burger ingredients={this.state.ingredients} />
        <Controls
          addHandler={this.addIngredient}
          removeHandler={this.removeIngredient}
          disabled={disabledCtrls}
          price={this.state.totoalPrice}
          purchasable={this.state.purchasable}
          orderClicked={this.purchaseHandler}
        />
      </React.Fragment>
    );
  }
}

export default Builder;