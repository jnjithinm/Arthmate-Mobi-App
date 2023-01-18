const uploadDocAdditionalDetails = (actions) => {
    return { type: 'UPLOPAD_DOC_ADDITIONAL_DETAILS', actions: actions };
};
const uploadDoc = (actions) => {
    return { type: 'UPLOPAD_DOC', actions: actions };
};
const uploadCurrentDoc = (actions) => {
    return { type: 'UPLOPAD_CURRENT_DOC', actions: actions };
};
const getCityState = (actions) => {
    return { type: 'GET_CITY_STATE', actions: actions };
};
const getStateList = (actions) => {
    return { type: 'GET_STATE_LIST', actions: actions };
};
const getResidenceType = (actions) => {
    return { type: 'GET_RESIDENCE_TYPE', actions: actions };
};

const saveEmploymentDetails = (actions) => {
    return { type: 'SAVE_EMPLOYMENT_DETAILS', actions: actions };
};

const savePermanentDetails = (actions) => {
    return { type: 'SAVE_PERMANENT_DETAILS', actions: actions };
};

const saveAdditionalContact = (actions) => {
    return { type: 'SAVE_ADDITIONAL_CONTACT', actions: actions };
};

const saveOfficeAddress = (actions) => {
    return { type: 'SAVE_OFFICE_ADDRESS', actions: actions };
};

const getCityList = (actions) => {
    return { type: 'GET_CITY_LIST', actions: actions };
};

const saveKYCDetail = (actions) => {
    return { type: 'SAVE_KYC_DETAIL', actions: actions };
};

const getKYCDoc = (actions) => {
    return { type: 'GET_KYC_DOC', actions: actions };
};

const getUtilityDoc = (actions) => {
    return { type: 'GET_UTILITY_DOC', actions: actions };
};

const getServiceProvider = (actions) => {
    return { type: 'GET_SERVICE_PROVIDER', actions: actions };
};

const saveUtilityDetails = (actions) => {
    return { type: 'SAVE_UTILITY_DETAILS', actions: actions };
};

const getDetailsElectricity = (actions) => {
    return { type: 'GET_DETAILS_ELECTRICITY', actions: actions };
};

const getDetailsGas = (actions) => {
    return { type: 'GET_DETAILS_GAS', actions: actions };
};

const getDetailsLandline = (actions) => {
    return { type: 'GET_DETAILS_LANDLINE', actions: actions };
};

const uploadUtilityDoc = (actions) => {
    return { type: 'UPLOAD_UTILITY_DOC', actions: actions };
};

const deleteUploadedUtilityDoc = (actions) => {
    return { type: 'DELETE_UPLOADED_UTILITY_DOC', actions: actions };
};

const verifyDrivingLicense = (actions) => {
    return { type: 'VERIFY_DRIVING_LICENSE', actions: actions };
};

const verifyVoterID = (actions) => {
    return { type: 'VERIFY_VOTER_ID', actions: actions };
};

const getDesignation = (actions) => {
    return { type: 'GET_DESIGNATION', actions: actions };
};

const getCompanyType = (actions) => {
    return { type: 'GET_COMPANY_TYPE', actions: actions };
};

const getIndustry = (actions) => {
    return { type: 'GET_INDUSTRY', actions: actions };
};

const deleteDocuments = (actions) => {
    return { type: 'DELETE_DOCUMENT', actions: actions };
};

const deletePerDocuments = (actions) => {
    return { type: 'DELETE_PER_DOCUMENT', actions: actions };
};

const deleteUtility = (actions) => {
    return { type: 'DELETE_UTILITY', actions: actions };
};

const gstADDRAPI = (actions) => {
    return { type: 'GSTADDRAPI', actions: actions };
};
const dedupeCheck = (actions) => {
    return { type: 'DEDUPE_CHECK', actions: actions };
};

const getDedupeId = (actions) => {
    return { type: 'GET_DEDUPE_ID', actions: actions };
};

const getProfession = (actions) => {
    return { type: 'GET_PROFESSION', actions: actions };
};
const getSubCategoryList = (actions) => {
    return { type: 'GET_SUB_CATEGORY', actions: actions };
};

const getDesignations = (actions) => {
    return { type: 'GET_DESIGNATIONS', actions: actions };
};
const getCompanyList = (actions) => {
    return { type: 'GET_COMPANY_LIST', actions: actions };
};
export {
    uploadDocAdditionalDetails,
    getCityState,
    getResidenceType,
    saveEmploymentDetails,
    saveAdditionalContact,
    saveOfficeAddress,
    getCityList,
    getStateList,
    saveKYCDetail,
    getKYCDoc,
    getUtilityDoc,
    getServiceProvider,
    saveUtilityDetails,
    getDetailsElectricity,
    getDetailsGas,
    getDetailsLandline,
    uploadUtilityDoc,
    deleteUploadedUtilityDoc,
    verifyDrivingLicense,
    verifyVoterID,
    getDesignation,
    getCompanyType,
    getIndustry,
    deleteDocuments,
    deletePerDocuments,
    deleteUtility,
    gstADDRAPI,
    dedupeCheck,
    getDedupeId,
    getProfession,
    getSubCategoryList,
    getDesignations,
    getCompanyList,
    savePermanentDetails,
    uploadDoc,
    uploadCurrentDoc
};