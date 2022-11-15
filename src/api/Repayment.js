import axios from 'axios';
import { genericFetch } from '../../utils';
import { config } from '../../config';
import { uatURL } from '../../baseURL';

export async function saveRepaymentDetails(token, data) {
    const data1 = {
        repaymentMode: data.repaymentMode,
        applicantUniqId: data.applicantUniqueId,
        aadharNo: data.aadharNo,
        vpa: data.vpa
    }
    if (data.repaymentMode === 'pdc') {
        data1['pdc'] = data.pdc
    }
    if (data.repaymentMode === 'enach') {
        data1['paymentType'] = data.paymentType,
        data1['debitStartDate'] = data.debitStartDate,
        data1['authenticationMode'] = data.authenticationMode

    }
    if (data.repaymentMode === 'other' || data.repaymentMode === 'cash') {
        data1['comments'] = data.comments
    }


    const requestOption = {
        method: 'POST',

        headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        data: data1,
        url: config.SAVE_REPAYMENT_DETAILS,
    };

    try {
        const apiResponse = await axios(requestOption)
        return genericFetch(apiResponse);

    } catch (error) {
        let obj = { data: { error: true, message: error } }
        return genericFetch(obj);
    };
}

export async function getRepaymentDetails(token, data) {

    const requestOption = {
        method: 'POST',

        headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        data: {
            applicantUniqId: data.applicantUniqueId
        },
        url: config.GET_REPAYMENT_DETAILS,
    };

    try {
        const apiResponse = await axios(requestOption)
        return genericFetch(apiResponse);

    } catch (error) {
        let obj = { data: { error: true, message: error } }
        return genericFetch(obj);
    };
}

export async function submitEnachData(token, data) {
    const requestOption = {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        url: `${config.SUBMIT_ENACH}emi=${data.emi}&tenure=${data.tenure}&emailId=${data.emailId}&mobileNumber=${data.mobileNumber}&applicantUniqueId=${data.applicantUniqueId}&debitStartDate=${data.debitStartDate}&accountHolderName=${data.accountHolderName}&bankCode=${data.ifsc.substring(0,4)}&ifsc=${data.ifsc}&accountNumber=${data.accountNumber}&aadharNo=${data.aadharNo}&service=${data.service}&authenticationMode=${data.authenticationMode}`
    };
    try {
        const apiResponse = await axios(requestOption)
        return genericFetch(apiResponse);

    } catch (error) {
        let obj = { data: { error: true, message: error } }
        return genericFetch(obj);
    };
}

export async function validateVpaApi(token, data) {
    const requestOption = {
        method: 'POST',

        headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        data: data,
        url: data.type == "vpaTesting" ? config.SUBMIT_VPA : config.VALIDATE_VPA,

    };

    try {
        const apiResponse = await axios(requestOption)
        return genericFetch(apiResponse);

    } catch (error) {
        let obj = { data: { error: true, message: error } }
        return genericFetch(obj);
    };
}

export async function gnerateNachToken(token, data) {
    const requestOption = {
        method: 'GET',

        headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        params: {
            loanId: data.applicantUniqueId,
        },
        // url:  `${uatURL.nach}/paynimoenach/enach/getEnachResponseData`,
        url:  `${uatURL.nach}/CAMPSPay-enach/enach/getCampsPayEnachResponse`,

    };

    try {
        const apiResponse = await axios(requestOption)
        return genericFetch(apiResponse);

    } catch (error) {
        let obj = { data: { error: true, message: error } }
        return genericFetch(obj);
    };
}

export async function getNachData(token, data) {
    const requestOption = {
        method: 'GET',

        headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        params: {
            applicantUniqueId: data.applicantUniqueId,
        },
        url: config.GET_NACH_DATA,
    };

    try {
        const apiResponse = await axios(requestOption)
        return genericFetch(apiResponse);

    } catch (error) {
        let obj = { data: { error: true, message: error } }
        return genericFetch(obj);
    };
}

export async function saveDisbursementRepaymentDetails(token, data) {

    const requestOption = {
        method: 'POST',

        headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        data: {
            disbursementComments: data.comments,
            applicantUniqId: data.applicantUniqueId,
            employeeId: data.employeeId,
            repaymentMode: data.repaymentModeFetch,
            type: data.type
        },
        url: config.SAVEDISBURSEMENT_REPAYMENTDETAILS,
    };
    try {
        const apiResponse = await axios(requestOption)
        return genericFetch(apiResponse);

    } catch (error) {
        let obj = { data: { error: true, message: error } }
        return genericFetch(obj);
    };
}

export async function getDisbursementRepaymentDetails(token, data) {

    const requestOption = {
        method: 'POST',

        headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        data: {
            applicantUniqId: data.applicantUniqueId,
            type: data.type
        },
        url: config.GETDISBURSEMENT_REPAYMENTDETAILS,
    };

    try {
        const apiResponse = await axios(requestOption)
        return genericFetch(apiResponse);

    } catch (error) {
        let obj = { data: { error: true, message: error } }
        return genericFetch(obj);
    };
}