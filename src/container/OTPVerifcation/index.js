import { connect } from 'react-redux';
import { compose } from 'recompose';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import withSpinner from "../../HOC/withSpinner";
import * as actions from './actions';
import { userDataSelector } from '../App/selector';
import { newLeadDataSelector } from "../AddLead/selector";
import * as loanSummaryActions from "../LoanSummary/actions";
import * as ConsentPending from "../ConsentPending/actions";

export const mapStateToProps = createStructuredSelector({
    userDataSelector: userDataSelector(),
    newLeadDataSelector: newLeadDataSelector(),
});

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            consentPendingAPI: ConsentPending.consentPendingAPI,
            createConsentCoAppGuarantor: loanSummaryActions.createConsentCoAppGuarantor,
        
            otpVerificationAPI: actions.otpVerificationAPI,
            verifyConentCoAppGuarantor: loanSummaryActions.verifyConentCoAppGuarantor,
        },
        dispatch,
    );
}

const container = compose(connect(mapStateToProps, mapDispatchToProps),
    withSpinner());

export default container;
