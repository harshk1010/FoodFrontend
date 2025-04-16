// reviewReducer.js
import { CREATE_REVIEW, GET_REVIEWS_FOR_RESTAURANT, GET_REVIEWS_BY_USER, REVIEW_ERROR } from './ActionTypes';

const initialState = {
  reviews: [],
  error: null,
};

// Review reducer
const reviewReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_REVIEW:
      return {
        ...state,
        reviews: [...state.reviews, action.payload], // Add the new review to the state
      };

    case GET_REVIEWS_FOR_RESTAURANT:
      return {
        ...state,
        reviews: action.payload, // Set the fetched reviews for the restaurant
      };

    case GET_REVIEWS_BY_USER:
      return {
        ...state,
        reviews: action.payload, // Set the fetched reviews by user
      };

    case REVIEW_ERROR:
      return {
        ...state,
        error: action.payload, // Handle errors
      };

    default:
      return state;
  }
};

export default reviewReducer;
