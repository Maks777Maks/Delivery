import CartService from "./CartService";
import update from "../../../helpers/update";
import * as R from "ramda";
export const ADD_TO_CART = "ADD_TO_CART";

const initialState = [];

export const getСartData = (model) => {
  return (dispatch) => {
    dispatch(getListActions.success());
  }
    
};

export const getListActions = {
  success: (data) => {
    return {
      type: ADD_TO_CART,
      payload: data.data.name,
    };
  },
};

export const cartReducer = (state = initialState, action) => {
  let newState = state;

  switch (action.type) {
    case ADD_TO_CART: {
      newState = update.set(state, "list.loading", false);
      newState = update.set(newState, "list.failed", false);
      newState = update.set(newState, "list.success", true);
      newState = update.set(newState, "list.data", action.payload);
      break;
    }
    default: {
      return newState;
    }
  }
  return newState;
};

/*


export const AddToCart = (model) => {
    return (dispatch) => {
        dispatch(getListActions.success());
       
    }
}

export const getListActions = {
  
    success: (data) => {
    
        return {
            type: ADD_TO_CART,
                        payload: data.id
                        
        }
    },  
   
  }
   


export const cartReducer = (state = initialState, {type, payload} ) => { 
 
  switch (type) {

      case ADD_TO_CART:
          return R.append(payload, state)
     
      default: 
          return state;
      
  }

}
*/
