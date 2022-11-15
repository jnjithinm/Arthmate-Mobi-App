import { call, put, takeEvery, select } from 'redux-saga/effects';
import { saveScheme, createUpdateCustomer } from "../../api/Scheme";
import { handleError, handleSuccess } from "../../../utils";

export function* saveSchemeSaga(action) {
    try {
        const token = yield select(store => store.userData.token);
        const mainResponse = yield call(saveScheme, token, action.actions.data
        );
        if (mainResponse && mainResponse.status && mainResponse.status === 200) {
            yield put({ type: 'SAVE_SCHEME_SUCCESS' });
            yield call(handleSuccess, mainResponse.data.message);
            if (action.actions && action.actions.callback) {
                action.actions.callback(mainResponse.data || {});
            }
        }
    } catch (error) {
        yield put({ type: 'SAVE_SCHEME_FAILURE' });
        yield call(handleError, error);
    }
}
export function* createUpdateCustomerSaga(action) {
    try {

        const token = yield select(store => store.userData.token);
        const mainResponse = yield call(createUpdateCustomer, token, action.actions.data);
        if (mainResponse && mainResponse.status && mainResponse.status === 200) {
            yield put({ type: 'CREATE_UPDATE_CUSTOMER_SUCCESS' });
            // yield put({ type: 'CREATE_UPDATE_CUSTOMER' });
            mainResponse?.data?.type == "bureau" ?
            yield call(handleError, mainResponse.data.message):
            yield call(handleSuccess, mainResponse.data.message);
            if (action.actions && action.actions.callback) {
                action.actions.callback(mainResponse.data || {});
            }
        }
    } catch (error) {
        yield put({ type: 'CREATE_UPDATE_CUSTOMER_FAILURE' });
        yield call(handleError, error);
    }
}