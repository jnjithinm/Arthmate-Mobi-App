import { call, put, takeEvery, select } from 'redux-saga/effects';
import { getEserviceCommonData, requestStampPaper, getSactionLetterApi, saveSignIn, uploadLoanAgreement, deleteLoanAgreement, downloadLoanAgreement } from "../../api/LoanAgreement";
import { handleError, handleSuccess } from "../../../utils";
import { userDataSelector } from "../App/selector";


export function* getEserviceCommonDataSaga(action) {
    try {
        const token = yield select(store => store.userData.token);
        const mainResponse = yield call(getEserviceCommonData, token, action.actions.data);

        if (mainResponse && !mainResponse.error) {
            yield put({ type: 'GET_ESERVICE_COMMON_DATA_SUCCESS' });
            if (action.actions && action.actions.callback) {
                action.actions.callback(mainResponse);
            }
        }
    } catch (error) {
        console.log("eeeeeee",error);
        yield put({ type: 'GET_ESERVICE_COMMON_DATA_FAILURE' });
        // yield call(handleError, error);
    }
}

export function* requestStampPaperSaga(action) {
    try {
        const token = yield select(store => store.userData.token);
        const mainResponse = yield call(requestStampPaper, token, action.actions.data);
        if (mainResponse && mainResponse.status && mainResponse.status === 200) {
            yield put({ type: 'STAMP_PAPER_API_SUCCESS' });
            yield call(handleSuccess, mainResponse.data.message);
            if (action.actions && action.actions.callback) {
                action.actions.callback(mainResponse.data || {});

            }
        }
    } catch (error) {
        yield put({ type: 'STAMP_PAPER_API_FAILURE' });
        yield call(handleError, error);
    }
}

export function* uploadLoanAgreementSaga(action) {
    try {
        const token = yield select(store => store.userData.token);
        const mainResponse = yield call(uploadLoanAgreement, token, action.actions.data);
        if (mainResponse && mainResponse.statusCode && mainResponse.statusCode == 200) {
            yield put({ type: 'LOAN_AGREEMENT_UPLOAD_API_SUCCESS' });
            if (action.actions && action.actions.callback) {
                action.actions.callback(mainResponse.data || {});
            }
            yield call(handleSuccess, mainResponse.message);
        }
    } catch (error) {
        yield put({ type: 'LOAN_AGREEMENT_UPLOAD_API_FAILURE' });
        yield call(handleError, error);
    }
}

export function* deleteLoanAgreementSaga(action) {
    try {
        const token = yield select(store => store.userData.token);
        const mainResponse = yield call(deleteLoanAgreement, token, action.actions.data);
        if (mainResponse && mainResponse.status && mainResponse.status === 200) {
            yield put({ type: 'LOAN_AGREEMENT_DELETE_API_SUCCESS' });
            if (action.actions && action.actions.callback) {
                action.actions.callback(mainResponse.data || {});
            }
            yield call(handleSuccess, mainResponse.data.message);
        }
    } catch (error) {
        yield put({ type: 'LOAN_AGREEMENT_DELETE_API_FAILURE' });
        yield call(handleError, error);
    }
}

export function* downloadLoanAgreementSaga(action) {
    try {
        const token = yield select(store => store.userData.token);
        const mainResponse = yield call(downloadLoanAgreement, token, action.actions.data);
        if (mainResponse && !mainResponse.error) {
            yield put({ type: 'LOAN_AGREEMENT_DOWNLOAD_API_SUCCESS' });
            if (action.actions && action.actions.callback) {
                action.actions.callback(mainResponse.data || {});
            }
            yield call(handleSuccess, mainResponse.message);
        }
    } catch (error) {
        yield put({ type: 'LOAN_AGREEMENT_DOWNLOAD_API_FAILURE' });
        yield call(handleError, error);
    }
}

export function* saveSignInFlag(action) {
    try {
        const token = yield select(store => store.userData.token);
        const mainResponse = yield call(saveSignIn, token, action.actions.data);
        if (mainResponse && mainResponse.statusCode && mainResponse.statusCode == 200) {
            yield put({ type: 'SAVE_SIGN_IN_SUCCESS' });
            yield call(handleSuccess, mainResponse['message']);
            if (action.actions && action.actions.callback) {
                action.actions.callback(mainResponse || {});
            }
        }
    } catch (error) {
        yield put({ type: 'SAVE_SIGN_IN_FAILURE' });
        yield call(handleError, error);
    }
}

export function* getSactionLetterFlag(action) {
    try {
        const token = yield select(store => store.userData.token);
        const mainResponse = yield call(getSactionLetterApi, token, action.actions.data);
        if (mainResponse && mainResponse.statusCode && mainResponse.statusCode == 200) {
            yield put({ type: 'GET_SACTION_LETTER_SUCCESS' });
            yield call(handleSuccess, mainResponse['message']);
            if (action.actions && action.actions.callback) {
                action.actions.callback(mainResponse || {});
            }
        }
    } catch (error) {
        yield put({ type: 'GET_SACTION_LETTER_FAILURE' });
        yield call(handleError, error);
    }
}