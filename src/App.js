import React, { Component } from "react";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import Layout from "./components/Layout/Layout";
import Builder from "./containers/Builder/Builder";
import CheckOut from "./containers/CheckOut/CheckOut";
import Orders from "./containers/Orders/Orders";
import Auth from "./containers/Auth/Auth";
import Logout from "./containers/Auth/Logout/Logout";
import * as authActions from "./store/actions/index";

class App extends Component {
  componentDidMount() {
    this.props.onAuthCheckState();
  }

  render() {
    return (
      <div>
        <Layout>
          <Switch>
            {this.props.isAuthed ? (
              <React.Fragment>
                <Route path="/checkout" component={CheckOut} />
                <Route path="/orders" component={Orders} />
                <Route path="/logout" component={Logout} />
                <Route path="/" exact component={Builder} />
              </React.Fragment>
            ) : (
              <React.Fragment>
                <Route path="/auth" component={Auth} />
                <Route path="/" exact component={Builder} />
                {this.props.location.pathname !== "/" ? (
                  <Redirect to="/" />
                ) : null}
              </React.Fragment>
            )}
          </Switch>
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthed: state.auth.token !== null
});

const mapDispatchToProps = dispatch => ({
  onAuthCheckState: () => dispatch(authActions.authCheckState())
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);
