const initialState = {
    loading: false,
    error: false,
};

export const editReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'EDIT_LEAD_DETAILS_API':
            return {
                showLoader: true,
                error: false,
            };
        case 'EDIT_LEAD_DETAILS_API_SUCCESS':
            return {
                showLoader: false,
                error: false,
            };
        case 'EDIT_LEAD_DETAILS_API_FAILURE':
            return {
                showLoader: false,
                error: true,
            };
        case 'GET_LEAD_DETAILS_EDIT_PAGE_API':
            return {
                showLoader: true,
                error: false,
            };
        case 'GET_LEAD_DETAILS_EDIT_PAGE_API_SUCCESS':
            return {
                showLoader: false,
                error: false,
            };
        case 'GET_LEAD_DETAILS_EDIT_PAGE_API_FAILURE':
            return {
                showLoader: false,
                error: true,
            };
        default:
            return state;
    }
};