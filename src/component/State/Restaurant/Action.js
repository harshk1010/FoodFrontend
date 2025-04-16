
import axios from 'axios';


import {
    CREATE_CATEGORY_FAILURE,
    CREATE_CATEGORY_REQUEST,
    CREATE_CATEGORY_SUCCESS,
    CREATE_EVENTS_FAILURE,
    CREATE_EVENTS_REQUEST,
    CREATE_EVENTS_SUCCESS,
    DELETE_EVENTS_FAILURE,
    DELETE_EVENTS_REQUEST,
    DELETE_EVENTS_SUCCESS,
    GET_ALL_EVENTS_FAILURE,
    GET_ALL_EVENTS_REQUEST,
    GET_ALL_EVENTS_SUCCESS,
    GET_RESTAURANTS_EVENTS_FAILURE,
    GET_RESTAURANTS_EVENTS_REQUEST,
    GET_RESTAURANTS_EVENTS_SUCCESS,
    GET_RESTAURANTS_CATEGORY_FAILURE,
    GET_RESTAURANTS_CATEGORY_REQUEST,
    GET_RESTAURANTS_CATEGORY_SUCCESS,
    GET_RESTAURANT_BY_USER_ID_FAILURE,
    GET_RESTAURANT_BY_USER_ID_REQUEST,
    GET_RESTAURANT_BY_USER_ID_SUCCESS,
    UPDATE_RESTAURANT_STATUS_FAILURE,
    UPDATE_RESTAURANT_STATUS_REQUEST,
    UPDATE_RESTAURANT_STATUS_SUCCESS,
    GET_RESTAURANT_BY_ID_REQUEST,
    GET_RESTAURANT_BY_ID_SUCCESS,
    GET_RESTAURANT_BY_ID_FAILURE,
    CREATE_RESTAURANT_REQUEST,
    DELETE_RESTAURANT_REQUEST,
    DELETE_RESTAURANT_SUCCESS,
    DELETE_RESTAURANT_FAILURE,
    GET_ALL_RESTAURANTS_REQUEST,
    GET_ALL_RESTAURANTS_FAILURE,
    GET_ALL_RESTAURANTS_SUCCESS,
    CREATE_RESTAURANT_SUCCESS,
    CREATE_RESTAURANT_FAILURE,
} from  "./ActionType";
import { api } from '../../config/api';
//import { token } from './Action';
export const token = localStorage.getItem("jwt");
export const getAllRestaurantsAction = (token) => {
    if (!token) {
        console.log("Token is missing");
        // Optionally, handle this case by redirecting the user to the login page
    }

    return async  (dispatch) => {
        dispatch({ type: GET_ALL_RESTAURANTS_REQUEST });
        try {
            const {data} = await api.get(`/api/restaurants`, {
                headers: {
                    Authorization:  `Bearer ${token}`,
                },
            });
            console.log('Token being sent:', token);
            dispatch({type : GET_ALL_RESTAURANTS_SUCCESS, payload : data});

            console.log("all restaurant ",data);
        } catch (error) {
            console.log("catch error",error);
            console.log("token",token);
            dispatch({type : GET_ALL_RESTAURANTS_FAILURE, payload : error});

        }
    };

};

export const getRestaurantById = (reqData) => {
    return async (dispatch) => {
        dispatch({ type: GET_RESTAURANT_BY_ID_REQUEST });
        try {
            const { data } = await api.get(`api/restaurants/${reqData.restaurantId}`, {
                headers: {
                    Authorization: `Bearer ${reqData.jwt}`,
                },
            });
            dispatch({ type: GET_RESTAURANT_BY_ID_SUCCESS, payload: data });
        } catch (error) {
            console.log("error", error);
            dispatch({ type: GET_RESTAURANT_BY_ID_FAILURE, payload: error });
        }
    };
};

export const getRestaurantByUserId = (token) => {
    return async  (dispatch) => {
        dispatch({ type: GET_RESTAURANT_BY_USER_ID_REQUEST });
        try {
            const {data} = await api.get(`/api/admin/restaurants/user`, {
                headers: {
                    Authorization:  `Bearer ${token}`,
                },
            });
            console.log("get restaurant by user id ",data);
            dispatch({type : GET_RESTAURANT_BY_USER_ID_SUCCESS,payload : data});
        } catch (error) {
            console.log("catch error",error);
            dispatch({
            type : GET_RESTAURANT_BY_USER_ID_FAILURE,
             payload : error.message,
            });
        }
    };
};
export const createRestaurant = (reqData) => {
    console.log("token-----------",reqData.token);
    return async  (dispatch) => {
        dispatch({ type: CREATE_RESTAURANT_REQUEST });
        try {
            const {data} = await api.post(`api/admin/restaurants`, reqData.data,{
                headers: {
                    Authorization:  `Bearer ${reqData.token}`,
                },
            });
            console.log("created restaurant ",data);
            dispatch({type : CREATE_RESTAURANT_SUCCESS, payload : data});
        } catch (error) {
            console.log("catch error",error);
            dispatch({
            type : CREATE_RESTAURANT_FAILURE,
            payload : error.message
            });
        }
    };
};

