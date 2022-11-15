import axios from 'axios';
import { genericFetch } from '../../utils';
import { config } from '../../config';

export async function dealerApi(token, data) {
    const requestOption = {
        method: 'POST',

        headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        data: {
            branchName: data.branch,
            employeeId: data.employeeId

        },
        url: config.DEALER_URL,
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
export async function branchName(token, data) {
    const requestOption = {
        method: 'GET',

        headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        params: {
            employeeId: data.employeeId
        },
        url: config.BRANCH_URL,
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

export async function dsaApi(token) {
    const requestOption = {
        method: 'GET',

        headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        url: config.DSA_URL,
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

export async function addLead(token, data) {

    const payload = {
        productId: data.productId,
        sourceType: data.selectedSourceType,
        leadName: data.customerName,
        firstName: data.firstName,
        lastName: data.lastName,
        customerEmail: data.emailAddress,
        customerPincode: data.pincode,
        customerMobile: data.mobileNumber,
        employeeId: data.employeeId,
        branchName: data.branchName,
        city: data.city,
        state: data.state,
        pan: data.pan
        //selectedItem: data.selectedItem,
        //selectedBranch: data.selectedBranch
    }

    if (data.middleName.length > 0) {
        payload['middleName'] = data.middleName
    }
    if (data.selectedItem !== 'Direct') {
        payload['sourceName'] = data.selectedItem
    }
    const requestOption = {
        method: 'POST',

        headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${token}`,
        },

        data: payload,
        url: config.ADDLEAD_URL,
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