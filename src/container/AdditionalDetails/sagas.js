import { call, select, put } from 'redux-saga/effects';

import { gstADDRAPI, deletePerDocumentAPI, uploadDocAdditionalDetailsApi, uploadCurrentDocument, uploadDocument, getCompanyListAPI, getCityStateAPI, getDesignationsAPI, getProfessionAPI, getSubCategoryListAPI, getResidenceTypeAPI, saveEmploymentDetailsAPI, saveAdditionalContactAPI, saveOfficeAddressAPI, savePermanentAddressAPI, getCityListAPI, saveKYCDetailAPI, getKYCDocAPI, getUtilityDocAPI, getServiceProviderAPI, saveUtilityDetailAPI, getDetailsElectricityAPI, getDetailsGasAPI, getDetailsLandlineAPI, uploadUtilityDocAPI, deleteUtilityDocAPI, verifyDrivingLicenseAPI, verifyVoterIDAPI, getDesignationAPI, deleteDocumentAPI, deleteUtilityAPI, getCompanyTypeAPI, getIndustryAPI, dedupeChecks, getDedupeId } from "../../api/AdditionalDetails";
import { handleError, handleSuccess } from "../../../utils";
import { userDataSelector } from "../App/selector";

export function* uploadDocAdditionalDetailsSaga(action) {
    try {
        const userData = yield select(userDataSelector());

        const mainResponse = yield call(uploadDocAdditionalDetailsApi, userData.token || "", action.actions.dataToAPI, action.actions);

        if (mainResponse && mainResponse.error) {
            throw mainResponse.message;
        }
        yield put({ type: 'UPLOPAD_DOC_ADDITIONAL_DETAILS_SUCCESS' });
        if (action.actions.callback && mainResponse && !mainResponse.error) {

            action.actions.callback(mainResponse || {});
        }
    } catch (error) {
        action.actions.errorCallback();
        yield put({ type: 'UPLOPAD_DOC_ADDITIONAL_DETAILS_FAILURE' });
        yield call(handleError, error);
    }
}

export function* uploadDocumentSaga(action) {
    try {
        const token = yield select(store => store.userData.token);
        const mainResponse = yield call(uploadDocument, token, action.actions.data);
        if (mainResponse && mainResponse.statusCode && mainResponse.statusCode == 200) {
            yield put({ type: 'UPLOPAD_DOC_SUCCESS' });
            yield call(handleSuccess, mainResponse.message);
            if (action.actions && action.actions.callback) {
                action.actions.callback(mainResponse.data || {});
            }
        }
        else {
            yield put({ type: 'UPLOPAD_DOC_FAILURE' });
            yield call(handleError, mainResponse.message);
        }
    } catch (error) {
        yield put({ type: 'UPLOPAD_DOC_FAILURE' });
        yield call(handleError, error);
    }
}

export function* uploadCurrentDocumentSaga(action) {
    try {
        const token = yield select(store => store.userData.token);
        const mainResponse = yield call(uploadCurrentDocument, token, action.actions.data);
        if (mainResponse && mainResponse.statusCode && mainResponse.statusCode == 200) {
            yield put({ type: 'UPLOPAD_CURRENT_DOC_SUCCESS' });
            yield call(handleSuccess, mainResponse.message);
            if (action.actions && action.actions.callback) {
                action.actions.callback(mainResponse.data || {});
            }
        }
        else {
            yield put({ type: 'UPLOPAD_CURRENT_DOC_FAILURE' });
            yield call(handleError, mainResponse.message);
        }
    } catch (error) {
        yield put({ type: 'UPLOPAD_CURRENT_DOC_FAILURE' });
        yield call(handleError, error);
    }
}

export function* getCityState(action) {
    try {
        const userData = yield select(userDataSelector());

        const mainResponse = yield call(getCityStateAPI, userData.token || "", action.actions.pincode);

        if (mainResponse && mainResponse.status && mainResponse.status === 200) {
            yield call(handleSuccess, mainResponse.data.message);
            if (action.actions && action.actions.callback) {
                action.actions.callback(mainResponse.data || {});
            }
        }
    } catch (error) {
        yield call(handleError, error);
    }
}

