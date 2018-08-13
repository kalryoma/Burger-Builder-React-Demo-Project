import React, { Component } from "react";

import Burger from "../../components/Burger/Burger";
import Controls from "../../components/Burger/Controls/Controls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios";
import Spinner from "../../components/UI/Spinner/Spinner";
import ErrorHandler from "../../hoc/ErrorHandler/ErrorHandler";

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
      ingredients: null,
      totoalPrice: 4,
      purchasable: false,
      purchasing: false,
      loading: false,
      error: null
    };
  }

  componentDidMount() {
    axios.get("/ingredients.json")
      .then(res => {
        this.setState({ingredients: res.data, totoalPrice: this.calcPrice(res.data)});
      })
      .catch (err => {
        this.setState({error: err});
      });
  }

  calcPrice = ingredients => {
    let sum=4;
    for (let key in ingredients)
      sum += ingredients[key] * INGREDIENT_PRICES[key];
    return sum;
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
    this.setState({ loading: true });
    const order = {
      ingredients: this.state.ingredients,
      price: this.state.totoalPrice
    };
    axios.post("/order.json", order).then(
      res => {
        this.setState({ loading: false, purchasing: false });
      },
      err => {
        this.setState({ loading: false, purchasing: false });
      }
    );
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
    let disabledCtrls={
      meat: true,
      salad: true,
      bacon: true,
      cheese: true
    };
    let orderSummary=null;
    let burger=null;
    if (this.state.ingredients){
      disabledCtrls = { ...this.state.ingredients };
      orderSummary = (
        <OrderSummary
          ingredients={this.state.ingredients}
          cancel={this.purchaseCancelHandler}
          continue={this.purchaseContinueHandler}
          price={this.state.totoalPrice}
          />
        );
        burger = <Burger ingredients={this.state.ingredients} />
        if (this.state.loading) orderSummary = <Spinner />;
      for (let key in disabledCtrls) disabledCtrls[key] = disabledCtrls[key] <= 0;
    }
    else{
      burger = this.state.error ? <p>Can't load Ingredients! {this.state.error.message}</p> : <Spinner />;
    }
    return (
      <React.Fragment>
        <Modal show={this.state.purchasing} cancel={this.purchaseCancelHandler}>
          {orderSummary}
        </Modal>
        {burger}
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

export default ErrorHandler(Builder, axios);
