// import { loginAPI, saveUserData } from './actions';

const initialState = {
    QDEData: {},
    showLoader: false,
    error: false,
    saveCoAppGuarantorData: {},
};

export const qdeReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_LOAN_SUMMARY':
            return {
                showLoader: true,
                error: false,
            };
        case 'GET_LOAN_SUMMARY_SUCCESS':
            return {
                QDEData: action.actions,
                showLoader: false,
                error: false,
            };

        case 'GET_LOAN_SUMMARY_FAILURE':
            return {
                showLoader: false,
                error: true,
            };
        case 'GET_QDE_DATA':
            return {
                showLoader: true,
                error: false,
            };
        case 'GET_QDE_DATA_SUCCESS':
            return {
                QDEData: action.actions,
                showLoader: false,
                error: false,
            };

        case 'GET_QDE_DATA_FAILURE':
            return {
                showLoader: false,
                error: true,
            };
        case 'GET_QDE_DATA_SUCCESS':
            return {
                QDEData: action.actions,
                showLoader: false,
                error: false,
            };
        case 'SAVE_CO_APP_GUARANTOR_SUCCESS':
            return {
                saveCoAppGuarantorData: action.actions,
                showLoader: false,
                error: false,
            };
        case 'GET_CO_APP_GUARANTOR':
            return {
                showLoader: true,
                error: false,
            };
        case 'GET_CO_APP_GUARANTOR_SUCCESS':
            return {
                QDEData: action.actions,
                showLoader: false,
                error: false,
            };

        case 'GET_CO_APP_GUARANTOR_FAILURE':
            return {
                showLoader: false,
                error: true,
            };
        case 'SAVE_CO_APP_GUARANTOR':
            return {
                showLoader: true,
                error: false,
            };
        case 'SAVE_CO_APP_GUARANTOR_SUCCESS':
            return {
                QDEData: action.actions,
                showLoader: false,
                error: false,
            };

        case 'SAVE_CO_APP_GUARANTOR_FAILURE':
            return {
                showLoader: false,
                error: true,
            };
        case 'CREATE_CONSENT_COAPP_GUARANTOR':
            return {
                showLoader: true,
                error: false,
            };
        case 'CREATE_CONSENT_COAPP_GUARANTOR_SUCCESS':
            return {
                QDEData: action.actions,
                showLoader: false,
                error: false,
            };

        case 'CREATE_CONSENT_COAPP_GUARANTOR_FAILURE':
            return {
                showLoader: false,
                error: true,
            };
        case 'VERIFY_CONSENT_COAPP_GUARANTOR':
            return {
                showLoader: true,
                error: false,
            };
        case 'VERIFY_CONSENT_COAPP_GUARANTOR_SUCCESS':
            return {
                QDEData: action.actions,
                showLoader: false,
                error: false,
            };

        case 'VERIFY_CONSENT_COAPP_GUARANTOR_FAILURE':
            return {
                showLoader: false,
                error: true,
            };
        case 'DELETE_COAPP_GUARANTOR':
            return {
                showLoader: true,
                error: false,
            };
        case 'DELETE_COAPP_GUARANTOR_SUCCESS':
            return {
                QDEData: action.actions,
                showLoader: false,
                error: false,
            };

        case 'DELETE_COAPP_GUARANTOR_FAILURE':
            return {
                showLoader: false,
                error: true,
            };

            case 'GET_EMP_LIST':
            return {
                showLoader: true,
                error: false,
            };
        case 'GET_EMP_LIST_SUCCESS':
            return {
                showLoader: false,
                error: false,
            };

        case 'GET_EMP_LIST_FAILURE':
            return {
                showLoader: false,
                error: true,
            };
        case 'SUBMIT_DEVIATION':
            return {
                showLoader: true,
                error: false,
            };
        case 'SUBMIT_DEVIATION_SUCCESS':
            return {
                showLoader: false,
                error: false,
            };

        case 'SUBMIT_DEVIATION_FAILURE':
            return {
                showLoader: false,
                error: true,
            };
        default:
            return state;
    }
};