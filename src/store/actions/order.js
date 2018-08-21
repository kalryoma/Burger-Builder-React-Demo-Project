import * as actionTypes from "./actionTypes";
import axios from "../../axios";

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

export const purchase = orderData => dispatch => {
  dispatch(purchaseStart());
  axios.post("/order.json", orderData).then(
    res => {
      dispatch(purchaseSuccess(res.data.name, orderData));
    },
    err => {
      dispatch(purchaseFail(err));
    }
  );
};
