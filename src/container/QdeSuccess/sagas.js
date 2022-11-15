import { call, select } from 'redux-saga/effects';

import { saveUserData } from "../App/actions";
import { handleError, handleSuccess } from "../../../utils";
import { qdeSuccessAPI, submitToCredit, getReasonMasterListApi } from '../../api/QdeSuccess';
import { userDataSelector } from "../App/selector";

export function* qdeSuccessSaga(action) {
  try {
    const userData = yield select(userDataSelector());
    const mainResponse = yield call(qdeSuccessAPI, action.actions.data, userData.token || "");
    if (mainResponse && mainResponse.status && mainResponse.status === 200) {
      if (action.actions && action.actions.callback) {
        action.actions.callback(mainResponse);
      }
      yield call(handleSuccess, mainResponse.data.message);
    }
  } catch (error) {
    yield call(handleError, error);

  }
}

export function* submitToCreditSaga(action) {
  try {
    const userData = yield select(userDataSelector());
    const mainResponse = yield call(submitToCredit, action.actions.data, userData.token || "");
    if (mainResponse && mainResponse.status && mainResponse.status === 200) {
      if (action.actions && action.actions.callback) {
        action.actions.callback(mainResponse);
      }
      yield call(handleSuccess, mainResponse.data.message);
    }
  } catch (error) {
    yield call(handleError, error);

  }
}

export function* getReasonMasterListSaga(action) {
  try {
      const token = yield select(store => store.userData.token);
      const mainResponse = yield call(getReasonMasterListApi, token, action.actions.data);
      if (mainResponse && mainResponse.status && mainResponse.status === 200) {
          // yield put({ type: 'GET_DISBURSEMENT_DOCUMENT_SUCCESS' });
          if (action.actions && action.actions.callback) {
              action.actions.callback(mainResponse.data || {});
          }
          yield call(handleSuccess, mainResponse.data.message);
      }
  } catch (error) {
      // yield put({ type: 'GET_DISBURSEMENT_DOCUMENT_FAILURE' });
      yield call(handleError, error);
  }
}