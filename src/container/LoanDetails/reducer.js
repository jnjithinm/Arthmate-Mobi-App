const initialState = {
    loading: false,
    error: false,
};

export const saveloanReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SAVE_UPDATE_LOAN_INFO':
            return {
                showLoader: true,
                error: false,
            };
        case 'SAVE_UPDATE_LOAN_INFO_SUCCESS':
            return {
                showLoader: false,
                error: false,
            };
        case 'SAVE_UPDATE_LOAN_INFO_FAILURE':
            return {
                showLoader: false,
                error: true,
            };
           
        case 'LOAN_VEHICLE_DETAILS':
            return {
                showLoader: false,
                error: false,
            };
        case 'LOAN_VEHICLE_DETAILS_SUCCESS':
            return {
                showLoader: false,
                error: false,
            };
        case 'LOAN_VEHICLE_DETAILS_FAILURE':
            return {
                showLoader: false,
                error: true,
            };

            case 'GET_SCHEME_CODE':
                return {
                    showLoader: false,
                    error: false,
                };
            case 'GET_SCHEME_CODE_SUCCESS':
                return {
                    showLoader: false,
                    error: false,
                };
            case 'GET_SCHEME_CODE_FAILURE':
                return {
                    showLoader: false,
                    error: true,
                };
                case 'GET_SCHEME_Details':
                    return {
                        showLoader: true,
                        error: false,
                    };
                case 'GET_SCHEME_Details_SUCCESS':
                    return {
                        showLoader: false,
                        error: false,
                    };
                case 'GET_SCHEME_Details_FAILURE':
                    return {
                        showLoader: false,
                        error: true,
                    };
                    case 'GET_APPROVE_LOAN_AMOUNT':
                        return {
                            showLoader: true,
                            error: false,
                        };
                    case 'GET_APPROVE_LOAN_AMOUNT_SUCCESS':
                        return {
                            showLoader: false,
                            error: false,
                        };
                    case 'GET_APPROVE_LOAN_AMOUNT_FAILURE':
                        return {
                            showLoader: false,
                            error: true,
                        };

        default:
            return state;
    }
};