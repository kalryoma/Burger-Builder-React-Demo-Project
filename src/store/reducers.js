import * as actionTypes from "./actions";

const INGREDIENT_PRICES = {
  meat: 1.3,
  cheese: 0.4,
  salad: 0.5,
  bacon: 0.7
};

const initalState = {
  ingredients: {
    salad: 0,
    meat: 0,
    bacon: 0,
    cheese: 0
  },
  totalPrice: 4
};

const reducer = (state = initalState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingreName]: state.ingredients[action.ingreName] + 1
        },
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingreName]
      };
    case actionTypes.REMOVE_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingreName]: state.ingredients[action.ingreName] - 1
        },
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingreName]
      };
    default:
      return state;
  }
};

export default reducer;
