const initialState = {
    loading: false,
    error: false,
};

export const pangstReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'VERIFY_PAN_API':
            return {
                showLoader: true,
                error: false,
            };
        case 'VERIFY_PAN_API_SUCCESS':
            return {
                showLoader: false,
                error: false,
            };
        case 'VERIFY_PAN_API_FAILURE':
            return {
                showLoader: false,
                error: true,
            };
        case 'SAVE_PAN_API':
            return {
                showLoader: true,
                error: false,
            };
        case 'SAVE_PAN_API_SUCCESS':
            return {
                showLoader: false,
                error: false,
            };
        case 'SAVE_PAN_API_FAILURE':
            return {
                showLoader: false,
                error: true,
            };
        case 'DELETE_PAN_API':
            return {
                showLoader: true,
                error: false,
            };
        case 'DELETE_PAN_API_SUCCESS':
            return {
                showLoader: false,
                error: false,
            };
        case 'DELETE_PAN_API_FAILURE':
            return {
                showLoader: false,
                error: true,
            };
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