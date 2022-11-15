import { connect } from 'react-redux';
import { compose } from 'recompose';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import { newLeadDataSelector } from '../AddLead/selector';
import { userDataSelector } from '../App/selector';
import { getDDECommonAPI } from '../ITRVerification/actions';
import * as actions from './actions';
import withSpinner from "../../HOC/withSpinner";
import * as loanSummaryActions from "../LoanSummary/actions";
import * as additionalDetailsActions from "../AdditionalDetails/actions";

export const mapStateToProps = createStructuredSelector({
  userDataSelector: userDataSelector(),
  newLeadDataSelector: newLeadDataSelector(),
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getDDECommonAPI: getDDECommonAPI,
      saveSalarySLIP: actions.saveSalarySLIP,
      deleteSalarySLIP: actions.deleteSalarySLIP,
      getDDEDETAILS: actions.getDDEDETAILS,
      fetchBankSTATEMENT: actions.fetchBankSTATEMENT,
      getLoanSummary: loanSummaryActions.getLoanSummary,
      getFinbitUrl: actions.getFinbitUrl,
      uploadDoc: additionalDetailsActions.uploadDoc

    },
    dispatch,
  );
}

const container = compose(connect(mapStateToProps, mapDispatchToProps),
  withSpinner());

export default container;
