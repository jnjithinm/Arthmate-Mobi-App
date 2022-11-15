import RNFetchBlob from 'rn-fetch-blob';

import { config } from '../../config';
import { handleError, handleSuccess } from "../../utils";

export async function uploadPANApi(token, action) {
    const apiResponse = await RNFetchBlob.fetch('POST', config.API_PAN_OCR, {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
    }, [
        // part file from storage
        { name: "file", filename: action.name, data: RNFetchBlob.wrap(action.path) },
        {
            name: 'panInfo', data: action.dataToAPI.panInfo,
        },
    ]).then((resp) => {
        if (resp && resp.respInfo && resp.respInfo.status === 200) {
            const parsedData = JSON.parse(resp.data);
            if (parsedData && !parsedData.error) {
                handleSuccess("File Uploaded Successfully");
                return parsedData;
            }
            if (parsedData && parsedData.error) {
                const error = parsedData.message || "Something went wrong!"
                // throw error;
                return parsedData;
            }
        } else {
            const error = "Something went wrong!"
            throw error;
        }
    }).catch((err) => {
        handleError(err);
    })

    return apiResponse;
}