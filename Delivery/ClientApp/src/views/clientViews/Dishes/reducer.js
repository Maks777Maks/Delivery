import DishesService from "./DishesService";
import update from "../../../helpers/update";
export const ALL_DISHES_STARTED = "ALL_DISHES_STARTED";
export const ALL_DISHES_SUCCESS = "ALL_DISHES_SUCCESS";
export const ALL_DISHES_FAILED = "ALL_DISHES_FAILED";
export const ADD_TO_CART = "ADD_TO_CART";

const initialState = {
  list: {
    data: [],
    cart: [],
    loading: false,
    success: false,
    failed: false,
    totCount: 555,
  },
};

export const getAllDishesData = (model) => {
  return (dispatch) => {
    dispatch(getListActions.started());
    DishesService.getAllDishes(model)
      .then(
        (response) => {
          console.log("response", response);
          dispatch(getListActions.success(response));
        },
        (err) => {
          throw err;
        }
      )
      .catch((err) => {
        dispatch(getListActions.failed(err));
      });
  };
};

// export const addToCart = () => {
//     return (dispatch) => {
//         dispatch(getCartListActions.success());
       
//     }
// }

// export const getCartListActions  = {
//   //data - added dish arr
 
//   success: (newCart) => {
//       console.log("newCart" + newCart);
//     return {
//       type: ADD_TO_CART,
//       payload: newCart,
//     };
//   },
// };


export const addDishToBasket = name => dispatch => {
  console.log("newCartDish" + name);
  dispatch({
    type: ADD_TO_CART,
    payload: name
  })
}



export const getListActions = {
  started: () => {
    return {
      type: ALL_DISHES_STARTED,
    };
  },
  success: (data) => {
    return {
      type: ALL_DISHES_SUCCESS,
      payload: data.data.dishes,
    };
  },
  failed: (error) => {
    return {
      type: ALL_DISHES_FAILED,
      errors: error,
    };
  },
};

export const getAllDishesReducer = (state = initialState, action) => {
  let newState = state;

  switch (action.type) {
    case ALL_DISHES_STARTED: {
      newState = update.set(state, "list.loading", true);
      newState = update.set(newState, "list.success", false);
      newState = update.set(newState, "list.failed", false);
      break;
    }
    case ALL_DISHES_SUCCESS: {
      newState = update.set(state, "list.loading", false);
      newState = update.set(newState, "list.failed", false);
      newState = update.set(newState, "list.success", true);
      newState = update.set(newState, "list.data", action.payload);
      break;
    }
    case ALL_DISHES_FAILED: {
      newState = update.set(state, "list.loading", false);
      newState = update.set(newState, "list.success", false);
      newState = update.set(newState, "list.failed", true);
      break;
    }
    case ADD_TO_CART: {
      newState = update.set(state, "list.loading", false);
      newState = update.set(newState, "list.success", false);
      newState = update.set(newState, "list.failed", true);
      newState = update.set(newState, "list.cart", action.payload);
      console.log("newState: " + newState.list.cart);
      break;
    }
    default: {
      return newState;
    }
  }
  return newState;
};
