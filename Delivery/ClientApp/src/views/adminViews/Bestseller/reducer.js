import BestsellerService from "./BestsellerService";
import update from "../../../helpers/update";
export const DISHES_STARTED = "DISHES_STARTED";
export const DISHES_SUCCESS = "DISHES_SUCCESS";
export const DISHES_FAILED = "DISHES_FAILED";


const initialState = {
    list: {
        data: [],
        loading: false,
        success: false,
        failed: false,
    },   
}

export const getDishesData = (model) => {
    return (dispatch) => {
        dispatch(getListActions.started());
        BestsellerService.getAllDishes(model)
            .then((response) => {
                console.log("response", response);
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
            type: DISHES_STARTED
        }
    },  
    success: (data) => {
        return {
            type: DISHES_SUCCESS,
            payload: data.data.dishes
        }
    },  
    failed: (error) => {
        return {           
            type: DISHES_FAILED,
            errors: error
        }
    }
  }

  export const bestsellerReducer = (state = initialState, action) => { 
    let newState = state;
  
    switch (action.type) {
  
        case DISHES_STARTED: {
            newState = update.set(state, 'list.loading', true);
            newState = update.set(newState, 'list.success', false);
            newState = update.set(newState, 'list.failed', false);
            break;
        }
        case DISHES_SUCCESS: {
            newState = update.set(state, 'list.loading', false);
            newState = update.set(newState, 'list.failed', false);
            newState = update.set(newState, 'list.success', true);
            newState = update.set(newState, 'list.data', action.payload);         
            break;
        }
        case DISHES_FAILED: {
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