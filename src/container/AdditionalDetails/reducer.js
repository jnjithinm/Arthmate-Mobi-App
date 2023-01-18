const initialState = {
  showLoader: false,
  error: false,
};

export const additionalDetails = (state = initialState, action) => {
  switch (action.type) {
    case 'SAVE_EMPLOYMENT_DETAILS':
      return {
        showLoader: true,
        error: false,
      };
    case 'SAVE_EMPLOYMENT_DETAILS_SUCCESS':
      return {
        showLoader: false,
        error: false,
      };
    case 'SAVE_EMPLOYMENT_DETAILS_FAILURE':
      return {
        showLoader: false,
        error: true,
      };
    case 'SAVE_UTILITY_DETAILS':
      return {
        showLoader: true,
        error: false,
      };
    case 'SAVE_PERMANENT_DETAILS':
      return {
        showLoader: true,
        error: false,
      };
    case 'SAVE_PERMANENT_DETAILS_SUCCESS':
      return {
        showLoader: false,
        error: false,
      };
    case 'SAVE_PERMANENT_DETAILS_FAILURE':
      return {
        showLoader: false,
        error: true,
      };
    case 'SAVE_UTILITY_DETAILS':
      return {
        showLoader: true,
        error: false,
      };
    case 'SAVE_UTILITY_DETAILS_SUCCESS':
      return {
        showLoader: false,
        error: false,
      };
    case 'SAVE_UTILITY_DETAILS_FAILURE':
      return {
        showLoader: false,
        error: true,
      };
    case 'SAVE_OFFICE_ADDRESS':
      return {
        showLoader: true,
        error: false,
      };
    case 'SAVE_OFFICE_ADDRESS_SUCCESS':
      return {
        showLoader: false,
        error: false,
      };
    case 'SAVE_OFFICE_ADDRESS_FAILURE':
      return {
        showLoader: false,
        error: true,
      };
    case 'UPLOAD_UTILITY_DOC':
      return {
        showLoader: true,
        error: false,
      };
    case 'UPLOAD_UTILITY_DOC_SUCCESS':
      return {
        showLoader: false,
        error: false,
      };
    case 'UPLOAD_UTILITY_DOC_FAILURE':
      return {
        showLoader: false,
        error: true,
      };

    case 'UPLOPAD_DOC':
      return {
        showLoader: true,
        error: false,
      };
    case 'UPLOPAD_DOC_SUCCESS':
      return {
        showLoader: false,
        error: false,
      };
    case 'UPLOPAD_DOC_FAILURE':
      return {
        showLoader: false,
        error: true,
      };
    case 'UPLOPAD_DOC_ADDITIONAL_DETAILS':
      return {
        showLoader: true,
        error: false,
      };
    case 'UPLOPAD_DOC_ADDITIONAL_DETAILS_SUCCESS':
      return {
        showLoader: false,
        error: false,
      };
    case 'UPLOPAD_DOC_ADDITIONAL_DETAILS_FAILURE':
      return {
        showLoader: false,
        error: true,
      };
    case 'SAVE_ADDITIONAL_CONTACT':
      return {
        showLoader: true,
        error: false,
      };
    case 'SAVE_ADDITIONAL_CONTACT_SUCCESS':
      return {
        showLoader: false,
        error: false,
      };
    case 'SAVE_ADDITIONAL_CONTACT_FAILURE':
      return {
        showLoader: false,
        error: true,
      };
    case 'SAVE_KYC_DETAIL':
      return {
        showLoader: true,
        error: false,
      };
    case 'SAVE_KYC_DETAIL_SUCCESS':
      return {
        showLoader: false,
        error: false,
      };
    case 'SAVE_KYC_DETAIL_FAILURE':
      return {
        showLoader: false,
        error: true,
      };
    case 'VERIFY_DRIVING_LICENSE':
      return {
        showLoader: true,
        error: false,
      };
    case 'VERIFY_DRIVING_LICENSE_SUCCESS':
      return {
        showLoader: false,
        error: false,
      };
    case 'VERIFY_DRIVING_LICENSE_FAILURE':
      return {
        showLoader: false,
        error: true,
      };
    case 'VERIFY_VOTER_ID':
      return {
        showLoader: true,
        error: false,
      };
    case 'VERIFY_VOTER_ID_SUCCESS':
      return {
        showLoader: false,
        error: false,
      };
    case 'VERIFY_VOTER_ID_FAILURE':
      return {
        showLoader: false,
        error: true,
      };
    case 'GET_DETAILS_ELECTRICITY':
      return {
        showLoader: true,
        error: false,
      };
    case 'GET_DETAILS_ELECTRICITY_SUCCESS':
      return {
        showLoader: false,
        error: false,
      };
    case 'GET_DETAILS_ELECTRICITY_FAILURE':
      return {
        showLoader: false,
        error: true,
      };
    case 'GET_DETAILS_GAS':
      return {
        showLoader: true,
        error: false,
      };
    case 'GET_DETAILS_GAS_SUCCESS':
      return {
        showLoader: false,
        error: false,
      };
    case 'GET_DETAILS_GAS_FAILURE':
      return {
        showLoader: false,
        error: true,
      };
    case 'GET_DETAILS_LANDLINE':
      return {
        showLoader: true,
        error: false,
      };
    case 'GET_DETAILS_LANDLINE_SUCCESS':
      return {
        showLoader: false,
        error: false,
      };
    case 'GET_DETAILS_LANDLINE_FAILURE':
      return {
        showLoader: false,
        error: true,
      };

    case 'GET_STATE_LIST':
      return {
        showLoader: true,
        error: false,
      };
    case 'GET_STATE_LIST_SUCCESS':
      return {
        showLoader: false,
        error: false,
      };
    case 'GET_STATE_LIST_FAILURE':
      return {
        showLoader: false,
        error: true,
      };
    case 'GET_CITY_LIST':
      return {
        showLoader: true,
        error: false,
      };
    case 'GET_CITY_LIST_SUCCESS':
      return {
        showLoader: false,
        error: false,
      };
    case 'GET_CITY_LIST_FAILURE':
      return {
        showLoader: false,
        error: true,
      };
    case 'DEDUPE_CHECK':
      return {
        showLoader: true,
        error: false,
      };
    case 'DEDUPE_CHECK_SUCCESS':
      return {
        showLoader: false,
        error: false,
      };
    case 'DEDUPE_CHECK_FAILURE':
      return {
        showLoader: false,
        error: true,
      };
    case 'GET_DEDUPE_ID':
      return {
        // showLoader: true,
        error: false,
      };
    case 'GET_DEDUPE_ID_SUCCESS':
      return {
        showLoader: false,
        error: false,
      };
    case 'GET_DEDUPE_ID_FAILURE':
      return {
        showLoader: false,
        error: true,
      };

    case 'GET_PROFESSION':
      return {
        showLoader: true,
        error: false,
      };
    case 'GET_PROFESSION_SUCCESS':
      return {
        showLoader: false,
        error: false,
      };
    case 'GET_PROFESSION_FAILURE':
      return {
        showLoader: false,
        error: true,
      };

    case 'GET_SUB_CATEGORY':
      return {
        showLoader: true,
        error: false,
      };
    case 'GET_SUB_CATEGORY_SUCCESS':
      return {
        showLoader: false,
        error: false,
      };
    case 'GET_SUB_CATEGORY_FAILURE':
      return {
        showLoader: false,
        error: true,
      };

    case 'GET_DESIGNATIONS':
      return {
        showLoader: true,
        error: false,
      };
    case 'GET_DESIGNATIONS_SUCCESS':
      return {
        showLoader: false,
        error: false,
      };
    case 'GET_DESIGNATIONS_FAILURE':
      return {
        showLoader: false,
        error: true,
      };
    case 'GET_COMPANY_LIST':
      return {
        showLoader: false,
        error: false,
      };
    case 'GET_COMPANY_LIST_SUCCESS':
      return {
        showLoader: false,
        error: false,
      };
    case 'GET_COMPANY_LIST_FAILURE':
      return {
        showLoader: false,
        error: true,
      };
    case 'UPLOPAD_CURRENT_DOC':
      return {
        showLoader: true,
        error: false,
      };
    case 'UPLOPAD_CURRENT_DOC_SUCCESS':
      return {
        showLoader: false,
        error: false,
      };
    case 'UPLOPAD_CURRENT_DOC_FAILURE':
      return {
        showLoader: false,
        error: true,
      };

    default:
      return state;
  }
};
