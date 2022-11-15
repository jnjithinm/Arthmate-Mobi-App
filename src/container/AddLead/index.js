import { connect } from 'react-redux';
import { compose } from 'recompose';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import withSpinner from '../../HOC/withSpinner';
import * as authActions from '../App/actions';
import { userDataSelector } from '../App/selector';
import { getLeadDetailsEditPageAPI } from '../Edit/actions';
import * as loanSummaryActions from '../LoanSummary/actions';
import * as AdditionalDetails from '../AdditionalDetails/actions';

import * as actions from './actions';
import { newLeadDataSelector } from './selector';

export const mapStateToProps = createStructuredSelector({
  userDataSelector: userDataSelector(),
  newLeadDataSelector: newLeadDataSelector(),
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      dsaAPI: actions.dsaAPI,
      dealerAPI: actions.dealerAPI,
      addLeadAPI: actions.addLeadAPI,
      clearUserData: authActions.clearUserData,
      saveCoAppGuarantor: loanSummaryActions.saveCoAppGuarantor,
      getLeadDetailsEditPageAPI,
      branchNAME: actions.branchNAME,
      getCityState: AdditionalDetails.getCityState
    },
    dispatch,
  );
}

const container = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withSpinner(),
);

export default container;
