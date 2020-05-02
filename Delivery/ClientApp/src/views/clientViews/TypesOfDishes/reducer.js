import TypesOfDishesService from './TypesOfDishesService';
import update from '../../../helpers/update';
export const ALL_TYPES_DISHES_STARTED = "ALL_TYPES_DISHES_STARTED";
export const ALL_TYPES_DISHES_SUCCESS = "ALL_TYPES_DISHES_SUCCESS";
export const ALL_TYPES_DISHES_FAILED = "ALL_TYPES_DISHES_FAILED";


const initialState = {
    list: {
        data: [],
        loading: false,
        success: false,
        failed: false,
    }
}

export const getAllTypesOfDishesData = (model) => {
    return (dispatch) => {
        dispatch(getListActions.started());
        TypesOfDishesService.getAllTypesOfDishes(model)
            .then((response) => {
                console.log("response",response);
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
            type: ALL_TYPES_DISHES_STARTED
        }
    },  
    success: (data) => {
    
        return {
            type: ALL_TYPES_DISHES_SUCCESS,
                        payload: data.data.typeOfDishes
                        
        }
    },  
    failed: (error) => {
        return {           
            type: ALL_TYPES_DISHES_FAILED,
            errors: error
        }
    }
  }

export const getAllTypesOfDishesReducer = (state = initialState, action) => { 
  let newState = state;

  switch (action.type) {

      case ALL_TYPES_DISHES_STARTED: {
          newState = update.set(state, 'list.loading', true);
          newState = update.set(newState, 'list.success', false);
          newState = update.set(newState, 'list.failed', false);
          break;
      }
      case ALL_TYPES_DISHES_SUCCESS: {
          newState = update.set(state, 'list.loading', false);
          newState = update.set(newState, 'list.failed', false);
          newState = update.set(newState, 'list.success', true);
          newState = update.set(newState, 'list.data', action.payload);         
          break;
      }
      case ALL_TYPES_DISHES_FAILED: {
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