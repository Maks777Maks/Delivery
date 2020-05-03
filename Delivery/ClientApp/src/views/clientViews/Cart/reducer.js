import CartService from "./CartService";
import update from "../../../helpers/update";
import * as R from "ramda";
export const ADD_TO_CART2 = "ADD_TO_CART2";

const initialState = [];

// export const getСartData = (model) => {
//   return (dispatch) => {
//     dispatch(getListActions.success());
//   }
    
// };

// export const getListActions = {
//   success: (data) => {
//     return {
//       type: ADD_TO_CART,
//       payload: data.name,
//     };
//   },
// };

export const cartReducer = (state = initialState, action) => {
  let newState = state;

  // switch (action.type) {
  //   case ADD_TO_CART: {
  //     newState = update.set(state);
  //     newState = update.set(newState);
  //     newState = update.set(newState);
  //     newState = update.set(newState, action.payload);
  //     break;
  //   }
  //   default: {
  //     return newState;
  //   }
  // }
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
