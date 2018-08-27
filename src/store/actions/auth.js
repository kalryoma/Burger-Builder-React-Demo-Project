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
      const expirationTime = new Date(Date.now() + res.data.expiresIn * 1000);
      localStorage.setItem("token", res.data.idToken);
      localStorage.setItem("expirationTime", expirationTime);
      localStorage.setItem("userId", res.data.localId);
      dispatch(authSuccess(res.data.idToken, res.data.localId));
      dispatch(checkTimeout(res.data.expiresIn));
    })
    .catch(err => dispatch(authFail(err.response.data.error)));
};

export const logOut = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("expirationTime");
  localStorage.removeItem("userId");
  return {
    type: actionTypes.AUTH_LOGOUT
  };
};

export const setAuthRedirectPath = path => ({
  type: actionTypes.SET_AUTH_REDIRECT_PATH,
  path: path
});

export const authCheckState = () => dispatch => {
  const token = localStorage.getItem("token");
  if (!token) dispatch(logOut());
  else {
    const expirationTime = new Date(localStorage.getItem("expirationTime"));
    if (expirationTime > Date.now()) {
      const userId = localStorage.getItem("userId");
      dispatch(authSuccess(token, userId));
      dispatch(checkTimeout(expirationTime.getTime() - Date.now()));
    } else dispatch(logOut());
  }
};
