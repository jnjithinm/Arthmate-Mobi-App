import { all, takeEvery, takeLatest } from 'redux-saga/effects';
import {
  uploadCurrentDocumentSaga,
  deleteDocumentSaga,
  deletePerDocumentSaga,
  deleteUtilityDocSaga,
  deleteUtilitySaga,
  getCityListSaga,
  getCityState,
  getDesignationSaga,
  getCompanyTypeSaga,
  getIndustrySaga,
  getDetailsElectricitySaga,
  getDetailsGasSaga,
  getDetailsLandlineSaga,
  getKYCDocSaga,
  getResidenceType,
  getServiceProviderSaga,
  getUtilityDocSaga,
  saveAdditionalContactSaga,
  saveEmploymentDetailsSaga,
  savePermanentAddressSaga,
  saveKYCDetailSaga,
  saveOfficeAddressSaga,
  saveUtilityDetailSaga,
  uploadDocAdditionalDetailsSaga,
  uploadUtilityDocSaga,
  uploadDocumentSaga,
  verifyDrivingLicenseSaga,
  verifyVoterIDSaga,
  gstADDRSAGA,
  dedupeCheckSaga,
  getDedupeIdSaga,
  getDesignationsSaga,
  getProfessionSaga,
  getSubCategoryListSaga,
  getCompanyListSaga,
  getStateListSaga
} from './src/container/AdditionalDetails/sagas';
import {
  addLeadSaga,
  branchSaga,
  dealerSaga,
  dsaSaga,
} from './src/container/AddLead/sagas';
import { logoutSaga } from './src/container/App/sagas';
import {
  deleteSalarySlipSaga,
  fetchBankStatementSaga,
  saveSalarySlipSaga,
  getFinbitData
} from './src/container/BankDetails/sagas';
import {
  businessIndustrySaga,
  businessSectorSaga,
  businessSegmentSaga,
  businessSubIndustrySaga,
  saveUpdateBusinessInfoSaga,
  ifscCODESaga,
   createCustomer,
   verifyAccNumber,
   uploadSelfieSaga,
   deleteBusinessSelfieSaga
} from './src/container/BusinessDetails/sagas';
import {
  consentPendingSaga,
  deleteLeadSaga,
  getLeadDetailsSaga,
  accAggrigatorSaga,
  accAggrigatorURLSaga,
  getConsentStatusSaga,

} from './src/container/ConsentPending/sagas';
import { dashboardSaga, getUserDetailsSaga, getGlobalLoginSaga } from './src/container/Dashboard/sagas';
import {
  editLeadDetailsSaga,
  getLeadDetailsEditPageSaga,
} from './src/container/Edit/sagas';
import {
  deleteITRsaga,
  getDDECommonData,
  linkToCustomersaga,
  uploadITRDocumentsaga,
} from './src/container/ITRVerification/sagas';
import { searchLeadSaga } from './src/container/Lead/sagas';
import {
  deleteLoanAgreementSaga,
  downloadLoanAgreementSaga,
  getEserviceCommonDataSaga,
  requestStampPaperSaga,
  uploadLoanAgreementSaga,
  saveSignInFlag,
getSactionLetterFlag

} from './src/container/LoanAgreement/sagas';
import {
  loanDealerSaga,
  loanmaximumamountSaga,
  loanSubDealerSaga,
  loanVehicleBrandSaga,
  loanVehicleDetailsSaga,
  loanVehicleModelSaga,
  loanVehicleSubModelSaga,
  saveUpdateLoanInfoSaga,
  getSchemeCodeSaga,
  getSchemeDetailsSaga,
  getApprovedLoanAmountSaga
} from './src/container/LoanDetails/sagas';
import {
  createConsentCoAppGuarantor,
  deleteCoAppGuarantor,
  getCoAppGuarantor,
  getLoanSummarySaga,
  getQDEDataSaga,
  saveCoAppGuarantor,
  verifyConsentCoAppGuarantor,
  getEmpListSaga,
  submitDeviationSaga
} from './src/container/LoanSummary/sagas';
import { loginSaga } from './src/container/Login/sagas';
import { otpVerificationSaga } from './src/container/OTPVerifcation/sagas';
import {
  deletePANSaga,
  getEntitySaga,
  savePANSaga,
  verifyPANSaga,
  gstwrapSaga,
} from './src/container/PANAndGSTVerification/sagas';
import {
  qdeSuccessSaga,
  submitToCreditSaga,
  getReasonMasterListSaga
} from './src/container/QdeSuccess/sagas';
import {
  saveUpdateFamilyReferenceSaga,
  saveUpdateNonFamilyReferenceSaga,
} from './src/container/References/sagas';
import {
  createUpdateCustomerSaga,
  saveSchemeSaga,
} from './src/container/Schemes/sagas';
import { uploadPANSaga } from './src/container/UploadDocument/sagas';
import { getAndroidVersion } from './src/container/VersionUpdate/sagas';
import { saveDisbursementRepaymentDetailsSaga, validateVpaSaga, saveRepaymentDetailsSaga, generateEnachTokenSaga, getRepaymentDetailsSaga,getEnachDataSaga, submitEnachSaga, getDisbursementRepaymentDetailsSaga } from './src/container/RepaymentDetails/sagas';
import { uploadDisbusementDocumentSaga, deleteDisbursementDocumentSaga, getDisbursementDocumentSaga } from './src/container/PreDisbursementDocument/sagas'
import { getFinbiturl } from './src/api/BankDetails';
import { getSchemeCode } from './src/api/LoanDetails';

