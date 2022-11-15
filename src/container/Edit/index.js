import { connect } from 'react-redux';
import { compose } from 'recompose';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import withSpinner from "../../HOC/withSpinner";
import * as actions from './actions';
import * as addActions from '../AddLead/actions';
import { userDataSelector } from '../App/selector';
import { newLeadDataSelector } from "../AddLead/selector";
import * as loanSummaryActions from "../LoanSummary/actions";
import * as AdditionalDetails from '../AdditionalDetails/actions';

export const mapStateToProps = createStructuredSelector({
    userDataSelector: userDataSelector(),
    newLeadDataSelector: newLeadDataSelector(),
});

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            branchNAME: addActions.branchNAME,
            dsaAPI: addActions.dsaAPI,
            dealerAPI: addActions.dealerAPI,
            editLeadDetailsAPI: actions.editLeadDetailsAPI,
            getLeadDetailsEditPageAPI: actions.getLeadDetailsEditPageAPI,
            getCoAppGuarantor: loanSummaryActions.getCoAppGuarantor,
            saveCoAppGuarantor: loanSummaryActions.saveCoAppGuarantor,
            clearUserData: actions.clearUserData,
            getCityState: AdditionalDetails.getCityState,
            getLoanSummary: loanSummaryActions.getLoanSummary
        },
        dispatch,
    );
}

const container = compose(connect(mapStateToProps, mapDispatchToProps),
    withSpinner());

export default container;
