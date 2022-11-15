// import { loginAPI, saveUserData } from './actions';

const initialState = {
    DDEData: {},
    showLoader: false,
    error: false,
};

export const ddeReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_DDE_DATA_SUCCESS':
            return {
                DDEData: action.actions,
                showLoader: false,
                error: false,
            };
        case 'LINK_TO_CUSTOMER':
            return {
                showLoader: true,
                error: false,
            };
        case 'LINK_TO_CUSTOMER_SUCCESS':
            return {
                showLoader: false,
                error: false,
            };
        case 'LINK_TO_CUSTOMER_FAILURE':
            return {
                showLoader: false,
                error: true,
            };
        case 'UPLOAD_ITR_DOCUMENT':
            return {
                showLoader: true,
                error: false,
            };
        case 'UPLOAD_ITR_DOCUMENT_SUCCESS':
            return {
                showLoader: false,
                error: false,
            };
        case 'UPLOAD_ITR_DOCUMENT_FAILURE':
            return {
                showLoader: false,
                error: true,
            };
        case 'GET_DDE_COMMON_DATA':
            return {
                showLoader: true,
                error: false,
            };
        case 'GET_DDE_COMMON_DATA_SUCCESS':
            return {
                showLoader: false,
                error: false,
            };
        case 'GET_DDE_COMMON_DATA_FAILURE':
            return {
                showLoader: false,
                error: true,
            };
        default:
            return state;
    }
};