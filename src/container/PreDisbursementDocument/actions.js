const uploadDisbusementDOCUMENT = (actions) => {
    return { type: 'UPLOAD_DISBURSEMENT_DOCUMENT', actions: actions };
};

const deleteDisbursementDOCUMENT = (actions) => {
    return { type: 'DELETE_DISBURSEMENT_DOCUMENT', actions: actions };
};

const getDisbursementDOCUMENT = (actions) => {
    return { type: 'GET_DISBURSEMENT_DOCUMENT', actions: actions };
};

export {
    uploadDisbusementDOCUMENT,
    deleteDisbursementDOCUMENT,
    getDisbursementDOCUMENT,
};