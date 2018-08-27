import * as actionTypes from "./actionTypes";
import axios from "../../axiosOwn";

const purchaseSuccess = (id, orderData) => ({
  type: actionTypes.PURCHASE_SUCCESS,
  orderID: id,
  orderData: orderData
});

const purchaseFail = error => ({
  type: actionTypes.PURCHASE_FAIL,
  error: error
});

const purchaseStart = () => ({ type: actionTypes.PURCHASE_START });

export const purchaseInit = () => ({ type: actionTypes.PURCHASE_INIT });

export const purchase = (orderData, token) => dispatch => {
  dispatch(purchaseStart());
  axios.post("/order.json?auth=" + token, orderData).then(
    res => {
      dispatch(purchaseSuccess(res.data.name, orderData));
    },
    err => {
      dispatch(purchaseFail(err));
    }
  );
};

const fetchOrderSuccess = orders => ({
  type: actionTypes.FETCH_ORDERS_SUCCESS,
  orders: orders
});

const fetchOrderFail = error => ({
  type: actionTypes.FETCH_ORDERS_FAIL,
  error: error
});

const fetchOrderStart = () => ({ type: actionTypes.FETCH_ORDERS_START });

export const fetchOrder = token => dispatch => {
  dispatch(fetchOrderStart());
  axios
    .get("/order.json?auth=" + token)
    .then(res => {
      dispatch(fetchOrderSuccess(res.data));
    })
    .catch(err => {
      dispatch(fetchOrderFail(err));
    });
};
