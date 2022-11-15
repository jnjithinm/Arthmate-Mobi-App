import { call, put, takeEvery, select } from 'redux-saga/effects';

import { consentPendingApi, deleteLeadApi, AggrigatorUrl, accAggregatorApi, getConsentStatusUrl } from "../../api/ConsentPending";
import { getLeadDetailsApi } from "../../api/GetLeadDetails";
import { handleError, handleSuccess } from "../../../utils";

export function* getLeadDetailsSaga(action) {
    try {
        const token = yield select(store => store.userData.token);
        const mainResponse = yield call(getLeadDetailsApi,
            token,
            action.actions.data.id);

        if (mainResponse && mainResponse.status && mainResponse.status === 200) {
            yield put({ type: 'GET_LEAD_DETAILS_API_SUCCESS' });

            if (action.actions && action.actions.callback) {

                action.actions.callback(mainResponse.data || {});
            }
            // yield call(handleSuccess, mainResponse.data.message);
        }
    } catch (error) {
        yield put({ type: 'GET_LEAD_DETAILS_API_FAILURE' });
        yield call(handleError, error);
    }
}

export function* consentPendingSaga(action) {
    try {
        const token = yield select(store => store.userData.token);
        const mainResponse = yield call(consentPendingApi, token, action.actions.data);

        if (mainResponse && mainResponse.status && mainResponse.status === 200) {
            yield put({ type: 'CONSENT_PENDING_API_SUCCESS' });

            if (action.actions && action.actions.callback) {
                action.actions.callback(mainResponse.data || {});
            }
            yield call(handleSuccess, mainResponse.data.message);
        }
    } catch (error) {
        yield put({ type: 'CONSENT_PENDING_API_FAILURE' });
        yield call(handleError, error);
    }
}

export function* deleteLeadSaga(action) {

    try {
        const token = yield select(store => store.userData.token);
        const mainResponse = yield call(deleteLeadApi,
            token,
            action.actions.data.id);

        if (mainResponse && mainResponse.status && mainResponse.status === 200) {
            yield put({ type: 'DELETE_LEAD_API_SUCCESS' });
            if (action.actions && action.actions.callback) {
                action.actions.callback(mainResponse.data || {});
            }
            yield call(handleSuccess, mainResponse.data.message);
        }
    } catch (error) {
        yield put({ type: 'DELETE_LEAD_API_FAILURE' });
        yield call(handleError, error);
    }
}

export function* accAggrigatorSaga(action) {
    try {
        const token = yield select(store => store.userData.token);
        const mainResponse = yield call(accAggregatorApi, token, action.actions.dataToAPI);

        if (mainResponse && mainResponse.status && mainResponse.status === 200) {
            yield put({ type: 'ACC_AGGREGATOR_API_SUCCESS' });

            if (action.actions && action.actions.callback) {
                action.actions.callback(mainResponse.data || {});
            }
            // yield call(handleSuccess, mainResponse.data.message);
        }
    } catch (error) {
        yield put({ type: 'ACC_AGGREGATOR_API_FAILURE' });
        yield call(handleError, error);
    }
}

export function* accAggrigatorURLSaga(action) {
    try {
        const token = yield select(store => store.userData.token);
        const mainResponse = yield call(AggrigatorUrl, token, action.actions.dataToApi);

        if (mainResponse && mainResponse.status && mainResponse.status === 200) {
            yield put({ type: 'AGGREGATOR_URL_CALL_SUCCESS' });

            if (action.actions && action.actions.callback) {
                action.actions.callback(mainResponse.data || {});
            }
            // yield call(handleSuccess, mainResponse.data.message);
        }
    } catch (error) {
        yield put({ type: 'AGGREGATOR_URL_CALL_FAILURE' });
        yield call(handleError, error);
    }
}

export function* getConsentStatusSaga(action) {
    try {
        const token = yield select(store => store.userData.token);
        const mainResponse = yield call(getConsentStatusUrl, token, action.actions.dataToApi);

        if (mainResponse && mainResponse.status && mainResponse.status === 200) {
            yield put({ type: 'GET_CONSENT_STATUS_SUCCESS' });

            if (action.actions && action.actions.callback) {
                action.actions.callback(mainResponse.data || {});
            }
            // yield call(handleSuccess, mainResponse.data.message);
        }
    } catch (error) {
        yield put({ type: 'GET_CONSENT_STATUS_FAILURE' });
        yield call(handleError, error);
    }
}