export function* getResidenceType(action) {
    try {
        const userData = yield select(userDataSelector());

        const mainResponse = yield call(getResidenceTypeAPI, userData.token || "");

        if (mainResponse && mainResponse.data && !mainResponse.data.error) {
            if (action.actions && action.actions.callback) {
                action.actions.callback(mainResponse.data || {});
            }
        }
    } catch (error) {
        yield call(handleError, error);
    }
}

export function* saveEmploymentDetailsSaga(action) {
    try {
        const userData = yield select(userDataSelector());

        const mainResponse = yield call(saveEmploymentDetailsAPI, userData.token || "", action.actions.dataToAPI);

        if (mainResponse && mainResponse.data && !mainResponse.data.error) {
            yield put({ type: 'SAVE_EMPLOYMENT_DETAILS_SUCCESS' });
            yield call(handleSuccess, mainResponse.data.message);
            if (action.actions && action.actions.callback) {
                action.actions.callback(mainResponse.data || {});
            }
        }
    } catch (error) {
        yield put({ type: 'SAVE_EMPLOYMENT_DETAILS_FAILURE' });
        yield call(handleError, error);
    }
}

export function* getProfessionSaga(action) {
    try {
        const userData = yield select(userDataSelector());
        const mainResponse = yield call(getProfessionAPI, userData.token || "");

        if (mainResponse && mainResponse.data && !mainResponse.data.error) {
            yield put({ type: 'GET_PROFESSION_SUCCESS' });
            if (action.actions && action.actions.callback) {
                action.actions.callback(mainResponse.data || {});
            }
        }
    } catch (error) {
        yield put({ type: 'GET_PROFESSION_FAILURE' });
        yield call(handleError, error);
    }
}
export function* getSubCategoryListSaga(action) {
    try {
        const userData = yield select(userDataSelector());
        const mainResponse = yield call(getSubCategoryListAPI, userData.token || "", action.actions.dataToAPI.profession );

        if (mainResponse && mainResponse.data && !mainResponse.data.error) {
            yield put({ type: 'GET_SUB_CATEGORY_SUCCESS' });
            if (action.actions && action.actions.callback) {
                action.actions.callback(mainResponse.data || {});
            }
        }
    } catch (error) {
        yield put({ type: 'GET_SUB_CATEGORY_FAILURE' });
        yield call(handleError, error);
    }
}
export function* getDesignationsSaga(action) {
    try {
        const userData = yield select(userDataSelector());
        const mainResponse = yield call(getDesignationsAPI, userData.token || "", action.actions.dataToAPI);

        if (mainResponse && mainResponse.data && !mainResponse.data.error) {
            yield put({ type: 'GET_DESIGNATIONS_SUCCESS' });
            if (action.actions && action.actions.callback) {
                action.actions.callback(mainResponse.data || {});
            }
        }
    } catch (error) {
        yield put({ type: 'GET_DESIGNATIONS_FAILURE' });
        yield call(handleError, error);
    }
}
export function* getCompanyListSaga(action) {
    try {
        const userData = yield select(userDataSelector());
        const mainResponse = yield call(getCompanyListAPI, userData.token || "", action.actions.dataToAPI);

        if (mainResponse && mainResponse.data && !mainResponse.data.error) {
            yield put({ type: 'GET_COMPANY_LIST_SUCCESS' });
            if (action.actions && action.actions.callback) {
                action.actions.callback(mainResponse.data || {});
            }
        }
    } catch (error) {
        yield put({ type: 'GET_COMPANY_LIST_FAILURE' });
        yield call(handleError, error);
    }
}

export function* saveAdditionalContactSaga(action) {
    try {
        const userData = yield select(userDataSelector());

        const mainResponse = yield call(saveAdditionalContactAPI, userData.token || "", action.actions.dataToAPI);
        if (mainResponse && mainResponse.data && !mainResponse.data.error) {
            yield call(handleSuccess, mainResponse.data.message);
            yield put({ type: 'SAVE_ADDITIONAL_CONTACT_SUCCESS' });
            if (action.actions && action.actions.callback) {
                action.actions.callback(mainResponse.data || {});
            }
        }
    } catch (error) {
        yield put({ type: 'SAVE_ADDITIONAL_CONTACT_FAILURE' });
        yield call(handleError, error);
    }
}

