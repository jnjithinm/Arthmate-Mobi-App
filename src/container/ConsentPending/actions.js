const getLeadDetailsAPI = (actions) => {
    return { type: 'GET_LEAD_DETAILS_API', actions: actions };
};
const consentPendingAPI = (actions) => {
    return { type: 'CONSENT_PENDING_API', actions: actions };
};
const deleteLeadAPI = (actions) => {
    return { type: 'DELETE_LEAD_API', actions: actions };
};
const accAggregatorAPI = (actions) => {
    return { type: 'ACC_AGGREGATOR_API', actions: actions };
};
const aggregatorUrlCall = (actions) => {
    return { type: 'AGGREGATOR_URL_CALL', actions: actions };
};
const getConsentStatus = (actions) => {
    return { type: 'GET_CONSENT_STATUS', actions: actions };
};

export {
    deleteLeadAPI,
    getLeadDetailsAPI,
    consentPendingAPI,
    accAggregatorAPI,
    aggregatorUrlCall,
    getConsentStatus
};

