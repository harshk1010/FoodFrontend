

import {
  SAVE_ADDRESS_REQUEST,
  SAVE_ADDRESS_SUCCESS,
  SAVE_ADDRESS_FAILURE,
  GET_ADDRESSES_REQUEST,
  GET_ADDRESSES_SUCCESS,
  GET_ADDRESSES_FAILURE,
  DELETE_ADDRESS_REQUEST,
  DELETE_ADDRESS_SUCCESS,
  DELETE_ADDRESS_FAILURE,
} from "./ActionType";

const initialState = {
  loading: false,
  error: null,
  addresses: [],
};

export const addressReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SAVE_ADDRESS_REQUEST:
    case GET_ADDRESSES_REQUEST:
    case DELETE_ADDRESS_REQUEST:
      return { ...state, loading: true, error: null };

    case SAVE_ADDRESS_SUCCESS:
      return {
        ...state,
        loading: false,
        addresses: [...state.addresses, payload],
      };

    case GET_ADDRESSES_SUCCESS:
      return {
        ...state,
        loading: false,
        addresses: payload,
      };

    case DELETE_ADDRESS_SUCCESS:
      return {
        ...state,
        loading: false,
        addresses: state.addresses.filter((addr) => addr.id !== payload),
      };

    case SAVE_ADDRESS_FAILURE:
    case GET_ADDRESSES_FAILURE:
    case DELETE_ADDRESS_FAILURE:
      return {
        ...state,
        loading: false,
        error: payload,
      };

    default:
      return state;
  }
};

  