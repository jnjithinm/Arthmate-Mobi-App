// import { loginAPI, saveUserData } from './actions';

const initialState = {
    newLead: {},
};

export const newLeadData = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_LEAD_API':
            return {
                showLoader: true,
                error: false,
            };
        case 'ADD_LEAD_API_SUCCESS':
            return {
                showLoader: false,
                error: false,
            };
        case 'ADD_LEAD_API_FAILURE':
            return {
                showLoader: false,
                error: true,
            };
        case 'DEALER_API':
            return {
                showLoader: true,
                error: false,
            };
        case 'DEALER_API_SUCCESS':
            return {
                showLoader: false,
                error: false,
            };
        case 'DEALER_API_FAILURE':
            return {
                showLoader: false,
                error: true,
            };
        case 'SAVE_NEW_LEAD':
            return {
                newLead: action.actions,
            };
        default:
            return state;
    }
};