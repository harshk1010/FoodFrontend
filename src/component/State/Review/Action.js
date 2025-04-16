import axios from 'axios';
import { CREATE_REVIEW, GET_REVIEWS_FOR_RESTAURANT, GET_REVIEWS_BY_USER, REVIEW_ERROR } from './ActionTypes';

// Action to create a review
export const createReview = (userId, restaurantId, review, jwt) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        `/api/reviews/create/${userId}/${restaurantId}`,
        review,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );

      dispatch({
        type: CREATE_REVIEW,
        payload: response.data,
      });
    } catch (error) {
      console.error("Error creating review:", error);
      dispatch({
        type: REVIEW_ERROR,
        payload: error.response ? error.response.data : error.message,
      });
    }
  };
};

// Action to get all reviews for a restaurant
export const getReviewsForRestaurant = (restaurantId, jwt) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`/api/reviews/restaurant/${restaurantId}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });

      dispatch({
        type: GET_REVIEWS_FOR_RESTAURANT,
        payload: response.data,
      });
    } catch (error) {
      console.error("Error fetching reviews for restaurant:", error);
      dispatch({
        type: REVIEW_ERROR,
        payload: error.response ? error.response.data : error.message,
      });
    }
  };
};

// Action to get reviews by a user
export const getReviewsByUser = (userId, jwt) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`/api/reviews/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });

      dispatch({
        type: GET_REVIEWS_BY_USER,
        payload: response.data,
      });
      console.log("Fetched reviews by user:", response.data);
    } catch (error) {
      console.error("Error fetching reviews by user:", error);
      dispatch({
        type: REVIEW_ERROR,
        payload: error.response ? error.response.data : error.message,
      });
    }
  };
};
