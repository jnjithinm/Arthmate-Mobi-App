import { call, select, put } from 'redux-saga/effects';

import { getEntityApi, verifyPANApi, savePANApi, deletePANAPI, gstWrapperAPI } from "../../api/PANAndGSTVerification";
import { handleError, handleSuccess } from "../../../utils";
import { userDataSelector } from "../App/selector";

export function* getEntitySaga(action) {
    try {
        const userData = yield select(userDataSelector());

        const mainResponse = yield call(getEntityApi, userData.token || "");

        if (mainResponse && mainResponse.status && mainResponse.status === 200) {
            if (action.actions && action.actions.callback) {
                action.actions.callback(mainResponse.data || {});
            }
        }
    } catch (error) {
        yield call(handleError, error);
    }
}

export function* verifyPANSaga(action) {
    try {
        const userData = yield select(userDataSelector());

        const mainResponse = yield call(verifyPANApi, userData.token || "", action.actions.dataToAPI);
        if (mainResponse && mainResponse.status && mainResponse.status === 200) {
            yield put({ type: 'VERIFY_PAN_API_SUCCESS' });
            handleSuccess(mainResponse.data.message);
            if (action.actions && action.actions.callback) {
                action.actions.callback(mainResponse.data || {});
            }
        }
    } catch (error) {
        yield put({ type: 'VERIFY_PAN_API_FAILURE' });
        action.actions.errorcallback();
        yield call(handleError, error);
    }
}

export function* savePANSaga(action) {
    try {
        const userData = yield select(userDataSelector());
        const mainResponse = yield call(savePANApi, userData.token || "", action.actions.dataToAPI);
        if (mainResponse && mainResponse.status && mainResponse.status === 200) {
            yield put({ type: 'SAVE_PAN_API_SUCCESS' });
            handleSuccess(mainResponse.data.message);
            if (action.actions && action.actions.callback) {
                action.actions.callback(mainResponse.data || {});
            }
        }
    } 
    catch (error) {    
        yield put({ type: 'SAVE_PAN_API_FAILURE' });
        yield call(handleError, error);
    }
   
}

export function* deletePANSaga(action) {
    try {
        const userData = yield select(userDataSelector());

        const mainResponse = yield call(deletePANAPI, userData.token || "", action.actions.dataToAPI);

        if (mainResponse && mainResponse.status && mainResponse.status === 200 && !mainResponse.data.error) {
            yield put({ type: 'DELETE_PAN_API_SUCCESS' });
            handleSuccess(mainResponse.data.message);
            if (action.actions && action.actions.callback) {
                action.actions.callback(mainResponse.data || {});
            }
        }
    } 
    catch (error) {
        yield put({ type: 'DELETE_PAN_API_FAILURE' });
        yield call(handleError, error);
    }
    
}

export function* gstwrapSaga(action) {
    try {
        const userData = yield select(userDataSelector());
        const mainResponse = yield call(gstWrapperAPI, userData.token || "", action.actions.dataToAPI);
        if (mainResponse && mainResponse.status && mainResponse.status === 200 && !mainResponse.data.error) {

            handleSuccess(mainResponse.data.message);
            if (action.actions && action.actions.callback) {
                action.actions.callback(mainResponse.data || {});
            }
        }
    } catch (error) {

        yield call(handleError, error);
    }
}