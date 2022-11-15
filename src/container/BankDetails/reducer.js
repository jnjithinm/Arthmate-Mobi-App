const initialState = {
    loading: false,
    error: false,
};

export const bankReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SAVE_SALARY_SLIP':
            return {
                showLoader: true,
                error: false,
            };
        case 'SAVE_SALARY_SLIP_SUCCESS':
            return {
                showLoader: false,
                error: false,
            };
        case 'SAVE_SALARY_SLIP_FAILURE':
            return {
                showLoader: false,
                error: true,
            };
            case 'GET_FINBIT_URL':
                return {
                    showLoader: true,
                    error: false,
                };
                case 'GET_FINBIT_URL_SUCCESS':
                    return {
                        showLoader: false,
                        error: false,
                    };
                case 'GET_FINBIT_URL_FAILURE':
                    return {
                        showLoader: false,
                        error: true,
                    };
        case 'DELETE_SALARY_SLIP':
            return {
                showLoader: true,
                error: false,
            };
        case 'DELETE_SALARY_SLIP_SUCCESS':
            return {
                showLoader: false,
                error: false,
            };
        case 'DELETE_SALARY_SLIP_FAILURE':
            return {
                showLoader: false,
                error: true,
            };

        case 'FETCH_BANK_STATEMENT':
            return {
                showLoader: true,
                error: false,
            };
        case 'FETCH_BANK_STATEMENT_SUCCESS':
            return {
                showLoader: false,
                error: false,
            };
        case 'FETCH_BANK_STATEMENT_FAILURE':
            return {
                showLoader: false,
                error: true,
            };
        default:
            return state;
    }
};