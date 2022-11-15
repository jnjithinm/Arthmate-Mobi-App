import { call, select, put } from 'redux-saga/effects';

import { uploadPANApi } from "../../api/UploadDocumentPAN";
import { handleError, handleSuccess } from "../../../utils";
import { userDataSelector } from "../App/selector";
import { savePANData } from "./actions";

export function* uploadPANSaga(action) {
    try {
        const userData = yield select(userDataSelector());
        const mainResponse = yield call(uploadPANApi, userData.token || "", action.actions.imageData);

        if (mainResponse && mainResponse.error) {
            throw mainResponse.message;
        }
        yield put({ type: 'UPLOAD_PAN_API_SUCCESS' });
        if (action.actions.callback && mainResponse && !mainResponse.error) {
            handleSuccess(mainResponse.message);
            const panInfoData = {
                ...action.actions.imageData.res,
                ...action.actions.imageData.dataToAPI,
                ...mainResponse.data || {},
            } || {};
            yield put(savePANData(panInfoData));
            action.actions.callback(panInfoData);
        }
    } catch (error) {
        yield put({ type: 'UPLOAD_PAN_API_FAILURE' });
        yield call(handleError, error);
    }
}
