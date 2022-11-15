import { call, put, takeEvery, select } from 'redux-saga/effects';
import { uploadDisbusementDocument, deleteDisbursementDocument, getDisbursementDocument } from "../../api/PreDisbursalDocument";
import { handleError, handleSuccess } from "../../../utils";

export function* uploadDisbusementDocumentSaga(action) {
    try {
        const token = yield select(store => store.userData.token);
        const mainResponse = yield call(uploadDisbusementDocument, token, action.actions.data);
        if (mainResponse && !mainResponse.error && mainResponse.statusCode && mainResponse.statusCode == 200) {
            yield put({ type: 'UPLOAD_DISBURSEMENT_DOCUMENT_SUCCESS' });
            yield call(handleSuccess, mainResponse.message);
            if (action.actions && action.actions.callback) {
                action.actions.callback(mainResponse.data || {});
            }
        }
        else {
            yield put({ type: 'UPLOAD_DISBURSEMENT_DOCUMENT_FAILURE' });
            yield call(handleError, mainResponse.message);
        }
    } catch (error) {
        yield put({ type: 'UPLOAD_DISBURSEMENT_DOCUMENT_FAILURE' });
        yield call(handleError, error);
    }
}

export function* deleteDisbursementDocumentSaga(action) {
    try {
        const token = yield select(store => store.userData.token);
        const mainResponse = yield call(deleteDisbursementDocument, token, action.actions.data);
        if (mainResponse && mainResponse.status && mainResponse.status === 200) {
            yield put({ type: 'DELETE_DISBURSEMENT_DOCUMENT_SUCCESS' });
            if (action.actions && action.actions.callback) {
                action.actions.callback(mainResponse.data || {});
            }
            yield call(handleSuccess, mainResponse.data.message);
        }
    } catch (error) {
        yield put({ type: 'DELETE_DISBURSEMENT_DOCUMENT_FAILURE' });
        yield call(handleError, error);
    }
}

export function* getDisbursementDocumentSaga(action) {
    try {
        const token = yield select(store => store.userData.token);
        const mainResponse = yield call(getDisbursementDocument, token, action.actions.data);
        if (mainResponse && mainResponse.status && mainResponse.status === 200) {
            yield put({ type: 'GET_DISBURSEMENT_DOCUMENT_SUCCESS' });
            if (action.actions && action.actions.callback) {
                action.actions.callback(mainResponse.data || {});
            }
            yield call(handleSuccess, mainResponse.data.message);
        }
    } catch (error) {
        yield put({ type: 'GET_DISBURSEMENT_DOCUMENT_FAILURE' });
        yield call(handleError, error);
    }
}