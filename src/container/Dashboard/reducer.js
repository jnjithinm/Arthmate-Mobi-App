const initialState = {
    loading: false,
    error: false,
};

export const dashboardReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'DASHBOARD_API':
            return {
                showLoader: true,
                error: false,
            };
        case 'DASHBOARD_API_SUCCESS':
            return {
                showLoader: false,
                error: false,
            };
        case 'DASHBOARD_API_FAILURE':
            return {
                showLoader: false,
                error: true,
            };
            case 'GET_USER_DETAILS':
                return {
                    showLoader: true,
                    error: false,
                };
            case 'GET_USER_DETAILS_SUCCESS':
                return {
                    showLoader: false,
                    error: false,
                };
            case 'GET_USER_DETAILS_FAILURE':
                return {
                    showLoader: false,
                    error: true,
                };
                case 'GLOBAL_LOGIN':
                    return {
                        showLoader: true,
                        error: false,
                    };
                case 'GLOBAL_LOGIN_SUCCESS':
                    return {
                        showLoader: false,
                        error: false,
                    };
                case 'GLOBAL_LOGIN_FAILURE':
                    return {
                        showLoader: false,
                        error: true,
                    };
        default:
            return state;
    }
};