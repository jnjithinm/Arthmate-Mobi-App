import { connect } from 'react-redux';
import { compose } from 'recompose';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import withSpinner from "../../HOC/withSpinner";
import * as actions from './actions';
import * as authActions from "../App/actions";
import { userDataSelector } from "../App/selector";
import { userQDEDataSelector } from "../LoanSummary/selector"
import { newLeadDataSelector } from "../../container/AddLead/selector";
import * as loanSummaryActions from "../LoanSummary/actions";

export const mapStateToProps = createStructuredSelector({
    userDataSelector: userDataSelector(),
    newLeadDataSelector: newLeadDataSelector(),
    userQDEDataSelector: userQDEDataSelector(),
});

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            loanVehicleDETAILS: actions.loanVehicleDETAILS,
            loanVehicleBRAND: actions.loanVehicleBRAND,
            loanVehicleMODEL: actions.loanVehicleMODEL,
            loanVehicleSubMODEL: actions.loanVehicleSubMODEL,
            loanDEALER: actions.loanDEALER,
            loanSubDEALER: actions.loanSubDEALER,
            saveUpdateLoanINFO: actions.saveUpdateLoanINFO,
            loanMaximumAmount: actions.loanMaximumAmount,
            clearUserData: authActions.clearUserData,
            getLoanSummary: loanSummaryActions.getLoanSummary,
            getQDEData: loanSummaryActions.getQDEData,
            getSchemeCode: actions.getSchemeCode,
            getSchemeDetails: actions.getSchemeDetails,
            getApprovedLoanAmount: actions.getApprovedLoanAmount

        },
        dispatch,
    );
}

const container = compose(
    connect
        (
            mapStateToProps,
            mapDispatchToProps
        ), withSpinner()
);

export default container;