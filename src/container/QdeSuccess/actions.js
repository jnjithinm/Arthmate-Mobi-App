const qdeSuccessAPI = (actions) => {
    return { type: 'QDESUCCESS_API', actions: actions };
  };

  const submitToCredit = (actions) => {
    return { type: "SUBMIT_TO_CREDIT_LOAN_API" , actions: actions};
  };

  const getReasonMasterList = (actions) => {
    return { type: "GET_REASON_MASTER_LIST" , actions: actions};
  };
  
  export {
    qdeSuccessAPI,
    submitToCredit,
    getReasonMasterList
  };
  