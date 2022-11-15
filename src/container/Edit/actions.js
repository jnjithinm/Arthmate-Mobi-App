const editLeadDetailsAPI = (actions) => {
    return { type: 'EDIT_LEAD_DETAILS_API', actions: actions };
};

const getLeadDetailsEditPageAPI = (actions) => {
    return { type: 'GET_LEAD_DETAILS_EDIT_PAGE_API', actions: actions };
};
export {
    editLeadDetailsAPI,
    getLeadDetailsEditPageAPI
};

