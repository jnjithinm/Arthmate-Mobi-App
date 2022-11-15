import axios from 'axios';
import { genericFetch } from "../../utils";
import { config } from '../../config';
import RNFetchBlob from 'rn-fetch-blob';
import { handleError, handleSuccess } from "../../utils";

export async function getEserviceCommonData(token, data) {
    const requestOption = {
        method: 'POST',

        headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        data: {
            applicantUniqueId: data.applicantUniqueId,
            ismainapplicant: data.ismainapplicant,
        },
        url: config.GET_ESERVICE_COMMON_DATA,
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


export async function requestStampPaper(token, data) {
    const requestOption = {
        method: 'POST',

        headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        data: {
            applicantUniqueId: data.applicantUniqueId,
            ismainapplicant: data.ismainapplicant,
            type: data.type,
            signingMode: data.signingMode
        },
        url: config.LOAN_AGREEMENT_STAMP_PAPER,
    };
    try {
        const apiResponse = await axios(requestOption)
        return genericFetch(apiResponse);

    } catch (error) {
        let obj = { data: { error: true, message: error } }
        return genericFetch(obj);
    };
}

export async function uploadLoanAgreement(token, data) {
    const loanInfo = {
        applicantUniqueId: data.applicantUniqueId
    }

    const apiResponse = await RNFetchBlob.fetch('POST', config.LOAN_AGREEMENT_UPLOAD, {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
    }, [
        // part file from storage
        { name: "file", filename: 'Draft Vehicle Loan Agreement.zip', data: RNFetchBlob.wrap(data.zipFile) },

        {
            name: 'loanInfo', data: JSON.stringify(loanInfo)
        },

    ]).then((resp) => {
        if (resp && resp.respInfo && resp.respInfo.status === 200) {
            const parsedData = JSON.parse(resp.data);
            if (parsedData && !parsedData.error) {
                handleSuccess("File Uploaded Successfully");
                return parsedData;
            }
            if (parsedData && parsedData.error) {
                const error = parsedData.message || "Something went wrong!"
                throw error;
                // return parsedData;
            }
        } else {
            const error = "Something went wrong!"
            throw error;
        }
    }).catch((err) => {
        handleError(err);
    })
    return apiResponse;
}

export async function deleteLoanAgreement(token, data) {

    const requestOption = {
        method: 'POST',

        headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        data: {
            applicantUniqueId: data.applicantUniqueId,
            filePath: data.filePathInResponse
        },
        url: config.LOAN_AGREEMENT_DELETE,
    };

    try {
        const apiResponse = await axios(requestOption)
        if (!apiResponse.data.error) {
            return genericFetch(apiResponse);
        } else {
            return genericFetch(apiResponse);
        }
    } catch (error) {
        let obj = { data: { error: true, message: error } }
        return genericFetch(obj);
    };
}

export async function downloadLoanAgreement(token, data) {
    const requestOption = {
        method: 'POST',

        headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        data: {
            applicantUniqueId: data.applicantUniqueId,
        },
        url: config.LOAN_AGREEMENT_DOWNLOAD,
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
export async function saveSignIn(token, data) {
    const requestOption = {
        method: 'POST',

        headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        data: {
            applicantUniqueId: data.applicantUniqueId,
        },
        url: config.SAVE_SIGN_IN,
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