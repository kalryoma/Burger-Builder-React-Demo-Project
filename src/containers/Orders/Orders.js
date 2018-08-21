import React, { Component } from "react";
import { connect } from "react-redux";

import Order from "../../components/Order/Order";
import ErrorHandler from "../../hoc/ErrorHandler/ErrorHandler";
import axios from "../../axiosOwn";
import * as actions from "../../store/actions/index";
import Spinner from "../../components/UI/Spinner/Spinner";

class Orders extends Component {
  componentDidMount(){
    this.props.onFetchOrder();
  }

  render() {
    return this.props.loading ? (
      <Spinner />
    ) : (
      <div>
        {this.props.orders.map(order => (
          <Order
            key={order.id}
            ingredients={order.ingredients}
            price={order.price}
          />
        ))}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  orders: state.order.orders,
  loading: state.order.loading
});

const maoDispatchToProps = dispatch => ({
  onFetchOrder: () => dispatch(actions.fetchOrder())
});

export default connect(
  mapStateToProps,
  maoDispatchToProps
)(ErrorHandler(Orders, axios));
