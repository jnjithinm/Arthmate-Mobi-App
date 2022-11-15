// import { loginAPI, saveUserData } from './actions';

const initialState = {
  userData: {},
  token: "",
  loading: false,
  error: false,
  login: {},
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SAVE_USER_DATA':
      return {
        userData: action.actions,
        token: action.actions.token,
        loading: false,
        error: false,
      };

    case 'CLEAR_ALL_DATA':
      return {
        userData: {},
        token: "",
        loading: false,
        error: false,
        login: {},
        ...action,
      };

    default:
      return state;
  }
};