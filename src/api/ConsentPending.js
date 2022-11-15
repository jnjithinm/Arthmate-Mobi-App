import axios from 'axios';
import { genericFetch } from "../../utils";
import { config } from '../../config';

export async function consentPendingApi(token, data) {
    const requestOption = {
        method: 'POST',

        headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        data: {
            leadCode: data.leadCode,
            consentType: data.consentType
        },
        url: config.CONSENT_CREATE,
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

export async function deleteLeadApi(token, id) {
    const requestOption = {
        method: 'POST',

        headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        data: {
            id: id
        },
        url: config.DELETELEAD_URL,
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

export async function accAggregatorApi(token, data) {
    const requestOption = {
        method: 'POST',

        headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        data: {
            applicantUniqueId: data.applicantUniqueId,
            mobileNo: data.mobileNo
        },
        url: config.ACC_AGGREGATOR,
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

export async function AggrigatorUrl(token, data) {
    const requestOption = {
        method: 'POST',

        headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        data: data,
        url: config.AGGRIGATOR_URL,
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

export async function getConsentStatusUrl(token, data) {
    const requestOption = {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        data: data,
        url: config.CONSENT_STATUS,
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