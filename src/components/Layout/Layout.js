import React, { Component } from "react";
import { connect } from "react-redux";

import Toolbar from "../Navigation/Toolbar/Toolbar";
import SideDrawer from "../Navigation/SideDrawer/SideDrawer";
import AuthContext from "../Context/Auth";

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
      <AuthContext.Provider value={this.props.isAuthed}>
        <React.Fragment>
          <Toolbar toggleSideDrawer={this.toggleSideDrawerHandler} />
          <SideDrawer
            className={css.MobileOnly}
            open={this.state.showSideDrawer}
            toggleSideDrawer={this.toggleSideDrawerHandler}
          />
          <main className={css.Content}>{this.props.children}</main>
        </React.Fragment>
      </AuthContext.Provider>
    );
  }
}

const mapStateToProps = state => ({
  isAuthed: state.auth.token !== null
});

export default connect(mapStateToProps)(Layout);
