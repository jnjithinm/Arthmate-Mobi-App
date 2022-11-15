const businessSECTOR = (actions) => {
    return { type: "BUSINESS_SECTOR", actions: actions };
}
const businessINDUSTRY = (actions) => {
    return { type: "BUSINESS_INDUSTRY", actions: actions };
}
const businessSUBINDUSTRY = (actions) => {
    return { type: "BUSINESS_SUB_INDUSTRY", actions: actions };
}
const businessSEGMENT = (actions) => {
    return { type: "BUSINESS_SEGMENT", actions: actions };
}
const saveUpdateBusinessINFO = (actions) => {
    return { type: "SAVE_UPDATE_BUSINESS_INFO", actions: actions };
}
const createCustomer = (actions) => {
    return { type: "CREATE_CUSTOMER", actions: actions };
}
const ifscCODE = (actions) => {
    return { type: "IFSC_CODE", actions: actions };
}
const verifyBankAccoutNumber = (actions) => {
    return { type: "VERIFY_BANK_ACC_NO", actions: actions };
}
const uploadSelfie = (actions) => {
    return { type: "UPLOAD_SELFIE", actions: actions };
}
const deleteSelfie = (actions) => {
    return { type: "DELETE_SELFIE", actions: actions };
}
export {
    businessSECTOR,
    businessINDUSTRY,
    businessSUBINDUSTRY,
    businessSEGMENT,
    saveUpdateBusinessINFO,
    ifscCODE,
    createCustomer,
    uploadSelfie,
    deleteSelfie,
    verifyBankAccoutNumber
};