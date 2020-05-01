import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import createHistory from 'history/createHashHistory';

///reducers
import {loginReducer} from '../views/defaultViews/LoginPage/reducer';
import {getAllUsersReducer} from '../views/adminViews/UsersStats/reducer';
import {getAllTypesOfDishesReducer} from '../views/clientViews/TypesOfDishes/reducer';
import {getAllDishesReducer} from '../views/clientViews/Dishes/reducer';
import {cartReducer} from '../views/clientViews/Cart/reducer';


// Create browser history to use in the Redux store
const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');
export const history = createHistory({ basename: baseUrl });

export default function configureStore(history, initialState) {
  const reducers = {
    login: loginReducer,
    usersStats: getAllUsersReducer,
    typesOfDishes: getAllTypesOfDishesReducer,
    dishes: getAllDishesReducer,
cart: cartReducer

  };

  const middleware = [
    thunk,
    routerMiddleware(history)
  ];

  // In development, use the browser's Redux dev tools extension if installed
  const enhancers = [];
  const isDevelopment = process.env.NODE_ENV === 'development';
  if (isDevelopment && typeof window !== 'undefined' && window.devToolsExtension) {
    enhancers.push(window.devToolsExtension());
  }



  const rootReducer = combineReducers({
    ...reducers,
    router: connectRouter(history)
  });

  return createStore(
    rootReducer,
    initialState,
    compose(applyMiddleware(...middleware), ...enhancers)
  );
}
