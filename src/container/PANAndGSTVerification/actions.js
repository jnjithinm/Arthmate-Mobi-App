const getEntityAPI = (actions) => {
    return { type: 'GET_ENTITY_API', actions: actions };
};


const verifyPANAPI = (actions) => {
    return { type: 'VERIFY_PAN_API', actions: actions };
};

const savePANAPI = (actions) => {
    return { type: 'SAVE_PAN_API', actions: actions };
};

const deletePANAPI = (actions) => {
    return { type: 'DELETE_PAN_API', actions: actions };
};

const gstWrapperAPI = (actions) => {
    return { type: 'GST_WRAPPER_API', actions: actions };
};

export {
    getEntityAPI,
    verifyPANAPI,
    savePANAPI,
    deletePANAPI,
    gstWrapperAPI
};

