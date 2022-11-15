import { call, put, takeEvery, select } from 'redux-saga/effects';

import { dashboardApi, getUserDetaisApi , getGlobalLoginApi} from "../../api/Dashboard";
import { handleError, handleSuccess } from "../../../utils";

export function* dashboardSaga(action) {
    try {
        const token = yield select(store => store.userData.token);
        const mainResponse = yield call(dashboardApi, token, action.actions.data);
        if (mainResponse && mainResponse.status && mainResponse.status === 200) {
            yield put({ type: 'DASHBOARD_API_SUCCESS' });
            if (action.actions && action.actions.callback) {
                action.actions.callback(mainResponse.data || {});
            }
        }
    } catch (error) {
        yield put({ type: 'DASHBOARD_API_FAILURE' });
        yield call(handleError, error);
    }
}

export function* getUserDetailsSaga(action) {
    try {
        const token = yield select(store => store.userData.token);
        const mainResponse = yield call(getUserDetaisApi, token, action.actions.data);
        if (mainResponse && mainResponse.status && mainResponse.status === 200) {
            yield put({ type: 'GET_USER_DETAILS_SUCCESS' });
            if (action.actions && action.actions.callback) {
                action.actions.callback(mainResponse.data || {});
            }
        }
    } catch (error) {
        yield put({ type: 'GET_USER_DETAILS_FAILURE' });
        yield call(handleError, error);
    }
}

export function* getGlobalLoginSaga(action) {
    try {
        const token = yield select(store => store.userData.token);
        const mainResponse = yield call(getGlobalLoginApi, token, action.actions.data);
        if (mainResponse && mainResponse.status && mainResponse.status === 200) {
            yield put({ type: 'GLOBAL_LOGIN_SUCCESS' });
            if (action.actions && action.actions.callback) {
                action.actions.callback(mainResponse.data || {});
            }
        }
    } catch (error) {
        yield put({ type: 'GLOBAL_LOGIN_FAILURE' });
        yield call(handleError, error);
    }
}