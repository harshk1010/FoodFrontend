
//import {LOGOUT} from "../../Authentication/ActionType";
import { LOGOUT } from "../Authentication/ActionType";
import * as ActionTypes from "./ActionTypes";

const initialState = {
    cart: null,
    cartItems: [],
    loading: false,
    error: null,
};

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.FIND_CART_REQUEST:
        case ActionTypes.GET_ALL_CART_ITEMS_REQUEST:
        case ActionTypes.UPDATE_CARTITEM_REQUEST:
        case ActionTypes.REMOVE_CARTITEM_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case ActionTypes.FIND_CART_SUCCESS:
        case ActionTypes.CLEAR_CART_SUCCESS:
            return {
                ...state,
                loading: false,
                cart: action.payload,
                cartItems: action.payload.items || [],
            };
        case ActionTypes.ADD_ITEM_TO_CART_SUCCESS:
            return {
                ...state,
                cartItems: [...(state.cartItems || []), action.payload],
                loading: false,
            };
        case ActionTypes.UPDATE_CARTITEM_SUCCESS: {
            const updatedCartItems = state.cartItems.map((item) =>
                item.id === action.payload.id ? action.payload : item
            );
        
            const updatedTotal = updatedCartItems.reduce(
                (sum, item) => sum + item.totalprice,
                0
            );
            return {
                ...state,
                loading: false,
                // cartItems: state.cartItems.map((item) => 
                //     item.id === action.payload.id ? action.payload : item
                cartItems: updatedCartItems,
                cart: {
                ...state.cart,
                total: updatedTotal,
                },
          //  ),
            };
        }
        case ActionTypes.REMOVE_CARTITEM_SUCCESS:
            const remainingItems = state.cartItems.filter(
                (item) => item.id !== action.payload
              );
            return {
                ...state,
                loading: false,
                // cartItems: state.cartItems.filter((item) =>
                //     item.id !== action.payload
                // ),
                cartItems: remainingItems,
                cart: {
                ...state.cart,
                total: remainingItems.reduce(
                (acc, item) => acc + item.totalprice,
                0
        ),
      },
            };
        case ActionTypes.FIND_CART_FAILURE:
        case ActionTypes.UPDATE_CARTITEM_FAILURE:
        case ActionTypes.REMOVE_CARTITEM_FAILURE:

            return {
                ...state,
                loading: false,
                error: action.payload,
            };

            case LOGOUT:
                localStorage.removeItem("jwt");
                return { ...state, cartItems:[], cart:null, success: "logout success" };
            default:
                return state;
    }
};

export default cartReducer;