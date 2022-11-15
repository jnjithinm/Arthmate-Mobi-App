const saveSalarySLIP = (actions) => {
    return { type: 'SAVE_SALARY_SLIP', actions: actions };
};

const deleteSalarySLIP = (actions) => {
    return { type: 'DELETE_SALARY_SLIP', actions: actions };
};

const getDDEDETAILS = (actions) => {
    return { type: 'GET_DDE_DETAILS', actions: actions };
};

const fetchBankSTATEMENT = (actions) => {
    return { type: 'FETCH_BANK_STATEMENT', actions: actions };
};

const getFinbitUrl = (actions) => {
    return { type: 'GET_FINBIT_URL', actions: actions };
};
getFinbitUrl
export {
    saveSalarySLIP,
    deleteSalarySLIP,
    getDDEDETAILS,
    fetchBankSTATEMENT,
    getFinbitUrl
};