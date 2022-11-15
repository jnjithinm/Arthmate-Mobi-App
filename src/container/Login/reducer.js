// import { loginAPI, saveUserData } from './actions';

const initialState = {
    login: {},
    showLoader: false,
    error: false,
};

export const loginApp = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN_API':
            return {
                login: action,
                showLoader: true,
                error: false,
            };
        case 'LOGIN_SUCCESS':
            return {
                login: action,
                showLoader: false,
                error: false,
            };
        case 'LOGIN_FAILURE':
            return {
                login: action,
                showLoader: false,
                error: true,
            };
        default:
            return state;
    }
};