import { connect } from 'react-redux';
import { compose } from 'recompose';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import withSpinner from "../../HOC/withSpinner";
import * as actions from './actions';
import { userDDEDataSelector } from "../../container/ITRVerification/selector";
import { userDataSelector } from '../App/selector';
import * as loanSummaryActions from "../LoanSummary/actions";

export const mapStateToProps = createStructuredSelector({
    userDDEDataSelector: userDDEDataSelector(),
    userDataSelector: userDataSelector(),
});

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            getDDECommonAPI: actions.getDDECommonAPI,
            uploadITRDocumentAPI: actions.uploadITRDocumentAPI,
            linkToCustomerAPI: actions.linkToCustomerAPI,
            deleteITRAPI: actions.deleteITRAPI,
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
