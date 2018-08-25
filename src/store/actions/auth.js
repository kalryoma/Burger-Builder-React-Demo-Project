import * as actionTypes from "./actionTypes";
import axios from "../../axiosOwn";

const authStart = () => ({
  type: actionTypes.AUTH_START
});

const authSuccess = authData => ({
  type: actionTypes.AUTH_SUCCESS,
  authData: authData
});

const authFail = error => ({
  type: actionTypes.AUTH_FAIL,
  error: error
});

export const auth = (email, password) => {
  return dispatch => {
    dispatch(authStart);
  };
};
