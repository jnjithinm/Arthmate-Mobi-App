const initialState = {
    loading: false,
    error: false,
};

export const predisReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'UPLOAD_DISBURSEMENT_DOCUMENT':
            return {
                showLoader: true,
                error: false,
            };
        case 'UPLOAD_DISBURSEMENT_DOCUMENT_SUCCESS':
            return {
                showLoader: false,
                error: false,
            };
        case 'UPLOAD_DISBURSEMENT_DOCUMENT_FAILURE':
            return {
                showLoader: false,
                error: true,
            };
        case 'DELETE_DISBURSEMENT_DOCUMENT':
            return {
                showLoader: true,
                error: false,
            };
        case 'DELETE_DISBURSEMENT_DOCUMENT_SUCCESS':
            return {
                showLoader: false,
                error: false,
            };
        case 'DELETE_DISBURSEMENT_DOCUMENT_FAILURE':
            return {
                showLoader: false,
                error: true,
            };
        case 'GET_DISBURSEMENT_DOCUMENT':
            return {
                showLoader: true,
                error: false,
            };
        case 'GET_DISBURSEMENT_DOCUMENT_SUCCESS':
            return {
                showLoader: false,
                error: false,
            };
        case 'GET_DISBURSEMENT_DOCUMENT_FAILURE':
            return {
                showLoader: false,
                error: true,
            };
        default:
            return state;
    }
};