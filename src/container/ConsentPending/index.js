import { connect } from 'react-redux';
import { compose } from 'recompose';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import withSpinner from "../../HOC/withSpinner";
import * as actions from './actions';
import * as loanSummaryActions from "../LoanSummary/actions";
import { userDataSelector } from '../App/selector';
import { newLeadDataSelector } from "../AddLead/selector";

export const mapStateToProps = createStructuredSelector({
    userDataSelector: userDataSelector(),
    newLeadDataSelector: newLeadDataSelector(),
});

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            deleteLeadAPI: actions.deleteLeadAPI,
            getLeadDetailsAPI: actions.getLeadDetailsAPI,
            aggregatorUrlCall: actions.aggregatorUrlCall,
            accAggregatorAPI: actions.accAggregatorAPI,
            getCoAppGuarantor: loanSummaryActions.getCoAppGuarantor,
            consentPendingAPI: actions.consentPendingAPI,
            getConsentStatus: actions.getConsentStatus,
            createConsentCoAppGuarantor: loanSummaryActions.createConsentCoAppGuarantor,
            deleteCoAppGuarantor: loanSummaryActions.deleteCoAppGuarantor,
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
