
const initialState = {
    showLoader: false,
    error: false,
};

export const versionDetails = (state = initialState, action) => {
    switch (action.type) {

        case 'GET_ANDROID_VERSION':
            return {
                showLoader: true,
                error: false,
            };
        // case 'GET_ANDROID_VERSION_SUCCESS':
        //     return {
        //         showLoader: false,
        //         error: false,
        //     };
        // case 'GET_ANDROID_VERSION_FAILURE':
        //     return {
        //         showLoader: false,
        //         error: true,
        //     };
       
       

        default:
            return state;
    }
};