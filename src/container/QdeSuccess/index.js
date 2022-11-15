import { connect } from 'react-redux';
import { compose } from 'recompose';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import * as loanSummaryActions from "../LoanSummary/actions";
import * as actions from './actions';
import * as authActions from "../App/actions";
import { userDataSelector } from "../App/selector";
import * as schemeActions from "../Schemes/actions";

import withSpinner from "../../HOC/withSpinner";

export const mapStateToProps = createStructuredSelector({
  userDataSelector: userDataSelector(),
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      qdeSuccessAPI: actions.qdeSuccessAPI,
      submitToCredit: actions.submitToCredit,
      getReasonMasterList: actions.getReasonMasterList,
      clearUserData: authActions.clearUserData,
      createUpdateCUSTOMER: schemeActions.createUpdateCUSTOMER,
      getLoanSummary: loanSummaryActions.getLoanSummary
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
