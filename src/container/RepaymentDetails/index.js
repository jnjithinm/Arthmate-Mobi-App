import { connect } from 'react-redux';
import { compose } from 'recompose';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import withSpinner from "../../HOC/withSpinner";
import * as actions from './actions';
import * as authActions from "../App/actions";
import { userDataSelector } from "../App/selector";
import { userQDEDataSelector } from "../LoanSummary/selector";
import * as loanSummaryActions from "../LoanSummary/actions";

export const mapStateToProps = createStructuredSelector({
    userDataSelector: userDataSelector(),
    userQDEDataSelector: userQDEDataSelector(),

});

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            saveRepaymentDETAILS: actions.saveRepaymentDETAILS,
            submitEnach: actions.submitEnach,
            getEnachData: actions.getEnachData,
            validateVpa: actions.validateVpa,
            getRepaymentDETAILS: actions.getRepaymentDETAILS,
            saveDisbursementRepaymentDETAILS: actions.saveDisbursementRepaymentDETAILS,
            getDisbursementRepaymentDETAILS: actions.getDisbursementRepaymentDETAILS,
            generateEnachToken: actions.generateEnachToken,
            getLoanSummary: loanSummaryActions.getLoanSummary
        },
        dispatch,
    );
}

const container = compose(connect(mapStateToProps, mapDispatchToProps),
    withSpinner()
);

export default container;