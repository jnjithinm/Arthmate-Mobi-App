import axios from 'axios';
import { genericFetch } from "../../utils";
import { config } from '../../config';

export async function dashboardApi(token, data) {
    const requestOption = {
        method: 'POST',

        headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        data: {
            employeeId: data.employeeId,
            branchName: data.branchName
        },
        url: config.GETLEAD_URL,
    }
    try{
		const apiResponse = await axios(requestOption)
		return apiResponse;
	} catch (error) {
		let obj = { data: { error: true, message: error } }
		return genericFetch(obj);
	};
   
}

export async function getUserDetaisApi(token, data) {
    const requestOption = {
        method: 'POST',

        headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        data: {
            employeeId: data.employeeId,
        },
        url: config.GET_USER_LOGIN,
    }
    try{
		const apiResponse = await axios(requestOption)
		return apiResponse;
	} catch (error) {
		let obj = { data: { error: true, message: error } }
		return genericFetch(obj);
	};
   
}

export async function getGlobalLoginApi(token, data) {
    const requestOption = {
        method: 'POST',

        headers: {
            'content-type': 'application/json',
            // Authorization: `Bearer ${token}`
        },
        url: `${config.GLOBAL_LOGIN}mobile=${data.mobile}&sessionkey=${data.sessionkey}&usercode=${data.usercode}`,
    }
    try{
		const apiResponse = await axios(requestOption)
		return apiResponse;
	} catch (error) {
		let obj = { data: { error: true, message: error } }
		return genericFetch(obj);
	};
   
}