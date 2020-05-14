import ChangePasswordService from './ChangePasswordService';
import update from '../../../helpers/update';
export const CHANGE_PASSWORD_STARTED = "CHANGE_PASSWORD_STARTED";
export const CHANGE_PASSWORD_SUCCESS = "CHANGE_PASSWORD_SUCCESS";
export const CHANGE_PASSWORD_FAILED = "CHANGE_PASSWORD_FAILED";


const initialState = {
    post: {
        loading: false,
        success: false,
        failed: false,
    }
}

export const ChangePassword = (model) => {
    return (dispatch) => {
        dispatch(getListActions.started());
        console.log(model);
        ChangePasswordService.ChangePassword(model)
            .then((response) => {
                console.log("response",response);
                dispatch(getListActions.success());               
            }, err=> { throw err; })
            .catch(err=> {
              dispatch(getListActions.failed(err));
            });
    }
}

export const getListActions = {
    started: () => {
        return {
            type: CHANGE_PASSWORD_STARTED
        }
    },  
    success: () => {
        return {
            type: CHANGE_PASSWORD_SUCCESS,
        }
    },  
    failed: (error) => {
        return {           
            type: CHANGE_PASSWORD_FAILED,
            errors: error
        }
    }
  }

export const changePasswordReducer = (state = initialState, action) => { 
  let newState = state;

  switch (action.type) {

      case CHANGE_PASSWORD_STARTED: {
          newState = update.set(state, 'post.loading', true);
          newState = update.set(newState, 'post.success', false);
          newState = update.set(newState, 'post.failed', false);
          break;
      }
      case CHANGE_PASSWORD_SUCCESS: {
          newState = update.set(state, 'post.loading', false);
          newState = update.set(newState, 'post.failed', false);
          newState = update.set(newState, 'post.success', true);
          break;
      }
      case CHANGE_PASSWORD_FAILED: {
          newState = update.set(state, 'post.loading', false);
          newState = update.set(newState, 'post.success', false);
          newState = update.set(newState, 'post.failed', true);
          break;
      }
      default: {
          return newState;
      }
  }
  return newState;
}