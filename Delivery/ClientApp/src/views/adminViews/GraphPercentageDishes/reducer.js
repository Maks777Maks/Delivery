import GraphPercentageDishesService from './GraphPercentageDishesService';
import update from '../../../helpers/update';
export const ALL_DISHES_STARTED = "ALL_DISHES_STARTED";
export const ALL_DISHES_SUCCESS = "ALL_DISHES_SUCCESS";
export const ALL_DISHES_FAILED = "ALL_DISHES_FAILED";


const initialState = {
    list: {
        data: [],
        loading: false,
        success: false,
        failed: false,
    },   
}

export const getAllSoldDishesData = () => {
    return (dispatch) => {
        dispatch(getListActions.started());
console.log("Dispatch");
        GraphPercentageDishesService.getAllSoldDishes()
            .then((response) => {
                console.log("response", response)
                dispatch(getListActions.success(response));               
            }, err=> { throw err; })
            .catch(err=> {
              dispatch(getListActions.failed(err));
            });
    }
}


export const getListActions = {
    started: () => {
        return {
            type: ALL_DISHES_STARTED
        }
    },  
    success: (data) => {
        console.log("Data", data.data)
        return {
            type: ALL_DISHES_SUCCESS,
            payload: data.data.typeOfCuisines
        }
    },  
    failed: (error) => {
        return {           
            type: ALL_DISHES_FAILED,
            errors: error
        }
    }
  }

export const getAllSoldDishesReducer = (state = initialState, action) => { 
  let newState = state;

  switch (action.type) {

      case ALL_DISHES_STARTED: {
          newState = update.set(state, 'list.loading', true);
          newState = update.set(newState, 'list.success', false);
          newState = update.set(newState, 'list.failed', false);
          break;
      }
      case ALL_DISHES_SUCCESS: {
          newState = update.set(state, 'list.loading', false);
          newState = update.set(newState, 'list.failed', false);
          newState = update.set(newState, 'list.success', true);
          newState = update.set(newState, 'list.data', action.payload);         
          break;
      }
      case ALL_DISHES_FAILED: {
          newState = update.set(state, 'list.loading', false);
          newState = update.set(newState, 'list.success', false);
          newState = update.set(newState, 'list.failed', true);
          break;
      }
      default: {
          return newState;
      }
  }
  return newState;
}