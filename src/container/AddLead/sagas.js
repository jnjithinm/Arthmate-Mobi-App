import { call, put, takeEvery, select } from 'redux-saga/effects';
import { dealerApi, dsaApi, addLead, branchName } from "../../api/AddLead";
import { handleError, handleSuccess } from "../../../utils";
import { saveNewLead } from "./actions";

export function* dealerSaga(action) {
    try {
        const token = yield select(store => store.userData.token);
        const mainResponse = yield call(dealerApi, token, action.actions.data);
        if (mainResponse && mainResponse.status && mainResponse.status === 200) {
            yield put({ type: 'DEALER_API_SUCCESS' });
            if (action.actions && action.actions.callback) {
                action.actions.callback(mainResponse.data || {});
            }
        }
    } catch (error) {
        yield put({ type: 'DEALER_API_FAILURE' });
        yield call(handleError, error);
    }
}

export function* dsaSaga(action) {
    try {
        const token = yield select(store => store.userData.token);
        const mainResponse = yield call(dsaApi, token);
        if (mainResponse && mainResponse.status && mainResponse.status === 200) {
            if (action.actions && action.actions.callback) {
                action.actions.callback(mainResponse.data || {});
            }
        }
    } catch (error) {
        yield call(handleError, error);
    }
}
export function* branchSaga(action) {
    try {
        const token = yield select(store => store.userData.token);
        const mainResponse = yield call(branchName, token, action.actions.data);
        if (mainResponse && mainResponse.status && mainResponse.status === 200) {
            if (action.actions && action.actions.callback) {
                action.actions.callback(mainResponse.data || {});
            }
        }
    } catch (error) {
        yield call(handleError, error);
    }
}

/* export function* addLeadSaga(action) {
    try {
        const token = yield select(store => store.userData.token);
        const mainResponse = yield call(
            addLead,
            token,
            action.actions.data.productId,
            action.actions.data.selectedSourceType,
            action.actions.data.selectedItem,
            action.actions.data.customerName,
            action.actions.data.emailAddress,
            action.actions.data.pincode,
            action.actions.data.mobileNumber,
        );
        if (mainResponse && mainResponse.status && mainResponse.status === 200) {

            const newLeadData = mainResponse.data.data;
            yield put(saveNewLead(newLeadData));
            yield call(handleSuccess, mainResponse.data.message);
            if (action.actions && action.actions.callback) {
                action.actions.callback(mainResponse.data || {});
            }

        }
    } catch (error) {
        yield call(handleError, error);
    }
} */
export function* addLeadSaga(action) {
    try {
        const token = yield select(store => store.userData.token);
        const mainResponse = yield call(
            addLead,
            token,
            action.actions.data
        );
        if (mainResponse && mainResponse.status && mainResponse.status === 200) {
            yield put({ type: 'ADD_LEAD_API_SUCCESS' });
            const newLeadData = mainResponse.data.data;
            yield put(saveNewLead(newLeadData));

            yield call(handleSuccess, mainResponse.data.message);
            if (action.actions && action.actions.callback) {
                action.actions.callback(mainResponse.data || {});
            }

        }
    } catch (error) {
        yield put({ type: 'ADD_LEAD_API_FAILURE' });
        yield call(handleError, error);
    }
}
