import React, { Component } from "react";

import Button from "../../../components/UI/Button/Button";
import axios from "../../../axios";
import css from "./ContactData.css";
import Spinner from "../../../components/UI/Spinner/Spinner";

class ContactData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      address: {
        street: "",
        zipCode: ""
      },
      loading: false
    };
  }

  orderHandler = () => {
    this.setState({ loading: true });
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price
    };
    axios.post("/order.json", order).then(
      res => {
        this.setState({ loading: false});
        this.props.history.push("/");
      },
      err => {
        this.setState({ loading: false});
        this.props.history.push("/");
      }
    );
  };

  render() {
    const form = this.state.loading? <Spinner />: (
      <form>
        <input type="text" name="name" placeholder="Your Name" />
        <input type="email" name="email" placeholder="Your Email" />
        <input type="text" name="street" placeholder="Your Street" />
        <input type="text" name="zipCode" placeholder="Your Zip Code" />
        <Button type="Success" clicked={this.orderHandler}>
          ORDER
          </Button>
      </form>
    );
    return (
      <div className={css.ContactData}>
        <h4>Enter Your Contact Data</h4>
        {form}
      </div>
    );
  }
}

export default ContactData;
