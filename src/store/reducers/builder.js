import * as actionTypes from "../actions/actionTypes";

const INGREDIENT_PRICES = {
  meat: 1.3,
  cheese: 0.4,
  salad: 0.5,
  bacon: 0.7
};

const initalState = {
  ingredients: null,
  totalPrice: 4,
  error: false
};

function calcPrice(ingredients) {
  let sum = 4;
  for (let key in ingredients) sum += ingredients[key] * INGREDIENT_PRICES[key];
  return sum;
}

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
    case actionTypes.SET_INGREDIENTS:
      return {
        ...state,
        ingredients: action.ingredients,
        totalPrice: calcPrice(action.ingredients),
        error: false
      };
    case actionTypes.FETCH_INGREDIENTS_FAILED:
      return {
        ...state,
        error: true
      };
    default:
      return state;
  }
};

export default reducer;
