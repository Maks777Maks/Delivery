import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import { connectRouter, routerMiddleware } from "connected-react-router";
import { createHashHistory as createHistory } from "history";

///reducers
import { loginReducer } from "../views/defaultViews/LoginPage/reducer";
import { registerReducer } from "../views/defaultViews/RegisterPage/reducer";
import { getAllUsersReducer } from "../views/adminViews/UsersStats/reducer";
import { getProfileReducer } from "../views/ProfileManager/reducer";
import { forgotPasswordReducer } from "../views/defaultViews/ForgotPasswordPage/reducer";
import { changeImageReducer } from "../components/ChangeImage/reducer";
import { getAllTypesOfDishesReducer } from "../views/clientViews/TypesOfDishes/reducer";
import { getAllDishesReducer } from "../views/clientViews/Dishes/reducer";
import { cartReducer } from "../views/clientViews/Cart/reducer";
import {changePasswordReducer} from '../views/defaultViews/ChangePasswordPage/reducer'
import { bestsellerReducer } from "../views/adminViews/Bestseller/reducer";
import {getAllTypesOfCuisinesReducer} from "../components/TypesOfCuisines/reducer";
import { getAllTypeDishesReducer } from "../views/adminViews/TypeDishesGraph/reducer";
import { getAllSoldDishesReducer } from "../views/adminViews/GraphPercentageDishes/reducer";


// Create browser history to use in the Redux store
const baseUrl = document.getElementsByTagName("base")[0].getAttribute("href");
export const history = createHistory({ basename: baseUrl });

export default function configureStore(history, initialState) {
  const reducers = {
    login: loginReducer,
    register: registerReducer,
    userProfile: getProfileReducer,
    usersStats: getAllUsersReducer,
    changeImage: changeImageReducer,
    forgotPassword: forgotPasswordReducer,
    typesOfDishes: getAllTypesOfDishesReducer,
    dishes: getAllDishesReducer,
    cart: cartReducer,
    changePassword: changePasswordReducer,
    bestseller: bestsellerReducer,
   
    typeDishesGraph: getAllTypeDishesReducer,
    cuisineGraph: getAllSoldDishesReducer,
    typesOfCuisines: getAllTypesOfCuisinesReducer,
  };

  const middleware = [thunk, routerMiddleware(history)];

  // In development, use the browser's Redux dev tools extension if installed
  const enhancers = [];
  const isDevelopment = process.env.NODE_ENV === "development";
  if (
    isDevelopment &&
    typeof window !== "undefined" &&
    window.devToolsExtension
  ) {
    enhancers.push(window.devToolsExtension());
  }

  const rootReducer = combineReducers({
    ...reducers,
    router: connectRouter(history),
  });

  return createStore(
    rootReducer,
    initialState,
    compose(applyMiddleware(...middleware), ...enhancers)
  );
}
