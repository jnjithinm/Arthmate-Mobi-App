const initialState = {
    loading: false,
    error: false,
};

export const saveBusinessReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SAVE_UPDATE_BUSINESS_INFO':
            return {
                showLoader: true,
                error: false,
            };
        case 'SAVE_UPDATE_BUSINESS_INFO_SUCCESS':
            return {
                showLoader: false,
                error: false,
            };
        case 'SAVE_UPDATE_BUSINESS_INFO_FAILURE':
            return {
                showLoader: false,
                error: true,
            };
        case 'UPLOAD_SELFIE':
            return {
                showLoader: true,
                error: false,
            };
        case 'UPLOAD_SELFIE_SUCCESS':
            return {
                showLoader: false,
                error: false,
            };
        case 'UPLOAD_SELFIE_FAILURE':
            return {
                showLoader: false,
                error: true,
            };
        case 'DELETE_SELFIE':
            return {
                showLoader: true,
                error: false,
            };
        case 'DELETE_SELFIE_SUCCESS':
            return {
                showLoader: false,
                error: false,
            };
        case 'DELETE_SELFIE_FAILURE':
            return {
                showLoader: false,
                error: true,
            };
        case 'VERIFY_BANK_ACC_NO':
            return {
                showLoader: true,
                error: false,
            };
        case 'VERIFY_BANK_ACC_NO_SUCCESS':
            return {
                showLoader: false,
                error: false,
            };
        case 'VERIFY_BANK_ACC_NO_FAILURE':
            return {
                showLoader: false,
                error: true,
            };

        case 'CREATE_CUSTOMER':
            return {
                showLoader: true,
                error: false,
            };
        case 'CREATE_CUSTOMER_SUCCESS':
            return {
                showLoader: false,
                error: false,
            };
        case 'CREATE_CUSTOMER_FAILURE':
            return {
                showLoader: false,
                error: true,
            };


        case 'IFSC_CODE':
            return {
                showLoader: true,
                error: false,
            };
        case 'IFSC_CODE_SUCCESS':
            return {
                showLoader: false,
                error: false,
            };
        case 'IFSC_CODE_FAILURE':
            return {
                showLoader: false,
                error: true,
            };
        default:
            return state;
    }
};