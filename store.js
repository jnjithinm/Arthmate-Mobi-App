import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { createLogger } from 'redux-logger';
import { compose } from 'recompose';
import { combineReducers } from 'redux';

import rootSaga from './sagas';
import { loginApp } from './src/container/Login/reducer';
import { leadApp } from './src/container/Lead/reducer';
import { authReducer } from "./src/container/App/reducer";
import { LOGIN_API } from './src/container/Login/const';
import { SAVE_USER_DATA } from "./src/container/App/const";
import { LEAD_API } from './src/container/Lead/const';
import { SAVE_PAN_DATA } from "./src/container/UploadDocument/const";
import { panReducer } from "./src/container/UploadDocument/reducer";
import { NEW_LEAD } from './src/container/AddLead/const';
import { newLeadData } from './src/container/AddLead/reducer';
import { HOC_REDUCER } from "./src/container/HOC/consts";
import { hocReducer } from "./src/container/HOC/reducer";
import { ADDITIONAL_DETAILS_API } from "./src/container/AdditionalDetails/const";
import { additionalDetails } from "./src/container/AdditionalDetails/reducer";
import { GET_QDE_DATA, SAVE_CO_APP_GUARANTOR } from "./src/container/LoanSummary/const";
import { qdeReducer } from "./src/container/LoanSummary/reducer";
import { GET_DDE_DATA_SUCCESS } from "./src/container/ITRVerification/const";
import { ddeReducer } from "./src/container/ITRVerification/reducer";
import { consentReducer } from "./src/container/ConsentPending/reducer";
import { CONSENT_PENDING_API } from "./src/container/ConsentPending/const";
import { referenceReducer } from "./src/container/References/reducer";
import { REFERENCE_API } from "./src/container/References/const";
import { saveloanReducer } from "./src/container/LoanDetails/reducer";
import { SAVE_UPDATE_LOAN_INFO } from "./src/container/LoanDetails/const";
import { dashboardReducer } from "./src/container/Dashboard/reducer";
import { DASHBOARD_API } from "./src/container/Dashboard/const";
import { otpReducer } from "./src/container/OTPVerifcation/reducer";
import { OTP_VERIFICATION_API } from "./src/container/OTPVerifcation/const";
import { editReducer } from "./src/container/Edit/reducer";
import { EDIT_LEAD_DETAILS_API } from "./src/container/Edit/const";
import { loanAgreementReducer } from "./src/container/LoanAgreement/reducer";
import { LOAN_AGREEMENT } from "./src/container/LoanAgreement/const";
import { pangstReducer } from "./src/container/PANAndGSTVerification/reducer";
import { PAN_GST } from "./src/container/PANAndGSTVerification/const";
import { bankReducer } from "./src/container/BankDetails/reducer";
import { BANK_API } from "./src/container/BankDetails/const";
import { CREATE_UPDATE_CUSTOMER } from "./src/container/Schemes/const";
import { saveSchemes } from "./src/container/Schemes/reducer";
import { REPAYMENT_DETAILS_API } from "./src/container/RepaymentDetails/const";
import { repaymentReducer } from "./src/container/RepaymentDetails/reducer";
import { PREDIS_DETAILS_API } from "./src/container/PreDisbursementDocument/const";
import { predisReducer } from "./src/container/PreDisbursementDocument/reducer";
import { saveBusinessReducer } from "./src/container/BusinessDetails/reducer";
import { BUSINESS_DETAILS } from "./src/container/BusinessDetails/const";
import { VERSION_UPDATE_API } from "./src/container/VersionUpdate/const";
import { versionDetails } from "./src/container/VersionUpdate/reducer";

const apiReducers = {
  [LOGIN_API]: loginApp,
  [SAVE_USER_DATA]: authReducer,
  [VERSION_UPDATE_API]: versionDetails,
  [SAVE_PAN_DATA]: panReducer,
  [NEW_LEAD]: newLeadData,
  [HOC_REDUCER]: hocReducer,
  [ADDITIONAL_DETAILS_API]: additionalDetails,
  [GET_QDE_DATA]: qdeReducer,
  [GET_DDE_DATA_SUCCESS]: ddeReducer,
  [CONSENT_PENDING_API]: consentReducer,
  [REFERENCE_API]: referenceReducer,
  [SAVE_UPDATE_LOAN_INFO]: saveloanReducer,
  [DASHBOARD_API]: dashboardReducer,
  [OTP_VERIFICATION_API]: otpReducer,
  [EDIT_LEAD_DETAILS_API]: editReducer,
  [LOAN_AGREEMENT]: loanAgreementReducer,
  [PAN_GST]: pangstReducer,
  [BANK_API]: bankReducer,
  [CREATE_UPDATE_CUSTOMER]: saveSchemes,
  [REPAYMENT_DETAILS_API]: repaymentReducer,
  [BUSINESS_DETAILS]: saveBusinessReducer,
  [PREDIS_DETAILS_API]: predisReducer,
};

const appReducer = combineReducers({
  ...apiReducers,
});


const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    })
    : compose;


// const immutableReconciler = (inboundState, originalState, reducedState) => {
//   const inboundStateCopy = inboundState;
//   Object.keys(inboundStateCopy.auth).forEach((key) => {
//     if (inboundStateCopy.auth[key].isFetching) {
//       inboundStateCopy.auth[key].isFetching = false;
//     }
//   });
//   const newState = { ...reducedState };
//   newState[LOGIN_API] = inboundStateCopy[LOGIN_API];
//   newState[SAVE_USER_DATA] = inboundStateCopy[SAVE_USER_DATA];
//   return newState;
// };

const logger = createLogger({ collapsed: true });

const persistConfig = {
  key: 'root',
  // Storage Method (React Native)
  storage: AsyncStorage,
  // Whitelist (Save Specific Reducers)
  whitelist: [SAVE_USER_DATA, LOGIN_API,],
  // stateReconciler: immutableReconciler,
};

const persistedReducer = persistReducer(persistConfig, appReducer);
const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  persistedReducer,
  composeEnhancers(applyMiddleware(sagaMiddleware, logger)),
);
sagaMiddleware.run(rootSaga);

const persistor = persistStore(store);

export {
  persistor,
  store,
};
