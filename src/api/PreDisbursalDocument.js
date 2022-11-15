import axios from 'axios';
import { genericFetch } from '../../utils';
import { config } from '../../config';
import RNFetchBlob from 'rn-fetch-blob';
import { handleError, handleSuccess } from "../../utils";

export async function uploadDisbusementDocument(token, data) {
    let disbursementInfo
    if (data.vehicleDetails == true) {

        let disbursementInfo = {
            disbursementType: data.disbursementType,
            applicantUniqueId: data.applicantUniqueId,
            vehicleRegistrationNumber: data.vehicleRegistrationNumber,
            vehicleChassisNumber: data.vehicleChassisNumber,
            vehicleEngineNumber: data.vehicleEngineNumber,
        }

        const apiResponse = await RNFetchBlob.fetch('POST', config.UPLOAD_DOCUMENT, {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
        }, [
            {
                name: 'disbursementInfo', data: JSON.stringify(disbursementInfo)
            },
        ]).then((resp) => {
            if (resp && resp.respInfo && resp.respInfo.status === 200) {
                const parsedData = JSON.parse(resp.data);
                if (parsedData && !parsedData.error) {
                    handleSuccess("File Uploaded Successfully");
                    return parsedData;
                }
                if (parsedData && parsedData.error) {
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
    else if (data.object.multiFileUpload == true) {
        var disbursementType = ''
        var applicantUniqueId = ''
        var otherName = ''


        var tempData = []
        var object = {}
        // Object.keys(data).map((item, index) => {
        //     data[item].docType !== undefined ?
        //         (tempData.push({ docType: data[item].docType, filename: data[item].fileName }),
        //             disbursementType = data[item].disbursementType,
        //             applicantUniqueId = data[item].applicantUniqueId,
        //             otherName = data[item].otherName
        //         ) : null
        // })

        disbursementInfo = {
            data: [{ docType: data.object.docType, filename: data.object.filename }],
            disbursementType:  data.object.disbursementType,
            applicantUniqueId:  data.object.applicantUniqueId,
            // otherName: otherName
        }

        const apiResponse = await RNFetchBlob.fetch('POST', config.UPLOAD_DOCUMENT1, {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
        }, [
            // part file from storage
            { name: "file", filename: data.name, data: RNFetchBlob.wrap(data.path) },
            {
                name: 'disbursementInfo', data: JSON.stringify(disbursementInfo)

            },
        ]).then((resp) => {
            if (resp && resp.respInfo &&  resp.respInfo.status === 200) {
                const parsedData = JSON.parse(resp.data);

                if (parsedData && !parsedData.error) {
                    handleSuccess("File Uploaded Successfully");
                    return parsedData;
                }
                if (parsedData && parsedData.error) {
                    // yield put({ type: 'SAVE_SALARY_SLIP_FAILURE' });
                    // const error = parsedData.message || "Something went wrong!"
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
    else {
        disbursementInfo = {
            data: [{ docType: data.object.docType, filename: data.object.filename }],
            disbursementType: data.object.disbursementType,
            applicantUniqueId: data.object.applicantUniqueId,
            otherName: data.object.otherName
        }

        const apiResponse = await RNFetchBlob.fetch('POST', config.UPLOAD_DOCUMENT, {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
        }, [
            // part file from storage
            { name: "file", filename: data.name, data: RNFetchBlob.wrap(data.path) },
            {
                name: 'disbursementInfo', data: JSON.stringify(disbursementInfo)

            },
        ]).then((resp) => {

            if (resp && resp.respInfo && resp.respInfo.status === 200) {
                const parsedData = JSON.parse(resp.data);

                if (parsedData && !parsedData.error) {
                    handleSuccess("File Uploaded Successfully");
                    return parsedData;
                }
                if (parsedData && parsedData.error) {
                    // yield put({ type: 'SAVE_SALARY_SLIP_FAILURE' });
                    // const error = parsedData.message || "Something went wrong!"
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
}

export async function deleteDisbursementDocument(token, data) {

    const requestOption = {
        method: 'POST',

        headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        data: data,
        url: config.DELETE_DOCUMENT,
    };

    try {
        const apiResponse = await axios(requestOption)
        if (!apiResponse.data.error) {
            return genericFetch(apiResponse);
        } else {
            return genericFetch(apiResponse);
        }
    } catch (error) {
        let obj = { data: { error: true, message: error } }
        return genericFetch(obj);
    };
}

export async function getDisbursementDocument(token, data) {

    const requestOption = {
        method: 'POST',

        headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${token}`,
        },

        data: {
            applicantUniqueId: data.applicantUniqueId
        },
        url: config.GET_DOCUMENT,
    };

    try {
        const apiResponse = await axios(requestOption)
        if (!apiResponse.data.error) {
            return genericFetch(apiResponse);
        } else {
            return genericFetch(apiResponse);
        }
    } catch (error) {
        let obj = { data: { error: true, message: error } }
        return genericFetch(obj);
    };
}
