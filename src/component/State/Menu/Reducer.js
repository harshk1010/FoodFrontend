
import * as ActionType from './ActionType';

const initialState = {
    menuItems: [],
    loading: false,
    error: null,
    search: [],
    message: null
};

const menuItemReducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionType.CREATE_MENU_ITEM_REQUEST:
        case ActionType.GET_ITEMS_BY_RESTAURANT_ID_REQUEST:
        case ActionType.DELETE_MENU_ITEMS_REQUEST:
        case ActionType.SEARCH_MENU_ITEM_REQUEST:
        case ActionType.UPDATE_MENU_ITEMS_AVAILABILITY_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
                message: null
            };
        case ActionType.CREATE_MENU_ITEM_SUCCESS:
            return {
                ...state,
                loading: false,
                menuItems: [...state.menuItems, action.payload],
                message:"Food Created Successfully"
            };
        case ActionType.GET_ITEMS_BY_RESTAURANT_ID_SUCCESS:
            return {
                ...state,
                loading: false,
                menuItems: action.payload,
            };
        case ActionType.DELETE_MENU_ITEMS_SUCCESS:
            return {
                ...state,
                loading: false,
                menuItems: state.menuItems.filter(
                    (menuItem) => menuItem.id !== action.payload
                ),
            };
        case ActionType.UPDATE_MENU_ITEMS_AVAILABILITY_SUCCESS:
            console.log("updated items id ",action.payload.id)
            return {
                ...state,
                loading: false,
                menuItems: state.menuItems.map(
                    (menuItem) => menuItem.id === action.payload.id ? action.
                    payload : menuItem
                ),
            };
        case ActionType.SEARCH_MENU_ITEM_SUCCESS:
            return {
                ...state,
                loading: false,
                search: action.payload,
            };
        case ActionType.CREATE_MENU_ITEM_FAILURE:
        case ActionType.GET_ITEMS_BY_RESTAURANT_ID_FAILURE:
        case ActionType.DELETE_MENU_ITEMS_FAILURE:
        case ActionType.SEARCH_MENU_ITEM_FAILURE:
        case ActionType.UPDATE_MENU_ITEMS_AVAILABILITY_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
                message:null
            };
        default:
            return state;
    }
};

export default menuItemReducer;