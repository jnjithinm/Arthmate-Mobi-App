const getDDECommonAPI = (actions) => {
    return { type: 'GET_DDE_COMMON_DATA', actions: actions };
};

const ddePrefillData = (actions) => {
    return { type: 'GET_DDE_DATA_SUCCESS', actions: actions };
};

const uploadITRDocumentAPI = (actions) => {
    return { type: 'UPLOAD_ITR_DOCUMENT', actions: actions };

};
const linkToCustomerAPI = (actions) => {
    return { type: 'LINK_TO_CUSTOMER', actions: actions };
};

const deleteITRAPI = (actions) => {
    return { type: 'DELETE_ITR', actions: actions };
};

export {
    getDDECommonAPI,
    ddePrefillData,
    uploadITRDocumentAPI,
    linkToCustomerAPI,
    deleteITRAPI
};