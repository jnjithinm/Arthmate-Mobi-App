import { connect } from 'react-redux';
import { compose } from 'recompose';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import withSpinner from "../../HOC/withSpinner";
import * as actions from './actions';
import { userDataSelector } from '../App/selector';
import { userQDEDataSelector } from "../LoanSummary/selector";

export const mapStateToProps = createStructuredSelector({
    userQDEDataSelector: userQDEDataSelector(),
    userDataSelector: userDataSelector(),
});

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            getLoanSummary: actions.getLoanSummary,
            getCoAppGuarantor: actions.getCoAppGuarantor,
            getQDEData: actions.getQDEData,
            qdePrefillData: actions.qdePrefillData,
            saveCoAppGuarantor: actions.saveCoAppGuarantor,
            savecoAppGuarantorData: actions.savecoAppGuarantorData,
            createConsentCoAppGuarantor: actions.createConsentCoAppGuarantor,
            deleteCoAppGuarantor: actions.deleteCoAppGuarantor,
            verifyConentCoAppGuarantor: actions.verifyConentCoAppGuarantor,
            getEmpList: actions.getEmpList,
            submitdeviation: actions.submitdeviation
        },
        dispatch,
    );
}

const container = compose(connect(mapStateToProps, mapDispatchToProps), withSpinner());

export default container;