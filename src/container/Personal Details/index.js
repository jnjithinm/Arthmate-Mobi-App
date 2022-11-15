import axios from 'axios';
import { showMessage } from 'react-native-flash-message';
import RNFetchBlob from 'rn-fetch-blob';
import { config } from '../../../config';
import { handleError } from '../../../utils';
import { hideLoader, showLoader } from '../HOC/actions';

const getResponse = (apiResponse, parsed = false) => {
  if (!apiResponse?.data.error) {
    // !JSON.parse(apiResponse?.data).error || 
    showMessage({
      message: apiResponse?.data?.message || JSON.parse(apiResponse?.data)?.message,
      type: 'success',
    });
    return parsed
      ? JSON.parse(apiResponse?.data)?.data
      : apiResponse?.data?.data;
  } else {
    showMessage({
      message: 
      // JSON.parse(apiResponse?.data)?.message || 
      apiResponse?.data?.message,
      type: 'danger',
    });
    return [];
  }
};

const getResponse1 = (apiResponse, parsed = false) => {
  if (!apiResponse?.data?.error) {
    return parsed
      ? JSON.parse(apiResponse?.data)?.data
      : apiResponse?.data?.data;
  } else {
    return [];
  }
};

export const getDropdownList = async ({ token, dispatch, ...payload }) => {
  dispatch(showLoader());
  const response = {
    qualificationList: [],
    martialStatus: [],
    relationWithMainApplicantList: [],
    bankAccountType: [],
  };
  const requestOption = {
    method: 'GET',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    requestOption.url = config.GET_QUALIFICATION;
    response.qualificationList = getResponse1(await axios(requestOption));
    requestOption.url = config.GET_RELATION_WITH_MAINAPPLICANT;
    response.relationWithMainApplicantList = getResponse1(await axios(requestOption),);
    requestOption.url = config.GET_MARTIAL_STATUS;
    response.martialStatus = getResponse1(await axios(requestOption));
    requestOption.url = config.GET_BANK_ACCOUNT_TYPE;
    response.bankAccountType = getResponse1(await axios(requestOption));
  } catch (err) {
  } finally {
    dispatch(hideLoader());
    return response;
  }
};

export const savePersonaleDetails = async ({ token, dispatch, ...payload }) => {
  dispatch(showLoader());
  let response;
  const requestOption = {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    data: payload,
    url: config.SAVE_PERSONAL_DETAILS,
  };
  try {
    const apiResponse = getResponse(await axios(requestOption));
    // response = apiResponse.data.error;
  } catch (err) {
    response = true;
  } finally {
    dispatch(hideLoader());
    return response;
  }
};

export const createUpdateCUSTOMER = async ({ token, dispatch, ...payload }) => {
  dispatch(showLoader());
  let response;
  const requestOption = {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    data: payload,
    url: config.CREATEUPDATE_CUSTOMER,
  };
  try {
    const apiResponse = getResponse(await axios(requestOption));
    response = apiResponse;
  } catch (err) {
    response = err;
  } finally {
    dispatch(hideLoader());
    return response;
  }
};

export const getQDEDataAPI = async ({ token, dispatch, ...payload }) => {

  dispatch(showLoader());
  let response;
  const requestOption = {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    data: payload,
    url: config.GET_QDE_COMMON_API,
  };
  try {
    const apiResponse = getResponse(await axios(requestOption));
    response = apiResponse;
  } catch (err) {
    response = err;
  } finally {
    dispatch(hideLoader());
    return response;
  }
};

export const getQdeSectionDetails = async ({ token, dispatch, ...payload }) => {
  dispatch(showLoader());
  let response;
  const requestOption = {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    url: config.GET_QDE_COMMON_API,
    data: payload,
  };

  try {
    response = getResponse1(await axios(requestOption));
  } catch (err) {
    handleError(err)
    response = {};
  } finally {
    dispatch(hideLoader());
    return response;
  }
};

export const uploadSelfie = async ({
  token,
  dispatch,
  fileName,
  filePath,
  ...payload
}) => {
  //dispatch(showLoader());
  let response;
  try {
    const apiResponse = await RNFetchBlob.fetch(
      'POST',
      config.UPLOAD_SELFIE,
      {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
      [
        // part file from storage
        {
          name: 'file',
          filename: fileName,
          data: RNFetchBlob.wrap(filePath),
        },
        {
          name: 'personalInfo',
          data: JSON.stringify(payload),
        },
      ],
    );
    response = getResponse(apiResponse, true);
  } catch (err) {
    response = {};
    handleError(err)
  } finally {
    //dispatch(hideLoader());
    return response;
  }
};

export const deleteSelfie = async ({ token, dispatch, ...payload }) => {
  let response;
  const requestOption = {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    url: config.DELETE_SELFIE,
    data: payload,
  };

  try {
    response = getResponse(await axios(requestOption));
  } catch (err) {

    handleError(err)
    response = {};
  } finally {
    dispatch(hideLoader());
    return response;
  }
};

export const getLoanSummary = async ({ token, dispatch, ...payload }) => {
  dispatch(showLoader());
  let response;
  const requestOption = {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    data: payload,
    url: config.GET_LOAN_SUMMARY,
  };

  
  try {
    response = getResponse1(await axios(requestOption));
  
  } catch (err) {
    handleError(err)
    response = {};
  } finally {
    dispatch(hideLoader());
    return response;
  }
};

export const ifscCode = async ({ token, dispatch, ...payload }) => {
  let response;
  const requestOption = {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    url: config.IFSC_CODE,
    data: payload,
  };

  try {
    response = getResponse(await axios(requestOption));
  } catch (err) {
    handleError(err)
    response = {};
  } finally {
    dispatch(hideLoader());
    return response;
  }
};

export const verifyBankAccNumber = async ({ token, dispatch, ...payload }) => {
  let response;
  dispatch(showLoader());
  const requestOption = {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    url: config.VERIFY_ACC_NO,
    data: payload,
  };

  try {
    response = getResponse(await axios(requestOption));
  } catch (err) {
    handleError(err)
    response = {};
  } finally {
    dispatch(hideLoader());
    return response;
  }
};