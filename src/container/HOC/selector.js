import { createSelector } from 'reselect';

const getState = (state) => state;
export const isFetchingSelector = createSelector([getState], (state) => {
  let isFetching = false;
  const fetchingKeys = [];
  Object.keys(state).forEach((key) => {
    if (key === 'hocData' && state[key].showLoader) {
      isFetching = true;
      fetchingKeys.push(key);
    } else if (key === 'loginData' && state[key].showLoader) {
      isFetching = true;
      fetchingKeys.push(key);
    } else if (key === 'dashboardata') {
      Object.keys(state[key]).forEach((authKey) => {
        if (state[key].showLoader) {
          isFetching = true;
          fetchingKeys.push(key);
        }
      });
    } else if (key === 'leadData') {
      Object.keys(state[key]).forEach((authKey) => {
        if (state[key].showLoader) {
          isFetching = true;
          fetchingKeys.push(key);
        }
      });
    } else if (key === 'panData') {
      Object.keys(state[key]).forEach((authKey) => {
        if (state[key].showLoader) {
          isFetching = true;
          fetchingKeys.push(key);
        }
      });
    } else if (key === 'newLeadData') {
      Object.keys(state[key]).forEach((authKey) => {
        if (state[key].showLoader) {
          isFetching = true;
          fetchingKeys.push(key);
        }
      });
    } else if (key === 'editData') {
      Object.keys(state[key]).forEach((authKey) => {
        if (state[key].showLoader) {
          isFetching = true;
          fetchingKeys.push(key);
        }
      });
    } else if (key === 'otpData') {
      Object.keys(state[key]).forEach((authKey) => {
        if (state[key].showLoader) {
          isFetching = true;
          fetchingKeys.push(key);
        }
      });
    } else if (key === 'additionalDetailData') {
      Object.keys(state[key]).forEach((authKey) => {
        if (state[key].showLoader) {
          isFetching = true;
          fetchingKeys.push(key);
        }
      });
    } else if (key === 'ddeData') {
      Object.keys(state[key]).forEach((authKey) => {
        if (state[key].showLoader) {
          isFetching = true;
          fetchingKeys.push(key);
        }
      });
    } else if (key === 'schmes') {
      Object.keys(state[key]).forEach((authKey) => {
        if (state[key].showLoader) {
          isFetching = true;
          fetchingKeys.push(key);
        }
      });
    } else if (key === 'consentData') {
      Object.keys(state[key]).forEach((authKey) => {
        if (state[key].showLoader) {
          isFetching = true;
          fetchingKeys.push(key);
        }
      });
    } else if (key === 'referenceData') {
      Object.keys(state[key]).forEach((authKey) => {
        if (state[key].showLoader) {
          isFetching = true;
          fetchingKeys.push(key);
        }
      });
    } else if (key === 'loanData') {
      Object.keys(state[key]).forEach((authKey) => {
        if (state[key].showLoader) {
          isFetching = true;
          fetchingKeys.push(key);
        }
      });
    } else if (key === 'qdeData') {
      Object.keys(state[key]).forEach((authKey) => {
        if (state[key].showLoader) {
          isFetching = true;
          fetchingKeys.push(key);
        }
      });
    } else if (key === 'loanAgreementData') {
      Object.keys(state[key]).forEach((authKey) => {
        if (state[key].showLoader) {
          isFetching = true;
          fetchingKeys.push(key);
        }
      });
    } else if (key === 'bankData') {
      Object.keys(state[key]).forEach((authKey) => {
        if (state[key].showLoader) {
          isFetching = true;
          fetchingKeys.push(key);
        }
      });
    }
    else if (key === 'repaymentData') {
      Object.keys(state[key]).forEach((authKey) => {
        if (state[key].showLoader) {
          isFetching = true;
          fetchingKeys.push(key);
        }
      });
    }
    else if (key === 'predisData') {
      Object.keys(state[key]).forEach((authKey) => {
        if (state[key].showLoader) {
          isFetching = true;
          fetchingKeys.push(key);
        }
      });
    }
    else if (key === 'businessData') {
      Object.keys(state[key]).forEach((authKey) => {
        if (state[key].showLoader) {
          isFetching = true;
          fetchingKeys.push(key);
        }
      });
    }
  });
  return {
    fetching: isFetching,
    fetchingKeys,
  };
});
