import React, { Component } from "react";

import Button from "../../../components/UI/Button/Button";
import axios from "../../../axios";
import css from "./ContactData.css";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";

class ContactData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        name: {
          elementType: "input",
          config: { type: "text", placeholder: "Your Name" },
          value: "",
          validation: { required: true },
          valid: false,
          touched: false
        },
        email: {
          elementType: "input",
          config: { type: "email", placeholder: "Your Email" },
          value: "",
          validation: { required: true },
          valid: false,
          touched: false
        },
        street: {
          elementType: "input",
          config: { type: "text", placeholder: "Your Street Name" },
          value: "",
          validation: { required: true },
          valid: false,
          touched: false
        },
        zipCode: {
          elementType: "input",
          config: { type: "text", placeholder: "Your ZIP Code" },
          value: "",
          validation: { required: true, minLength: 5, maxLength: 5 },
          valid: false,
          touched: false
        },
        deliveryMethod: {
          elementType: "select",
          config: {
            options: [
              { value: "fastest", displayValue: "Fastest" },
              { value: "cheapest", displayValue: "Cheapest" }
            ]
          },
          value: "fastest",
          validation: {},
          valid: true
        }
      },
      formValid: false,
      loading: false
    };
  }

  orderHandler = event => {
    event.preventDefault();
    this.setState({ loading: true });
    const formData = {};
    for (let key in this.state.form) formData[key] = this.state.form[key].value;
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      orderData: formData
    };
    axios.post("/order.json", order).then(
      res => {
        this.setState({ loading: false });
        this.props.history.push("/orders");
      },
      err => {
        this.setState({ loading: false });
        this.props.history.push("/orders");
      }
    );
  };

  checkValidity(value, rules) {
    if (!rules) return true;

    let isValid = true;

    if (rules.required) isValid = value.trim() !== "" && isValid;
    if (rules.minLength) isValid = value.length >= rules.minLength && isValid;
    if (rules.maxLength) isValid = value.length <= rules.maxLength && isValid;

    return isValid;
  }

  inputChangeHandler = (event, identifier) => {
    const updatedForm = { ...this.state.form };
    const updatedIdentifier = { ...updatedForm[identifier] };

    updatedIdentifier.value = event.target.value;
    updatedIdentifier.valid = this.checkValidity(
      updatedIdentifier.value,
      updatedIdentifier.validation
    );
    updatedIdentifier.touched = true;
    updatedForm[identifier] = updatedIdentifier;

    let formValid = true;
    for (let key in updatedForm)
      formValid = updatedForm[key].valid && formValid;

    this.setState({ form: updatedForm, formValid: formValid });
  };

  render() {
    return (
      <div className={css.ContactData}>
        <h4>Enter Your Contact Data</h4>
        {this.state.loading ? (
          <Spinner />
        ) : (
          <form onSubmit={this.orderHandler}>
            {Object.keys(this.state.form).map(key => (
              <Input
                inputtype={this.state.form[key].elementType}
                name={key}
                {...this.state.form[key].config}
                key={key}
                changed={event => this.inputChangeHandler(event, key)}
                valid={this.state.form[key].valid}
                touched={this.state.form[key].touched}
                shouldValidate={this.state.form[key].validation}
              />
            ))}
            <Button
              type="Success"
              disabled={!this.state.formValid}
              clicked={this.orderHandler}
            >
              ORDER
            </Button>
          </form>
        )}
      </div>
    );
  }
}

export default ContactData;
