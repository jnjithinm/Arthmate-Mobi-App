import { call, put, takeEvery, select } from 'redux-saga/effects';
import { saveSalarySlip, deleteSalarySlip, getFinbiturl, fetchBankStatement } from "../../api/BankDetails";
import { handleError, handleSuccess } from "../../../utils";

export function* saveSalarySlipSaga(action) {
    try {
        const token = yield select(store => store.userData.token);
        const mainResponse = yield call(saveSalarySlip, token, action.actions.data);
        if (mainResponse && mainResponse.statusCode && mainResponse.statusCode == 200) {
            yield put({ type: 'SAVE_SALARY_SLIP_SUCCESS' });
            yield call(handleSuccess, mainResponse.message);
            if (action.actions && action.actions.callback) {
                action.actions.callback(mainResponse.data || {});
            }
        }
        else {
            yield put({ type: 'SAVE_SALARY_SLIP_FAILURE' });
            yield call(handleError, mainResponse.message);
        }
    } catch (error) {
        yield put({ type: 'SAVE_SALARY_SLIP_FAILURE' });
        yield call(handleError, error);
    }
}

export function* deleteSalarySlipSaga(action) {
    try {
        const token = yield select(store => store.userData.token);
        // const leadCode = yield select(store => store.newLeadData.newLead.leadCode);

        const mainResponse = yield call(deleteSalarySlip, token, action.actions.data);
        if (mainResponse && mainResponse.status && mainResponse.status === 200) {
            yield put({ type: 'DELETE_SALARY_SLIP_SUCCESS' });
            if (action.actions && action.actions.callback) {
                action.actions.callback(mainResponse.data || {});
            }
            yield call(handleSuccess, mainResponse.data.message);
        }
    } catch (error) {
        yield put({ type: 'DELETE_SALARY_SLIP_FAILURE' });
        yield call(handleError, error);
    }
}

export function* fetchBankStatementSaga(action) {
    try {
        const token = yield select(store => store.userData.token);
        const mainResponse = yield call(fetchBankStatement, token, action.actions.data);
        if (mainResponse && mainResponse.status && mainResponse.status === 200) {
            yield put({ type: 'FETCH_BANK_STATEMENT_SUCCESS' });
            if (action.actions && action.actions.callback) {
                action.actions.callback(mainResponse.data || {});
            }
            yield call(handleSuccess, mainResponse.data.message);
        }
    } catch (error) {
        yield put({ type: 'FETCH_BANK_STATEMENT_FAILURE' });
        yield call(handleError, error);
    }
}

export function* getFinbitData(action) {
    try {
        const token = yield select(store => store.userData.token);
        const mainResponse = yield call(getFinbiturl, token, action.actions.dataToAPI);
        if (mainResponse && mainResponse.status && mainResponse.status === 200) {
            yield put({ type: 'GET_FINBIT_URL_SUCCESS' });
            if (action.actions && action.actions.callback) {
                action.actions.callback(mainResponse.data || {});
            }
            yield call(handleSuccess, mainResponse.data.message);
        }
    } catch (error) {
        yield put({ type: 'GET_FINBIT_URL_FAILURE' });
        yield call(handleError, error);
    }
}
