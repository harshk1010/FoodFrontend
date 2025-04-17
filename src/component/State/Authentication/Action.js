import axios from 'axios';
import { ADD_TO_FAVORITE_FAILURE, ADD_TO_FAVORITE_REQUEST, ADD_TO_FAVORITE_SUCCESS, GET_FAVORITE_FAILURE, GET_FAVORITE_REQUEST, GET_FAVORITE_SUCCESS, GET_USER_ADDRESSES_FAILURE, GET_USER_ADDRESSES_REQUEST, GET_USER_ADDRESSES_SUCCESS, GET_USER_FAILURE, GET_USER_REQUEST, GET_USER_SUCCESS, LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT, REGISTER_FAILURE, REGISTER_REQUEST, REGISTER_SUCCESS } from "./ActionType"
import { api } from "../../config/api"
const API_URL = process.env.REACT_APP_BASE_URL;

export const registerUser=(reqData) => async(dispatch) => {
    dispatch({type:REGISTER_REQUEST})
    try {
         const {data} = await axios.post(`https://foodbackend-production-ecf0.up.railway.app/auth/signup`,reqData.userData)
        // const {data} = await axios.post(`https://foodbackend-production-ecf0.up.railway.app/auth/signup`, reqData.userData);

        if(data.jwt) localStorage.setItem("jwt",data.jwt)
        if(data.role==="ROLE_RESTAURANT_OWNER") {
            reqData.navigate("/admin/restaurants")
        } else {
            reqData.navigate("/")
        }
        dispatch({type:REGISTER_SUCCESS,payload:data.jwt})
        console.log("register success",data)

    } catch(error) {
        dispatch({type:REGISTER_FAILURE,payload:error})
        console.log("error",error)
    }
}

export const loginrUser=(reqData) => async(dispatch) => {
    dispatch({type:LOGIN_REQUEST})
    try {
        const {data} = await axios.post(`${API_URL}/auth/signin`,reqData.userData)
        if(data.jwt) localStorage.setItem("jwt",data.jwt)
        if(data.role==="ROLE_RESTAURANT_OWNER") {
            reqData.navigate("/admin/restaurants")
        } else {
            reqData.navigate("/")
        }
    
        dispatch({type:LOGIN_SUCCESS,payload:data.jwt})
        console.log("login success",data)

    } catch(error) {
        dispatch({type:LOGIN_FAILURE, payload:error})
        console.log("error",error)
    }
    
}

export const getUser=(jwt) => async(dispatch) => {
    dispatch({type:GET_USER_REQUEST})
    try {
        const {data} = await api.get(`/api/users/profile`,{
                headers:{
                    Authorization: `Bearer ${jwt}`,
                },
        })
        dispatch({type:GET_USER_SUCCESS,payload:data})
        console.log("user profile",data)

    } catch(error) {
        dispatch({type:GET_USER_FAILURE,payload:error})
        console.log("error",error)
    }
}

export const addToFavorites=(jwt, restaurantId) => async(dispatch) => {
    dispatch({type:ADD_TO_FAVORITE_REQUEST})
    console.log("JWT:", jwt, "Restaurant ID:", restaurantId);
    try {
        const {data} = await api.put(`/api/restaurants/${restaurantId}/add-favorites`,
            {},{
                headers:{
                    Authorization: `Bearer ${jwt}`
                },
        })
        dispatch({type:ADD_TO_FAVORITE_SUCCESS,payload:data})
        console.log("added to favorite",data)

    } catch(error) {
        dispatch({type:ADD_TO_FAVORITE_FAILURE, payload:error})
        console.log("error",error)
    }
}

export const getAllFavorites = (jwt) => async (dispatch) => {
    dispatch({ type: GET_FAVORITE_REQUEST });
  
    try {
      const { data } = await api.get(`/api/restaurants/favorites`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
  
      dispatch({ type: GET_FAVORITE_SUCCESS, payload: data });
      console.log("Fetched favorites:", data);
    } catch (error) {
      dispatch({
        type: GET_FAVORITE_FAILURE,
        payload: error.message || "Failed to load favorites",
      });
      console.log("Favorites fetch error", error);
    }
  };

  export const getUserAddresses = (jwt, userId) => async (dispatch) => {
    dispatch({ type: GET_USER_ADDRESSES_REQUEST });
    try {
      const { data } = await api.get(`/api/address/${userId}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      dispatch({ type: GET_USER_ADDRESSES_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: GET_USER_ADDRESSES_FAILURE, payload: error.message });
    }
  };

export const logout=() => async(dispatch) => {
  //  dispatch({type:ADD_TO_FAVORITE_REQUEST})
    try {
        localStorage.clear();
        dispatch({type:LOGOUT})
        console.log("logout success")

    } catch(error) {
        console.log("error",error)
    }
}
