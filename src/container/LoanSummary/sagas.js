import { call, put, select } from 'redux-saga/effects';
import { getLoanSummaryAPI, getQDEDataAPI, getCoAppGuarantorAPI, saveCoAppGuarantorAPI, createConsentCoAppGuarantorAPI, deleteCoAppGuarantorAPI, verifyConsentCoAppGuarantorAPI } from "../../api/LoanSummary";
import { handleError, handleSuccess } from "../../../utils";
import { userDataSelector } from "../App/selector";
import { qdePrefillData, savecoAppGuarantorData } from "./actions"

export function* getLoanSummarySaga(action) {
    try {
        const userData = yield select(userDataSelector());
        const mainResponse = yield call(getLoanSummaryAPI, userData.token || "", action.actions.dataToAPI);

        if (mainResponse && !mainResponse.error) {
            yield put({ type: 'GET_LOAN_SUMMARY_SUCCESS' });
            if (action.actions && action.actions.callback) {
                action.actions.callback(mainResponse.data || {});
            }
        }
    } catch (error) {
        yield put({ type: 'GET_LOAN_SUMMARY_FAILURE' });
        yield call(handleError, error);
    }
}

export function* getQDEDataSaga(action) {
    try {
        const userData = yield select(userDataSelector());
        const mainResponse = yield call(getQDEDataAPI, userData.token || "", action.actions.dataForgetQDE);

        if (mainResponse && !mainResponse.error) {
            yield put({ type: 'GET_QDE_DATA_SUCCESS' });
            yield put(qdePrefillData(mainResponse));
            if (action.actions && action.actions.callback) {
                action.actions.callback(mainResponse.data || {});
            }
        }
    } catch (error) {
        yield put({ type: 'GET_QDE_DATA_FAILURE' });
        yield call(handleError, error);
    }
}

export function* getCoAppGuarantor(action) {
    try {
        const userData = yield select(userDataSelector());
        const mainResponse = yield call(getCoAppGuarantorAPI, userData.token || "", action.actions.dataToAPI);

        if (mainResponse && !mainResponse.error) {
            yield put({ type: 'GET_CO_APP_GUARANTOR_SUCCESS' });
            if (action.actions && action.actions.callback) {
                action.actions.callback(mainResponse.data || {});
            }
        }
    } catch (error) {
        yield put({ type: 'SAVE_CO_APP_GUARANTOR_SUCCESS' });
        yield call(handleError, error);
    }
}

export function* saveCoAppGuarantor(action) {
    try {
        const userData = yield select(userDataSelector());
        const mainResponse = yield call(saveCoAppGuarantorAPI, userData.token || "", action.actions.dataToAPI);

        if (mainResponse && !mainResponse.error) {
            yield put({ type: 'SAVE_CO_APP_GUARANTOR_SUCCESS' });
            if (action.actions && action.actions.callback) {
                action.actions.callback(mainResponse.data || {});
            }
        }
    } catch (error) {
        yield put({ type: 'SAVE_CO_APP_GUARANTOR_FAILURE' });
        yield call(handleError, error);
    }
}

export function* createConsentCoAppGuarantor(action) {
    try {
        const userData = yield select(userDataSelector());
        const mainResponse = yield call(createConsentCoAppGuarantorAPI, userData.token || "", action.actions.dataToAPI);

        if (mainResponse && !mainResponse.error) {
            yield put({ type: 'CREATE_CONSENT_COAPP_GUARANTOR_SUCCESS' });
            yield call(handleSuccess, mainResponse.message);
            if (action.actions && action.actions.callback) {
                action.actions.callback(mainResponse || {});
            }
        }
    } catch (error) {
        yield put({ type: 'CREATE_CONSENT_COAPP_GUARANTOR_FAILURE' });
        yield call(handleError, error);
    }
}

export function* deleteCoAppGuarantor(action) {
    try {
        const userData = yield select(userDataSelector());
        const mainResponse = yield call(deleteCoAppGuarantorAPI, userData.token || "", action.actions.dataToAPI);

        if (mainResponse && !mainResponse.error) {
            yield put({ type: 'DELETE_COAPP_GUARANTOR_SUCCESS' });
            yield call(handleSuccess, mainResponse.message);
            if (action.actions && action.actions.callback) {
                action.actions.callback(mainResponse || {});
            }
        }
    } catch (error) {
        yield put({ type: 'DELETE_COAPP_GUARANTOR_FAILURE' });
        yield call(handleError, error);
    }
}

export function* verifyConsentCoAppGuarantor(action) {
    try {
        const userData = yield select(userDataSelector());
        const mainResponse = yield call(verifyConsentCoAppGuarantorAPI, userData.token || "", action.actions.dataToAPI);

        if (mainResponse && !mainResponse.error) {
            yield put({ type: 'VERIFY_CONSENT_COAPP_GUARANTOR_SUCCESS' });
            yield call(handleSuccess, mainResponse.message);
            if (action.actions && action.actions.callback) {
                action.actions.callback(mainResponse || {});
            }
        }
    } catch (error) {
        yield put({ type: 'VERIFY_CONSENT_COAPP_GUARANTOR_FAILURE' });
        yield call(handleError, error);
    }
}

export function* getEmpListSaga(action) {
    try {
        const userData = yield select(userDataSelector());
        const mainResponse = yield call(deleteCoAppGuarantorAPI, userData.token || "", action.actions.dataToAPI);

        if (mainResponse && !mainResponse.error) {
            yield put({ type: 'GET_EMP_LIST_SUCCESS' });
            yield call(handleSuccess, mainResponse.message);
            if (action.actions && action.actions.callback) {
                action.actions.callback(mainResponse || {});
            }
        }
    } catch (error) {
        yield put({ type: 'GET_EMP_LIST_FAILURE' });
        yield call(handleError, error);
    }
}

export function* submitDeviationSaga(action) {
    try {
        const userData = yield select(userDataSelector());
        const mainResponse = yield call(verifyConsentCoAppGuarantorAPI, userData.token || "", action.actions.dataToAPI);

        if (mainResponse && !mainResponse.error) {
            yield put({ type: 'SUBMIT_DEVIATION_SUCCESS' });
            yield call(handleSuccess, mainResponse.message);
            if (action.actions && action.actions.callback) {
                action.actions.callback(mainResponse || {});
            }
        }
    } catch (error) {
        yield put({ type: 'SUBMIT_DEVIATION_FAILURE' });
        yield call(handleError, error);
    }
}