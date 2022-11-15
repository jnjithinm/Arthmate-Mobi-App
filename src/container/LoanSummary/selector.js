import { createSelector } from 'reselect';
import { GET_QDE_DATA, SAVE_CO_APP_GUARANTOR } from './const';

export const userQDEReducer = (state) => state[GET_QDE_DATA];
// export const saveCoAppGuarantorReducer = (state) => state[SAVE_CO_APP_GUARANTOR];

export const userQDEDataSelector = () =>
    createSelector(userQDEReducer, (qdeReducer) => {
        return (qdeReducer && qdeReducer.QDEData && qdeReducer.QDEData.data) || {};
    });

// export const saveCoAppGuarantorDataSelector = () =>
//     createSelector(userQDEReducer, (saveCoAppGuarantor) => {
//         return (saveCoAppGuarantor && saveCoAppGuarantor.saveCoAppGuarantorData && saveCoAppGuarantor.saveCoAppGuarantorData.data) || {};
//     });