export function* saveOfficeAddressSaga(action) {
    try {
        const userData = yield select(userDataSelector());

        const mainResponse = yield call(saveOfficeAddressAPI, userData.token || "", action.actions.dataToAPI1);
        if (mainResponse && mainResponse.data && !mainResponse.data.error) {
            (action?.actions?.dataToAPI1?.msgHide) ? null: 
             yield call(handleSuccess, mainResponse.data.message)
             
            yield put({ type: 'SAVE_OFFICE_ADDRESS_SUCCESS' });
            if (action.actions && action.actions.callback) {
                action.actions.callback(mainResponse.data || {});
            }
        }
    } catch (error) {
        yield put({ type: 'SAVE_OFFICE_ADDRESS_FAILURE' });
        yield call(handleError, error);
    }
}

export function* savePermanentAddressSaga(action) {
    try {
        const userData = yield select(userDataSelector());

        const mainResponse = yield call(savePermanentAddressAPI, userData.token || "", action.actions.dataToAPI);
        if (mainResponse && mainResponse.data && !mainResponse.data.error) {
             yield call(handleSuccess, mainResponse.data.message)
             
            yield put({ type: 'SAVE_OFFICE_ADDRESS_SUCCESS' });
            if (action.actions && action.actions.callback) {
                action.actions.callback(mainResponse.data || {});
            }
        }
    } catch (error) {
        yield put({ type: 'SAVE_OFFICE_ADDRESS_FAILURE' });
        yield call(handleError, error);
    }
}

export function* getCityListSaga(action) {
    try {
        const userData = yield select(userDataSelector());

        const mainResponse = yield call(getCityListAPI, userData.token || "");

        if (mainResponse && mainResponse.data && !mainResponse.data.error) {
            yield put({ type: 'GET_CITY_LIST_SUCCESS' });
            if (action.actions && action.actions.callback) {
                action.actions.callback(mainResponse.data || {});
            }
        }
    } catch (error) {
        yield put({ type: 'GET_CITY_LIST_FAILURE' });
        yield call(handleError, error);
    }
}

export function* saveKYCDetailSaga(action) {
    try {
        const userData = yield select(userDataSelector());

        const mainResponse = yield call(saveKYCDetailAPI, userData.token || "", action.actions.dataToAPI);

        if (mainResponse && mainResponse.data && !mainResponse.data.error) {
            yield call(handleSuccess, mainResponse.data.message);
            yield put({ type: 'SAVE_KYC_DETAIL_SUCCESS' });
            if (action.actions && action.actions.callback) {
                action.actions.callback(mainResponse.data || {});
            }
        }
    } catch (error) {
        yield put({ type: 'SAVE_KYC_DETAIL_FAILURE' });
        yield call(handleError, error);
    }
}

export function* getKYCDocSaga(action) {
    try {
        const userData = yield select(userDataSelector());
        const mainResponse = yield call(getKYCDocAPI, userData.token || "");

        if (mainResponse && mainResponse.data && !mainResponse.data.error) {
            if (action.actions && action.actions.callback) {
                action.actions.callback(mainResponse.data || {});
            }
        }
    } catch (error) {
        yield call(handleError, error);
    }
}

export function* getUtilityDocSaga(action) {
    try {
        const userData = yield select(userDataSelector());

        const mainResponse = yield call(getUtilityDocAPI, userData.token || "");

        if (mainResponse && mainResponse.data && !mainResponse.data.error) {
            if (action.actions && action.actions.callback) {
                action.actions.callback(mainResponse.data || {});
            }
        }
    } catch (error) {
        yield call(handleError, error);
    }
}

export function* getServiceProviderSaga(action) {
    try {
        const userData = yield select(userDataSelector());
        const mainResponse = yield call(getServiceProviderAPI, userData.token || "", action.actions.dataToAPIS);
        if (mainResponse && mainResponse.data && !mainResponse.data.error) {
            if (action.actions && action.actions.callback) {
                action.actions.callback(mainResponse.data || {});
            }
        }
    } catch (error) {
        yield call(handleError, error);
    }
}

export function* saveUtilityDetailSaga(action) {
    try {
        const userData = yield select(userDataSelector());

        const mainResponse = yield call(saveUtilityDetailAPI, userData.token || "", action.actions.dataToAPI);

        if (mainResponse && mainResponse.data && !mainResponse.data.error) {
            yield call(handleSuccess, mainResponse.data.message);
            yield put({ type: 'SAVE_UTILITY_DETAILS_SUCCESS' });
            if (action.actions && action.actions.callback) {
                action.actions.callback(mainResponse.data || {});
            }
        }
    } catch (error) {
        yield put({ type: 'SAVE_UTILITY_DETAILS_FAILURE' });
        yield call(handleError, error);
    }
}

