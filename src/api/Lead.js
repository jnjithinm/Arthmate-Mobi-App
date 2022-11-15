import axios from 'axios';
import { genericFetch } from '../../utils';
import { config } from '../../config';

export async function ntwApi(token, data) {
    const requestOption = {
        method: 'POST',

        headers: {
            'content-type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        data: {
            productId: data.productId,
            employeeId: data.employeeId,
            branchName: data.branchName
        },
        url: config.LEADURL,
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

export async function etwApi(token, data) {
    const requestOption = {
        method: 'POST',

        headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        data: {
            productId: data.productId,
            employeeId: data.employeeId,
            branchName: data.branchName
        },
        url: config.LEADURL,
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

export async function utwApi(token, data) {
    const requestOption = {
        method: 'POST',

        headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        data: {
            productId: data.productId,
            employeeId: data.employeeId,
            branchName: data.branchName
        },
        url: config.LEADURL,
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

export async function otwApi(token, data) {
    const requestOption = {
        method: 'POST',

        headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        data: {
            productId: data.productId,
            employeeId: data.employeeId,
            branchName: data.branchName
        },
        url: config.LEADURL,
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

export async function searchLead(token, data) {
    var temp 
    data.type == 'listCaseDetails' ? temp ={applicationUniqueId: data.applicationUniqueId} : null
    const requestOption = {
        method: 'POST',

        headers: {
            'content-type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        data: data.type == 'listCaseDetails' ? temp : data,
        url: data.type == 'listCaseDetails' ?config.LIST_CASE_DETAILS : config.LEADSEARCH,
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

export async function listCaseStatus(token, data) {
    const requestOption = {
        method: 'POST',

        headers: {
            'content-type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        data: {
            count: data.count,
            searchString: data.searchString,
            employeeId: data.employeeId,
            pageNumber: data.pageNumber,
            leadType: data.leadType,
            productId: data.productId,
            branchName: data.branchName
        },
        url: config.LEADSEARCH,
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