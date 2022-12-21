import { connect } from 'react-redux';
import { compose } from 'recompose';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import withSpinner from "../../HOC/withSpinner";
import * as actions from './actions';
import * as authActions from "../App/actions";
import { userDataSelector } from "../App/selector";
import * as loanSummaryActions from "../LoanSummary/actions";

export const mapStateToProps = createStructuredSelector({
    userDataSelector: userDataSelector(),
});

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            getEserviceCommonData: actions.getEserviceCommonData,
            requestStampPaper: actions.requestStampPaper,
            uploadLoanAgreement: actions.uploadLoanAgreement,
            getSactionLetter: actions.getSactionLetter,
            deleteLoanAgreement: actions.deleteLoanAgreement,
            downloadLoanAgreement: actions.downloadLoanAgreement,
            saveSignInFlag: actions.saveSignIn,
            clearUserData: authActions.clearUserData,
            getLoanSummary: loanSummaryActions.getLoanSummary,

        },
        dispatch,
    );
}

const container = compose(connect(mapStateToProps, mapDispatchToProps),
    withSpinner());

export default container;