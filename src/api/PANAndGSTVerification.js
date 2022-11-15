import axios from 'axios';

import { config } from '../../config';
import { genericFetch } from "../../utils";

export async function getEntityApi(token) {
    const requestOption = {
        method: 'GET',

        headers: { Authorization: `Bearer ${token}` },
        url: config.API_GET_ENTITY,
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

export async function verifyPANApi(token, dataToAPI) {
    const requestOption = {
        method: 'POST',

        headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        data:
            JSON.stringify(dataToAPI)
        ,
        url: config.API_VERIFY_PAN,
    };
    try {
        const apiResponse = await axios(requestOption)
        return genericFetch(apiResponse);

    } catch (error) {
        let obj = { data: { error: true, message: error } }
        return genericFetch(obj);
    };

}

export async function savePANApi(token, dataToAPI) {
    const requestOption = {
        method: 'POST',

        headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        data:
            JSON.stringify(dataToAPI)
        ,
        url: config.API_SAVE_PAN,
    };
    try {
        const apiResponse = await axios(requestOption)
        return genericFetch(apiResponse);

    } catch (error) {
        let obj = { data: { error: true, message: error } }
        return genericFetch(obj);
    };

    
}

export async function deletePANAPI(token, dataToAPI) {
    const requestOption = {
        method: 'POST',

        headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        data:
            JSON.stringify(dataToAPI)
        ,
        url: config.DELETE_PAN_API,
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

export async function gstWrapperAPI(token, dataToAPI) {
    const requestOption = {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        data: dataToAPI,
        url: config.GSTBYPAN,
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
