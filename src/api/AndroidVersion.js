import axios from 'axios';
import { config } from '../../config';
import { handleError, handleSuccess, genericFetch } from "../../utils";

export async function getAndroidVersionAPI(token, pincode) {
    const requestOption = {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            // 'Authorization': `Bearer ${token}`,
        },
        url: config.GET_ANDROID_VERSION,
    };
try {
    const apiResponse = await axios(requestOption);
    return genericFetch(apiResponse);
  } catch (error) {
    let obj = { data: { error: true, message: error } };
    return genericFetch(obj);
  }
}