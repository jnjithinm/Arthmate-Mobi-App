import axios from 'axios';
import { genericFetch } from "../../utils";
import { config } from '../../config';

export async function saveUpdateFamilyReference(token, data) {

    const requestOption = {
        method: 'POST',

        headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        data: {
            ismainapplicant: data.ismainapplicant,
            applicantUniqueId: data.applicantUniqueId,
            leadCode: data.leadCode,
            addres: data.addressFamily,
            name: data.nameFamily,
            mobNo: data.mobileFamily,
            relationship: data.selectedFamilyRef,
            id: data.id
        },
        url: config.REFERENCE_SAVEUPDATE_FAMILY,
    };
    try {
        const apiResponse = await axios(requestOption)

        return genericFetch(apiResponse);

    } catch (error) {
        let obj = { data: { error: true, message: error } }
        return genericFetch(obj);
    };
}
export async function saveUpdateNonFamilyReference(token, data) {

    const requestOption = {
        method: 'POST',

        headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        data: {
            ismainapplicant: data.ismainapplicant,
            isguarantor: data.isguarantor,
            applicantUniqueId: data.applicantUniqueId,
            leadCode: data.leadCode,
            addres: data.nonaddressFamily,
            name: data.nonnameFamily,
            mobNo: data.nonmobileFamily,
            relationship: data.selectedNonFamilyRef,
            id: data.id
        },
        url: config.REFERENCE_SAVEUPDATE_NONFAMILY,
    }
    try {
        const apiResponse = await axios(requestOption)

        return genericFetch(apiResponse);

    } catch (error) {
        let obj = { data: { error: true, message: error } }
        return genericFetch(obj);
    };
}