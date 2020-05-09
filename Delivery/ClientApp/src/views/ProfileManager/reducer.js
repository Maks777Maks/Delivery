import ProfileManagerService from './ProfileManagerService';
import update from '../../helpers/update';

export const PROFILE_GET_INFO_STARTED = "PROFILE_GET_INFO_STARTED";
export const PROFILE_GET_INFO_SUCCESS = "PROFILE_GET_INFO_SUCCESS";
export const PROFILE_GET_INFO_FAILED = "PROFILE_GET_INFO_FAILED";

export const PROFILE_SET_BASE_INFO_STARTED = "PROFILE_SET_BASE_INFO_STARTED";
export const PROFILE_SET_BASE_INFO_SUCCESS = "PROFILE_SET_BASE_INFO_SUCCESS";
export const PROFILE_SET_BASE_INFO_FAILED = "PROFILE_SET_BASE_INFO_FAILED";

export const PROFILE_SET_NEW_PASSWORD_STARTED = "PROFILE_SET_NEW_PASSWORD_STARTED";
export const PROFILE_SET_NEW_PASSWORD_SUCCESS = "PROFILE_SET_NEW_PASSWORD_SUCCESS";
export const PROFILE_SET_NEW_PASSWORD_FAILED = "PROFILE_SET_NEW_PASSWORD_FAILED";


const initialState = {
    list: {
        data: [],
        loading: false,
        success: false,
        failed: false,
    }
}

export const getListActions = {
    started: () => {
        return {
            type: PROFILE_GET_INFO_STARTED
        }
    },
    success: (data) => {
        return {
            type: PROFILE_GET_INFO_SUCCESS,
            payload: data.data
        }
    },
    failed: (error) => {
        return {
            type: PROFILE_GET_INFO_FAILED,
            errors: error
        }
    },
    set_started: () => {
        return {
            type: PROFILE_SET_BASE_INFO_STARTED
        }
    },
    set_success: (data) => {
        return {
            type: PROFILE_SET_BASE_INFO_SUCCESS,
            payload: data.data
        }
    },
    set_failed: (error) => {
        return {
            type: PROFILE_SET_BASE_INFO_FAILED,
            errors: error
        }
    },
    set_password_started: () => {
        return {
            type: PROFILE_SET_NEW_PASSWORD_STARTED
        }
    },
    set_password_success: () => {
        return {
            type: PROFILE_SET_NEW_PASSWORD_SUCCESS,
        }
    },
    set_password_failed: (error) => {
        return {
            type: PROFILE_SET_NEW_PASSWORD_FAILED,
            errors: error
        }
    }
}

export const getUserProfile = (model) => {
    return (dispatch) => {
        dispatch(getListActions.started());
        ProfileManagerService.getUserProfile(model)
            .then((response) => {
                dispatch(getListActions.success(response));
            }, err => { throw err; })
            .catch(err => {
                dispatch(getListActions.failed(err));
            });
    }
}

export const setUserBaseInfoProfile = (model) => {
    return (dispatch) => {
        dispatch(getListActions.set_started());
        ProfileManagerService.setUserBaseInfoProfile(model)
            .then((response) => {
                dispatch(getListActions.set_success(response));
            }, err => { throw err; })
            .catch(err => {
                dispatch(getListActions.set_failed(err));
            });
    }
}

export const setNewPasswordProfile = (model) => {
    return (dispatch) => {
        dispatch(getListActions.set_password_started());
        ProfileManagerService.setNewPasswordProfile(model)
            .then((response) => {
                dispatch(getListActions.set_password_success());
            }, err => { throw err; })
            .catch(err => {
                dispatch(getListActions.set_password_failed(err));
            });
    }
}

export const getProfileReducer = (state = initialState, action) => {
    let newState = state;
    switch (action.type) {
        case PROFILE_GET_INFO_STARTED: {
            newState = update.set(state, 'list.loading', true);
            newState = update.set(newState, 'list.success', false);
            newState = update.set(newState, 'list.failed', false);
            break;
        }
        case PROFILE_GET_INFO_SUCCESS: {
            newState = update.set(state, 'list.loading', false);
            newState = update.set(newState, 'list.failed', false);
            newState = update.set(newState, 'list.success', true);
            newState = update.set(newState, 'list.data', action.payload);
            break;
        }
        case PROFILE_GET_INFO_FAILED: {
            newState = update.set(state, 'list.loading', false);
            newState = update.set(newState, 'list.success', false);
            newState = update.set(newState, 'list.failed', true);
            break;
        }
        case PROFILE_SET_BASE_INFO_STARTED: {
            newState = update.set(state, 'list.loading', true);
            newState = update.set(newState, 'list.success', false);
            newState = update.set(newState, 'list.failed', false);
            break;
        }
        case PROFILE_SET_BASE_INFO_SUCCESS: {
            newState = update.set(state, 'list.loading', false);
            newState = update.set(newState, 'list.failed', false);
            newState = update.set(newState, 'list.success', true);
            newState = update.set(newState, 'list.data', action.payload);
            break;
        }
        case PROFILE_SET_BASE_INFO_FAILED: {
            newState = update.set(state, 'list.loading', false);
            newState = update.set(newState, 'list.success', false);
            newState = update.set(newState, 'list.failed', true);
            break;
        }

        case PROFILE_SET_NEW_PASSWORD_STARTED: {
            newState = update.set(state, 'list.loading', true);
            newState = update.set(newState, 'list.success', false);
            newState = update.set(newState, 'list.failed', false);
            break;
        }
        case PROFILE_SET_NEW_PASSWORD_SUCCESS: {
            newState = update.set(state, 'list.loading', false);
            newState = update.set(newState, 'list.failed', false);
            newState = update.set(newState, 'list.success', true);
            break;
        }
        case PROFILE_SET_NEW_PASSWORD_FAILED: {
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