export function* getDetailsElectricitySaga(action) {
    try {
        const mainResponse = yield call(getDetailsElectricityAPI, action.actions.dataToAPI);

        if (mainResponse && mainResponse.data && !mainResponse.data.error) {
            yield put({ type: 'GET_DETAILS_ELECTRICITY_SUCCESS' });
            yield call(handleSuccess, mainResponse.data.message);
            if (action.actions && action.actions.callback) {
                action.actions.callback(mainResponse.data || {});
            }
        }
    } catch (error) {
        yield put({ type: 'GET_DETAILS_ELECTRICITY_FAILURE' });
        yield call(handleError, error);
    }
}

export function* getDetailsGasSaga(action) {
    try {
        const userData = yield select(userDataSelector());
        const mainResponse = yield call(getDetailsGasAPI, userData.token || "", action.actions.dataToAPI);

        if (mainResponse && mainResponse.data && !mainResponse.data.error) {
            yield put({ type: 'GET_DETAILS_GAS_SUCCESS' });
            if (action.actions && action.actions.callback) {
                yield call(handleSuccess, mainResponse.data.message);
                action.actions.callback(mainResponse.data || {});
            }
        }
    } catch (error) {
        yield put({ type: 'GET_DETAILS_GAS_FAILURE' });
        yield call(handleError, error);
    }
}

export function* getDetailsLandlineSaga(action) {
    try {
        const mainResponse = yield call(getDetailsLandlineAPI, action.actions.dataToAPI);

        if (mainResponse && mainResponse.data && !mainResponse.data.error) {
            yield put({ type: 'GET_DETAILS_LANDLINE_SUCCESS' });
            if (action.actions && action.actions.callback) {
                yield call(handleSuccess, mainResponse.data.message);
                action.actions.callback(mainResponse.data || {});
            }
        }
    } catch (error) {
        yield put({ type: 'GET_DETAILS_LANDLINE_FAILURE' });
        yield call(handleError, error);
    }
}

export function* uploadUtilityDocSaga(action) {
    try {
        const userData = yield select(userDataSelector());

        const mainResponse = yield call(uploadUtilityDocAPI, userData.token || "", action.actions);
        if (mainResponse && mainResponse.error) {
            throw mainResponse.message;
        }
        if (action.actions.callback && mainResponse && !mainResponse.error) {
            yield put({ type: 'UPLOAD_UTILITY_DOC_SUCCESS' });
            action.actions.callback(mainResponse.data || {});
        }
    } catch (error) {
        yield put({ type: 'UPLOAD_UTILITY_DOC_FAILURE' });

        yield call(handleError, error);
    }
}

export function* deleteUtilityDocSaga(action) {
    try {
        const userData = yield select(userDataSelector());

        const mainResponse = yield call(deleteUtilityDocAPI, userData.token || "", action.actions.dataToAPI);

        if (mainResponse && mainResponse.data && !mainResponse.data.error) {
            yield call(handleSuccess, mainResponse.data.message);
            if (action.actions && action.actions.callback) {
                action.actions.callback(mainResponse || {});
            }
        }
    } catch (error) {
        yield call(handleError, error);
    }
}

export function* verifyDrivingLicenseSaga(action) {
    try {
        const userData = yield select(userDataSelector());

        const mainResponse = yield call(verifyDrivingLicenseAPI, userData.token || "", action.actions.dataToAPI);

        if (mainResponse && mainResponse.data && !mainResponse.data.error) {
            yield put({ type: 'VERIFY_DRIVING_LICENSE_SUCCESS' });
            if (action.actions && action.actions.callback) {
                action.actions.callback(mainResponse.data || {});
            }
        }
    } catch (error) {
        yield put({ type: 'VERIFY_DRIVING_LICENSE_FAILURE' });
        yield call(handleError, error);
    }
}

export function* verifyVoterIDSaga(action) {
    try {
        const userData = yield select(userDataSelector());

        const mainResponse = yield call(verifyVoterIDAPI, userData.token || "", action.actions.dataToAPI);

        if (mainResponse && mainResponse.data && !mainResponse.data.error) {
            yield put({ type: 'VERIFY_VOTER_ID_SUCCESS' });
            if (action.actions && action.actions.callback) {
                action.actions.callback(mainResponse.data || {});
            }
        }
    } catch (error) {
        yield put({ type: 'VERIFY_VOTER_ID_FAILURE' });
        yield call(handleError, error);
    }
}

