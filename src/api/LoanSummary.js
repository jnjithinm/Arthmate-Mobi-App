import axios from 'axios';
import { genericFetch } from '../../utils';
import { config } from '../../config';

export async function getLoanSummaryAPI(token, dataToApi) {
    const requestOption = {
        method: 'POST',

        headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        data: dataToApi,
        url: config.GET_LOAN_SUMMARY,
    };
    const apiResponse = await axios(requestOption)
        .then(function (response) {
            if (response && response.data && !response.data.error) {
                return genericFetch(response);
            } else {
                throw response.data.message;
            }
        })
        .catch(function (error) {
            throw error;
        });

    return apiResponse.data;
}

export async function getQDEDataAPI(token, dataToApi) {
    const requestOption = {
        method: 'POST',

        headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        data: dataToApi,
        url: config.GET_QDE_COMMON_API,
    };
    const apiResponse = await axios(requestOption)
        .then(function (response) {
            if (response && response.data && !response.data.error) {
                return genericFetch(response);
            } else {
                throw response.data.message;
            }
        })
        .catch(function (error) {
            throw error;
        });

    return apiResponse.data;
}

export async function getCoAppGuarantorAPI(token, dataToApi) {
    const requestOption = {
        method: 'POST',

        headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        data: dataToApi,
        url: config.GET_CO_APPLICANT_GUARANTOR,
    };
    const apiResponse = await axios(requestOption)
        .then(function (response) {
            if (response && response.data && !response.data.error) {
                return genericFetch(response);
            } else {
                throw response.data.message;
            }
        })
        .catch(function (error) {
            throw error;
        });

    return apiResponse.data;
}

export async function saveCoAppGuarantorAPI(token, dataToApi) {
    const requestOption = {
        method: 'POST',

        headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        data: dataToApi,
        url: config.SAVE_CO_APPLICANT_GUARANTOR,
    };
    const apiResponse = await axios(requestOption)
        .then(function (response) {
            if (response && response.data && !response.data.error) {
                return genericFetch(response);
            } else {
                throw response.data.message;
            }
        })
        .catch(function (error) {
            throw error;
        });

    return apiResponse.data;
}

export async function createConsentCoAppGuarantorAPI(token, dataToApi) {
    const requestOption = {
        method: 'POST',

        headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        data: dataToApi,
        url: config.CREATE_CONSENT_COAPP_GUARANTOR,
    };
    const apiResponse = await axios(requestOption)
        .then(function (response) {
            if (response && response.data && !response.data.error) {
                return genericFetch(response);
            } else {
                throw response.data.message;
            }
        })
        .catch(function (error) {
            throw error;
        });

    return apiResponse.data;
}

export async function deleteCoAppGuarantorAPI(token, dataToApi) {
    const requestOption = {
        method: 'POST',

        headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        data: dataToApi,
        url: config.DELETE_COAPP_GUARANTOR,
    };
    const apiResponse = await axios(requestOption)
        .then(function (response) {
            return genericFetch(response);

            // if (response && response.data && !response.data.error) {
            //     return genericFetch(response);
            // } else {
            //     throw response.data.message;
            // }
        })
        .catch(function (error) {
            throw error;
        });

    return apiResponse.data;
}

export async function verifyConsentCoAppGuarantorAPI(token, dataToApi) {
    const requestOption = {
        method: 'POST',

        headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        data: dataToApi,
        url: config.VERFI_CONSENT_COAPP_GUARANTOR,
    };
    const apiResponse = await axios(requestOption)
        .then(function (response) {
            if (response && response.data && !response.data.error) {
                return genericFetch(response);
            } else {
                throw response.data.message;
            }
        })
        .catch(function (error) {
            throw error;
        });

    return apiResponse.data;
}



export async function getUserListApi(token, dataToApi) {
    const requestOption = {
        method: 'POST',

        headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        data: dataToApi,
        url: config.VERFI_CONSENT_COAPP_GUARANTOR,
    };
    const apiResponse = await axios(requestOption)
        .then(function (response) {
            if (response && response.data && !response.data.error) {
                return genericFetch(response);
            } else {
                throw response.data.message;
            }
        })
        .catch(function (error) {
            throw error;
        });

    return apiResponse.data;
}

export async function submitDeviationApi(token, dataToApi) {
    const requestOption = {
        method: 'POST',

        headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        data: dataToApi,
        url: config.VERFI_CONSENT_COAPP_GUARANTOR,
    };
    const apiResponse = await axios(requestOption)
        .then(function (response) {
            if (response && response.data && !response.data.error) {
                return genericFetch(response);
            } else {
                throw response.data.message;
            }
        })
        .catch(function (error) {
            throw error;
        });

    return apiResponse.data;
}