import { call, put, takeEvery, select } from 'redux-saga/effects';

import { otpVerificationApi } from "../../api/OTPVerification";
import { handleError, handleSuccess } from "../../../utils";

export function* otpVerificationSaga(action) {
    try {
        const token = yield select(store => store.userData.token);
        // const leadCode = yield select(store => store.newLeadData.newLead.leadCode);

        const mainResponse = yield call(otpVerificationApi,
            token,
            action.actions.data.otp,
            action.actions.data.leadCode,
            action.actions.data.source,
            action.actions.data.request_id

        );
        if (mainResponse && mainResponse.status && mainResponse.status === 200) {
            yield put({ type: 'OTP_VERIFICATION_API_SUCCESS' });
            if (action.actions && action.actions.callback) {
                action.actions.callback(mainResponse.data || {});
            }
            yield call(handleSuccess, mainResponse.data.message);
        }
    } catch (error) {
        yield put({ type: 'OTP_VERIFICATION_API_FAILURE' });
        yield call(handleError, error);
    }
}
