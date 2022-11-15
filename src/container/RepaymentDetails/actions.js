const saveRepaymentDETAILS = (actions) => {
    return { type: "SAVE_REPAYMENT_DETAILS", actions: actions };
}
const getRepaymentDETAILS = (actions) => {
    return { type: "GET_REPAYMENT_DETAILS", actions: actions };
}
const saveDisbursementRepaymentDETAILS = (actions) => {
    return { type: "SAVE_DISBURSEMENT_REPAYMENT_DETAILS", actions: actions };
}
const getDisbursementRepaymentDETAILS = (actions) => {
    return { type: "GET_DISBURSEMENT_REPAYMENT_DETAILS", actions: actions };
}
const generateEnachToken = (actions) => {
    return { type: "GENERATE_ENACH_TOKEN", actions: actions };
}
const submitEnach = (actions) => {
    return { type: "SUBMIT_ENACH", actions: actions };
}
const getEnachData = (actions) => {
    return { type: "GET_ENACH_DATA", actions: actions };
}

const validateVpa = (actions) => {
    return { type: "VALIDATE_VPA", actions: actions };
}


export {
    saveRepaymentDETAILS,
    getRepaymentDETAILS,
    saveDisbursementRepaymentDETAILS,
    getDisbursementRepaymentDETAILS,
    generateEnachToken,
    submitEnach,
    getEnachData,
    validateVpa
}