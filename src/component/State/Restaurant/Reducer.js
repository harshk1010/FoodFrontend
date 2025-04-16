
import * as ActionType from './ActionType'; // Correct path




const initialState = {
    restaurants: [],
    usersRestaurant: null,
    restaurant: null,
    loading: false,
    error: null,
    events: [],
    restaurantsEvents: [],
    categories: [],
};

const restaurantReducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionType.CREATE_RESTAURANT_REQUEST:
        case ActionType.GET_ALL_RESTAURANTS_REQUEST:
        case ActionType.DELETE_RESTAURANT_REQUEST:
        case ActionType.UPDATE_RESTAURANT_REQUEST:
        case ActionType.GET_RESTAURANT_BY_ID_REQUEST:
        case ActionType.CREATE_CATEGORY_REQUEST:
        case ActionType.GET_RESTAURANTS_CATEGORY_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case ActionType.CREATE_RESTAURANT_SUCCESS:
            return {
                ...state,
                loading: false,
                usersRestaurant: action.payload
            };
        case ActionType.GET_ALL_RESTAURANTS_SUCCESS:
            return {
                ...state,
                loading: false,
                restaurants: action.payload,
            };
            case ActionType.GET_RESTAURANT_BY_ID_SUCCESS:
                return {
                    ...state,
                    loading: false,
                    restaurant: action.payload,
                };
            case ActionType.GET_RESTAURANT_BY_USER_ID_SUCCESS:
            case ActionType.UPDATE_RESTAURANT_STATUS_SUCCESS:
            case ActionType.UPDATE_RESTAURANT_SUCCESS:
                return {
                    ...state,
                    loading: false,
                    usersRestaurant: action.payload,
                };

        case ActionType.DELETE_RESTAURANT_SUCCESS:
            return {
                ...state,
                error: null,
                loading: false,
                restaurants: state.restaurants.filter(
                    (item) => item.id !== action.payload
                ),
                usersRestaurant: state.usersRestaurant.filter (
                    (item) => item.id !== action.payload
                ),
            };

        case ActionType.CREATE_EVENTS_SUCCESS:
            return {
                ...state,
                loading: false,
                events: [...state.events, action.payload],
                restaurantsEvents: [...state.restaurantsEvents, action.payload],
            };
        case ActionType.GET_ALL_EVENTS_SUCCESS:
            return {
                ...state,
                loading: false,
                events: action.payload,
            };
        case ActionType.GET_RESTAURANTS_EVENTS_SUCCESS:
            return {
                ...state,
                loading: false,
                restaurantsEvents: action.payload,
            };
        case ActionType.DELETE_EVENTS_SUCCESS:
            return {
                ...state,
                loading: false,
                events: state.events.filter((item) => item.id !== action.payload),
                restaurantsEvents: state.restaurantsEvents.filter (
                    (item) => item.id !== action.payload
                ),
            };
        case ActionType.CREATE_CATEGORY_SUCCESS:
            return {
                ...state,
                loading: false,
                categories: [...state.categories, action.payload],
            };
        case ActionType.GET_RESTAURANTS_CATEGORY_SUCCESS:
            return {
                ...state,
                loading: false,
                categories: action.payload,
            };
        case ActionType.CREATE_RESTAURANT_FAILURE:
        case ActionType.GET_ALL_RESTAURANTS_FAILURE:
        case ActionType.DELETE_RESTAURANT_FAILURE:
        case ActionType.UPDATE_RESTAURANT_FAILURE:
        case ActionType.GET_RESTAURANT_BY_ID_FAILURE:
        case ActionType.CREATE_EVENTS_FAILURE:
        case ActionType.CREATE_CATEGORY_FAILURE:
        case ActionType.GET_RESTAURANTS_CATEGORY_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

export default restaurantReducer;