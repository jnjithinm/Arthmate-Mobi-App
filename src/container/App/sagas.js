import { call, put, takeEvery } from 'redux-saga/effects';

import { clearUserData } from "../App/actions";
// import * as NavigationService from "../../../navigationService";

export function* logoutSaga(action) {
    try {
        //yield put(clearUserData());
    } catch (error) {
    }
}
