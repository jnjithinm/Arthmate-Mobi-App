const initialState = {
    loading: false,
    error: false,
};

export const otpReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'OTP_VERIFICATION_API':
            return {
                showLoader: true,
                error: false,
            };
        case 'OTP_VERIFICATION_API_SUCCESS':
            return {
                showLoader: false,
                error: false,
            };
        case 'OTP_VERIFICATION_API_FAILURE':
            return {
                showLoader: false,
                error: true,
            };
        default:
            return state;
    }
};