const initialState = {
    loading: false,
    error: false,
};

export const loanAgreementReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_ESERVICE_COMMON_DATA':
            return {
                showLoader: true,
                error: false,
            };
        case 'GET_ESERVICE_COMMON_DATA_SUCCESS':
            return {
                showLoader: false,
                error: false,
            };
        case 'GET_ESERVICE_COMMON_DATA_FAILURE':
            return {
                showLoader: false,
                error: true,
            };
            case 'SAVE_SIGN_IN':
                return {
                    showLoader: true,
                    error: false,
                };
            case 'SAVE_SIGN_IN_SUCCESS':
                return {
                    showLoader: false,
                    error: false,
                };
            case 'SAVE_SIGN_IN_FAILURE':
                return {
                    showLoader: false,
                    error: true,
                };
        case 'STAMP_PAPER_API':
            return {
                showLoader: true,
                error: false,
            };
        case 'STAMP_PAPER_API_SUCCESS':
            return {
                showLoader: false,
                error: false,
            };
        case 'STAMP_PAPER_API_FAILURE':
            return {
                showLoader: false,
                error: true,
            };
        case 'LOAN_AGREEMENT_UPLOAD_API':
            return {
                showLoader: true,
                error: false,
            };
        case 'LOAN_AGREEMENT_UPLOAD_API_SUCCESS':
            return {
                showLoader: false,
                error: false,
            };
        case 'LOAN_AGREEMENT_UPLOAD_API_FAILURE':
            return {
                showLoader: false,
                error: true,
            };
        case 'LOAN_AGREEMENT_DELETE_API':
            return {
                showLoader: true,
                error: false,
            };
        case 'LOAN_AGREEMENT_DELETE_API_SUCCESS':
            return {
                showLoader: false,
                error: false,
            };
        case 'LOAN_AGREEMENT_DELETE_API_FAILURE':
            return {
                showLoader: false,
                error: true,
            };
        case 'LOAN_AGREEMENT_DOWNLOAD_API':
            return {
                showLoader: true,
                error: false,
            };
        case 'LOAN_AGREEMENT_DOWNLOAD_API_SUCCESS':
            return {
                showLoader: false,
                error: false,
            };
        case 'LOAN_AGREEMENT_DOWNLOAD_API_FAILURE':
            return {
                showLoader: false,
                error: true,
            };
        default:
            return state;
    }
};