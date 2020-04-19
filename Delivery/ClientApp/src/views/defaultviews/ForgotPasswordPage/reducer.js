import ForgotPasswordService from './ForgotPasswordService';
import update from '../../../helpers/update';
export const SEND_EMAIL_STARTED = "SEND_EMAIL_STARTED";
export const SEND_EMAIL_SUCCESS = "SEND_EMAIL_SUCCESS";
export const SEND_EMAIL_FAILED = "SEND_EMAIL_AILED";


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
        ForgotPasswordService.SendEmail(model)
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
            type: SEND_EMAIL_STARTED
        }
    },  
    success: (data) => {
        return {
            type: SEND_EMAIL_SUCCESS,
            payload: data.data.email
        }
    },  
    failed: (error) => {
        return {           
            type: SEND_EMAIL_FAILED,
            errors: error
        }
    }
  }

export const getAllUsersReducer = (state = initialState, action) => { 
  let newState = state;

  switch (action.type) {

      case SEND_EMAIL_STARTED: {
          newState = update.set(state, 'list.loading', true);
          newState = update.set(newState, 'list.success', false);
          newState = update.set(newState, 'list.failed', false);
          break;
      }
      case SEND_EMAIL_SUCCESS: {
          newState = update.set(state, 'list.loading', false);
          newState = update.set(newState, 'list.failed', false);
          newState = update.set(newState, 'list.success', true);
          newState = update.set(newState, 'list.data', action.payload);         
          break;
      }
      case SEND_EMAIL_FAILED: {
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