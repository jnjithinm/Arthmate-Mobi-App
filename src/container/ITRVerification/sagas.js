import { call, put, select } from 'redux-saga/effects';

import { handleError, handleSuccess } from "../../../utils";
import { getDDECommomDataAPI, uploadITRDocument, linkToCustomer, deleteITR } from "../../api/ITRVerification";
import { userDataSelector } from "../App/selector";
import { ddePrefillData } from "./actions";

export function* getDDECommonData(action) {
    try {
        const userData = yield select(userDataSelector());
        const mainResponse = yield call(getDDECommomDataAPI, userData.token || "", action.actions.dataToAPI);

        if (mainResponse && !mainResponse.error) {
            yield put({ type: 'GET_DDE_COMMON_DATA_SUCCESS' });
            yield put(ddePrefillData(mainResponse));
            if (action.actions && action.actions.callback) {
                action.actions.callback(mainResponse);
            }
        }
    } catch (error) {
        yield put({ type: 'GET_DDE_COMMON_DATA_FAILURE' });
        yield call(handleError, error);
    }
}

export function* uploadITRDocumentsaga(action) {
    try {
        const token = yield select(store => store.userData.token);
        const mainResponse = yield call(uploadITRDocument, token, action.actions.data);

        if (mainResponse && mainResponse.statusCode && mainResponse.error == false && mainResponse.statusCode == 200) {
            yield put({ type: 'UPLOAD_ITR_DOCUMENT_SUCCESS' });
            if (action.actions && action.actions.callback) {
                action.actions.callback(mainResponse.data || {});
            }
            yield call(handleSuccess, mainResponse.message);
        } else {
            action.actions.callback(mainResponse || {});
            yield put({ type: 'UPLOAD_ITR_DOCUMENT_FAILURE' });
            yield call(handleError, mainResponse.message);

        }
    } catch (error) {
        yield call(handleError, error);
    }
}
export function* linkToCustomersaga(action) {
    try {
        const token = yield select(store => store.userData.token);
        const mainResponse = yield call(linkToCustomer,
            token,
            action.actions.data
        )
        if (mainResponse && mainResponse.data && !mainResponse.data.error) {
            yield put({ type: 'LINK_TO_CUSTOMER_SUCCESS' });
            if (action.actions && action.actions.callback) {
                action.actions.callback(mainResponse);
            }
            yield call(handleSuccess, mainResponse.message);
        }

    } catch (error) {
        yield put({ type: 'LINK_TO_CUSTOMER_FAILURE' });
        yield call(handleError, error);
    }
}

export function* deleteITRsaga(action) {
    try {
        const token = yield select(store => store.userData.token);
        const mainResponse = yield call(deleteITR,
            token,
            action.actions.data
        )
        if (mainResponse && !mainResponse.error) {
            if (action.actions && action.actions.callback) {
                action.actions.callback(mainResponse);
            }
            yield call(handleSuccess, mainResponse.message);
        }
    } catch (error) {
        yield call(handleError, error);
    }
}