export function* getDesignationSaga(action) {
    try {
        const userData = yield select(userDataSelector());

        const mainResponse = yield call(getDesignationAPI, userData.token || "", action.actions.pincode);

        if (mainResponse && mainResponse.status && mainResponse.status === 200) {
            if (action.actions && action.actions.callback) {
                action.actions.callback(mainResponse.data || {});
            }
        }
    } catch (error) {
        yield call(handleError, error);
    }
}

export function* getIndustrySaga(action) {
    try {
        const userData = yield select(userDataSelector());

        const mainResponse = yield call(getIndustryAPI, userData.token || "", action.actions.pincode);

        if (mainResponse && mainResponse.status && mainResponse.status === 200) {
            if (action.actions && action.actions.callback) {
                action.actions.callback(mainResponse.data || {});
            }
        }
    } catch (error) {
        yield call(handleError, error);
    }
}

export function* getCompanyTypeSaga(action) {

    try {
        const userData = yield select(userDataSelector());

        const mainResponse = yield call(getCompanyTypeAPI, userData.token || "", action.actions.pincode);

        if (mainResponse && mainResponse.status && mainResponse.status === 200) {
            if (action.actions && action.actions.callback) {
                action.actions.callback(mainResponse.data || {});
            }
        }
    } catch (error) {
        yield call(handleError, error);
    }
}

export function* deleteDocumentSaga(action) {
    try {
        const token = yield select(store => store.userData.token);
        const mainResponse = yield call(deleteDocumentAPI, token, action.actions.data);

        if (mainResponse && mainResponse.status && mainResponse.status === 200) {
            if (action.actions && action.actions.callback) {
                action.actions.callback(mainResponse.data || {});
            }

        }
    } catch (error) {
       
    }
}

export function* deletePerDocumentSaga(action) {
    try {
        const token = yield select(store => store.userData.token);
        const mainResponse = yield call(deletePerDocumentAPI, token, action.actions.dataToAPI);
        if (mainResponse && mainResponse.status && mainResponse.status === 200) {
            yield call(handleSuccess, mainResponse.data.message);
            if (action.actions && action.actions.callback) {
                action.actions.callback(mainResponse.data || {});
            }

        }
    } catch (error) {
       
    }
}

export function* deleteUtilitySaga(action) {
    try {
        const token = yield select(store => store.userData.token);
        const mainResponse = yield call(deleteUtilityAPI, token, action.actions.data);

        if (mainResponse && mainResponse.status && mainResponse.status === 200) {
            if (action.actions && action.actions.callback) {
                action.actions.callback(mainResponse.data || {});
            }

        }
    } catch (error) {

    }
}

export function* gstADDRSAGA(action) {
    try {
        const token = yield select(store => store.userData.token);
        const mainResponse = yield call(gstADDRAPI, token, action.actions.dataToAPI);

        if (mainResponse && mainResponse.status && mainResponse.status === 200) {
            if (action.actions && action.actions.callback) {
                action.actions.callback(mainResponse.data || {});
            }

        }
    } catch (error) {

    }
}

export function* dedupeCheckSaga(action) {
    try {
        const token = yield select(store => store.userData.token);
        const mainResponse = yield call(dedupeChecks, token, action.actions.data);
        if (mainResponse && mainResponse.status && mainResponse.status === 200) {
            yield put({ type: 'DEDUPE_CHECK_SUCCESS' });
            yield call(handleSuccess, mainResponse.data.message);

            if (action.actions && action.actions.callback) {
                action.actions.callback(mainResponse.data || {});
            }

        }
    } catch (error) {
        yield put({ type: 'DEDUPE_CHECK_FAILURE' });
        yield call(handleError, error);
    }
}

export function* getDedupeIdSaga(action) {
    try {
        const userData = yield select(userDataSelector());

        const mainResponse = yield call(getDedupeId, userData.token || "",  action.actions.data);

        if (mainResponse && mainResponse.data && !mainResponse.data.error) {
            if (action.actions && action.actions.callback) {
                action.actions.callback(mainResponse.data || {});
            }
        }
    } catch (error) {
        yield call(handleError, error);
    }
}