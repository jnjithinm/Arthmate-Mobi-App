import { call, put, takeEvery, select } from 'redux-saga/effects';
import { businessSector, businessIndustry, deleteBusinessSelfieAPI, uploadBusinessSelfie, verifyAccountNumber, createUpdateCustomer, businessSubIndustry, businessSegment, saveUpdateBusinessInfo, IFSCCODE } from "../../api/BusinessDetails";
//import { businessSECTOR, businessINDUSTRY, businessSUBINDUSTRY, businessSEGMENT } from "./actions";
import { handleError, handleSuccess } from "../../../utils";
import { userDataSelector } from "../App/selector";

export function* businessSectorSaga(action) {
    try {

        const token = yield select(store => store.userData.token);
        const mainResponse = yield call(businessSector, token);
        if (mainResponse && mainResponse.status && mainResponse.status === 200) {

            if (action.actions && action.actions.callback) {
                action.actions.callback(mainResponse.data || {});
            }
        }
    } catch (error) {
        yield call(handleError, error);
    }
}

export function* uploadSelfieSaga(action) {
    try {
        const userData = yield select(userDataSelector());

        const mainResponse = yield call(uploadBusinessSelfie, userData.token || "", action.actions);
        if (mainResponse && mainResponse.error) {
            throw mainResponse.message;
        }
        if (action.actions.callback && mainResponse && !mainResponse.error) {
            yield put({ type: 'UPLOAD_SELFIE_SUCCESS' });
            action.actions.callback(mainResponse.data || {});
        }
    } catch (error) {
        yield put({ type: 'UPLOAD_SELFIE_FAILURE' });
        yield call(handleError, error);
    }
}

export function* deleteBusinessSelfieSaga(action) {
    try {
        const userData = yield select(userDataSelector());
        const mainResponse = yield call(deleteBusinessSelfieAPI, userData.token || "", action.actions.data);

        if (mainResponse && mainResponse.data && !mainResponse.data.error) {
            yield call(handleSuccess, mainResponse.data.message);
            if (action.actions && action.actions.callback) {
                yield put({ type: 'UPLOAD_SELFIE_SUCCESS' });
                action.actions.callback(mainResponse || {});
            }
        }
    } catch (error) {
        yield put({ type: 'UPLOAD_SELFIE_FAILURE' });
        yield call(handleError, error);
    }
}


export function* businessIndustrySaga(action) {
    try {
        const token = yield select(store => store.userData.token);
        const mainResponse = yield call(businessIndustry, token);
        if (mainResponse && mainResponse.status && mainResponse.status === 200) {
            if (action.actions && action.actions.callback) {
                action.actions.callback(mainResponse.data || {});
            }
        }
    } catch (error) {
        yield call(handleError, error);
    }
}

export function* businessSubIndustrySaga(action) {
    try {
        const token = yield select(store => store.userData.token);
        const mainResponse = yield call(businessSubIndustry, token, action.actions.data.selectedSector);
        if (mainResponse && mainResponse.status && mainResponse.status === 200) {
            if (action.actions && action.actions.callback) {
                action.actions.callback(mainResponse.data || {});
            }
        }
    } catch (error) {
        yield call(handleError, error);
    }
}

export function* businessSegmentSaga(action) {
    try {
        const token = yield select(store => store.userData.token);
        const mainResponse = yield call(businessSegment, token);
        if (mainResponse && mainResponse.status && mainResponse.status === 200) {
            if (action.actions && action.actions.callback) {
                action.actions.callback(mainResponse.data || {});
            }
        }
    } catch (error) {
        yield call(handleError, error);
    }
}

export function* ifscCODESaga(action) {
    try {
        const token = yield select(store => store.userData.token);
        const mainResponse = yield call(IFSCCODE, token, action.actions.data.ifscCode);
        if (mainResponse && mainResponse.status && mainResponse.status === 200) {
            yield put({ type: 'IFSC_CODE_SUCCESS' });

            yield call(handleSuccess, mainResponse.data.message);

            if (action.actions && action.actions.callback) {
                action.actions.callback(mainResponse.data || {});
            }
        }
    } catch (error) {
        yield call(handleError, error);
        yield put({ type: 'IFSC_CODE_FAILURE' });

    }
}

export function* saveUpdateBusinessInfoSaga(action) {
    try {
        const token = yield select(store => store.userData.token);
        const mainResponse = yield call(saveUpdateBusinessInfo, token, action.actions.dataToAPI);
        if (mainResponse && mainResponse.status && mainResponse.status === 200) {
            yield call(handleSuccess, mainResponse.data['message']);
            yield put({ type: 'SAVE_UPDATE_BUSINESS_INFO_SUCCESS' });
            if (action.actions && action.actions.callback) {
                action.actions.callback(mainResponse.data || {});
            }
        }
    } catch (error) {
        yield call(handleError, error);
        yield put({ type: 'SAVE_UPDATE_BUSINESS_INFO_FAILURE' });
    }
}

export function* createCustomer(action) {
    try {
        const token = yield select(store => store.userData.token);
        const mainResponse = yield call(createUpdateCustomer, token, action.actions.dataToAPI);
        if (mainResponse && mainResponse.status && mainResponse.status === 200) {
            yield call(handleSuccess, mainResponse.data['message']);
            yield put({ type: 'CREATE_CUSTOMER_SUCCESS' });
            if (action.actions && action.actions.callback) {
                action.actions.callback(mainResponse.data || {});
            }
        }
    } catch (error) {
        yield call(handleError, error);
        yield put({ type: 'CREATE_CUSTOMER_FAILURE' });
    }
}

export function* verifyAccNumber(action) {
    try {
        const token = yield select(store => store.userData.token);
        const mainResponse = yield call(verifyAccountNumber, token, action.actions.dataToAPI);
        if (mainResponse && mainResponse.status && mainResponse.status === 200) {
            yield call(handleSuccess, mainResponse.data['message']);
            yield put({ type: 'VERIFY_BANK_ACC_NO_SUCCESS' });
            if (action.actions && action.actions.callback) {
                action.actions.callback(mainResponse.data || {});
            }
        }
    } catch (error) {
        yield call(handleError, error);
        yield put({ type: 'VERIFY_BANK_ACC_NO_FAILURE' });
    }
}

