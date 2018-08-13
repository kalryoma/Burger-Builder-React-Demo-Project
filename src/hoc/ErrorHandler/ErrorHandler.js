import React, { Component } from "react";

import Modal from "../../components/UI/Modal/Modal";

const withErrorHandler = (WrappedComponent, axios) => {
  return class extends Component {
    constructor(props){
      super(props);
      this.state = { error: null };
      this.reqInterceptor = axios.interceptors.request.use(req => {
        this.setState({ error: null });
        return req;
      });
      this.resInterceptor = axios.interceptors.response.use(res => res, err => {
        console.log(err);
        this.setState({ error: err });
      });
    }

    componentWillUnMount(){
      axios.interceptors.request.eject(this.reqInterceptor);
      axios.interceptors.response.eject(this.resInterceptor);
    }

    DismissError = () => {
      this.setState({ error: null });
    };

    render() {
      return <React.Fragment>
          <Modal show={this.state.error} cancel={this.DismissError}>
            {this.state.error ? this.state.error.message : null}
          </Modal>
          <WrappedComponent {...this.props} />
        </React.Fragment>;
    }
  };
};

export default withErrorHandler;
