import React, { Component } from "react";

import Order from "../../components/Order/Order";
import ErrorHandler from "../../hoc/ErrorHandler/ErrorHandler";
import axios from "../../axios";

class Orders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: [],
      loading: true
    };
    axios
      .get("/order.json")
      .then(res => {
        let orders = [];
        for (let key in res.data) {
          orders.push({
            ...res.data[key],
            id: key
          });
        }
        this.setState({ orders: orders, loading: false });
      })
      .catch(err => {
        this.setState({ loading: false });
      });
  }

  render() {
    return (
      <div>
        {this.state.orders.map(order => (
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

export default ErrorHandler(Orders, axios);
