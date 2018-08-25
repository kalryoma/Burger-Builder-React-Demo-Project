import React, { Component } from "react";
import { connect } from "react-redux";

import Button from "../../components/UI/Button/Button";
import Input from "../../components/UI/Input/Input";
import css from "./Auth.css";
import * as authActions from "../../store/actions/index";

class Auth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        email: {
          elementType: "input",
          config: { type: "email", placeholder: "Your Email" },
          value: "",
          validation: { required: true, isEmail: true },
          valid: false,
          touched: false
        },
        password: {
          elementType: "input",
          config: { type: "password", placeholder: "Your Password" },
          value: "",
          validation: { required: true, minLength: 5 },
          valid: false,
          touched: false
        }
      }
    };
  }

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

    this.setState({ form: updatedForm });
  };

  submitHandler = event => {
    event.preventDefault();
    this.props.onAuth(this.state.form.email.value, this.state.form.password.value);
  };

  render() {
    return (
      <div className={css.Auth}>
        <form onSubmit={this.submitHandler}>
          {Object.keys(this.state.form).map(key => (
            <Input
              inputtype={this.state.form[key].elementType}
              name={key}
              {...this.state.form[key].config}
              key={key}
              changed={event => this.inputChangeHandler(event, key)}
              valid={this.state.form[key].valid}
              touched={this.state.form[key].touched}
            />
          ))}
          <Button
            type="Success"
            disabled={!this.state.formValid}
            clicked={this.submitHandler}
          >
            Submit
          </Button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  onAuth: (email, password) => dispatch(authActions.auth(email, password))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Auth);
