import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import Button from "../../components/UI/Button/Button";
import Input from "../../components/UI/Input/Input";
import Spinner from "../../components/UI/Spinner/Spinner";
import css from "./Auth.css";
import * as authActions from "../../store/actions/index";
import { checkValidity } from "../../shared/utility";

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
          validation: { required: true, minLength: 6 },
          valid: false,
          touched: false
        }
      },
      isSignedup: true
    };
  }

  componentDidMount() {
    if (!this.props.building && this.props.authRedirectPath !== "/")
      this.props.onSetAuthRedirectPath("/");
  }

  inputChangeHandler = (event, identifier) => {
    const updatedForm = { ...this.state.form };
    const updatedIdentifier = { ...updatedForm[identifier] };

    updatedIdentifier.value = event.target.value;
    updatedIdentifier.valid = checkValidity(
      updatedIdentifier.value,
      updatedIdentifier.validation
    );
    updatedIdentifier.touched = true;
    updatedForm[identifier] = updatedIdentifier;

    this.setState({ form: updatedForm });
  };

  submitHandler = event => {
    event.preventDefault();
    this.props.onAuth(
      this.state.form.email.value,
      this.state.form.password.value,
      this.state.isSignedup
    );
  };

  switchAuthMode = () => {
    this.setState(prevState => ({ isSignedup: !prevState.isSignedup }));
  };

  render() {
    return (
      <div className={css.Auth}>
        {this.props.isAuthed ? (
          <Redirect to={this.props.authRedirectPath} />
        ) : null}
        {this.props.loading ? (
          <Spinner />
        ) : (
          <React.Fragment>
            {this.props.error ? (
              <p style={{ color: "red" }}>{this.props.error.message}</p>
            ) : null}
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
              <Button type="Success">Submit</Button>
            </form>
          </React.Fragment>
        )}
        <Button type="Danger" clicked={this.switchAuthMode}>
          Switch to {this.state.isSignedup ? "Sign Up" : "Sign In"}
        </Button>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.auth.loading,
  error: state.auth.error,
  isAuthed: state.auth.token !== null,
  building: state.builder.building,
  authRedirectPath: state.auth.authRedirectPath
});

const mapDispatchToProps = dispatch => ({
  onAuth: (email, password, isSignedup) =>
    dispatch(authActions.auth(email, password, isSignedup)),
  onSetAuthRedirectPath: path => dispatch(authActions.setAuthRedirectPath(path))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Auth);
