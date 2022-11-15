const loanVehicleDETAILS = (actions) => {
    return { type: "LOAN_VEHICLE_DETAILS", actions: actions };
}
const loanVehicleBRAND = (actions) => {
    return { type: "LOAN_VEHICLE_BRAND", actions: actions };
}
const loanVehicleMODEL = (actions) => {
    return { type: "LOAN_VEHICLE_MODEL", actions: actions };
}
const loanVehicleSubMODEL = (actions) => {
    return { type: "LOAN_VEHICLE_SUB_MODEL", actions: actions };
}
const loanDEALER = (actions) => {
    return { type: "LOAN_DEALER", actions: actions };
}
const loanSubDEALER = (actions) => {
    return { type: "LOAN_SUB_DEALER", actions: actions };
}
const saveUpdateLoanINFO = (actions) => {
    return { type: "SAVE_UPDATE_LOAN_INFO", actions: actions };
}
const loanMaximumAmount = (actions) => {
    return { type: "LOAN_MAXIMUM_AMOUNT", actions: actions };
}
const getSchemeCode = (actions) => {
    return { type: "GET_SCHEME_CODE", actions: actions };
}
const getSchemeDetails = (actions) => {
    return { type: "GET_SCHEME_Details", actions: actions };
}
const getApprovedLoanAmount = (actions) => {
    return { type: "GET_APPROVE_LOAN_AMOUNT", actions: actions };
}

export {
    loanVehicleDETAILS,
    loanVehicleBRAND,
    loanVehicleMODEL,
    loanVehicleSubMODEL,
    loanDEALER,
    loanSubDEALER,
    saveUpdateLoanINFO,
    loanMaximumAmount,
    getSchemeCode,
    getSchemeDetails,
    getApprovedLoanAmount
};