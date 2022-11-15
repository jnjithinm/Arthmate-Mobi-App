import { call, put, select } from 'redux-saga/effects';
import { handleError, handleSuccess } from '../../../utils';
import { editLeadDetailApi } from '../../api/Edit';
import { getLeadDetailsApi } from '../../api/GetLeadDetails';

export function* editLeadDetailsSaga(action) {
  try {
    const token = yield select((store) => store.userData.token);
    const mainResponse = yield call(
      editLeadDetailApi,
      token,
      action.actions.data.id,
      action.actions.data.pan,
      action.actions.data.productId,
      action.actions.data.selectedSourceType,
      action.actions.data.selectedItem,
      action.actions.data.customerName,
      action.actions.data.firstName,
      action.actions.data.middleName,
      action.actions.data.lastName,
      action.actions.data.emailAddress,
      action.actions.data.pincode,
      action.actions.data.mobileNumber,
      action.actions.data.applicantUniqueId,
      action.actions.data.branchName,
      action.actions.data.employeeId,
      action.actions.data.city,
      action.actions.data.state,
    );

    if (mainResponse && mainResponse.status && mainResponse.status === 200) {
      yield put({ type: 'EDIT_LEAD_DETAILS_API_SUCCESS' });

      if (action.actions && action.actions.callback) {
        action.actions.callback(mainResponse.data || {});
      }

      yield call(handleSuccess, mainResponse.data.message);
    }
  } catch (error) {
    yield put({ type: 'EDIT_LEAD_DETAILS_API_FAILURE' });
    yield call(handleError, error);
  }
}

export function* getLeadDetailsEditPageSaga(action) {
  try {
    const token = yield select((store) => store.userData.token);
    const mainResponse = yield call(
      getLeadDetailsApi,
      token,
      action.actions.data.id,
    );
    if (mainResponse && mainResponse.status && mainResponse.status === 200) {
      yield put({ type: 'GET_LEAD_DETAILS_EDIT_PAGE_API_SUCCESS' });
      if (action.actions && action.actions.callback) {
        action.actions.callback(mainResponse.data || {});
      }
      yield call(handleSuccess, mainResponse.data.message);
    }
  } catch (error) {
    yield put({ type: 'GET_LEAD_DETAILS_EDIT_PAGE_API_FAILURE' });
    yield call(handleError, error);
  }
}
