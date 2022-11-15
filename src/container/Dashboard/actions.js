const dashboardAPI = (actions) => {
    return { type: 'DASHBOARD_API', actions: actions };
};
const getUserDetails = (actions) => {
    return { type: 'GET_USER_DETAILS', actions: actions };
};
const globalLogin = (actions) => {
    return { type: 'GLOBAL_LOGIN', actions: actions };
};
export {
    dashboardAPI,
    globalLogin,
    getUserDetails
};

