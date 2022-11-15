import axios from 'axios';

import { config } from '../../config';
import { genericFetch } from "../../utils";

export async function loginApi(emailId, pwd) {

    const requestOption = {
        method: 'POST',
        // timeout: 1000,
        headers: { 'content-type': 'application/json' },
        data: {
            userName: emailId,
            password: pwd,
        },
        url: config.LOGIN_URL,
    };
    try {
        const apiResponse = await axios(requestOption)
        return genericFetch(apiResponse);

    } catch (error) {
        console.log("eeee",error);
        let obj = { data: { error: true, message: error } }
        return genericFetch(obj);
    };
}