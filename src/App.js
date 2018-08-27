import React, { Component } from "react";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import Layout from "./components/Layout/Layout";
import Builder from "./containers/Builder/Builder";
import Logout from "./containers/Auth/Logout/Logout";
import * as authActions from "./store/actions/index";
import asyncComponent from "./hoc/asyncComponent/asyncComponent";

const asyncCheckOut = asyncComponent(() =>
  import("./containers/CheckOut/CheckOut")
);

const asyncOrders = asyncComponent(() => import("./containers/Orders/Orders"));

const asyncAuth = asyncComponent(() => import("./containers/Auth/Auth"));

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
                <Route path="/checkout" component={asyncCheckOut} />
                <Route path="/orders" component={asyncOrders} />
                <Route path="/logout" component={Logout} />
                <Route path="/auth" component={asyncAuth} />
                <Route path="/" exact component={Builder} />
              </React.Fragment>
            ) : (
              <React.Fragment>
                <Route path="/auth" component={asyncAuth} />
                <Route path="/" exact component={Builder} />
                  {this.props.location && this.props.location.pathname !== "/" &&
                this.props.location.pathname !== "/auth" ? (
                  <Redirect to="/" />
                ) : null}
              </React.Fragment>
            )}
            <Route component={Builder} />
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
