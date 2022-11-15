import axios from 'axios';
import { genericFetch } from '../../utils';
import { config } from '../../config';
import RNFetchBlob from 'rn-fetch-blob';
import { handleError, handleSuccess } from "../../utils";

export async function saveSalarySlip(token, data) {
    let addInfo = [];
    if (data.firstMonthFile) {
        addInfo.push(data.firstMonthFile);
    }
    if (data.secondMonthFile) {
        addInfo.push(data.secondMonthFile);
    }
    if (data.thirdMonthFile) {
        addInfo.push(data.thirdMonthFile);
    }

    const apiResponse = await RNFetchBlob.fetch('POST', config.SAVESALARYSLIP, {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
    }, [
        // part file from storage
        { name: "file", filename: 'salary_slip.zip', data: RNFetchBlob.wrap(data.zipFile) },
        {
            name: 'addInfo', data: JSON.stringify(addInfo)
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

export async function deleteSalarySlip(token, data) {
    const requestOption = {
        method: 'POST',

        headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        data: data,
        url: data.docType == 'salarySlip' ? config.DELETEBANKSTATEMENT : config.DELETESALARYSLIP,
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

export async function getDDEDetails(token) {

    const requestOption = {
        method: 'GET',

        headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${token}`,
        },

        data: payload,
        url: config.GETDDEDETAILS,
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

export async function fetchBankStatement(token, data) {
    const payload = {
        applicantUniqueid: data.applicantUniqueId,
        leadCode: data.leadCode,
        ismainapplicant: data.ismainapplicant,
        isguarantor: data.isguarantor,
        name: data.name,
        months: data.months
    }
    const requestOption = {
        method: 'POST',

        headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        data: payload,
        url: config.COLLECTR_FETCH,
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

export async function getFinbiturl(token, data) {
    const payload = {
        applicantUniqueId: data.applicantUniqueId,
        type: data.type
    }
    const requestOption = {
        method: 'POST',

        headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        data: payload,
        url: config.FINBIT_URL,
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