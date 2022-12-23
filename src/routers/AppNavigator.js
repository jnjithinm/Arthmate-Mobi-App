import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import AdditionalDetails from '../screens/AdditionalDetails/AdditionalDetails';
import Dedupe from '../screens/AdditionalDetails/Dedupe';
import AddLead from '../screens/AddLead/AddLead';
import BankDetails from '../screens/BankDetails/BankDetails';
import BusinessDetails from '../screens/BusinessDetails/BusinessDetails';
import ConsentPending from '../screens/ConsentPending/ConsentPending';
import KycVerification from '../screens/ConsentPending/KycVerification';
import Dashboard from '../screens/Dashboard/Dashboard';
import EmiCalculator from '../screens/Dashboard/EmiCalculator';
import CaseReject from '../screens/Dashboard/CaseReject';
import Edit from '../screens/Edit/Edit';
//DDE Screen
import ITRVerification from '../screens/ITRVerification/ITRVerification';
import LeadList from '../screens/LeadList/LeadList';
import LoanAgreement from '../screens/LoanAgreement/LoanAgreement';
import LoanDetails from '../screens/LoanDetails/LoanDetails';
//Loan Summary
import LoanSummary from '../screens/LoanSummary/LoanSummary';
import Login from '../screens/Login/Login';
import OTPVerification from '../screens/OTPVerification/OTPVerification';
//QDE Screen
import PANAndGSTVerification from '../screens/PANAndGSTVerification/PANAndGSTVerification';
import PersonalDetails from '../screens/PersonalDetails';
import QdeSuccess from '../screens/QdeSuccess/QdeSuccess';
import References from '../screens/References/References';
import Schemes from '../screens/Schemes/Schemes';
// Auth Stack Screens
import Splash from '../screens/Splash/Splash';
import Verification from '../screens/Verification/Verification';

import PreDisbursalDocument from '../screens/PreDisbursalDocument/PreDisbursalDocument';
import RepaymentDetails from '../screens/RepaymentDetails/RepaymentDetails';
import RepaymentProcess from '../screens/RepaymentDetails/RepaymentProcess';
import PostDisbursalDocument from '../screens/PostDisbursalDocument/PostDisbursalDocument';

const AuthStack = createStackNavigator(
  {
    Splash: { screen: Splash },
    Login: { screen: Login },
    Dashboard: { screen: Dashboard },
    EmiCalculator: { screen: EmiCalculator },
    CaseReject: { screen: CaseReject },
    LeadList: { screen: LeadList },
    AddLead: { screen: AddLead },
    ConsentPending: { screen: ConsentPending },
    KycVerification: { screen: KycVerification },
    OTPVerification: { screen: OTPVerification },
    Verification: { screen: Verification },
    BusinessDetails: { screen: BusinessDetails },
    LoanDetails: { screen: LoanDetails },
    Edit: { screen: Edit },
    PANAndGSTVerification: { screen: PANAndGSTVerification },
    AdditionalDetails: { screen: AdditionalDetails },
    Dedupe: { screen: Dedupe },
    PersonalDetails: { screen: PersonalDetails },
    References: { screen: References },
    Schemes: { screen: Schemes },
    QdeSuccess: { screen: QdeSuccess },
    LoanSummary: { screen: LoanSummary },
    BankDetails: { screen: BankDetails },
    ITRVerification: { screen: ITRVerification },
    LoanAgreement: { screen: LoanAgreement },
    PreDisbursalDocument: { screen: PreDisbursalDocument },
    RepaymentDetails: { screen: RepaymentDetails },
    RepaymentProcess: { screen: RepaymentProcess },
    PostDisbursalDocument: { screen: PostDisbursalDocument },
  },
  { headerMode: 'none' },
);

const AppNavigator = createStackNavigator(
  {
    AuthStack,
  },
  {
    headerMode: 'none',
  },
);

export default createAppContainer(AppNavigator);
