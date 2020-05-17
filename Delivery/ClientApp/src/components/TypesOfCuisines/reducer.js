import TypesOfCuisinesService from "./TypesOfCuisinesService";
import update from "../../helpers/update";
export const ALL_TYPES_CUISINES_STARTED = "ALL_TYPES_CUISINES_STARTED";
export const ALL_TYPES_CUISINES_SUCCESS = "ALL_TYPES_CUISINES_SUCCESS";
export const ALL_TYPES_CUISINES_FAILED = "ALL_TYPES_CUISINES_FAILED";
export const GET_CUISINE_TYPE = "GET_CUISINE_TYPE";

const initialState = {
  list: {
    data: [],
    loading: false,
    success: false,
    failed: false,
    cuisineTypeId: 0,
  },
};

export const getAllTypesOfCuisinesData = (model) => {
  return (dispatch) => {
    dispatch(getListActions.started());
    TypesOfCuisinesService.getAllTypesOfCuisines(model)
      .then(
        (response) => {
          console.log("response", response);
          dispatch(getListActions.success(response));
        },
        (err) => {
          throw err;
        }
      )
      .catch((err) => {
        dispatch(getListActions.failed(err));
      });
  };
};

export const chooseCuisineType = (id) => (dispatch) => {
  dispatch({
    type: GET_CUISINE_TYPE,
    payload: id,
  });
};

export const getListActions = {
  started: () => {
    return {
      type: ALL_TYPES_CUISINES_STARTED,
    };
  },
  success: (data) => {
    return {
      type: ALL_TYPES_CUISINES_SUCCESS,
      payload: data.data.typesOfCuisines,
    };
  },
  failed: (error) => {
    return {
      type: ALL_TYPES_CUISINES_FAILED,
      errors: error,
    };
  },
};

export const getAllTypesOfCuisinesReducer = (state = initialState, action) => {
  let newState = state;

  switch (action.type) {
    case ALL_TYPES_CUISINES_STARTED: {
      newState = update.set(state, "list.loading", true);
      newState = update.set(newState, "list.success", false);
      newState = update.set(newState, "list.failed", false);
      break;
    }
    case ALL_TYPES_CUISINES_SUCCESS: {
      newState = update.set(state, "list.loading", false);
      newState = update.set(newState, "list.failed", false);
      newState = update.set(newState, "list.success", true);
      newState = update.set(newState, "list.data", action.payload);
      break;
    }
    case ALL_TYPES_CUISINES_FAILED: {
      newState = update.set(state, "list.loading", false);
      newState = update.set(newState, "list.success", false);
      newState = update.set(newState, "list.failed", true);
      break;
    }
    case GET_CUISINE_TYPE: {
      newState = update.set(state, "list.loading", false);
      newState = update.set(newState, "list.success", false);
      newState = update.set(newState, "list.failed", true);
      newState = update.set(newState, "list.cuisineTypeId", action.payload);
      break;
    }
    default: {
      return newState;
    }
  }
  return newState;
};
