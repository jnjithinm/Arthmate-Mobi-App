import { connect } from 'react-redux';
import { compose } from 'recompose';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';

import * as actions from './actions';
import withSpinner from "../../HOC/withSpinner";
import * as schemeActions from "../Schemes/actions";
import { userQDEDataSelector } from "../../container/LoanSummary/selector";
import { userDataSelector } from '../App/selector';
import * as loanSummaryActions from "../LoanSummary/actions";
import * as panGSTActions from "../PANAndGSTVerification/actions";

export const mapStateToProps = createStructuredSelector({
    userQDEDataSelector: userQDEDataSelector(),
    userDataSelector: userDataSelector(),
});

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            getQDEData: loanSummaryActions.getQDEData,
            uploadDocAdditionalDetails: actions.uploadDocAdditionalDetails,
            getCityState: actions.getCityState,
           
            getResidenceType: actions.getResidenceType,
            saveEmploymentDetails: actions.saveEmploymentDetails,
            saveAdditionalContact: actions.saveAdditionalContact,
            saveOfficeAddress: actions.saveOfficeAddress,
            getStateList:actions.getStateList,
            getCityList: actions.getCityList,
            saveKYCDetail: actions.saveKYCDetail,
            getKYCDoc: actions.getKYCDoc,
            getUtilityDoc: actions.getUtilityDoc,
            getServiceProvider: actions.getServiceProvider,
            saveUtilityDetails: actions.saveUtilityDetails,
            getDetailsElectricity: actions.getDetailsElectricity,
            getDetailsGas: actions.getDetailsGas,
            getDetailsLandline: actions.getDetailsLandline,
            uploadUtilityDoc: actions.uploadUtilityDoc,
            deleteUploadedUtilityDoc: actions.deleteUploadedUtilityDoc,
            verifyDrivingLicense: actions.verifyDrivingLicense,
            verifyVoterID: actions.verifyVoterID,
            getCompanyType: actions.getCompanyType,
            getIndustry: actions.getIndustry,
            getDesignation: actions.getDesignation,
            createUpdateCUSTOMER: schemeActions.createUpdateCUSTOMER,
            deleteDocuments: actions.deleteDocuments,
            deleteUtility: actions.deleteUtility,
            getLoanSummary: loanSummaryActions.getLoanSummary,
            gstADDRAPI: actions.gstADDRAPI,
            dedupeCheck: actions.dedupeCheck,
            getDedupeId: actions.getDedupeId,
            getDesignations: actions.getDesignations,
            getProfession: actions.getProfession,
            getSubCategoryList: actions.getSubCategoryList,
            getCompanyList: actions.getCompanyList,
            savePermanentDetails: actions.savePermanentDetails,
            uploadDoc: actions.uploadDoc,
            deletePerDocuments: actions.deletePerDocuments,
            uploadCurrentDoc: actions.uploadCurrentDoc,

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