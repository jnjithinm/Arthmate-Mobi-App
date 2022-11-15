import { connect } from 'react-redux';
import { compose } from 'recompose';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';

import * as actions from './actions';
import withSpinner from "../../HOC/withSpinner";
import { userQDEDataSelector } from "../../container/LoanSummary/selector";
import { userDataSelector } from '../App/selector';

export const mapStateToProps = createStructuredSelector({
    userQDEDataSelector: userQDEDataSelector(),
    userDataSelector: userDataSelector(),
});

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            getAndroidVersion: actions.getAndroidVersion,
            getResidenceType: actions.saveOrUpdateAndroidVersion,
        },
        dispatch,
    );
}

const container = compose(
    connect(
        mapStateToProps,
        mapDispatchToProps,
    ),
    withSpinner(),
);

export default container;