const initialState = {
    loading: false,
    error: false,
};

export const consentReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'CONSENT_PENDING_API':
            return {
                showLoader: true,
                error: false,
            };
        case 'CONSENT_PENDING_API_SUCCESS':
            return {
                showLoader: false,
                error: false,
            };
        case 'CONSENT_PENDING_API_FAILURE':
            return {
                showLoader: false,
                error: true,
            };

        case 'ACC_AGGREGATOR_API':
            return {
                showLoader: true,
                error: false,
            };
        case 'ACC_AGGREGATOR_API_SUCCESS':
            return {
                showLoader: false,
                error: false,
            };
        case 'ACC_AGGREGATOR_API_FAILURE':
            return {
                showLoader: false,
                error: true,
            };

        case 'AGGREGATOR_URL_CALL':
            return {
                showLoader: true,
                error: false,
            };
        case 'AGGREGATOR_URL_CALL_SUCCESS':
            return {
                showLoader: false,
                error: false,
            };
        case 'AGGREGATOR_URL_CALL_FAILURE':
            return {
                showLoader: false,
                error: true,
            };

            case 'GET_CONSENT_STATUS':
                return {
                    showLoader: true,
                    error: false,
                };
            case 'GET_CONSENT_STATUS_SUCCESS':
                return {
                    showLoader: false,
                    error: false,
                };
            case 'GET_CONSENT_STATUS_FAILURE':
                return {
                    showLoader: false,
                    error: true,
                };

        case 'GET_LEAD_DETAILS_API':
            return {
                showLoader: true,
                error: false,
            };
        case 'GET_LEAD_DETAILS_API_SUCCESS':
            return {
                showLoader: false,
                error: false,
            };
        case 'GET_LEAD_DETAILS_API_FAILURE':
            return {
                showLoader: false,
                error: true,
            };
        case 'DELETE_LEAD_API':
            return {
                showLoader: true,
                error: false,
            };
        case 'DELETE_LEAD_API_SUCCESS':
            return {
                showLoader: false,
                error: false,
            };
        case 'DELETE_LEAD_API_FAILURE':
            return {
                showLoader: false,
                error: true,
            };
        default:
            return state;
    }
};