const initialState = {

};

export const leadApp = (state = initialState, action) => {
    switch (action.type) {
        case 'SEARCH_LEAD':
            return {
                showLoader: true,
                error: false,
            };
        case 'SEARCH_LEAD_SUCCESS':
            return {
                showLoader: false,
                error: false,
            };
        case 'SEARCH_LEAD_FAILURE':
            return {
                showLoader: false,
                error: true,
            };
        default:
            return state;
    }
};