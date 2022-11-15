import { call, put, takeEvery, select } from 'redux-saga/effects';
import { saveUpdateFamilyReference, saveUpdateNonFamilyReference } from "../../api/References";
import { handleError, handleSuccess } from "../../../utils";

export function* saveUpdateFamilyReferenceSaga(action) {
    try {
        const token = yield select(store => store.userData.token);
        const mainResponse = yield call(saveUpdateFamilyReference, token, action.actions.data
        );
        if (mainResponse && mainResponse.status && mainResponse.status === 200) {
            yield put({ type: 'SAVE_UPDATE_FAMILY_REFERENCE_SUCCESS' });
            yield call(handleSuccess, mainResponse.data['message']);
            if (action.actions && action.actions.callback) {
                action.actions.callback(mainResponse.data || {});
            }
        }
    } catch (error) {
        yield put({ type: 'SAVE_UPDATE_FAMILY_REFERENCE_FAILURE' });
        yield call(handleError, error);
    }
}
export function* saveUpdateNonFamilyReferenceSaga(action) {
    try {
        const token = yield select(store => store.userData.token);
        const mainResponse = yield call(saveUpdateNonFamilyReference, token, action.actions.data
        );
        if (mainResponse && mainResponse.status && mainResponse.status === 200) {
            yield put({ type: 'SAVE_UPDATE_NON_FAMILY_REFERENCE_SUCCESS' });
            yield call(handleSuccess, mainResponse.data['message']);
            if (action.actions && action.actions.callback) {
                action.actions.callback(mainResponse.data || {});
            }
        }
    } catch (error) {
        yield put({ type: 'SAVE_UPDATE_NON_FAMILY_REFERENCE_FAILURE' });
        yield call(handleError, error);
    }
}