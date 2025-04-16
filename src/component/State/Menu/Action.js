import {api} from "../../config/api";

import {
    CREATE_MENU_ITEM_FAILURE,
    CREATE_MENU_ITEM_REQUEST,
    CREATE_MENU_ITEM_SUCCESS,
    DELETE_MENU_ITEMS_FAILURE,
    DELETE_MENU_ITEMS_SUCCESS,
    GET_ITEMS_BY_RESTAURANT_ID_FAILURE,
    GET_ITEMS_BY_RESTAURANT_ID_REQUEST,
    GET_ITEMS_BY_RESTAURANT_ID_SUCCESS,
    SEARCH_MENU_ITEM_FAILURE,
    SEARCH_MENU_ITEM_REQUEST,
    SEARCH_MENU_ITEM_SUCCESS,
    UPDATE_MENU_ITEMS_AVAILABILITY_FAILURE,
    UPDATE_MENU_ITEMS_AVAILABILITY_REQUEST,
    UPDATE_MENU_ITEMS_AVAILABILITY_SUCCESS,
} from "./ActionType";

// localhost:5454/api/admin/ingredients/food/16



export const createMenuItem = ({menu,jwt}) => {
    return async (dispatch) => {
        dispatch({type: CREATE_MENU_ITEM_REQUEST});
        try {
            const {data} = await api.post("/api/admin/food", menu, 
            {
                headers: {
                    "Authorization": `Bearer ${jwt}`,
                },
            });
            console.log("created menu ",data);
            dispatch({type: CREATE_MENU_ITEM_SUCCESS, payload: data});
        } catch(error) {
            console.log("catch error ",error);
            dispatch({type: CREATE_MENU_ITEM_FAILURE, payload: error});
        }
    };
};

export const getMenuItemsByRestaurantId = (reqData) => {
    return async (dispatch) => {
        dispatch({type: GET_ITEMS_BY_RESTAURANT_ID_REQUEST});
        try {
            const params = {};
            if (typeof reqData.vegetarian === "boolean") params.vegetarian = reqData.vegetarian;
            if (typeof reqData.nonveg === "boolean") params.nonveg = reqData.nonveg;
            if (typeof reqData.seasonal === "boolean") params.seasonal = reqData.seasonal;
            if (reqData.foodCategory) params.food_category = reqData.foodCategory;
      
            const { data } = await api.get(`/api/food/restaurant/${reqData.restaurantId}`, {
              headers: {
                Authorization: `Bearer ${reqData.jwt}`,
              },
              params,
            });
            console.log("menu items by restaurants ",data);
            dispatch({type: GET_ITEMS_BY_RESTAURANT_ID_SUCCESS, payload: data});
        } catch(error) {
            console.log("catch error ",error);
            dispatch({type: GET_ITEMS_BY_RESTAURANT_ID_FAILURE, payload: error});
        }
    };
};




export const searchMenuItem = ({keyword, jwt}) => {
    return async (dispatch) => {
        dispatch({type: SEARCH_MENU_ITEM_REQUEST});
        try {
            const {data} = await api.get(`api/food/search?name=${keyword}`, {
                headers: {
                    "Authorization": `Bearer ${jwt}`,
                },
            });
            console.log("data ------------ ",data);
            dispatch({type: SEARCH_MENU_ITEM_SUCCESS, payload: data});
        } catch(error) {
            dispatch({type: SEARCH_MENU_ITEM_FAILURE, payload: error});
        }
    };
};

export const getAllIngredientsOfMenuItem = (reqData) => {
    return async (dispatch) => {
        dispatch({type: SEARCH_MENU_ITEM_REQUEST});
        try {
            const {data} = await api.get(`api/food/search?name=${keyword}`, {
                headers: {
                    "Authorization": `Bearer ${reqData.jwt}`,
                },
            });
            console.log("data ------------ ",data);
            dispatch({type: SEARCH_MENU_ITEM_SUCCESS, payload: data});
        } catch(error) {
            dispatch({type: SEARCH_MENU_ITEM_FAILURE, payload: error});
        }
    };
};




export const updateMenuItemsAvailability = ({foodId, jwt}) => {
    return async (dispatch) => {
        dispatch({type: UPDATE_MENU_ITEMS_AVAILABILITY_REQUEST});
        try {
            const {data} = await api.put(
                `api/admin/food/${foodId}`, 
                {},
                {
                headers: {
                    "Authorization": `Bearer ${jwt}`,
                },
            }
        );
            console.log("update menuItems Availability ",data);
            dispatch({type: UPDATE_MENU_ITEMS_AVAILABILITY_SUCCESS, payload: data});
        } catch(error) {
            console.log("error ",error);
            dispatch({type:UPDATE_MENU_ITEMS_AVAILABILITY_FAILURE,
                 payload: error});
        }
    };
};



export const deleteFoodAction = ({foodId, jwt}) => {
    return async (dispatch) => {
        dispatch({type: UPDATE_MENU_ITEMS_AVAILABILITY_REQUEST});
        try {
            const {data} = await api.delete(`api/admin/food/${foodId}`, {
                headers: {
                    "Authorization": `Bearer ${jwt}`,
                },
            });
            console.log("delete food ",data);
            dispatch({type: DELETE_MENU_ITEMS_SUCCESS, payload: foodId});
        } catch(error) {
            dispatch({type:DELETE_MENU_ITEMS_FAILURE, payload: error});
        }
    };
};