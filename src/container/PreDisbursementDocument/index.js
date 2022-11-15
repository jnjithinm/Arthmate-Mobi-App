import { connect } from 'react-redux';
import { compose } from 'recompose';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import { newLeadDataSelector } from '../AddLead/selector';
import { userDataSelector } from '../App/selector';
import * as actions from './actions';
import withSpinner from "../../HOC/withSpinner";
import * as loanSummaryActions from "../LoanSummary/actions";

export const mapStateToProps = createStructuredSelector({
    userDataSelector: userDataSelector(),
    newLeadDataSelector: newLeadDataSelector(),
});

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            uploadDisbusementDOCUMENT: actions.uploadDisbusementDOCUMENT,
            deleteDisbursementDOCUMENT: actions.deleteDisbursementDOCUMENT,
            getDisbursementDOCUMENT: actions.getDisbursementDOCUMENT,
            getLoanSummary: loanSummaryActions.getLoanSummary
        },
        dispatch,
    );
}

const container = compose(connect(mapStateToProps, mapDispatchToProps),
    withSpinner());

export default container;
