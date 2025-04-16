import {
    SEARCH_FOOD_REQUEST,
    SEARCH_FOOD_SUCCESS,
    SEARCH_FOOD_FAILURE,
  } from "./ActionTypes";
  
  const initialState = {
    loading: false,
    foodItems: [],
    error: null,
  };
  
  const searchFoodReducer = (state = initialState, action) => {
    switch (action.type) {
      case SEARCH_FOOD_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
        };
  
      case SEARCH_FOOD_SUCCESS:
        return {
          ...state,
          loading: false,
          foodItems: action.payload, // Store the food items in the state
        };
  
      case SEARCH_FOOD_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload, // Store the error if it occurs
        };
  
      default:
        return state;
    }
  };
  
  export default searchFoodReducer;
  