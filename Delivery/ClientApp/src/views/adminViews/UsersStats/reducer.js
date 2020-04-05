import UsersStatsService from './UsersStatsService';
import update from '../../../helpers/update';
export const ALL_PERSONS_STARTED = "ALL_PERSONS_STARTED";
export const ALL_PERSONS_SUCCESS = "ALL_PERSONS_SUCCESS";
export const ALL_PERSONS_FAILED = "ALL_PERSONS_FAILED";


const initialState = {
    list: {
        data: [],
        loading: false,
        success: false,
        failed: false,
    }
}

export const getAllUsersData = (model) => {
    return (dispatch) => {
        dispatch(getListActions.started());
        UsersStatsService.getAllUsers(model)
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
            type: ALL_PERSONS_STARTED
        }
    },  
    success: (data) => {
        return {
            type: ALL_PERSONS_SUCCESS,
            payload: data.data.users
        }
    },  
    failed: (error) => {
        return {           
            type: ALL_PERSONS_FAILED,
            errors: error
        }
    }
  }

export const getAllUsersReducer = (state = initialState, action) => { 
  let newState = state;

  switch (action.type) {

      case ALL_PERSONS_STARTED: {
          newState = update.set(state, 'list.loading', true);
          newState = update.set(newState, 'list.success', false);
          newState = update.set(newState, 'list.failed', false);
          break;
      }
      case ALL_PERSONS_SUCCESS: {
          newState = update.set(state, 'list.loading', false);
          newState = update.set(newState, 'list.failed', false);
          newState = update.set(newState, 'list.success', true);
          newState = update.set(newState, 'list.data', action.payload);         
          break;
      }
      case ALL_PERSONS_FAILED: {
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