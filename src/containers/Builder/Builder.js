import React, { Component } from "react";
import { connect } from "react-redux";

import Burger from "../../components/Burger/Burger";
import Controls from "../../components/Burger/Controls/Controls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axiosOwn";
import Spinner from "../../components/UI/Spinner/Spinner";
import ErrorHandler from "../../hoc/ErrorHandler/ErrorHandler";
import * as actions from "../../store/actions/index";

class Builder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      purchasable: false,
      purchasing: false
    };
  }

  componentDidMount() {
    this.props.onInitIngredients();
  }

  updataPurchaseState = ingredients => {
    return (
      ingredients && 0 !== Object.values(ingredients).reduce((a, b) => a + b, 0)
    );
  };

  purchaseHandler = () => {
    if (this.props.isAuthed) this.setState({ purchasing: true });
    else {
      this.props.onSetAuthRedirectPath("/checkout");
      this.props.history.push("/auth");
    }
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    this.props.onInitPurchase();
    this.props.history.push("/checkout");
  };

  render() {
    let disabledCtrls = {
      meat: true,
      salad: true,
      bacon: true,
      cheese: true
    };
    let orderSummary = null;
    let burger = null;
    if (this.props.ings) {
      disabledCtrls = { ...this.props.ings };
      orderSummary = (
        <OrderSummary
          ingredients={this.props.ings}
          cancel={this.purchaseCancelHandler}
          continue={this.purchaseContinueHandler}
          price={this.props.price}
        />
      );
      burger = <Burger ingredients={this.props.ings} />;
      for (let key in disabledCtrls)
        disabledCtrls[key] = disabledCtrls[key] <= 0;
    } else {
      burger = this.props.error ? (
        <p>Can't load Ingredients! {this.props.error.message}</p>
      ) : (
        <Spinner />
      );
    }
    return (
      <React.Fragment>
        <Modal show={this.state.purchasing} cancel={this.purchaseCancelHandler}>
          {orderSummary}
        </Modal>
        {burger}
        <Controls
          addHandler={this.props.onIngredientAdded}
          removeHandler={this.props.onIngredientRemoved}
          disabled={disabledCtrls}
          price={this.props.price}
          isAuthed={this.props.isAuthed}
          purchasable={this.updataPurchaseState(this.props.ings)}
          orderClicked={this.purchaseHandler}
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  ings: state.builder.ingredients,
  price: state.builder.totalPrice,
  error: state.builder.error,
  isAuthed: state.auth.token !== null
});

const mapDispatchToProps = dispatch => ({
  onIngredientAdded: ingreName => dispatch(actions.addIngredient(ingreName)),
  onIngredientRemoved: ingreName =>
    dispatch(actions.removeIngredient(ingreName)),
  onInitIngredients: () => dispatch(actions.initIngredients()),
  onInitPurchase: () => dispatch(actions.purchaseInit()),
  onSetAuthRedirectPath: path => dispatch(actions.setAuthRedirectPath(path))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ErrorHandler(Builder, axios));
