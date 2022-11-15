import axios from 'axios';
import { genericFetch } from '../../utils';
import { config } from '../../config';
import { ifscCode } from '../container/Personal Details';
import RNFetchBlob from 'rn-fetch-blob';
import { handleError, handleSuccess } from "../../utils";

export async function businessSector(token) {
    const requestOption = {
        method: 'GET',

        headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        url: config.BUSINESS_SECTOR_MASTER,
    };

    const apiResponse = await axios(requestOption)
        .then(function (response) {

            return genericFetch(response);
        })
        .catch(function (error) {
            return genericFetch(error);
        });
    return genericFetch(apiResponse);
}

export async function uploadBusinessSelfie(token, data) {
    let businessInfo
    businessInfo = {
        "applicant_uniqueid": data.data.object.applicant_uniqueid,
        "ismainapplicant": data.data.object.ismainapplicant,
        "isguarantor": data.data.object.isguarantor
    }

        const apiResponse = await RNFetchBlob.fetch('POST', config.UPLOAD_BUSINESS_SELFIE, {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
        }, [
            // part file from storage
            { name: "file", filename: data.data.name, data: RNFetchBlob.wrap(data.data.path) },
            {
                name: 'businessInfo', data: JSON.stringify(businessInfo)

            },
        ]).then((resp) => {
            if (resp && resp.respInfo && resp.respInfo.status === 200) {
                const parsedData = JSON.parse(resp.data);
                if (parsedData && !parsedData.error) {
                    handleSuccess("File Uploaded Successfully");
                    return parsedData;
                }
                if (parsedData && parsedData.error) {
                    // yield put({ type: 'SAVE_SALARY_SLIP_FAILURE' });
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

export async function deleteBusinessSelfieAPI(token, dataToAPI) {
    const requestOption = {
        method: 'POST',

        headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        data: dataToAPI,
        url: config.DELETE_BUSINESS_SELFIE,
    };

    const apiResponse = await axios(requestOption)
        .then(function (response) {
            return genericFetch(response);
        })
        .catch(function (error) {
            return genericFetch(error);
        });

    return genericFetch(apiResponse);
}

export async function uploadBusinessSelfie4(token, action) {
    const apiResponse = await RNFetchBlob.fetch('POST', config.UPLOAD_SELFIE, {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
    }, [
        // part file from storage
        { name: "file", filename: action.data.name, data: RNFetchBlob.wrap(action.data.zipPath) },
        {
            name: 'businessInfo', data: action.data.object,
        },
    ]).then((resp) => {
        if (resp && resp.respInfo && resp.respInfo.status === 200) {
            const parsedData = JSON.parse(resp.data);
            if (parsedData && !parsedData.error) {
                handleSuccess(parsedData.message);
                return parsedData.data;
            }
            if (parsedData && parsedData.error) {
                const error = parsedData.message || "Something went wrong"
                throw error;
            }
        } else {
            const error = "Something went wrong!"
            throw error;
        }
    }).catch((err) => {
        throw err;
    })

    return apiResponse;
}

export async function businessIndustry(token) {
    const requestOption = {
        method: 'GET',

        headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        url: config.BUSINESS_INDUSTRY,
    };

    const apiResponse = await axios(requestOption)
        .then(function (response) {
            return genericFetch(response);
        })
        .catch(function (error) {
            return genericFetch(error);
        });
    return genericFetch(apiResponse);
}

export async function businessSubIndustry(token, industry) {
    const requestOption = {
        method: 'GET',

        headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${token}`,
        },

        params: {
            sectorcode: industry
        },
        url: config.BUSINESS_SUBINDUSTRYLIST,
    };

    const apiResponse = await axios(requestOption)
        .then(function (response) {
            return genericFetch(response);
        })
        .catch(function (error) {
            return genericFetch(error);
        });
    return genericFetch(apiResponse);
}

export async function businessSegment(token) {
    const requestOption = {
        method: 'GET',

        headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        url: config.BUSINESS_SEGMENT,
    };

    const apiResponse = await axios(requestOption)
        .then(function (response) {
            return genericFetch(response);
        })
        .catch(function (error) {
            return genericFetch(error);
        });
    return genericFetch(apiResponse);
}

export async function IFSCCODE(token, ifscCode) {
    const requestOption = {
        method: 'POST',

        headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        data: {
            ifsc: ifscCode
        },
        url: config.IFSC_CODE,
    };
    try {
        const apiResponse = await axios(requestOption)
        return genericFetch(apiResponse);

    } catch (error) {
        let obj = { data: { error: true, message: error } }
        return genericFetch(obj);
    };
}

export async function saveUpdateBusinessInfo(token, dataToAPI) {
    const requestOption = {
        method: 'POST',

        headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        data: dataToAPI,
        url: config.SAVE_UPDATE_BUSINESS_INFO,
    };
    try {
        const apiResponse = await axios(requestOption)

        return genericFetch(apiResponse);

    } catch (error) {
        let obj = { data: { error: true, message: error } }
        return genericFetch(obj);
    };
}

export async function createUpdateCustomer(token, dataToAPI) {
    const requestOption = {
        method: 'POST',

        headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        data: dataToAPI,
        url: config.CREATEUPDATE_CUSTOMER,
    };
    try {
        const apiResponse = await axios(requestOption)

        return genericFetch(apiResponse);

    } catch (error) {
        let obj = { data: { error: true, message: error } }
        return genericFetch(obj);
    };
}

export async function verifyAccountNumber(token, dataToAPI) {
    const requestOption = {
        method: 'POST',

        headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        data: dataToAPI,
        url: config.VERIFY_ACC_NO,
    };
    try {
        const apiResponse = await axios(requestOption)

        return genericFetch(apiResponse);

    } catch (error) {
        let obj = { data: { error: true, message: error } }
        return genericFetch(obj);
    };
}