import axios from "axios";
import {
  SAVE_ADDRESS_REQUEST,
  SAVE_ADDRESS_SUCCESS,
  SAVE_ADDRESS_FAILURE,
  GET_ADDRESSES_REQUEST,
  GET_ADDRESSES_SUCCESS,
  GET_ADDRESSES_FAILURE,
  DELETE_ADDRESS_FAILURE,
  DELETE_ADDRESS_SUCCESS,
  DELETE_ADDRESS_REQUEST,
} from "./ActionType";

export const saveAddress = (address) => async (dispatch) => {
  dispatch({ type: SAVE_ADDRESS_REQUEST });
  try {
    const jwt = localStorage.getItem("jwt");
    const config = {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    };
    const res = await axios.post("https://foodbackend-production-ecf0.up.railway.app/api/address/add", address, config);
    dispatch({
      type: SAVE_ADDRESS_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: SAVE_ADDRESS_FAILURE,
      payload: error.response?.data?.message || "Failed to save address",
    });
  }
};

export const getUserAddresses = () => async (dispatch) => {
  dispatch({ type: GET_ADDRESSES_REQUEST });
  try {
    const jwt = localStorage.getItem("jwt");
    const config = {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    };
    const res = await axios.get("/api/address", config);
    dispatch({
      type: GET_ADDRESSES_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: GET_ADDRESSES_FAILURE,
      payload: error.response?.data?.message || "Failed to fetch addresses",
    });
  }
};

// export const deleteAddress = (addressId) => async (dispatch) => {
//   dispatch({ type: DELETE_ADDRESS_REQUEST });
//   try {
//     const jwt = localStorage.getItem("jwt");
//     const config = {
//       headers: {
//         Authorization: `Bearer ${jwt}`,
//       },
//     };
//     await axios.delete(`/api/address/${addressId}`, config);

//     dispatch({
//       type: DELETE_ADDRESS_SUCCESS,
//       payload: addressId,
//     });
//   } catch (error) {
//     dispatch({
//       type: DELETE_ADDRESS_FAILURE,
//       payload: error.response?.data?.message || "Failed to delete address",
//     });
//   }
// };

