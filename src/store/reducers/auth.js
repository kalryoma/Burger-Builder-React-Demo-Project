import * as actionTypes from "../actions/actionTypes";

const initalState = {
  loading: false
};

const reducer = (state = initalState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return {
        ...state,
        loading: true
      };
    default:
     return state;
  }
};

export default reducer;
