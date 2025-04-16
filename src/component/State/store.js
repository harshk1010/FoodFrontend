import { applyMiddleware, combineReducers, legacy_createStore } from "redux"
import { authReducer } from "./Authentication/Reducer"
import { thunk } from "redux-thunk"
import restaurantReducer from "./Restaurant/Reducer";
import menuItemReducer from "./Menu/Reducer";
import cartReducer from "./Cart/Reducer";
import { orderReducer } from "./Order/Reducer";
import restaurantsOrderReducer from "./Restaurant Order/Reducer";
import { ingredientReducer } from "./Ingredients/Reducer";
import { addressReducer } from "./Address/Reducer";
import searchFoodReducer from "./Food/Reducer"; 
import reviewReducer from "./Review/Reducer";
//import {favoriteReducer} from "./Favorite/Reducer";
const rooteReducer = combineReducers({
    auth : authReducer,
    restaurant:restaurantReducer,
    menu:menuItemReducer,
    cart:cartReducer,
    order:orderReducer,
    restaurantOrder:restaurantsOrderReducer,
    ingredients:ingredientReducer,
    address: addressReducer,
    searchFood: searchFoodReducer,
    review:reviewReducer,
   // favorite: favoriteReducer,
})

export const store = legacy_createStore(rooteReducer,applyMiddleware(thunk));

