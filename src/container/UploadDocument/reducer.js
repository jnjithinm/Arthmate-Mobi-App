// import { loginAPI, saveUserData } from './actions';

const initialState = {
  panInfoData: {},
  loading: false,
  error: false,
};

export const panReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SAVE_PAN_DATA':
      return {
        panInfoData: action.actions,
        showLoader: true,
        error: false,
      }
    case 'SAVE_PAN_DATA_SUCCESS':
      return {
        panInfoData: action.actions,
        loading: false,
        error: false,
      };
    case 'SAVE_PAN_DATA_FAILURE':
      return {
        panInfoData: action.actions,
        showLoader: false,
        error: true,
      };;
    case 'UPLOAD_PAN_API':
      return {
        showLoader: true,
        error: false,
      };
    case 'UPLOAD_PAN_API_SUCCESS':
      return {
        showLoader: false,
        error: false,
      };
    case 'UPLOAD_PAN_API_FAILURE':
      return {
        showLoader: false,
        error: true,
      };

    default:
      return state;
  }
};