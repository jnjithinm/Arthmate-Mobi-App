import axios from 'axios';

import { config } from '../../config';
import { genericFetch } from "../../utils";

export async function qdeSuccessAPI(qdedata, token) {
    const requestOption = {
        method: 'POST',

        headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        data: qdedata,
        url: config.QDE_SUCCESS,
    };

    const apiResponse = await axios(requestOption)
        .then(function (response) {
            return genericFetch(response);
        })
        .catch(function (error) {
            throw error;
        });

    return genericFetch(apiResponse);
}

export async function submitToCredit(data, token) {
    const requestOption = {
        method: 'POST',

        headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        data: {
            applicant_uniqueid: data.applicant_uniqueid,
            comment: data.comment,
            employeeId: data.employeeId,
            reason: data.reason
        },
        url: config.SUBMIT_TO_CREDIT_LOAN,
    };

    const apiResponse = await axios(requestOption)
        .then(function (response) {
            return genericFetch(response);
        })
        .catch(function (error) {
            throw error;
        });

    return genericFetch(apiResponse);
}

export async function getReasonMasterListApi(token, data) {

    const requestOption = {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        url: config.GET_REASON_MASTER_LIST_URL,
    };
    try {
        const apiResponse = await axios(requestOption)
        return genericFetch(apiResponse);

    } catch (error) {
        let obj = { data: { error: true, message: error } }
        return genericFetch(obj);
    };
}