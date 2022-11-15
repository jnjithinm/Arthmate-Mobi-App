import axios from 'axios';
import { genericFetch } from "../../utils";
import { config } from '../../config';

export async function editLeadDetailApi(token, id, pan, productId, selectedSourceType, selectedItem, customerName, firstName, middleName, lastName, emailAddress, pincode, mobileNumber, applicantUniqueId, branchName, employeeId, city, state) {

    const requestOption = {
        method: 'POST',

        headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        data: {
            productId: productId,
            pan: pan,
            sourceType: selectedSourceType,
            sourceName: selectedItem,
            leadName: customerName,
            firstName: firstName,
            middleName: middleName,
            lastName: lastName,
            customerEmail: emailAddress,
            id: id,
            customerPincode: pincode,
            customerMobile: mobileNumber,
            applicantUniqueId: applicantUniqueId,
            branchName: branchName,
            employeeId: employeeId,
            city: city,
            state: state
        },
        url: config.EDITLEAD_URL,
    };
    try {
        const apiResponse = await axios(requestOption)

        return genericFetch(apiResponse);

    } catch (error) {
        let obj = { data: { error: true, message: error } }
        return genericFetch(obj);
    };
}