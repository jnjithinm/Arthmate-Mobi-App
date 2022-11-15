import { call, put, takeEvery, select } from 'redux-saga/effects';
import { loanVehicleDetails, loanVehicleBrand,  loanVehicleModel, getSchemeCode, getSchemeDetails, loanVehicleSubModel, loanDealer, loanSubDealer, saveUpdateLoanInfo, loanMaximumAmount, getApprovedLoanAmountApi } from "../../api/LoanDetails";
import { handleError, handleSuccess } from "../../../utils";

export function* loanVehicleDetailsSaga(action) {
    try {
        const token = yield select(store => store.userData.token);
        const mainResponse = yield call(loanVehicleDetails, token, action.actions.data.leadCode);
        if (mainResponse && mainResponse.status && mainResponse.status === 200) {
            yield put({ type: 'LOAN_VEHICLE_DETAILS_SUCCESS' });
            //yield call(handleSuccess, mainResponse.data.message);
            if (action.actions && action.actions.callback) {
                action.actions.callback(mainResponse.data || {});
            }
        }
    } catch (error) {
        yield put({ type: 'LOAN_VEHICLE_DETAILS_FAILURE' });
        yield call(handleError, error);
    }
}

export function* getApprovedLoanAmountSaga(action) {
    try {
        const token = yield select(store => store.userData.token);
        const mainResponse = yield call(getApprovedLoanAmountApi, token, action.actions.data);
        if (mainResponse && mainResponse.status && mainResponse.status === 200) {
            yield put({ type: 'GET_APPROVE_LOAN_AMOUNT_SUCCESS' });
            //yield call(handleSuccess, mainResponse.data.message);
            if (action.actions && action.actions.callback) {
                action.actions.callback(mainResponse.data || {});
            }
        }
    } catch (error) {
        yield put({ type: 'GET_APPROVE_LOAN_AMOUNT_FAILURE' });
        yield call(handleError, error);
    }
}

export function* getSchemeCodeSaga(action) {
    try {
        const token = yield select(store => store.userData.token);
        const mainResponse = yield call(getSchemeCode, token, action.actions.data);
        if (mainResponse && mainResponse.status && mainResponse.status === 200) {
            yield put({ type: 'GET_SCHEME_CODE_SUCCESS' });
            //yield call(handleSuccess, mainResponse.data.message);
            if (action.actions && action.actions.callback) {
                action.actions.callback(mainResponse.data || {});
            }
        }
    } catch (error) {
        yield put({ type: 'GET_SCHEME_CODE_FAILURE' });
        yield call(handleError, error);
    }
}

export function* getSchemeDetailsSaga(action) {
    try {
        const token = yield select(store => store.userData.token);
        const mainResponse = yield call(getSchemeDetails, token, action.actions.data);
        if (mainResponse && mainResponse.status && mainResponse.status === 200) {
            yield put({ type: 'GET_SCHEME_Details_SUCCESS' });
            //yield call(handleSuccess, mainResponse.data.message);
            if (action.actions && action.actions.callback) {
                action.actions.callback(mainResponse.data || {});
            }
        }
    } catch (error) {
        yield put({ type: 'GET_SCHEME_Details_FAILURE' });
        yield call(handleError, error);
    }
}

export function* loanVehicleBrandSaga(action) {
    try {
        const token = yield select(store => store.userData.token);
        const mainResponse = yield call(loanVehicleBrand, token, action.actions.data.leadCode, action.actions.data.vehicleType);
        if (mainResponse && mainResponse.status && mainResponse.status === 200) {
            if (action.actions && action.actions.callback) {
                action.actions.callback(mainResponse.data || {});
            }
        }
    } catch (error) {
        yield call(handleError, error);
    }
}

export function* loanVehicleModelSaga(action) {
    try {
        const token = yield select(store => store.userData.token);
        const mainResponse = yield call(loanVehicleModel, token, action.actions.data.leadCode, action.actions.data.vehicleBrand, action.actions.data.vehicleType);
        if (mainResponse && mainResponse.status && mainResponse.status === 200) {
            if (action.actions && action.actions.callback) {
                action.actions.callback(mainResponse.data || {});
            }
        }
    } catch (error) {
        yield call(handleError, error);
    }
}

export function* loanVehicleSubModelSaga(action) {
    try {
        const token = yield select(store => store.userData.token);
        const mainResponse = yield call(loanVehicleSubModel, token, action.actions.data.leadCode, action.actions.data.model, action.actions.data.vehicleBrand, action.actions.data.vehicleType);
        if (mainResponse && mainResponse.status && mainResponse.status === 200) {
            if (action.actions && action.actions.callback) {
                action.actions.callback(mainResponse.data || {});
            }
        }
    } catch (error) {
        yield call(handleError, error);
    }
}

export function* loanmaximumamountSaga(action) {
    try {
        const token = yield select(store => store.userData.token);
        const mainResponse = yield call(loanMaximumAmount, token, action.actions.data.leadCode, action.actions.data.submodel,action.actions.data.vehicletype,action.actions.data.vehiclebrand,action.actions.data.model,action.actions.data.location, action.actions.data.exShowroom, action.actions.data.insurance);
        if (mainResponse && mainResponse.status && mainResponse.status === 200) {
            if (action.actions && action.actions.callback) {
                action.actions.callback(mainResponse.data || {});
            }
        }
    } catch (error) {
        yield call(handleError, error);
    }
}

export function* loanDealerSaga(action) {
    try {
        const token = yield select(store => store.userData.token);
        const mainResponse = yield call(loanDealer, token, action.actions.data);
        console.log("mainResponse",mainResponse.data);
        if (mainResponse && mainResponse.status && mainResponse.status === 200) {
            if (action.actions && action.actions.callback) {
                action.actions.callback(mainResponse.data || {});
            }
        }
    } catch (error) {
        yield call(handleError, error);
    }
}
export function* loanSubDealerSaga(action) {
    try {
        const token = yield select(store => store.userData.token);
        const mainResponse = yield call(loanSubDealer, token, action.actions.data);
        if (mainResponse && mainResponse.status && mainResponse.status === 200) {

            if (action.actions && action.actions.callback) {
                action.actions.callback(mainResponse.data || {});
            }
        }
    } catch (error) {
        yield call(handleError, error);
    }
}
export function* saveUpdateLoanInfoSaga(action) {
    try {
        const token = yield select(store => store.userData.token);
        const mainResponse = yield call(saveUpdateLoanInfo, token, action.actions.data);
        if (mainResponse && mainResponse.status && mainResponse.status === 200) {
            yield put({ type: 'SAVE_UPDATE_LOAN_INFO_SUCCESS' });
            yield call(handleSuccess, mainResponse.data['message']);
            if (action.actions && action.actions.callback) {
                action.actions.callback(mainResponse.data || {});
            }
        }
    } catch (error) {
        yield put({ type: 'SAVE_UPDATE_LOAN_INFO_FAILURE' });
        yield call(handleError, error);
    }
}

