import RegisterService from "./RegisterService";
import update from "../../../helpers/update";

export const REGISTER_POST_STARTED = "register/REGISTER_POST_STARTED";
export const REGISTER_POST_SUCCESS = "register/REGISTER_POST_SUCCESS";
export const REGISTER_POST_FAILED = "register/REGISTER_POST_FAILED";

const initialState = {
  post: {
    loading: false,
    success: false,
    failed: false,
    errors: {}
  }
};

export const registerReducer = (state = initialState, action) => {
  let newState = state;

  switch (action.type) {
    case REGISTER_POST_STARTED: {
      newState = update.set(state, "post.loading", true);
      newState = update.set(newState, "post.success", false);
      newState = update.set(newState, "post.errors", {});
      newState = update.set(newState, "post.failed", false);
      break;
    }
    case REGISTER_POST_SUCCESS: {
      newState = update.set(state, "post.loading", false);
      newState = update.set(newState, "post.failed", false);
      newState = update.set(newState, "post.errors", {});
      newState = update.set(newState, "post.success", true);
      break;
    }
    case REGISTER_POST_FAILED: {
      newState = update.set(state, "post.loading", false);
      newState = update.set(newState, "post.success", false);
      newState = update.set(newState, "post.errors", action.errors);
      newState = update.set(newState, "post.failed", true);
      break;
    }
    default: {
      return newState;
    }
  }

  return newState;
};

export const register = model => {
  return dispatch => {
    dispatch(registerActions.started());
    console.log("reduser start", model)
    RegisterService.register(model)
      .then(
        response => {
          dispatch(registerActions.success(response));
        }, err => { throw err; })
      .catch(err => {
        dispatch(registerActions.failed(err.response));
      });
  };
};

export const registerActions = {
  started: () => {
    return {
      type: REGISTER_POST_STARTED
    };
  },

  success: () => {
    return {
      type: REGISTER_POST_SUCCESS
    };
  },

  failed: response => {
    return {
      type: REGISTER_POST_FAILED,
    };
  },
};
