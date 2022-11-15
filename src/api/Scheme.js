import axios from 'axios';
import { genericFetch } from "../../utils";
import { config } from '../../config';

export async function saveScheme(token, data) {
    const requestOption = {
        method: 'POST',

        headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        data: {
            applicant_uniqueid: data.applicantUniqueId,
            lead_code: data.leadCode,
            scheme: data.selectedSourceType,
        },
        url: config.SAVE_SCHEME,
    };

    try {
        const apiResponse = await axios(requestOption)
        return genericFetch(apiResponse);

    } catch (error) {
        let obj = { data: { error: true, message: error } }
        return genericFetch(obj);
    };
}

export async function createUpdateCustomer(token, data) {
    const requestOption = {
        method: 'POST',

        headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        data: {
            applicant_uniqueid: data.applicant_uniqueid,
            applicantUniqueId: data.applicantUniqueId,
            isguarantor: data.isguarantor,
            ismainapplicant: data.ismainapplicant,
            type: data.type == undefined? null : data.type
        },
        url: data.type == 'bureauCalling' ? config.BUREAU_CALLING : config.CREATEUPDATE_CUSTOMER,
    };
     try {
        const apiResponse = await axios(requestOption)
        return genericFetch(apiResponse);

    } catch (error) {
        throw error;
        // let obj = { data: { error: true, message: error } }
        // return genericFetch(obj);
    };
}