const initialState = {
    loading: false,
    error: false,
};

export const saveSchemes = (state = initialState, action) => {
    switch (action.type) {
        case 'SAVE_SCHEME':
            return {
                showLoader: true,
                error: false,
            };
        case 'SAVE_SCHEME_SUCCESS':
            return {
                showLoader: false,
                error: false,
            };
        case 'SAVE_SCHEME_FAILURE':
            return {
                showLoader: false,
                error: true,
            };
        case 'CREATE_UPDATE_CUSTOMER':
            return {
                showLoader: true,
                error: false,
            };
        case 'CREATE_UPDATE_CUSTOMER_SUCCESS':
            return {
                showLoader: false,
                error: false,
            };
        case 'CREATE_UPDATE_CUSTOMER_FAILURE':
            return {
                showLoader: false,
                error: true,
            };
        default:
            return state;

    }
}