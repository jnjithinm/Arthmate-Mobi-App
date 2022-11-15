const dealerAPI = (actions) => {
    return { type: 'DEALER_API', actions: actions };
};

const dsaAPI = (actions) => {
    return { type: 'DSA_API', actions: actions };
};

const addLeadAPI = (actions) => {
    return { type: 'ADD_LEAD_API', actions: actions };
};

const saveNewLead = (actions) => {
    return { type: 'SAVE_NEW_LEAD', actions: actions };
};

const branchNAME = (actions) => {
    return { type: 'BRANCH_NAME', actions: actions };
};

export {
    dealerAPI,
    dsaAPI,
    addLeadAPI,
    saveNewLead,
    branchNAME
};