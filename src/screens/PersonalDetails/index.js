import React, { useEffect, useState } from 'react';
import { Image, StatusBar, Text, TouchableOpacity, View, Keyboard } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { Icon } from 'react-native-elements';
import { FloatingLabelInput } from 'react-native-floating-label-input';
import { ScrollView } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { handleWarning, handleError } from '../../../utils'
import { baseURL, uatURL } from '../../../baseURL';
import { selectCamera1 } from '../../../uploadImageUtils';
import { NAME_REGEX, ACCOUNT_NUMBER_REGEX, IFSC_CODE_REGEX, NUMBER_REGEX, AADHAR_REGEX, NUMBER_REGEX1 } from '../../../validations ';
import { Button } from '../../components/Button/Button';
import { DottedProgressBar } from '../../components/DottedProgressBar/DottedProgressBar';
import { Header } from '../../components/Header/Header';
import { WaveBackground } from '../../components/WaveBackground/WaveBackground';
import * as colors from '../../constants/colors';
import { DOWN_ARROW, UP_ARROW,VERIFIED_TICK } from '../../constants/imgConsts';
import formatAmount from 'indian-currency-formatter';
import {
  ADDITIONAL_DETAILS_CONST,
  PERSONAL_DETAILS_CONST,
} from '../../constants/screenConst';
import { APP_FONTS, FONT_SIZE } from '../../constants/styleConfig';
import {
  deleteSelfie,
  getDropdownList,
  getQdeSectionDetails,
  savePersonaleDetails,
  getQDEDataAPI,
  createUpdateCUSTOMER,
  uploadSelfie,
  getLoanSummary,
  verifyBankAccNumber,
  ifscCode
} from '../../container/Personal Details';
import withSpinner from '../../HOC/withSpinner';
import PersonalDetailsStyles from './style';

var getIFSC = []
const FloatingLabelInputs = ({ value, ...rest }) => {
  const data = {
    ...rest,
  };
  if (value) {
    data.value = value;
  }
  return (
    <View style={{}}>
      <FloatingLabelInput {...data}
        containerStyles={PersonalDetailsStyles.inputStyle}
        customLabelStyles={{
          colorFocused: colors.COLOR_BLUE,
          colorBlurred: colors.COLOR_LIGHT_GREY,
          fontSizeFocused: 17,
          fontSizeBlurred: 17,
        }}
        inputStyles={PersonalDetailsStyles.inputTextPasswordStyle}
      />
      <View style={PersonalDetailsStyles.separatorStyle} />
      {rest.validForm[rest.label] && (
        <Text style={{ color: 'red', marginTop: 3, }}>{rest.validForm[rest.label]}</Text>
      )}
    </View>
  );
};

const DropDownPickers = (props) => {
  return (
    <View>
      <DropDownPicker
        containerStyle={{ flex: 1 }}
        style={{
          backgroundColor: '#ffffff',
          marginTop: 10,
          borderWidth: 0,
          borderBottomWidth: 2,
          borderColor: colors.COLOR_DARK_BLUE,
        }}
        itemStyle={{
          justifyContent: 'flex-start',
          marginLeft: 4,
        }}

        customArrowUp={() => <Image source={UP_ARROW} />}
        customArrowDown={() => <Image source={DOWN_ARROW} />}
        labelStyle={{
          color: colors.COLOR_LIGHT_GREY,
          fontFamily: APP_FONTS.NunitoRegular,
          fontSize: FONT_SIZE.l,
          marginLeft: -5,
        }}
        selectedLabelStyle={{
          color: colors.COLOR_COLOR_BLACK,
          fontFamily: APP_FONTS.NunitoRegular,
          fontSize: FONT_SIZE.l,
        }}
        {...props}
      />
      {props.validForm[props.placeholder] && (
        <Text style={{ color: 'red', marginTop: 3 }}>{props.validForm[props.placeholder]}</Text>
      )}
    </View>
  );
};