function* watchers() {
  yield takeLatest('LOGIN_API', loginSaga);
  yield takeEvery('CLEAR_ALL_DATA', logoutSaga);
  yield takeEvery('SEARCH_LEAD', searchLeadSaga);
  yield takeEvery('DASHBOARD_API', dashboardSaga);
  yield takeEvery('GET_USER_DETAILS', getUserDetailsSaga);
  yield takeEvery('GLOBAL_LOGIN', getGlobalLoginSaga);
  
  yield takeEvery('DEALER_API', dealerSaga);
  yield takeEvery('DSA_API', dsaSaga);
  yield takeEvery('BRANCH_NAME', branchSaga);
  yield takeEvery('ADD_LEAD_API', addLeadSaga);
  yield takeEvery('GET_LEAD_DETAILS_API', getLeadDetailsSaga);
  yield takeEvery('CONSENT_PENDING_API', consentPendingSaga);
  yield takeEvery('ACC_AGGREGATOR_API', accAggrigatorSaga);
  yield takeEvery('AGGREGATOR_URL_CALL', accAggrigatorURLSaga);
  yield takeEvery('GET_CONSENT_STATUS', getConsentStatusSaga);

  yield takeEvery('EDIT_LEAD_DETAILS_API', editLeadDetailsSaga);
  yield takeEvery('DELETE_LEAD_API', deleteLeadSaga);
  yield takeEvery('UPLOAD_PAN_API', uploadPANSaga);
  yield takeEvery('GET_ANDROID_VERSION', getAndroidVersion);

  yield takeEvery('GET_ENTITY_API', getEntitySaga);
  yield takeEvery('VERIFY_PAN_API', verifyPANSaga);
  yield takeEvery('SAVE_PAN_API', savePANSaga);
  yield takeEvery('OTP_VERIFICATION_API', otpVerificationSaga);
  yield takeEvery('GET_LEAD_DETAILS_EDIT_PAGE_API', getLeadDetailsEditPageSaga);
  yield takeEvery('BUSINESS_SECTOR', businessSectorSaga);
  yield takeEvery('BUSINESS_INDUSTRY', businessIndustrySaga);
  yield takeEvery('BUSINESS_SUB_INDUSTRY', businessSubIndustrySaga);
  yield takeEvery('BUSINESS_SEGMENT', businessSegmentSaga);
  yield takeEvery('SAVE_UPDATE_BUSINESS_INFO', saveUpdateBusinessInfoSaga);
  yield takeEvery('CREATE_CUSTOMER', createCustomer);
  yield takeEvery('LOAN_VEHICLE_DETAILS', loanVehicleDetailsSaga);
  yield takeEvery('LOAN_VEHICLE_BRAND', loanVehicleBrandSaga);
  yield takeEvery('LOAN_VEHICLE_MODEL', loanVehicleModelSaga);
  yield takeEvery('LOAN_VEHICLE_SUB_MODEL', loanVehicleSubModelSaga);
  yield takeEvery('LOAN_DEALER', loanDealerSaga);
  yield takeEvery('LOAN_SUB_DEALER', loanSubDealerSaga);
  yield takeEvery('SAVE_UPDATE_LOAN_INFO', saveUpdateLoanInfoSaga);
  yield takeEvery('GET_SCHEME_Details', getSchemeDetailsSaga);
  yield takeEvery('GET_APPROVE_LOAN_AMOUNT', getApprovedLoanAmountSaga);
  yield takeEvery('GET_SCHEME_CODE', getSchemeCodeSaga);

  yield takeEvery(
    'SAVE_UPDATE_FAMILY_REFERENCE',
    saveUpdateFamilyReferenceSaga,
  );
  yield takeEvery(
    'SAVE_UPDATE_NON_FAMILY_REFERENCE',
    saveUpdateNonFamilyReferenceSaga,
  );
  yield takeEvery('SAVE_SCHEME', saveSchemeSaga);
  yield takeEvery('CREATE_UPDATE_CUSTOMER', createUpdateCustomerSaga);
  yield takeEvery(
    'UPLOPAD_DOC_ADDITIONAL_DETAILS',
    uploadDocAdditionalDetailsSaga,
  );
  yield takeEvery('GET_CITY_STATE', getCityState);
  yield takeEvery('GET_RESIDENCE_TYPE', getResidenceType);
  yield takeEvery('SAVE_EMPLOYMENT_DETAILS', saveEmploymentDetailsSaga);
  yield takeEvery('SAVE_PERMANENT_DETAILS', savePermanentAddressSaga);
  yield takeEvery('SAVE_ADDITIONAL_CONTACT', saveAdditionalContactSaga);
  yield takeEvery('SAVE_OFFICE_ADDRESS', saveOfficeAddressSaga);
  yield takeEvery('GET_STATE_LIST', getStateListSaga);
  yield takeEvery('GET_CITY_LIST', getCityListSaga);
  yield takeEvery('SAVE_KYC_DETAIL', saveKYCDetailSaga);
  yield takeEvery('GET_KYC_DOC', getKYCDocSaga);
  yield takeEvery('GET_UTILITY_DOC', getUtilityDocSaga);
  yield takeEvery('GET_SERVICE_PROVIDER', getServiceProviderSaga);
  yield takeEvery('SAVE_UTILITY_DETAILS', saveUtilityDetailSaga);
  yield takeEvery('GET_DETAILS_ELECTRICITY', getDetailsElectricitySaga);
  yield takeEvery('GET_DETAILS_GAS', getDetailsGasSaga);
  yield takeEvery('GET_DETAILS_LANDLINE', getDetailsLandlineSaga);
  yield takeEvery('UPLOAD_UTILITY_DOC', uploadUtilityDocSaga);
  yield takeEvery('UPLOPAD_DOC', uploadDocumentSaga);
  
  yield takeEvery('DELETE_UPLOADED_UTILITY_DOC', deleteUtilityDocSaga);
  yield takeEvery('VERIFY_DRIVING_LICENSE', verifyDrivingLicenseSaga);
  yield takeEvery('VERIFY_VOTER_ID', verifyVoterIDSaga);
  yield takeEvery('GET_DESIGNATION', getDesignationSaga);
  yield takeEvery('GET_INDUSTRY', getIndustrySaga);
  yield takeEvery('GET_COMPANY_TYPE', getCompanyTypeSaga);

  yield takeEvery('GET_LOAN_SUMMARY', getLoanSummarySaga);
  yield takeEvery('GET_QDE_DATA', getQDEDataSaga);
  yield takeEvery('DELETE_PAN_API', deletePANSaga);
  yield takeEvery('SAVE_SALARY_SLIP', saveSalarySlipSaga);
  yield takeEvery('GET_FINBIT_URL', getFinbitData);
  
  yield takeEvery('DELETE_SALARY_SLIP', deleteSalarySlipSaga);
  yield takeEvery('FETCH_BANK_STATEMENT', fetchBankStatementSaga);
  yield takeEvery('GET_DDE_COMMON_DATA', getDDECommonData);
  yield takeEvery('UPLOAD_ITR_DOCUMENT', uploadITRDocumentsaga);
  yield takeEvery('LINK_TO_CUSTOMER', linkToCustomersaga);
  yield takeEvery('QDESUCCESS_API', qdeSuccessSaga);
  yield takeEvery('DELETE_DOCUMENT', deleteDocumentSaga);
  yield takeEvery('UPLOPAD_CURRENT_DOC', uploadCurrentDocumentSaga);
  yield takeEvery('DELETE_PER_DOCUMENT', deletePerDocumentSaga);
  yield takeEvery('DELETE_UTILITY', deleteUtilitySaga);
  yield takeEvery('LOAN_MAXIMUM_AMOUNT', loanmaximumamountSaga);
  yield takeEvery('GET_ESERVICE_COMMON_DATA', getEserviceCommonDataSaga);
  yield takeEvery('STAMP_PAPER_API', requestStampPaperSaga);
  yield takeEvery('LOAN_AGREEMENT_UPLOAD_API', uploadLoanAgreementSaga);
  yield takeEvery('LOAN_AGREEMENT_DELETE_API', deleteLoanAgreementSaga);
  yield takeEvery('LOAN_AGREEMENT_DOWNLOAD_API', downloadLoanAgreementSaga);
  yield takeEvery('SAVE_SIGN_IN', saveSignInFlag);
  yield takeEvery('GET_SACTION_LETTER', getSactionLetterFlag);

  yield takeEvery('SUBMIT_TO_CREDIT_LOAN_API', submitToCreditSaga);
  yield takeEvery('GET_REASON_MASTER_LIST', getReasonMasterListSaga);

  yield takeEvery('DELETE_ITR', deleteITRsaga);
  yield takeEvery('GET_CO_APP_GUARANTOR', getCoAppGuarantor);
  yield takeEvery('SAVE_CO_APP_GUARANTOR', saveCoAppGuarantor);
  yield takeEvery('GET_EMP_LIST', getEmpListSaga);
  yield takeEvery('SUBMIT_DEVIATION', submitDeviationSaga);
  yield takeEvery('CREATE_CONSENT_COAPP_GUARANTOR', createConsentCoAppGuarantor);
  yield takeEvery('DELETE_COAPP_GUARANTOR', deleteCoAppGuarantor);
  yield takeEvery('VERIFY_CONSENT_COAPP_GUARANTOR', verifyConsentCoAppGuarantor);
  yield takeEvery('SAVE_REPAYMENT_DETAILS', saveRepaymentDetailsSaga);
  yield takeEvery('GENERATE_ENACH_TOKEN', generateEnachTokenSaga);
  yield takeEvery('SUBMIT_ENACH', submitEnachSaga);
  yield takeEvery('GET_ENACH_DATA', getEnachDataSaga);

  
  yield takeEvery('VALIDATE_VPA', validateVpaSaga);
  yield takeEvery('GET_REPAYMENT_DETAILS', getRepaymentDetailsSaga);
  yield takeEvery('SAVE_DISBURSEMENT_REPAYMENT_DETAILS', saveDisbursementRepaymentDetailsSaga);
  yield takeEvery('GET_DISBURSEMENT_REPAYMENT_DETAILS', getDisbursementRepaymentDetailsSaga);
  yield takeEvery('UPLOAD_DISBURSEMENT_DOCUMENT', uploadDisbusementDocumentSaga);
  yield takeEvery('DELETE_DISBURSEMENT_DOCUMENT', deleteDisbursementDocumentSaga);
  yield takeEvery('GET_DISBURSEMENT_DOCUMENT', getDisbursementDocumentSaga);
  yield takeEvery('GST_WRAPPER_API', gstwrapSaga);
  yield takeEvery('GSTADDRAPI', gstADDRSAGA);
  yield takeEvery('DEDUPE_CHECK', dedupeCheckSaga);
  yield takeEvery('GET_DEDUPE_ID', getDedupeIdSaga);
  yield takeEvery('GET_DESIGNATIONS', getDesignationsSaga);
  yield takeEvery('GET_PROFESSION', getProfessionSaga);
  yield takeEvery('GET_SUB_CATEGORY', getSubCategoryListSaga);
  yield takeEvery('GET_COMPANY_LIST', getCompanyListSaga);

  yield takeEvery('IFSC_CODE', ifscCODESaga);
  yield takeEvery('VERIFY_BANK_ACC_NO', verifyAccNumber);
  yield takeEvery('UPLOAD_SELFIE', uploadSelfieSaga);
  yield takeEvery('DELETE_SELFIE',deleteBusinessSelfieSaga);


}

export default function* rootSaga() {
  yield all([watchers()]);
}