export const updateRestaurant = ({restaurantId, restaurantData, jwt}) => {
    return async  (dispatch) => {
        dispatch({ type: UPDATE_RESTAURANT_STATUS_REQUEST });
        try {
            const res = await api.put(`api/admin/restaurants/${restaurantId}`,
                 restaurantData,{
                headers: {
                    Authorization:  `Bearer ${jwt}`,
                },
            }
        );
            dispatch({type : UPDATE_RESTAURANT_STATUS_SUCCESS, payload : res.data});
        } catch (error) {
            dispatch({
            type : UPDATE_RESTAURANT_STATUS_FAILURE,
            payload : error
            });
        }
    };
};
export const deleteRestaurant = ({restaurantId, jwt}) => {
    return async  (dispatch) => {
        dispatch({ type: DELETE_RESTAURANT_REQUEST});
        try {
            const res = await api.delete(`api/admin/restaurant/${restaurantId}`, {
                headers: {
                    Authorization:  `Bearer ${jwt}`,
                },
            });
            console.log("delete restaurant ", res.data);
            dispatch({type : DELETE_RESTAURANT_SUCCESS , payload : restaurantId});
        } catch (error) {
            console.log("catch error ",error);
            dispatch({ type : DELETE_RESTAURANT_FAILURE, payload : error });
        }
    };
};

export const updateRestaurantStatus = ({restaurantId, jwt, restaurantData}) => {
    return async  (dispatch) => {
        dispatch({ type: UPDATE_RESTAURANT_STATUS_REQUEST});

        try {
            const res = await api.put(
                `api/admin/restaurants/${restaurantId}/status`, 
                restaurantData,
                {
                headers: {
                    Authorization:  `Bearer ${jwt}`,
                },
            }
        );
            console.log("resssss ", res.data);
            dispatch({type : UPDATE_RESTAURANT_STATUS_SUCCESS , payload : res.data});
        } catch (error) {
            console.log("error ",error);
            dispatch({ type : UPDATE_RESTAURANT_STATUS_FAILURE, payload : error });
        }
    };
};

export const createEventAction = ({restaurantId, jwt, data}) => {
    return async  (dispatch) => {
        dispatch({ type: CREATE_EVENTS_REQUEST});

        try {
            const res = await api.post(
                `api/events/admin/restaurants/${restaurantId}`, 
                data,
                {
                headers: {
                    Authorization:  `Bearer ${jwt}`,
                },
            }
        );
            console.log("create events ", res.data);
            dispatch({type : CREATE_EVENTS_SUCCESS , payload : res.data});
        } catch (error) {
            console.log("error ",error);
            dispatch({ type : CREATE_EVENTS_FAILURE, payload : error });
        }
    };
};

export const getAllEvents = ({jwt}) => {
    return async  (dispatch) => {
        dispatch({ type: GET_ALL_EVENTS_REQUEST});

        try {
            const res = await api.get(`api/events`, {
                headers: {
                    Authorization:  `Bearer ${jwt}`,
                },
            });
            console.log("get all events ", res.data);
            dispatch({type : GET_ALL_EVENTS_SUCCESS , payload : res.data});
        } catch (error) {
            console.log("error ",error);
            dispatch({ type : GET_ALL_EVENTS_FAILURE, payload : error });
        }
    };
};
export const deleteEventAction = ({eventId , jwt}) => {
    return async  (dispatch) => {
        dispatch({ type: DELETE_EVENTS_REQUEST});

        try {
            const res = await api.delete(`api/events/admin/${eventId}`, {
                headers: {
                    Authorization:  `Bearer ${jwt}`,
                },
            });
            console.log("Delete events ", res.data);
            dispatch({type : DELETE_EVENTS_SUCCESS , payload : eventId});
        } catch (error) {
            console.log("error ",error);
            dispatch({ type : DELETE_EVENTS_FAILURE, payload : error });
        }
    };
};

export const getRestaurantsEvents = ({restaurantId , jwt}) => {
    return async  (dispatch) => {
        dispatch({ type: GET_RESTAURANTS_EVENTS_REQUEST});

        try {
            const res = await api.get(
                `api/admin/events/restaurant/${restaurantId}`,
             {
                headers: {
                    Authorization:  `Bearer ${jwt}`,
                },
            });
            console.log("get restaurants event ", res.data);
            dispatch({type : GET_RESTAURANTS_EVENTS_SUCCESS , payload : res.data});
        } catch (error) {
            console.log("error ",error);
            dispatch({ type : GET_RESTAURANTS_EVENTS_FAILURE, payload : error });
        }
    };
};

export const createCategoryAction = ({reqData , jwt}) => {
    return async  (dispatch) => {
        dispatch({ type: CREATE_CATEGORY_REQUEST});

        try {
            const res = await api.post( `api/admin/category`, reqData , {
                headers: {
                    Authorization:  `Bearer ${jwt}`,
                },
            });
            console.log("create category ", res.data);
            dispatch({type : CREATE_CATEGORY_SUCCESS , payload : res.data});
        } catch (error) {
            console.log("error ",error);
            dispatch({ type : CREATE_CATEGORY_FAILURE, payload : error });
        }
    };
};

export const getRestaurantsCategory = ({restaurantId , jwt}) => {
    return async  (dispatch) => {
        dispatch({ type: GET_RESTAURANTS_CATEGORY_REQUEST});

        try {
            const res = await api.get( `api/category/restaurant/${restaurantId}`, {
                headers: {
                    Authorization:  `Bearer ${jwt}`,
                },
            });
            console.log("get restaurants category ", res.data);
            dispatch({type : GET_RESTAURANTS_CATEGORY_SUCCESS , payload : res.data});
        } catch (error) {
            console.log("error ",error);
            dispatch({ type : GET_RESTAURANTS_CATEGORY_FAILURE, payload : error });
        }
    };
};

