import { createSelector } from 'reselect';
import { NEW_LEAD } from './const';

export const newLeadData = (state) => state[NEW_LEAD];

export const newLeadDataSelector = () =>
    createSelector(newLeadData, (myLeadReducer) => {
        return (myLeadReducer && myLeadReducer) || {};
    });