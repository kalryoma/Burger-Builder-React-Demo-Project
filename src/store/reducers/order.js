import * as actionTypes from "../actions/actionTypes";

const initalState = {
  orders: [],
  loading: false,
  error: false,
  purchased: false
};

const reducer = (state = initalState, action) => {
  switch (action.type) {
    case actionTypes.PURCHASE_INIT:
      return {
        ...state,
        purchased: false
      };
    case actionTypes.PURCHASE_SUCCESS:
      const newOrder = {
        ...action.orderData,
        id: action.orderID
      };
      return {
        ...state,
        loading: false,
        error: false,
        purchased: true,
        orders: state.orders.concat(newOrder)
      };
    case actionTypes.PURCHASE_FAIL:
      return {
        ...state,
        loading: false,
        error: true
      };
    case actionTypes.PURCHASE_START:
      return {
        ...state,
        loading: true
      };
    case actionTypes.FETCH_ORDERS_START:
      return {
        ...state,
        loading: true
      };
    case actionTypes.FETCH_ORDERS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        orders: Object.keys(action.orders).map(key => ({
          ...action.orders[key],
          id: key
        }))
      };
    case actionTypes.FETCH_ORDERS_FAIL:
      return {
        ...state,
        loading: false,
        error: true
      };
    default:
      return state;
  }
};

export default reducer;
