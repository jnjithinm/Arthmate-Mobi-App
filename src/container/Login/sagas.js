import { call, put } from 'redux-saga/effects';

import { loginApi } from "../../api/Login";
import { saveUserData } from "../App/actions";
import { handleError, handleSuccess } from "../../../utils";

export function* loginSaga(action) {
  try {
    const mainResponse = yield call(loginApi, action.actions.data.emailId, action.actions.data.pwd);

    if (mainResponse && mainResponse.status && mainResponse.status === 200) {
      const userData = mainResponse.data || {};

      yield put({ type: 'LOGIN_SUCCESS' });

      yield put(saveUserData(userData));
      if (action.actions && action.actions.callback) {
        action.actions.callback(mainResponse);
      }
      yield call(handleSuccess, mainResponse.data.message);

    }
  } catch (error) {
    yield put({ type: 'LOGIN_FAILURE' });
    yield call(handleError, error);
  }
}
