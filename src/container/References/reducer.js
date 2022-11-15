const initialState = {
    loading: false,
    error: false,
};

export const referenceReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SAVE_UPDATE_FAMILY_REFERENCE':
            return {
                showLoader: true,
                error: false,
            };
        case 'SAVE_UPDATE_FAMILY_REFERENCE_SUCCESS':
            return {
                showLoader: false,
                error: false,
            };
        case 'SAVE_UPDATE_FAMILY_REFERENCE_FAILURE':
            return {
                showLoader: false,
                error: true,
            };
        case 'SAVE_UPDATE_NON_FAMILY_REFERENCE':
            return {
                showLoader: true,
                error: false,
            };
        case 'SAVE_UPDATE_NON_FAMILY_REFERENCE_SUCCESS':
            return {
                showLoader: false,
                error: false,
            };
        case 'SAVE_UPDATE_NON_FAMILY_REFERENCE_FAILURE':
            return {
                showLoader: false,
                error: true,
            };
        default:
            return state;
    }
};