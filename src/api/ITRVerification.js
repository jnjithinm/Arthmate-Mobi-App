import axios from 'axios';
import { genericFetch } from '../../utils';
import { config } from '../../config';
import RNFetchBlob from 'rn-fetch-blob';
import { handleError, handleSuccess } from "../../utils";

export async function getDDECommomDataAPI(token, dataToApi) {
    const requestOption = {
        method: 'POST',

        headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        data: dataToApi,
        url: config.GET_DDE_COMMON_API,
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

export async function uploadITRDocument(token, data) {

    const dataITR = {
        applicantUniqueId: data.applicantUniqueId,
        isguarantor: data.isguarantor,
        ismainapplicant: data.ismainapplicant,
        leadCode: data.leadCode,
        mode: data.mode
    };
    const apiResponse = await RNFetchBlob.fetch('POST', config.UPLOAD_ITR, {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
    }, [
        // part file from storage
        { name: "file", filename: data.filename, data: RNFetchBlob.wrap(data.file) },
        {
            name: 'dataITR', data: JSON.stringify(dataITR)
        },

    ]).then((resp) => {
        if (resp && resp.respInfo && resp.respInfo.status === 200) {
            const parsedData = JSON.parse(resp.data);
            if (parsedData && !parsedData.error) {
                handleSuccess("File Uploaded Successfully");
                return parsedData;
            }
            if (parsedData && parsedData.error) {
                // const error = parsedData.message || "Something went wrong!"
                // throw error;
                return parsedData;
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

export async function linkToCustomer(token, data) {

    const requestOption = {
        method: 'POST',

        headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        data: {
            leadCode: data.leadCode,
            applicantUniqueId: data.applicantUniqueId,
            isguarantor: data.isguarantor,
            mode: data.mode,
            ismainapplicant: data.ismainapplicant,
        },
        url: config.SEND_LINK,
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
export async function deleteITR(token, data) {

    const requestOption = {
        method: 'GET',

        headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        params: {
            applicantUniqueId: data.applicantUniqueId,
            filePath: data.filePath
        },
        url: config.DELETE_ITR,
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