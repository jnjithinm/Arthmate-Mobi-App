import axios from 'axios';
import { genericFetch } from "../../utils";
import { config } from '../../config';

export async function otpVerificationApi(token, otp, leadCode, source,request_id) {
    const requestOption = {
        method: 'POST',

        headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        data: {
            leadCode: leadCode,
            otp: otp,
            source: source,
            request_id: request_id
        },
        url: config.CONSENT_VERIFY,
    };
    try {
        const apiResponse = await axios(requestOption)
        return genericFetch(apiResponse);

    } catch (error) {
        let obj = { data: { error: true, message: error } }
        return genericFetch(obj);
    };
}