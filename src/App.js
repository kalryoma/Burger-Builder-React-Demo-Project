import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

import Layout from "./components/Layout/Layout";
import Builder from "./containers/Builder/Builder";
import CheckOut from "./containers/CheckOut/CheckOut";

class App extends Component {
  render() {
    return <div>
        <Layout>
          <Switch>
            <Route path="/" exact component={Builder} />
            <Route path="/checkout" component={CheckOut} />
            <Route component={Builder} />
          </Switch>
        </Layout>
      </div>;
  }
}

export default App;
