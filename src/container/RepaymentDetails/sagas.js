import { call, select, put } from 'redux-saga/effects';

import { saveDisbursementRepaymentDetails, validateVpaApi, gnerateNachToken, getNachData, submitEnachData, saveRepaymentDetails, getDisbursementRepaymentDetails, getRepaymentDetails } from "../../api/Repayment";
import { handleError, handleSuccess } from "../../../utils";


export function* saveRepaymentDetailsSaga(action) {
    try {
        const token = yield select(store => store.userData.token);
        const mainResponse = yield call(saveRepaymentDetails, token, action.actions.data);
        if (mainResponse && mainResponse.status && mainResponse.status === 200) {
            yield put({ type: 'SAVE_REPAYMENT_DETAILS_SUCCESS' });
            if (action.actions && action.actions.callback) {
                action.actions.callback(mainResponse.data || {});
            }
        }
    } catch (error) {
        yield put({ type: 'SAVE_REPAYMENT_DETAILS_FAILURE' });
        yield call(handleError, error);
    }
}

export function* generateEnachTokenSaga(action) {
    try {
        const token = yield select(store => store.userData.token);
        const mainResponse = yield call(gnerateNachToken, token, action.actions.data);
        if (mainResponse && mainResponse.status && mainResponse.status === 200) {
            yield put({ type: 'GENERATE_ENACH_TOKEN_SUCCESS' });
            yield call(handleSuccess, mainResponse.data.message);

            if (action.actions && action.actions.callback) {
                action.actions.callback(mainResponse.data || {});
            }
        }
    } catch (error) {
        yield put({ type: 'GENERATE_ENACH_TOKEN_FAILURE' });
        yield call(handleError, error);
    }
}

export function* getEnachDataSaga(action) {
    try {
        const token = yield select(store => store.userData.token);
        const mainResponse = yield call(getNachData, token, action.actions.data);
        if (mainResponse && mainResponse.status && mainResponse.status === 200) {
            yield put({ type: 'GET_ENACH_DATA_SUCCESS' });
            // yield call(handleSuccess, mainResponse.data.message);
            if (action.actions && action.actions.callback) {
                action.actions.callback(mainResponse.data || {});
            }
        }
    } catch (error) {
        yield put({ type: 'GET_ENACH_DATA_FAILURE' });
        yield call(handleError, error);
    }
}

export function* submitEnachSaga(action) {
    try {
        const token = yield select(store => store.userData.token);
        const mainResponse = yield call(submitEnachData, token, action.actions.data);

        if (mainResponse && mainResponse.status && mainResponse.status === 200) {
            yield put({ type: 'SUBMIT_ENACH_SUCCESS' });
            // yield call(handleSuccess, mainResponse.data.message);
            if (action.actions && action.actions.callback) {
                action.actions.callback(mainResponse.data || {});
            }
        }
    } catch (error) {
        yield put({ type: 'SUBMIT_ENACH_FAILURE' });
        yield call(handleError, error);
    }
}

export function* validateVpaSaga(action) {
    try {
        const token = yield select(store => store.userData.token);
        const mainResponse = yield call(validateVpaApi, token, action.actions.data);

        if (mainResponse && mainResponse.status && mainResponse.status === 200) {
            yield put({ type: 'VALIDATE_VPA_SUCCESS' });
            yield call(handleSuccess, mainResponse.data.message);
            if (action.actions && action.actions.callback) {
                action.actions.callback(mainResponse.data || {});
            }
        }
    } catch (error) {
        yield put({ type: 'VALIDATE_VPA_FAILURE' });
        yield call(handleError, error);
    }
}


export function* getRepaymentDetailsSaga(action) {
    try {
        const token = yield select(store => store.userData.token);
        const mainResponse = yield call(getRepaymentDetails, token, action.actions.data);

        if (mainResponse && mainResponse.status && mainResponse.status === 200) {
            yield put({ type: 'GET_REPAYMENT_DETAILS_SUCCESS' });
            // yield call(handleSuccess, mainResponse.data.message);
            if (action.actions && action.actions.callback) {
                action.actions.callback(mainResponse.data || {});
            }
        }
    } catch (error) {
        yield put({ type: 'GET_REPAYMENT_DETAILS_FAILURE' });
        yield call(handleError, error);
    }
}

export function* saveDisbursementRepaymentDetailsSaga(action) {
    try {
        const token = yield select(store => store.userData.token);
        const mainResponse = yield call(saveDisbursementRepaymentDetails, token, action.actions.data);
        if (mainResponse && mainResponse.status && mainResponse.status === 200) {
            yield put({ type: 'SAVE_DISBURSEMENT_REPAYMENT_DETAILS_SUCCESS' });
            yield call(handleSuccess, mainResponse.data.message);
            if (action.actions && action.actions.callback) {
                action.actions.callback(mainResponse.data || {});
            }
        }
    } catch (error) {
        yield put({ type: 'SAVE_DISBURSEMENT_REPAYMENT_DETAILS_FAILURE' });
        yield call(handleError, error);
    }
}

export function* getDisbursementRepaymentDetailsSaga(action) {
    try {
        const token = yield select(store => store.userData.token);
        const mainResponse = yield call(getDisbursementRepaymentDetails, token, action.actions.data);
        if (mainResponse && mainResponse.status && mainResponse.status === 200) {
            yield put({ type: 'GET_DISBURSEMENT_REPAYMENT_DETAILS_SUCCESS' });
            //yield call(handleSuccess, mainResponse.data.message);
            if (action.actions && action.actions.callback) {
                action.actions.callback(mainResponse.data || {});
            }
        }
    } catch (error) {
        yield put({ type: 'GET_DISBURSEMENT_REPAYMENT_DETAILS_FAILURE' });
        yield call(handleError, error);
    }
}