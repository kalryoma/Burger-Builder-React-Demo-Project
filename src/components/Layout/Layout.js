import React, { Component } from "react";

import Toolbar from "../Navigation/Toolbar/Toolbar";
import SideDrawer from "../Navigation/SideDrawer/SideDrawer";

import css from "./Layout.css";

class Layout extends Component {
  constructor(props) {
    super(props);
    this.state = { showSideDrawer: false };
  }

  toggleSideDrawerHandler = () => {
    this.setState(prevState => {
      return { showSideDrawer: !prevState.showSideDrawer };
    });
  };

  render() {
    return (
      <React.Fragment>
        <Toolbar toggleSideDrawer={this.toggleSideDrawerHandler} />
        <SideDrawer
          className={css.MobileOnly}
          open={this.state.showSideDrawer}
          toggleSideDrawer={this.toggleSideDrawerHandler}
        />
        <main className={css.Content}>{this.props.children}</main>
      </React.Fragment>
    );
  }
}

export default Layout;
