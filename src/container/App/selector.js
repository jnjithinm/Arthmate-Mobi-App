import { createSelector } from 'reselect';
import { SAVE_USER_DATA } from './const';

export const userDataReducer = (state) => state[SAVE_USER_DATA];

export const userDataSelector = () =>
    createSelector(userDataReducer, (myUserReducer) => {
        return (myUserReducer && myUserReducer) || {};
    });
