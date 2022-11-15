import { connect } from 'react-redux';
import { compose } from 'recompose';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import * as uploadActions from "../UploadDocument/actions";
import * as actions from './actions';
import { userPANDataSelector } from "../../container/UploadDocument/selector";
import { newLeadDataSelector } from "../../container/AddLead/selector";
import { userQDEDataSelector } from "../../container/LoanSummary/selector";
import * as loanSummaryActions from "../LoanSummary/actions";
import withSpinner from "../../HOC/withSpinner";
import { userDataSelector } from '../App/selector';
import * as schemeActions from "../Schemes/actions";

export const mapStateToProps = createStructuredSelector({
    userPANDataSelector: userPANDataSelector(),
    newLeadDataSelector: newLeadDataSelector(),
    userQDEDataSelector: userQDEDataSelector(),
    userDataSelector: userDataSelector(),
});

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            getEntityList: actions.getEntityAPI,
            uploadPANWrapperAPI: uploadActions.uploadPANWrapperAPI,
            verifyPANAPI: actions.verifyPANAPI,
            savePANAPI: actions.savePANAPI,
            deletePANAPI: actions.deletePANAPI,
            getQDEData: loanSummaryActions.getQDEData,
            getLoanSummary: loanSummaryActions.getLoanSummary,
            gstWrapperAPI: actions.gstWrapperAPI,
            createUpdateCUSTOMER: schemeActions.createUpdateCUSTOMER,

        },
        dispatch,
    );
}

const container = compose(connect(mapStateToProps, mapDispatchToProps), withSpinner());

export default container;
