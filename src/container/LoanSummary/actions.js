const getLoanSummary = (actions) => {
    return { type: "GET_LOAN_SUMMARY", actions: actions };
}

const getQDEData = (actions) => {
    return { type: "GET_QDE_DATA", actions: actions };
}

const qdePrefillData = (actions) => {
    return { type: 'GET_QDE_DATA_SUCCESS', actions: actions }
}

const getCoAppGuarantor = (actions) => {
    return { type: 'GET_CO_APP_GUARANTOR', actions: actions }
}

const saveCoAppGuarantor = (actions) => {
    return { type: 'SAVE_CO_APP_GUARANTOR', actions: actions }
}

const savecoAppGuarantorData = (actions) => {
    return { type: 'SAVE_CO_APP_GUARANTOR_SUCCESS', actions: actions }
}

const createConsentCoAppGuarantor = (actions) => {
    return { type: 'CREATE_CONSENT_COAPP_GUARANTOR', actions: actions }
}

const deleteCoAppGuarantor = (actions) => {
    return { type: 'DELETE_COAPP_GUARANTOR', actions: actions }
}

const verifyConentCoAppGuarantor = (actions) => {
    return { type: 'VERIFY_CONSENT_COAPP_GUARANTOR', actions: actions }
}

const getEmpList = (actions) => {
    return { type: 'GET_EMP_LIST', actions: actions }
}

const submitdeviation = (actions) => {
    return { type: 'SUBMIT_DEVIATION', actions: actions }
}

export {
    getLoanSummary,
    getQDEData,
    qdePrefillData,
    getCoAppGuarantor,
    saveCoAppGuarantor,
    savecoAppGuarantorData,
    createConsentCoAppGuarantor,
    deleteCoAppGuarantor,
    verifyConentCoAppGuarantor,
    getEmpList,
    submitdeviation
};