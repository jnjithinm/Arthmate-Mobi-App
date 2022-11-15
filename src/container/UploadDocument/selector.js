import { createSelector } from 'reselect';
import { SAVE_PAN_DATA } from './const';

export const userPANReducer = (state) => state[SAVE_PAN_DATA];

export const userPANDataSelector = () =>
    createSelector(userPANReducer, (panReducer) => {
        return (panReducer && panReducer) || {};
    });
