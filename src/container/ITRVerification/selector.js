import { createSelector } from 'reselect';
import { GET_DDE_DATA_SUCCESS } from './const';

export const userDDEReducer = (state) => state[GET_DDE_DATA_SUCCESS];

export const userDDEDataSelector = () =>
    createSelector(userDDEReducer, (ddeReducer) => {
        return (ddeReducer && ddeReducer.DDEData && ddeReducer.DDEData.data) || {};
    });
