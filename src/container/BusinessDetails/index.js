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
            businessSECTOR: actions.businessSECTOR,
            businessINDUSTRY: actions.businessINDUSTRY,
            businessSUBINDUSTRY: actions.businessSUBINDUSTRY,
            businessSEGMENT: actions.businessSEGMENT,
            saveUpdateBusinessINFO: actions.saveUpdateBusinessINFO,
            clearUserData: authActions.clearUserData,
            getQDEData: loanSummaryActions.getQDEData,
            getLoanSummary: loanSummaryActions.getLoanSummary,
            ifscCODE: actions.ifscCODE,
            createCustomer: actions.createCustomer,
            verifyBankAccoutNumber: actions.verifyBankAccoutNumber,
            uploadSelfie: actions.uploadSelfie,
            deleteSelfie: actions.deleteSelfie
        },
        dispatch,
    );
}

const container = compose(connect(mapStateToProps, mapDispatchToProps), withSpinner());

export default container;