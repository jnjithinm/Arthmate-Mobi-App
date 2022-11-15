import { call, put, select } from 'redux-saga/effects';
import { searchLead } from "../../api/Lead";
import { handleError, handleSuccess } from "../../../utils";

export function* searchLeadSaga(action) {
    try {
        const token = yield select(store => store.userData.token,);
        const mainResponse = yield call(searchLead, token, action.actions.data);
        if (mainResponse && mainResponse.status && mainResponse.status === 200) {
            yield put({ type: 'SEARCH_LEAD_SUCCESS' });
            if (action.actions && action.actions.callback) {
                action.actions.callback(mainResponse.data || {});
            }
        }
    } catch (error) {
        yield put({ type: 'SEARCH_LEAD_FAILURE' });
        yield call(handleError, error);
    }
}
