const getEserviceCommonData = (actions) => {
  return { type: "GET_ESERVICE_COMMON_DATA", actions: actions };
};

const requestStampPaper = (actions) => {
  return { type: 'STAMP_PAPER_API', actions: actions };
};
const uploadLoanAgreement = (actions) => {
  return { type: "LOAN_AGREEMENT_UPLOAD_API", actions: actions };
};

const deleteLoanAgreement = (actions) => {
  return { type: "LOAN_AGREEMENT_DELETE_API", actions: actions };
};

const downloadLoanAgreement = (actions) => {
  return { type: "LOAN_AGREEMENT_DOWNLOAD_API", actions: actions };
};
const saveSignIn = (actions) => {
  return { type: "SAVE_SIGN_IN", actions: actions };
}
export {
  getEserviceCommonData,
  requestStampPaper,
  uploadLoanAgreement,
  deleteLoanAgreement,
  downloadLoanAgreement,
  saveSignIn
};
