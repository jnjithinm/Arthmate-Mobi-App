import { baseURL, uatURL } from './baseURL';

export const config = {

  GET_ANDROID_VERSION: `${uatURL.version}/master/getAndroidVersion`,

  GET_USER_LOGIN: `${uatURL.useLogindata}/globalLogin/getUserDetailsByEmployeeId`,
  GLOBAL_LOGIN: `${uatURL.globalLogin}/creditwise/globalLogin?`,

  LOGIN_URL: `${uatURL.uatURL}/authentication/authenticate`,
  GETLEAD_URL: `${uatURL.uatURL}/lead/getLeadCount`,
  LEADSEARCH: `${uatURL.uatURL}/lead/getallleadsbysearch`,
LIST_CASE_DETAILS: `${uatURL.uatURL}/lead/listCaseStatus`,
  DEALER_URL: `${uatURL.uatURL}/master/getDealerList`,
  DSA_URL: `${uatURL.uatURL}/user/getDsaCodeList`,
  ADDLEAD_URL: `${uatURL.uatURL}/lead/addLead`,
  GETLEADDETAILS_URL: `${uatURL.uatURL}/lead/getLeadDetails`,
  EDITLEAD_URL: `${uatURL.uatURL}/lead/addLead`,
  DELETELEAD_URL: `${uatURL.uatURL}/lead/deleteLead`,
  BRANCH_URL: `${uatURL.uatURL}/master/getBranches`,
  // BRANCH_URL: `${uatURL.uatURL}/master/getBranchlist`,
  API_URL: `${uatURL.uatURL}/authentication/authenticate`,
  API_GET_ENTITY: `${uatURL.uatURL}/qde/gettypeofcompany`,

  API_PAN_OCR: `${uatURL.uatURL}/wrapper/panDetails`,

  API_VERIFY_PAN: `${uatURL.uatURL}/wrapper/wrapperAPI`,
  API_SAVE_PAN: `${uatURL.uatURL}/pangst/savePanGst`,
  // CONSENT_CREATE: `${uatURL.uatURL}/lead/createConsent`,
  CONSENT_CREATE: `${uatURL.uatURL}/lead/sendOtpOnMobile`,
  CONSENT_VERIFY: `${uatURL.uatURL}/lead/verifyOtp`,
  ACC_AGGREGATOR: `${uatURL.uatURL}/aggregator/acctAggregatorRequestConsent`,
  AGGRIGATOR_URL: `${uatURL.uatURL}/aggregator/getWebRedirectionUrl`,
  CONSENT_STATUS: `${uatURL.uatURL}/aggregator/getAAConsentStatus`,

  // CONSENT_VERIFY: `${uatURL.uatURL}/lead/verifyConsent`,
  BUSINESS_SECTOR_MASTER: `${uatURL.uatURL}/qde/getsectormaster`,
  BUSINESS_INDUSTRY: `${uatURL.uatURL}/qde/getindustrylist`,
  BUSINESS_SUBINDUSTRYLIST: `${uatURL.uatURL}/qde/getsubindustrylist`,
  BUSINESS_SEGMENT: `${uatURL.uatURL}/qde/getsegmentlist`,
  SAVE_UPDATE_BUSINESS_INFO: `${uatURL.uatURL}/qde/saveorupdatebusinessinformationdetails`,
  UPLOAD_BUSINESS_SELFIE: `${uatURL.uatURL}/qde/uploadBusinessSelfie`,
  DELETE_BUSINESS_SELFIE: `${uatURL.uatURL}/qde/deleteBusinessSelfie`,

  GET_SCHEMECODE: `${uatURL.uatURL}/master/getSchemeCode`,
  GET_SCHEMEDetails: `${uatURL.uatURL}/master/getSchemeDetailsBySchemeCode`,
  LOAN_VEHICLEDETAILS: `${uatURL.uatURL}/qde/getvehicletypelist`,
  LOAN_VEHICLEBRAND: `${uatURL.uatURL}/qde/getvehiclebrandlist`,
  LOAN_VEHICLEMODEL: `${uatURL.uatURL}/qde/getvehiclemodellist`,
  LOAN_VEHICLESUBMODEL: `${uatURL.uatURL}/qde/getvehiclesubmodellist`,
  SAVE_UPDATE_LOAN_INFO: `${uatURL.uatURL}/qde/saveorupdateqdeloandetails`,
  UPDATE_LOAN_INFO: `${uatURL.uatURL}/qde/getApprovedLoanAmount`,

  LOAN_MAXIMUM_AMOUNT: `${uatURL.uatURL}/qde/getvehiclemaxamt`,
  REFERENCE_SAVEUPDATE_FAMILY: `${uatURL.uatURL}/qde/saveorupdatefamilyref`,
  REFERENCE_SAVEUPDATE_NONFAMILY: `${uatURL.uatURL}/qde/saveorupdatenonfamilyref`,
  GETREFERENCEDETAILS: `${uatURL.uatURL}/qde/getreferencedetails`,

  SAVE_SCHEME: `${uatURL.uatURL}/qde/saveschemedata`,
  CREATEUPDATE_CUSTOMER: `${uatURL.uatURL}/customer/createOrUpdateCustomer`,
  BUREAU_CALLING: `${uatURL.uatURL}/bre/callBureauRejectedBre`,
  VERIFY_ACC_NO: `${uatURL.uatURL}/qde/verifyBankAccoutNumber`,

  DELETE_DOCUMENTS: `${uatURL.uatURL}/addetails/deleteDocument`,
  DELETE_PER_DOCUMENTS: `${uatURL.uatURL}/addetails/deletePermanentAddDoc`,
  DELETE_CURR_DOCUMENTS: `${uatURL.uatURL}/cuurentAddress/deleteDocument`,

  DELETE_UTLITY: `${uatURL.uatURL}/utility/deleteUtilityBill`,
  GET_CITY_STATE: `${uatURL.uatURL}/addetails/getStateCityByPin`,

  GET_PROFESSION: `${uatURL.uatURL}/master/getProfessionList`,
  GET_SUB_CATEGORY: `${uatURL.uatURL}/master/getSubCategoryList`,
  GET_DESIGNATIONS: `${uatURL.uatURL}/master/getDesignations`,
  GET_COMPANY_LIST: `${uatURL.uatURL}/master/getTopCompaniesList`,

  GET_RESIDENCE_TYPE: `${uatURL.uatURL}/master/getresidensetype`,
  UPLOAD_DOC_ADDITIONAL_DETAILS: `${uatURL.uatURL}/addetails/kycDocDetails`,
  SAVE_EMPLOYMENT_DETAILS: `${uatURL.uatURL}/addetails/saveEmploymentDetails`,
  SAVE_ADDITIONAL_CONTACT: `${uatURL.uatURL}/addetails/saveAltContactDetails`,
  SAVE_OFFICE_ADDRESS: `${uatURL.uatURL}/addetails/saveAddressDetails`,
  SAVE_PERM_ADDRESS: `${uatURL.uatURL}/addetails/saveOrUpdatePermanentAdd`,
  UPLOAD_DOC: `${uatURL.uatURL}/addetails/uploadPermanentAddDoc`,
  UPLOAD_BANK_DOC: `${uatURL.uatURL}/dde/uploadBankStatement`,
  UPLOAD_CURRENT_DOC: `${uatURL.uatURL}/cuurentAddress/uploadDocument`,
  GET_CITY_LIST: `${uatURL.uatURL}/master/getcitylist`,
  GET_STATE_LIST:`${uatURL.uatURL}/master/getArthmateStatesList`,
  SAVE_KYC_DETAILS: `${uatURL.uatURL}/addetails/saveOrUpdateDocument`,
  GET_KYC_DOC_OTHERS: `${uatURL.uatURL}/master/getkycdocumentlist`,
  GET_UTILITY_DOC_OTHER: `${uatURL.uatURL}/master/getutilitybilltype`,
  GET_SERVICE_PROVIDER_LIST: `${uatURL.uatURL}/master/getelectricompanycodelist`,
  SAVE_UTILITY_DETAILS: `${uatURL.uatURL}/utility/saveOrUpdateUtilityBill`,
  GET_DETAILS_ELECTRICITY: `${uatURL.uatURL}/wrapper/electricity-bill-authentication`,
   // `https://uc9q5045lj.execute-api.us-east-2.amazonaws.com/Test/electricity-bill-authentication`,
  GET_DETAILS_GAS:`${uatURL.uatURL}/wrapper/lpg-authentication`,
  //  `https://uc9q5045lj.execute-api.us-east-2.amazonaws.com/Test/lpg-id-authentication`,
  GET_DETAILS_LANDLINE: `${uatURL.uatURL}/wrapper/telephone-authentication`,
  // `https://uc9q5045lj.execute-api.us-east-2.amazonaws.com/Test/telephone-landline-authentication`,
  
  UTILIY_VOTER_VERIFY: `${uatURL.uatURL}/utility/karzaVoterIdVerification`,
  UTILIY_LANDLINE_VERIFY: `${uatURL.uatURL}/utility/karzaTeleLandLineVerification`,
  UTILIY_DRIVING_VERIFY: `${uatURL.uatURL}/utility/driverLicenceVerification`,
  UTILIY_GAS_VERIFY: `${uatURL.uatURL}/utility/karzaPngeVerification`,

  UPLOAD_UTILIY_DOC: `${uatURL.uatURL}/utility/uploadUtilityDoc`,
  DELETE_UPLOADED_UTILITY_DOC: `${uatURL.uatURL}/utility/deleteUtilityBill`,
  VERIFY_DRIVING_LICENSE: `${uatURL.uatURL}/addetails/dlVerifyDetails`,
  VERIFY_VOTER_ID: `${uatURL.uatURL}/addetails/voterVerifyDetails`,
  UTILIY_PASSPORT_VERIFY: `${uatURL.uatURL}/utility/karzaPassportVerification`,
  GET_DESIGNATION: `${uatURL.uatURL}/qde/gettypeofdesignation`,
  GET_INDUSTRY: `${uatURL.uatURL}/master/getEmploymentIndustry`,
  GET_COMPANY_TYPE: `${uatURL.uatURL}/master/getEmploymentConstitution`,
  GET_DEDUPE_CHECKS: `${uatURL.uatURL}/addetails/dedupeCheck`,
  DEDUPE_ID: `${uatURL.uatURL}/addetails/dedupeResponseListByapplicantUniqueIds`,


  SAVESALARYSLIP: `${uatURL.uatURL}/dde/saveBankDetails`,
  DELETESALARYSLIP: `${uatURL.uatURL}/dde/deleteDocumentById`,
  DELETEBANKSTATEMENT: `${uatURL.uatURL}/dde/deleteBankStatement`,
  QDE_SUCCESS: `${uatURL.uatURL}/qde/getqdesuccessresponse`,
  COLLECTR_FETCH: `${uatURL.uatURL}/dde/fetchBankStatement`,
  FINBIT_URL: `${uatURL.uatURL}/dde/getFinbitUrl`,

  SUBMIT_TO_CREDIT_LOAN: `${uatURL.uatURL}/lead/loanApplication`,
  GET_REASON_MASTER_LIST_URL: `${uatURL.uatURL}/master/getReasonMasterList`,

  
  GET_ESERVICE_COMMON_DATA: `${uatURL.uatURL}/eService/getEservice`,
  LOAN_AGREEMENT_STAMP_PAPER: `${uatURL.uatURL}/eService/requestEservice`,
  LOAN_AGREEMENT_UPLOAD: `${uatURL.uatURL}/eService/uploadLoanAgreement`,
  LOAN_AGREEMENT_DELETE: `${uatURL.uatURL}/eService/deleteLoanAgreement`,
  LOAN_AGREEMENT_DOWNLOAD: `${uatURL.uatURL}/eService/downloadLoanAgreement`,
  SAVE_SIGN_IN: `${uatURL.uatURL}/eService/saveEsignCheck`,
  GET_SACTION_LETTER: `${uatURL.uatURL}/eService/getEsignDocumentSactionLetter`,

  GET_LOAN_SUMMARY: `${uatURL.uatURL}/casesummary/getcasesummarydetails`,
  GET_QDE_COMMON_API: `${uatURL.uatURL}/qde/getqdedetailsbyapplicantuniqid`,
  DELETE_PAN_API: `${uatURL.uatURL}/pangst/deletePanGst`,
  GETDDEDETAILS: `${uatURL.uatURL}/dde/getDdeDetails`,
  GET_DDE_COMMON_API: `${uatURL.uatURL}/dde/getDdeDetails`,

  UPLOAD_ITR: `${uatURL.uatURL}/dde/uploadITRDocument`,
  SEND_LINK: `${uatURL.uatURL}/dde/sendITRLinkToCustomer`,
  DELETE_ITR: `${uatURL.uatURL}/dde/deleteITRDocument`,

  GET_USER_LIST: `${uatURL.uatURL}/master/getDeviationModuleEmployeeList`,
  SUBMIT_DEVIATION: `${uatURL.uatURL}/master/submitToDeviationModule`,
  GET_CO_APPLICANT_GUARANTOR: `${uatURL.uatURL}/coapplicant/getcoApplicantDetailsbyApplicantUniqid`,
  SAVE_CO_APPLICANT_GUARANTOR: `${uatURL.uatURL}/coapplicant/addbasicdetails`,
  CREATE_CONSENT_COAPP_GUARANTOR: `${uatURL.uatURL}/coapplicant/createConsent`,
  DELETE_COAPP_GUARANTOR: `${uatURL.uatURL}/coapplicant/deleteCoApplicantGurentor`,
  VERFI_CONSENT_COAPP_GUARANTOR: `${uatURL.uatURL}/coapplicant/verifyConsent`,
  GET_QUALIFICATION: `${uatURL.uatURL}/master/getQualification`,
  GET_RELATION_WITH_MAINAPPLICANT: `${uatURL.uatURL}/master/getRelationWithMainApplicant`,
  GET_BANK_ACCOUNT_TYPE: `${uatURL.uatURL}/master/getBankAccountType`,
  GET_MARTIAL_STATUS: `${uatURL.uatURL}/master/getMaritalStatus`,

  SAVE_PERSONAL_DETAILS: `${uatURL.uatURL}/qde/saveOrUpdatePersonalDetails`,
  UPLOAD_SELFIE: `${uatURL.uatURL}/qde/uploadSelfie`,
  DELETE_SELFIE: `${uatURL.uatURL}/qde/deleteSelfie`,
  SAVEDISBURSEMENT_REPAYMENTDETAILS: `${uatURL.uatURL}/repayment/submit`,
  GET_REPAYMENT_DETAILS: `${uatURL.uatURL}/repayment/get`,


 
// http://3.110.227.60:8087/cwc-sales/wrapper/electricity-bill-authentication
// http://3.110.227.60:8087/cwc-sales/wrapper/lpg-authentication
// http://3.110.227.60:8087/cwc-sales/wrapper/telephone-authentication
// http://3.110.227.60:8087/cwc-sales/wrapper/register-enach
// http://3.110.227.60:8087/cwc-sales/wrapper/validate-vpa
// http://3.110.227.60:8087/cwc-sales/wrapper/create-mandate-for-vpa

 
  
  VALIDATE_VPA: `${uatURL.uatURL}/wrapper/validate-vpa`,
  //  `${uatURL.nach}/CAMPSPay-enach/enach/toValidateVpa`,
  SUBMIT_VPA: `${uatURL.uatURL}/wrapper/create-mandate-for-vpa`,
  // `${uatURL.nach}/CAMPSPay-enach/enach/createMandateForVpa`,
  SUBMIT_ENACH: `${uatURL.uatURL}/wrapper/register-enach?`,
  // `${uatURL.nach}/CAMPSPay-enach/enach/registerEnach?`,

  GET_NACH_DATA: `${uatURL.uatURL}/repayment/getApplicantDetailsForCampsPayEnach`,
  SAVE_REPAYMENT_DETAILS: `${uatURL.uatURL}/repayment/save`,
  GETDISBURSEMENT_REPAYMENTDETAILS: `${uatURL.uatURL}/repayment/getdisbursement`,

  UPLOAD_DOCUMENT: `${uatURL.uatURL}/disbursement/uploadDocument`,
  UPLOAD_DOCUMENT1: `${uatURL.uatURL}/disbursement/uploadDocumentForAndroid`,
  GET_DOCUMENT: `${uatURL.uatURL}/disbursement/getDocuments`,
  DELETE_DOCUMENT: `${uatURL.uatURL}/disbursement/deleteDocument`,

  IFSC_CODE: `${uatURL.uatURL}/qde/getBankDetailsFromIfsc`,
  GSTBYPAN: `${uatURL.uatURL}/wrapper/getGstNoByPan`,
  GETGSTADDR: `${uatURL.uatURL}/wrapper/getGstAddressByGstNo`,
};
