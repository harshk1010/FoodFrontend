import axios from "axios";
import {
  SEARCH_FOOD_REQUEST,
  SEARCH_FOOD_SUCCESS,
  SEARCH_FOOD_FAILURE,
} from "./ActionTypes";

export const searchFoodAction = (query) => async (dispatch) => {
  dispatch({ type: SEARCH_FOOD_REQUEST });

  try {
    const token = localStorage.getItem("jwt");

    // Ensure the URL is correct
    const { data } = await axios.get(
      `/api/food/search?name=${query}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("search food data", data); // Log to check the response
    dispatch({ type: SEARCH_FOOD_SUCCESS, payload: data });
  } catch (error) {
    console.error("Error fetching food:", error); // Improved error logging
    dispatch({
      type: SEARCH_FOOD_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};
