import * as actionTypes from "./actionTypes";
import axios from "axios";

const authStart = () => ({
  type: actionTypes.AUTH_START
});

const authSuccess = (idToken, userId) => ({
  type: actionTypes.AUTH_SUCCESS,
  idToken: idToken,
  userId: userId
});

const authFail = error => ({
  type: actionTypes.AUTH_FAIL,
  error: error
});

const checkTimeout = expTime => dispatch => {
  setTimeout(() => {
    dispatch(logOut());
  }, expTime * 1000);
};

export const auth = (email, password, isSignedup) => dispatch => {
  dispatch(authStart());
  const authData = {
    email: email,
    password: password,
    returnSecureToken: true
  };
  const url = isSignedup
    ? "https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyAGDFUyb28SwU769gKirOKe-qBhGoGCkTQ"
    : "https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyAGDFUyb28SwU769gKirOKe-qBhGoGCkTQ";
  axios
    .post(url, authData)
    .then(res => {
      dispatch(authSuccess(res.data.idToken, res.data.localId));
      dispatch(checkTimeout(res.data.expiresIn));
    })
    .catch(err => dispatch(authFail(err.response.data.error)));
};

export const logOut = () => ({
  type: actionTypes.AUTH_LOGOUT
});

export const setAuthRedirectPath = path => ({
  type: actionTypes.SET_AUTH_REDIRECT_PATH,
  path: path
});