import { call, select, put } from 'redux-saga/effects';

import {  getAndroidVersionAPI } from "../../api/AndroidVersion";
import { handleError, handleSuccess } from "../../../utils";
import { userDataSelector } from "../App/selector";



export function* getAndroidVersion(action) {
    try {
        const mainResponse = yield call(getAndroidVersionAPI );
        if (mainResponse && mainResponse.status && mainResponse.status === 200) {
            // yield call(handleSuccess, mainResponse.data.message);
            if (action.actions && action.actions.callback) {
                action.actions.callback(mainResponse.data || {});
            }
        }
    } catch (error) {
        yield call(handleError, error);
    }
}

export function* getCityState(action) {
    try {
        const userData = yield select(userDataSelector());
        const mainResponse = yield call(getCityStateAPI, userData.token || "", action.actions.pincode);
        if (mainResponse && mainResponse.status && mainResponse.status === 200) {
            yield call(handleSuccess, mainResponse.data.message);
            if (action.actions && action.actions.callback) {
                action.actions.callback(mainResponse.data || {});
            }
        }
    } catch (error) {
        yield call(handleError, error);
    }
}
