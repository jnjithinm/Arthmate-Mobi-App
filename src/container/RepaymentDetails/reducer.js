const initialState = {
    loading: false,
    error: false,
};

export const repaymentReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SAVE_REPAYMENT_DETAILS':
            return {
                showLoader: true,
                error: false,
            };
        case 'SAVE_REPAYMENT_DETAILS_SUCCESS':
            return {
                showLoader: false,
                error: false,
            };
        case 'SAVE_REPAYMENT_DETAILS_FAILURE':
            return {
                showLoader: false,
                error: true,
            };
            case 'GENERATE_ENACH_TOKEN':
                return {
                    showLoader: true,
                    error: false,
                };
            case 'GENERATE_ENACH_TOKEN_SUCCESS':
                return {
                    showLoader: false,
                    error: false,
                };
            case 'GENERATE_ENACH_TOKEN_FAILURE':
                return {
                    showLoader: false,
                    error: true,
                };
        case 'GET_REPAYMENT_DETAILS':
            return {
                showLoader: true,
                error: false,
            };
        case 'GET_REPAYMENT_DETAILS_SUCCESS':
            return {
                showLoader: false,
                error: false,
            };
        case 'GET_REPAYMENT_DETAILS_FAILURE':
            return {
                showLoader: false,
                error: true,
            };
        case 'SAVE_DISBURSEMENT_REPAYMENT_DETAILS':
            return {
                showLoader: true,
                error: false,
            };
        case 'SAVE_DISBURSEMENT_REPAYMENT_DETAILS_SUCCESS':
            return {
                showLoader: false,
                error: false,
            };
        case 'SAVE_DISBURSEMENT_REPAYMENT_DETAILS_FAILURE':
            return {
                showLoader: false,
                error: true,
            };
        case 'GET_DISBURSEMENT_REPAYMENT_DETAILS':
            return {
                showLoader: true,
                error: false,
            };
        case 'GET_DISBURSEMENT_REPAYMENT_DETAILS_SUCCESS':
            return {
                showLoader: false,
                error: false,
            };
        case 'GET_DISBURSEMENT_REPAYMENT_DETAILS_FAILURE':
            return {
                showLoader: false,
                error: true,
            };
            case 'SUBMIT_ENACH':
                return {
                    showLoader: true,
                    error: false,
                };
            case 'SUBMIT_ENACH_SUCCESS':
                return {
                    showLoader: false,
                    error: false,
                };
            case 'SUBMIT_ENACH_FAILURE':
                return {
                    showLoader: false,
                    error: true,
                };
                case 'GET_ENACH_DATA':
                    return {
                        showLoader: true,
                        error: false,
                    };
                case 'GET_ENACH_DATA_SUCCESS':
                    return {
                        showLoader: false,
                        error: false,
                    };
                case 'GET_ENACH_DATA_FAILURE':
                    return {
                        showLoader: false,
                        error: true,
                    };
                    case 'VALIDATE_VPA':
                        return {
                            showLoader: true,
                            error: false,
                        };
                    case 'VALIDATE_VPA_SUCCESS':
                        return {
                            showLoader: false,
                            error: false,
                        };
                    case 'VALIDATE_VPA_FAILURE':
                        return {
                            showLoader: false,
                            error: true,
                        };
        default:
            return state;
    }
};