function PersonalDetails(props) {
  const {
    applicantUniqueId,
    iscoapplicant,
    isguarantor,
    ismainapplicant,
    coapplicantUniqueId,
    leadCode,
    leadName,
  } = props.navigation.state.params;
  const token = props?.userData?.token;
  const roleId = props?.userData?.userData?.data?.roleId;
  const dispatch = props?.dispatch;
  const [id, setId] = useState(null);
  const [validForm, setValidForm] = useState({});
  const [fatherName, setFathersName] = useState(null);
  const [motherName, setMothersName] = useState(null);
  const [maritalStatus, setMaratialStatus] = useState(null);
  const [spouseName, SetSpouseName] = useState(null);
  const [qualification, SetQualification] = useState(null);
  const [relationWithMainApplicant, SetRelationWithMainApplicant] = useState('');
  const [aadhaarNumber, SetaadhaarNumber] = useState('');
  const [aadhaarNumberDisable, SetaadhaarNumberDisable] = useState(true);
  const [netMonthlyIncome, SetnetMonthlyIncome] = useState('');
  const [netMonthlyObligations, SetnetMonthlyObligations] = useState('');
  const [annualGrossIncome, SetannualGrossIncome] = useState('');
  const [accountType, SetaccountType] = useState(null);
  const [accountNumber, SetaccountNumber] = useState(null);
  const [ifscNumber, SetifscNumber] = useState('');
  const [ifscNoValid, setifscNoValid] = useState(false);
  const [ifscValid, setifscValid] = useState(true);
  const [branch, setBranch] = useState('');
  const [bankName, SetbankName] = useState(null);
  const [filePath, setFilePath] = useState(null);
  const [nextButton, disableNextButton] = useState(true);
  const [dropdownList, setDropdownList] = useState({});
  const [isViewOnly, disableViewOnly] = useState(false);
  const [verified, setVerified] = useState(false);
  const [accountHolderName, setAccountHolderName] = useState('');

  const redirect = async () => {
    const QDEData = await getQDEDataAPI({
      applicant_uniqueid: iscoapplicant || isguarantor ? coapplicantUniqueId : applicantUniqueId,
      ismainapplicant: ismainapplicant,
      isguarantor: isguarantor,
      token,
      dispatch
    });

    if (iscoapplicant || isguarantor) {

      // const response = await createUpdateCUSTOMER({ applicant_uniqueid: coapplicantUniqueId, ismainapplicant: ismainapplicant, isguarantor: isguarantor, token, dispatch });
      // if (
      //   response &&
      //   response.data &&
      //   response.data.BRE &&
      //   response.data.BRE.toLowerCase() === 'System Rejected'
      // ) {
      //   this.props.navigation.navigate('LoanSummary', {
      //     leadCode: leadCode,
      //     mobileNumber: '',
      //     leadName: leadName,
      //     applicantUniqueId: iscoapplicant || isguarantor ? coapplicantUniqueId : applicantUniqueId,
      //   });
      // } else {
        // if (
        //   QDEData &&
        //   QDEData.scheme &&
        //   QDEData.scheme.scheme === 'Income Proof'
        // ) {
        //   props.navigation.navigate('BankDetails', {
        //     ...props.navigation.state.params
        //   });
        // } else {
          props.navigation.navigate('QdeSuccess', {
            leadName: leadName,
            cif: response.cif,
            leadCode: leadCode,
            applicantUniqueId: applicantUniqueId,
            iscoapplicant: iscoapplicant,
            isguarantor: isguarantor,
            coapplicantUniqueId: coapplicantUniqueId,
            redirection: 'qde',
            offerType: 'tentative',
          });
        // }
      // }
    } 
    else {
      props.navigation.navigate('LoanDetails', {
        ...props.navigation.state.params
      });
    }
  };


  const saveDetails = () => {
    Keyboard.dismiss();

    const obj = [
      { value: fatherName, label: PERSONAL_DETAILS_CONST.FATHERS_NAME },
      { value: motherName, label: PERSONAL_DETAILS_CONST.MOTHERS_NAME },
      { value: maritalStatus, label: PERSONAL_DETAILS_CONST.MARATIAL_STATUS },
      { value: qualification, label: PERSONAL_DETAILS_CONST.QUALIFICATION },
      { value: aadhaarNumber, label: PERSONAL_DETAILS_CONST.AADHAR_NUMBER },

      {
        value: annualGrossIncome,
        label: PERSONAL_DETAILS_CONST.ANNUAL_GROSS_INCOME,
      },
      {
        value: netMonthlyIncome,
        label: PERSONAL_DETAILS_CONST.NET_MONTHLY_INCOME,
      },
      {
        value: netMonthlyObligations,
        label: PERSONAL_DETAILS_CONST.NET_MONTHLY_OBLIGATIONS,
      },
      { value: accountType, label: PERSONAL_DETAILS_CONST.ACCOUNT_TYPE },
      { value: accountNumber, label: PERSONAL_DETAILS_CONST.ACC_NO },
      { value: ifscNumber, label: PERSONAL_DETAILS_CONST.IFSC_CODE },
      { value: bankName, label: PERSONAL_DETAILS_CONST.BANK_NAME },
      { value: accountHolderName, label: PERSONAL_DETAILS_CONST.ACC_HOLDER_NAME },

    ];



    if (iscoapplicant == true || isguarantor == true) {
      if (maritalStatus == 'Married')
        var obj1 = [
          ...obj,
          { value: spouseName, label: PERSONAL_DETAILS_CONST.SPOUSE_NAME },
          {
            value: relationWithMainApplicant,
            label: PERSONAL_DETAILS_CONST.RELATION_WITH_MAIN_APPLICANT,
          },
        ]
      else {
        var obj1 = [
          ...obj,
          {
            value: relationWithMainApplicant,
            label: PERSONAL_DETAILS_CONST.RELATION_WITH_MAIN_APPLICANT,
          },
        ]
      }
    }
    else {
      if (maritalStatus == 'Married')
        var obj2 = [
          ...obj,
          { value: spouseName, label: PERSONAL_DETAILS_CONST.SPOUSE_NAME },

        ]
      else {
        var obj2 = [
          ...obj,

        ]
      }
    }
    if (filePath === null || filePath === undefined) {
      handleError("Please upload selfie.")
      const isValid = validator(null, null, iscoapplicant == true || isguarantor == true ? obj1 : obj2);
    } else if (ifscValid == false) {
      handleError("Please enter valid IFSC code")
      const isValid = validator(null, null, iscoapplicant == true || isguarantor == true ? obj1 : obj2);
    }
    else {
      const isValid = validator(null, null, iscoapplicant == true || isguarantor == true ? obj1 : obj2);
      if (!isValid) {
        return;
      }

      const payload = {
        aadhaarNumber: aadhaarNumber.toString().replace(/ /g, ""),
        branch,
        accountNumber,
        accountType,
        annualGrossIncome: annualGrossIncome.toString().replace(/,/g, ""),
        'applicantUniqueId': iscoapplicant || isguarantor ? coapplicantUniqueId : applicantUniqueId,
        bankName,
        fatherName,
        id: id,
        ifscNumber,
        maritalStatus,
        motherName,
        accountHolderName,
        verified,
        netMonthlyIncome: netMonthlyIncome.toString().replace(/,/g, ""),
        netMonthlyObligations: netMonthlyObligations.toString().replace(/,/g, ""),
        qualification,
        token,
        dispatch,
        filePath: filePath,
      };
      if (iscoapplicant == true || isguarantor == true) {
        if (maritalStatus == 'Married')
          var payload1 = {
            ...payload,
            spouseName,
            relationWithMainApplicant,
          }
        else {
          var payload1 = {
            ...payload,
            relationWithMainApplicant,
          }
        }
      }
      else {
        if (maritalStatus == 'Married')
          var payload2 = {
            ...payload,
            spouseName,
          }
        else {
          var payload2 = {
            ...payload,
          }
        }
      }
      if (!response) {
        disableNextButton(false);
      }
      const response = savePersonaleDetails(iscoapplicant == true || isguarantor == true ? payload1 : payload2);

    }
  };

  useEffect(() => {
    isViewOnly == true ? SetaadhaarNumberDisable(false) : null
  }, [isViewOnly])


  useEffect(() => {
    const getData = async () => {
      const {
        qualificationList,
        martialStatus,
        relationWithMainApplicantList,
        bankAccountType,
      } = await getDropdownList({ token, dispatch });
      const dropdownList = {
        qualification: qualificationList.map((item) => {
          return { label: item.qualification, value: item.qualification };
        }),
        martialStatus: martialStatus.map((item) => {
          return { label: item.maritalStatus, value: item.maritalStatus };
        }),
        accountType: bankAccountType.map((item) => {
          return { label: item.bankAccountType, value: item.bankAccountType };
        }),
        relationWithMainApplicant: relationWithMainApplicantList.map((item) => {
          return {
            label: item.relationWithMinApplicant,
            value: item.relationWithMinApplicant,
          };
        }),
      };
      setDropdownList(dropdownList);
      const responseLoanSummary = await getLoanSummary({
        token,
        dispatch,
        applicant_uniqueid: applicantUniqueId,
        lead_code: leadCode,
        roleId: roleId
      });
      disableViewOnly(
        responseLoanSummary?.mainapplicant?.loanSchemeFreeze ? true :
        // responseLoanSummary?.mainapplicant?.loanAgreementFlag ? true : 
        responseLoanSummary?.modelAccess[0]?.read ? true :
         false )

      const response = await getQdeSectionDetails({
        token,
        dispatch,
        applicant_uniqueid: ismainapplicant ? applicantUniqueId : coapplicantUniqueId,
        ismainapplicant,
        isguarantor,
      });
      if (response?.additionalDetails?.kycaddresDetails?.aadharId) {
        aadharId = response.additionalDetails.kycaddresDetails.aadharId.toString().replace(/\d{4}(?=.)/g, '$& ')

        SetaadhaarNumberDisable(false)
        SetaadhaarNumber(aadharId);

      }

      // const responseIFSC = await ifscCode({
      //   token,
      //   dispatch,
      //   ifsc: response.personalDetails.ifscNumber
      // })
      // responseIFSC !== undefined ? setifscValid(true) : setifscValid(false)

      if (response?.personalDetails?.id) {
        var aadharId = null
        const {
          aadhaarNumber,
          accountNumber,
          accountType,
          annualGrossIncome,
          bankName,
          fatherName,
          id,
          ifscNumber,
          maritalStatus,
          motherName,
          netMonthlyIncome,
          netMonthlyObligations,
          qualification,
          relationWithMainApplicant,
          spouseName,
          filePath,
          verified,
          accountHolderName
        } = response.personalDetails;
        setId(id);
        setVerified(verified)
        SetRelationWithMainApplicant(relationWithMainApplicant == undefined ? '' : relationWithMainApplicant);
        setFathersName(fatherName);
        setMothersName(motherName);
        setMaratialStatus(maritalStatus);
        SetSpouseName(spouseName);
        SetQualification(qualification);
        setAccountHolderName(accountHolderName)
        SetannualGrossIncome(annualGrossIncome == undefined ? '' : formatAmount(annualGrossIncome));
        SetnetMonthlyIncome(netMonthlyIncome == undefined ? '' : formatAmount(netMonthlyIncome));
        SetnetMonthlyObligations(netMonthlyObligations == undefined ? '' : formatAmount(netMonthlyObligations));
        SetaccountType(accountType);
        SetaccountNumber(accountNumber);
        SetifscNumber(ifscNumber);
        SetbankName(bankName);
        setFilePath(filePath);
        disableNextButton(aadhaarNumber == undefined || filePath == undefined ? true : false);
        // aadhaarNumberDisable == true?
        // :null
        SetaadhaarNumber((response?.additionalDetails?.kycaddresDetails?.aadharId )? (response?.additionalDetails?.kycaddresDetails?.aadharId?.toString().replace(/\d{4}(?=.)/g, '$& ')) : (aadhaarNumber?.toString().replace(/\d{4}(?=.)/g, '$& ')))
      }
    };
    getData();
  }, []);


  const validator = (value, label, check = []) => {
    const validate = (e, type) => {
      const temp = { ...validForm };
      temp[type] = null;
      switch (type) {
        case PERSONAL_DETAILS_CONST.RELATION_WITH_MAIN_APPLICANT:
          SetRelationWithMainApplicant(e);
          if (e === null || e === '' || e === undefined) {
            temp[type] = PERSONAL_DETAILS_CONST.REQUIRED_RELATION;
          }
          break;

        case PERSONAL_DETAILS_CONST.ANNUAL_GROSS_INCOME:
          SetannualGrossIncome(e);
          if (e === null || e === '' || e === undefined)
            temp[type] = PERSONAL_DETAILS_CONST.REQUIRED_ANNUAL_GROSS_INCOME;
          if (!NUMBER_REGEX1.test(e)) {
            temp[type] = PERSONAL_DETAILS_CONST.INVALID_ANNUAL_GROSS_INCOME;
          }
          break;

        case PERSONAL_DETAILS_CONST.FATHERS_NAME:
          setFathersName(e);
          if (!NAME_REGEX.test(e))
            temp[type] = PERSONAL_DETAILS_CONST.INVALID_FATHERS_NAME;
          if (e === null || e === '' || e === undefined)
            temp[type] = PERSONAL_DETAILS_CONST.REQUIRED_FATHERS_NAME;
          break;

        case PERSONAL_DETAILS_CONST.QUALIFICATION:
          SetQualification(e);
          if (e === null || e === '' || e === undefined) {
            temp[type] = PERSONAL_DETAILS_CONST.REQUIRED_QUALIFICATION;
          }
          break;

        case PERSONAL_DETAILS_CONST.MOTHERS_NAME:
          setMothersName(e);
          if (!NAME_REGEX.test(e))
            temp[type] = PERSONAL_DETAILS_CONST.INVALID_MOTHERS_NAME;
          if (e === null || e === '' || e === undefined)
            temp[type] = PERSONAL_DETAILS_CONST.REQUIRED_MOTHERS_NAME;
          break;

        case PERSONAL_DETAILS_CONST.MARATIAL_STATUS:
          setMaratialStatus(e);
          if (e === null || e === '' || e === undefined)
            temp[type] = PERSONAL_DETAILS_CONST.REQUIRED_MARATIAL_STATUS;
          break;

        case PERSONAL_DETAILS_CONST.SPOUSE_NAME:
          SetSpouseName(e);
          if (!NAME_REGEX.test(e))
            temp[type] = PERSONAL_DETAILS_CONST.INVALID_SPOUSE_NAME;
          if (e === null || e === '' || e === undefined)
            temp[type] = PERSONAL_DETAILS_CONST.REQUIRED_SPOUSE_NAME;
          break;

        case PERSONAL_DETAILS_CONST.AADHAR_NUMBER:
          SetaadhaarNumber((e));
          if (e === null || e === '' || e === undefined) {
            temp[type] = PERSONAL_DETAILS_CONST.REQUIRED_AADHAR_NUMBER;
          }
          if (!AADHAR_REGEX.test((e))) {
            temp[type] = PERSONAL_DETAILS_CONST.INVALID_AADHAR_NUMBER;
          }
          if ((e)?.length !== 14) {
            temp[type] = PERSONAL_DETAILS_CONST.INVALID_AADHAR_NUMBER;
          }
          break;

        case PERSONAL_DETAILS_CONST.NET_MONTHLY_INCOME:
          SetnetMonthlyIncome(e);
          if (e === null || e === '' || e === undefined)
            temp[type] = PERSONAL_DETAILS_CONST.REQUIRED_NET_MONTHLY_INCOME;
          if (!NUMBER_REGEX1.test(e)) {
            temp[type] = PERSONAL_DETAILS_CONST.INVALID_NET_MONTHLY_INCOME;
          }
          break;

        case PERSONAL_DETAILS_CONST.NET_MONTHLY_OBLIGATIONS:
          SetnetMonthlyObligations(e);
          if (e === null || e === '' || e === undefined)
            temp[type] = PERSONAL_DETAILS_CONST.REEQUIRED_NET_MONTHLY_OBLIGATIONS;

          if (!NUMBER_REGEX1.test(e)) {
            temp[type] = PERSONAL_DETAILS_CONST.INVALID_NET_MONTHLY_OBLIGATIONS;
          }
          break;

        case PERSONAL_DETAILS_CONST.ACCOUNT_TYPE:
          SetaccountType(e);
          if (e === null || e === '' || e === undefined)
            temp[type] = PERSONAL_DETAILS_CONST.REQUIRED_ACCOUNT_TYPE;
          break;

        case PERSONAL_DETAILS_CONST.BANK_NAME:
          SetbankName(e);
          if (!NAME_REGEX.test(e))
            temp[type] = PERSONAL_DETAILS_CONST.INVALID_BANK_NAME;
          if (e === null || e === '' || e === undefined)
            temp[type] = PERSONAL_DETAILS_CONST.REQUIRED_BANK_NAME;
          break;

          case PERSONAL_DETAILS_CONST.ACC_HOLDER_NAME:
          setAccountHolderName(e);
          if (!NAME_REGEX.test(e))
            temp[type] = PERSONAL_DETAILS_CONST.INVALID_ACC_HOLDER_NAME;
          // if (e === null || e === '' || e === undefined)
          //   temp[type] = PERSONAL_DETAILS_CONST.REQUIRED_ACC_HOLDER_NAME;
          break;

        case PERSONAL_DETAILS_CONST.ACC_NO:
          SetaccountNumber(e);
          // setVerified(false)
          if (!ACCOUNT_NUMBER_REGEX.test(e))
            temp[type] = PERSONAL_DETAILS_CONST.INVALID_ACCOUNT_TYPE;
          if (e === null || e === '' || e === undefined)
            temp[type] = PERSONAL_DETAILS_CONST.REQUIRED_ACC_NO;
          break;

        case PERSONAL_DETAILS_CONST.IFSC_CODE:
          SetifscNumber(e)
          // IFSCCall(e)
          // setVerified(false)
          if (!IFSC_CODE_REGEX.test(e))
            temp[type] = PERSONAL_DETAILS_CONST.INVALID_IFSC_CODE;
          if (e === null || e === '' || e === undefined)
            temp[type] = PERSONAL_DETAILS_CONST.REQUIRED_IFSC_CODE;
            
          break;
      }

      return temp;
    };
    let isValid = true;
    if (check?.length) {
      let temp = {};
      check.forEach((item) => {
        const validData = validate(item.value, item.label);
        if (validData[item.label] !== null && validData[item.label] !== undefined && validData[item.label] !== '') {
          isValid = false;
        }
        temp = { ...temp, ...validData };
      });
      setValidForm(temp);
    } else {
      const validData = validate(value, label);
      if (validData.label !== null && validData.label !== '' && validData.label !== undefined) {
        isValid = false;
      }

      setValidForm(validData);
    }
    return isValid;
  };

// useEffect(()=>{
//   setVerified(false)
// },[ifscNumber || accountNumber])

  useEffect(() => {
    ifscNumber && ifscNumber?.length === 11 ? (
      SetifscNumber(ifscNumber.substring(0, 11).toUpperCase()
        // + ifscNumber.substring(4, 11)
      ),
      SetbankName(""),
      getIFSC = async () => {
        const responseIFSC = await ifscCode({
          token,
          dispatch,
          ifsc: ifscNumber.substring(0, 11).toUpperCase()
          // + ifscNumber.substring(4, 11)
        })
        responseIFSC?.bank ? SetbankName(responseIFSC?.bank) : null
        responseIFSC !== undefined ? setifscValid(true) : setifscValid(false)
        responseIFSC?.bank ? (SetbankName(responseIFSC?.bank), validator(responseIFSC?.bank, PERSONAL_DETAILS_CONST.BANK_NAME)) : (handleError("Please enter the valid IFSC code"))
        responseIFSC?.branch ? setBranch(responseIFSC?.branch) : setBranch("")
      },
      getIFSC()
    )
      : null
  }, [ifscNoValid && ifscNumber && ifscNumber?.length === 11])

  // const IFSCCall = (ifscNumber) =>{
  //   ifscNumber && ifscNumber.length === 11 ? (
  //     SetifscNumber(ifscNumber.substring(0, 11).toUpperCase()
  //       // + ifscNumber.substring(4, 11)
  //     ),
  //     SetbankName(""),
  //     getIFSC = async () => {
  //       const responseIFSC = await ifscCode({
  //         token,
  //         dispatch,
  //         ifsc: ifscNumber.substring(0, 11).toUpperCase()
  //         // + ifscNumber.substring(4, 11)
  //       })
  //       responseIFSC?.bank ? SetbankName(responseIFSC?.bank) : null
  //       responseIFSC !== undefined ? setifscValid(true) : setifscValid(false)
  //       responseIFSC?.bank ? (SetbankName(responseIFSC?.bank), validator(responseIFSC?.bank, PERSONAL_DETAILS_CONST.BANK_NAME)) : (handleError("Please enter the valid IFSC code"))
  //       responseIFSC?.branch ? setBranch(responseIFSC?.branch) : setBranch("")
  //     },
  //     getIFSC()
  //   )
  //     : null
  // }


  return (
    
    <WaveBackground>
      <StatusBar
        backgroundColor={colors.COLOR_WHITE}
        barStyle={'dark-content'}
        translucent={false}
        hidden={false}
      />
      <Header
        label={ADDITIONAL_DETAILS_CONST.HEADER}
        showLeftIcon={false}
        onPress={() => {
        }}
      />
      <View style={{ alignContent: 'center' }}>
        <View style={{}}>
          <DottedProgressBar totalSteps={iscoapplicant || isguarantor ? [1, 2, 3] : [1, 2, 3, 4, 5, 6]} currentIndex={3} />
        </View>
      </View>
      <View style={PersonalDetailsStyles.mainContainer}>
        <Text style={PersonalDetailsStyles.mainHeadingText}>Personal Details</Text>
        <ScrollView keyboardShouldPersistTaps="handled">
          <View style={PersonalDetailsStyles.cardContainer}>
            <View style={PersonalDetailsStyles.SelfieRow}>
              <Text style={PersonalDetailsStyles.lableStyle}>
                Upload Selfie
              </Text>
              <Button
                isDisabled={!!filePath}
                style={PersonalDetailsStyles.takePhotoButton}
                title={'Take a Photo'}
                onPress={() => {
                  if (!isViewOnly) {
                    selectCamera1(
                      async ({ imageData, callback }) => {
                        const response = await uploadSelfie({
                          token,
                          dispatch,
                          fileName: imageData.name,
                          filePath: imageData.path,
                          "applicantUniqueId": iscoapplicant || isguarantor ? coapplicantUniqueId : applicantUniqueId,
                          ismainapplicant,
                          isguarantor,
                          iscoapplicant,
                        });
                        if (response?.filePath) {

                          setFilePath(response?.filePath);
                        }
                      },
                      {},
                      () => { },
                    );
                  }
                }}
              />
            </View>
            {filePath && (
              <View style={PersonalDetailsStyles.PhotoRow}>
                <Image
                  style={PersonalDetailsStyles.PhotoRowSelfie}
                  source={{
                    uri: filePath.replace('/var/www/html', uatURL.URL),
                  }}
                />
                <TouchableOpacity
                  onPress={async (e) => {
                    if (!isViewOnly) {
                      const response = await deleteSelfie({
                        token,
                        dispatch,
                        "applicantUniqueId": iscoapplicant || isguarantor ? coapplicantUniqueId : applicantUniqueId,
                        ismainapplicant: true,
                        iscoapplicant: true,
                        isguarantor: true,
                      });
                      if (!response) {
                        setFilePath(null);
                        disableNextButton(true);
                      }
                    }
                  }}
                  style={PersonalDetailsStyles.closeIcon}>
                  <Icon name="closecircle" type="antdesign" color={'#5f5c60'} />
                </TouchableOpacity>
              </View>
            )}
            <View
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}>
              <View style={[PersonalDetailsStyles.Row, { marginTop: 10 }]}>
                {maritalStatus !== null && maritalStatus !== undefined && maritalStatus !== '' &&
                  <Text style={PersonalDetailsStyles.inputTextPasswordStyle}>{PERSONAL_DETAILS_CONST.MARATIAL_STATUS}</Text>}
                <DropDownPickers
                  validForm={validForm}
                  disabled={isViewOnly}
                  items={dropdownList.martialStatus}
                  placeholder={
                    maritalStatus == null || maritalStatus == undefined || maritalStatus == ''
                      ? PERSONAL_DETAILS_CONST.MARATIAL_STATUS
                      : maritalStatus
                  }
                  onChangeItem={(item) => setMaratialStatus(item.value)}
                />
              </View>
              <View style={PersonalDetailsStyles.Row}>
                <FloatingLabelInputs
                  editable={!isViewOnly}
                  value={fatherName}
                  validForm={validForm}
                  onChangeText={(e) => {
                    disableNextButton(true);
                    validator(e, PERSONAL_DETAILS_CONST.FATHERS_NAME)
                  }
                  }
                  label={PERSONAL_DETAILS_CONST.FATHERS_NAME}
                  maxLength={30}
                />
              </View>
              <View style={PersonalDetailsStyles.Row}>
                <FloatingLabelInputs
                  editable={!isViewOnly}
                  validForm={validForm}
                  value={motherName}
                  onChangeText={(e) =>{
                    disableNextButton(true);
                    validator(e, PERSONAL_DETAILS_CONST.MOTHERS_NAME)

                  }
                  }
                  label={PERSONAL_DETAILS_CONST.MOTHERS_NAME}
                  maxLength={30}
                />
              </View>

              {maritalStatus === 'Married' && (
                <View style={PersonalDetailsStyles.Row}>
                  <FloatingLabelInputs
                    editable={!isViewOnly}
                    validForm={validForm}
                    value={spouseName}
                    onChangeText={(e) =>{
                      disableNextButton(true);
                      validator(e, PERSONAL_DETAILS_CONST.SPOUSE_NAME)
                    }
                    }
                    label={PERSONAL_DETAILS_CONST.SPOUSE_NAME}
                    maxLength={30}
                  />
                </View>
              )}
              <View style={PersonalDetailsStyles.Row}>
                {qualification !== null && qualification !== undefined && qualification !== '' &&
                  <Text style={PersonalDetailsStyles.inputTextPasswordStyle}>{PERSONAL_DETAILS_CONST.QUALIFICATION}</Text>}
                <DropDownPickers
                  validForm={validForm}
                  disabled={isViewOnly}
                  items={dropdownList.qualification}
                  placeholder={
                    qualification == null || qualification == undefined || qualification == ''
                      ? PERSONAL_DETAILS_CONST.QUALIFICATION
                      : qualification
                  }
                  onChangeItem={(item) => SetQualification(item.value)}
                />
              </View>
              <View style={PersonalDetailsStyles.Row}>
                <FloatingLabelInputs
                  validForm={validForm}
                  editable={aadhaarNumberDisable}
                  value={aadhaarNumber}
                  mask="9999 9999 9999"
                  onChangeText={(e) => {
                    disableNextButton(true);
                    validator(e, PERSONAL_DETAILS_CONST.AADHAR_NUMBER)
                  }}
                  keyboardType={'number-pad'}
                  label={PERSONAL_DETAILS_CONST.AADHAR_NUMBER}
                  maxLength={14}
                />
              </View>
              {
                iscoapplicant === true || isguarantor == true ?
                  <View style={PersonalDetailsStyles.Row}>
                    {relationWithMainApplicant !== '' &&
                      <Text style={PersonalDetailsStyles.inputTextPasswordStyle}>{PERSONAL_DETAILS_CONST.RELATION_WITH_MAIN_APPLICANT}</Text>}
                    <DropDownPickers
                      validForm={validForm}
                      disabled={isViewOnly}
                      items={dropdownList.relationWithMainApplicant}
                      placeholder={
                        relationWithMainApplicant == ''
                          ? PERSONAL_DETAILS_CONST.RELATION_WITH_MAIN_APPLICANT
                          : relationWithMainApplicant
                      }
                      onChangeItem={(item) =>{
                        disableNextButton(true);
                        validator(item.value, PERSONAL_DETAILS_CONST.RELATION_WITH_MAIN_APPLICANT)
                      }
                      }
                    />
                  </View>
                  : null
              }
              <View style={[PersonalDetailsStyles.Row,]}>

                <FloatingLabelInputs
                  editable={!isViewOnly}
                  validForm={validForm}
                  value={annualGrossIncome === '' ? '' : annualGrossIncome.toString()}
                  keyboardType={'number-pad'}
                  currencyDivider={','}
                  maskType='currency'
                  onChangeText={(e) =>{
                    disableNextButton(true);
                    validator(e, PERSONAL_DETAILS_CONST.ANNUAL_GROSS_INCOME)
                  }
                  }
                  label={PERSONAL_DETAILS_CONST.ANNUAL_GROSS_INCOME}
                  maxLength={30}
                />
              </View>
              <View style={PersonalDetailsStyles.Row}>
                <FloatingLabelInputs
                  editable={!isViewOnly}
                  validForm={validForm}
                  value={netMonthlyIncome === '' ? '' : netMonthlyIncome.toString()}
                  currencyDivider={','}
                  maskType='currency'
                  keyboardType={'number-pad'}
                  onChangeText={(e) => {
                    disableNextButton(true);
                    validator(e, PERSONAL_DETAILS_CONST.NET_MONTHLY_INCOME)
                  }
                  }
                  label={PERSONAL_DETAILS_CONST.NET_MONTHLY_INCOME}
                  maxLength={30}
                />
              </View>
              <View style={PersonalDetailsStyles.Row}>
                <FloatingLabelInputs
                  editable={!isViewOnly}
                  validForm={validForm}
                  value={netMonthlyObligations === '' ? '' : netMonthlyObligations.toString()}
                  keyboardType={'number-pad'}
                  currencyDivider={','}
                  maskType='currency'
                  onChangeText={(e) =>{
                    validator(e, PERSONAL_DETAILS_CONST.NET_MONTHLY_OBLIGATIONS)
                    disableNextButton(true);
                  }
                  }
                  label={PERSONAL_DETAILS_CONST.NET_MONTHLY_OBLIGATIONS}
                  maxLength={30}
                />
              </View>
              {/* ===========================Bank Details===================== */}
              <View style={PersonalDetailsStyles.Row}>
                <Text style={[PersonalDetailsStyles.lableStyle, { marginTop: 15 }]}>
                  Bank Details
                </Text>
              </View>
              <View style={[PersonalDetailsStyles.Row, { marginTop: -15 }]}>
                {accountType !== null && accountType !== undefined && accountType !== '' &&
                  <Text style={PersonalDetailsStyles.inputTextPasswordStyle}>{PERSONAL_DETAILS_CONST.ACCOUNT_TYPE}</Text>}
                <DropDownPickers
                  validForm={validForm}
                  disabled={verified ? true :isViewOnly}
                  items={dropdownList.accountType}
                  placeholder={
                    accountType == null || accountType == undefined || accountType == ''
                      ? PERSONAL_DETAILS_CONST.ACCOUNT_TYPE
                      : accountType
                  }
                  onChangeItem={(item) =>
                    validator(item.value, PERSONAL_DETAILS_CONST.ACCOUNT_TYPE)
                  }
                />
              </View>
              
              <View style={PersonalDetailsStyles.Row}>
                <FloatingLabelInputs
                  editable={verified ? false : !isViewOnly}
                  validForm={validForm}
                  keyboardType={'number-pad'}
                  value={accountNumber != null ? accountNumber: null }
                  onChangeText={(e) =>{
                    setVerified(false)
                    disableNextButton(true);
                    setAccountHolderName('')
                    validator(e, PERSONAL_DETAILS_CONST.ACC_NO)
                  }
                  }
                  label={PERSONAL_DETAILS_CONST.ACC_NO}
                  maxLength={16}
                />
              </View>
              
              <View style={PersonalDetailsStyles.Row}>
                <FloatingLabelInputs
                  editable={verified ? false : !isViewOnly}
                  validForm={validForm}
                  value={ifscNumber}
                  onChangeText={(e) =>{
                    setifscNoValid(true)
                    setVerified(false)
                    disableNextButton(true);
                    setAccountHolderName('')
                    validator(e, PERSONAL_DETAILS_CONST.IFSC_CODE)
                  }
                  }
                  label={PERSONAL_DETAILS_CONST.IFSC_CODE}
                  maxLength={11}
                />
              </View>
              {verified ?
                    <View
                        style={[
                            // flexRowStyle,
                            {flexDirection: "row", alignSelf: 'center', marginLeft: 20 },
                        ]}>
                        <Image
                            source={VERIFIED_TICK}
                            resizeMode="contain"
                            style={{height: 25,
                              width: 25,
                              marginRight: 5}}
                        />
                        <Text style={{
                                  fontFamily: APP_FONTS.NunitoBold,
                                  fontSize: FONT_SIZE.l,
                                  color: colors.COLOR_GREEN,
                        }}>
                            {"Verified"}
                        </Text>
                    </View>
                    :
                    <View style={{ width: '50%',alignSelf: 'center', marginTop: 10 }}>
                        {accountNumber != "" && ifscNumber != "" && accountNumber != null && ifscNumber != null ?
                        <Button
                            isDisabled={isViewOnly}
                            title={"Verify"}
                            onPress={async() => {
                                if (
                                  accountNumber != "" && accountNumber != null && 
                                  ifscNumber != "" && ifscNumber != null ) {
                                    const dataToAPI = {
                                        applicantUniqueId: applicantUniqueId,
                                        accountNumber: accountNumber,
                                        ifscNumber: ifscNumber,
                                        type: "personal"
                                    };
                                      const response = await verifyBankAccNumber({ applicantUniqueId: applicantUniqueId, accountNumber: accountNumber, ifscNumber: ifscNumber, type: "personal", token, dispatch });
                                      response?.accountHolderName != undefined ? setVerified(true) : null
                                      response?.accountHolderName != undefined ? setAccountHolderName(response.accountHolderName) : null
                                    // this.props.verifyBankAccoutNumber({
                                    //     dataToAPI,
                                    //     callback: (response) => {
                                    //         this.setState({ isVerified: true, accountHolderName: response.data.accountHolderName });
                                    //     },
                                    // })
                                }
                            }}
                        />
                        :null}
                    </View>
                }

              <View style={PersonalDetailsStyles.Row}>
                <FloatingLabelInputs
                  editable={verified ? false : !isViewOnly}
                  validForm={validForm}
                  value={bankName}
                  onChangeText={(e) =>{
                    disableNextButton(true);
                    validator(e, PERSONAL_DETAILS_CONST.BANK_NAME)
                  }
                  }
                  label={PERSONAL_DETAILS_CONST.BANK_NAME}
                  maxLength={30}
                />
              </View>
              <View style={PersonalDetailsStyles.Row}>
                <FloatingLabelInputs
                  editable={verified ? false : !isViewOnly}
                  validForm={validForm}
                  value={accountHolderName}
                  onChangeText={(e) =>{
                    disableNextButton(true);
                    validator(e, PERSONAL_DETAILS_CONST.ACC_HOLDER_NAME)
                  }
                  }
                  label={PERSONAL_DETAILS_CONST.ACC_HOLDER_NAME}
                  maxLength={30}
                />
              </View>
              <View style={{ flexDirection: 'row', alignSelf: 'center', }}>
                <View style={PersonalDetailsStyles.ButtonRow}>
                  <Button
                    isDisabled={isViewOnly}
                    style={PersonalDetailsStyles.takePhotoButton}
                    title={'Save'}
                    onPress={saveDetails}
                  />
                </View>
                <View style={PersonalDetailsStyles.ButtonRow1}>
                  <Button
                    isDisabled={
                      // iscoapplicant || isguarantor ? false :
                       nextButton}
                    style={PersonalDetailsStyles.takePhotoButton}
                    title={'Next'}
                    onPress={redirect}
                  />
                </View>
              </View>

            </View>
            <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
              <View style={{ width: '45%', marginVertical: 10 }}>
                <Button
                  title={'Loan Summary'}
                  //isDisabled={!mainAppliantSummary === true}
                  onPress={() => {
                    props.navigation.navigate('LoanSummary', {
                      ...props.navigation.state.params
                    });
                  }}
                />
              </View>
              <View style={{ width: '45%', marginLeft: 10, marginVertical: 10 }}>
                {/* <View style={{ flex: 1, marginLeft: 10 }}> */}
                <Button
                  title={"Cancel"}
                  onPress={() => {
                    props.navigation.navigate('LeadList');
                  }}
                />
                {/* </View> */}
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </WaveBackground>
  );
}

const mapDispatchToProps = {};
const mapStateToProps = (state) => {
  return { userData: state.userData };

};

const container = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withSpinner(),
);

export default compose(container)(PersonalDetails);