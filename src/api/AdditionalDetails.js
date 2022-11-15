import RNFetchBlob from 'rn-fetch-blob';
import axios from 'axios';

import { config } from '../../config';
import { handleError, handleSuccess, genericFetch } from "../../utils";

export async function uploadDocAdditionalDetailsApi(token, action, actions) {
    const apiResponse = await RNFetchBlob.config({
        trusty: true,

    })
        .fetch
        ('POST', config.UPLOAD_DOC_ADDITIONAL_DETAILS, {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
        }, [
            // part file from storage
            { name: "file", filename: action.name, data: RNFetchBlob.wrap(action.zipPath) },
            {
                name: 'addInfo', data: action.imageData,
            },
        ]).then((resp) => {
            if (resp && resp.respInfo && resp.respInfo.status === 200) {
                const parsedData = JSON.parse(resp.data);
                if (parsedData && !parsedData.error) {
                    handleSuccess("File Uploaded Successfully");
                    return parsedData.data;
                }
                if (parsedData && parsedData.error) {
                    const error = parsedData.message || "Something went wrong!"
                    throw error;
                }
            } else {
                const error = "Something went wrong!"
                throw error;
            }
        })
        .catch((err) => {
            handleError(err);
        })

    return apiResponse;
}

export async function uploadDocument(token, data) {
    let permanentAddInfo, bankStatementInfo
    permanentAddInfo = data.object
    

    bankStatementInfo = {
        // data: [{ docType: data.object.docType, filename: data.object.filename }],
        applicantUniqueId: data.object.applicantUniqueId
    }

    const apiResponse = await RNFetchBlob.fetch('POST', data.object.bankDetails ? config.UPLOAD_BANK_DOC : config.UPLOAD_DOC, {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
    }, [
        // part file from storage
        { name: "file", filename: data.name, data: RNFetchBlob.wrap(data.path) },
        {
            name: data.object.bankDetails ? 'bankStatementInfo' : 'permanentAddInfo', data: JSON.stringify(data.object.bankDetails ? bankStatementInfo : permanentAddInfo)

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

export async function uploadCurrentDocument(token, data) {
    let currentAddressInfo

    currentAddressInfo = {
        applicantUniqueId: data.object.applicantUniqueId,
        fileName: data.object.filename,
        docType: data.object.docType
    }

    const apiResponse = await RNFetchBlob.fetch('POST', config.UPLOAD_CURRENT_DOC, {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
    }, [
        // part file from storage
        { name: "file", filename: data.object.filename, data: RNFetchBlob.wrap(data.path) },
        {
            name: 'currentAddressInfo', data: JSON.stringify(currentAddressInfo)
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

export async function getCityStateAPI(token, pincode) {
    const requestOption = {
        method: 'GET',

        headers: {
            'content-type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        params: {
            pincode: pincode,
        },
        url: config.GET_CITY_STATE,
    };

    const apiResponse = await axios(requestOption)
        .then(function (response) {
            return genericFetch(response);
        })
        .catch(function (error) {
            return genericFetch(error);
        });
    return genericFetch(apiResponse);
}

export async function getProfessionAPI(token) {
    const requestOption = {
        method: 'GET',

        headers: {
            'content-type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        url: config.GET_PROFESSION,
    };

    const apiResponse = await axios(requestOption)
        .then(function (response) {
            return genericFetch(response);
        })
        .catch(function (error) {
            return genericFetch(error);
        });
    return genericFetch(apiResponse);
}

export async function getSubCategoryListAPI(token, profession) {
    const requestOption = {
        method: 'GET',

        headers: {
            'content-type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        params: {
            profession: profession,
        },
        url: config.GET_SUB_CATEGORY,
    };

    const apiResponse = await axios(requestOption)
        .then(function (response) {
            return genericFetch(response);
        })
        .catch(function (error) {
            return genericFetch(error);
        });
    return genericFetch(apiResponse);
}

export async function getDesignationsAPI(token, data) {
    const requestOption = {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        params: {
            subCategory: data.subCategory,
            profession: data.profession,
        },
        url: config.GET_DESIGNATIONS,
    };

    const apiResponse = await axios(requestOption)
        .then(function (response) {
            return genericFetch(response);
        })
        .catch(function (error) {
            return genericFetch(error);
        });
    return genericFetch(apiResponse);
}

export async function getCompanyListAPI(token, data) {
    const requestOption = {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        url: `${config.GET_COMPANY_LIST}?companyName=${data.companyName}`,
    };

    const apiResponse = await axios(requestOption)
        .then(function (response) {
            return genericFetch(response);
        })
        .catch(function (error) {
            return genericFetch(error);
        });
    return genericFetch(apiResponse);
}

export async function getResidenceTypeAPI(token) {
    const requestOption = {
        method: 'GET',

        headers: {
            'content-type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        url: config.GET_RESIDENCE_TYPE,
    };

    const apiResponse = await axios(requestOption)
        .then(function (response) {
            return genericFetch(response);
        })
        .catch(function (error) {
            return genericFetch(error);
        });
    return genericFetch(apiResponse);
}

export async function saveEmploymentDetailsAPI(token, dataToAPI) {
    const requestOption = {
        method: 'POST',

        headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        data: dataToAPI,
        url: config.SAVE_EMPLOYMENT_DETAILS,
    };

    const apiResponse = await axios(requestOption)
        .then(function (response) {
            return genericFetch(response);
        })
        .catch(function (error) {
            return genericFetch(error);
        });

    return genericFetch(apiResponse);
}

export async function saveAdditionalContactAPI(token, dataToAPI) {
    const requestOption = {
        method: 'POST',

        headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        data: dataToAPI,
        url: config.SAVE_ADDITIONAL_CONTACT,
    };

    const apiResponse = await axios(requestOption)
        .then(function (response) {
            return genericFetch(response);
        })
        .catch(function (error) {
            return genericFetch(error);
        });

    return genericFetch(apiResponse);
}

export async function saveOfficeAddressAPI(token, dataToAPI) {
    const requestOption = {
        method: 'POST',

        headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        data: dataToAPI,
        url: config.SAVE_OFFICE_ADDRESS,
    };
    const apiResponse = await axios(requestOption)
        .then(function (response) {
            return genericFetch(response);
        })
        .catch(function (error) {
            return genericFetch(error);
        });

    return genericFetch(apiResponse);


}

export async function savePermanentAddressAPI(token, dataToAPI) {
    const requestOption = {
        method: 'POST',

        headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        data: dataToAPI,
        url: config.SAVE_PERM_ADDRESS,
    };
    const apiResponse = await axios(requestOption)
        .then(function (response) {
            return genericFetch(response);
        })
        .catch(function (error) {
            return genericFetch(error);
        });

    return genericFetch(apiResponse);


}

export async function getCityListAPI(token) {
    const requestOption = {
        method: 'GET',

        headers: {
            'content-type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        url: config.GET_CITY_LIST,
    };

    const apiResponse = await axios(requestOption)
        .then(function (response) {
            return genericFetch(response);
        })
        .catch(function (error) {
            return genericFetch(error);
        });
    return genericFetch(apiResponse);
}

export async function saveKYCDetailAPI(token, dataToAPI) {

    const requestOption = {
        method: 'POST',

        headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        data: dataToAPI,
        url: config.SAVE_KYC_DETAILS,
    };
    try {
        const apiResponse = await axios(requestOption)
        return genericFetch(apiResponse);

    } catch (error) {
        let obj = { data: { error: true, message: error } }
        return genericFetch(obj);
    };

    // const apiResponse = await axios(requestOption)
    //     .then(function (response) {
    //         return genericFetch(response);
    //     })
    //     .catch(function (error) {
    //         return genericFetch(error);
    //     });

    // return genericFetch(apiResponse);
}

export async function getKYCDocAPI(token) {
    const requestOption = {
        method: 'GET',

        headers: {
            'content-type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        url: config.GET_KYC_DOC_OTHERS,
    };

    const apiResponse = await axios(requestOption)
        .then(function (response) {
            return genericFetch(response);
        })
        .catch(function (error) {
            return genericFetch(error);
        });
    return genericFetch(apiResponse);
}

export async function getUtilityDocAPI(token) {
    const requestOption = {
        method: 'GET',

        headers: {
            'content-type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        url: config.GET_UTILITY_DOC_OTHER,
    };

    const apiResponse = await axios(requestOption)
        .then(function (response) {
            return genericFetch(response);
        })
        .catch(function (error) {
            return genericFetch(error);
        });
    return genericFetch(apiResponse);
}

export async function getServiceProviderAPI(token, data) {
    const requestOption = {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        params: data,
        url: config.GET_SERVICE_PROVIDER_LIST,
    };

    const apiResponse = await axios(requestOption)
        .then(function (response) {
            return genericFetch(response);
        })
        .catch(function (error) {
            return genericFetch(error);
        });
    return genericFetch(apiResponse);
}

export async function saveUtilityDetailAPI(token, dataToAPI) {
    const requestOption = {
        method: 'POST',

        headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        data: dataToAPI,
        url: config.SAVE_UTILITY_DETAILS,
    };

    const apiResponse = await axios(requestOption)
        .then(function (response) {
            return genericFetch(response);
        })
        .catch(function (error) {
            return genericFetch(error);
        });

    return genericFetch(apiResponse);
}

export async function getDetailsElectricityAPI(dataToAPI) {
    const requestOption = {
        method: 'POST',

        headers: {
            'content-type': 'application/json',
            'x-api-key': 'n16HKWRvRq5ZwHTSrWm1o6BbuCT6PCVR62uotv3m'
        },
        data: dataToAPI,
        url: config.GET_DETAILS_ELECTRICITY,
    };

    try {
        const apiResponse = await axios(requestOption)

        return genericFetch(apiResponse);

    } catch (error) {
        let obj = { data: { error: true, message: error } }
        return genericFetch(obj);
    };
}

export async function getDetailsGasAPI(token, dataToAPI) {
    const requestOption = {
        method: 'POST',

        headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${token}`,
            'x-api-key': 'n16HKWRvRq5ZwHTSrWm1o6BbuCT6PCVR62uotv3m'
        },
        data: dataToAPI,
        url: dataToAPI.type == 'voterId' ? config.UTILIY_VOTER_VERIFY :
            dataToAPI.type == 'landlineBill' ? config.UTILIY_LANDLINE_VERIFY :
            dataToAPI.type == 'drivingLicence' ? config.UTILIY_DRIVING_VERIFY :
            dataToAPI.type == 'passport' ? config.UTILIY_PASSPORT_VERIFY :
            dataToAPI.type == 'gas' ? config.UTILIY_GAS_VERIFY :
                                    config.GET_DETAILS_GAS,
    };
    try {
        const apiResponse = await axios(requestOption)

        return genericFetch(apiResponse);

    } catch (error) {
        let obj = { data: { error: true, message: error } }
        return genericFetch(obj);
    };
}

export async function getDetailsLandlineAPI(dataToAPI) {
    const requestOption = {
        method: 'POST',

        headers: {
            'content-type': 'application/json',
            'x-api-key': 'n16HKWRvRq5ZwHTSrWm1o6BbuCT6PCVR62uotv3m'
        },
        data: dataToAPI,
        url: config.GET_DETAILS_LANDLINE,
    };

    try {
        const apiResponse = await axios(requestOption)

        return genericFetch(apiResponse);

    } catch (error) {
        let obj = { data: { error: true, message: error } }
        return genericFetch(obj);
    };
}

export async function uploadUtilityDocAPI(token, action) {
    const apiResponse = await RNFetchBlob.fetch('POST', config.UPLOAD_UTILIY_DOC, {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
    }, [
        // part file from storage
        { name: "file", filename: action.dataToAPI.name, data: RNFetchBlob.wrap(action.dataToAPI.zipPath) },
        {
            name: 'addInfo', data: action.dataToAPI.imageData,
        },
    ]).then((resp) => {
        if (resp && resp.respInfo && resp.respInfo.status === 200) {
            const parsedData = JSON.parse(resp.data);
            if (parsedData && !parsedData.error) {
                handleSuccess(parsedData.message);
                return parsedData.data;
            }
            if (parsedData && parsedData.error) {
                const error = parsedData.message || "Something went wrong"
                throw error;
            }
        } else {
            const error = "Something went wrong!"
            throw error;
        }
    }).catch((err) => {
        throw err;
    })

    return apiResponse;
}

export async function deleteUtilityDocAPI(token, dataToAPI) {
    const requestOption = {
        method: 'POST',

        headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        data: dataToAPI,
        url: config.DELETE_UPLOADED_UTILITY_DOC,
    };

    const apiResponse = await axios(requestOption)
        .then(function (response) {
            return genericFetch(response);
        })
        .catch(function (error) {
            return genericFetch(error);
        });

    return genericFetch(apiResponse);
}

export async function verifyDrivingLicenseAPI(token, dataToAPI) {
    const requestOption = {
        method: 'POST',

        headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        data: dataToAPI,
        url: config.VERIFY_DRIVING_LICENSE,
    };

    try {
        const apiResponse = await axios(requestOption)

        return genericFetch(apiResponse);

    } catch (error) {
        let obj = { data: { error: true, message: error } }
        return genericFetch(obj);
    };
}

export async function verifyVoterIDAPI(token, dataToAPI) {
    const requestOption = {
        method: 'POST',

        headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        data: dataToAPI,
        url: config.VERIFY_VOTER_ID,
    };

    try {
        const apiResponse = await axios(requestOption)

        return genericFetch(apiResponse);

    } catch (error) {
        let obj = { data: { error: true, message: error } }
        return genericFetch(obj);
    };
}


export async function getDesignationAPI(token) {
    const requestOption = {
        method: 'GET',

        headers: {
            'content-type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        url: config.GET_DESIGNATION,
    };

    const apiResponse = await axios(requestOption)
        .then(function (response) {
            return genericFetch(response);
        })
        .catch(function (error) {
            return genericFetch(error);
        });
    return genericFetch(apiResponse);
}

export async function getCompanyTypeAPI(token) {
    const requestOption = {
        method: 'GET',

        headers: {
            'content-type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        url: config.GET_COMPANY_TYPE,
    };

    const apiResponse = await axios(requestOption)
        .then(function (response) {
            return genericFetch(response);
        })
        .catch(function (error) {
            return genericFetch(error);
        });
    return genericFetch(apiResponse);
}

export async function getIndustryAPI(token) {
    const requestOption = {
        method: 'GET',

        headers: {
            'content-type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        url: config.GET_INDUSTRY,
    };

    const apiResponse = await axios(requestOption)
        .then(function (response) {
            return genericFetch(response);
        })
        .catch(function (error) {
            return genericFetch(error);
        });
    return genericFetch(apiResponse);
}

export async function deleteDocumentAPI(token, data) {
    const requestOption = {
        method: 'POST',

        headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        data: {
            applicantUniqueId: data.applicantUniqueId,
            deleteflag: data.deleteflag,
        },
        url: config.DELETE_DOCUMENTS,
    };

    const apiResponse = await axios(requestOption)
        .then(function (response) {
            return genericFetch(response);
        })
        .catch(function (error) {
            return genericFetch(error);
        });

    return genericFetch(apiResponse);
}


export async function deletePerDocumentAPI(token, data) {
    const requestOption = {
        method: 'POST',

        headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        data: {
            applicantUniqueId: data.applicantUniqueId,
            docType: data.docType
        },
        url: (data?.currentAddress) ? config.DELETE_CURR_DOCUMENTS : config.DELETE_PER_DOCUMENTS,
    };
    const apiResponse = await axios(requestOption)
        .then(function (response) {
            return genericFetch(response);
        })
        .catch(function (error) {
            return genericFetch(error);
        });

    return genericFetch(apiResponse);
}

export async function deleteUtilityAPI(token, data) {
    const requestOption = {
        method: 'POST',

        headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        data: {
            applicantUniqueId: data.applicantUniqueId,
            deleteflag: data.deleteflag,
        },
        url: config.DELETE_UTLITY,
    };

    const apiResponse = await axios(requestOption)
        .then(function (response) {
            return genericFetch(response);
        })
        .catch(function (error) {
            return genericFetch(error);
        });

    return genericFetch(apiResponse);
}

export async function gstADDRAPI(token, dataToAPI) {
    const requestOption = {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        data: dataToAPI,
        url: config.GETGSTADDR,
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

export async function dedupeChecks(token, dataToAPI) {

    const requestOption = {
        method: 'GET',

        headers: {
            'content-type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        url: `${config.GET_DEDUPE_CHECKS}?applicantUniqueId=${dataToAPI.applicantUniqueId}`,
    };

    const apiResponse = await axios(requestOption)
        .then(function (response) {
            return genericFetch(response);

        })
        .catch(function (error) {
            return genericFetch(error);
        });
    return genericFetch(apiResponse);
}

export async function getDedupeId(token, dataToAPI) {
    const requestOption = {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        data: dataToAPI,
        url: config.DEDUPE_ID,
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