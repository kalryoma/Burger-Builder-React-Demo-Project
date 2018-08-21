import * as actionTypes from "./actionTypes";
import axios from "../../axios";

export const addIngredient = name => ({
  type: actionTypes.ADD_INGREDIENT,
  ingreName: name
});

export const removeIngredient = name => ({
  type: actionTypes.REMOVE_INGREDIENT,
  ingreName: name
});

const setIngredients = ingredients => ({
  type: actionTypes.SET_INGREDIENTS,
  ingredients: ingredients
});

export const fetchIngredientsFailed = () => ({
  type: actionTypes.FETCH_INGREDIENTS_FAILED
});

export const initIngredients = () => dispatch => {
  axios
    .get("/ingredients.json")
    .then(res => dispatch(setIngredients(res.data)))
    .catch(err => dispatch(fetchIngredientsFailed()));
};
