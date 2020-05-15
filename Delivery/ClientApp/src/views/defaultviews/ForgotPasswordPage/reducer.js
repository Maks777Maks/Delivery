import ForgotPasswordService from './ForgotPasswordService';
import update from '../../../helpers/update';
export const SEND_EMAIL_STARTED = "SEND_EMAIL_STARTED";
export const SEND_EMAIL_SUCCESS = "SEND_EMAIL_SUCCESS";
export const SEND_EMAIL_FAILED = "SEND_EMAIL_FAILED";


const initialState = {
    post: {
        loading: false,
        success: false,
        failed: false,
        errors: ''
    }
}

export const ForgotPassword = (model) => {
    return (dispatch) => {
        dispatch(getListActions.started());
        console.log("Received", model);
        ForgotPasswordService.sendEmail(model)
            .then((response) => {
                console.log("response",response);
                dispatch(getListActions.success());               
            }, err=> { throw err; })
            .catch(err=> {
              console.log("Errrrrrr", err.response);
              dispatch(getListActions.failed(err.response));
            });
    }
}

export const getListActions = {
    started: () => {
        return {
            type: SEND_EMAIL_STARTED
        }
    },  
    success: () => {
        return {
            type: SEND_EMAIL_SUCCESS,
        }
    },  
    failed: (error) => {
        return {           
            type: SEND_EMAIL_FAILED,
            errors: error.data
        }
    }
  }

export const forgotPasswordReducer = (state = initialState, action) => { 
  let newState = state;

  switch (action.type) {

      case SEND_EMAIL_STARTED: {
          newState = update.set(state, 'post.loading', true);
          newState = update.set(newState, 'post.success', false);
          newState = update.set(newState, 'post.failed', false);
          break;
      }
      case SEND_EMAIL_SUCCESS: {
          newState = update.set(state, 'post.loading', false);
          newState = update.set(newState, 'post.failed', false);
          newState = update.set(newState, 'post.success', true);   
          break;
      }
      case SEND_EMAIL_FAILED: {
          newState = update.set(state, 'post.loading', false);
          newState = update.set(newState, 'post.success', false);
          newState = update.set(newState, 'post.failed', true);
          newState = update.set(newState, "post.errors", action.errors);
          break;
      }
      default: {
          return newState;
      }
  }
  return newState;
}