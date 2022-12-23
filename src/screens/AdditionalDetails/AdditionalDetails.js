import moment from 'moment';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
  Image,
  Platform,
  StatusBar,
  Text,
  BackHandler,
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native';
import Autocomplete from 'react-native-autocomplete-input';
import CheckBox from '@react-native-community/checkbox'
import { DatePickerDialog } from 'react-native-datepicker-dialog';
import { RadioButton } from '../../components/RadioButton/RadioButton';
import DropDownPicker from 'react-native-dropdown-picker';
import { Icon, Tooltip } from 'react-native-elements';
import { FloatingLabelInput } from 'react-native-floating-label-input';
import RNFS from 'react-native-fs';
import { ScrollView } from 'react-native-gesture-handler';
import { zip } from 'react-native-zip-archive';
import { compose, withProps } from 'recompose';
import { baseURL, uatURL } from '../../../baseURL';
import { selectPDF1, zipFileDisbursementUpload, uploadDocument } from '../../../uploadImageUtils';
import { MOBILE_NUMBER_REGEX, NUMBER_REGEX, CONSUMER_NO_REGEX, PINCODE_REGEX, NAME_REGEX, AADHAR_REGEX, TELEPHONE_REGEX, PASSPORT_REGEX, DLNO_REGEX, EPICNO_REGEX } from '../../../validations ';
import { Button } from '../../components/Button/Button';
import { DottedProgressBar } from '../../components/DottedProgressBar/DottedProgressBar';
import { Header } from '../../components/Header/Header';
import { WaveBackground } from '../../components/WaveBackground/WaveBackground';
import * as colors from '../../constants/colors';
import { PANAndGSTVerificationStyles } from '../PANAndGSTVerification/PANAndGSTVerificationStyles';
import {
  BLUE_PLUS_ICON,
  DOWN_ARROW,
  MINUS_ICON,
  UP_ARROW,
  VERIFIED_TICK,
} from '../../constants/imgConsts';
import { ADDITIONAL_DETAILS_CONST } from '../../constants/screenConst';
import { FONT_SIZE, APP_FONTS } from '../../constants/styleConfig'
import container from '../../container/AdditionalDetails/index';
import { AdditionalDetailsStyles } from './AdditionalDetailsStyles';
import { handleError, handleSuccess, handleWarning } from '../../../utils';

class AdditionalDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      additionalOptions: [
        {
          registeredAddress: [
            { residentialAddressCollapsed: false },
            { addUtilityBillsCollapsed: true },
          ],
        },
      ],
      pangstDocType: '',
      kycData: false,
      utilityBillData: false,
      permanantAddressData: false,
      permanantResiAddressData: false,
      employmentData: false,
      officeData: false,
      contactData: false,
      addressLine1: {
        value: '',
      },
      addressLine2: {
        value: '',
      },
      landmark1: {
        value: '',
      },
      landmark2: {
        value: '',
      },
      pincode: {
        value: '',
        isValid: true,
      },
      sourceType: [
        // {
        //   title: 'Director',
        //   isSelected: false,
        // },
        {
          title: 'Partner',
          isSelected: false,
        },
        {
          title: 'Proprietor',
          isSelected: false,
        },
        // {
        //   title: 'Authorized Signatory',
        //   isSelected: false,
        // },
        // {
        //   title: 'Other',
        //   isSelected: false,
        // },
      ],
      utilityBillAuthResponseStatus: false,
      selectedSourceType: '',
      radioOther: '',
      city: '',
      state: '',
      cityVerified: true,
      stateVerified: true,
      year: '',
      selectedMonth: {
        value: null,
        label: null,
      },
      dropDownResidentType: [],
      dropdownKyc: [
        { "id": 1, "label": "Owned", "value": "Owned" },
        { "id": 2, "label": "Rented", "value": "Rented" },
        { "id": 3, "label": "Staying with Relatives", "value": "Staying with Relatives" },
        { "id": 4, "label": "PG", "value": "PG" },
        { "id": 5, "label": "Corporate Provided", "value": "Corporate Provided" }
      ],
      dropDownResidentType1: [
        { value: 'Owned', label: 'Owned' },
        { value: 'Rented', label: 'Rented' }
      ],
      dropdownServiceProvider: [
        { "id": 1, "label": "Adani Gas Limited(AG)", "value": "AG", },
        { "id": 2, "label": "Indraprastha Gas Limited(IG)", "value": "IG" },
        { "id": 3, "label": "Mahanagar Gas Limited(MG)", "value": "MG" },
      ],
      selectedResidentType: {
        value: null,
        label: null,
      },
      selectedOfficeType: {
        value: null,
        label: null,
      },
      selectedDocType: 'adhar',
      adharID: '',
      adharIdValid: true,
      addharName: '',
      adharNameValid: true,
      fileNumber: '',
      fileNumberValid: true,
      dateOfBirth: null,
      dateOfBirthText: '',
      dlNo: '',
      dlNoValid: true,
      lpgValid: true,
      selectedUtilityBill: '',
      serviceProvider: {
        value: null,
        label: null,
        code: null
      },
      consumerNumber: '',
      consumerNumberValid: true,
      cityNameUtility: '',
      landlineNumber: '',
      stdCode: '',

      utilityServiceProvider: {
        value: null,
        label: null,
      },
      utilityEpicNo: '',
      utilityEpicNoValid: true,
      utilityFileNumber: '',
      utilityFileNumberValid: true,
      utilityDateOfBirth: null,
      utilityDateOfBirthText: '',
      utilityDlNo: '',
      utilityDlNoValid: true,
      utilityCity: '',
      utilityCityValid: true,
      utilityTelephoneNo: '',
      utilityTelephoneNoValid: true,

      additionalDetailOptions: {
        registeredCollapsed: false,
        permanentAddressCollapsed: true,
        permanentResidenceAddrCollapsed: true,
        employementDetailsCollapsed: true,
        officeAddressCollapsed: true,
        additionalContactCollapsed: true,
      },

      dropDownMonth: [
        { value: 0, label: '0' },
        { value: 1, label: '1' },
        { value: 2, label: '2' },
        { value: 3, label: '3' },
        { value: 4, label: '4' },
        { value: 5, label: '5' },
        { value: 6, label: '6' },
        { value: 7, label: '7' },
        { value: 8, label: '8' },
        { value: 9, label: '9' },
        { value: 10, label: '10' },
        { value: 11, label: '11' },
      ],
      imageData: {
        front: {
          uri: '',
          data: '',
        },
        back: {
          uri: '',
          data: '',
        },
      },
      imageDataUtility: {
        front: {
          uri: '',
          data: '',
        },
        back: {
          uri: '',
          data: '',
        },
      },
      imageDataPermanent: {
        front: {
          uri: '',
          data: '',
        }
      },
      imageDataCurrent: {
        front: {
          uri: '',
          data: '',
        },
        back: {
          uri: '',
          data: '',
        },
      },
      utilityAddressType: {
        value: '',
        isValid: null,
      },
      utilityAddressLine1: {
        value: '',
      },
      utilityLandmark1: {
        value: '',
      },
      utilityLandmark2: {
        value: '',
      },
      utilityAddressLine2: {
        value: '',
      },
      utilityPincode: {
        value: '',
        isValid: true,
      },
      utilityCity: '',
      utilityState: '',
      utilityCityVerified: true,
      utilityStateVerified: true,
      residenceFlag: false,
      utilitySelectedResidentType: {
        value: null,
        label: null,
      },
      leadCode:
        (this.props.navigation &&
          this.props.navigation.state &&
          this.props.navigation.state.params &&
          this.props.navigation.state.params.leadCode) ||
        (this.props.newLeadDataSelector &&
          this.props.newLeadDataSelector.newLead &&
          this.props.newLeadDataSelector.newLead.leadCode) ||
        '',
      leadName:
        (this.props.navigation &&
          this.props.navigation.state &&
          this.props.navigation.state.params &&
          this.props.navigation.state.params.leadName) ||
        (this.props.newLeadDataSelector &&
          this.props.newLeadDataSelector.newLead &&
          this.props.newLeadDataSelector.newLead.leadName) ||
        '',
      applicantUniqueId:
        (this.props.navigation &&
          this.props.navigation.state &&
          this.props.navigation.state.params &&
          this.props.navigation.state.params.applicantUniqueId) ||
        (this.props.newLeadDataSelector &&
          this.props.newLeadDataSelector.newLead &&
          this.props.newLeadDataSelector.newLead.applicantUniqueId) ||
        '',
      mobileNumberFromProps:
        (this.props.navigation &&
          this.props.navigation.state &&
          this.props.navigation.state.params &&
          this.props.navigation.state.params.mobileNumber) ||
        '',
      epicNo: '',
      epicNoValid: true,
      isSelected: false,
      isSelected1: false,
      imageDataPermanent: {
        front: {
          uri: '',
          data: '',
        },
        back: {
          uri: '',
          data: '',
        }
      },
      permanentAddress1: {
        value: '',
      },
      permanentAddress2: {
        value: '',
      },
      permanentLandmark1: {
        value: '',
      },
      permanentLandmark2: {
        value: '',
      },
      permanentPincode: {
        value: '',
        isValid: true,
      },
      permanentCity: '',
      permanentState: '',
      permanentCityVerified: true,
      permanentStateVerified: true,
      permanentYear: '',
      permanentMonth: {
        value: null,
        label: null,
      },
      residenceType: {
        value: null,
        label: null,
      },
      permanentVisible: false,
      sameAsKycAddress: false,
      permanentResAddr1: {
        value: '',
      },
      permanentResAddr2: {
        value: '',
      },
      permanentResLandmark1: {
        value: '',
      },
      permanentResLandmark2: {
        value: '',
      },
      permanentResPincode: {
        value: '',
        isValid: true,
      },
      permanentResCity: '',
      permanentResState: '',
      permanentResCityVerified: true,
      permanentResStateVerified: true,
      permanentResYear: '',
      permanentResMonth: {
        value: null,
        label: null,
      },
      permanentResidenceType: {
        value: null,
        label: null,
      },
      officeYear: '',
      officeMonth: {
        value: null,
        label: null,
      },
      companyName: '',
      otherIndustry: '',
      empEmail: {
        value: '',
        isValid: true,
      },
      employmentCity: '',
      employmentState: '',
      professionList: [],
      subCategoryList: [],
      designationList: [],
      companyTypeList: [],
      companyList: [],
      industryList: [],
      query: '',
      selectedCompanyName: '',
      selectedProfession: {
        value: null,
        label: null,
      },
      selectedsubCategory: {
        value: null,
        label: null,
      },
      selectedDesignation: {
        value: null,
        label: null,
      },
      selectedIndustry: {
        value: null,
        label: null,
      },
      selectedCompanyType: {
        value: null,
        label: null,
      },
      isFirstJob: {
        value: null,
        // isValid: true,
      },
      empMonth: {
        value: null,
        label: null,
      },
      empYear: '',
      jobMonth: {
        value: null,
        label: null,
      },
      jobYear: '',
      firstJob: false,
      empAddress1: {
        value: '',
      },
      empAddress2: {
        value: '',
      },
      empLandmark1: {
        value: '',
      },
      empLandmark2: {
        value: '',
      },
      empPincode: {
        value: '',
        isValid: true,
      },
      empCity: '',
      empState: '',
      empCityVerified: true,
      empStateVerified: true,
      selectedEmpType: {
        value: null,
        label: null,
      },

      officeAddress1: {
        value: '',
      },
      officeAddress2: {
        value: '',
      },
      officeLandmark1: {
        value: '',
      },
      officeLandmark2: {
        value: '',
      },
      officePincode: {
        value: '',
        isValid: true,
      },
      empAddYear: '',
      empAddMonth: {
        value: null,
        label: null,
      },
      officeCity: '',
      officeState: '',
      officeCityVerified: true,
      officeStateVerified: true,
      mobileNumber: {
        value: '',
        isValid: true,
      },
      dateOfBirthDL: '',
      dateOfBirthDLText: '',
      lpgID: '',
      cityList: [],
      kycDocList: [],
      selectedOtherDoc: {
        value: null,
        label: null
      },
      utilityDocList: [
        { "id": 1, "label": "Aadhar + voter id", "value": "Aadhar + voter id" },
        { "id": 2, "label": "Aadhar + Driving Licence", "value": "Aadhar + Driving Licence" },
        { "id": 3, "label": "Pipeline gas receipt", "value": "Pipeline gas receipt" },
        { "id": 4, "label": "Passport", "value": "Passport" },
        { "id": 5, "label": "Postpaid bill", "value": "Postpaid bill" },
        { "id": 6, "label": "Landline bill", "value": "Landline bill" },
        { "id": 7, "label": "Aadhar + Banking", "value": "Aadhar + Banking" },
        { "id": 8, "label": "Mobile Bill", "value": "Mobile Bill" },
      ],
      selectedUtilityDoc: {
        value: null,
        label: null,
      },
      serviceProviderList: [],
      isPermanentAddressSaved: false,
      isEmployDetailsSaved: false,
      isOfficeAddressSaved: false,
      isAdditionalContactSaved: false,
      dlVerified: false,
      voterVerified: false,
      isUtiltiySaved: false,
      kycDocDetailSaved: false,
      idToEditKYCData: null,
      idToEditUtilityData: null,
      idToEditPermanentAddress: null,
      idToEditPermResAddress: null,
      idToEditEmployDetails: null,
      idToEditOfficeAddress: null,
      idToEditEmpDetails: null,
      idToEditAdditionalContact: null,
      cancelButtonTitle: 'Cancel',
      ismainapplicant: this.props.navigation.state.params.ismainapplicant,
      iscoapplicant: this.props.navigation.state.params.iscoapplicant || false,
      isguarantor: this.props.navigation.state.params.isguarantor || false,
      coapplicantUniqueId:
        this.props.navigation.state.params.coapplicantUniqueId || '',
      isViewOnly: false,
      kycFreeze: false,
      deleteflag: true,
      indSelfSoleFlag: false,
      gstNumber: '',
      gstAddress: {},
      gstAddressFlag: false,
      panDOB: ''
    };
    this.controller;
    this.controllerKYC;

  }
  selectRadioButton(value, index) {
    this.setState({ selectedSourceType: value.title });
  }

  backAction = () => {
    if (this.props.navigation && this.props.navigation.navigate) {
      this.props.navigation.navigate('PANAndGSTVerification');
      return true;
    }
    return false;
  };

  //   componentWillUnmount() {
  //     if (this.focusListener != null && this.focusListener.remove) {
  //         this.focusListener.remove();
  //     }
  //     BackHandler.removeEventListener("hardwareBackPress", this.backAction);
  // }

  // changes reeeeee


  handleCompanyList = (value) => {
    this.setState({
      query: value
    }, () => {
      value.length > 2 ?
        this.props.getCompanyList({
          dataToAPI: {
            companyName: value
          },
          callback: (response) => {
            this.setState({ companyList: response.data || [] });
          },
        }) : null
    })

  }

  apiCall = () => {
    this.focusListener = this.props.navigation.addListener('didFocus', () => {
      const dataToAPI = {
        applicant_uniqueid: this.state.applicantUniqueId,
        lead_code: this.state.leadCode,
        roleId: this.props.userDataSelector.userData.data.roleId
      };

      const dataToAPIS = {
        applicantUniqueId: this.state.applicantUniqueId,
      }
      this.props.getResidenceType({
        callback: (response) => {
          const dataForDropdown = response.data.indirestype.map((value) =>
          ({
            value: value.residenceType,
            label: value.residenceType,
            id: value.id,
          }));
          this.setState({ dropDownResidentType: dataForDropdown || [] });
        },
      });

      this.props.getCityList({
        callback: (response) => {
          const cityDropdown = response.data.map((value) => ({
            value: value.id,
            label: value.cityname,
          }));
          this.setState({ cityList: cityDropdown || [] });
        },
      });

      this.props.getKYCDoc({
        callback: (response) => {
          const kycDoc = response.data.map((value) => ({
            value: value.kycdoclist,
            label: value.kycdoclist,
          }));
          this.setState({ kycDocList: kycDoc || [] });
        },
      });

      this.props.getProfession({
        callback: (response) => {
          const profession = response.data.map((value) => ({
            value: value.profession,
            label: value.profession,
          }));
          this.setState({ professionList: profession || [] });
        },
      });

      // this.props.getUtilityDoc({
      //   callback: (response) => {
      //     const utilityDoc =
      //       // response.data.map((value) => ({
      //       //   value: value.billType,
      //       //   label: value.billType,
      //       //   id: value.id,
      //       // }));

      //       [
      //         { "id": 1, "label": "Aadhar + voter id", "value": "Aadhar + voter id" },
      //         { "id": 2, "label": "Aadhar + Driving Licence", "value": "Aadhar + Driving Licence" },
      //         { "id": 3, "label": "Pipeline gas receipt", "value": "Pipeline gas receipt" },
      //         { "id": 4, "label": "Passport", "value": "Passport" },
      //         { "id": 5, "label": "Postpaid bill", "value": "Postpaid bill" },
      //         { "id": 6, "label": "Landline bill", "value": "Landline bill" },
      //         { "id": 7, "label": "Aadhar + Banking", "value": "Aadhar + Banking" },
      //         { "id": 8, "label": "Mobile Bill", "value": "Mobile Bill" },
      //       ]

      //     this.setState({ utilityDocList: utilityDoc || [] });
      //   },
      // });


      this.props.getServiceProvider({
        dataToAPIS,
        callback: (response) => {

          const serviceProvider = response?.data == '' ? [] : response?.data?.map((value) => ({
            value: value.electricProvider,
            label: value.electricProvider,
            code: value.code,
            id: value.id
          }));
          this.setState({ serviceProviderList: serviceProvider || [] });
        },
      });

      // this.props.getDesignation({
      //   callback: (response) => {
      //     const designation = response.data.map((value) => ({
      //       value: value.designation,
      //       label: value.designation,
      //       id: value.id,
      //     }));
      //     this.setState({ designationList: designation || [] });
      //   },
      // });

      this.props.getCompanyType({
        callback: (response) => {
          const companyType = response.data.map((value) => ({
            value: value.employmentConstitution,
            label: value.employmentConstitution,
            id: value.id,
          }));
          this.setState({ companyTypeList: companyType || [] });
        },
      });

      this.props.getIndustry({
        callback: (response) => {
          const industry = response.data.map((value) => ({
            value: value.employmentIndustry,
            label: value.employmentIndustry,
            id: value.id,
          }));
          this.setState({ industryList: industry || [] });
        },
      });

      setTimeout(() => {
        const dataForgetQDE = {
          applicant_uniqueid:
            this.props.navigation.state.params.iscoapplicant || this.props.navigation.state.params.isguarantor
              ? this.props.navigation.state.params.coapplicantUniqueId
              : this.props.navigation.state.params.applicantUniqueId,
          ismainapplicant: this.props.navigation.state.params.ismainapplicant,
          isguarantor: this.props.navigation.state.params.isguarantor,
        };
        this.props.getQDEData({
          dataForgetQDE,
          callback: (response) => {
            this.setState({
              pangstDocType: this?.props?.userQDEDataSelector?.pangstdetails?.documentType,
              selectedSourceType: response?.pangstdetails?.entity == "Sole Proprietory Firm" ? "Proprietor" : "Partner",

            })
            this.setState({
              indSelfSoleFlag: response?.indSelfSoleFlag || false,
              permanentVisible: response?.actualPermanentAddDetailsFlag || false,
            })
            if (response?.indSelfSoleFlag && response?.pangstdetails?.gst) {
              this.props.gstADDRAPI({
                dataToAPI: {
                  gst: response?.pangstdetails?.gst
                },
                callback: (response) => {
                  this.setState({
                    gstAddress: response?.data,

                  })
                  if (!this.state.gstAddressFlag) {
                    this.getDataFromPincode(response?.data?.pincode, 'fromOfficeAddress')
                    handleSuccess('GST Address fetched sucessfully')
                    this.setState({
                      officeAddress1: {
                        value: response?.data?.addressLine1,
                      },
                      officeAddress2: {
                        value: response?.data?.addressLine2,
                      },
                      officePincode: {
                        value: response?.data?.pincode,
                        isValid: true,
                      },
                    })
                  }
                }
              })
            }
            if (
              this.props.userQDEDataSelector &&
              this.props.userQDEDataSelector.additionalDetails &&
              this.props.userQDEDataSelector.additionalDetails.kycaddresDetails
            ) {
              const additionalDetailsData = this.props.userQDEDataSelector.additionalDetails;
              const pangstdetails = this.props.userQDEDataSelector.pangstdetails;
              const actualPermanentAddDetails = this.props.userQDEDataSelector.actualPermanentAddDetails || ''

              this.setState({
                cancelButtonTitle: additionalDetailsData.kycaddresDetails.address1 !== undefined ? 'Loan Summary' : 'Cancel',
                leadCode: this.props.userQDEDataSelector.leadCode || this.state.leadCode,
                panDOB: pangstdetails?.dateOfBirth || ''
                //applicantUniqueId: this.props.userQDEDataSelector.applicantUniqueId,
              });
              this.props.getLoanSummary({
                dataToAPI,
                callback: (response) => {

                  this.setState({
                    isViewOnly:
                      response?.mainapplicant?.loanSchemeFreeze ? true :
                        response?.mainapplicant?.dedupeStatus ? true :
                          response?.mainapplicant?.bureauStatus ? true :
                            // response?.mainapplicant?.loanAgreementFlag ? true :
                            response?.modelAccess[0]?.read ? true :
                              false,
                    kycFreeze:
                      response?.mainapplicant?.kycFreeze ? true :
                        response?.mainapplicant?.dedupeStatus ? true :
                          response?.mainapplicant?.bureauStatus ? true :
                            // response?.mainapplicant?.loanAgreementFlag ? true :
                            response?.modelAccess[0]?.read ? true :
                              false,
                  }, () => {
                    if (additionalDetailsData.kycaddresDetails) {
                      const { imageData } = this.state;
                      if (additionalDetailsData?.kycaddresDetails?.filePath) {
                        (additionalDetailsData?.kycaddresDetails?.filePath || []).forEach(
                          (item) => {
                            const { filePath, docType } = item;
                            if (docType.toLowerCase().includes('front') || docType.toLowerCase().includes('other')) {
                              imageData.front.uri = this.state.kycFreeze ? filePath.replace('/var/www/html', uatURL.URL) :
                                pangstdetails?.documentType == 'form60' && additionalDetailsData.kycaddresDetails.identityProofType === 'aadhar' ? filePath.replace('/var/www/html', uatURL.URL) :
                                  pangstdetails?.documentType == 'pan' ? filePath.replace('/var/www/html', uatURL.URL) : ''
                            } else if (docType.toLowerCase().includes('back')) {
                              imageData.back.uri = this.state.kycFreeze ? filePath.replace('/var/www/html', uatURL.URL) :
                                pangstdetails?.documentType == 'form60' && additionalDetailsData.kycaddresDetails.identityProofType === 'aadhar' ? filePath.replace('/var/www/html', uatURL.URL) :
                                  pangstdetails?.documentType == 'pan' ? filePath.replace('/var/www/html', uatURL.URL) : ''
                            }
                          },
                        );
                      }
                      this.setState({
                        imageData,
                        // selectedOtherDoc: additionalDetailsData.kycaddresDetails.otherName || '',
                        addressLine1: {
                          value: this.state.kycFreeze ? additionalDetailsData.kycaddresDetails.address1 :
                            pangstdetails?.documentType == 'form60' && additionalDetailsData.kycaddresDetails.identityProofType === 'aadhar' ? additionalDetailsData.kycaddresDetails.address1 :
                              pangstdetails?.documentType == 'pan' ? additionalDetailsData.kycaddresDetails.address1 : '',
                        },
                        addressLine2: {
                          value: this.state.kycFreeze ? additionalDetailsData.kycaddresDetails.address2 :
                            pangstdetails?.documentType == 'form60' && additionalDetailsData.kycaddresDetails.identityProofType === 'aadhar' ? additionalDetailsData.kycaddresDetails.address2 :
                              pangstdetails?.documentType == 'pan' ? additionalDetailsData.kycaddresDetails.address2 : '',
                        },
                        landmark1: {
                          value: this.state.kycFreeze ? additionalDetailsData.kycaddresDetails.landmark1 :
                            pangstdetails?.documentType == 'form60' && additionalDetailsData.kycaddresDetails.identityProofType === 'aadhar' ? additionalDetailsData.kycaddresDetails.landmark1 :
                              pangstdetails?.documentType == 'pan' ? additionalDetailsData.kycaddresDetails.landmark1 : '',
                        },
                        landmark2: {
                          value: this.state.kycFreeze ? additionalDetailsData.kycaddresDetails.landmark2 :
                            pangstdetails?.documentType == 'form60' && additionalDetailsData.kycaddresDetails.identityProofType === 'aadhar' ? additionalDetailsData.kycaddresDetails.landmark2 :
                              pangstdetails?.documentType == 'pan' ? additionalDetailsData.kycaddresDetails.landmark2 : '',
                        },
                        pincode: {
                          value: this.state.kycFreeze ? additionalDetailsData.kycaddresDetails.pinCode :
                            pangstdetails?.documentType == 'form60' && additionalDetailsData.kycaddresDetails.identityProofType === 'aadhar' ? additionalDetailsData.kycaddresDetails.pinCode :
                              pangstdetails?.documentType == 'pan' ? additionalDetailsData.kycaddresDetails.pinCode : '',
                          isValid: true,
                        },
                        selectedSourceType: pangstdetails?.entity == "Sole Proprietory Firm" ? "Proprietor" : "Partner",
                        // additionalDetailsData?.kycaddresDetails?.kycDesignation || '',
                        radioOther: additionalDetailsData?.kycaddresDetails?.otherDesignation || '',
                        kycData: additionalDetailsData.kycaddresDetails.city !== undefined ? true : false,
                        fileNumber: additionalDetailsData.kycaddresDetails.fileNumber,
                        dateOfBirthText: additionalDetailsData.kycaddresDetails.dateOfBirth,
                        dlNo: additionalDetailsData.kycaddresDetails.identityProofNo,
                        dlVerified: additionalDetailsData.kycaddresDetails.identityProofType != "voter" && additionalDetailsData.kycaddresDetails.identityProofNo && additionalDetailsData.kycaddresDetails.identityProofNo.length > 1 ? true : false,
                        voterVerified: additionalDetailsData.kycaddresDetails.identityProofType === "voter" && additionalDetailsData.kycaddresDetails.epicNumber && additionalDetailsData.kycaddresDetails.epicNumber.length > 1 ? true : false,
                        dateOfBirthDLText: additionalDetailsData.kycaddresDetails.dateOfBirth,
                        epicNo: additionalDetailsData.kycaddresDetails.epicNumber,
                        selectedOtherDoc: {
                          value: additionalDetailsData?.kycaddresDetails?.identityProofNo || null,
                          label: additionalDetailsData?.kycaddresDetails?.identityProofNo || null
                        },
                        // registeredCollapsed: additionalDetailsData.kycaddresDetails.city !== undefined ? false :true?
                        city: this?.state?.kycFreeze ? additionalDetailsData.kycaddresDetails.city :
                          pangstdetails?.documentType == 'form60' && additionalDetailsData.kycaddresDetails.identityProofType === 'aadhar' ? additionalDetailsData?.kycaddresDetails?.city :
                            pangstdetails?.documentType == 'pan' ? additionalDetailsData.kycaddresDetails.city : '',

                        year: this?.state?.kycFreeze ? additionalDetailsData?.kycaddresDetails?.kycYear :
                          pangstdetails?.documentType == 'form60' && additionalDetailsData?.kycaddresDetails?.identityProofType === 'aadhar' ? additionalDetailsData?.kycaddresDetails?.kycYear :
                            pangstdetails?.documentType == 'pan' ? additionalDetailsData?.kycaddresDetails?.kycYear : '',

                        state: this?.state?.kycFreeze ? additionalDetailsData?.kycaddresDetails?.state :
                          pangstdetails?.documentType == 'form60' && additionalDetailsData?.kycaddresDetails?.identityProofType === 'aadhar' ? additionalDetailsData?.kycaddresDetails?.state :
                            pangstdetails?.documentType == 'pan' ? additionalDetailsData?.kycaddresDetails?.state : '',

                        // selectedMonth: {
                        // value: additionalDetailsData.kycaddresDetails.kycMonth,
                        //   // label: additionalDetailsData.kycaddresDetails.kycMonth !== undefined ? additionalDetailsData.kycaddresDetails.kycMonth.toString() : null,
                        // },
                        selectedMonth: {
                          value: additionalDetailsData?.kycaddresDetails?.kycMonth == undefined ? null :
                            this.state.kycFreeze ? additionalDetailsData?.kycaddresDetails?.kycMonth :
                              pangstdetails?.documentType == 'form60' && additionalDetailsData?.kycaddresDetails?.identityProofType === 'aadhar' ? additionalDetailsData?.kycaddresDetails?.kycMonth :
                                pangstdetails?.documentType == 'pan' ? additionalDetailsData?.kycaddresDetails?.kycMonth : null,

                          label: this.state.kycFreeze ? additionalDetailsData?.kycaddresDetails?.kycMonth?.toString() :
                            pangstdetails?.documentType == 'form60' && additionalDetailsData?.kycaddresDetails?.identityProofType === 'aadhar' ? additionalDetailsData?.kycaddresDetails?.kycMonth?.toString() :
                              pangstdetails?.documentType == 'pan' ? additionalDetailsData?.kycaddresDetails?.kycMonth?.toString() : null,
                        },

                        idToEditKYCData: additionalDetailsData.kycaddresDetails.id || null,
                        selectedResidentType: {
                          value: this.state.kycFreeze ? additionalDetailsData?.kycaddresDetails?.residenceType?.toString() :
                            pangstdetails?.documentType == 'form60' && additionalDetailsData?.kycaddresDetails?.identityProofType === 'aadhar' ? additionalDetailsData?.kycaddresDetails?.residenceType?.toString() :
                              pangstdetails?.documentType == 'pan' ? additionalDetailsData?.kycaddresDetails?.residenceType?.toString() : null,

                          label: this.state.kycFreeze ? additionalDetailsData?.kycaddresDetails?.residenceType?.toString() :
                            pangstdetails?.documentType == 'form60' && additionalDetailsData?.kycaddresDetails?.identityProofType === 'aadhar' ? additionalDetailsData?.kycaddresDetails?.residenceType?.toString() :
                              pangstdetails?.documentType == 'pan' ? additionalDetailsData?.kycaddresDetails?.residenceType?.toString() : null,

                        },
                        residenceFlag: additionalDetailsData.kycaddresDetails.residenceType === 'PG' ||
                          additionalDetailsData.kycaddresDetails.residenceType === 'Corporate Provided' ? false : true,

                        // selectedDocType:
                        //   (
                        //     additionalDetailsData.kycaddresDetails.identityProofType === 'aadhar' ? 'adhar'
                        //       : additionalDetailsData.kycaddresDetails.identityProofType === 'drivingLicense' ? 'driving license'
                        //         : additionalDetailsData.kycaddresDetails.identityProofType) || '',
                        selectedDocType: this.state.kycFreeze ?
                          (additionalDetailsData?.kycaddresDetails?.identityProofType === 'aadhar' ? 'adhar' :
                            additionalDetailsData?.kycaddresDetails?.identityProofType === 'drivingLicense' ? 'driving license' :
                              additionalDetailsData?.kycaddresDetails?.identityProofType) :
                          pangstdetails?.documentType == 'form60' ? 'adhar' :
                            pangstdetails?.documentType == 'pan' ?
                              (additionalDetailsData?.kycaddresDetails?.identityProofType === 'aadhar' ? 'adhar' :
                                additionalDetailsData?.kycaddresDetails?.identityProofType === 'drivingLicense' ? 'driving license' :
                                  additionalDetailsData?.kycaddresDetails?.identityProofType || '') :
                              additionalDetailsData?.kycaddresDetails?.identityProofType || '',

                        addharName: additionalDetailsData.kycaddresDetails.addharName || '',
                        adharID:
                          (
                            additionalDetailsData?.kycaddresDetails?.identityProofType === 'aadhar') ||
                            additionalDetailsData?.kycaddresDetails?.identityProofType === 'adhar'
                            ? additionalDetailsData?.kycaddresDetails?.identityProofNo?.replace(/\d{4}(?=.)/g, '$& ')
                            : '',

                      });
                    }

                  })
                }
              })


              if (additionalDetailsData.employedetails) {
                this.setState({
                  isFirstJob: {
                    value: additionalDetailsData.employedetails.firstJob == true ? true :
                      additionalDetailsData.employedetails.firstJob == false ? false : null,
                    // isValid: true,
                  },
                  jobMonth: {
                    value: additionalDetailsData.employedetails.jobMonth == undefined ? null : additionalDetailsData.employedetails.jobMonth,
                    label: additionalDetailsData.employedetails.jobMonth !== undefined ? additionalDetailsData.employedetails.jobMonth.toString() : null,

                  },
                  employmentData: additionalDetailsData.employedetails.jobYear !== undefined ? true : false,
                  jobYear: additionalDetailsData.employedetails.jobYear == undefined ? '' : additionalDetailsData.employedetails.jobYear,
                  empMonth: {
                    value: additionalDetailsData.employedetails.empMonth == undefined ? null : additionalDetailsData.employedetails.empMonth,
                    label: additionalDetailsData.employedetails.empMonth !== undefined ? additionalDetailsData.employedetails.empMonth : null,
                  },
                  empYear: additionalDetailsData.employedetails.empYear == undefined ? '' : additionalDetailsData.employedetails.empYear,
                  employmentCity: additionalDetailsData.employedetails.city || '',
                  employmentState: additionalDetailsData.employedetails.state || '',
                  empEmail: {
                    value: additionalDetailsData.employedetails.empOfficeEmail,
                    isValid: true,
                  },
                  selectedProfession: {
                    value: additionalDetailsData.employedetails.empProfession || null,
                    label: additionalDetailsData.employedetails.empProfession || null,
                  },
                  selectedDesignation: {
                    value: additionalDetailsData.employedetails.designation || null,
                    label: additionalDetailsData.employedetails.designation || null,
                  },
                  selectedsubCategory: {
                    value: additionalDetailsData.employedetails.empSubCategory || null,
                    label: additionalDetailsData.employedetails.empSubCategory || null,
                  },
                  selectedCompanyType: {
                    value: additionalDetailsData.employedetails.empConstitution || null,
                    label: additionalDetailsData.employedetails.empConstitution || null,
                  },
                  selectedIndustry: {
                    value: additionalDetailsData.employedetails.empIndustry || null,
                    label: additionalDetailsData.employedetails.empIndustry || null,
                  },
                  selectedCompanyName: additionalDetailsData.employedetails.company || '',
                  query: additionalDetailsData.employedetails.company || '',
                  companyName: additionalDetailsData.employedetails.empOtherCompanyName || '',
                  idToEditEmployDetails: additionalDetailsData.employedetails.id || null,
                }, () => {
                  // this.state.selectedProfession.value == null ? null :
                  //   this.props.getSubCategoryList({
                  //     dataToAPI: {
                  //       profession: this.state.selectedProfession.value,
                  //     },
                  //     callback: (response) => {
                  //       const subCategory = response.data.map((value) => (
                  //         {
                  //           value: value.subCategory,
                  //           label: value.subCategory,
                  //         }));
                  //       this.setState({
                  //         subCategoryList: subCategory || [],
                  //         selectedsubCategory: {
                  //           value: additionalDetailsData.employedetails.empSubCategory || null,
                  //           label: additionalDetailsData.employedetails.empSubCategory || null,
                  //         },
                  //       }, () => {
                  //         this.props.getDesignations({
                  //           dataToAPI: {
                  //             subCategory: this.state.selectedsubCategory.value,
                  //             profession: this.state.selectedProfession.value,
                  //           },
                  //           callback: (response) => {
                  //             const subCategory = response.data.map((value) => (
                  //               {
                  //                 value: value.designation,
                  //                 label: value.designation,
                  //                 id: value.id
                  //               }));
                  //             this.setState({
                  //               designationList: subCategory || [],

                  //               selectedDesignation: {
                  //                 value: additionalDetailsData.employedetails.designation || null,
                  //                 label: additionalDetailsData.employedetails.designation || null,
                  //               },
                  //             });




                  //           }
                  //         })
                  //       });

                  //     }
                  //   })
                });
              }

              if (additionalDetailsData.alternateContact) {
                this.setState({
                  mobileNumber: {
                    value: additionalDetailsData.alternateContact.mobileNo || '',
                    isValid: true,
                  },
                  contactData: additionalDetailsData.alternateContact.mobileNo !== undefined ? true : false,
                  idToEditAdditionalContact:
                    additionalDetailsData.alternateContact.id || null,
                });
              }
              if (additionalDetailsData.officeAddresDetails) {
                this.setState({
                  idToEditEmpDetails:
                    additionalDetailsData.officeAddresDetails.id || null,
                  empAddress1: {
                    value: additionalDetailsData.officeAddresDetails.address1 || '',
                  },
                  empAddress2: {
                    value: additionalDetailsData.officeAddresDetails.address2 || '',

                  },
                  empLandmark1: {
                    value: additionalDetailsData.officeAddresDetails.landmark1 || '',
                  },
                  empLandmark2: {
                    value: additionalDetailsData.officeAddresDetails.landmark2 || '',
                  },
                  empPincode: {
                    value: additionalDetailsData.officeAddresDetails.pinCode || '',
                    isValid: true,
                  },
                  // officeData: additionalDetailsData.officeAddresDetails.city !== undefined ? true : false,
                  empCity: additionalDetailsData.officeAddresDetails.city || '',
                  empState: additionalDetailsData.officeAddresDetails.state || '',
                  selectedEmpType: {
                    value: additionalDetailsData.officeAddresDetails.officeType,
                    label: additionalDetailsData.officeAddresDetails.officeType,
                  },
                  // officeMonth: additionalDetailsData.officeAddresDetails.state || '',
                  // officeYear: additionalDetailsData.officeAddresDetails.officeYear || '',
                  // officeMonth: {
                  //   value: additionalDetailsData.officeAddresDetails.officeMonth,
                  //   label: additionalDetailsData.officeAddresDetails.officeMonth,
                  // },
                });
              }
              if (additionalDetailsData?.currentOfficeAddresDetails && pangstdetails?.occupationType != "salaried"
              ) {

                this.setState({
                  idToEditOfficeAddress:
                    additionalDetailsData.currentOfficeAddresDetails.id || null,
                  imageDataCurrent: {
                    front: {
                      uri: additionalDetailsData?.currentOfficeAddresDetails?.currentAddressFilePath?.replace('/var/www/html', uatURL.URL) || '',
                      data: '',
                    },
                    back: {
                      uri: additionalDetailsData?.currentOfficeAddresDetails?.currentAddressFilePathBack?.replace('/var/www/html', uatURL.URL) || '',
                      data: '',
                    }
                  },
                  officeAddress1: {
                    value: additionalDetailsData.currentOfficeAddresDetails.sameRegisteredAddressFlag ? additionalDetailsData.kycaddresDetails.address1 : additionalDetailsData.currentOfficeAddresDetails.address1 || '',
                  },
                  officeAddress2: {
                    value: additionalDetailsData.currentOfficeAddresDetails.sameRegisteredAddressFlag ? additionalDetailsData.kycaddresDetails.address2 : additionalDetailsData.currentOfficeAddresDetails.address2 || '',

                  },
                  officeLandmark1: {
                    value: additionalDetailsData.currentOfficeAddresDetails.landmark1 || '',
                  },
                  officeLandmark2: {
                    value: additionalDetailsData.currentOfficeAddresDetails.landmark2 || '',

                  },
                  officePincode: {
                    value: additionalDetailsData.currentOfficeAddresDetails.sameRegisteredAddressFlag ? additionalDetailsData.kycaddresDetails.pinCode : additionalDetailsData.currentOfficeAddresDetails.pinCode || '',
                    isValid: true,
                  },
                  officeData: additionalDetailsData.currentOfficeAddresDetails.city !== undefined ? true : false,
                  officeCity: additionalDetailsData.currentOfficeAddresDetails.sameRegisteredAddressFlag ? additionalDetailsData.kycaddresDetails.city || '' : additionalDetailsData.currentOfficeAddresDetails.city || '',
                  officeState: additionalDetailsData.currentOfficeAddresDetails.sameRegisteredAddressFlag ? additionalDetailsData.kycaddresDetails.state || '' : additionalDetailsData.currentOfficeAddresDetails.state || '',
                  selectedOfficeType: {
                    value: additionalDetailsData.currentOfficeAddresDetails.officeType,
                    label: additionalDetailsData.currentOfficeAddresDetails.officeType,
                  },
                  // officeMonth: additionalDetailsData.currentOfficeAddresDetails.sameRegisteredAddressFlag ? additionalDetailsData.kycaddresDetails.state || '' : additionalDetailsData.currentOfficeAddresDetails.state || '',
                  officeYear: additionalDetailsData.currentOfficeAddresDetails.sameRegisteredAddressFlag ? additionalDetailsData.kycaddresDetails.kycYear || '' : additionalDetailsData.currentOfficeAddresDetails.officeYear || '',
                  officeMonth: {
                    value: additionalDetailsData.currentOfficeAddresDetails.officeMonth,
                    label: additionalDetailsData.currentOfficeAddresDetails.officeMonth,
                  },
                  isSelected1: additionalDetailsData.currentOfficeAddresDetails.sameRegisteredAddressFlag || false,
                  gstAddressFlag: additionalDetailsData.currentOfficeAddresDetails.gstAddressFlag,
                });
              }
              if (additionalDetailsData.officeAddresDetails && pangstdetails?.occupationType == "salaried"
              ) {
                this.setState({
                  idToEditOfficeAddress:
                    additionalDetailsData.officeAddresDetails.id || null,
                  officeAddress1: {
                    value: additionalDetailsData.officeAddresDetails.address1 || '',
                  },
                  officeAddress2: {
                    value: additionalDetailsData.officeAddresDetails.address2 || '',

                  },
                  officeLandmark1: {
                    value: additionalDetailsData.officeAddresDetails.landmark1 || '',
                  },
                  officeLandmark2: {
                    value: additionalDetailsData.officeAddresDetails.landmark2 || '',

                  },
                  officePincode: {
                    value: additionalDetailsData.officeAddresDetails.pinCode || '',
                    isValid: true,
                  },
                  officeData: additionalDetailsData.officeAddresDetails.city !== undefined ? true : false,
                  officeCity: additionalDetailsData.officeAddresDetails.city || '',
                  officeState: additionalDetailsData.officeAddresDetails.state || '',
                });
              }
              if (actualPermanentAddDetails != '' && actualPermanentAddDetails != null) {
               
                this.setState({
                  idToEditPermResAddress: actualPermanentAddDetails.id || null,
                  imageDataPermanent: {
                    front: {
                      uri: actualPermanentAddDetails?.filePath?.replace('/var/www/html', uatURL.URL) || '',
                    },
                    back: {
                      uri: actualPermanentAddDetails?.filePathBack?.replace('/var/www/html', uatURL.URL) || '',
                    }
                  },
                  permanantResiAddressData: actualPermanentAddDetails.permanentCity !== undefined ? true : false,
                  permanentResAddr1: {
                    value: actualPermanentAddDetails.permanentAddress1 || '',
                  },
                  permanentResAddr2: {
                    value: actualPermanentAddDetails.permanentAddress2 || '',
                  },
                  permanentResLandmark1: {
                    value: actualPermanentAddDetails.permanentAddressLandmark1 || '',
                  },
                  permanentResLandmark2: {
                    value: actualPermanentAddDetails.permanentAddressLandmark2 || '',
                  },
                  permanentResPincode: {
                    value: actualPermanentAddDetails.permanentPinCode || '',
                    isValid: true,
                  },

                  permanentResCity: actualPermanentAddDetails.permanentCity || '',
                  permanentResState: actualPermanentAddDetails.permanentState || '',
                  sameAsKycAddress: actualPermanentAddDetails.sameAsKycAddress,
                  permanentResYear: actualPermanentAddDetails.permanentYear || '',
                  permanentResMonth: {
                    value: Number(actualPermanentAddDetails?.permanentMonth) || null,
                    label: actualPermanentAddDetails?.permanentMonth || null,
                  },
                  permanentResidenceType: {
                    value: actualPermanentAddDetails.permanentResidenceType,
                    label: actualPermanentAddDetails.permanentResidenceType,
                  },
                });
              }
              if (additionalDetailsData.permanentaddresDetails && !this.state.indSelfSoleFlag) {
                this.setState({
                  idToEditPermanentAddress: additionalDetailsData.permanentaddresDetails.id || null,
                  imageDataCurrent: {
                    front: {
                      uri: additionalDetailsData?.permanentaddresDetails?.currentAddressFilePath?.replace('/var/www/html', uatURL.URL) || '',
                      data: '',
                    },
                    back: {
                      uri: additionalDetailsData?.permanentaddresDetails?.currentAddressFilePathBack?.replace('/var/www/html', uatURL.URL) || '',
                      data: '',
                    }
                  },
                  permanentAddress1: {
                    value: additionalDetailsData.permanentaddresDetails.sameKycFlag ? additionalDetailsData.kycaddresDetails.address1 : additionalDetailsData.permanentaddresDetails.address1 || '',
                  },
                  permanentAddress2: {
                    value: additionalDetailsData.permanentaddresDetails.sameKycFlag ? additionalDetailsData.kycaddresDetails.address2 : additionalDetailsData.permanentaddresDetails.address2 || '',
                  },
                  permanentLandmark1: {
                    value: additionalDetailsData.permanentaddresDetails.landmark1 || '',
                  },
                  permanentLandmark2: {
                    value: additionalDetailsData.permanentaddresDetails.landmark2 || '',
                  },
                  permanentPincode: {
                    value: additionalDetailsData.permanentaddresDetails.sameKycFlag ? additionalDetailsData.kycaddresDetails.pinCode : additionalDetailsData.permanentaddresDetails.pinCode || '',
                    isValid: true,
                  },

                  permanantAddressData: additionalDetailsData.permanentaddresDetails.city !== undefined ? true : false,
                  permanentCity: additionalDetailsData.permanentaddresDetails.sameKycFlag ? additionalDetailsData.kycaddresDetails.city || '' : additionalDetailsData.permanentaddresDetails.city || '',
                  permanentState: additionalDetailsData.permanentaddresDetails.sameKycFlag ? additionalDetailsData.kycaddresDetails.state || '' : additionalDetailsData.permanentaddresDetails.state || '',
                  isSelected: additionalDetailsData.permanentaddresDetails.sameKycFlag,
                  permanentYear: additionalDetailsData.permanentaddresDetails.sameKycFlag ? additionalDetailsData.kycaddresDetails.kycYear || '' : additionalDetailsData.permanentaddresDetails.permaYear || '',
                  permanentMonth: {
                    value: additionalDetailsData.permanentaddresDetails.sameKycFlag && additionalDetailsData.permanentaddresDetails.sameKycFlag !== undefined ? additionalDetailsData.kycaddresDetails.kycMonth : additionalDetailsData.permanentaddresDetails.permaMonth,
                    label: additionalDetailsData.permanentaddresDetails.sameKycFlag && additionalDetailsData.permanentaddresDetails.sameKycFlag !== undefined ? additionalDetailsData.kycaddresDetails.kycMonth : additionalDetailsData.permanentaddresDetails.permaMonth,

                  },
                  residenceType: {
                    value: additionalDetailsData.permanentaddresDetails.residenceType,
                    label: additionalDetailsData.permanentaddresDetails.residenceType,
                  },
                });
              }
              if (additionalDetailsData.utilityDetails) {
                const { imageDataUtility } = this.state;
                // if (additionalDetailsData.utilityDetails && additionalDetailsData.utilityDetails.fileList !== undefined && additionalDetailsData.utilityDetails.fileList.length !== 0) {
                imageDataUtility.front.uri = additionalDetailsData?.utilityDetails?.filePath?.replace('/var/www/html', uatURL.URL,) || '',
                  imageDataUtility.back.uri = additionalDetailsData?.utilityDetails?.filePathBack?.replace('/var/www/html', uatURL.URL) || '';
                // }
                this.setState(
                  {
                    imageDataUtility,
                    selectedUtilityDoc: {
                      value: additionalDetailsData.utilityDetails.otherResidanceType || null,
                      label: additionalDetailsData.utilityDetails.otherResidanceType || null,
                    },
                    utilityAddressType: {
                      value: additionalDetailsData.utilityDetails.addressType == "currentAddress" ? true :
                        additionalDetailsData.utilityDetails.addressType == "permanentAddress" ? false : null,
                      isValid: additionalDetailsData.utilityDetails.addressType,
                    },
                    idToEditUtilityData:
                      additionalDetailsData.utilityDetails.id || null,
                    utilityAddressLine1: {
                      value: additionalDetailsData.utilityDetails.address1 || '',
                    },
                    utilityAddressLine2: {
                      value: additionalDetailsData.utilityDetails.address2 || '',
                    },
                    utilityLandmark1: {
                      value: additionalDetailsData.utilityDetails.landmark1 || '',
                    },
                    utilityLandmark2: {
                      value: additionalDetailsData.utilityDetails.landmark2 || '',
                    },
                    utilityPincode: {
                      value: additionalDetailsData.utilityDetails.pincode || '',
                      isValid: true,
                    },
                    utilityEpicNo: additionalDetailsData.utilityDetails.epicNo || '',
                    utilityDlNo: additionalDetailsData.utilityDetails.drivingLicenceNo || '',
                    utilityDateOfBirthText: additionalDetailsData.utilityDetails.dateOfBirth || '',
                    lpgID: additionalDetailsData.utilityDetails.lpgId || '',
                    utilityServiceProvider: {
                      value: additionalDetailsData.utilityDetails.serviceProvider || '',
                      label: null,
                    },
                    utilityFileNumber: additionalDetailsData.utilityDetails.fileNumber || '',
                    utilityTelephoneNo: additionalDetailsData.utilityDetails.telephoneNo || '',
                    utilityCity: additionalDetailsData.utilityDetails.telephoneCity || '',
                    utilityBillData: additionalDetailsData.utilityDetails.city !== undefined ? true : false,
                    utilityCity: additionalDetailsData.utilityDetails.city || '',
                    utilityState: additionalDetailsData.utilityDetails.state || '',
                    // lpgID: additionalDetailsData.utilityDetails.billNumer || '',
                    cityNameUtility: additionalDetailsData.utilityDetails.landLineCity || '',
                    landlineNumber: additionalDetailsData.utilityDetails.landLineNumber || '',
                    stdCode: additionalDetailsData.utilityDetails.std || '',
                    utilitySelectedResidentType: {
                      value: additionalDetailsData.utilityDetails.residenceType || null,
                      label: additionalDetailsData.utilityDetails.residenceType || null,
                    },
                    selectedUtilityBill:
                      additionalDetailsData.utilityDetails.billType || '',
                    additionalOptions: [
                      {
                        registeredAddress: [
                          { residentialAddressCollapsed: additionalDetailsData.kycaddresDetails.city !== undefined ? false : true },
                          { addUtilityBillsCollapsed: additionalDetailsData.utilityDetails.city !== undefined ? false : true },
                        ],
                      },
                    ],
                    additionalDetailOptions: {
                      additionalContactCollapsed: additionalDetailsData.alternateContact.mobileNo !== undefined ? false : true,
                      employementDetailsCollapsed: additionalDetailsData.employedetails.jobYear !== undefined ? false : true,
                      officeAddressCollapsed: additionalDetailsData.currentOfficeAddresDetails.city !== undefined ? false : true,
                      permanentAddressCollapsed: additionalDetailsData.permanentaddresDetails.city !== undefined ? false : true,

                    },
                  },
                  () => {


                    if (this.state.selectedUtilityBill === 'electricity') {
                      var serviceProviderValue = "";
                      var serviceProviderLabel = "";
                      this.state.serviceProviderList.forEach(
                        (item) => {

                          if (item.code == additionalDetailsData.utilityDetails.serviceProvider) {
                            serviceProviderValue = item.value
                            serviceProviderLabel = item.label
                          }

                        })
                      this.setState({
                        serviceProvider: {
                          value: serviceProviderValue || null,
                          label: serviceProviderLabel || null,
                          code: additionalDetailsData.utilityDetails.serviceProvider || null
                        },
                        consumerNumber: additionalDetailsData.utilityDetails.billNumer || '',
                      });
                    }
                  },
                );
              }
            }
          }
        })
      }, 1000);
    })
  }

  componentDidMount() {
    this.apiCall()
    // BackHandler.addEventListener("hardwareBackPress", this.backAction);

  }

  isemailAddress(text) {
    let valid = false;
    //const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (text != '' && text != null && emailRegex.test(text)) {
      valid = true;
    }

    this.setState({
      empEmail: {
        ...this.state.empEmail,
        isValid: valid,
      },
    });
  }
  renderToolTip(text, customStyle) {
    const { toolTipContainer, informationToolTipText } = AdditionalDetailsStyles;

    return (
      <View style={customStyle}>
        <Tooltip
          popover={<Text>{text}</Text>}
          backgroundColor={colors.COLOR_LILAC}
          skipAndroidStatusBar={true}
          overlayColor={'transparent'}
          withPointer={true}
          height={105}>
          <View style={toolTipContainer}>
            <Text style={informationToolTipText}>{'i'}</Text>
          </View>
        </Tooltip>
      </View>
    );
  }

  handleCollapseExpand(key, valueToSet) {
    const keyToObj = this.state.additionalDetailOptions;
    keyToObj[key] = valueToSet;

    this.setState({
      additionalDetailOptions: keyToObj,
    });
  }

  renderRegisteredAddress() {
    const {
      collapsedViewStyle,
      collapsedContainer,
      plusImageStyle,
      registeredAddressLabel,
      expandedContainer,
      seperatorStyle,
      expandedViewStyle,
    } = AdditionalDetailsStyles;

    if (this.state.additionalDetailOptions.registeredCollapsed) {
      return (
        <View style={collapsedContainer}>
          <TouchableOpacity
            style={collapsedViewStyle}
            onPress={() => {
              this.handleCollapseExpand('registeredCollapsed', false);
            }}>
            <Text style={registeredAddressLabel}>
              {
                // this.state.iscoapplicant || this.state.isguarantor ? ADDITIONAL_DETAILS_CONST.REGISTERED_ADDRESS2 : 
                `${this.state.indSelfSoleFlag ? ADDITIONAL_DETAILS_CONST.REGISTERED_ADDRESSIND : ADDITIONAL_DETAILS_CONST.REGISTERED_ADDRESS}`}
            </Text>
            <Image source={BLUE_PLUS_ICON} style={plusImageStyle} />
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <View style={[expandedContainer, { marginLeft: 20, marginRight: 20 }]}>
          <View style={seperatorStyle} />
          <View style={expandedViewStyle}>
            <TouchableOpacity
              style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}
              onPress={() => {
                this.handleCollapseExpand('registeredCollapsed', true);
              }}>
              <Text style={registeredAddressLabel}>
                {
                  // this.state.iscoapplicant || this.state.isguarantor ? ADDITIONAL_DETAILS_CONST.REGISTERED_ADDRESS2 : 
                  `${this.state.indSelfSoleFlag ? ADDITIONAL_DETAILS_CONST.REGISTERED_ADDRESSIND : ADDITIONAL_DETAILS_CONST.REGISTERED_ADDRESS}`}
              </Text>

              <Image
                source={MINUS_ICON}
                style={plusImageStyle}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
          {this.renderKYCDocument()}
        </View>
      );
    }
  }

  renderDocument() {
    const {
      uploadImageContainer,
      uploadImageStyle,
      frontAndBackLabel,
      saveButtonStyle,
      saveButtonTitleStyle,
      uploadedImageStyle,
      style50PercentRow,
      closeImageStyle,
      disableTextStyle,
      disableStyle,
      verifiedTextStyle,
      verifiedTickImageStyle,
      flexRowStyle,
    } = AdditionalDetailsStyles;
    return (
      <View>
        <View style={uploadImageContainer}>
          {this.state.imageDataPermanent?.front?.uri == '' && (
            <TouchableOpacity
              style={uploadImageStyle}
              onPress={async () => {
                var dataToApi = {
                  applicantUniqueId: this.state.applicantUniqueId,
                  docType: 'front'
                }
                if (!this.state.isViewOnly) {
                  let fileDetails = await uploadDocument();
                  const callback = (response) => {
                    this.setState({
                      imageDataPermanent: {
                        ...this.state.imageDataPermanent,
                        front: {
                          uri: response.filePath.replace('/var/www/html', uatURL.URL) || '',
                        }
                      }

                    })
                  }
                  zipFileDisbursementUpload(fileDetails, dataToApi, this.props.uploadDoc, callback);
                }
              }}

            >
              <Icon size={35} name="plus" type="antdesign" color={'#818282'} />
              <Text style={frontAndBackLabel}>
                {ADDITIONAL_DETAILS_CONST.IMAGE_FRONT}
              </Text>
            </TouchableOpacity>
          )}
          {this.state.imageDataPermanent.front.uri != '' &&
            <View style={style50PercentRow}>
              <Image
                style={uploadedImageStyle}
                source={{
                  uri: `${this.state.imageDataPermanent.front.uri}`,
                }}

                resizeMode="cover"
              />
              <TouchableOpacity
                style={[closeImageStyle]}
                onPress={() => {
                  if (!this.state.isViewOnly) {
                    // deletePerDocuments
                    const dataToAPI = {
                      docType: 'front',
                      applicantUniqueId:
                        this.state.isguarantor || this.state.iscoapplicant
                          ? this.state.coapplicantUniqueId
                          : this.state.applicantUniqueId,
                    };

                    this.props.deletePerDocuments({
                      dataToAPI,
                      callback: (response) => {
                        this.setState({
                          imageDataPermanent: {
                            ...this.state.imageDataPermanent,
                            front: {
                              uri: '',
                            }
                          }

                        })
                      }
                    });
                  }
                }}>
                <Icon name="closecircle" type="antdesign" color={'#5f5c60'} />
              </TouchableOpacity>
            </View>
          }

          {this?.state?.imageDataPermanent?.back?.uri == '' && (
            <TouchableOpacity
              style={uploadImageStyle}
              onPress={async () => {
                if (!this.state.isViewOnly) {
                  var dataToApi = {
                    applicantUniqueId:
                      this.state.isguarantor || this.state.iscoapplicant
                        ? this.state.coapplicantUniqueId
                        : this.state.applicantUniqueId,
                    docType: 'back'
                  }
                  let fileDetails = await uploadDocument();
                  const callback = (response) => {
                    this.setState({
                      imageDataPermanent: {
                        ...this.state.imageDataPermanent,
                        back: {
                          uri: response?.filePathBack?.replace('/var/www/html', uatURL.URL) || '',
                        }
                      }

                    })
                  }
                  zipFileDisbursementUpload(fileDetails, dataToApi, this.props.uploadDoc, callback);
                }
              }}

            >
              <Icon size={35} name="plus" type="antdesign" color={'#818282'} />
              <Text style={frontAndBackLabel}>
                {ADDITIONAL_DETAILS_CONST.IMAGE_BACK}
              </Text>
            </TouchableOpacity>
          )}
          {this.state.imageDataPermanent?.back?.uri != '' &&
            <View style={style50PercentRow}>
              <Image
                style={uploadedImageStyle}
                source={{
                  uri: `${this.state.imageDataPermanent?.back?.uri}`,
                }}

                resizeMode="cover"
              />
              <TouchableOpacity
                style={[closeImageStyle]}
                onPress={() => {
                  if (!this.state.isViewOnly) {
                    // deletePerDocuments
                    const dataToAPI = {
                      docType: 'back',
                      applicantUniqueId:
                        this.state.isguarantor || this.state.iscoapplicant
                          ? this.state.coapplicantUniqueId
                          : this.state.applicantUniqueId,
                    };

                    this.props.deletePerDocuments({
                      dataToAPI,
                      callback: (response) => {
                        this.setState({
                          imageDataPermanent: {
                            ...this.state.imageDataPermanent,
                            back: {
                              uri: '',
                            }
                          }

                        })
                      }
                    });
                  }
                }}>
                <Icon name="closecircle" type="antdesign" color={'#5f5c60'} />
              </TouchableOpacity>
            </View>
          }
        </View>
        <Text style={{
          fontFamily: APP_FONTS.NunitoBold,
          marginVertical: 10,
          marginBottom: 10,
          fontSize: FONT_SIZE.xm,
          color: colors.COLOR_GREY
        }}>Document is mandatory*</Text>

      </View>
    );
  }

  renderCurrentDocument() {
    const {
      uploadImageContainer,
      uploadImageStyle,
      frontAndBackLabel,
      saveButtonStyle,
      saveButtonTitleStyle,
      uploadedImageStyle,
      style50PercentRow,
      closeImageStyle,
      disableTextStyle,
      disableStyle,
      verifiedTextStyle,
      verifiedTickImageStyle,
      flexRowStyle,
    } = AdditionalDetailsStyles;
    return (
      <View>
        <View style={uploadImageContainer}>
          {this?.state?.imageDataCurrent?.front?.uri == '' && (
            <TouchableOpacity
              style={uploadImageStyle}
              onPress={async () => {
                if (!this.state.isViewOnly) {
                  var fileDetails = ''
                  fileDetails = await uploadDocument();
                  if (fileDetails != '') {
                    var data = {
                      applicantUniqueId:
                        this.state.isguarantor || this.state.iscoapplicant
                          ? this.state.coapplicantUniqueId
                          : this.state.applicantUniqueId,
                      filename: fileDetails?.path?.split('/').pop(),
                      docType: 'front'
                    }
                    const callback = (response) => {
                      this.setState({
                        imageDataCurrent: {
                          ...this.state.imageDataCurrent,
                          front: {
                            uri: response.currentAddressFilePath.replace('/var/www/html', uatURL.URL),
                          }
                        }

                      })
                    }
                    zipFileDisbursementUpload(fileDetails, data, this.props.uploadCurrentDoc, callback);
                  }
                }
              }}

            >
              <Icon size={35} name="plus" type="antdesign" color={'#818282'} />
              <Text style={frontAndBackLabel}>
                {ADDITIONAL_DETAILS_CONST.IMAGE_FRONT}
              </Text>
            </TouchableOpacity>
          )}
          {this?.state?.imageDataCurrent?.front?.uri != '' &&
            <View style={style50PercentRow}>
              <Image
                style={uploadedImageStyle}
                source={{
                  uri: `${this?.state?.imageDataCurrent?.front?.uri}`,
                }}
                resizeMode="cover"
              />
              <TouchableOpacity
                style={[closeImageStyle]}
                onPress={() => {
                  if (!this.state.isViewOnly) {
                    // deletePerDocuments
                    const dataToAPI = {
                      currentAddress: true,
                      docType: 'front',
                      applicantUniqueId:
                        this.state.isguarantor || this.state.iscoapplicant
                          ? this.state.coapplicantUniqueId
                          : this.state.applicantUniqueId,
                    };

                    this.props.deletePerDocuments({
                      dataToAPI,
                      callback: (response) => {
                        this.setState({
                          imageDataCurrent: {
                            ...this.state.imageDataCurrent,
                            front: {
                              uri: '',
                            },

                          }

                        })
                      }
                    });
                  }
                }}>
                <Icon name="closecircle" type="antdesign" color={'#5f5c60'} />
              </TouchableOpacity>
            </View>
          }
          {this?.state?.imageDataCurrent?.back?.uri == '' && (
            <TouchableOpacity
              style={uploadImageStyle}
              onPress={async () => {
                if (!this.state.isViewOnly) {
                  let fileDetails = await uploadDocument();
                  var data = {
                    applicantUniqueId:
                      this.state.isguarantor || this.state.iscoapplicant
                        ? this.state.coapplicantUniqueId
                        : this.state.applicantUniqueId,
                    filename: fileDetails?.path?.split('/').pop(),
                    docType: 'back'
                  }
                  const callback = (response) => {
                    this.setState({
                      imageDataCurrent: {
                        ...this.state.imageDataCurrent,
                        back: {
                          uri: response.currentAddressFilePathBack.replace('/var/www/html', uatURL.URL),
                        }
                      }

                    })
                  }
                  zipFileDisbursementUpload(fileDetails, data, this.props.uploadCurrentDoc, callback);
                }
              }}

            >
              <Icon size={35} name="plus" type="antdesign" color={'#818282'} />
              <Text style={frontAndBackLabel}>
                {ADDITIONAL_DETAILS_CONST.IMAGE_BACK}
              </Text>
            </TouchableOpacity>
          )}
          {this?.state?.imageDataCurrent?.back?.uri != '' &&
            <View style={style50PercentRow}>
              <Image
                style={uploadedImageStyle}
                source={{
                  uri: `${this?.state?.imageDataCurrent?.back?.uri}`,
                }}
                resizeMode="cover"
              />
              <TouchableOpacity
                style={[closeImageStyle]}
                onPress={() => {
                  if (!this.state.isViewOnly) {
                    // deletePerDocuments
                    const dataToAPI = {
                      currentAddress: true,
                      docType: 'back',
                      applicantUniqueId:
                        this.state.isguarantor || this.state.iscoapplicant
                          ? this.state.coapplicantUniqueId
                          : this.state.applicantUniqueId,
                    };

                    this.props.deletePerDocuments({
                      dataToAPI,
                      callback: (response) => {
                        this.setState({
                          imageDataCurrent: {
                            ...this.state.imageDataCurrent,
                            back: {
                              uri: '',
                            }
                          }

                        })
                      }
                    });
                  }
                }}>
                <Icon name="closecircle" type="antdesign" color={'#5f5c60'} />
              </TouchableOpacity>
            </View>
          }
        </View>

        <Text style={{
          fontFamily: APP_FONTS.NunitoBold,
          marginVertical: 10,
          marginBottom: 10,
          fontSize: FONT_SIZE.xm,
          color: colors.COLOR_GREY
        }}>Document is mandatory*</Text>

      </View>
    );
  }

  renderPermanentAddress() {
    const {
      residentialAddressContainer,
      inputTextStyle,
      kycDocLabel,
      textStyle,
      textStyle1,
      inputStyle,
      separatorInputStyle,
      saveButtonStyle,
      saveButtonTitleStyle,
      errorLabel,
      marginTop20,
      disableTextStyle,
      disableStyle,
    } = AdditionalDetailsStyles;

    return (
      <View style={residentialAddressContainer}>
        {/* {this.state.residenceFlag == true ?
          <View style={{ flexDirection: 'row' }}>
            <CheckBox
              disabled={this.state.isViewOnly}
              value={this.state.isSelected}
              tintColors={{ true: colors.COLOR_LIGHT_NAVY_BLUE }}
              onValueChange={() => {
                this.setState({ isSelected: !this.state.isSelected }, () => {
                  this.setState({
                    permanentAddress1: {
                      value: !this.state.isSelected ? "" : this.state.addressLine1.value,
                    },
                    permanentAddress2: {
                      value: !this.state.isSelected ? "" : this.state.addressLine2.value,
                    },
                    permanentLandmark1: {
                      value: !this.state.isSelected ? "" : this.state.landmark1.value,
                    },
                    permanentLandmark2: {
                      value: !this.state.isSelected ? "" : this.state.landmark2.value,
                    },
                    permanentPincode: {
                      value: !this.state.isSelected ? "" : this.state.pincode.value,
                      isValid: !this.state.isSelected ? true : this.state.pincode.isValid,
                    },
                    permanentCity: !this.state.isSelected ? "" : this.state.city,
                    permanentState: !this.state.isSelected ? "" : this.state.state,
                    permanentYear: !this.state.isSelected ? "" : this?.state?.year,
                    permanentMonth: {
                      value: !this.state.isSelected ? null : this.state.selectedMonth.value,
                      label: !this.state.isSelected ? null : this.state.selectedMonth.label,
                    },


                  })
                })
              }}
              style={{ alignSelf: "center" }}
            />
            <Text style={{ fontSize: FONT_SIZE.m, color: colors.COLOR_LIGHT_NAVY_BLUE, fontFamily: APP_FONTS.NunitoBold, margin: 8 }}>Same as KYC Address?</Text>
          </View>
          : null} */}

        {this.renderCurrentDocument()}
        <FloatingLabelInput
          editable={!this.state.isViewOnly}
          label={ADDITIONAL_DETAILS_CONST.ADDRESS_LINE_1}
          containerStyles={inputStyle}
          value={this.state.permanentAddress1.value || undefined}
          onChangeText={(value) => {
            this.setState({
              permanentAddress1: {
                value: value,
              },
            });
          }}
          customLabelStyles={{
            colorFocused: colors.COLOR_LIGHT_NAVY_BLUE,
            colorBlurred: colors.COLOR_LIGHT_GREY,
            fontSizeFocused: 15,
            fontSizeBlurred: 15,
          }}
          inputStyles={inputTextStyle}
        />
        <View style={separatorInputStyle} />

        <View style={marginTop20}>
          <FloatingLabelInput
            editable={!this.state.isViewOnly}
            label={ADDITIONAL_DETAILS_CONST.ADDRESS_LINE_2}
            containerStyles={inputStyle}
            value={this.state.permanentAddress2.value || undefined}
            onChangeText={(value) => {
              this.setState({
                permanentAddress2: {
                  value: value,
                },
              });
            }}
            customLabelStyles={{
              colorFocused: colors.COLOR_LIGHT_NAVY_BLUE,
              colorBlurred: colors.COLOR_LIGHT_GREY,
              fontSizeFocused: 15,
              fontSizeBlurred: 15,
            }}
            inputStyles={inputTextStyle}
          />
        </View>
        <View style={separatorInputStyle} />

        <FloatingLabelInput
          editable={!this.state.isViewOnly}
          label={"Landmark 1*"}
          containerStyles={inputStyle}
          value={this.state.permanentLandmark1.value || undefined}
          onChangeText={(value) => {
            this.setState({
              permanentLandmark1: {
                value: value,
              },
            });
          }}
          customLabelStyles={{
            colorFocused: colors.COLOR_LIGHT_NAVY_BLUE,
            colorBlurred: colors.COLOR_LIGHT_GREY,
            fontSizeFocused: 15,
            fontSizeBlurred: 15,
          }}
          inputStyles={inputTextStyle}
        />
        <View style={separatorInputStyle} />

        <View style={marginTop20}>
          <FloatingLabelInput
            editable={!this.state.isViewOnly}
            label={"Landmark 2"}
            containerStyles={inputStyle}
            value={this.state.permanentLandmark2.value || undefined}
            onChangeText={(value) => {
              this.setState({
                permanentLandmark2: {
                  value: value,
                },
              });
            }}
            customLabelStyles={{
              colorFocused: colors.COLOR_LIGHT_NAVY_BLUE,
              colorBlurred: colors.COLOR_LIGHT_GREY,
              fontSizeFocused: 15,
              fontSizeBlurred: 15,
            }}
            inputStyles={inputTextStyle}
          />
        </View>
        <View style={separatorInputStyle} />


        <View style={marginTop20}>
          <FloatingLabelInput
            editable={!this.state.isViewOnly}
            maxLength={6}
            label={ADDITIONAL_DETAILS_CONST.PINCODE}
            containerStyles={inputStyle}
            keyboardType={'number-pad'}
            value={this.state.permanentPincode.value || undefined}
            onChangeText={(value) => {
              const valid = PINCODE_REGEX.test(value);

              this.setState(
                {
                  permanentPincode: {
                    value: value,
                    isValid: value !== '' ? valid : true,
                  },
                  permanentCity: '',
                  permanentState: '',
                },
                () => {
                  if (
                    this.state.permanentPincode.value.length === 6 &&
                    this.state.permanentPincode.isValid
                  ) {
                    this.getDataFromPincode(value, 'fromPermanentAddress');
                  }
                },
              );
            }}
            customLabelStyles={{
              colorFocused: colors.COLOR_LIGHT_NAVY_BLUE,
              colorBlurred: colors.COLOR_LIGHT_GREY,
              fontSizeFocused: 15,
              fontSizeBlurred: 15,
            }}
            inputStyles={inputTextStyle}
          />
        </View>
        <View style={separatorInputStyle} />
        {!this.state.permanentPincode.isValid && (
          <Text style={errorLabel}>
            {ADDITIONAL_DETAILS_CONST.PINCODE_VALIDATION}
          </Text>
        )}

        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <View style={{ width: '45%', marginTop: 15 }}>
            <FloatingLabelInput
              label={ADDITIONAL_DETAILS_CONST.CITY}
              containerStyles={inputStyle}
              editable={!this.state.isViewOnly}
              // keyboardType={'numeric'}
              value={this.state.permanentCity || undefined}
              onChangeText={(value) => {
                this.setState({
                  permanentCity: value,
                  permanentCityVerified: NAME_REGEX.test(value)
                });
              }}
              customLabelStyles={{
                colorFocused: colors.COLOR_LIGHT_NAVY_BLUE,
                colorBlurred: colors.COLOR_LIGHT_GREY,
                fontSizeFocused: 15,
                fontSizeBlurred: 15,
              }}
              inputStyles={inputTextStyle}
            />
            <View style={separatorInputStyle} />
            {!this.state.permanentCityVerified && (
              <Text style={{ color: 'red', marginTop: 3, }}>{ADDITIONAL_DETAILS_CONST.INVALID_CITY_NAME}</Text>)}
          </View>

          <View style={{ width: '45%', marginTop: 15 }}>
            <FloatingLabelInput
              label={ADDITIONAL_DETAILS_CONST.STATE}
              containerStyles={inputStyle}
              editable={!this.state.isViewOnly}
              value={this.state.permanentState || undefined}
              onChangeText={(value) => {
                this.setState({
                  permanentState: value,
                  permanentStateVerified: NAME_REGEX.test(value)
                });
              }}
              customLabelStyles={{
                colorFocused: colors.COLOR_LIGHT_NAVY_BLUE,
                colorBlurred: colors.COLOR_LIGHT_GREY,
                fontSizeFocused: 15,
                fontSizeBlurred: 15,
              }}
              inputStyles={inputTextStyle}
            />
            <View style={separatorInputStyle} />
            {!this.state.permanentStateVerified && (
              <Text style={{ color: 'red', marginTop: 3, }}>{ADDITIONAL_DETAILS_CONST.INVALID_STATE_NAME}</Text>)}
          </View>
        </View>

        <View style={{ marginBottom: 15, marginTop: 15 }}>
          <Text style={{
            color: colors.COLOR_LIGHT_NAVY_BLUE,
            fontFamily: APP_FONTS.NunitoRegular,
            fontSize: 16,
            marginLeft: 4
          }}>
            {ADDITIONAL_DETAILS_CONST.OFFICE_TYPE}
          </Text>
          <DropDownPicker
            disabled={this.state.isViewOnly}
            controller={(instance) => (this.controller = instance)}
            items={this.state.dropDownResidentType}
            containerStyle={{ flex: 1, marginTop: 5, marginBottom: 15 }}
            style={{ backgroundColor: '#ffffff', borderWidth: 0 }}
            itemStyle={{
              justifyContent: 'flex-start',
              marginLeft: 4,
            }}
            placeholder={''}
            defaultValue={this.state.residenceType.value}
            dropDownStyle={{ backgroundColor: '#ffffff' }}
            onChangeItem={(item) => {
              this.setState({
                residenceType: {
                  value: item.value || null,
                  label: item.label || null,
                },
              });
            }}
            customArrowUp={() => <Image source={UP_ARROW} />}
            customArrowDown={() => <Image source={DOWN_ARROW} />}
            labelStyle={textStyle}
            selectedLabelStyle={[textStyle, { color: colors.COLOR_BLACK }]}
          />
          <View style={separatorInputStyle} />
        </View>

        <>
          <Text style={[kycDocLabel, { marginTop: 20, fontFamily: APP_FONTS.NunitoBold }]}>
            {ADDITIONAL_DETAILS_CONST.RESIDING_ADDRESS}
          </Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <View style={{ width: '45%', marginTop: 15 }}>
              <FloatingLabelInput
                label={ADDITIONAL_DETAILS_CONST.YEAR}
                containerStyles={inputStyle}
                editable={!this.state.isViewOnly}
                maxLength={2}
                value={this.state.permanentYear == '' ? this.state.permanentYear : this.state.permanentYear.toString()}
                keyboardType='number-pad'
                onChangeText={(value) => {
                  // this?.state?.year.length < 2 ?
                  this.setState({ permanentYear: value, })
                  // :null
                }}
                customLabelStyles={{
                  colorFocused: colors.COLOR_LIGHT_NAVY_BLUE,
                  colorBlurred: colors.COLOR_LIGHT_GREY,
                  fontSizeFocused: 15,
                  fontSizeBlurred: 15,
                }}
                inputStyles={inputTextStyle}
              />
              <View style={separatorInputStyle} />
            </View>
            <View style={{ width: '45%', marginTop: 15 }}>
              <DropDownPicker
                disabled={this.state.isViewOnly}
                controller={(instance) => (this.controllerKYC = instance)}
                items={this.state.dropDownMonth}
                containerStyle={{ marginTop: 15, marginBottom: 10 }}
                style={{ backgroundColor: '#ffffff', borderWidth: 0 }}
                itemStyle={{
                  justifyContent: 'flex-start',
                  marginLeft: 4,
                }}
                defaultValue={this.state.permanentMonth.value}
                placeholder={""}
                // defaultValue={this.state.permanentMonth.value}
                dropDownStyle={{ backgroundColor: '#ffffff' }}
                onChangeItem={(item) => {
                  this.setState({
                    permanentMonth: {
                      value: item.value,
                      label: item.label || null,
                    }
                  });
                }}
                customArrowUp={() => <Image source={UP_ARROW} />}
                customArrowDown={() => <Image source={DOWN_ARROW} />}
                labelStyle={textStyle}
                selectedLabelStyle={[textStyle, { color: colors.COLOR_BLACK }]}
              />
              <Text style={[textStyle, { position: 'absolute', top: 0, marginLeft: 5, color: colors.COLOR_LIGHT_NAVY_BLUE, }]}>
                {ADDITIONAL_DETAILS_CONST.MONTH}
              </Text>
              <View style={separatorInputStyle} />
            </View>
          </View>
        </>
        {/* office save */}
        <Button
          isDisabled={
            // this.state.isPermanentAddressSaved ||
            (this.state.permanentAddress1.value === '' ||
              this.state.permanentPincode.value === '' ||
              !this.state.permanentPincode.isValid ||
              this.state.permanentCity === '' ||
              this.state.permanentCityVerified === false ||
              this.state.permanentStateVerified === false ||
              this.state.permanentState === '' ||
              this.state.permanentLandmark1.value == "" ||
              this.state.residenceType.value == null ||
              this.state.permanentMonth.value == null ||
              this.state.permanentMonth.value == undefined ||
              this.state.permanentYear === '') ||
            this.state.isViewOnly
          }
          title={ADDITIONAL_DETAILS_CONST.BUTTON_TITLE_SAVE}
          onPress={() => {
            const dataToAPI1 = {
              address1: this.state.permanentAddress1.value,
              address2: this.state.permanentAddress2.value,
              landmark1: this.state.permanentLandmark1.value,
              landmark2: this.state.permanentLandmark2.value,
              pinCode: this.state.permanentPincode.value,
              city: this.state.permanentCity,
              state: this.state.permanentState,
              residenceType: this.state.residenceType.value,
              type: 'Permanent',
              sameKycFlag: this.state.isSelected,
              id: this.state.idToEditPermanentAddress,
              permaYear: this.state.permanentYear,
              permaMonth: this.state.permanentMonth.value,
              leadCode: this.state.leadCode,
              ismainapplicant: !(this.state.iscoapplicant || this.state.isguarantor),
              isguarantor: this.state.isguarantor,
              applicantUniqueId:
                this.state.isguarantor || this.state.iscoapplicant
                  ? this.state.coapplicantUniqueId
                  : this.state.applicantUniqueId,
            };

            {
              this.state.imageDataCurrent.front.uri != '' ?
                this.props.saveOfficeAddress({
                  dataToAPI1,
                  callback: (response) => {
                    const dataForgetQDE = {
                      applicant_uniqueid:
                        this.props.navigation.state.params.iscoapplicant || this.props.navigation.state.params.isguarantor
                          ? this.props.navigation.state.params.coapplicantUniqueId
                          : this.props.navigation.state.params.applicantUniqueId,
                      ismainapplicant: this.props.navigation.state.params.ismainapplicant,
                      isguarantor: this.props.navigation.state.params.isguarantor,
                    };
                    this.props.getQDEData({
                      dataForgetQDE,
                      callback: (response) => {
                        this.setState({
                          indSelfSoleFlag: response?.indSelfSoleFlag || false,
                          permanentVisible: response?.actualPermanentAddDetailsFlag || false,
                        }, () => {
                          // this.props.createUpdateCUSTOMER({
                          //   data: {
                          //     applicant_uniqueid: this.state.isguarantor || this.state.iscoapplicant ? this.state.coapplicantUniqueId : this.state.applicantUniqueId,
                          //     ismainapplicant: this.state.ismainapplicant,
                          //     isguarantor: this.state.isguarantor,
                          //   },
                          //   callback: (response) => {
                          //     this.apiCall()
                          //   }
                          // })
                        })


                      }
                    })

                    if (response && !response.error) {
                      this.setState({
                        permanantAddressData: true,
                        additionalDetailOptions: {
                          employementDetailsCollapsed: false,
                          officeAddressCollapsed: true,
                          registeredCollapsed: true,
                          permanentAddressCollapsed: true,
                          additionalContactCollapsed: true,
                        },
                      });

                    }

                  },
                })
                :
                handleError('Please upload the document')

            }
          }}
          customContainerStyle={
            // this.state.isPermanentAddressSaved ||
            (this.state.permanentAddress1.value === '' ||
              this.state.permanentPincode.value === '' ||
              !this.state.permanentPincode.isValid ||
              this.state.permanentCity === '' ||
              this.state.permanentState === '' ||
              this.state.residenceType.value == null ||
              this.state.permanentLandmark1.value == "" ||
              this.state.permanentCityVerified === false ||
              this.state.permanentStateVerified === false ||
              this.state.permanentMonth.value === null ||
              this.state.permanentMonth.value == undefined ||
              this.state.permanentYear === '') || this.state.isViewOnly
              ? disableStyle
              : saveButtonStyle
          }
          cutomTitleStyle={
            // this.state.isPermanentAddressSaved ||
            (this.state.permanentAddress1.value === '' ||
              this.state.permanentPincode.value === '' ||
              !this.state.permanentPincode.isValid ||
              this.state.permanentCity === '' ||
              this.state.permanentState === '' ||
              this.state.residenceType.value == null ||
              this.state.permanentLandmark1.value == "" ||
              this.state.permanentMonth.value == undefined ||
              this.state.permanentCityVerified === false ||
              this.state.permanentStateVerified === false ||
              this.state.permanentMonth.value === null ||
              this.state.permanentYear === '') || this.state.isViewOnly
              ? disableTextStyle
              : saveButtonTitleStyle
          }
        />
      </View>
    );
  }

  renderPermanentResAddr() {
    const {
      residentialAddressContainer,
      inputTextStyle,
      kycDocLabel,
      textStyle,
      textStyle1,
      inputStyle,
      separatorInputStyle,
      saveButtonStyle,
      saveButtonTitleStyle,
      errorLabel,
      marginTop20,
      disableTextStyle,
      disableStyle,
    } = AdditionalDetailsStyles;
    return (
      <View style={residentialAddressContainer}>
        {/* {this.state.residenceFlag == false ? */}
        {this.renderDocument()}
        <View style={{ flexDirection: 'row' }}>
          <CheckBox
            disabled={this.state.isViewOnly}
            value={this.state.sameAsKycAddress}
            tintColors={{ true: colors.COLOR_LIGHT_NAVY_BLUE }}
            onValueChange={() => {
              this.setState({ sameAsKycAddress: !this.state.sameAsKycAddress }, () => {
                this.setState({
                  permanentResAddr1: {
                    value: !this.state.sameAsKycAddress ? "" : this.state.addressLine1.value,
                  },
                  permanentResAddr2: {
                    value: !this.state.sameAsKycAddress ? "" : this.state.addressLine2.value,
                  },
                  permanentResLandmark1: {
                    value: !this.state.sameAsKycAddress ? "" : this.state.landmark1.value,
                  },
                  permanentResLandmark2: {
                    value: !this.state.sameAsKycAddress ? "" : this.state.landmark2.value,
                  },
                  permanentResPincode: {
                    value: !this.state.sameAsKycAddress ? "" : this.state.pincode.value,
                    isValid: !this.state.sameAsKycAddress ? true : this.state.pincode.isValid,
                  },
                  permanentResCity: !this.state.sameAsKycAddress ? "" : this.state.city,
                  permanentResState: !this.state.sameAsKycAddress ? "" : this.state.state,
                  permanentResYear: !this.state.sameAsKycAddress ? "" : this?.state?.year,
                  permanentResMonth: {
                    value: !this.state.sameAsKycAddress ? null : this.state.selectedMonth.value,
                    label: !this.state.sameAsKycAddress ? null : this.state.selectedMonth.label,
                  },
                  permanentResidenceType: {
                    value: !this.state.sameAsKycAddress ? null : this.state.selectedResidentType.value,
                    label: !this.state.sameAsKycAddress ? null : this.state.selectedResidentType.label,
                  },


                })
              })
            }}
            style={{ alignSelf: "center" }}
          />
          <Text style={{ fontSize: FONT_SIZE.m, color: colors.COLOR_LIGHT_NAVY_BLUE, fontFamily: APP_FONTS.NunitoBold, margin: 8 }}>Same as KYC Address?</Text>
        </View>
        {/* : null}  */}

        <FloatingLabelInput
          editable={!this.state.isViewOnly}
          label={ADDITIONAL_DETAILS_CONST.ADDRESS_LINE_1}
          containerStyles={inputStyle}
          value={this.state.permanentResAddr1.value || undefined}
          onChangeText={(value) => {
            this.setState({
              permanentResAddr1: {
                value: value,
              },
            });
          }}
          customLabelStyles={{
            colorFocused: colors.COLOR_LIGHT_NAVY_BLUE,
            colorBlurred: colors.COLOR_LIGHT_GREY,
            fontSizeFocused: 15,
            fontSizeBlurred: 15,
          }}
          inputStyles={inputTextStyle}
        />
        <View style={separatorInputStyle} />

        <View style={marginTop20}>
          <FloatingLabelInput
            editable={!this.state.isViewOnly}
            label={ADDITIONAL_DETAILS_CONST.ADDRESS_LINE_2}
            containerStyles={inputStyle}
            value={this.state.permanentResAddr2.value || undefined}
            onChangeText={(value) => {
              this.setState({
                permanentResAddr2: {
                  value: value,
                },
              });
            }}
            customLabelStyles={{
              colorFocused: colors.COLOR_LIGHT_NAVY_BLUE,
              colorBlurred: colors.COLOR_LIGHT_GREY,
              fontSizeFocused: 15,
              fontSizeBlurred: 15,
            }}
            inputStyles={inputTextStyle}
          />
        </View>
        <View style={separatorInputStyle} />

        <FloatingLabelInput
          editable={!this.state.isViewOnly}
          label={"Landmark 1*"}
          containerStyles={inputStyle}
          value={this.state.permanentResLandmark1.value || undefined}
          onChangeText={(value) => {
            this.setState({
              permanentResLandmark1: {
                value: value,
              },
            });
          }}
          customLabelStyles={{
            colorFocused: colors.COLOR_LIGHT_NAVY_BLUE,
            colorBlurred: colors.COLOR_LIGHT_GREY,
            fontSizeFocused: 15,
            fontSizeBlurred: 15,
          }}
          inputStyles={inputTextStyle}
        />
        <View style={separatorInputStyle} />

        <View style={marginTop20}>
          <FloatingLabelInput
            editable={!this.state.isViewOnly}
            label={"Landmark 2"}
            containerStyles={inputStyle}
            value={this.state.permanentResLandmark2.value || undefined}
            onChangeText={(value) => {
              this.setState({
                permanentResLandmark2: {
                  value: value,
                },
              });
            }}
            customLabelStyles={{
              colorFocused: colors.COLOR_LIGHT_NAVY_BLUE,
              colorBlurred: colors.COLOR_LIGHT_GREY,
              fontSizeFocused: 15,
              fontSizeBlurred: 15,
            }}
            inputStyles={inputTextStyle}
          />
        </View>
        <View style={separatorInputStyle} />


        <View style={marginTop20}>
          <FloatingLabelInput
            editable={!this.state.isViewOnly}
            maxLength={6}
            label={ADDITIONAL_DETAILS_CONST.PINCODE}
            containerStyles={inputStyle}
            keyboardType={'number-pad'}
            value={this.state.permanentResPincode.value || undefined}
            onChangeText={(value) => {
              const valid = PINCODE_REGEX.test(value);

              this.setState(
                {
                  permanentResPincode: {
                    value: value,
                    isValid: value !== '' ? valid : true,
                  },
                  permanentResCity: '',
                  permanentResState: '',
                },
                () => {
                  if (
                    this.state.permanentResPincode.value.length === 6 &&
                    this.state.permanentResPincode.isValid
                  ) {
                    this.getDataFromPincode(value, 'fromPermanentAddress');
                  }
                },
              );
            }}
            customLabelStyles={{
              colorFocused: colors.COLOR_LIGHT_NAVY_BLUE,
              colorBlurred: colors.COLOR_LIGHT_GREY,
              fontSizeFocused: 15,
              fontSizeBlurred: 15,
            }}
            inputStyles={inputTextStyle}
          />
        </View>
        <View style={separatorInputStyle} />
        {!this.state.permanentResPincode.isValid && (
          <Text style={errorLabel}>
            {ADDITIONAL_DETAILS_CONST.PINCODE_VALIDATION}
          </Text>
        )}

        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <View style={{ width: '45%', marginTop: 15 }}>
            <FloatingLabelInput
              label={ADDITIONAL_DETAILS_CONST.CITY}
              containerStyles={inputStyle}
              editable={!this.state.isViewOnly}
              // keyboardType={'numeric'}
              value={this.state.permanentResCity || undefined}
              onChangeText={(value) => {
                this.setState({
                  permanentResCity: value,
                  permanentResCityVerified: NAME_REGEX.test(value)
                });
              }}
              customLabelStyles={{
                colorFocused: colors.COLOR_LIGHT_NAVY_BLUE,
                colorBlurred: colors.COLOR_LIGHT_GREY,
                fontSizeFocused: 15,
                fontSizeBlurred: 15,
              }}
              inputStyles={inputTextStyle}
            />
            <View style={separatorInputStyle} />
            {!this.state.permanentResCityVerified && (
              <Text style={{ color: 'red', marginTop: 3, }}>{ADDITIONAL_DETAILS_CONST.INVALID_CITY_NAME}</Text>)}
          </View>

          <View style={{ width: '45%', marginTop: 15 }}>
            <FloatingLabelInput
              label={ADDITIONAL_DETAILS_CONST.STATE}
              containerStyles={inputStyle}
              editable={!this.state.isViewOnly}
              value={this.state.permanentResState || undefined}
              onChangeText={(value) => {
                this.setState({
                  permanentResState: value,
                  permanentResStateVerified: NAME_REGEX.test(value)
                });
              }}
              customLabelStyles={{
                colorFocused: colors.COLOR_LIGHT_NAVY_BLUE,
                colorBlurred: colors.COLOR_LIGHT_GREY,
                fontSizeFocused: 15,
                fontSizeBlurred: 15,
              }}
              inputStyles={inputTextStyle}
            />
            <View style={separatorInputStyle} />
            {!this.state.permanentResStateVerified && (
              <Text style={{ color: 'red', marginTop: 3, }}>{ADDITIONAL_DETAILS_CONST.INVALID_STATE_NAME}</Text>)}
          </View>
        </View>

        <View style={{ marginBottom: 15, marginTop: 15 }}>
          <Text style={{
            color: colors.COLOR_LIGHT_NAVY_BLUE,
            fontFamily: APP_FONTS.NunitoRegular,
            fontSize: 16,
            marginLeft: 4
          }}>
            {ADDITIONAL_DETAILS_CONST.OFFICE_TYPE}
          </Text>
          <DropDownPicker
            disabled={this.state.isViewOnly}
            controller={(instance) => (this.controller = instance)}
            items={this.state.dropdownKyc}
            containerStyle={{ flex: 1, marginTop: 5, marginBottom: 15 }}
            style={{ backgroundColor: '#ffffff', borderWidth: 0 }}
            itemStyle={{
              justifyContent: 'flex-start',
              marginLeft: 4,
            }}
            placeholder={''}
            defaultValue={this.state.permanentResidenceType.value}
            dropDownStyle={{ backgroundColor: '#ffffff' }}
            onChangeItem={(item) => {
              this.setState({
                permanentResidenceType: {
                  value: item.value || null,
                  label: item.label || null,
                },
              });
            }}
            customArrowUp={() => <Image source={UP_ARROW} />}
            customArrowDown={() => <Image source={DOWN_ARROW} />}
            labelStyle={textStyle}
            selectedLabelStyle={[textStyle, { color: colors.COLOR_BLACK }]}
          />
          <View style={separatorInputStyle} />
        </View>

        <>
          <Text style={[kycDocLabel, { marginTop: 20, fontFamily: APP_FONTS.NunitoBold }]}>
            {ADDITIONAL_DETAILS_CONST.RESIDING_ADDRESS}
          </Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <View style={{ width: '45%', marginTop: 15 }}>
              <FloatingLabelInput
                label={ADDITIONAL_DETAILS_CONST.YEAR}
                containerStyles={inputStyle}
                editable={!this.state.isViewOnly}
                maxLength={2}
                value={this?.state?.permanentResYear?.toString()}
                keyboardType='number-pad'
                onChangeText={(value) => {
                  // this?.state?.year.length < 2 ?
                  this.setState({ permanentResYear: value, })
                  // :null
                }}
                customLabelStyles={{
                  colorFocused: colors.COLOR_LIGHT_NAVY_BLUE,
                  colorBlurred: colors.COLOR_LIGHT_GREY,
                  fontSizeFocused: 15,
                  fontSizeBlurred: 15,
                }}
                inputStyles={inputTextStyle}
              />
              <View style={separatorInputStyle} />
            </View>
            <View style={{ width: '45%', marginTop: 15 }}>
              <DropDownPicker
                disabled={this.state.isViewOnly}
                controller={(instance) => (this.controllerKYC = instance)}
                items={this?.state?.dropDownMonth}
                containerStyle={{ marginTop: 15, marginBottom: 10 }}
                style={{ backgroundColor: '#ffffff', borderWidth: 0 }}
                itemStyle={{
                  justifyContent: 'flex-start',
                  marginLeft: 4,
                }}
                defaultValue={this?.state?.permanentResMonth?.value}
                placeholder={""}
                dropDownStyle={{ backgroundColor: '#ffffff' }}
                onChangeItem={(item) => {
                  this.setState({
                    permanentResMonth: {
                      value: item.value,
                      label: item.label || null,
                    }
                  });
                }}
                customArrowUp={() => <Image source={UP_ARROW} />}
                customArrowDown={() => <Image source={DOWN_ARROW} />}
                labelStyle={textStyle}
                selectedLabelStyle={[textStyle, { color: colors.COLOR_BLACK }]}
              />
              <Text style={[textStyle, { position: 'absolute', top: 0, marginLeft: 5, color: colors.COLOR_LIGHT_NAVY_BLUE, }]}>
                {ADDITIONAL_DETAILS_CONST.MONTH}
              </Text>
              <View style={separatorInputStyle} />
            </View>
          </View>
        </>

        {/* office save */}
        <Button
          isDisabled={
            // this.state.isPermanentAddressSaved ||
            (this.state.permanentResAddr1.value === '' ||
              this.state.permanentResPincode.value === '' ||
              !this.state.permanentResPincode.isValid ||
              this.state.permanentResCity === '' ||
              this.state.permanentResCityVerified === false ||
              this.state.permanentResStateVerified === false ||
              this.state.permanentResState === '' ||
              this.state.permanentResLandmark1.value == "" ||
              this.state.permanentResidenceType.value == null ||
              this.state.permanentResMonth.value == null ||
              this.state.permanentResMonth.value == undefined ||
              this.state.permanentResYear === '') ||
            this.state.isViewOnly
          }
          title={ADDITIONAL_DETAILS_CONST.BUTTON_TITLE_SAVE}
          onPress={() => {
            const dataToAPI = {
              permanentAddress1: this.state.permanentResAddr1.value,
              permanentAddress2: this.state.permanentResAddr2.value,
              permanentPinCode: this.state.permanentResPincode.value,
              permanentCity: this.state.permanentResCity,
              permanentState: this.state.permanentResState,
              permanentResidenceType: this.state.permanentResidenceType.value,
              permanentAddressLandmark1: this.state.permanentResLandmark1.value,
              permanentAddressLandmark2: this.state.permanentResLandmark2.value,
              sameAsKycAddress: this.state.sameAsKycAddress,
              id: this.state.idToEditPermResAddress,
              permanentYear: this.state.permanentResYear,
              permanentMonth: this.state.permanentResMonth.value,
              leadCode: this.state.leadCode,
              filePath: this.state.imageDataPermanent.front.uri,
              ismainapplicant: !(this.state.iscoapplicant || this.state.isguarantor),
              isguarantor: this.state.isguarantor,
              applicantUniqueId:
                this.state.isguarantor || this.state.iscoapplicant
                  ? this.state.coapplicantUniqueId
                  : this.state.applicantUniqueId,
            };
            {
              this.state.imageDataPermanent.front.uri != '' ?
                this.props.savePermanentDetails({
                  dataToAPI,
                  callback: (response) => {
                    if (response && !response.error) {
                      this.setState({
                        permanantResiAddressData: true,
                        additionalDetailOptions: {
                          employementDetailsCollapsed: false,
                          officeAddressCollapsed: true,
                          registeredCollapsed: true,
                          permanentAddressCollapsed: true,
                          additionalContactCollapsed: true,
                        },
                      });

                    }
                  },
                })
                :
                handleError("Please Upload Document")
            }

          }}
          customContainerStyle={
            // this.state.isPermanentAddressSaved ||
            (this.state.permanentResAddr1.value === '' ||
              this.state.permanentResPincode.value === '' ||
              !this.state.permanentResPincode.isValid ||
              this.state.permanentResCity === '' ||
              this.state.permanentResState === '' ||
              this.state.permanentResidenceType.value == null ||
              this.state.permanentResLandmark1.value == "" ||
              // this.state.permanentCityVerified === false ||
              // this.state.permanentStateVerified === false ||
              this.state.permanentResMonth.value === null ||
              this.state.permanentResMonth.value == undefined ||
              this.state.permanentResYear === '') || this.state.isViewOnly
              ? disableStyle
              : saveButtonStyle
          }
          cutomTitleStyle={
            // this.state.isPermanentAddressSaved ||
            (this.state.permanentResAddr1.value === '' ||
              this.state.permanentResPincode.value === '' ||
              !this.state.permanentResPincode.isValid ||
              this.state.permanentResCity === '' ||
              this.state.permanentResState === '' ||
              this.state.permanentResidenceType.value == null ||
              this.state.permanentResLandmark1.value == "" ||
              this.state.permanentResMonth.value == undefined ||
              // this.state.permanentCityVerified === false ||
              // this.state.permanentStateVerified === false ||
              this.state.permanentResMonth.value === null ||
              this.state.permanentResYear === '') || this.state.isViewOnly
              ? disableTextStyle
              : saveButtonTitleStyle
          }
        />
      </View>
    );
  }

  renderOfficeAddress() {
    const {
      residentialAddressContainer,
      kycDocLabel,
      residentialAddressLabel,
      inputTextStyle,
      inputStyle,
      separatorInputStyle,
      textStyle,
      saveButtonStyle,
      saveButtonTitleStyle,
      errorLabel,
      marginTop20,
      disableStyle,
      disableTextStyle,
    } = AdditionalDetailsStyles;

    return (
      <View style={residentialAddressContainer}>
        {/* {this.state.indSelfSoleFlag &&

          <View style={{ flexDirection: 'row' }}>
            <CheckBox
              disabled={this.state.isViewOnly}
              value={this.state.isSelected1}
              tintColors={{ true: colors.COLOR_LIGHT_NAVY_BLUE }}
              onValueChange={() => {
                if (this.state.indSelfSoleFlag) {
                  this.setState({ isSelected1: !this.state.isSelected1 }, () => {
                    this.setState({
                      officeAddress1: {
                        value: !this.state.isSelected1 ? "" : this.state.addressLine1.value,
                      },
                      officeAddress2: {
                        value: !this.state.isSelected1 ? "" : this.state.addressLine2.value,
                      },
                      officeLandmark1: {
                        value: !this.state.isSelected1 ? "" : this.state.landmark1.value,
                      },
                      officeLandmark2: {
                        value: !this.state.isSelected1 ? "" : this.state.landmark2.value,
                      },
                      officePincode: {
                        value: !this.state.isSelected1 ? "" : this.state.pincode.value,
                        isValid: !this.state.isSelected1 ? true : this.state.pincode.isValid,
                      },
                      officeCity: !this.state.isSelected1 ? "" : this.state.city,
                      officeState: !this.state.isSelected1 ? "" : this.state.state,
                      officeYear: !this.state.isSelected1 ? "" : this?.state?.year,
                      officeMonth: {
                        value: !this.state.isSelected1 ? null : this.state.selectedMonth.value,
                        label: !this.state.isSelected1 ? null : this.state.selectedMonth.label,
                      },
                      selectedOfficeType: {
                        value: !this.state.isSelected1 ? null : this.state.selectedResidentType.value,
                        label: !this.state.isSelected1 ? null : this.state.selectedResidentType.label,
                      }
                    })
                  })
                }
              }}
              style={{ alignSelf: "center" }}
            />
            <Text style={{ fontSize: FONT_SIZE.m, color: colors.COLOR_LIGHT_NAVY_BLUE, fontFamily: APP_FONTS.NunitoBold, margin: 5 }}>Same as Registered Address?</Text>
          </View>
        } */}
        {this.renderCurrentDocument()}

        <FloatingLabelInput
          editable={!this.state.isViewOnly}
          label={ADDITIONAL_DETAILS_CONST.ADDRESS_LINE_1}
          containerStyles={inputStyle}
          value={this.state.officeAddress1.value || undefined}
          onChangeText={(value) => {
            this.setState({
              officeAddress1: {
                value: value,
              },
            });

          }}
          customLabelStyles={{
            colorFocused: colors.COLOR_LIGHT_NAVY_BLUE,
            colorBlurred: colors.COLOR_LIGHT_GREY,
            fontSizeFocused: 15,
            fontSizeBlurred: 15,
          }}
          inputStyles={inputTextStyle}
        />
        <View style={separatorInputStyle} />

        <View style={marginTop20}>
          <FloatingLabelInput
            editable={!this.state.isViewOnly}
            label={ADDITIONAL_DETAILS_CONST.ADDRESS_LINE_2}
            containerStyles={inputStyle}
            value={this.state.officeAddress2.value || undefined}
            onChangeText={(value) => {
              this.setState({
                officeAddress2: {
                  value: value,
                },
              });

            }}
            customLabelStyles={{
              colorFocused: colors.COLOR_LIGHT_NAVY_BLUE,
              colorBlurred: colors.COLOR_LIGHT_GREY,
              fontSizeFocused: 15,
              fontSizeBlurred: 15,
            }}
            inputStyles={inputTextStyle}
          />
        </View>
        <View style={separatorInputStyle} />

        <FloatingLabelInput
          editable={!this.state.isViewOnly}
          label={"Landmark 1*"}
          containerStyles={inputStyle}
          value={this.state.officeLandmark1.value || undefined}
          onChangeText={(value) => {
            this.setState({
              officeLandmark1: {
                value: value,
              },
            });

          }}
          customLabelStyles={{
            colorFocused: colors.COLOR_LIGHT_NAVY_BLUE,
            colorBlurred: colors.COLOR_LIGHT_GREY,
            fontSizeFocused: 15,
            fontSizeBlurred: 15,
          }}
          inputStyles={inputTextStyle}
        />
        <View style={separatorInputStyle} />

        <View style={marginTop20}>
          <FloatingLabelInput
            editable={!this.state.isViewOnly}
            label={"Landmark 2"}
            containerStyles={inputStyle}
            value={this.state.officeLandmark2.value || undefined}
            onChangeText={(value) => {
              this.setState({
                officeLandmark2: {
                  value: value,
                },
              });
            }}
            customLabelStyles={{
              colorFocused: colors.COLOR_LIGHT_NAVY_BLUE,
              colorBlurred: colors.COLOR_LIGHT_GREY,
              fontSizeFocused: 15,
              fontSizeBlurred: 15,
            }}
            inputStyles={inputTextStyle}
          />
        </View>
        <View style={separatorInputStyle} />

        <View style={marginTop20}>
          <FloatingLabelInput
            maxLength={6}
            editable={!this.state.isViewOnly}
            label={ADDITIONAL_DETAILS_CONST.PINCODE}
            containerStyles={inputStyle}
            keyboardType={'numeric'}
            value={this.state.officePincode.value || undefined}
            onChangeText={(value) => {
              const valid = PINCODE_REGEX.test(value);

              this.setState(
                {
                  officePincode: {
                    value: value,
                    isValid: value !== '' ? valid : true,
                  },
                  officeCity: '',
                  officeState: '',
                },
                () => {
                  if (
                    this.state.officePincode.value.length === 6 &&
                    this.state.officePincode.isValid
                  ) {
                    this.getDataFromPincode(value, 'fromOfficeAddress');
                  }
                },
              );

            }}
            customLabelStyles={{
              colorFocused: colors.COLOR_LIGHT_NAVY_BLUE,
              colorBlurred: colors.COLOR_LIGHT_GREY,
              fontSizeFocused: 15,
              fontSizeBlurred: 15,
            }}
            inputStyles={inputTextStyle}
          />
        </View>
        <View style={separatorInputStyle} />
        {!this.state.officePincode.isValid && (
          <Text style={errorLabel}>
            {ADDITIONAL_DETAILS_CONST.PINCODE_VALIDATION}
          </Text>
        )}

        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <View style={{ width: '45%', marginTop: 15 }}>
            <FloatingLabelInput
              label={ADDITIONAL_DETAILS_CONST.CITY}
              editable={!this.state.isViewOnly}
              containerStyles={inputStyle}
              value={this.state.officeCity || undefined}
              onChangeText={(value) => {
                this.setState({
                  officeCity: value,
                  officeCityVerified: NAME_REGEX.test(value)
                });
              }}
              customLabelStyles={{
                colorFocused: colors.COLOR_LIGHT_NAVY_BLUE,
                colorBlurred: colors.COLOR_LIGHT_GREY,
                fontSizeFocused: 15,
                fontSizeBlurred: 15,
              }}
              inputStyles={inputTextStyle}
            />
            <View style={separatorInputStyle} />
            {!this.state.officeCityVerified && (
              <Text style={{ color: 'red', marginTop: 3, }}>{ADDITIONAL_DETAILS_CONST.INVALID_CITY_NAME}</Text>)}
          </View>
          <View style={{ width: '45%', marginTop: 15 }}>
            <FloatingLabelInput
              editable={!this.state.isViewOnly}
              label={ADDITIONAL_DETAILS_CONST.STATE}
              containerStyles={inputStyle}
              value={this.state.officeState || undefined}
              onChangeText={(value) => {
                this.setState({
                  officeState: value,
                  officeStateVerified: NAME_REGEX.test(value)
                });
              }}
              customLabelStyles={{
                colorFocused: colors.COLOR_LIGHT_NAVY_BLUE,
                colorBlurred: colors.COLOR_LIGHT_GREY,
                fontSizeFocused: 15,
                fontSizeBlurred: 15,
              }}
              inputStyles={inputTextStyle}
            />
            <View style={separatorInputStyle} />
            {!this.state.officeStateVerified && (
              <Text style={{ color: 'red', marginTop: 3, }}>{ADDITIONAL_DETAILS_CONST.INVALID_STATE_NAME}</Text>)}
          </View>
        </View>
        {this.state.indSelfSoleFlag &&
          <View>
            <View style={{ marginBottom: 10, marginTop: 15 }}>
              <Text style={{
                color: colors.COLOR_LIGHT_NAVY_BLUE,
                fontFamily: APP_FONTS.NunitoRegular,
                fontSize: 16,
                marginLeft: 4
              }}>
                {this.state.indSelfSoleFlag ? ADDITIONAL_DETAILS_CONST.OFFICE_TYPE : ADDITIONAL_DETAILS_CONST.RESIDENT_TYPE}
              </Text>
              <DropDownPicker
                disabled={this.state.isViewOnly}
                items={this.state.dropDownResidentType}
                defaultValue={this.state.selectedOfficeType.value}
                placeholder={''}
                controller={(instance) => (this.controllerKYC = instance)}
                containerStyle={{ flex: 1, marginTop: 5, marginBottom: 15 }}
                style={{ backgroundColor: '#ffffff', borderWidth: 0 }}
                itemStyle={{
                  justifyContent: 'flex-start',
                  marginLeft: 4,
                }}

                dropDownStyle={{ backgroundColor: '#ffffff' }}
                onChangeItem={(item) => {
                  this.setState({
                    residenceFlag: item.value == 'PG' || item.value == "Corporate Provided" ? false : true,
                    isSelected: false,
                    selectedOfficeType: {
                      value: item.value || null,
                      label: item.label || null,
                    },
                  });

                }}
                customArrowUp={() => <Image source={UP_ARROW} />}
                customArrowDown={() => <Image source={DOWN_ARROW} />}
                labelStyle={textStyle}
                selectedLabelStyle={[textStyle, { color: colors.COLOR_BLACK }]}
              />
              <View style={separatorInputStyle} />
            </View>
            <>
              <Text style={[kycDocLabel, { marginTop: 20, fontFamily: APP_FONTS.NunitoBold }]}>
                {this.state.indSelfSoleFlag ? ADDITIONAL_DETAILS_CONST.BUSINESS_ADDRESS : ADDITIONAL_DETAILS_CONST.RESIDING_ADDRESS}

              </Text>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <View style={{ width: '45%', marginTop: 15 }}>
                  <FloatingLabelInput
                    label={ADDITIONAL_DETAILS_CONST.YEAR}
                    containerStyles={inputStyle}
                    editable={!this.state.isViewOnly}
                    maxLength={2}
                    value={this.state.officeYear == '' ? this.state.officeYear : this.state.officeYear.toString()}
                    keyboardType='number-pad'
                    onChangeText={(value) => {
                      // this?.state?.year.length < 2 ?
                      this.setState({ officeYear: value, })

                      // :null
                    }}
                    customLabelStyles={{
                      colorFocused: colors.COLOR_LIGHT_NAVY_BLUE,
                      colorBlurred: colors.COLOR_LIGHT_GREY,
                      fontSizeFocused: 15,
                      fontSizeBlurred: 15,
                    }}
                    inputStyles={inputTextStyle}
                  />
                  <View style={separatorInputStyle} />
                </View>
                <View style={{ width: '45%', marginTop: 15 }}>
                  <DropDownPicker
                    disabled={this.state.isViewOnly}
                    controller={(instance) => (this.controllerKYC = instance)}
                    items={this.state.dropDownMonth}
                    containerStyle={{ marginTop: 15, marginBottom: 10 }}
                    style={{ backgroundColor: '#ffffff', borderWidth: 0 }}
                    itemStyle={{
                      justifyContent: 'flex-start',
                      marginLeft: 4,
                    }}
                    defaultValue={this.state.officeMonth.value}
                    placeholder={""}
                    // defaultValue={this.state.permanentMonth.value}
                    dropDownStyle={{ backgroundColor: '#ffffff' }}
                    onChangeItem={(item) => {

                      this.setState({
                        officeMonth: {
                          value: item.value,
                          label: item.label || null,
                        }
                      });

                    }}
                    customArrowUp={() => <Image source={UP_ARROW} />}
                    customArrowDown={() => <Image source={DOWN_ARROW} />}
                    labelStyle={textStyle}
                    selectedLabelStyle={[textStyle, { color: colors.COLOR_BLACK }]}
                  />
                  <Text style={[textStyle, { position: 'absolute', top: 0, marginLeft: 5, color: colors.COLOR_LIGHT_NAVY_BLUE, }]}>
                    {ADDITIONAL_DETAILS_CONST.MONTH}
                  </Text>
                  <View style={separatorInputStyle} />
                </View>
              </View>
            </>
          </View>
        }
        <Button
          isDisabled={
            // this.state.isOfficeAddressSaved ||
            this.getOfficeSave() || this.state.isViewOnly
          }
          title={ADDITIONAL_DETAILS_CONST.BUTTON_TITLE_SAVE}
          onPress={() => {
            const dataToAPI1 = {
              officeData: true,
              address1: this.state.officeAddress1.value,
              address2: this.state.officeAddress2.value,
              landmark1: this.state.officeLandmark1.value,
              landmark2: this.state.officeLandmark2.value,
              pinCode: this.state.officePincode.value,
              city: this.state.officeCity,
              state: this.state.officeState,
              type:
                // this.state.indSelfSoleFlag ?
                'Current office',
              //  : 'Office',
              ismainapplicant: !(this.state.iscoapplicant || this.state.isguarantor),
              isguarantor: this.state.isguarantor,
              applicantUniqueId:
                this.state.isguarantor || this.state.iscoapplicant
                  ? this.state.coapplicantUniqueId
                  : this.state.applicantUniqueId,
              id: this.state.idToEditOfficeAddress,
            };
            if (this.state.indSelfSoleFlag === true) {
              dataToAPI1['officeMonth'] = this.state.officeMonth.value,
                dataToAPI1['officeType'] = this.state.selectedOfficeType.value,
                dataToAPI1['officeYear'] = this.state.officeYear,
                dataToAPI1['sameRegisteredAddressFlag'] = this.state.isSelected1,
                dataToAPI1['gstAddressFlag'] = true

            }
            {
              this.state.imageDataCurrent.front.uri != '' ?
                this.props.saveOfficeAddress({
                  dataToAPI1,
                  callback: (response) => {
                    const dataForgetQDE = {
                      applicant_uniqueid:
                        this.props.navigation.state.params.iscoapplicant || this.props.navigation.state.params.isguarantor
                          ? this.props.navigation.state.params.coapplicantUniqueId
                          : this.props.navigation.state.params.applicantUniqueId,
                      ismainapplicant: this.props.navigation.state.params.ismainapplicant,
                      isguarantor: this.props.navigation.state.params.isguarantor,
                    };
                    this.props.getQDEData({
                      dataForgetQDE,
                      callback: (response) => {

                        this.setState({
                          indSelfSoleFlag: response?.indSelfSoleFlag || false,
                          permanentVisible: response?.actualPermanentAddDetailsFlag || false,
                        })
                      }
                    })
                    if (response && !response.error) {
                      this.setState({
                        isOfficeAddressSaved: true,
                        officeData: true,
                        additionalDetailOptions: {
                          employementDetailsCollapsed: true,
                          officeAddressCollapsed: true,
                          registeredCollapsed: true,
                          permanentAddressCollapsed: true,
                          additionalContactCollapsed: false,
                        },
                      });
                    }
                  },
                })
                :
                handleError('Please upload the document')
            }

          }}
          customContainerStyle={
            // this.state.isOfficeAddressSaved ||
            this.getOfficeSave() || this.state.isViewOnly
              ? disableStyle
              : saveButtonStyle
          }
          cutomTitleStyle={
            // this.state.isOfficeAddressSaved ||
            this.getOfficeSave() || this.state.isViewOnly
              ? disableTextStyle
              : saveButtonTitleStyle
          }
        />
      </View>
    );
  }

  renderEmployementDetails() {
    const {
      residentialAddressContainer,
      inputTextStyle,
      inputStyle,
      inputStyle1,
      textInputStyle,
      separatorInputStyle,
      textStyle,
      textStyle1,
      saveButtonStyle,
      separatorStyle,
      saveButtonTitleStyle,
      errorLabel,
      marginTop20,
      disableTextStyle,
      disableStyle,
      kycDocLabel
    } = AdditionalDetailsStyles;

    return (
      <View style={residentialAddressContainer}>

        {/* <View
          style={{
            ...(Platform.OS !== 'android' && {
              zIndex: 10,
            }),
          }}>
          <Text style={[textStyle, { marginLeft: 5, color: colors.COLOR_LIGHT_NAVY_BLUE }]}>
            {'Profession/ Occupation*'}
          </Text>
          <DropDownPicker
            disabled={this.state.isViewOnly}
            items={this.state.professionList}
            containerStyle={{ flex: 1, marginTop: 5, marginBottom: 15 }}
            style={{ backgroundColor: '#ffffff', borderWidth: 0 }}
            itemStyle={{
              justifyContent: 'flex-start',
              marginLeft: 4,
            }}
            placeholder={''}
            defaultValue={this.state.selectedProfession.value}
            dropDownStyle={{ backgroundColor: '#ffffff' }}
            onChangeItem={(item) => {
              this.setState({
                selectedProfession:
                {
                  value: item.value || null,
                  label: item.label || null,
                }
              }, () => {
                this.props.getSubCategoryList({
                  dataToAPI: {
                    profession: this.state.selectedProfession.value,
                  },
                  callback: (response) => {
                    const subCategory = response.data.map((value) => (
                      {
                        value: value.subCategory,
                        label: value.subCategory,
                      }));

                    this.setState({
                      subCategoryList: subCategory || [],
                      selectedsubCategory: {
                        value: null,
                        label: null,
                      },
                      selectedDesignation: {
                        value: null,
                        label: null,
                      },
                      query: '',
                      companyName: ''
                    });

                  }
                })
              });
            }}
            customArrowUp={() => <Image source={UP_ARROW} />}
            customArrowDown={() => <Image source={DOWN_ARROW} />}
            labelStyle={textStyle}
            selectedLabelStyle={[textStyle, { color: colors.COLOR_BLACK }]}
          />
          <View style={[separatorInputStyle, {}]} />
        </View> */}

        <View style={marginTop20}>
          <FloatingLabelInput
            editable={!this.state.isViewOnly}
            label={'Profession/ Occupation*'}
            containerStyles={inputStyle}
            value={this.state.selectedProfession.value || undefined}
            onChangeText={(value) => {
              
              this.setState({
                selectedProfession:
                {
                  value: value || null,
                  label: value || null,
                }
              });
            }}
            customLabelStyles={{
              colorFocused: colors.COLOR_LIGHT_NAVY_BLUE,
              colorBlurred: colors.COLOR_LIGHT_GREY,
              fontSizeFocused: 15,
              fontSizeBlurred: 15,
            }}
            inputStyles={inputTextStyle}
          />
        </View>
        <View style={separatorInputStyle} />

        {/* <View
          style={{
            ...(Platform.OS !== 'android' && {
              zIndex: 10,
            }),
          }}>
          <Text style={[textStyle, { marginTop: 15, marginLeft: 5, color: colors.COLOR_LIGHT_NAVY_BLUE }]}>
            {"Sub Category*"}
          </Text>
          <DropDownPicker
            disabled={this.state.isViewOnly}
            items={this.state.subCategoryList}
            containerStyle={{ flex: 1, marginTop: 5, marginBottom: 15 }}
            style={{ backgroundColor: '#ffffff', borderWidth: 0 }}
            itemStyle={{
              justifyContent: 'flex-start',
              marginLeft: 4,
            }}
            placeholder={''}
            defaultValue={this.state.selectedsubCategory.value}
            dropDownStyle={{ backgroundColor: '#ffffff' }}
            onChangeItem={(item) => {
              this.setState({
                selectedsubCategory:
                {
                  value: item.value || null,
                  label: item.label || null,
                }
              }, () => {
                this.props.getDesignations({
                  dataToAPI: {
                    subCategory: this.state.selectedsubCategory.value,
                    profession: this.state.selectedProfession.value,

                  },
                  callback: (response) => {
                    const subCategory = response.data.map((value) => (
                      {
                        value: value.designation,
                        label: value.designation,
                        id: value.id
                      }));
                    this.setState({
                      designationList: subCategory || [],
                      selectedDesignation: {
                        value: null,
                        label: null,
                      },
                      query: '',
                      companyName: ''
                    });

                  }
                })
              });
            }}
            customArrowUp={() => <Image source={UP_ARROW} />}
            customArrowDown={() => <Image source={DOWN_ARROW} />}
            labelStyle={textStyle}
            selectedLabelStyle={[textStyle, { color: colors.COLOR_BLACK }]}
          />
          <View style={separatorInputStyle} />
        </View> */}

        <View style={marginTop20}>
          <FloatingLabelInput
            editable={!this.state.isViewOnly}
            label={'Sub Category*'}
            containerStyles={inputStyle}
            value={this.state.selectedsubCategory.value || undefined}
            onChangeText={(value) => {
              
              this.setState({
                selectedsubCategory:
                {
                  value: value || null,
                  label: value || null,
                }
              });
            }}
            customLabelStyles={{
              colorFocused: colors.COLOR_LIGHT_NAVY_BLUE,
              colorBlurred: colors.COLOR_LIGHT_GREY,
              fontSizeFocused: 15,
              fontSizeBlurred: 15,
            }}
            inputStyles={inputTextStyle}
          />
        </View>
        <View style={separatorInputStyle} />

        {/* <View
          style={{
            ...(Platform.OS !== 'android' && {
              zIndex: 10,
            }),
          }}>
          <Text style={[textStyle, { marginTop: 15, marginLeft: 5, color: colors.COLOR_LIGHT_NAVY_BLUE }]}>
            {ADDITIONAL_DETAILS_CONST.DESIGNATION}
          </Text>
          <DropDownPicker
            disabled={this.state.isViewOnly}
            items={this.state.designationList}
            containerStyle={{ flex: 1, marginTop: 5, marginBottom: 15 }}
            style={{ backgroundColor: '#ffffff', borderWidth: 0 }}
            itemStyle={{
              justifyContent: 'flex-start',
              marginLeft: 4,
            }}
            placeholder={''}
            defaultValue={this.state.selectedDesignation.value}
            dropDownStyle={{ backgroundColor: '#ffffff' }}
            onChangeItem={(item) => {
              this.setState({
                selectedDesignation:
                {
                  value: item.value || null,
                  label: item.label || null,
                },
                query: '',
                companyName: ''
              });
            }}
            customArrowUp={() => <Image source={UP_ARROW} />}
            customArrowDown={() => <Image source={DOWN_ARROW} />}
            labelStyle={textStyle}
            selectedLabelStyle={[textStyle, { color: colors.COLOR_BLACK }]}
          />
          <View style={separatorInputStyle} />
        </View> */}

        <View style={marginTop20}>
          <FloatingLabelInput
            editable={!this.state.isViewOnly}
            label={ADDITIONAL_DETAILS_CONST.DESIGNATION}
            containerStyles={inputStyle}
            value={this.state.selectedDesignation.value || undefined}
            onChangeText={(value) => {
              
              this.setState({
                selectedDesignation:
                {
                  value: value || null,
                  label: value || null,
                }
              });
            }}
            customLabelStyles={{
              colorFocused: colors.COLOR_LIGHT_NAVY_BLUE,
              colorBlurred: colors.COLOR_LIGHT_GREY,
              fontSizeFocused: 15,
              fontSizeBlurred: 15,
            }}
            inputStyles={inputTextStyle}
          />
        </View>
        <View style={separatorInputStyle} />


        <View style={marginTop20}>
          <FloatingLabelInput
            editable={!this.state.isViewOnly}
            label={'Company Name*'}
            containerStyles={inputStyle}
            value={this.state.companyName || undefined}
            onChangeText={(value) => {
              this.setState({
                companyName: value,
              });
            }}
            customLabelStyles={{
              colorFocused: colors.COLOR_LIGHT_NAVY_BLUE,
              colorBlurred: colors.COLOR_LIGHT_GREY,
              fontSizeFocused: 15,
              fontSizeBlurred: 15,
            }}
            inputStyles={inputTextStyle}
          />
        </View>
        <View style={separatorInputStyle} />

        {/* <View
          style={{
            marginTop: 20,
            ...(Platform.OS !== 'android' && {
              zIndex: 10,
            }),
          }}>
          <Text style={[textStyle, { marginLeft: 5, color: colors.COLOR_LIGHT_NAVY_BLUE }]}>
            {ADDITIONAL_DETAILS_CONST.COMPANY_TYPE}
          </Text>
          <DropDownPicker
            disabled={this.state.isViewOnly}
            items={this.state.companyTypeList}
            containerStyle={{ flex: 1, marginTop: 5, marginBottom: 15 }}
            style={{ backgroundColor: '#ffffff', borderWidth: 0 }}
            itemStyle={{
              justifyContent: 'flex-start',
              marginLeft: 4,
            }}
            placeholder={''}
            defaultValue={this.state.selectedCompanyType.value}
            dropDownStyle={{ backgroundColor: '#ffffff' }}
            onChangeItem={(item) => {
              this.setState({
                selectedCompanyType:
                {
                  value: item.value || null,
                  label: item.label || null,
                }
              });
            }}
            customArrowUp={() => <Image source={UP_ARROW} />}
            customArrowDown={() => <Image source={DOWN_ARROW} />}
            labelStyle={textStyle}
            selectedLabelStyle={[textStyle, { color: colors.COLOR_BLACK }]}
          />
          <View style={separatorInputStyle} />
        </View>

        <View
          style={{
            marginTop: 20,
            ...(Platform.OS !== 'android' && {
              zIndex: 10,
            }),
          }}>
          <Text style={[textStyle, { marginLeft: 5, color: colors.COLOR_LIGHT_NAVY_BLUE }]}>
            {ADDITIONAL_DETAILS_CONST.INDUSTRY}
          </Text>
          <DropDownPicker
            disabled={this.state.isViewOnly}
            items={this.state.industryList}
            containerStyle={{ flex: 1, marginTop: 5, marginBottom: 15 }}
            style={{ backgroundColor: '#ffffff', borderWidth: 0 }}
            itemStyle={{
              justifyContent: 'flex-start',
              marginLeft: 4,
            }}
            defaultValue={this.state.selectedIndustry.value}
            placeholder={""}
            dropDownStyle={{ backgroundColor: '#ffffff' }}
            onChangeItem={(item) => {
              this.setState({
                selectedIndustry:
                {
                  value: item.value || null,
                  label: item.label || null,
                },
                otherIndustry: '',
              });
            }}
            customArrowUp={() => <Image source={UP_ARROW} />}
            customArrowDown={() => <Image source={DOWN_ARROW} />}
            labelStyle={textStyle}
            selectedLabelStyle={[textStyle, { color: colors.COLOR_BLACK }]}
          />
          <View style={separatorInputStyle} />
        </View> */}
        {/* {
          this.state.selectedIndustry.value == 'Others' ?
            <>
              <View style={marginTop20}>
                <FloatingLabelInput
                  editable={!this.state.isViewOnly}
                  label={ADDITIONAL_DETAILS_CONST.OTHER_INDUSTRY_NAME}
                  containerStyles={inputStyle}
                  value={this.state.otherIndustry || undefined}
                  onChangeText={(value) => {
                    this.setState({
                      otherIndustry: value,
                    });
                  }}
                  customLabelStyles={{
                    colorFocused: colors.COLOR_LIGHT_NAVY_BLUE,
                    colorBlurred: colors.COLOR_LIGHT_GREY,
                    fontSizeFocused: 15,
                    fontSizeBlurred: 15,
                  }}
                  inputStyles={inputTextStyle}
                />
              </View>
              <View style={separatorInputStyle} />
            </>
            : null
        } */}
        <View style={marginTop20}>
          <FloatingLabelInput
            editable={!this.state.isViewOnly}
            label={ADDITIONAL_DETAILS_CONST.PLACEHOLDER_EMAIL}
            containerStyles={inputStyle}
            value={this.state.empEmail.value || undefined}
            onChangeText={(text) => {
              this.setState(
                {
                  empEmail: {
                    ...this.state.empEmail,
                    value: text,
                  },
                },
                () => {
                  this.isemailAddress(this.state.empEmail.value);
                },
              );
            }}
            customLabelStyles={{
              colorFocused: colors.COLOR_LIGHT_NAVY_BLUE,
              colorBlurred: colors.COLOR_LIGHT_GREY,
              fontSizeFocused: 15,
              fontSizeBlurred: 15,
            }}
            inputStyles={inputTextStyle}
          />
        </View>
        <View style={separatorInputStyle} />
        {!this.state.empEmail.isValid && (
          <Text style={errorLabel}>
            {this.state.empEmail.value === '' ||
              this.state.empEmail.value === null
              ? ADDITIONAL_DETAILS_CONST.MANDATORY_EMAIL
              : ADDITIONAL_DETAILS_CONST.VALID_EMAIL}
          </Text>
        )}
        <View style={marginTop20}>

          <FloatingLabelInput
            editable={!this.state.isViewOnly}
            label={ADDITIONAL_DETAILS_CONST.ADDRESS_LINE_1}
            containerStyles={inputStyle}
            value={this.state.empAddress1.value || undefined}
            onChangeText={(value) => {
              this.setState({
                empAddress1: {
                  value: value,
                },
              });

            }}
            customLabelStyles={{
              colorFocused: colors.COLOR_LIGHT_NAVY_BLUE,
              colorBlurred: colors.COLOR_LIGHT_GREY,
              fontSizeFocused: 15,
              fontSizeBlurred: 15,
            }}
            inputStyles={inputTextStyle}
          />
        </View>
        <View style={separatorInputStyle} />

        <View style={marginTop20}>
          <FloatingLabelInput
            editable={!this.state.isViewOnly}
            label={ADDITIONAL_DETAILS_CONST.ADDRESS_LINE_2}
            containerStyles={inputStyle}
            value={this.state.empAddress2.value || undefined}
            onChangeText={(value) => {
              this.setState({
                empAddress2: {
                  value: value,
                },
              });

            }}
            customLabelStyles={{
              colorFocused: colors.COLOR_LIGHT_NAVY_BLUE,
              colorBlurred: colors.COLOR_LIGHT_GREY,
              fontSizeFocused: 15,
              fontSizeBlurred: 15,
            }}
            inputStyles={inputTextStyle}
          />
        </View>
        <View style={separatorInputStyle} />

        <View style={marginTop20}>
          <FloatingLabelInput
            editable={!this.state.isViewOnly}
            label={"Landmark 1*"}
            containerStyles={inputStyle}
            value={this.state.empLandmark1.value || undefined}
            onChangeText={(value) => {
              this.setState({
                empLandmark1: {
                  value: value,
                },
              });

            }}
            customLabelStyles={{
              colorFocused: colors.COLOR_LIGHT_NAVY_BLUE,
              colorBlurred: colors.COLOR_LIGHT_GREY,
              fontSizeFocused: 15,
              fontSizeBlurred: 15,
            }}
            inputStyles={inputTextStyle}
          />
        </View>
        <View style={separatorInputStyle} />

        <View style={marginTop20}>
          <FloatingLabelInput
            editable={!this.state.isViewOnly}
            label={"Landmark 2"}
            containerStyles={inputStyle}
            value={this.state.empLandmark2.value || undefined}
            onChangeText={(value) => {
              this.setState({
                empLandmark2: {
                  value: value,
                },
              });

            }}
            customLabelStyles={{
              colorFocused: colors.COLOR_LIGHT_NAVY_BLUE,
              colorBlurred: colors.COLOR_LIGHT_GREY,
              fontSizeFocused: 15,
              fontSizeBlurred: 15,
            }}
            inputStyles={inputTextStyle}
          />
        </View>
        <View style={separatorInputStyle} />

        <View style={marginTop20}>
          <FloatingLabelInput
            maxLength={6}
            editable={!this.state.isViewOnly}
            label={ADDITIONAL_DETAILS_CONST.PINCODE}
            containerStyles={inputStyle}
            keyboardType={'numeric'}
            value={this.state.empPincode.value || undefined}
            onChangeText={(value) => {
              const valid = PINCODE_REGEX.test(value);

              this.setState(
                {
                  empPincode: {
                    value: value,
                    isValid: value !== '' ? valid : true,
                  },
                  empCity: '',
                  empState: '',
                },
                () => {
                  if (
                    this.state.empPincode.value.length === 6 &&
                    this.state.empPincode.isValid
                  ) {
                    this.getDataFromPincode(value, 'fromOfficeAddress');
                  }
                },
              );

            }}
            customLabelStyles={{
              colorFocused: colors.COLOR_LIGHT_NAVY_BLUE,
              colorBlurred: colors.COLOR_LIGHT_GREY,
              fontSizeFocused: 15,
              fontSizeBlurred: 15,
            }}
            inputStyles={inputTextStyle}
          />
        </View>
        <View style={separatorInputStyle} />
        {!this.state.empPincode.isValid && (
          <Text style={errorLabel}>
            {ADDITIONAL_DETAILS_CONST.PINCODE_VALIDATION}
          </Text>
        )}

        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <View style={{ width: '45%', marginTop: 15 }}>
            <FloatingLabelInput
              label={ADDITIONAL_DETAILS_CONST.CITY}
              editable={!this.state.isViewOnly}
              containerStyles={inputStyle}
              value={this.state.empCity || undefined}
              onChangeText={(value) => {
                this.setState({
                  empCity: value,
                  empCityVerified: NAME_REGEX.test(value)
                });
              }}
              customLabelStyles={{
                colorFocused: colors.COLOR_LIGHT_NAVY_BLUE,
                colorBlurred: colors.COLOR_LIGHT_GREY,
                fontSizeFocused: 15,
                fontSizeBlurred: 15,
              }}
              inputStyles={inputTextStyle}
            />
            <View style={separatorInputStyle} />
            {!this.state.empCityVerified && (
              <Text style={{ color: 'red', marginTop: 3, }}>{ADDITIONAL_DETAILS_CONST.INVALID_CITY_NAME}</Text>)}
          </View>
          <View style={{ width: '45%', marginTop: 15 }}>
            <FloatingLabelInput
              editable={!this.state.isViewOnly}
              label={ADDITIONAL_DETAILS_CONST.STATE}
              containerStyles={inputStyle}
              value={this.state.empState || undefined}
              onChangeText={(value) => {
                this.setState({
                  empState: value,
                  empStateVerified: NAME_REGEX.test(value)
                });
              }}
              customLabelStyles={{
                colorFocused: colors.COLOR_LIGHT_NAVY_BLUE,
                colorBlurred: colors.COLOR_LIGHT_GREY,
                fontSizeFocused: 15,
                fontSizeBlurred: 15,
              }}
              inputStyles={inputTextStyle}
            />
            <View style={separatorInputStyle} />
            {!this.state.empStateVerified && (
              <Text style={{ color: 'red', marginTop: 3, }}>{ADDITIONAL_DETAILS_CONST.INVALID_STATE_NAME}</Text>)}
          </View>
        </View>

        {/* {this.state.indSelfSoleFlag &&
          <View>
            <View style={{ marginBottom: 10, marginTop: 15 }}>
              <Text style={{
                color: colors.COLOR_LIGHT_NAVY_BLUE,
                fontFamily: APP_FONTS.NunitoRegular,
                fontSize: 16,
                marginLeft: 4
              }}>
                {this.state.indSelfSoleFlag ? ADDITIONAL_DETAILS_CONST.OFFICE_TYPE : ADDITIONAL_DETAILS_CONST.RESIDENT_TYPE}
              </Text>
              <DropDownPicker
                disabled={this.state.isViewOnly}
                items={this.state.dropDownResidentType1}
                defaultValue={this.state.selectedEmpType.value}
                placeholder={''}
                controller={(instance) => (this.controllerKYC = instance)}
                containerStyle={{ flex: 1, marginTop: 5, marginBottom: 15 }}
                style={{ backgroundColor: '#ffffff', borderWidth: 0 }}
                itemStyle={{
                  justifyContent: 'flex-start',
                  marginLeft: 4,
                }}

                dropDownStyle={{ backgroundColor: '#ffffff' }}
                onChangeItem={(item) => {
                  this.setState({
                    residenceFlag: item.value == 'PG' || item.value == "Corporate Provided" ? false : true,
                    isSelected: false,
                    selectedEmpType: {
                      value: item.value || null,
                      label: item.label || null,
                    },
                  });

                }}
                customArrowUp={() => <Image source={UP_ARROW} />}
                customArrowDown={() => <Image source={DOWN_ARROW} />}
                labelStyle={textStyle}
                selectedLabelStyle={[textStyle, { color: colors.COLOR_BLACK }]}
              />
              <View style={separatorInputStyle} />
            </View>
            <>
              <Text style={[kycDocLabel, { marginTop: 20, fontFamily: APP_FONTS.NunitoBold }]}>
                {this.state.indSelfSoleFlag ? ADDITIONAL_DETAILS_CONST.BUSINESS_ADDRESS : ADDITIONAL_DETAILS_CONST.RESIDING_ADDRESS}

              </Text>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <View style={{ width: '45%', marginTop: 15 }}>
                  <FloatingLabelInput
                    label={ADDITIONAL_DETAILS_CONST.YEAR}
                    containerStyles={inputStyle}
                    editable={!this.state.isViewOnly}
                    maxLength={2}
                    value={this.state.empYear == '' ? this.state.empYear : this.state.empYear.toString()}
                    keyboardType='number-pad'
                    onChangeText={(value) => {
                      // this?.state?.year.length < 2 ?
                      this.setState({ empYear: value, })

                      // :null
                    }}
                    customLabelStyles={{
                      colorFocused: colors.COLOR_LIGHT_NAVY_BLUE,
                      colorBlurred: colors.COLOR_LIGHT_GREY,
                      fontSizeFocused: 15,
                      fontSizeBlurred: 15,
                    }}
                    inputStyles={inputTextStyle}
                  />
                  <View style={separatorInputStyle} />
                </View>
                <View style={{ width: '45%', marginTop: 15 }}>
                  <DropDownPicker
                    disabled={this.state.isViewOnly}
                    controller={(instance) => (this.controllerKYC = instance)}
                    items={this.state.dropDownMonth}
                    containerStyle={{ marginTop: 15, marginBottom: 10 }}
                    style={{ backgroundColor: '#ffffff', borderWidth: 0 }}
                    itemStyle={{
                      justifyContent: 'flex-start',
                      marginLeft: 4,
                    }}
                    defaultValue={this.state.empMonth.value}
                    placeholder={
                      ""
                    }
                    // defaultValue={this.state.permanentMonth.value}
                    dropDownStyle={{ backgroundColor: '#ffffff' }}
                    onChangeItem={(item) => {
                      this.setState({
                        empMonth: {
                          value: item.value || null,
                          label: item.label || null,
                        }
                      });

                    }}
                    customArrowUp={() => <Image source={UP_ARROW} />}
                    customArrowDown={() => <Image source={DOWN_ARROW} />}
                    labelStyle={textStyle}
                    selectedLabelStyle={[textStyle, { color: colors.COLOR_BLACK }]}
                  />
                  <Text style={[textStyle, { position: 'absolute', top: 0, marginLeft: 5, color: colors.COLOR_LIGHT_NAVY_BLUE, }]}>
                    {ADDITIONAL_DETAILS_CONST.MONTH}
                  </Text>
                  <View style={separatorInputStyle} />
                </View>
              </View>
            </>
          </View>
        } */}
        <>
          <Text style={[kycDocLabel, { marginTop: 20, fontFamily: APP_FONTS.NunitoBold }]}>
            {ADDITIONAL_DETAILS_CONST.WORKING_JOB_SINCE}
          </Text>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <View style={{ width: '45%', marginTop: 15, }}>
              <FloatingLabelInput
                editable={!this.state.isViewOnly}
                label={ADDITIONAL_DETAILS_CONST.YEAR}
                containerStyles={inputStyle}
                maxLength={2}
                value={this.state.jobYear == '' ? this.state.jobYear.toString() : this.state.jobYear.toString()}
                keyboardType='number-pad'
                onChangeText={(value) => {
                  // this?.state?.year.length < 2 ?
                  this.setState({ jobYear: value, })
                  // :null
                }}
                customLabelStyles={{
                  colorFocused: colors.COLOR_LIGHT_NAVY_BLUE,
                  colorBlurred: colors.COLOR_LIGHT_GREY,
                  fontSizeFocused: 15,
                  fontSizeBlurred: 15,
                }}
                inputStyles={inputTextStyle}
              />
              <View style={separatorInputStyle} />
            </View>
            <View style={{ width: '45%', marginTop: 15 }}>
              <DropDownPicker
                disabled={this.state.isViewOnly}
                controller={(instance) => (this.controllerKYC = instance)}
                items={this.state.dropDownMonth}
                containerStyle={{ marginTop: 15, marginBottom: 10 }}
                style={{ backgroundColor: '#ffffff', borderWidth: 0 }}
                itemStyle={{
                  justifyContent: 'flex-start',
                  marginLeft: 4,
                }}
                placeholder={''}
                defaultValue={this.state.jobMonth.value}
                dropDownStyle={{ backgroundColor: '#ffffff' }}
                onChangeItem={(item) => {

                  this.setState({
                    jobMonth: {
                      value: item.value,
                      label: item.label || null,
                    }
                  });
                }}
                customArrowUp={() => <Image source={UP_ARROW} />}
                customArrowDown={() => <Image source={DOWN_ARROW} />}
                labelStyle={textStyle}
                selectedLabelStyle={[textStyle, { color: colors.COLOR_BLACK }]}
              />
              <Text style={[textStyle, { position: 'absolute', top: 0, marginLeft: 5, color: colors.COLOR_LIGHT_NAVY_BLUE, }]}>
                {ADDITIONAL_DETAILS_CONST.MONTH}
              </Text>
              <View style={separatorInputStyle} />
            </View>
          </View>
        </>

        <Text style={[kycDocLabel, { marginTop: 20, fontFamily: APP_FONTS.NunitoBold }]}>
          {ADDITIONAL_DETAILS_CONST.FIRST_JOB}
        </Text>
        {
          this.jobSelectionRadiobutton()
        }
        {this.state.isFirstJob.value === false ?
          <>
            <Text style={[kycDocLabel, { marginTop: 20, fontFamily: APP_FONTS.NunitoBold }]}>
              {ADDITIONAL_DETAILS_CONST.WORK_EXPERIENCE}
            </Text>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <View style={{ width: '45%', marginTop: 15 }}>
                <FloatingLabelInput
                  editable={!this.state.isViewOnly}
                  label={ADDITIONAL_DETAILS_CONST.YEAR}
                  containerStyles={inputStyle}
                  maxLength={2}
                  value={this.state.empYear == '' ? this.state.empYear : this.state.empYear.toString()}
                  keyboardType='number-pad'
                  onChangeText={(value) => {
                    // this?.state?.year.length < 2 ?
                    this.setState({ empYear: value, })
                    // :null
                  }}
                  customLabelStyles={{
                    colorFocused: colors.COLOR_LIGHT_NAVY_BLUE,
                    colorBlurred: colors.COLOR_LIGHT_GREY,
                    fontSizeFocused: 15,
                    fontSizeBlurred: 15,
                  }}
                  inputStyles={inputTextStyle}
                />
                <View style={separatorInputStyle} />
              </View>

              <View style={{ width: '45%', marginTop: 15 }}>
                <DropDownPicker
                  disabled={this.state.isViewOnly}
                  controller={(instance) => (this.controllerKYC = instance)}
                  items={this.state.dropDownMonth}
                  containerStyle={{ marginTop: 15, marginBottom: 10 }}
                  style={{ backgroundColor: '#ffffff', borderWidth: 0 }}
                  itemStyle={{
                    justifyContent: 'flex-start',
                    marginLeft: 4,
                  }}
                  defaultValue={this.state.empMonth.value}
                  placeholder={
                    ""
                  }
                  dropDownStyle={{ backgroundColor: '#ffffff' }}
                  onChangeItem={(item) => {
                    this.setState({
                      empMonth: {
                        value: item.value,
                        label: item.label || null,
                      }
                    });
                  }}
                  customArrowUp={() => <Image source={UP_ARROW} />}
                  customArrowDown={() => <Image source={DOWN_ARROW} />}
                  labelStyle={textStyle}
                  selectedLabelStyle={[textStyle, { color: colors.COLOR_BLACK }]}
                />
                <Text style={[textStyle, { position: 'absolute', top: 0, marginLeft: 5, color: colors.COLOR_LIGHT_NAVY_BLUE, }]}>
                  {ADDITIONAL_DETAILS_CONST.MONTH}
                </Text>
                <View style={separatorInputStyle} />
              </View>
            </View>
          </>
          : null
        }
        {/* <View style={{ justifyContent: 'center', alignItems: 'center'}}>
        <View style={{ width: '40%'}}> */}
        <Button
          isDisabled={
            this.state.isViewOnly ||
              this.state.selectedProfession.value === null ||
              this.state.selectedsubCategory.value === null ||
              this.state.selectedDesignation.value === null ||
              this.state.selectedDesignation.value === null ||
              // this.state.selectedCompanyName === '' ||
              this.state.companyName === '' ||
                this.state.empEmail.value === '' ||
                this.state.empAddress1.value === '' ||
                this.state.empPincode.value === '' ||
                !this.state.empPincode.isValid ||
                this.state.empLandmark1.value == '' ||
                this.state.empCity === '' ||
                this.state.empCityVerified === false ||
                this.state.empStateVerified === false ||
                this.state.empState === '' ||
                this.state.jobYear === '' ||
                this.state.jobMonth.value === null ||
                this.state.isFirstJob.value === '' ||
                this.state.isFirstJob.value === false ? (
              this.state.empYear === '' ||
              this.state.empMonth.value === null || !this.validateExp()) :
              this.state.isFirstJob.value === null
          }
          title={ADDITIONAL_DETAILS_CONST.BUTTON_TITLE_SAVE}
          onPress={() => {
            const dataToAPI = {
              leadCode: this.state.leadCode,
              empProfession: this.state.selectedProfession.value,
              empSubCategory: this.state.selectedsubCategory.value,
              empOtherCompanyName: this.state.companyName,
              designation: this.state.selectedDesignation.value,
              company: this.state.selectedCompanyName,
              empConstitution: this.state.selectedCompanyType.value,
              empIndustry: this.state.selectedIndustry.value,
              empOfficeEmail: this.state.empEmail.value,
              firstJob: this.state.isFirstJob.value,
              jobMonth: this.state.jobMonth.value,
              jobYear: this.state.jobYear,
              ismainapplicant: !(this.state.iscoapplicant || this.state.isguarantor),
              isguarantor: this.state.isguarantor,
              applicantUniqueId:
                this.state.isguarantor || this.state.iscoapplicant
                  ? this.state.coapplicantUniqueId
                  : this.state.applicantUniqueId,
              id: this.state.idToEditEmployDetails,
              empMonth: this.state.isFirstJob.value == false ? this.state.empMonth.value : null,
              empYear: this.state.isFirstJob.value == false ? this.state.empYear : '',
            };
            //mj
            const dataToAPI1 = {
              msgHide: true,
              officeData: true,
              address1: this.state.empAddress1.value,
              address2: this.state.empAddress2.value,
              landmark1: this.state.empLandmark1.value,
              landmark2: this.state.empLandmark2.value,
              pinCode: this.state.empPincode.value,
              city: this.state.empCity,
              state: this.state.empState,
              type: 'Office',
              // officeType: this.state.selectedEmpType.value,
              ismainapplicant: !(this.state.iscoapplicant || this.state.isguarantor),
              isguarantor: this.state.isguarantor,
              applicantUniqueId:
                this.state.isguarantor || this.state.iscoapplicant
                  ? this.state.coapplicantUniqueId
                  : this.state.applicantUniqueId,
              id: this.state.idToEditEmpDetails,
            };
            console.log("jjjihkhkhkh", dataToAPI);
            this.props.saveEmploymentDetails({
              dataToAPI,
              callback: (response) => {
                if (response && !response.error) {

                  this.props.saveOfficeAddress({
                    dataToAPI1,
                    callback: (response) => {
                      if (response && !response.error) {
                        this.setState({
                          isOfficeAddressSaved: true,
                          officeData: true,
                          additionalDetailOptions: {
                            employementDetailsCollapsed: true,
                            officeAddressCollapsed: true,
                            registeredCollapsed: true,
                            permanentAddressCollapsed: true,
                            additionalContactCollapsed: false,
                          },
                        });
                      }
                    },
                  });
                  
                  this.setState({
                    employmentData: true,
                    isEmployDetailsSaved: true,
                    additionalDetailOptions: {
                      employementDetailsCollapsed: true,
                      officeAddressCollapsed: false,
                      registeredCollapsed: true,
                      permanentAddressCollapsed: true,
                      additionalContactCollapsed: true,
                    },
                  });
                }
              },
            });
           
          }}
          customContainerStyle={saveButtonStyle}
          cutomTitleStyle={saveButtonTitleStyle}
          customContainerStyle={
            this.state.isViewOnly ||
              this.state.selectedProfession.value === null ||
              this.state.selectedsubCategory.value === null ||
              this.state.selectedDesignation.value === null ||
              this.state.selectedDesignation.value === null ||
              this.state.empEmail.value === '' ||
              this.state.officeAddress1.value === '' ||
              this.state.officePincode.value === '' ||
              !this.state.officePincode.isValid ||
              this.state.officeLandmark1.value == '' ||
              this.state.officeCity === '' ||
              this.state.officeCityVerified === false ||
              this.state.officeStateVerified === false ||
              this.state.officeState === '' ||
              this.state.jobYear === '' ||
              this.state.jobMonth.value === null ||
              this.state.isFirstJob.value === null ?
              disableStyle :
              (
                // (this?.state.selectedCompanyName?.toLowerCase() == 'others' || this?.state.selectedCompanyName?.toLowerCase() == 'other') &&
                this.state.companyName === '') ? disableStyle :
                this.state.isFirstJob.value === false ?
                  this.state.empYear === '' ||
                    this.state.empMonth.value === null || !this.validateExp() ?
                    disableStyle
                    :
                    saveButtonStyle
                  : saveButtonStyle
          }
          cutomTitleStyle={
            this.state.isViewOnly ||
              this.state.selectedProfession.value === null ||
              this.state.selectedsubCategory.value === null ||
              this.state.selectedDesignation.value === null ||
              this.state.selectedDesignation.value === null ||
              this.state.empEmail.value === '' ||
              this.state.officeAddress1.value === '' ||
              this.state.officePincode.value === '' ||
              !this.state.officePincode.isValid ||
              this.state.officeLandmark1.value == '' ||
              this.state.officeCity === '' ||
              this.state.officeCityVerified === false ||
              this.state.officeStateVerified === false ||
              this.state.officeState === '' ||
              this.state.jobYear === '' ||
              this.state.jobMonth.value === null ||
              this.state.isFirstJob.value === null ?
              disableTextStyle :
              (
                // (this?.state.selectedCompanyName?.toLowerCase() == 'others' || this?.state.selectedCompanyName?.toLowerCase() == 'other') &&
                this.state.companyName === '') ? disableTextStyle :
                this.state.isFirstJob.value === false ?
                  this.state.empYear === '' ||
                    this.state.empMonth.value === null || !this.validateExp() ?
                    disableTextStyle
                    :
                    saveButtonTitleStyle
                  : saveButtonTitleStyle

          }
        />

        {/* </View>

        </View> */}


        <View style={{ marginBottom: 20 }} />
      </View>
    );
  }

  getUtilityBillNumber() {
    if (this.state.selectedUtilityBill === 'gas') {
      return this.state.lpgID;
    }
    if (this.state.selectedUtilityBill === 'electricity') {
      return this.state.consumerNumber;
    }
    if (this.state.selectedUtilityBill === 'landline') {
      return this.state.landlineNumber;
    }
    return '';
  }

  getDataFromPincode(pincode, flow) {
    // this.props.getCityState({
    //   pincode,
    //   callback: (response) => {
    //     if (flow === 'fromUtility') {
    //       this.setState({
    //         utilityCity: response.data.city || '',
    //         utilityState: response.data.state || '',
    //       });
    //     } else if (flow === 'fromPermanentAddress') {
    //       this.setState({
    //         permanentCity: response.data.city || '',
    //         permanentState: response.data.state || '',
    //       });
    //     } else if (flow === 'fromOfficeAddress') {
    //       this.setState({
    //         officeCity: response.data.city || '',
    //         officeState: response.data.state || '',
    //       });
    //     } else if (flow === 'fromEmploymentDetails') {
    //       this.setState({
    //         employmentCity: response.data.city || '',
    //         employmentState: response.data.state || '',
    //       });
    //     } else {
    //       this.setState({
    //         city: response.data.city || '',
    //         state: response.data.state || '',
    //       });
    //     }
    //   },
    // });
  }

  getDocId() {
    if (this?.state?.selectedDocType === 'adhar' && (this.state.adharID === '' || !this.state.adharIdValid || this.state.addharName === '' || !this.state.adharNameValid)) {
      return true;
    }
    if (
      this?.state?.selectedDocType === 'passport' &&
      (this.state.fileNumber === '' || this.state.dateOfBirthText === '' || !this.state.fileNumberValid ||
        (moment(this.state.dateOfBirthText, ["MM-DD-YYYY", "DD-MM-YYYY", "YYYY-MM-DD", "DD/MM/YYYY", "YYYY/MM/DD", "MM/DD/YYYY"]) >
          moment().clone().subtract(18, 'years')) === true)
    ) {
      return true;
    }
    if (
      this?.state?.selectedDocType === 'driving license' &&
      (this.state.dlNo === '' || this.state.dateOfBirthDLText === '' || !this.state.dlNoValid ||
        (moment(this.state.dateOfBirthDLText, ["MM-DD-YYYY", "DD-MM-YYYY", "YYYY-MM-DD", "DD/MM/YYYY", "YYYY/MM/DD", "MM/DD/YYYY"]) >
          moment().clone().subtract(18, 'years')) === true
      )
    ) {
      return true;
    }
    if (this?.state?.selectedDocType === 'voter' && this.state.epicNo === '' || !this.state.epicNoValid) {
      return true;
    }
    if (
      this?.state?.selectedDocType === 'other' &&
      this.state.selectedOtherDoc.value === null
    ) {
      return true;
    }
    return false;
  }

  getUtilityDocId() {
    if (
      this.state.selectedUtilityBill === 'electricity' &&
      (this.state.serviceProvider.value === null || this.state.consumerNumber === '' || !this.state.consumerNumberValid)
    ) {
      return true;
    }
    if (this.state.selectedUtilityBill === 'gas' && this.state.lpgID === '') {
      return true;
    }
    if (
      this.state.selectedUtilityBill === 'landline' &&
      (this.state.cityNameUtility === '' ||
        this.state.landlineNumber === '' ||
        this.state.stdCode === '')
    ) {
      return true;
    }
    if (
      this.state.selectedUtilityBill === 'other' &&
      this.state.selectedUtilityDoc.value === null
    ) {
      return true;
    }
    return false;
  }

  getNextDisable() {
    if (this.state.indSelfSoleFlag == false) {
      if (this.state.residenceFlag === false && (
        this.state.kycData == false ||
        // this.state.utilityBillData == false ||
        this.state.permanantAddressData == false ||
        this.state.employmentData == false ||
        this.state.officeData == false ||
        this.state.contactData === false ||
        (this.state.permanentVisible == true && this.state.permanantResiAddressData == false)
      )
      ) {
        return true;
      }
      if (this.state.residenceFlag && (
        this.state.kycData == false ||
        // this.state.utilityBillData == false ||
        this.state.permanantAddressData == false ||
        this.state.employmentData == false ||
        this.state.officeData == false ||
        this.state.contactData === false ||
        (this.state.permanentVisible == true && this.state.permanantResiAddressData == false)

      )
      ) {
        return true;
      }
    } else {
      if (this.state.residenceFlag && (
        this.state.kycData == false ||
        (this.state.permanentVisible == true && this.state.permanantResiAddressData == false) ||
        this.state.contactData === false ||
        this.state.employmentData == false ||
        this.state.officeData == false)) {
        return true;
      }
    }
    return false;
  }

  getRadio() {
    if (
      this.state.selectedSourceType === 'Other' &&
      this.state.radioOther === ''
    ) {
      return true;
    }
    return false;
  }

  getSaveDisable() {
    if (this.state.indSelfSoleFlag == true) {
      if (
        this.state.addressLine1.value === '' ||
        this.state.pincode.value === '' ||
        !this.state.pincode.isValid ||
        this.state.city === '' ||
        this.state.state === '' ||
        this?.state?.year === '' ||
        this.state.stateVerified === false ||
        this.state.cityVerified === false ||
        // this.state.selectedMonth.value === '' ||
        this.state.selectedMonth.value === null ||
        this.state.landmark1.value === '' ||
        this.state.selectedResidentType.value === '' ||
        this.state.selectedResidentType.value === null ||
        this?.state?.selectedDocType === '' ||
        this.getDocId() || this.state.selectedSourceType === '' || this.getRadio()
      ) {
        return true;
      }
    } else {
      if (
        this.state.addressLine1.value === '' ||
        this.state.pincode.value === '' ||
        !this.state.pincode.isValid ||
        this.state.city === '' ||
        this.state.state === '' ||
        this?.state?.year === '' ||
        this.state.stateVerified === false ||
        this.state.cityVerified === false ||
        // this.state.selectedMonth.value === '' ||
        this.state.landmark1.value === '' ||
        this.state.selectedMonth.value === null ||
        this.state.selectedResidentType.value === '' ||
        this.state.selectedResidentType.value === null ||
        this?.state?.selectedDocType === '' ||
        this.getDocId()
      ) {
        return true;
      }
    }
    return false;
  }

  getOfficeSave() {
    if (this.state.indSelfSoleFlag == true) {
      if (this.state.officeAddress1.value === '' ||
        this.state.officePincode.value === '' ||
        this.state.officeLandmark1.value == '' ||
        !this.state.officePincode.isValid ||
        this.state.officeCity === '' ||
        this.state.officeCityVerified === false ||
        this.state.officeStateVerified === false ||
        this.state.officeState === '' ||
        this.state.officeYear === '' ||
        this.state.officeMonth.value === null ||
        this.state.selectedOfficeType.value === '' ||
        this.state.selectedOfficeType.value === null) {
        return true
      }
    } else {
      if (this.state.officeAddress1.value === '' ||
        this.state.officePincode.value === '' ||
        !this.state.officePincode.isValid ||
        this.state.officeLandmark1.value == '' ||
        this.state.officeCity === '' ||
        this.state.officeCityVerified === false ||
        this.state.officeStateVerified === false ||
        this.state.officeState === '') {
        return true
      }
    }

    return false
  }

  getUtilitySaveDisabled(flow) {
    if (
      (flow === 'fromUtility' && this.state.utilityAddressLine1 === '') ||
      this.state.imageDataUtility.front.uri === '' ||
      this.state.utilityAddressType.isValid === null ||
      this.state.utilityPincode.value === '' ||
      !this.state.utilityPincode.isValid ||
      this.state.utilityCity === '' ||
      this.state.utilityState === '' ||
      this.state.utilityCityVerified === false ||
      this.state.utilityStateVerified === false ||
      this.state.utilityLandmark1.value === '' ||
      this.state.utilitySelectedResidentType.value === '' ||
      this.state.utilitySelectedResidentType.value === null ||
      this.state.selectedUtilityBill === '' ||
      this.getUtilityDocId()
      /* 
      this.state.isUtiltiySaved */
    ) {
      return true;
    }
    return false;
  }

  utilityBillForRadiobutton() {
    const {
      flexRowStyle,
      radioButtonContainer,
      marginTop5,
    } = PANAndGSTVerificationStyles;

    return (
      <View style={{}}>
        <View style={[radioButtonContainer, { marginTop: 10 }]}>
          <RadioButton
            title={ADDITIONAL_DETAILS_CONST.CURRENT_ADDRESS}
            isSelected={this.state.utilityAddressType.isValid}
            onPress={() => {
              if (!this.state.isViewOnly) {
                this.setState({
                  utilityAddressType: {
                    value: 'currentAddress',
                    isValid: true,
                  }

                })
              }

            }}
          />
        </View>
        <View style={marginTop5}>
          <RadioButton
            title={'Permanent Address'}
            isSelected={this.state.utilityAddressType.isValid == false}

            onPress={() => {
              if (!this.state.isViewOnly) {
                this.setState({
                  utilityAddressType: {
                    value: 'permanentAddress',
                    isValid: false,
                  }
                })
              }
            }}


          />
        </View>
      </View>
    );
  }

  jobSelectionRadiobutton() {
    const {
      flexRowStyle,
      radioButtonContainer,
      marginTop5,
    } = PANAndGSTVerificationStyles;
    return (
      <View style={{ flexDirection: 'row', marginBottom: 20 }}>
        <View style={[radioButtonContainer, { marginTop: 10 }]}>
          <RadioButton
            title={'Yes'}
            isSelected={this.state.isFirstJob.value == true}
            onPress={() => {
              if (!this.state.isViewOnly) {
                this.setState({
                  isFirstJob: {
                    value: true
                    // isValid: value !== '' ? valid : true,
                  },
                  // isFirstJob: true
                })
              }
            }}
          />
        </View>
        <View style={marginTop5}>
          <RadioButton
            title={'No'}
            isSelected={this.state.isFirstJob.value == false}
            onPress={() => {
              if (!this.state.isViewOnly) {
                this.setState({
                  isFirstJob: {
                    value: false,
                    // isValid: value !== '' ? valid : true,
                  },
                  // isFirstJob: false
                })
              }
            }}
          />
        </View>
      </View>
    );
  }

  renderResidentialAddress(flow) {
    const {
      residentialAddressContainer,
      residentialAddressLabel,
      inputTextStyle,
      inputStyle,
      separatorInputStyle,
      kycDocLabel,
      textStyle,
      textStyle1,
      saveButtonStyle,
      saveButtonTitleStyle,
      errorLabel,
      marginTop20,
      disableStyle,
      disableTextStyle,
    } = AdditionalDetailsStyles;

    return (
      <View style={residentialAddressContainer}>

        {/* <Text style={residentialAddressLabel}>
          {flow === 'fromUtility'
            ? this.state.indSelfSoleFlag ? "Registered address 2" : ADDITIONAL_DETAILS_CONST.RESIDENTIAL_ADDRESS2
            : this.state.indSelfSoleFlag ? "Registered address 1" : ADDITIONAL_DETAILS_CONST.RESIDENTIAL_ADDRESS}
        </Text> */}

        {flow === 'fromUtility' && (
          <>
            <View style={{ marginTop: 20 }}>
              <Text style={kycDocLabel}>
                {ADDITIONAL_DETAILS_CONST.UTILITY_BILL_FOR}
              </Text>
            </View>

            {
              this.utilityBillForRadiobutton()
            }
          </>
        )}

        <View style={marginTop20}>
          <FloatingLabelInput
            editable={flow === 'fromUtility' ? !this.state.isViewOnly : !this.state.kycFreeze}
            label={ADDITIONAL_DETAILS_CONST.ADDRESS_LINE_1}
            containerStyles={inputStyle}
            value={
              (flow === 'fromUtility'
                ? this.state.utilityAddressLine1.value
                : this.state.addressLine1.value) || undefined
            }
            onChangeText={(value) => {
              if (flow === 'fromUtility') {
                this.setState({
                  utilityAddressLine1: {
                    value: value,
                  },
                });
              } else {
                this.setState({
                  addressLine1: {
                    value: value,
                  },
                });
              }
            }}
            customLabelStyles={{
              colorFocused: colors.COLOR_LIGHT_NAVY_BLUE,
              colorBlurred: colors.COLOR_LIGHT_GREY,
              fontSizeFocused: 15,
              fontSizeBlurred: 15,
            }}
            inputStyles={inputTextStyle}
          />
        </View>
        <View style={separatorInputStyle} />

        <View style={marginTop20}>
          <FloatingLabelInput
            editable={flow === 'fromUtility' ? !this.state.isViewOnly : !this.state.kycFreeze}
            label={ADDITIONAL_DETAILS_CONST.ADDRESS_LINE_2}
            containerStyles={inputStyle}
            value={
              (flow === 'fromUtility'
                ? this.state.utilityAddressLine2.value
                : this.state.addressLine2.value) || undefined
            }
            onChangeText={(value) => {
              if (flow === 'fromUtility') {
                this.setState({
                  utilityAddressLine2: {
                    value: value,
                  },
                });
              } else {
                this.setState({
                  addressLine2: {
                    value: value,
                  },
                });
              }
            }}
            customLabelStyles={{
              colorFocused: colors.COLOR_LIGHT_NAVY_BLUE,
              colorBlurred: colors.COLOR_LIGHT_GREY,
              fontSizeFocused: 15,
              fontSizeBlurred: 15,
            }}
            inputStyles={inputTextStyle}
          />
        </View>
        <View style={separatorInputStyle} />

        <View style={marginTop20}>
          <FloatingLabelInput
            editable={flow === 'fromUtility' ? !this.state.isViewOnly : !this.state.kycFreeze}
            label={"Landmark 1*"}
            containerStyles={inputStyle}
            value={
              (flow === 'fromUtility'
                ? this.state.utilityLandmark1.value
                : this.state.landmark1.value) || undefined
            }
            onChangeText={(value) => {
              if (flow === 'fromUtility') {
                this.setState({
                  utilityLandmark1: {
                    value: value,
                  },
                });
              } else {
                this.setState({
                  landmark1: {
                    value: value,
                  },
                });
              }
            }}
            customLabelStyles={{
              colorFocused: colors.COLOR_LIGHT_NAVY_BLUE,
              colorBlurred: colors.COLOR_LIGHT_GREY,
              fontSizeFocused: 15,
              fontSizeBlurred: 15,
            }}
            inputStyles={inputTextStyle}
          />
        </View>
        <View style={separatorInputStyle} />

        <View style={marginTop20}>
          <FloatingLabelInput
            editable={flow === 'fromUtility' ? !this.state.isViewOnly : !this.state.kycFreeze}
            label={"Landmark 2"}
            containerStyles={inputStyle}
            value={
              (flow === 'fromUtility'
                ? this.state.utilityLandmark2.value
                : this.state.landmark2.value) || undefined
            }
            onChangeText={(value) => {
              if (flow === 'fromUtility') {
                this.setState({
                  utilityLandmark2: {
                    value: value,
                  },
                });
              } else {
                this.setState({
                  landmark2: {
                    value: value,
                  },
                });
              }
            }}
            customLabelStyles={{
              colorFocused: colors.COLOR_LIGHT_NAVY_BLUE,
              colorBlurred: colors.COLOR_LIGHT_GREY,
              fontSizeFocused: 15,
              fontSizeBlurred: 15,
            }}
            inputStyles={inputTextStyle}
          />
        </View>
        <View style={separatorInputStyle} />

        <View style={marginTop20}>
          <FloatingLabelInput
            editable={flow === 'fromUtility' ? !this.state.isViewOnly : !this.state.kycFreeze}
            maxLength={6}
            label={ADDITIONAL_DETAILS_CONST.PINCODE}
            containerStyles={inputStyle}
            keyboardType={'numeric'}
            value={
              (flow === 'fromUtility'
                ? this.state.utilityPincode.value
                : this.state.pincode.value) || undefined
            }
            onChangeText={(value) => {
              if (flow === 'fromUtility') {
                const valid = PINCODE_REGEX.test(value);

                this.setState(
                  {
                    utilityPincode: {
                      value: value,
                      isValid: value !== '' ? valid : true,
                    },
                    utilityState: '',
                    utilityCity: '',
                  },
                  () => {
                    if (
                      this.state.utilityPincode.value.length === 6 &&
                      this.state.utilityPincode.isValid
                    ) {
                      this.getDataFromPincode(value, flow);
                    }
                  },
                );
              } else {
                const valid = PINCODE_REGEX.test(value);

                this.setState(
                  {
                    pincode: {
                      value: value,
                      isValid: value !== '' ? valid : true,
                    },
                    city: '',
                    state: '',
                  },
                  () => {
                    if (
                      this.state.pincode.value.length === 6 &&
                      this.state.pincode.isValid
                    ) {
                      this.getDataFromPincode(value);
                    }
                  },
                );
              }
            }}
            customLabelStyles={{
              colorFocused: colors.COLOR_LIGHT_NAVY_BLUE,
              colorBlurred: colors.COLOR_LIGHT_GREY,
              fontSizeFocused: 15,
              fontSizeBlurred: 15,
            }}
            inputStyles={inputTextStyle}
          />
        </View>
        <View style={separatorInputStyle} />
        {(flow === 'fromUtility'
          ? !this.state.utilityPincode.isValid
          : !this.state.pincode.isValid) && (
            <Text style={errorLabel}>
              {ADDITIONAL_DETAILS_CONST.PINCODE_VALIDATION}
            </Text>
          )}

        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <View style={{ width: '45%', marginTop: 15 }}>
            <FloatingLabelInput
              label={ADDITIONAL_DETAILS_CONST.CITY}
              editable={flow === 'fromUtility' ? !this.state.isViewOnly : !this.state.kycFreeze}
              containerStyles={inputStyle}
              value={
                (flow === 'fromUtility'
                  ? this.state.utilityCity
                  : this.state.city) || undefined
              }
              onChangeText={(value) => {
                if (flow === 'fromUtility') {
                  this.setState({
                    utilityCity: value,
                    utilityCityVerified: NAME_REGEX.test(value)
                  });
                } else {
                  this.setState({
                    city: value,
                    cityVerified: NAME_REGEX.test(value)
                  });
                }
              }}
              customLabelStyles={{
                colorFocused: colors.COLOR_LIGHT_NAVY_BLUE,
                colorBlurred: colors.COLOR_LIGHT_GREY,
                fontSizeFocused: 15,
                fontSizeBlurred: 15,
              }}
              inputStyles={inputTextStyle}
            />
            <View style={separatorInputStyle} />
            {flow === 'fromUtility' && !this.state.utilityCityVerified && (
              <Text style={{ color: 'red', marginTop: 3, }}>{ADDITIONAL_DETAILS_CONST.INVALID_CITY_NAME}</Text>)}
            {flow !== 'fromUtility' && !this.state.cityVerified && (
              <Text style={{ color: 'red', marginTop: 3, }}>{ADDITIONAL_DETAILS_CONST.INVALID_CITY_NAME}</Text>)}
          </View>
          <View style={{ width: '45%', marginTop: 15 }}>
            <FloatingLabelInput
              label={ADDITIONAL_DETAILS_CONST.STATE}
              containerStyles={inputStyle}
              editable={flow === 'fromUtility' ? !this.state.isViewOnly : !this.state.kycFreeze}
              value={
                (flow === 'fromUtility'
                  ? this.state.utilityState
                  : this.state.state) || undefined
              }
              onChangeText={(value) => {
                if (flow === 'fromUtility') {
                  this.setState({
                    utilityState: value,
                    utilityStateVerified: NAME_REGEX.test(value)
                  });
                } else {
                  this.setState({
                    state: value,
                    stateVerified: NAME_REGEX.test(value)
                  });
                }
              }}
              customLabelStyles={{
                colorFocused: colors.COLOR_LIGHT_NAVY_BLUE,
                colorBlurred: colors.COLOR_LIGHT_GREY,
                fontSizeFocused: 15,
                fontSizeBlurred: 15,
              }}
              inputStyles={inputTextStyle}
            />
            <View style={separatorInputStyle} />
            {flow === 'fromUtility' && !this.state.utilityStateVerified && (
              <Text style={{ color: 'red', marginTop: 3, }}>{ADDITIONAL_DETAILS_CONST.INVALID_STATE_NAME}</Text>)}
            {flow !== 'fromUtility' && !this.state.stateVerified && (
              <Text style={{ color: 'red', marginTop: 3, }}>{ADDITIONAL_DETAILS_CONST.INVALID_STATE_NAME}</Text>)}
          </View>
        </View>

        <View
          style={{
            ...(Platform.OS !== 'android' && {
              zIndex: 10,
            }),
            marginBottom: 15,
            marginTop: 10,
          }}>

          {/* residency */}
          {flow === 'fromUtility' && (
            <View style={{ marginBottom: 15, marginTop: 0 }}>
              <Text style={{
                color: colors.COLOR_LIGHT_NAVY_BLUE,
                fontFamily: APP_FONTS.NunitoRegular,
                fontSize: 16,
                marginLeft: 4
              }}>
                {this.state.indSelfSoleFlag ? ADDITIONAL_DETAILS_CONST.OFFICE_TYPE : ADDITIONAL_DETAILS_CONST.RESIDENT_TYPE}
              </Text>
              <DropDownPicker
                disabled={this.state.isViewOnly}
                controller={(instance) => (this.controller = instance)}
                items={this.state.indSelfSoleFlag ? this.state.dropDownResidentType1 : this.state.dropdownKyc}
                containerStyle={{ flex: 1, marginTop: 5, marginBottom: 15 }}
                style={{ backgroundColor: '#ffffff', borderWidth: 0 }}
                itemStyle={{
                  justifyContent: 'flex-start',
                  marginLeft: 4,
                }}
                placeholder={''}
                defaultValue={this.state.utilitySelectedResidentType.value}
                dropDownStyle={{ backgroundColor: '#ffffff' }}
                onChangeItem={(item) => {
                  this.setState({
                    utilitySelectedResidentType: {
                      value: item.value || null,
                      label: item.label || null,
                    },
                  });
                }}
                customArrowUp={() => <Image source={UP_ARROW} />}
                customArrowDown={() => <Image source={DOWN_ARROW} />}
                labelStyle={textStyle}
                selectedLabelStyle={[textStyle, { color: colors.COLOR_BLACK }]}
              />
              <View style={separatorInputStyle} />
            </View>
          )}
        </View>
        {!flow && (
          <View style={{ marginBottom: 15, marginTop: 0 }}>
            <Text style={{
              color: colors.COLOR_LIGHT_NAVY_BLUE,
              fontFamily: APP_FONTS.NunitoRegular,
              fontSize: 16,
              marginLeft: 4
            }}>
              {this.state.indSelfSoleFlag ? ADDITIONAL_DETAILS_CONST.OFFICE_TYPE : "Current Residence Type*"}
            </Text>
            <DropDownPicker
              disabled={this.state.kycFreeze}
              items={this.state.indSelfSoleFlag ? this.state.dropDownResidentType1 : this.state.dropdownKyc}
              defaultValue={this.state.selectedResidentType.value}
              placeholder={''}
              controller={(instance) => (this.controllerKYC = instance)}
              containerStyle={{ flex: 1, marginTop: 5, marginBottom: 15 }}
              style={{ backgroundColor: '#ffffff', borderWidth: 0 }}
              itemStyle={{
                justifyContent: 'flex-start',
                marginLeft: 4,
              }}

              dropDownStyle={{ backgroundColor: '#ffffff' }}
              onChangeItem={(item) => {
                this.setState({
                  residenceFlag: item.value == 'PG' || item.value == "Corporate Provided" ? false : true,
                  isSelected: false,
                  selectedResidentType: {
                    value: item.value || null,
                    label: item.label || null,
                  },
                });
              }}
              customArrowUp={() => <Image source={UP_ARROW} />}
              customArrowDown={() => <Image source={DOWN_ARROW} />}
              labelStyle={textStyle}
              selectedLabelStyle={[textStyle, { color: colors.COLOR_BLACK }]}
            />
            <View style={separatorInputStyle} />
          </View>
        )}

        {!flow && (
          <>
            <Text style={[kycDocLabel, { fontFamily: APP_FONTS.NunitoBold }]}>
              {this.state.indSelfSoleFlag ? ADDITIONAL_DETAILS_CONST.BUSINESS_ADDRESS : ADDITIONAL_DETAILS_CONST.RESIDING_ADDRESS}
            </Text>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <View style={{ width: '45%', marginTop: 15 }}>
                <FloatingLabelInput
                  label={ADDITIONAL_DETAILS_CONST.YEAR}
                  editable={!this.state.kycFreeze}
                  containerStyles={inputStyle}
                  maxLength={2}

                  value={this?.state?.year == '' ? this?.state?.year : this?.state?.year?.toString()}
                  keyboardType='number-pad'
                  onChangeText={(value) => {
                    // this?.state?.year.length < 2 ?
                    this.setState({ year: value, })
                    // :null
                  }}
                  customLabelStyles={{
                    colorFocused: colors.COLOR_LIGHT_NAVY_BLUE,
                    colorBlurred: colors.COLOR_LIGHT_GREY,
                    fontSizeFocused: 15,
                    fontSizeBlurred: 15,
                  }}
                  inputStyles={inputTextStyle}
                />
                <View style={separatorInputStyle} />
              </View>
              <View style={{ width: '45%', marginTop: 15 }}>
                <DropDownPicker
                  disabled={this.state.kycFreeze}
                  controller={(instance) => (this.controllerKYC = instance)}
                  items={this.state.dropDownMonth}
                  containerStyle={{ marginTop: 15, marginBottom: 10 }}
                  style={{ backgroundColor: '#ffffff', borderWidth: 0 }}
                  itemStyle={{
                    justifyContent: 'flex-start',
                    marginLeft: 4,
                  }}
                  defaultValue={this.state.selectedMonth.value}
                  placeholder={''}
                  dropDownStyle={{ backgroundColor: '#ffffff' }}
                  onChangeItem={(item) => {
                    this.setState({
                      selectedMonth: {
                        value: item.value,
                        label: item.label || null,
                      }
                    });
                  }}
                  customArrowUp={() => <Image source={UP_ARROW} />}
                  customArrowDown={() => <Image source={DOWN_ARROW} />}
                  labelStyle={textStyle}
                  selectedLabelStyle={[textStyle, { color: colors.COLOR_BLACK }]}
                />
                <Text style={[textStyle, { position: 'absolute', top: 0, marginLeft: 5, color: colors.COLOR_LIGHT_NAVY_BLUE, }]}>
                  {ADDITIONAL_DETAILS_CONST.MONTH}
                </Text>
                <View style={separatorInputStyle} />
              </View>
            </View>
          </>
        )}

        {/* kyc save */}
        {!flow && (
          <Button
            isDisabled={this.getSaveDisable() || this.state.kycFreeze}
            title={ADDITIONAL_DETAILS_CONST.BUTTON_TITLE_SAVE}
            onPress={() => {
              const dataToAPI = {
                leadCode: this.state.leadCode,
                docType: this?.state?.selectedDocType === 'driving license' ? 'drivingLicense' : this?.state?.selectedDocType === 'adhar' ? 'aadhar' : this?.state?.selectedDocType,
                applicantUniqueId: this.state.isguarantor || this.state.iscoapplicant ? this.state.coapplicantUniqueId : this.state.applicantUniqueId,
                docId: this.getSelectedDocID(),
                address1: this.state.addressLine1.value,
                address2: this.state.addressLine2.value,
                landmark1: this.state.landmark1.value,
                landmark2: this.state.landmark2.value,
                residenceType: this.state.selectedResidentType.value,
                pinCode: this.state.pincode.value,
                city: this.state.city,
                state: this.state.state,
                kycYear: this?.state?.year,
                kycMonth: Number(this.state.selectedMonth.value),
                individual: true,
                ismainapplicant: !(this.state.iscoapplicant || this.state.isguarantor),
                isguarantor: this.state.isguarantor,
                id: this.state.idToEditKYCData,

              };

              if (this?.state?.selectedDocType === 'adhar') {
                dataToAPI['aadharId'] = this?.state?.adharID?.toString()?.replace(/ /g, ""),
                  dataToAPI['addharName'] = this.state.addharName
              }
              if (this.state.indSelfSoleFlag === true) {
                dataToAPI['kycDesignation'] = this.state.selectedSourceType
                if (this.state.selectedSourceType == 'Other') {
                  dataToAPI['otherDesignation'] = this.state.radioOther
                }
              }
              if (this?.state?.selectedDocType === 'passport') {
                dataToAPI['fileNumber'] = this.state.fileNumber,
                  dataToAPI['dateOfBirth'] = this.state.dateOfBirthText
              }
              if (this?.state?.selectedDocType === 'driving license') {
                dataToAPI['dlno'] = this.state.dlNo,
                  dataToAPI['dateOfBirth'] = this.state.dateOfBirthDLText
              }
              if (this?.state?.selectedDocType === 'voter') {
                dataToAPI['epicNumber'] = this.state.epicNo
              }
              if (this?.state?.selectedDocType === 'other') {
                dataToAPI['otherName'] = this.state.selectedOtherDoc.value
              }

              if (this.state.imageData.front.uri == '') {
                handleError('Please upload document')
              }
              else {
                // console.log("mjjjjjj",Number(this.state.addressLine1.value.length) , Number(this.state.addressLine2.value.length));
                Number(this.state.addressLine1.value.length) < 30 && ( Number(this.state.addressLine2.value.length) < 30 ||  Number(this.state.addressLine2.value.length) == 0 )?
                this.props.saveKYCDetail({
                  dataToAPI,
                  callback: (response) => {
                    if (response && !response.error) {
                      this.setState({
                        kycDocDetailSaved: true,
                        kycData: true,
                        additionalDetailOptions: {
                          employementDetailsCollapsed: true,
                          officeAddressCollapsed: true,
                          registeredCollapsed: false,
                          permanentAddressCollapsed: true,
                          additionalContactCollapsed: true,
                        },
                        additionalOptions: [
                          {
                            registeredAddress: [
                              { residentialAddressCollapsed: true },
                              { addUtilityBillsCollapsed: false },
                            ],
                          },
                        ],
                      }, () => {
                        this.state.ismainapplicant ?
                          this.props.dedupeCheck({
                            data: {
                              applicantUniqueId: this.state.applicantUniqueId,

                            },
                            callback: (response) => {

                              if (response?.data?.isDedupeMatch == "Y") {
                                this.props.navigation.navigate('Dedupe', {
                                  applicantUniqueId: this.state.applicantUniqueId,
                                  leadCode: this.state.leadCode,
                                  roleId: this.props.userDataSelector.userData.data.roleId,
                                  leadName: this.state.leadName,
                                  mobileNumber: this.state.mobileNumberFromProps,
                                  coapplicantUniqueId: this.state.coapplicantUniqueId,
                                  ismainapplicant: this.state.ismainapplicant,
                                  iscoapplicant: this.state.iscoapplicant,
                                  isguarantor: this.state.isguarantor,
                                })
                              }
                              else {

                                this.props.createUpdateCUSTOMER({
                                  data: {
                                    applicant_uniqueid: this.state.isguarantor || this.state.iscoapplicant ? this.state.coapplicantUniqueId : this.state.applicantUniqueId,
                                    ismainapplicant: this.state.ismainapplicant,
                                    isguarantor: this.state.isguarantor,
                                    type: "bureau"
                                  },
                                  callback: (response) => {
                                    console.log("rrrrrrr",response);
                                    // this.props.createUpdateCUSTOMER({
                                    //   data: {
                                    //     applicantUniqueId: this.state.isguarantor || this.state.iscoapplicant ? this.state.coapplicantUniqueId : this.state.applicantUniqueId,
                                    //     ismainapplicant: this.state.ismainapplicant,
                                    //     isguarantor: this.state.isguarantor,
                                    //     type: "bureauCalling"
                                    //   },
                                    //   callback: (response) => {
                                    //     // this.componentDidMount()
                                    //     this.apiCall()

                                    //   }
                                    // })
                                  }
                                });
                              }
                            }
                          })
                          :
                          null
                        // this.props.createUpdateCUSTOMER({
                        //   data: {
                        //     applicant_uniqueid: this.state.isguarantor || this.state.iscoapplicant ? this.state.coapplicantUniqueId : this.state.applicantUniqueId,
                        //     ismainapplicant: this.state.ismainapplicant,
                        //     isguarantor: this.state.isguarantor,
                        //     type: "bureau"
                        //   },
                        //   callback: (response) => {
                        //     this.apiCall()
                        //     // this.props.createUpdateCUSTOMER({
                        //     //   data: {
                        //     //     applicantUniqueId: this.state.isguarantor || this.state.iscoapplicant ? this.state.coapplicantUniqueId : this.state.applicantUniqueId,
                        //     //     ismainapplicant: this.state.ismainapplicant,
                        //     //     isguarantor: this.state.isguarantor,
                        //     //     type: "bureauCalling"
                        //     //   },
                        //     //   callback: (response) => {
                        //     //     // this.componentDidMount()
                        //     //    this.apiCall()
                        //     //   }
                        //     // })
                        //   }
                        // });
                      });
                    }
                  },
                })
                :
                handleError("Address Line requires maximum 30 characters")
              }
            }}
            customContainerStyle={
              this.getSaveDisable() || this.state.isViewOnly ? disableStyle : saveButtonStyle
            }
            cutomTitleStyle={
              this.getSaveDisable() || this.state.isViewOnly ? disableTextStyle : saveButtonTitleStyle
            }
          />
        )}
        {/* utility save */}
        {flow === 'fromUtility' && (
          <Button
            isDisabled={this.getUtilitySaveDisabled(flow) || this.state.isViewOnly}
            title={ADDITIONAL_DETAILS_CONST.BUTTON_TITLE_SAVE}
            onPress={() => {
              let dataToAPI = {
                leadCode: this.state.leadCode,
                billType: this.state.selectedUtilityBill,
                billNumber: this.getUtilityBillNumber(),
                address1: this.state.utilityAddressLine1.value,
                address2: this.state.utilityAddressLine2.value,
                landmark1: this.state.utilityLandmark1.value,
                landmark2: this.state.utilityLandmark2.value,
                addressType: this.state.utilityAddressType.value,
                pincode: this.state.utilityPincode.value,
                residenceType: this.state.utilitySelectedResidentType.value,
                state: this.state.utilityState,
                city: this.state.utilityCity,
                ismainapplicant: !(this.state.iscoapplicant || this.state.isguarantor),
                isguarantor: this.state.isguarantor,
                applicantUniqueId:
                  this.state.isguarantor || this.state.iscoapplicant
                    ? this.state.coapplicantUniqueId
                    : this.state.applicantUniqueId,
                id: this.state.idToEditUtilityData,
              };

              if (this.state.selectedUtilityBill === 'electricity') {
                dataToAPI = {
                  ...dataToAPI,
                  serviceProvider: this.state.serviceProvider.code,
                  consumerNumber: this.state.consumerNumber,
                  utilityBillAuthResponseStatus: this.state.utilityBillAuthResponseStatus
                };
              }
              if (this.state.selectedUtilityBill === 'gas') {
                dataToAPI = {
                  ...dataToAPI,
                  lpgId: this.state.lpgID,
                  serviceProvider: this.state.utilityServiceProvider.code,
                  utilityBillAuthResponseStatus: this.state.utilityBillAuthResponseStatus

                };
              }
              if (this.state.selectedUtilityBill === 'landline') {
                dataToAPI = {
                  ...dataToAPI,
                  landLineNumber: `${this.state.stdCode}-${this.state.landlineNumber}`,
                  city: this.state.cityNameUtility.cityname,
                  utilityBillAuthResponseStatus: this.state.utilityBillAuthResponseStatus
                };
              }
              if (this.state.selectedUtilityBill === 'other') {
                dataToAPI = {
                  ...dataToAPI,
                  otherResidanceType: this.state.selectedUtilityDoc.value,
                };
              }
              if (this.state.selectedUtilityDoc.value === 'Passport') {
                dataToAPI = {
                  ...dataToAPI,
                  fileNumber: this.state.utilityFileNumber,
                  dateOfBirth: this.state.utilityDateOfBirthText
                };
              }
              if (this.state.selectedUtilityDoc.value === 'Landline bill') {
                dataToAPI = {
                  ...dataToAPI,
                  telephoneNo: this.state.utilityTelephoneNo,
                  telephoneCity: this.state.utilityCity
                };
              }
              if (this.state.selectedUtilityDoc.value === 'Aadhar + Driving Licence') {
                dataToAPI = {
                  ...dataToAPI,
                  drivingLicenceNo: this.state.utilityDlNo,
                  dateOfBirth: this.state.utilityDateOfBirthText
                };
              }
              if (this.state.selectedUtilityDoc.value === 'Pipeline gas receipt') {
                dataToAPI = {
                  ...dataToAPI,
                  lpgId: this.state.lpgID,
                  serviceProvider: this.state.utilityServiceProvider.value
                };
              }
              if (this.state.selectedUtilityDoc.value === 'Aadhar + voter id') {
                dataToAPI = {
                  ...dataToAPI,
                  epicNo: this.state.utilityEpicNo,
                };
              }
              if (this.state.imageDataUtility.front.uri == '') {
                handleError('Please upload document')
              }
              else {

                this.props.saveUtilityDetails({
                  dataToAPI,
                  callback: (response) => {
                    if (response && !response.error) {
                      this.setState({
                        utilityBillData: true,
                        isUtiltiySaved: true,
                        additionalDetailOptions: {
                          employementDetailsCollapsed: true,
                          officeAddressCollapsed: true,
                          registeredCollapsed: true,
                          permanentAddressCollapsed: false,
                          additionalContactCollapsed: true,
                        },
                      }, () => {
                        // this.state.ismainapplicant ?
                        //   this.props.createUpdateCUSTOMER({
                        //     data: {
                        //       applicant_uniqueid: this.state.isguarantor || this.state.iscoapplicant ? this.state.coapplicantUniqueId : this.state.applicantUniqueId,
                        //       ismainapplicant: this.state.ismainapplicant,
                        //       isguarantor: this.state.isguarantor,
                        //     },
                        //     callback: (response) => {
                        //       this.apiCall()
                        //     }
                        //   })
                        //   : null
                      });
                    }
                  },
                });
              }
            }}
            customContainerStyle={
              this.getUtilitySaveDisabled(flow) || this.state.isViewOnly ? disableStyle : saveButtonStyle
            }
            cutomTitleStyle={
              this.getUtilitySaveDisabled(flow) || this.state.isViewOnly
                ? disableTextStyle
                : saveButtonTitleStyle
            }
          />
        )}
      </View>
    );
  }

  getSelectedDocID() {
    if (this?.state?.selectedDocType === 'adhar') {
      return parseInt(this?.state?.adharID?.toString()?.replace(/ /g, ""));
    } else if (this?.state?.selectedDocType === 'passport') {
      return (this.state.fileNumber);
    } else if (this?.state?.selectedDocType === 'driving license') {
      return (this.state.dlNo);
    } else if (this?.state?.selectedDocType === 'voter') {
      return (this.state.epicNo);
    } else if (this?.state?.selectedDocType === 'other') {
      return (this.state.selectedOtherDoc.value);
    }
    return '';
  }

  validateExp() {
    console.log("fffff",this.state.empYear , this.state.jobYear);
    if (this.state.empYear > this.state.jobYear) {
      return true
    }
    if (this.state.empYear == this.state.jobYear && this.state.empMonth.value != this.state.jobMonth.value && this.state.empMonth.value >= this.state.jobMonth.value) {
      return true
    }
    else {
      handleWarning('Current job experience exceeds total work experience')
      return false

    }
  }

  renderKYCDocument() {
    const {
      kycDocLabel,
      kycDocContainer,
      plusImageStyle,
      seperatorStyle,
      collapsedContainer,
      collapsedViewStyle,
      registeredAddressLabel,
      mainContainer,
      inputTextStyle,
      separatorInputStyle,
      inputStyle,
      marginTop20Style,
    } = AdditionalDetailsStyles;

    if (
      this.state.additionalOptions[0].registeredAddress[0]
        .residentialAddressCollapsed
    ) {
      return (
        <View style={marginTop20Style}>
          <View
            style={[collapsedContainer, { marginLeft: -20, marginRight: -20 }]}>
            <View style={collapsedViewStyle}>
              <TouchableOpacity
                style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}
                onPress={() => {
                  this.collapseInvert('addKYC');
                }}>
                <Text style={registeredAddressLabel}>
                  {
                    // this.state.iscoapplicant || this.state.isguarantor ? ADDITIONAL_DETAILS_CONST.ADD_KYC_LABEL_COAPPLICANT : 
                    ADDITIONAL_DETAILS_CONST.ADD_KYC_LABEL}
                </Text>

                <Image source={BLUE_PLUS_ICON} style={plusImageStyle} />
              </TouchableOpacity>
            </View>
            <View style={mainContainer}>{this.renderAddUtilityBills()}</View>
          </View>
        </View>
      );
    } else {
      return (
        <View style={kycDocContainer}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <TouchableOpacity
              style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}
              onPress={() => {
                this.collapseInvert('addKYC');
              }}>
              <Text style={kycDocLabel}>
                {
                  // this.state.iscoapplicant || this.state.isguarantor ? ADDITIONAL_DETAILS_CONST.ADD_KYC_LABEL_COAPPLICANT : 
                  ADDITIONAL_DETAILS_CONST.ADD_KYC_LABEL}
              </Text>

              <Image
                source={MINUS_ICON}
                style={plusImageStyle}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
          {this.state.indSelfSoleFlag &&
            <View style={{ marginTop: 10, }}>
              <Text style={{ fontFamily: APP_FONTS.NunitoBold, fontSize: FONT_SIZE.l, marginBottom: 5 }}>
                {"Designation"}
              </Text>
              {this.state.sourceType.map((value, index) => (
                <View key={index} style={{ marginBottom: 5 }}>
                  <RadioButton
                    title={value.title}

                    isSelected={
                      this?.state.selectedSourceType?.toLowerCase() ===
                        value?.title?.toLowerCase()
                        ? true
                        : false
                    }
                    onPress={() => {
                      // if (!this.state.isViewOnly) {
                      //   return this.selectRadioButton(value, index);
                      // }
                    }}
                  />
                </View>
              ))}
              {this.state.selectedSourceType == 'Other' &&
                <View style={{ width: '90%', marginTop: 5 }}>
                  <FloatingLabelInput
                    label={'Other*'}
                    editable={!this.state.isViewOnly}
                    containerStyles={inputStyle}
                    maxLength={20}
                    value={this.state.radioOther == '' ? this.state.radioOther : this.state.radioOther.toString()}
                    onChangeText={(value) => {
                      this.setState({ radioOther: value, })
                    }}
                    customLabelStyles={{
                      colorFocused: colors.COLOR_LIGHT_NAVY_BLUE,
                      colorBlurred: colors.COLOR_LIGHT_GREY,
                      fontSizeFocused: 15,
                      fontSizeBlurred: 15,
                    }}
                    inputStyles={inputTextStyle}
                  />
                  <View style={separatorInputStyle} />
                </View>}
            </View>}
          {this.renderPlusIconWithDoc()}
          {this.renderDynamicInputPerDocType()}
          {this?.state?.selectedDocType !== '' && this.renderUploadPlaceholder()}
          {this.renderResidentialAddress()}

          <View style={seperatorStyle} />
          {this.renderAddUtilityBills()}
        </View>
      );
    }
  }

  onDOBDatePicked = (date) => {
    this.setState({
      dateOfBirth: date,
      dateOfBirthText: moment(date).format('DD/MM/YYYY'),
    });
  };

  //date change
  onUtilityDatePicked = (date) => {
    this.setState({
      utilityDateOfBirth: date,
      utilityDateOfBirthText: moment(date).format('DD-MM-YYYY'),
    });
  };

  onUtilityPassportDatePicked = (date) => {
    this.setState({
      utilityDateOfBirth: date,
      utilityDateOfBirthText: moment(date).format('DD/MM/YYYY'),
    });
  };

  onDOBDateDLPicked = (date) => {
    this.setState({
      dateOfBirthDL: date,
      dateOfBirthDLText: moment(date).format('YYYY-MM-DD'),
    });
  };

  renderDynamicInputPerDocType() {
    const {
      inputStyle,
      inputTextStyle,
      separatorInputStyle,
      textStyle,
      textStyle1,
      calendarTextStyle,
      marginTop20Style,
    } = AdditionalDetailsStyles;
    if (this?.state?.selectedDocType?.toLowerCase() === 'adhar') {
      return (
        //mj
        <>
          <View style={marginTop20Style}>
            <FloatingLabelInput
              label={ADDITIONAL_DETAILS_CONST.ADHAR_ID}
              containerStyles={inputStyle}
              value={this.state.adharID}
              mask="9999 9999 9999"
              editable={!this.state.kycFreeze}
              onChangeText={(value) => {
                this.setState({
                  adharID: value,
                  adharIdValid: AADHAR_REGEX.test(value)
                });
              }}
              keyboardType={'number-pad'}
              maxLength={12}
              customLabelStyles={{
                colorFocused: colors.COLOR_LIGHT_NAVY_BLUE,
                colorBlurred: colors.COLOR_LIGHT_GREY,
                fontSizeFocused: 15,
                fontSizeBlurred: 15,
              }}
              inputStyles={inputTextStyle}
            />
            <View style={separatorInputStyle} />
            {!this.state.adharIdValid && (
              <Text style={{ color: 'red', marginTop: 3, }}>{this.state.adharID == '' ? ADDITIONAL_DETAILS_CONST.REQUIRED_AADHAR_NUMBER : ADDITIONAL_DETAILS_CONST.INVALID_AADHAR_NUMBER}</Text>)}
          </View>
          <View style={marginTop20Style}>
            <FloatingLabelInput
              label={ADDITIONAL_DETAILS_CONST.ADHAR_NAME}
              containerStyles={inputStyle}
              value={this.state.addharName}
              editable={!this.state.kycFreeze}
              onChangeText={(value) => {
                this.setState({
                  addharName: value,
                  adharNameValid: NAME_REGEX.test(value)
                });
              }}
              customLabelStyles={{
                colorFocused: colors.COLOR_LIGHT_NAVY_BLUE,
                colorBlurred: colors.COLOR_LIGHT_GREY,
                fontSizeFocused: 15,
                fontSizeBlurred: 15,
              }}
              inputStyles={inputTextStyle}
            />
            <View style={separatorInputStyle} />
            {!this.state.adharNameValid && (
              <Text style={{ color: 'red', marginTop: 3, }}>{this.state.addharName == '' ? ADDITIONAL_DETAILS_CONST.REQUIRED_AADHAR_NAME : ADDITIONAL_DETAILS_CONST.INVALID_AADHAR_NAME}</Text>)}
          </View>
        </>
      );
    }

    if (this?.state?.selectedDocType?.toLowerCase() === 'passport') {
      return (
        <View>
          <View style={marginTop20Style}>
            <FloatingLabelInput
              label={ADDITIONAL_DETAILS_CONST.FILE_NUMBER_PASSPORT}
              containerStyles={inputStyle}
              editable={!this.state.kycFreeze}
              value={this.state.fileNumber || undefined}
              maxLength={8}
              onChangeText={(value) => {
                this.setState({
                  fileNumber: value,
                  fileNumberValid: PASSPORT_REGEX.test(value)
                }, () => {
                  if (this.state.fileNumber.length === 8) {
                    this.setState({
                      fileNumber: this.state.fileNumber.toUpperCase()
                    })
                  }
                });
              }}
              customLabelStyles={{
                colorFocused: colors.COLOR_LIGHT_NAVY_BLUE,
                colorBlurred: colors.COLOR_LIGHT_GREY,
                fontSizeFocused: 15,
                fontSizeBlurred: 15,
              }}
              inputStyles={inputTextStyle}
            />
            <View style={separatorInputStyle} />
            {!this.state.fileNumberValid && (
              <Text style={{ color: 'red', marginTop: 3, }}>{this.state.fileNumber == '' ? ADDITIONAL_DETAILS_CONST.REQUIRED_FILE_NUMBER : ADDITIONAL_DETAILS_CONST.INVALID_FILE_NUMBER}</Text>)}
          </View>
          <TouchableOpacity
            onPress={() => {
              if (!this.state.kycFreeze) {
                this.refs.dobDialog.open({
                  date: new Date(),
                  maxDate: new Date(), //To restirct future date
                });
              }
            }}
            style={{ marginTop: 15 }}>
            <Text style={[textStyle, { fontSize: 15, marginLeft: 5 }]}>
              {ADDITIONAL_DETAILS_CONST.DATE_OF_BIRTH}
            </Text>
            <Text style={[calendarTextStyle, { marginLeft: 3 }]}>
              {this.state.dateOfBirthText}
            </Text>
            <View style={separatorInputStyle} />
            {(moment(this.state.dateOfBirthText, ["MM-DD-YYYY", "YYYY-MM-DD", "DD/MM/YYYY"]) >
              moment().clone().subtract(18, 'years')) && (
                <Text style={{ color: 'red', marginTop: 3, }}>{ADDITIONAL_DETAILS_CONST.INVALID_DOB}</Text>)}
          </TouchableOpacity>
          <DatePickerDialog
            ref="dobDialog"
            date={this.state.dateOfBirth}
            onDatePicked={this.onDOBDatePicked.bind(this)}
          />
        </View>
      );
    }

    if (this?.state?.selectedDocType?.toLowerCase() === 'driving license') {
      return (
        <View>
          <View style={marginTop20Style}>
            <FloatingLabelInput
              label={ADDITIONAL_DETAILS_CONST.DL_NO}
              containerStyles={inputStyle}
              editable={!this.state.kycFreeze}
              value={this.state.dlNo || undefined}
              onChangeText={(value) => {
                this.setState({
                  dlNo: value,
                  dlNoValid: EPICNO_REGEX.test(value)
                }, () => {
                  if (this.state.dlNo.length === 16) {
                    this.setState({
                      dlNo: this.state.dlNo.toUpperCase()
                    })
                  }
                });
              }}
              maxLength={16}
              customLabelStyles={{
                colorFocused: colors.COLOR_LIGHT_NAVY_BLUE,
                colorBlurred: colors.COLOR_LIGHT_GREY,
                fontSizeFocused: 15,
                fontSizeBlurred: 15,
              }}
              inputStyles={inputTextStyle}
            />
            <View style={separatorInputStyle} />
            {!this.state.dlNoValid && (
              <Text style={{ color: 'red', marginTop: 3, }}>{this.state.dlNo == '' ? ADDITIONAL_DETAILS_CONST.REQUIRED_DL_NUMBER : ADDITIONAL_DETAILS_CONST.INVALID_DL_NUMBER}</Text>)}
          </View>

          <TouchableOpacity
            onPress={() => {
              if (!this.state.kycFreeze) {
                this.refs.dobDialog.open({
                  date: new Date(),
                  maxDate: new Date(), //To restirct future date
                });
              }
            }}
            style={{ marginTop: 15 }}>
            <Text style={[textStyle, { fontSize: 15, marginLeft: 5 }]}>
              {ADDITIONAL_DETAILS_CONST.DATE_OF_BIRTH}
            </Text>
            <Text style={[calendarTextStyle, { marginLeft: 3 }]}>
              {this.state.dateOfBirthDLText}
            </Text>
            <View style={separatorInputStyle} />
            {(moment(this.state.dateOfBirthDLText, ["MM-DD-YYYY", "YYYY-MM-DD", "DD/MM/YYYY"]) >
              moment().clone().subtract(18, 'years')) && (
                <Text style={{ color: 'red', marginTop: 3, }}>{ADDITIONAL_DETAILS_CONST.INVALID_DOB}</Text>)}
          </TouchableOpacity>
          <DatePickerDialog
            ref="dobDialog"
            date={this.state.dateOfBirthDL}
            onDatePicked={this.onDOBDateDLPicked.bind(this)}
          />
        </View>
      );
    }

    if (this?.state?.selectedDocType?.toLowerCase() === 'voter') {
      return (
        <View style={marginTop20Style}>
          <FloatingLabelInput
            label={ADDITIONAL_DETAILS_CONST.EPIC_NUMBER}
            containerStyles={inputStyle}
            editable={!this.state.kycFreeze}
            value={this.state.epicNo || undefined}
            onChangeText={(value) => {
              this.setState({
                epicNo: value,
                epicNoValid: EPICNO_REGEX.test(value)
              });
            }}
            customLabelStyles={{
              colorFocused: colors.COLOR_LIGHT_NAVY_BLUE,
              colorBlurred: colors.COLOR_LIGHT_GREY,
              fontSizeFocused: 15,
              fontSizeBlurred: 15,
            }}
            inputStyles={inputTextStyle}
          />
          <View style={separatorInputStyle} />
          {!this.state.epicNoValid && (
            <Text style={{ color: 'red', marginTop: 3, }}>{this.state.epicNo == '' ? ADDITIONAL_DETAILS_CONST.REQUIRED_EPIC_NUMBER : ADDITIONAL_DETAILS_CONST.INVALID_EPIC_NUMBER}</Text>)}
        </View>
      );
    }

    if (this?.state?.selectedDocType?.toLowerCase() === 'other') {
      return (
        <View
          style={{
            ...(Platform.OS !== 'android' && {
              zIndex: 10,
            }),
          }}>

          <Text style={{
            color: colors.COLOR_LIGHT_NAVY_BLUE,
            fontFamily: APP_FONTS.NunitoRegular,
            fontSize: 16,
            marginLeft: 4,
            marginBottom: -5,
            marginTop: 20
          }}>Other*</Text>

          <DropDownPicker
            disabled={this.state.kycFreeze}
            items={this.state.kycDocList}
            containerStyle={{ flex: 1, marginTop: 5, marginBottom: 15 }}
            style={{ backgroundColor: '#ffffff', borderWidth: 0 }}
            itemStyle={{
              justifyContent: 'flex-start',
              marginLeft: 4,
            }}
            defaultValue={this.state.selectedOtherDoc.value}
            placeholder={""}
            dropDownStyle={{ backgroundColor: '#ffffff' }}
            onChangeItem={(item) => {
              this.setState({
                selectedOtherDoc: {
                  label: item.label || null,
                  value: item.value || null
                }
              })
            }
            }
            customArrowUp={() => <Image source={UP_ARROW} />}
            customArrowDown={() => <Image source={DOWN_ARROW} />}
            labelStyle={textStyle}
            selectedLabelStyle={[textStyle, { color: colors.COLOR_BLACK }]}
          />
          <View style={separatorInputStyle} />
        </View>
      );
    }
  }

  renderAddUtilityBills() {
    const {
      collapsedContainer,
      collapsedViewStyle,
      registeredAddressLabel,
      plusImageStyle,
      expandedContainer,
      seperatorStyle,
      expandedViewStyle,
      marginTop20Style,
    } = AdditionalDetailsStyles;

    if (
      this.state.additionalOptions[0].registeredAddress[1]
        .addUtilityBillsCollapsed
    ) {
      return (
        <View style={marginTop20Style}>
          <View
            style={[collapsedContainer, { marginLeft: -20, marginRight: -20 }]}>
            <View style={[collapsedViewStyle, {}]}>
              <TouchableOpacity
                style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}
                onPress={() => {
                  this.collapseInvert('addUtility');
                }}>
                <View style={{ width: '90%', }}>
                  <Text style={registeredAddressLabel}>
                    {ADDITIONAL_DETAILS_CONST.ADD_UTILITY_BILL}
                  </Text>
                </View>
                <View style={{ width: '10%', justifyContent: 'center', alignItems: 'center' }}>
                  <Image source={BLUE_PLUS_ICON} style={plusImageStyle} />
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <View style={[seperatorStyle, { marginLeft: -20, marginRight: -20 }]} />
        </View>
      );
    } else {
      return (
        <View style={[expandedContainer, { marginLeft: -20, marginRight: -20 }]}>
          <View style={[seperatorStyle, { marginLeft: 0, marginRight: 0 }]} />
          <View style={[expandedViewStyle, { marginLeft: 20, marginRight: 20 }]}>
            <TouchableOpacity
              style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}
              onPress={() => {
                this.collapseInvert('addUtility');
              }}>
              <View style={{ width: '90%', }}>
                <Text style={registeredAddressLabel}>
                  {ADDITIONAL_DETAILS_CONST.ADD_UTILITY_BILL}
                </Text>
              </View>
              <View style={{ width: '10%', justifyContent: 'center', alignItems: 'center' }}>
                <Image source={MINUS_ICON} style={plusImageStyle} resizeMode="contain" />
              </View>

            </TouchableOpacity>
          </View>

          <View style={{ marginLeft: 20, marginRight: 20 }}>
            {this.renderUploadUtility()}
            {this.renderUtilityDynamicInput()}
            {this.state.selectedUtilityBill !== '' &&
              this.renderUploadPlaceholder('fromUtility')}
            {this.renderResidentialAddress('fromUtility')}
          </View>
          <View style={[seperatorStyle, { marginLeft: 0, marginRight: 0 }]} />
        </View>
      );
    }
  }

  renderUtilityDynamicInput() {
    const {
      inputStyle,
      inputTextStyle,
      separatorInputStyle,
      textStyle,
      textStyle1,
      marginTop20Style,
      calendarTextStyle,
    } = AdditionalDetailsStyles;

    if (this.state.selectedUtilityBill.toLowerCase() === 'electricity') {
      return (
        <View>
          <View>
            <Text
              style={{
                marginTop: 30, marginBottom: -4, marginLeft: 5, color: colors.COLOR_LIGHT_NAVY_BLUE, fontFamily: APP_FONTS.NunitoRegular,
                fontSize: 16,
              }}>
              {ADDITIONAL_DETAILS_CONST.SERVICE_PROVIDER}
            </Text>

            <DropDownPicker
              disabled={this.state.isViewOnly}
              items={this.state.serviceProviderList}
              containerStyle={{ flex: 1, marginTop: 5, marginBottom: 15 }}
              style={{ backgroundColor: '#ffffff', borderWidth: 0 }}
              itemStyle={{
                justifyContent: 'flex-start',
                marginLeft: 4,
              }}
              defaultValue={this.state.serviceProvider.value}
              placeholder={
                ""
              }
              dropDownStyle={{ backgroundColor: '#ffffff' }}
              onChangeItem={(item) =>
                this.setState({
                  serviceProvider: {
                    value: item.value || null,
                    label: item.label || null,
                    code: item.code || null
                  }
                })
              }
              customArrowUp={() => <Image source={UP_ARROW} />}
              customArrowDown={() => <Image source={DOWN_ARROW} />}
              labelStyle={textStyle}
              selectedLabelStyle={[textStyle, { color: colors.COLOR_BLACK }]}
            />
            <View style={separatorInputStyle} />
          </View>

          <View>
            <FloatingLabelInput
              editable={!this.state.isViewOnly}
              label={ADDITIONAL_DETAILS_CONST.CONSUMER_NUMBER}
              containerStyles={inputStyle}
              // keyboardType={'number-pad'}
              value={this.state.consumerNumber || undefined}
              onChangeText={(value) => {
                this.setState({
                  consumerNumber: value,
                  consumerNumberValid: CONSUMER_NO_REGEX.test(value)

                });
              }}
              customLabelStyles={{
                colorFocused: colors.COLOR_LIGHT_NAVY_BLUE,
                colorBlurred: colors.COLOR_LIGHT_GREY,
                fontSizeFocused: 15,
                fontSizeBlurred: 15,
              }}
              inputStyles={inputTextStyle}
            />
            <View style={separatorInputStyle} />
            {!this.state.consumerNumberValid && (
              <Text style={{ color: 'red', marginTop: 3, }}>{this.state.consumerNumber == '' ? ADDITIONAL_DETAILS_CONST.REQUIRED_CONSUMER_NUMBER : ADDITIONAL_DETAILS_CONST.INVALID_CONSUMER_NUMBER}</Text>)}
          </View>
        </View>
      );
    }

    if (this.state.selectedUtilityBill.toLowerCase() === 'gas') {
      return (
        <>


          <View style={marginTop20Style}>
            <FloatingLabelInput
              editable={!this.state.isViewOnly}
              label={ADDITIONAL_DETAILS_CONST.LPG_ID}
              containerStyles={inputStyle}
              keyboardType={'number-pad'}
              value={this.state.lpgID || undefined}
              onChangeText={(value) => {
                this.setState({
                  lpgID: value,
                  lpgValid: NUMBER_REGEX.test(value) && value.length == 17
                });
              }}
              customLabelStyles={{
                colorFocused: colors.COLOR_LIGHT_NAVY_BLUE,
                colorBlurred: colors.COLOR_LIGHT_GREY,
                fontSizeFocused: 15,
                fontSizeBlurred: 15,
              }}
              inputStyles={inputTextStyle} />
            <View style={separatorInputStyle} />
            {!this.state.lpgValid && (
              <Text style={{ color: 'red', marginTop: 3, }}>{this.state.lpgID === '' ? ADDITIONAL_DETAILS_CONST.REQUIRED_LPG_NUMBER : ADDITIONAL_DETAILS_CONST.INVALID_LPG_NUMBER}</Text>)}
          </View>


        </>
      );
    }

    if (this.state.selectedUtilityBill.toLowerCase() === 'landline') {
      return (
        <View>
          <View
            style={{
              ...(Platform.OS !== 'android' && {
                zIndex: 10,
              }),
            }}>
            <DropDownPicker
              disabled={this.state.isViewOnly}
              items={this.state.cityList}
              containerStyle={{ flex: 1, marginTop: 5, marginBottom: 15 }}
              style={{ backgroundColor: '#ffffff', borderWidth: 0 }}
              itemStyle={{
                justifyContent: 'flex-start',
                marginLeft: 4,
              }}
              placeholder={this.state.cityNameUtility !== ''
                ? this.state.cityNameUtility
                : ADDITIONAL_DETAILS_CONST.CITY}
              dropDownStyle={{ backgroundColor: '#ffffff' }}
              onChangeItem={(item) =>
                this.setState({ cityNameUtility: item.value })
              }
              customArrowUp={() => <Image source={UP_ARROW} />}
              customArrowDown={() => <Image source={DOWN_ARROW} />}
              labelStyle={textStyle}
              selectedLabelStyle={[textStyle, { color: colors.COLOR_BLACK }]}
            />
            <View style={separatorInputStyle} />
          </View>


          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <View style={{ width: '49%', marginTop: 20 }}>
              <FloatingLabelInput
                editable={!this.state.isViewOnly}
                label={ADDITIONAL_DETAILS_CONST.LABEL_LANDLINE_NUMBER}
                containerStyles={inputStyle}
                value={this.state.landlineNumber || undefined}
                onChangeText={(value) => {
                  this.setState({
                    landlineNumber: value,
                  });
                }}
                customLabelStyles={{
                  colorFocused: colors.COLOR_LIGHT_NAVY_BLUE,
                  colorBlurred: colors.COLOR_LIGHT_GREY,
                  fontSizeFocused: 15,
                  fontSizeBlurred: 15,
                }}
                inputStyles={inputTextStyle}
              />
              <View style={separatorInputStyle} />
            </View>
            <View style={{ width: '49%', marginTop: 20 }}>
              <FloatingLabelInput
                editable={!this.state.isViewOnly}
                label={ADDITIONAL_DETAILS_CONST.STD_CODE}
                containerStyles={inputStyle}
                value={this.state.stdCode || undefined}
                onChangeText={(value) => {
                  this.setState({
                    stdCode: value,
                  });
                }}
                customLabelStyles={{
                  colorFocused: colors.COLOR_LIGHT_NAVY_BLUE,
                  colorBlurred: colors.COLOR_LIGHT_GREY,
                  fontSizeFocused: 15,
                  fontSizeBlurred: 15,
                }}
                inputStyles={inputTextStyle}
              />
              <View style={separatorInputStyle} />
            </View>

          </View>
        </View>
      );
    }
    ///mj
    if (this.state.selectedUtilityBill.toLowerCase() === 'other') {
      return (
        <View
          style={{
            ...(Platform.OS !== 'android' && {
              zIndex: 10,
            }),
          }}>
          <Text style={{
            color: colors.COLOR_LIGHT_NAVY_BLUE,
            fontFamily: APP_FONTS.NunitoRegular,
            fontSize: 16,
            marginLeft: 4,
            marginBottom: -5,
            marginTop: 20
          }}>Other*</Text>

          <DropDownPicker
            disabled={this.state.isViewOnly}
            items={this.state.utilityDocList}
            containerStyle={{ flex: 1, marginTop: 5, marginBottom: 15 }}
            style={{ backgroundColor: '#ffffff', borderWidth: 0 }}
            itemStyle={{
              justifyContent: 'flex-start',
              marginLeft: 4,
            }}
            defaultValue={this.state.selectedUtilityDoc.value}
            placeholder={""}
            dropDownStyle={{ backgroundColor: '#ffffff' }}
            onChangeItem={(item) =>
              this.setState({
                selectedUtilityDoc: {
                  value: item.value || null,
                  label: item.label || null
                },
                utilityEpicNo: '',
                utilityEpicNoValid: true,
                utilityFileNumber: '',
                utilityFileNumberValid: true,
                utilityDateOfBirth: null,
                utilityDateOfBirthText: '',
                utilityDlNo: '',
                utilityDlNoValid: true,
                utilityCity: '',
                utilityCityValid: true,
                utilityTelephoneNo: '',
                utilityTelephoneNoValid: true,

              })
            }
            customArrowUp={() => <Image source={UP_ARROW} />}
            customArrowDown={() => <Image source={DOWN_ARROW} />}
            labelStyle={textStyle}
            selectedLabelStyle={[textStyle, { color: colors.COLOR_BLACK }]}
          />
          <View style={separatorInputStyle} />

          {this?.state?.selectedUtilityDoc.value === 'Passport' &&
            <View>
              <View style={{}}>
                <FloatingLabelInput
                  label={ADDITIONAL_DETAILS_CONST.FILE_NUMBER_PASSPORT}
                  containerStyles={inputStyle}
                  editable={!this.state.isViewOnly}
                  value={this.state.utilityFileNumber || undefined}
                  // maxLength={8}
                  onChangeText={(value) => {
                    this.setState({
                      utilityFileNumber: value,
                      utilityFileNumberValid: PASSPORT_REGEX.test(value)
                    }, () => {
                      // if (this.state.utilityFileNumber.length === 8) {
                      //   this.setState({
                      //     utilityFileNumber: this.state.utilityFileNumber.toUpperCase()
                      //   })
                      // }
                    });
                  }}
                  customLabelStyles={{
                    colorFocused: colors.COLOR_LIGHT_NAVY_BLUE,
                    colorBlurred: colors.COLOR_LIGHT_GREY,
                    fontSizeFocused: 15,
                    fontSizeBlurred: 15,
                  }}
                  inputStyles={inputTextStyle}
                />
                <View style={separatorInputStyle} />
                {!this.state.utilityFileNumberValid && (
                  <Text style={{ color: 'red', marginTop: 3, }}>{this.state.utilityFileNumber == '' ? ADDITIONAL_DETAILS_CONST.REQUIRED_FILE_NUMBER : ADDITIONAL_DETAILS_CONST.INVALID_FILE_NUMBER}</Text>)}
              </View>
              <TouchableOpacity
                onPress={() => {
                  if (!this.state.isViewOnly) {
                    this.refs.dobDialog.open({
                      date: new Date(),
                      maxDate: new Date(), //To restirct future date
                    });
                  }
                }}
                style={{ marginTop: 15 }}>
                <Text style={[textStyle, { fontSize: 15, marginLeft: 5 }]}>
                  {ADDITIONAL_DETAILS_CONST.DATE_OF_BIRTH}
                </Text>
                <Text style={[calendarTextStyle, { marginLeft: 3 }]}>
                  {this.state.utilityDateOfBirthText}
                </Text>
                <View style={separatorInputStyle} />
                {(moment(this.state.utilityDateOfBirth, ["MM-DD-YYYY", "YYYY-MM-DD", "DD/MM/YYYY"]) >
                  moment().clone().subtract(18, 'years')) && (
                    <Text style={{ color: 'red', marginTop: 3, }}>{ADDITIONAL_DETAILS_CONST.INVALID_DOB}</Text>)}
              </TouchableOpacity>
              <DatePickerDialog
                ref="dobDialog"
                date={this.state.utilityDateOfBirth}
                onDatePicked={this.onUtilityPassportDatePicked.bind(this)}
              />
            </View>}

          {this?.state?.selectedUtilityDoc.value === 'Landline bill' &&
            <View>
              <View style={{}}>
                <FloatingLabelInput
                  label={'Telephone Number'}
                  containerStyles={inputStyle}
                  editable={!this.state.isViewOnly}
                  value={this.state.utilityTelephoneNo || undefined}
                  // maxLength={8}
                  keyboardType={'number-pad'}
                  onChangeText={(value) => {
                    this.setState({
                      utilityTelephoneNo: value,
                      utilityTelephoneNoValid: TELEPHONE_REGEX.test(value)
                    });
                  }}
                  customLabelStyles={{
                    colorFocused: colors.COLOR_LIGHT_NAVY_BLUE,
                    colorBlurred: colors.COLOR_LIGHT_GREY,
                    fontSizeFocused: 15,
                    fontSizeBlurred: 15,
                  }}
                  inputStyles={inputTextStyle}
                />
                <View style={separatorInputStyle} />
                {!this.state.utilityTelephoneNoValid && (
                  <Text style={{ color: 'red', marginTop: 3, }}>{this.state.utilityTelephoneNo == '' ? ADDITIONAL_DETAILS_CONST.REQUIRED_TELEPHONE_NUMBER : ADDITIONAL_DETAILS_CONST.INVALID_TELEPHONE_NUMBER}</Text>)}

                <FloatingLabelInput
                  label={'City'}
                  containerStyles={inputStyle}
                  editable={!this.state.isViewOnly}
                  value={this.state.utilityCity || undefined}
                  maxLength={8}
                  onChangeText={(value) => {
                    this.setState({
                      utilityCity: value,
                      utilityCityValid: NAME_REGEX.test(value)
                    });
                  }}
                  customLabelStyles={{
                    colorFocused: colors.COLOR_LIGHT_NAVY_BLUE,
                    colorBlurred: colors.COLOR_LIGHT_GREY,
                    fontSizeFocused: 15,
                    fontSizeBlurred: 15,
                  }}
                  inputStyles={inputTextStyle}
                />
                <View style={separatorInputStyle} />
                {!this.state.utilityCityValid && (
                  <Text style={{ color: 'red', marginTop: 3, }}>{this.state.utilityCity == '' ? ADDITIONAL_DETAILS_CONST.REQUIRED_CITY_NAME : ADDITIONAL_DETAILS_CONST.INVALID_CITY_NAME}</Text>)}
              </View>
            </View>}

          {this?.state?.selectedUtilityDoc.value === 'Aadhar + Driving Licence' &&
            <View>
              <View style={{}}>
                <FloatingLabelInput
                  label={ADDITIONAL_DETAILS_CONST.DL_NO}
                  containerStyles={inputStyle}
                  editable={!this.state.isViewOnly}
                  value={this.state.utilityDlNo || undefined}
                  onChangeText={(value) => {
                    this.setState({
                      utilityDlNo: value,
                      utilityDlNoValid: EPICNO_REGEX.test(value)
                    }, () => {
                      if (this.state.utilityDlNo.length === 16) {
                        this.setState({
                          utilityDlNo: this.state.utilityDlNo.toUpperCase()
                        })
                      }
                    });
                  }}
                  maxLength={16}
                  customLabelStyles={{
                    colorFocused: colors.COLOR_LIGHT_NAVY_BLUE,
                    colorBlurred: colors.COLOR_LIGHT_GREY,
                    fontSizeFocused: 15,
                    fontSizeBlurred: 15,
                  }}
                  inputStyles={inputTextStyle}
                />
                <View style={separatorInputStyle} />
                {!this.state.utilityDlNoValid && (
                  <Text style={{ color: 'red', marginTop: 3, }}>{this.state.utilityDlNo == '' ? ADDITIONAL_DETAILS_CONST.REQUIRED_DL_NUMBER : ADDITIONAL_DETAILS_CONST.INVALID_DL_NUMBER}</Text>)}
              </View>

              <TouchableOpacity
                onPress={() => {
                  if (!this.state.isViewOnly) {
                    this.refs.dobDialog.open({
                      date: new Date(),
                      maxDate: new Date(), //To restirct future date
                    });
                  }
                }}
                style={{ marginTop: 15 }}>
                <Text style={[textStyle, { fontSize: 15, marginLeft: 5 }]}>
                  {ADDITIONAL_DETAILS_CONST.DATE_OF_BIRTH}
                </Text>
                <Text style={[calendarTextStyle, { marginLeft: 3 }]}>
                  {this.state.utilityDateOfBirthText}
                </Text>
                <View style={separatorInputStyle} />
                {(moment(this.state.utilityDateOfBirth, ["MM-DD-YYYY", "YYYY-MM-DD", "DD/MM/YYYY"]) >
                  moment().clone().subtract(18, 'years')) && (
                    <Text style={{ color: 'red', marginTop: 3, }}>{ADDITIONAL_DETAILS_CONST.INVALID_DOB}</Text>)}
              </TouchableOpacity>
              <DatePickerDialog
                ref="dobDialog"
                date={this.state.utilityDateOfBirth}
                onDatePicked={this.onUtilityDatePicked.bind(this)}
              />
            </View>}

          {this?.state?.selectedUtilityDoc.value === 'Aadhar + voter id' &&
            <View style={{}}>
              <FloatingLabelInput
                label={ADDITIONAL_DETAILS_CONST.EPIC_NUMBER}
                containerStyles={inputStyle}
                editable={!this.state.isViewOnly}
                value={this.state.utilityEpicNo || undefined}
                onChangeText={(value) => {
                  this.setState({
                    utilityEpicNo: value,
                    utilityEpicNoValid: EPICNO_REGEX.test(value)
                  });
                }}
                customLabelStyles={{
                  colorFocused: colors.COLOR_LIGHT_NAVY_BLUE,
                  colorBlurred: colors.COLOR_LIGHT_GREY,
                  fontSizeFocused: 15,
                  fontSizeBlurred: 15,
                }}
                inputStyles={inputTextStyle}
              />
              <View style={separatorInputStyle} />
              {!this.state.utilityEpicNoValid && (
                <Text style={{ color: 'red', marginTop: 3, }}>{this.state.utilityEpicNo == '' ? ADDITIONAL_DETAILS_CONST.REQUIRED_EPIC_NUMBER : ADDITIONAL_DETAILS_CONST.INVALID_EPIC_NUMBER}</Text>)}
            </View>}

          {this?.state?.selectedUtilityDoc.value === 'Pipeline gas receipt' &&
            <>
              <View>
                <Text
                  style={{
                    marginTop: 30, marginBottom: -4, marginLeft: 5, color: colors.COLOR_LIGHT_NAVY_BLUE, fontFamily: APP_FONTS.NunitoRegular,
                    fontSize: 16,
                  }}>
                  {ADDITIONAL_DETAILS_CONST.SERVICE_PROVIDER}
                </Text>

                <DropDownPicker
                  disabled={this.state.isViewOnly}
                  items={this.state.dropdownServiceProvider}
                  containerStyle={{ flex: 1, marginTop: 5, marginBottom: 15 }}
                  style={{ backgroundColor: '#ffffff', borderWidth: 0 }}
                  itemStyle={{
                    justifyContent: 'flex-start',
                    marginLeft: 4,
                  }}
                  defaultValue={this.state.utilityServiceProvider.value}
                  placeholder={""}
                  dropDownStyle={{ backgroundColor: '#ffffff' }}
                  onChangeItem={(item) =>
                    this.setState({
                      utilityServiceProvider: {
                        value: item.value || null,
                        label: item.label || null,
                      }
                    })
                  }
                  customArrowUp={() => <Image source={UP_ARROW} />}
                  customArrowDown={() => <Image source={DOWN_ARROW} />}
                  labelStyle={textStyle}
                  selectedLabelStyle={[textStyle, { color: colors.COLOR_BLACK }]}
                />
                <View style={separatorInputStyle} />
              </View>

              <View style={marginTop20Style}>
                <FloatingLabelInput
                  editable={!this.state.isViewOnly}
                  label={ADDITIONAL_DETAILS_CONST.LPG_ID}
                  containerStyles={inputStyle}
                  keyboardType={'number-pad'}
                  value={this.state.lpgID || undefined}
                  onChangeText={(value) => {
                    this.setState({
                      lpgID: value,
                      lpgValid: NUMBER_REGEX.test(value)
                    });
                  }}
                  customLabelStyles={{
                    colorFocused: colors.COLOR_LIGHT_NAVY_BLUE,
                    colorBlurred: colors.COLOR_LIGHT_GREY,
                    fontSizeFocused: 15,
                    fontSizeBlurred: 15,
                  }}
                  inputStyles={inputTextStyle} />
                <View style={separatorInputStyle} />
                {!this.state.lpgValid && (
                  <Text style={{ color: 'red', marginTop: 3, }}>{this.state.lpgID === '' ? ADDITIONAL_DETAILS_CONST.REQUIRED_LPG_NUMBER : ADDITIONAL_DETAILS_CONST.INVALID_LPG_NUMBER}</Text>)}
              </View>


            </>
          }
        </View>

      );
    }
  }

  renderUploadUtility() {
    const { plusButtonContainer, docTextStyle } = AdditionalDetailsStyles;
    return (
      <View style={plusButtonContainer}>
        <View>
          <Icon
            onPress={() => {
              if (!this.state.isViewOnly) {
                if (this.state.selectedUtilityBill.toLowerCase() === 'electricity') {
                  this.clearUtilityData();
                  this.setState({ selectedUtilityBill: '' });

                  this.props.deleteUtility({
                    data: {
                      deleteflag: this.state.deleteflag,
                      applicantUniqueId:
                        this.state.isguarantor || this.state.iscoapplicant
                          ? this.state.coapplicantUniqueId
                          : this.state.applicantUniqueId,
                    },
                    callback: (response) => {
                      this.setState({
                        utilityBillData: false,
                      })
                    },
                  });

                } else {
                  this.clearUtilityData();
                  this.setState({ selectedUtilityBill: 'electricity' });
                }
              }
            }}
            disabled={
              this.state.selectedUtilityBill !== '' &&
              this.state.selectedUtilityBill.toLowerCase() !== 'electricity'
            }
            reverse
            name={
              this.state.selectedUtilityBill !== '' &&
                this.state.selectedUtilityBill.toLowerCase() === 'electricity'
                ? 'minus'
                : 'plus'
            }
            type="antdesign"
            color={'#334e9e'}
          />
          <Text style={docTextStyle}>
            {ADDITIONAL_DETAILS_CONST.ELECTRICITY_BILL}
          </Text>
        </View>

        <View>
          <Icon
            onPress={() => {
              if (!this.state.isViewOnly) {
                if (this.state.selectedUtilityBill.toLowerCase() === 'gas') {
                  this.clearUtilityData();
                  this.setState({ selectedUtilityBill: '' });

                  this.props.deleteUtility({
                    data: {
                      deleteflag: this.state.deleteflag,
                      applicantUniqueId:
                        this.state.isguarantor || this.state.iscoapplicant
                          ? this.state.coapplicantUniqueId
                          : this.state.applicantUniqueId,
                    },
                    callback: (response) => {
                      this.setState({
                        utilityBillData: false,
                      })
                    },
                  });

                } else {
                  this.clearUtilityData();
                  this.setState({ selectedUtilityBill: 'gas' });
                }
              }
            }}
            disabled={
              this.state.selectedUtilityBill !== '' &&
              this.state.selectedUtilityBill.toLowerCase() !== 'gas'
            }
            reverse
            name={
              this.state.selectedUtilityBill !== '' &&
                this.state.selectedUtilityBill.toLowerCase() === 'gas'
                ? 'minus'
                : 'plus'
            }
            type="antdesign"
            color={'#334e9e'}
          />
          <Text style={docTextStyle}>{ADDITIONAL_DETAILS_CONST.GAS_BILL}</Text>
        </View>

        <View>
          <Icon
            onPress={() => {
              if (!this.state.isViewOnly) {
                if (
                  this.state.selectedUtilityBill.toLowerCase() === 'landline'
                ) {

                  this.clearUtilityData();
                  this.setState({ selectedUtilityBill: '' });

                  this.props.deleteUtility({
                    data: {
                      deleteflag: this.state.deleteflag,
                      applicantUniqueId:
                        this.state.isguarantor || this.state.iscoapplicant
                          ? this.state.coapplicantUniqueId
                          : this.state.applicantUniqueId,
                    },
                    callback: (response) => {
                      this.setState({
                        utilityBillData: false,
                      })
                    },
                  });

                } else {
                  this.clearUtilityData();
                  this.setState({ selectedUtilityBill: 'landline' });
                }
              }
            }}
            disabled={
              this.state.selectedUtilityBill !== '' &&
              this.state.selectedUtilityBill.toLowerCase() !== 'landline'
            }
            reverse
            name={
              this.state.selectedUtilityBill !== '' &&
                this.state.selectedUtilityBill.toLowerCase() === 'landline'
                ? 'minus'
                : 'plus'
            }
            type="antdesign"
            color={'#334e9e'}
          />
          <Text style={docTextStyle}>
            {ADDITIONAL_DETAILS_CONST.LANDLINE_BILL}
          </Text>
        </View>

        <View>
          <Icon
            onPress={() => {
              if (!this.state.isViewOnly) {
                if (this.state.selectedUtilityBill.toLowerCase() === 'other') {
                  this.clearUtilityData();
                  this.setState({ selectedUtilityBill: '' });

                  this.props.deleteUtility({
                    data: {
                      deleteflag: this.state.deleteflag,
                      applicantUniqueId:
                        this.state.isguarantor || this.state.iscoapplicant
                          ? this.state.coapplicantUniqueId
                          : this.state.applicantUniqueId,
                    },
                    callback: (response) => {
                      this.setState({
                        utilityBillData: false,
                      })
                    },
                  });

                } else {
                  this.clearUtilityData();
                  this.setState({ selectedUtilityBill: 'other' });
                }
              }
            }}
            disabled={
              this.state.selectedUtilityBill !== '' &&
              this.state.selectedUtilityBill.toLowerCase() !== 'other'
            }
            reverse
            name={
              this.state.selectedUtilityBill !== '' &&
                this.state.selectedUtilityBill.toLowerCase() === 'other'
                ? 'minus'
                : 'plus'
            }
            type="antdesign"
            color={'#334e9e'}
          />
          <Text style={docTextStyle}>
            {ADDITIONAL_DETAILS_CONST.OTHER_LABEL}
          </Text>
        </View>
      </View>
    );
  }

  collapseInvert(flow) {
    if (flow === 'addKYC') {
      this.setState({
        additionalOptions: [
          {
            registeredAddress: [
              {
                residentialAddressCollapsed: !this.state.additionalOptions[0]
                  .registeredAddress[0].residentialAddressCollapsed,
              },
              {
                addUtilityBillsCollapsed: this.state.additionalOptions[0]
                  .registeredAddress[1].addUtilityBillsCollapsed,
              },
            ],
          },
        ],
      });
    }
    if (flow === 'addUtility') {
      this.setState({
        additionalOptions: [
          {
            registeredAddress: [
              {
                residentialAddressCollapsed: this.state.additionalOptions[0]
                  .registeredAddress[0].residentialAddressCollapsed,
              },
              {
                addUtilityBillsCollapsed: !this.state.additionalOptions[0]
                  .registeredAddress[1].addUtilityBillsCollapsed,
              },
            ],
          },
        ],
      });
    }
  }

  getDocType(imageType) {
    if (this?.state?.selectedDocType?.toLowerCase() === 'adhar') {
      return `addhar ${imageType}`;
    }
    if (this?.state?.selectedDocType?.toLowerCase() === 'voter') {
      return `voter ${imageType}`;
    }
    if (this?.state?.selectedDocType?.toLowerCase() === 'driving license') {
      return `driving front`;
    }
    if (this?.state?.selectedDocType?.toLowerCase() === 'passport') {
      return `passport ${imageType}`;
    }
    return 'other';
  }

  callback = (image, whichUtility) => {
    if (whichUtility && whichUtility === 'fromUtility') {
      this.setState(
        {
          imageDataUtility: {
            ...this.state.imageDataUtility,
            front: {
              uri: image.path,
              data: { ...image },
            },
          },
        },
        () => {

          if (this.state.imageDataUtility.front.data !== '') {
            const name = `${new Date().getTime()}.zip`;
            const targetPath = `${RNFS.DocumentDirectoryPath}/${name}`;
            const sourcePath = this.state.imageDataUtility.front.data.path;
            zip(sourcePath, targetPath).then((path) => {
              const dataToAPI = {
                imageData: JSON.stringify([
                  {
                    billType: this.state.selectedUtilityBill,
                    leadCode: this.state.leadCode,
                    docType: 'front',
                    mobileNumber: `${this.state.mobileNumberFromProps}`,
                    ismainapplicant: !(this.state.iscoapplicant || this.state.isguarantor),
                    isguarantor: this.state.isguarantor,
                    docName: this.state.imageDataUtility.front.data.path.split('/').pop(),
                    applicantUniqueId:
                      this.state.isguarantor || this.state.iscoapplicant
                        ? this.state.coapplicantUniqueId
                        : this.state.applicantUniqueId,
                  },
                ]),
                zipPath: path,
                name,
              };
              this.props.uploadUtilityDoc({
                dataToAPI,
                callback: (response) => {

                },

              });
            });
          }
        },
      );
    } else {
      this.setState(
        {
          imageData: {
            ...this.state.imageData,
            front: {
              uri: image.path,
              data: { ...image },
            },
          },
        },
        () => {
          if (
            (
              // this?.state?.selectedDocType?.toLowerCase() === 'driving license' ||
              this?.state?.selectedDocType?.toLowerCase() === 'other') &&
            this.state.imageData.front.data !== ''
          ) {
            const name = `${new Date().getTime()}.zip`;
            const targetPath = `${RNFS.DocumentDirectoryPath}/${name}`;
            const sourcePath = this.state.imageData.front.data.path;

            zip(sourcePath, targetPath)
              .then((path) => {
                const dataToAPI = {
                  imageData: JSON.stringify([
                    {
                      docName: this.state.imageData.front.data.path.split('/').pop(),
                      docType: this.getDocType('front'),
                      leadCode: this.state.leadCode,
                      mobileNumber: `${this.state.mobileNumberFromProps}`,
                      ismainapplicant: !(this.state.iscoapplicant || this.state.isguarantor),
                      isguarantor: this.state.isguarantor,
                      applicantUniqueId:
                        this.state.isguarantor || this.state.iscoapplicant
                          ? this.state.coapplicantUniqueId
                          : this.state.applicantUniqueId,
                    },
                  ]),
                  zipPath: path,
                  name,
                };

                this.props.uploadDocAdditionalDetails({
                  dataToAPI,
                  callback: (response) => {
                    this.setState({
                      dlVerified: false,
                      voterVerified: false,
                    });
                    this.getOCRdata(response);
                  },


                });
              })
              .catch((error) => {
                console.error(error);
              });
          }
          if (
            this?.state?.selectedDocType?.toLowerCase() !== 'driving license' &&
            this.state.imageData.front.data !== '' &&
            this.state.imageData.back.data !== ''
          ) {
            const name = `${new Date().getTime()}.zip`;
            const targetPath = `${RNFS.DocumentDirectoryPath}/${name}`;
            const sourcePath = [
              this.state.imageData.front.data.fileCopyUri,
              this.state.imageData.back.data.fileCopyUri,
            ];

            zip(sourcePath, targetPath)
              .then((path) => {
                const dataToAPI = {
                  imageData: JSON.stringify([
                    {
                      docName: this.state.imageData.front.data.name,
                      docType: this.getDocType('front'),
                      leadCode: this.state.leadCode,
                      mobileNumber: `${this.state.mobileNumberFromProps}`,
                      ismainapplicant: !(this.state.iscoapplicant || this.state.isguarantor),
                      isguarantor: this.state.isguarantor,
                      applicantUniqueId:
                        this.state.isguarantor || this.state.iscoapplicant
                          ? this.state.coapplicantUniqueId
                          : this.state.applicantUniqueId,
                    },
                    {
                      docName: this.state.imageData.back.data.name,
                      docType: this.getDocType('back'),
                      leadCode: this.state.leadCode,
                      mobileNumber: `${this.state.mobileNumberFromProps}`,
                      ismainapplicant: !(this.state.iscoapplicant || this.state.isguarantor),
                      isguarantor: this.state.isguarantor,
                      applicantUniqueId:
                        this.state.isguarantor || this.state.iscoapplicant
                          ? this.state.coapplicantUniqueId
                          : this.state.applicantUniqueId,
                    },
                  ]),
                  zipPath: path,
                  name,
                };

                this.props.uploadDocAdditionalDetails({
                  dataToAPI,
                  callback: (response) => {
                    this.getOCRdata(response);
                  },
                });
              })
              .catch((error) => {
                console.error(error);
              });
          }
        },
      );
    }
  };

  getOCRdata(response) {
    if (
      response &&
      response.addresdetails &&
      this?.state?.selectedDocType === 'adhar'
    ) {
      this.setState({
        addressLine1: {
          ...this.state.addressLine1,
          value: response.addresdetails.line1,
        },
        addressLine2: {
          ...this.state.addressLine2,
          value: response.addresdetails.line2 || '',
        },
        pincode: {
          ...this.state.pincode,
          value: response.addresdetails.pin,
        },
        city: response.addresdetails.city || response.addresdetails.district,
        state: response.addresdetails.state,
        adharID: response.addharNo == '' ? this.state.adharID : response.addharNo.replace(/\d{4}(?=.)/g, '$& '),
        adharIdValid: response.addharNo == '' ? AADHAR_REGEX.test(this.state.adharID) : AADHAR_REGEX.test(response.addharNo.replace(/\d{4}(?=.)/g, '$& ')),
        addharName: response.addharName == '' ? this.state.addharName : response.addharName,

      });
    }
    if (response && this?.state?.selectedDocType === 'driving license') {
      this.setState({
        dlNo: (response && response.dlno) || '',
        dlNoValid: response && response.dlno && EPICNO_REGEX.test(response.dlno),
        dateOfBirthDLText: (response && response.dateOfBirth) || '',
      });
    }
    if (response && this?.state?.selectedDocType === 'voter') {
      this.setState({
        epicNo: (response && response.voterNo) || '',
        epicNoValid: (response && response.voterNo && EPICNO_REGEX.test(response.voterNo)),
        addressLine1: {
          ...this.state.addressLine1,
          value: response.addressDetails.line1,
        },
        addressLine2: {
          ...this.state.addressLine2,
          value: response.addressDetails.line2 || '',
        },
        pincode: {
          ...this.state.pincode,
          value: response.addressDetails.pin,
        },
        city: response.addressDetails.city || response.addressDetails.district,
        state: response.addressDetails.state,
      });
    }
    if (
      response &&
      response.addresdetails &&
      this?.state?.selectedDocType === 'passport'
    ) {
      this.setState({
        addressLine1: {
          ...this.state.addressLine1,
          value: response.addresdetails.line1,
        },
        addressLine2: {
          ...this.state.addressLine2,
          value: response.addresdetails.line2 || '',
        },
        pincode: {
          ...this.state.pincode,
          value: response.addresdetails.pin,
        },
        fileNumber: (response && response.passportNum) || '',
        fileNumberValid: (response && response.passportNum && PASSPORT_REGEX.test(response.passportNum)),
        dateOfBirthText: (response && response?.dateofbirth) || '',
        city: response.addresdetails.city || response.addresdetails.district,
        state: response.addresdetails.state,
      });
    }
  }

  callbackforBackImage = (image, whichUtility) => {
    if (whichUtility && whichUtility === 'fromUtility') {
      this.setState(
        {
          imageDataUtility: {
            ...this.state.imageDataUtility,
            back: {
              uri: image.path,
              data: { ...image },
            },
          },
        },
        () => {
          if (this.state.imageDataUtility.back.data !== '') {
            const name = `${new Date().getTime()}.zip`;
            const targetPath = `${RNFS.DocumentDirectoryPath}/${name}`;

            const sourcePath = this.state.imageDataUtility.back.data.path;
            zip(sourcePath, targetPath).then((path) => {
              const dataToAPI = {
                imageData: JSON.stringify([
                  {
                    billType: this.state.selectedUtilityBill,
                    leadCode: this.state.leadCode,
                    docType: 'back',
                    mobileNumber: `${this.state.mobileNumberFromProps}`,
                    ismainapplicant: !(this.state.iscoapplicant || this.state.isguarantor),
                    isguarantor: this.state.isguarantor,
                    docName: this.state.imageDataUtility.back.data.name,
                    applicantUniqueId:
                      this.state.isguarantor || this.state.iscoapplicant
                        ? this.state.coapplicantUniqueId
                        : this.state.applicantUniqueId,
                  },
                ]),
                zipPath: path,
                name,
              };
              this.props.uploadUtilityDoc({
                dataToAPI,
                callback: (response) => {

                },

              });
            });
          }
        },
      );
    } else {
      this.setState(
        {
          imageData: {
            ...this.state.imageData,
            back: {
              uri: image.path,
              data: { ...image },
            },
          },
        },
        () => {
          if (
            this.state.imageData.front.data !== '' &&
            this.state.imageData.back.data !== ''
          ) {
            const name = `${new Date().getTime()}.zip`;
            const targetPath = `${RNFS.DocumentDirectoryPath}/${name}`;
            const sourcePath = [
              this.state.imageData.front.data.path,
              this.state.imageData.back.data.path,
            ];
            zip(sourcePath, targetPath)
              .then((path) => {
                const dataToAPI = {
                  imageData: JSON.stringify([
                    {
                      docName: this.state.imageData.front.data.path.split('/').pop(),
                      docType: this.getDocType('front'),
                      // docType: 'front',
                      leadCode: this.state.leadCode,
                      mobileNumber: `${this.state.mobileNumberFromProps}`,
                      ismainapplicant: !(this.state.iscoapplicant || this.state.isguarantor),
                      isguarantor: this.state.isguarantor,
                      applicantUniqueId:
                        this.state.isguarantor || this.state.iscoapplicant
                          ? this.state.coapplicantUniqueId
                          : this.state.applicantUniqueId,
                    },
                    {
                      docName: this.state.imageData.back.data.path.split('/').pop(),
                      docType: this.getDocType('back'),
                      // docType: 'back',
                      leadCode: this.state.leadCode,
                      mobileNumber: `${this.state.mobileNumberFromProps}`,
                      ismainapplicant: !(this.state.iscoapplicant || this.state.isguarantor),
                      isguarantor: this.state.isguarantor,
                      applicantUniqueId:
                        this.state.isguarantor || this.state.iscoapplicant
                          ? this.state.coapplicantUniqueId
                          : this.state.applicantUniqueId,
                    },
                  ]),
                  zipPath: path,
                  name,
                };

                this.props.uploadDocAdditionalDetails({
                  dataToAPI,
                  callback: (response) => {
                    //adharcard

                    this.getOCRdata(response);
                  },


                });
              })
              .catch((error) => {
                console.error(error);
              });
          }
        },
      );
    }
  };

  displayFrontImage(flow) {
    if (
      flow === 'fromUtility' &&
      this.state.imageDataUtility.front.uri === ''
    ) {
      return true;
    } else if (!flow && this.state.imageData.front.uri === '') {
      return true;
    }
    return false;
  }

  displayFrontUploadedImage(flow) {
    if (
      flow === 'fromUtility' &&
      this.state.imageDataUtility.front.uri !== ''
    ) {
      return true;
    } else if (!flow && this.state.imageData.front.uri !== '') {
      return true;
    }
    return false;
  }

  displaybackUploadedImage(flow) {
    if (
      flow === 'fromUtility' &&
      this.state.imageDataUtility.back.uri !== ''
    ) {
      return true;
    } else if (!flow && this.state.imageData.back.uri !== '') {
      return true;
    }
    return false;
  }

  deleteImage(flow, imageType) {
    if (flow === 'fromUtility' && imageType === 'front') {
      this.setState(
        {
          imageDataUtility: {
            ...this.state.imageDataUtility,
            front: {
              uri: '',
              data: '',
            },
          },
          utilityEpicNo: '',
          utilityEpicNoValid: true,
          utilityFileNumber: '',
          utilityFileNumberValid: true,
          utilityDateOfBirth: null,
          utilityDateOfBirthText: '',
          utilityDlNo: '',
          utilityDlNoValid: true,
          utilityCity: '',
          utilityCityValid: true,
          utilityTelephoneNo: '',
          utilityTelephoneNoValid: true,
        },
        () => {
          const dataToAPI = {
            ismainapplicant: !(this.state.iscoapplicant || this.state.isguarantor),
            isguarantor: this.state.isguarantor,
            docType: 'front',
            applicantUniqueId:
              this.state.isguarantor || this.state.iscoapplicant
                ? this.state.coapplicantUniqueId
                : this.state.applicantUniqueId,
          };

          this.props.deleteUploadedUtilityDoc({
            dataToAPI,
          });
        },
      );
    }
    if (!flow && imageType === 'front') {
      this.props.deleteDocuments({
        data: {
          deleteflag: this.state.deleteflag,
          applicantUniqueId:
            this.state.isguarantor || this.state.iscoapplicant
              ? this.state.coapplicantUniqueId
              : this.state.applicantUniqueId,
        },
        callback: (response) => {
          this.setState({
            imageData: {
              ...this.state.imageData,
              front: {
                uri: '',
                data: '',
              },
            },
            addressLine1: {
              value: '',
            },
            addressLine2: {
              value: '',
            },
            pincode: {
              value: '',
              isValid: true,
            },
            city: '',
            state: '',
            year: '',
            selectedMonth: {
              value: null,
              label: null,
            },
            selectedResidentType: {
              value: null,
              label: null,
            },
          });
          if (this?.state?.selectedDocType === 'driving license') {
            this.setState({
              dlNo: '',
              dateOfBirthDL: '',
              dateOfBirthDLText: '',
              dlVerified: false,
            });
          } else if (this?.state?.selectedDocType === 'other') {
            this.setState({ selectedOtherDoc: { value: null, label: null } });
          } else if (this?.state?.selectedDocType === 'passport') {
            this.setState({ fileNumber: '', dateOfBirthText: '', dateOfBirth: '' });
          } else if (this?.state?.selectedDocType === 'voter') {
            this.setState({ epicNo: '', voterVerified: false });
          } else if (this?.state?.selectedDocType === 'adhar') {
            this.setState({ adharID: '', addharName: '' });
          }
        },
      });


    }
    if (flow === 'fromUtility' && imageType === 'back') {
      this.setState(
        {
          imageDataUtility: {
            ...this.state.imageDataUtility,
            back: {
              uri: '',
              data: '',
            },
          },
          utilityEpicNo: '',
          utilityEpicNoValid: true,
          utilityFileNumber: '',
          utilityFileNumberValid: true,
          utilityDateOfBirth: null,
          utilityDateOfBirthText: '',
          utilityDlNo: '',
          utilityDlNoValid: true,
          utilityCity: '',
          utilityCityValid: true,
          utilityTelephoneNo: '',
          utilityTelephoneNoValid: true,
        },
        () => {
          const dataToAPI = {
            ismainapplicant: !(this.state.iscoapplicant || this.state.isguarantor),
            isguarantor: this.state.isguarantor,
            docType: 'back',
            applicantUniqueId:
              this.state.isguarantor || this.state.iscoapplicant
                ? this.state.coapplicantUniqueId
                : this.state.applicantUniqueId,
          };
          this.props.deleteUploadedUtilityDoc({
            dataToAPI,
          });
        },
      );
    }

    if (!flow && imageType === 'back') {
      this.controllerKYC.reset();
      this.props.deleteDocuments({
        data: {
          deleteflag: this.state.deleteflag,
          applicantUniqueId:
            this.state.isguarantor || this.state.iscoapplicant
              ? this.state.coapplicantUniqueId
              : this.state.applicantUniqueId,
        },
        callback: (response) => {
          this.setState({
            imageData: {
              ...this.state.imageData,
              back: {
                uri: '',
                data: '',
              },
            },
            addressLine1: {
              value: '',
            },
            addressLine2: {
              value: '',
            },
            pincode: {
              value: '',
              isValid: true,
            },
            city: '',
            state: '',
            year: '',
            selectedMonth: {
              value: null,
              label: null,
            },
            selectedResidentType: {
              value: null,
              label: null,
            },
          });
          if (this?.state?.selectedDocType === 'driving license') {
            this.setState({
              dlNo: '',
              dateOfBirthDL: '',
              dateOfBirthDLText: '',
              dlVerified: false,
            });
          } else if (this?.state?.selectedDocType === 'other') {
            this.setState({ selectedOtherDoc: { value: null, label: null } });
          } else if (this?.state?.selectedDocType === 'passport') {
            this.setState({ fileNumber: '', dateOfBirthText: '', dateOfBirth: '' });
          } else if (this?.state?.selectedDocType === 'voter') {
            this.setState({ epicNo: '', voterVerified: false });
          } else if (this?.state?.selectedDocType === 'adhar') {
            this.setState({ adharID: '', addharName: '' });
          }
        },
      });


    }
  }

  FormatDateToDash(data) {
    var dia = data.split('/')[0];
    var mes = data.split('/')[1];
    var ano = data.split('/')[2];

    return ('0' + dia).slice(-2) + '-' + ('0' + mes).slice(-2) + '-' + ano;
  }

  renderUploadPlaceholder(flow) {
    const {
      uploadImageContainer,
      uploadImageStyle,
      frontAndBackLabel,
      saveButtonStyle,
      saveButtonTitleStyle,
      uploadedImageStyle,
      style50PercentRow,
      closeImageStyle,
      disableTextStyle,
      disableStyle,
      verifiedTextStyle,
      verifiedTickImageStyle,
      flexRowStyle,
    } = AdditionalDetailsStyles;
    return (
      <View>
        <View style={uploadImageContainer}>
          {this.displayFrontImage(flow) && (
            <TouchableOpacity
              style={uploadImageStyle}
              onPress={() => {
                if (flow === 'fromUtility' ? !this.state.isViewOnly : !this.state.kycFreeze) {

                  selectPDF1('', '', this.callback, 'onlypickimage', flow, flow == 'fromUtility' ? this.state.selectedUtilityBill : this?.state?.selectedDocType)
                }
              }
              }>
              <Icon size={35} name="plus" type="antdesign" color={'#818282'} />
              <Text style={frontAndBackLabel}>
                {ADDITIONAL_DETAILS_CONST.IMAGE_FRONT}
              </Text>
            </TouchableOpacity>
          )}
          {this.displayFrontUploadedImage(flow) && (
            <View style={style50PercentRow}>
              <Image
                style={uploadedImageStyle}
                source={{
                  uri: `${flow === 'fromUtility'
                    ? this.state.imageDataUtility.front.uri
                    : this.state.imageData.front.uri
                    }`,
                }}
                onError={() => {
                  if (flow === 'fromUtility') {
                    this.setState({
                      imageDataUtility: {
                        ...this.state.imageDataUtility,
                        front: {
                          ...this.state.imageDataUtility.front,
                          uri:
                            'https://www.toddbershaddvm.com/wp-content/uploads/sites/257/2018/09/placeholder-img.jpg',
                        },
                      },
                    });
                  } else {
                    this.setState({
                      imageData: {
                        ...this.state.imageData,
                        front: {
                          ...this.state.imageData.front,
                          uri:
                            'https://www.toddbershaddvm.com/wp-content/uploads/sites/257/2018/09/placeholder-img.jpg',
                        },
                      },
                    });
                  }
                }}
                resizeMode="cover"
              />
              <TouchableOpacity
                style={[closeImageStyle]}
                onPress={() => {
                  if (flow === 'fromUtility' ? !this.state.isViewOnly : !this.state.kycFreeze) {
                    this.deleteImage(flow, 'front');
                  }
                }}>
                <Icon name="closecircle" type="antdesign" color={'#5f5c60'} />
              </TouchableOpacity>
            </View>
          )}
          {
            // (this?.state?.selectedDocType === 'adhar' ||
            //   this?.state?.selectedDocType === 'passport' ||
            //   this?.state?.selectedDocType === 'voter') &&
            //   flow !== 'fromUtility' &&
            // (this.state.imageData.back.uri === '' && this.state.imageDataUtility.back.uri === '') &&
            this?.state?.selectedDocType === 'other' && flow !== 'fromUtility' ? null :
              !this.displaybackUploadedImage(flow) && (
                <TouchableOpacity
                  style={uploadImageStyle}
                  onPress={() => {
                    if (flow === 'fromUtility' ? !this.state.isViewOnly : !this.state.kycFreeze) {
                      selectPDF1(
                        '',
                        '',
                        this.callbackforBackImage,
                        'onlypickimage',
                        flow,
                        this?.state?.selectedDocType
                      );
                    }
                  }}>
                  <Icon
                    size={35}
                    name="plus"
                    type="antdesign"
                    color={'#818282'}
                  />
                  <Text style={frontAndBackLabel}>
                    {ADDITIONAL_DETAILS_CONST.IMAGE_BACK}
                  </Text>
                </TouchableOpacity>
              )}

          {/* Display utility image */}
          {/* {
            flow === 'fromUtility'
              ? this.state.imageDataUtility.back.uri !== ''
              : this.state.imageData.back.uri !== '' && (
                <View style={style50PercentRow}>
                  <Image
                    style={uploadedImageStyle}
                    source={{
                      uri: `${flow === 'fromUtility'
                        ? this.state.imageDataUtility.back.uri
                        : this.state.imageData.back.uri}`,
                    }}
                    onError={() => {
                      if (flow === 'fromUtility') {
                        this.setState({
                          imageDataUtility: {
                            ...this.state.imageDataUtility,
                            back: {
                              ...this.state.imageDataUtility.back,
                              uri:
                                'https://www.toddbershaddvm.com/wp-content/uploads/sites/257/2018/09/placeholder-img.jpg',
                            },
                          },
                        });
                      } else {
                        this.setState({
                          imageData: {
                            ...this.state.imageData,
                            back: {
                              ...this.state.imageData.back,
                              uri:
                                'https://www.toddbershaddvm.com/wp-content/uploads/sites/257/2018/09/placeholder-img.jpg',
                            },
                          },
                        });
                      }
                    }}
                    resizeMode="cover"
                  />

                  <TouchableOpacity
                    style={[closeImageStyle]}
                    onPress={() => {
                      if (flow === 'fromUtility' ? !this.state.isViewOnly : !this.state.kycFreeze) {
                        this.deleteImage(flow, 'back');
                      }
                    }}>
                    <Icon
                      name="closecircle"
                      type="antdesign"
                      color={'#5f5c60'}
                    />
                  </TouchableOpacity>
                </View>
              )} */}

          {this.displaybackUploadedImage(flow) && (
            <View style={style50PercentRow}>
              <Image
                style={uploadedImageStyle}
                source={{
                  uri: `${flow === 'fromUtility'
                    ? this.state.imageDataUtility.back.uri
                    : this.state.imageData.back.uri
                    }`,
                }}
                onError={() => {
                  if (flow === 'fromUtility') {
                    this.setState({
                      imageDataUtility: {
                        ...this.state.imageDataUtility,
                        back: {
                          ...this.state.imageDataUtility.back,
                          uri:
                            'https://www.toddbershaddvm.com/wp-content/uploads/sites/257/2018/09/placeholder-img.jpg',
                        },
                      },
                    });
                  } else {
                    this.setState({
                      imageData: {
                        ...this.state.imageData,
                        back: {
                          ...this.state.imageData.back,
                          uri:
                            'https://www.toddbershaddvm.com/wp-content/uploads/sites/257/2018/09/placeholder-img.jpg',
                        },
                      },
                    });
                  }
                }}
                resizeMode="cover"
              />
              <TouchableOpacity
                style={[closeImageStyle]}
                onPress={() => {
                  if (flow === 'fromUtility' ? !this.state.isViewOnly : !this.state.kycFreeze) {
                    this.deleteImage(flow, 'back');
                  }
                }}>
                <Icon name="closecircle" type="antdesign" color={'#5f5c60'} />
              </TouchableOpacity>
            </View>
          )}


        </View>
        <Text style={{
          fontFamily: APP_FONTS.NunitoBold,
          marginTop: 10,
          fontSize: FONT_SIZE.xm,
          color: colors.COLOR_GREY
        }}>Document is mandatory*</Text>
        {/* utility get details button */}
        {flow === 'fromUtility' &&
          // this.state.selectedUtilityBill !== 'other' && 
          (
            <Button
              isDisabled={this.getSaveDisableGetDetails()}
              title={ADDITIONAL_DETAILS_CONST.BUTTON_GET_DETAILS}
              onPress={() => {
                if (flow === 'fromUtility' ? !this.state.isViewOnly : !this.state.kycFreeze) {
                  this.getUtilityDocDetails();
                } else {
                  handleWarning("User access denied")
                }
              }}
              customContainerStyle={
                this.getSaveDisableGetDetails()
                  ? [disableStyle, {}]
                  : [saveButtonStyle, {}]
              }
              cutomTitleStyle={
                this.getSaveDisableGetDetails()
                  ? disableTextStyle
                  : saveButtonTitleStyle
              }
            />
          )}
        {(this?.state?.selectedDocType?.toLowerCase() === 'voter' ||
          this?.state?.selectedDocType?.toLowerCase() === 'driving license') && (
            <View style={[flexRowStyle, { justifyContent: 'space-between' }]}>

              {this.state.dlVerified && flow !== 'fromUtility' && (
                <View
                  style={[flexRowStyle, { alignSelf: 'center' }]}>
                  <Image
                    source={VERIFIED_TICK}
                    resizeMode="contain"
                    style={verifiedTickImageStyle}
                  />
                  <Text style={verifiedTextStyle}>
                    {ADDITIONAL_DETAILS_CONST.TEXT_VERIFIED}
                  </Text>
                </View>
              )}

              {flow !== 'fromUtility' && this.state.voterVerified && (
                <View
                  style={[flexRowStyle, { alignSelf: 'center' }]}>
                  <Image
                    source={VERIFIED_TICK}
                    resizeMode="contain"
                    style={verifiedTickImageStyle}
                  />
                  <Text style={verifiedTextStyle}>
                    {ADDITIONAL_DETAILS_CONST.TEXT_VERIFIED}
                  </Text>
                </View>
              )}

              {flow !== 'fromUtility' &&
                <View style={{ width: '100%' }}>
                  <Button
                    isDisabled={this.getVerifyDisable()}
                    title={ADDITIONAL_DETAILS_CONST.BUTTON_VERIFY}
                    onPress={() => {
                      if (!this.state.kycFreeze) {
                        if (this?.state?.selectedDocType?.toLowerCase() === 'driving license') {
                          const dataToAPI = {
                            dlNo: this.state.dlNo,
                            dateOfBirth: this.state.dateOfBirthDLText.includes('/')
                              ? this.FormatDateToDash(this.state.dateOfBirthDLText)
                              : moment(this.state.dateOfBirthDL).format('DD-MM-YYYY'),
                            applicantUniqueId:
                              this.state.isguarantor || this.state.iscoapplicant
                                ? this.state.coapplicantUniqueId
                                : this.state.applicantUniqueId,
                          };

                          this.props.verifyDrivingLicense({
                            dataToAPI,
                            callback: (response) => {
                              this.setState({
                                dlVerified: true,
                                addressLine1: {
                                  ...this.state.addressLine1,
                                  value: response?.data?.address[0]?.completeAddress || "",
                                },
                                pincode: {
                                  ...this.state.pincode,
                                  value: response?.data?.address[0]?.pin.toString(),
                                },
                                state: response?.data?.address[0]?.state,
                                city: response?.data?.address[0]?.district,
                              });
                            },
                          });
                        }

                        if (this?.state?.selectedDocType?.toLowerCase() === 'voter') {
                          const dataToAPI = {
                            epicNo: this.state.epicNo,
                            applicantUniqueId:
                              this.state.isguarantor || this.state.iscoapplicant
                                ? this.state.coapplicantUniqueId
                                : this.state.applicantUniqueId,
                          };

                          this.props.verifyVoterID({
                            dataToAPI,
                            callback: (response) => {
                              this.setState({
                                voterVerified: true,
                                addressLine1: {
                                  ...this.state.addressLine1,
                                  value: response.data.address,
                                },
                                city: response.data.district,
                                state: response.data.state,
                              });
                            },
                          });
                        }
                      }
                      else {
                        handleWarning("User access denied")
                      }
                    }}
                    customContainerStyle={
                      this.getVerifyDisable() ? disableStyle : saveButtonStyle
                    }
                    cutomTitleStyle={
                      this.getVerifyDisable()
                        ? disableTextStyle
                        : saveButtonTitleStyle
                    }
                  />
                </View>}
            </View>
          )}
      </View>
    );
  }

  getVerifyDisable() {
    if (
      this?.state?.selectedDocType?.toLowerCase() === 'driving license' &&
      (this.state.dlNo === '' ||
        this.state.dateOfBirthDLText === '' ||
        this.state.dlVerified)
    ) {
      return true;
    }
    if (
      (this?.state?.selectedDocType?.toLowerCase() === 'voter' && this.state.epicNo === '') || this.state.voterVerified
    ) {
      return true;
    }
    return false;
  }

  getSaveDisableGetDetails() {
    if (
      this.state.selectedUtilityBill === 'electricity' &&
      (this.state.consumerNumber === '' || this.state.serviceProvider.value === null)
    ) {
      return true;
    }
    if (this.state.selectedUtilityBill === 'gas' && this.state.lpgID === '') {
      return true;
    }
    if (
      this.state.selectedUtilityBill === 'landline' &&
      (this.state.cityNameUtility === '' ||
        this.state.landlineNumber === '' ||
        this.state.stdCode === '')
    ) {
      return true;
    }
    return false;
  }

  getUtilityDocDetails() {

    if (this.state.selectedUtilityBill === 'electricity') {
      const dataToAPI = {
        consumerId: this.state.consumerNumber,
        serviceprovider: this.state.serviceProvider.code,
      };
      this.props.getDetailsElectricity({
        dataToAPI,
        callback: (response) => {
          this.setState({
            utilityAddressLine1: {
              ...this.state.utilityAddressLine1,
              value: response.data.address || '',
            },
            utilityBillAuthResponseStatus: true
          });
        },
      });
    }
    else if (this.state.selectedUtilityBill === 'gas') {
      const dataToAPI = {
        lpgId: this.state.lpgID,
      };

      this.props.getDetailsGas({
        dataToAPI,
        callback: (response) => {
          this.setState({
            utilityBillAuthResponseStatus: true,
            utilityAddressLine1: {
              ...this.state.utilityAddressLine1,
              value: response.data.ConsumerAddress || '',
            },
            utilityPincode: {
              ...this.state.utilityPincode,
              value: response.data.pin || '',
            },
          });
        },
      });
    }
    else if (this.state.selectedUtilityBill === 'landline') {
      const dataToAPI = {
        telphoneNo: `${this.state.stdCode}-${this.state.landlineNumber}`,
        city: this.state.cityNameUtility.cityname,
      };

      this.props.getDetailsLandline({
        dataToAPI,
        callback: (response) => {
          this.setState({
            utilityBillAuthResponseStatus: true,
            utilityAddressLine1: {
              ...this.state.utilityAddressLine1,
              value: response.data.address || '',
            },
            utilityPincode: {
              ...this.state.utilityPincode,
              value: response.data.pin || '',
            },
          });
        },
      });
    }
    else if (this.state.selectedUtilityDoc.value === 'Aadhar + voter id') {
      const dataToAPI = {
        type: 'voterId',
        epic_no: this.state.utilityEpicNo,
        applicantUniqueId:
          this.state.isguarantor || this.state.iscoapplicant
            ? this.state.coapplicantUniqueId
            : this.state.applicantUniqueId,
      };

      this.props.getDetailsGas({
        dataToAPI,
        callback: (response) => {
          this.setState({
            utilityBillAuthResponseStatus: true,
          });
        },
      });
    }
    else if (this.state.selectedUtilityDoc.value === 'Aadhar + Driving Licence') {
      const dataToAPI = {
        type: 'drivingLicence',
        drivingLicenceNumber: this.state.utilityDlNo,
        dateOfBirth: this.state.utilityDateOfBirthText,
        applicantUniqueId:
          this.state.isguarantor || this.state.iscoapplicant
            ? this.state.coapplicantUniqueId
            : this.state.applicantUniqueId,
      };

      this.props.getDetailsGas({
        dataToAPI,
        callback: (response) => {
          this.setState({
            utilityBillAuthResponseStatus: true,
            utilityAddressLine1: {
              ...this.state.utilityAddressLine1,
              value: response.data.ConsumerAddress || '',
            },
            utilityPincode: {
              ...this.state.utilityPincode,
              value: response.data.pin || '',
            },
          });
        },
      });
    }
    else if (this.state.selectedUtilityDoc.value === 'Landline bill') {
      const dataToAPI = {
        type: 'landlineBill',
        tel_no: this.state.utilityTelephoneNo,
        city: this.state.utilityCity,
        applicantUniqueId:
          this.state.isguarantor || this.state.iscoapplicant
            ? this.state.coapplicantUniqueId
            : this.state.applicantUniqueId,
      };

      this.props.getDetailsGas({
        dataToAPI,
        callback: (response) => {
          this.setState({
            utilityBillAuthResponseStatus: true,
            utilityAddressLine1: {
              ...this.state.utilityAddressLine1,
              value: response.data.ConsumerAddress || '',
            },
            utilityPincode: {
              ...this.state.utilityPincode,
              value: response.data.pin || '',
            },
          });
        },
      });
    }
    else if (this.state.selectedUtilityDoc.value === 'Passport') {
      const dataToAPI = {
        type: 'passport',
        fileNo: this.state.utilityFileNumber,
        dob: this.state.utilityDateOfBirthText,
        applicantUniqueId:
          this.state.isguarantor || this.state.iscoapplicant
            ? this.state.coapplicantUniqueId
            : this.state.applicantUniqueId,
      };
      this.props.getDetailsGas({
        dataToAPI,
        callback: (response) => {
          this.setState({
            utilityBillAuthResponseStatus: true,
            utilityAddressLine1: {
              ...this.state.utilityAddressLine1,
              value: response.data.ConsumerAddress || '',
            },
            utilityPincode: {
              ...this.state.utilityPincode,
              value: response.data.pin || '',
            },
          });
        },
      });
    }
    else if (this.state.selectedUtilityDoc.value === 'Pipeline gas receipt') {
      const dataToAPI = {
        type: 'gas',
        consumer_id: this.state.lpgID,
        service_provider: this.state.utilityServiceProvider.value,
        applicantUniqueId:
          this.state.isguarantor || this.state.iscoapplicant
            ? this.state.coapplicantUniqueId
            : this.state.applicantUniqueId,
      };
      this.props.getDetailsGas({
        dataToAPI,
        callback: (response) => {
          this.setState({
            utilityBillAuthResponseStatus: true,
            utilityAddressLine1: {
              ...this.state.utilityAddressLine1,
              value: response.data.ConsumerAddress || '',
            },
            utilityPincode: {
              ...this.state.utilityPincode,
              value: response.data.pin || '',
            },
          });
        },
      });
    }

  }

  clearKYCDocData() {
    this.setState({
      imageData: {
        front: {
          uri: '',
          data: '',
        },
        back: {
          uri: '',
          data: '',
        },
      },
      addressLine1: {
        value: '',
      },
      addressLine2: {
        value: '',
      },
      pincode: {
        value: '',
        isValid: true,
      },
      city: '',
      state: '',
      year: '',
      cityVerified: true,
      stateVerified: true,
      adharIdValid: true,
      fileNumberValid: true,
      epicNoValid: true,
      dlNoValid: true,
      selectedMonth: {
        value: null,
        label: null,
      },
      selectedResidentType: {
        value: null,
        label: null,
      },
      selectedDocType: '',
      adharID: '',
      fileNumber: '',
      dateOfBirth: null,
      dateOfBirthText: '',
      dlNo: '',
      epicNo: '',
      dateOfBirthDL: '',
      dateOfBirthDLText: '',
      selectedOtherDoc: { value: null, label: null },
      dlVerified: false,
      voterVerified: false,
    });

    this.controllerKYC.reset();
  }

  clearUtilityData() {
    this.setState({
      imageDataUtility: {
        front: {
          uri: '',
          data: '',
        },
        back: {
          uri: '',
          data: '',
        },
      },
      selectedUtilityBill: '',
      serviceProvider: {
        value: null,
        label: null,
        code: null
      },
      consumerNumber: '',
      cityNameUtility: '',
      landlineNumber: '',
      utilityAddressLine1: {
        value: '',
      },
      utilityAddressLine2: {
        value: '',
      },
      utilityPincode: {
        value: '',
        isValid: true,
      },
      utilityCity: '',
      utilityState: '',
      utilityCityVerified: true,
      utilityStateVerified: true,
      consumerNumberValid: true,
      lpgValid: true,
      utilitySelectedResidentType: {
        value: null,
        label: null,
      },
      lpgID: '',
      stdCode: '',
      selectedUtilityDoc: {
        value: null,
        label: null
      },
    });
    this.controller.reset();
  }

  renderPlusIconWithDoc() {
    const {
      plusButtonContainer,
      docTextStyle,
      toolTipContainer,
      informationToolTipText,
    } = AdditionalDetailsStyles;

    return (
      <View style={plusButtonContainer}>
        {this.state.pangstDocType == 'form60' ?
          <>
            {this.state.selectedDocType == 'adhar' ?
              <View>
                <Icon
                  onPress={() => {
                    // if (!this.state.isViewOnly) {
                    //   if (this?.state?.selectedDocType?.toLowerCase() === 'adhar') {
                    //     this.clearKYCDocData();
                    //     this.setState({
                    //       selectedDocType: '',
                    //     });

                    //     this.props.deleteDocuments({
                    //       data: {
                    //         deleteflag: this.state.deleteflag,
                    //         applicantUniqueId:
                    //           this.state.isguarantor || this.state.iscoapplicant
                    //             ? this.state.coapplicantUniqueId
                    //             : this.state.applicantUniqueId,
                    //       },
                    //       callback: (response) => {
                    //         this.setState({
                    //           kycData: false,
                    //         })
                    //       },
                    //     });

                    //   } else {
                    //     this.clearKYCDocData();
                    //     this.setState({
                    //       selectedDocType: 'adhar',
                    //     });
                    //   }
                    // }
                  }}
                  disabled={
                    this?.state?.selectedDocType !== '' &&
                    this?.state?.selectedDocType?.toLowerCase() !== 'adhar'
                  }
                  reverse
                  name={
                    this?.state?.selectedDocType !== '' &&
                      this?.state?.selectedDocType?.toLowerCase() === 'adhar'
                      ? 'minus'
                      : 'plus'
                  }
                  type="antdesign"
                  color={'#334e9e'}
                />
                <Text style={docTextStyle}>
                  {ADDITIONAL_DETAILS_CONST.ADHAR_CARD}
                </Text>

                {this.renderToolTip(
                  'You will need to add your current, permanant and employment details, if you add your passport details',
                )}
              </View>
              : this.state.selectedDocType == 'passport' ?
                <View>
                  <Icon
                    onPress={() => {
                      if (!this.state.isViewOnly) {
                        if (this?.state?.selectedDocType?.toLowerCase() === 'passport') {
                          this.clearKYCDocData();
                          this.setState({ selectedDocType: '' });

                          this.props.deleteDocuments({
                            data: {
                              deleteflag: this.state.deleteflag,
                              applicantUniqueId:
                                this.state.isguarantor || this.state.iscoapplicant
                                  ? this.state.coapplicantUniqueId
                                  : this.state.applicantUniqueId,
                            },
                            callback: (response) => {
                              this.setState({
                                kycData: false,
                              })
                            },
                          });

                        } else {
                          this.clearKYCDocData();
                          this.setState({ selectedDocType: 'passport' });
                        }
                      }
                    }}
                    disabled={
                      this?.state?.selectedDocType !== '' &&
                      this?.state?.selectedDocType?.toLowerCase() !== 'passport'
                    }
                    reverse
                    name={
                      this?.state?.selectedDocType !== '' &&
                        this?.state?.selectedDocType?.toLowerCase() === 'passport'
                        ? 'minus'
                        : 'plus'
                    }
                    type="antdesign"
                    color={'#334e9e'}
                  />
                  <Text style={docTextStyle}>{ADDITIONAL_DETAILS_CONST.PASSPORT}</Text>

                  {this.renderToolTip(
                    'You will need to add your current, permanant and employment details, if you add your passport details',
                    { marginTop: 22 },
                  )}
                </View>
                : this.state.selectedDocType == 'voter' ?
                  <View>
                    <Icon
                      onPress={() => {
                        if (!this.state.isViewOnly) {
                          if (this?.state?.selectedDocType?.toLowerCase() === 'voter') {
                            this.clearKYCDocData();
                            this.setState({ selectedDocType: '' });
                            this.props.deleteDocuments({
                              data: {
                                deleteflag: this.state.deleteflag,
                                applicantUniqueId:
                                  this.state.isguarantor || this.state.iscoapplicant
                                    ? this.state.coapplicantUniqueId
                                    : this.state.applicantUniqueId,
                              },
                              callback: (response) => {
                                this.setState({
                                  kycData: false,
                                })
                              },
                            });

                          } else {
                            this.clearKYCDocData();
                            this.setState({ selectedDocType: 'voter' });
                          }
                        }
                      }}
                      disabled={
                        this?.state?.selectedDocType !== '' &&
                        this?.state?.selectedDocType?.toLowerCase() !== 'voter'
                      }
                      reverse
                      name={
                        this?.state?.selectedDocType !== '' &&
                          this?.state?.selectedDocType?.toLowerCase() === 'voter'
                          ? 'minus'
                          : 'plus'
                      }
                      type="antdesign"
                      color={'#334e9e'}
                    />
                    <Text style={docTextStyle}>{ADDITIONAL_DETAILS_CONST.VOTER_ID}</Text>

                    {this.renderToolTip(
                      'You will need to add your current, permanant and employment details, if you add your passport details',
                      { marginTop: 22 },
                    )}
                  </View>
                  : this.state.selectedDocType == 'driving license' ?
                    <View>
                      <Icon
                        onPress={() => {
                          if (!this.state.isViewOnly) {
                            if (
                              this?.state?.selectedDocType?.toLowerCase() === 'driving license'
                            ) {
                              this.clearKYCDocData();
                              this.setState({
                                selectedDocType: '',
                              });
                              this.props.deleteDocuments({
                                data: {
                                  deleteflag: this.state.deleteflag,
                                  applicantUniqueId:
                                    this.state.isguarantor || this.state.iscoapplicant
                                      ? this.state.coapplicantUniqueId
                                      : this.state.applicantUniqueId,
                                },
                                callback: (response) => {
                                  this.setState({
                                    kycData: false,
                                  })
                                },
                              });

                            } else {
                              this.clearKYCDocData();
                              this.setState({
                                selectedDocType: 'driving license',
                              });
                            }
                          }
                        }}
                        disabled={
                          this?.state?.selectedDocType !== '' &&
                          this?.state?.selectedDocType?.toLowerCase() !== 'driving license'
                        }
                        reverse
                        name={
                          this?.state?.selectedDocType !== '' &&
                            this?.state?.selectedDocType?.toLowerCase() === 'driving license'
                            ? 'minus'
                            : 'plus'
                        }
                        type="antdesign"
                        color={'#334e9e'}
                      />
                      <Text style={docTextStyle}>
                        {ADDITIONAL_DETAILS_CONST.DRIVING_LICENSE}
                      </Text>

                      {this.renderToolTip(
                        'You will need to add your current, permanant and employment details, if you add your passport details',
                      )}
                    </View>
                    :
                    <View>
                      <Icon
                        onPress={() => {
                          if (!this.state.isViewOnly) {
                            if (this?.state?.selectedDocType?.toLowerCase() === 'other') {
                              this.clearKYCDocData();
                              this.setState({ selectedDocType: '' });

                              this.props.deleteDocuments({
                                data: {
                                  deleteflag: this.state.deleteflag,
                                  applicantUniqueId:
                                    this.state.isguarantor || this.state.iscoapplicant
                                      ? this.state.coapplicantUniqueId
                                      : this.state.applicantUniqueId,
                                },
                                callback: (response) => {
                                  this.setState({
                                    kycData: false,
                                  })
                                },
                              });

                            } else {
                              this.clearKYCDocData();
                              this.setState({ selectedDocType: 'other' });
                            }
                          }
                        }}
                        disabled={
                          this?.state?.selectedDocType !== '' &&
                          this?.state?.selectedDocType?.toLowerCase() !== 'other'
                        }
                        reverse
                        name={
                          this?.state?.selectedDocType !== '' &&
                            this?.state?.selectedDocType?.toLowerCase() === 'other'
                            ? 'minus'
                            : 'plus'
                        }
                        type="antdesign"
                        color={'#334e9e'}
                      />
                      <Text style={docTextStyle}>
                        {ADDITIONAL_DETAILS_CONST.OTHER_LABEL}
                      </Text>

                      {this.renderToolTip(
                        'You will need to add your current, permanant and employment details, if you add your passport details',
                        { marginTop: 22 },
                      )}
                    </View>
            }
          </>
          : null
        }
        {this.state.pangstDocType !== 'form60' ?
          <>
            <View>
              <Icon
                onPress={() => {
                  if (!this.state.isViewOnly) {
                    if (this?.state?.selectedDocType?.toLowerCase() === 'adhar') {
                      this.clearKYCDocData();
                      this.setState({
                        selectedDocType: '',
                      });

                      this.props.deleteDocuments({
                        data: {
                          deleteflag: this.state.deleteflag,
                          applicantUniqueId:
                            this.state.isguarantor || this.state.iscoapplicant
                              ? this.state.coapplicantUniqueId
                              : this.state.applicantUniqueId,
                        },
                        callback: (response) => {
                          this.setState({
                            kycData: false,
                          })
                        },
                      });

                    } else {
                      this.clearKYCDocData();
                      this.setState({
                        selectedDocType: 'adhar',
                      });
                    }
                  }
                }}
                disabled={
                  this?.state?.selectedDocType !== '' &&
                  this?.state?.selectedDocType?.toLowerCase() !== 'adhar'
                }
                reverse
                name={
                  this?.state?.selectedDocType !== '' &&
                    this?.state?.selectedDocType?.toLowerCase() === 'adhar'
                    ? 'minus'
                    : 'plus'
                }
                type="antdesign"
                color={'#334e9e'}
              />
              <Text style={docTextStyle}>
                {ADDITIONAL_DETAILS_CONST.ADHAR_CARD}
              </Text>

              {this.renderToolTip(
                'You will need to add your current, permanant and employment details, if you add your passport details',
              )}
            </View>
          </>
          : null
        }
        {this.state.pangstDocType !== 'form60' ?
          <>
            <View>
              <Icon
                onPress={() => {
                  if (!this.state.isViewOnly) {
                    if (this?.state?.selectedDocType?.toLowerCase() === 'passport') {
                      this.clearKYCDocData();
                      this.setState({ selectedDocType: '' });

                      this.props.deleteDocuments({
                        data: {
                          deleteflag: this.state.deleteflag,
                          applicantUniqueId:
                            this.state.isguarantor || this.state.iscoapplicant
                              ? this.state.coapplicantUniqueId
                              : this.state.applicantUniqueId,
                        },
                        callback: (response) => {
                          this.setState({
                            kycData: false,
                          })
                        },
                      });

                    } else {
                      this.clearKYCDocData();
                      this.setState({ selectedDocType: 'passport' });
                    }
                  }
                }}
                disabled={
                  this?.state?.selectedDocType !== '' &&
                  this?.state?.selectedDocType?.toLowerCase() !== 'passport'
                }
                reverse
                name={
                  this?.state?.selectedDocType !== '' &&
                    this?.state?.selectedDocType?.toLowerCase() === 'passport'
                    ? 'minus'
                    : 'plus'
                }
                type="antdesign"
                color={'#334e9e'}
              />
              <Text style={docTextStyle}>{ADDITIONAL_DETAILS_CONST.PASSPORT}</Text>

              {this.renderToolTip(
                'You will need to add your current, permanant and employment details, if you add your passport details',
                { marginTop: 22 },
              )}
            </View>
          </>
          : null
        }

        {this.state.pangstDocType !== 'form60' ?
          <View>
            <Icon
              onPress={() => {
                if (!this.state.isViewOnly) {
                  if (this?.state?.selectedDocType?.toLowerCase() === 'voter') {
                    this.clearKYCDocData();
                    this.setState({ selectedDocType: '' });
                    this.props.deleteDocuments({
                      data: {
                        deleteflag: this.state.deleteflag,
                        applicantUniqueId:
                          this.state.isguarantor || this.state.iscoapplicant
                            ? this.state.coapplicantUniqueId
                            : this.state.applicantUniqueId,
                      },
                      callback: (response) => {
                        this.setState({
                          kycData: false,
                        })
                      },
                    });

                  } else {
                    this.clearKYCDocData();
                    this.setState({ selectedDocType: 'voter' });
                  }
                }
              }}
              disabled={
                this?.state?.selectedDocType !== '' &&
                this?.state?.selectedDocType?.toLowerCase() !== 'voter'
              }
              reverse
              name={
                this?.state?.selectedDocType !== '' &&
                  this?.state?.selectedDocType?.toLowerCase() === 'voter'
                  ? 'minus'
                  : 'plus'
              }
              type="antdesign"
              color={'#334e9e'}
            />
            <Text style={docTextStyle}>{ADDITIONAL_DETAILS_CONST.VOTER_ID}</Text>

            {this.renderToolTip(
              'You will need to add your current, permanant and employment details, if you add your passport details',
              { marginTop: 22 },
            )}
          </View>
          : null
        }
        {this.state.pangstDocType !== 'form60' ?
          <>
            <View>
              <Icon
                onPress={() => {
                  if (!this.state.isViewOnly) {
                    if (
                      this?.state?.selectedDocType?.toLowerCase() === 'driving license'
                    ) {
                      this.clearKYCDocData();
                      this.setState({
                        selectedDocType: '',
                      });
                      this.props.deleteDocuments({
                        data: {
                          deleteflag: this.state.deleteflag,
                          applicantUniqueId:
                            this.state.isguarantor || this.state.iscoapplicant
                              ? this.state.coapplicantUniqueId
                              : this.state.applicantUniqueId,
                        },
                        callback: (response) => {
                          this.setState({
                            kycData: false,
                          })
                        },
                      });

                    } else {
                      this.clearKYCDocData();
                      this.setState({
                        selectedDocType: 'driving license',
                      });
                    }
                  }
                }}
                disabled={
                  this?.state?.selectedDocType !== '' &&
                  this?.state?.selectedDocType?.toLowerCase() !== 'driving license'
                }
                reverse
                name={
                  this?.state?.selectedDocType !== '' &&
                    this?.state?.selectedDocType?.toLowerCase() === 'driving license'
                    ? 'minus'
                    : 'plus'
                }
                type="antdesign"
                color={'#334e9e'}
              />
              <Text style={docTextStyle}>
                {ADDITIONAL_DETAILS_CONST.DRIVING_LICENSE}
              </Text>

              {this.renderToolTip(
                'You will need to add your current, permanant and employment details, if you add your passport details',
              )}
            </View>
            <View>
              <Icon
                onPress={() => {
                  if (!this.state.isViewOnly) {
                    if (this?.state?.selectedDocType?.toLowerCase() === 'other') {
                      this.clearKYCDocData();
                      this.setState({ selectedDocType: '' });

                      this.props.deleteDocuments({
                        data: {
                          deleteflag: this.state.deleteflag,
                          applicantUniqueId:
                            this.state.isguarantor || this.state.iscoapplicant
                              ? this.state.coapplicantUniqueId
                              : this.state.applicantUniqueId,
                        },
                        callback: (response) => {
                          this.setState({
                            kycData: false,
                          })
                        },
                      });

                    } else {
                      this.clearKYCDocData();
                      this.setState({ selectedDocType: 'other' });
                    }
                  }
                }}
                disabled={
                  this?.state?.selectedDocType !== '' &&
                  this?.state?.selectedDocType?.toLowerCase() !== 'other'
                }
                reverse
                name={
                  this?.state?.selectedDocType !== '' &&
                    this?.state?.selectedDocType?.toLowerCase() === 'other'
                    ? 'minus'
                    : 'plus'
                }
                type="antdesign"
                color={'#334e9e'}
              />
              <Text style={docTextStyle}>
                {ADDITIONAL_DETAILS_CONST.OTHER_LABEL}
              </Text>

              {this.renderToolTip(
                'You will need to add your current, permanant and employment details, if you add your passport details',
                { marginTop: 22 },
              )}
            </View>
          </>
          : null
        }
      </View>
    );
  }

  permanentAddress() {
    const {
      collapsedViewStyle,
      collapsedContainer,
      plusImageStyle,
      registeredAddressLabel,
      expandedContainer,
      seperatorStyle,
      expandedViewStyle,
    } = AdditionalDetailsStyles;

    if (this.state.additionalDetailOptions.permanentAddressCollapsed) {
      return (
        <View style={collapsedContainer}>

          <TouchableOpacity
            style={collapsedViewStyle}
            onPress={() => {
              this.handleCollapseExpand('permanentAddressCollapsed', false);
            }}>
            <Text style={registeredAddressLabel}>
              {this.state.residenceFlag == false ? ADDITIONAL_DETAILS_CONST.PERMANENT_ADDRESS2 : ADDITIONAL_DETAILS_CONST.PERMANENT_ADDRESS}
            </Text>
            <Image source={BLUE_PLUS_ICON} style={plusImageStyle} />
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <View style={expandedContainer}>
          <View style={seperatorStyle} />
          <View style={expandedViewStyle}>
            <TouchableOpacity
              style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}
              onPress={() => {
                this.handleCollapseExpand('permanentAddressCollapsed', true);

              }}>
              <Text style={registeredAddressLabel}>
                {this.state.residenceFlag == false ? ADDITIONAL_DETAILS_CONST.PERMANENT_ADDRESS2 : ADDITIONAL_DETAILS_CONST.PERMANENT_ADDRESS}
              </Text>

              <Image
                source={MINUS_ICON}
                style={plusImageStyle}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
          {this.renderPermanentAddress()}
          <View style={seperatorStyle} />
        </View>
      );
    }
  }

  permanentResidenceAddr() {
    const {
      collapsedViewStyle,
      collapsedContainer,
      plusImageStyle,
      registeredAddressLabel,
      expandedContainer,
      seperatorStyle,
      expandedViewStyle,
    } = AdditionalDetailsStyles;

    if (this.state.additionalDetailOptions.permanentResidenceAddrCollapsed) {
      return (
        <View style={collapsedContainer}>

          <TouchableOpacity
            style={collapsedViewStyle}
            onPress={() => {
              this.handleCollapseExpand('permanentResidenceAddrCollapsed', false);
            }}>
            <Text style={registeredAddressLabel}>
              {"Permanent Address*"}
            </Text>
            <Image source={BLUE_PLUS_ICON} style={plusImageStyle} />
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <View style={expandedContainer}>
          <View style={seperatorStyle} />
          <View style={expandedViewStyle}>
            <TouchableOpacity
              style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}
              onPress={() => {
                this.handleCollapseExpand('permanentResidenceAddrCollapsed', true);
              }}>
              <Text style={registeredAddressLabel}>
                {'Permanent Address*'}
              </Text>

              <Image
                source={MINUS_ICON}
                style={plusImageStyle}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
          {this.renderPermanentResAddr()}
          <View style={seperatorStyle} />
        </View>
      );
    }
  }

  employeementDetails() {
    const {
      collapsedViewStyle,
      collapsedContainer,
      plusImageStyle,
      registeredAddressLabel,
      expandedContainer,
      seperatorStyle,
      expandedViewStyle,
    } = AdditionalDetailsStyles;

    if (this.state.additionalDetailOptions.employementDetailsCollapsed) {
      return (
        <View style={collapsedContainer}>
          <TouchableOpacity
            style={collapsedViewStyle}
            onPress={() => {
              this.handleCollapseExpand('employementDetailsCollapsed', false);
            }}>
            <Text style={registeredAddressLabel}>
              {
                // this.state.isguarantor || this.state.iscoapplicant ? ADDITIONAL_DETAILS_CONST.EMPLOYEMENT_DETAILS_COAPPLICANT : 
                ADDITIONAL_DETAILS_CONST.EMPLOYEMENT_DETAILS}
            </Text>
            <Image source={BLUE_PLUS_ICON} style={plusImageStyle} />
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <View style={expandedContainer}>
          <View style={seperatorStyle} />
          <View style={expandedViewStyle}>
            <TouchableOpacity
              style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}
              onPress={() => {
                this.handleCollapseExpand('employementDetailsCollapsed', true);
              }}>
              <Text style={registeredAddressLabel}>
                {
                  // this.state.isguarantor || this.state.iscoapplicant ? ADDITIONAL_DETAILS_CONST.EMPLOYEMENT_DETAILS_COAPPLICANT :
                  ADDITIONAL_DETAILS_CONST.EMPLOYEMENT_DETAILS}
              </Text>

              <Image
                source={MINUS_ICON}
                style={plusImageStyle}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
          {this.renderEmployementDetails()}
          <View style={seperatorStyle} />
        </View>
      );
    }
  }

  officeAddress() {
    const {
      collapsedViewStyle,
      collapsedContainer,
      plusImageStyle,
      registeredAddressLabel,
      expandedContainer,
      seperatorStyle,
      expandedViewStyle,
    } = AdditionalDetailsStyles;

    if (this.state.additionalDetailOptions.officeAddressCollapsed) {
      return (
        <View style={collapsedContainer}>
          <TouchableOpacity
            style={collapsedViewStyle}
            onPress={() => {
              this.handleCollapseExpand('officeAddressCollapsed', false);
            }}>
            <Text style={registeredAddressLabel}>
              {
                // this.state.iscoapplicant || this.state.isguarantor ? ADDITIONAL_DETAILS_CONST.OFFICE_ADDRESS_COAPPLICANT :
                `${this.state.indSelfSoleFlag ? ADDITIONAL_DETAILS_CONST.CURRENT_OFFICE_ADDRESS : ADDITIONAL_DETAILS_CONST.OFFICE_ADDRESS}`}
            </Text>
            <Image source={BLUE_PLUS_ICON} style={plusImageStyle} />
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <View style={expandedContainer}>
          <View style={seperatorStyle} />
          <View style={expandedViewStyle}>
            <TouchableOpacity
              style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}
              onPress={() => {
                this.handleCollapseExpand('officeAddressCollapsed', true);
              }}>
              <Text style={registeredAddressLabel}>
                {
                  // this.state.iscoapplicant || this.state.isguarantor ? ADDITIONAL_DETAILS_CONST.OFFICE_ADDRESS_COAPPLICANT :
                  `${this.state.indSelfSoleFlag ? ADDITIONAL_DETAILS_CONST.CURRENT_OFFICE_ADDRESS : ADDITIONAL_DETAILS_CONST.OFFICE_ADDRESS}`}
              </Text>

              <Image
                source={MINUS_ICON}
                style={plusImageStyle}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>

          {this.renderOfficeAddress()}
          <View style={seperatorStyle} />
        </View>
      );
    }
  }

  additionalContactDetails() {
    const {
      collapsedViewStyle,
      collapsedContainer,
      plusImageStyle,
      registeredAddressLabel,
      expandedContainer,
      seperatorStyle,
      expandedViewStyle,
      inputStyle,
      inputTextStyle,
      saveButtonTitleStyle,
      saveButtonStyle,
      separatorInputStyle,
      errorLabel,
      disableStyle,
      disableTextStyle,
      marginTop20Style,
    } = AdditionalDetailsStyles;

    if (this.state.additionalDetailOptions.additionalContactCollapsed) {
      return (
        <View style={collapsedContainer}>
          <TouchableOpacity
            style={collapsedViewStyle}
            onPress={() => {
              this.handleCollapseExpand('additionalContactCollapsed', false);
            }}>
            <Text style={registeredAddressLabel}>
              {
                // this.state.iscoapplicant || this.state.isguarantor ? ADDITIONAL_DETAILS_CONST.ADDITIONAL_CONTACT_DETAILS_COAPPLICANT : 
                ADDITIONAL_DETAILS_CONST.ADDITIONAL_CONTACT_DETAILS}
            </Text>
            <Image source={BLUE_PLUS_ICON} style={plusImageStyle} />
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <View style={expandedContainer}>
          <View style={seperatorStyle} />
          <View style={expandedViewStyle}>
            <TouchableOpacity
              style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}
              onPress={() => {
                this.handleCollapseExpand('additionalContactCollapsed', true);
              }}>
              <Text style={registeredAddressLabel}>
                {
                  // this.state.iscoapplicant || this.state.isguarantor ? ADDITIONAL_DETAILS_CONST.ADDITIONAL_CONTACT_DETAILS_COAPPLICANT :
                  ADDITIONAL_DETAILS_CONST.ADDITIONAL_CONTACT_DETAILS}
              </Text>

              <Image
                source={MINUS_ICON}
                style={plusImageStyle}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
          <View style={marginTop20Style}>
            <FloatingLabelInput
              editable={!this.state.isViewOnly}
              maxLength={10}
              label={ADDITIONAL_DETAILS_CONST.MOBILE_NUMBER}
              containerStyles={inputStyle}
              keyboardType={'number-pad'}
              value={this.state.mobileNumber.value || undefined}
              onChangeText={(value) => {
                this.setState({
                  mobileNumber: {
                    value: value,
                    isValid: MOBILE_NUMBER_REGEX.test(value),
                  },
                });
              }}
              customLabelStyles={{
                colorFocused: colors.COLOR_LIGHT_NAVY_BLUE,
                colorBlurred: colors.COLOR_LIGHT_GREY,
                fontSizeFocused: 15,
                fontSizeBlurred: 15,
              }}
              inputStyles={inputTextStyle}
            />
            <View style={separatorInputStyle} />
            {this.state.mobileNumber.value !== '' &&
              !this.state.mobileNumber.isValid && (
                <Text style={errorLabel}>
                  {ADDITIONAL_DETAILS_CONST.INVALID_MOBILE_NUMBER}
                </Text>
              )}
          </View>

          <Button
            isDisabled={
              // this.state.isAdditionalContactSaved ||
              (this.state.mobileNumber.value === '' ||
                !this.state.mobileNumber.isValid) || this.state.isViewOnly
            }
            title={ADDITIONAL_DETAILS_CONST.BUTTON_TITLE_SAVE}
            onPress={() => {
              const dataToAPI = {
                leadCode: this.state.leadCode,
                alternateContact: this.state.mobileNumber.value,
                ismainapplicant: !(this.state.iscoapplicant || this.state.isguarantor),
                isguarantor: this.state.isguarantor,
                applicantUniqueId:
                  this.state.isguarantor || this.state.iscoapplicant
                    ? this.state.coapplicantUniqueId
                    : this.state.applicantUniqueId,
                id: this.state.idToEditAdditionalContact,
              };
              this.props.saveAdditionalContact({
                dataToAPI,
                callback: (response) => {
                  if (response && !response.error) {
                    this.setState({
                      contactData: true,
                      isAdditionalContactSaved: true,
                      additionalDetailOptions: {
                        employementDetailsCollapsed: true,
                        officeAddressCollapsed: true,
                        registeredCollapsed: true,
                        permanentAddressCollapsed: true,
                        additionalContactCollapsed: true,
                      },
                    });
                  }
                },
              });
            }}
            customContainerStyle={saveButtonStyle}
            cutomTitleStyle={saveButtonTitleStyle}
            customContainerStyle={
              // this.state.isAdditionalContactSaved ||
              (this.state.mobileNumber.value === '' ||
                !this.state.mobileNumber.isValid) || this.state.isViewOnly
                ? disableStyle
                : saveButtonStyle
            }
            cutomTitleStyle={
              // this.state.isAdditionalContactSaved ||
              (this.state.mobileNumber.value === '' ||
                !this.state.mobileNumber.isValid) || this.state.isViewOnly
                ? disableTextStyle
                : saveButtonTitleStyle
            }
          />
          <View style={seperatorStyle} />
        </View>
      );
    }
  }






  render() {
    const {
      mainContainer,
      additionalDetailsLabel,
      scrollViewStyle,
      progressBarContainer,
      headerTextContrainer,
    } = AdditionalDetailsStyles;
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

        <View style={progressBarContainer}>
          <View style={{ alignContent: 'center' }}>
            <View style={{ zIndex: 1 }}>
              <DottedProgressBar
                totalSteps={this.state.iscoapplicant || this.state.isguarantor ? [1, 2, 3] : this.state.indSelfSoleFlag ? [1, 2, 3, 4, 5] : [1, 2, 3, 4, 5, 6]}
                currentIndex={2}
              />
            </View>
            <View style={headerTextContrainer}>
              <Text style={additionalDetailsLabel}>
                {"ADDITIONAL_DETAILS_CONST.ADDITIONAL_DETAIL_LABEL"}
              </Text>
            </View>
          </View>
          <ScrollView style={scrollViewStyle}>
            <View style={mainContainer}>

              {this.renderRegisteredAddress()}
              {this.state.indSelfSoleFlag == false && this.permanentAddress()}
              {this.state.indSelfSoleFlag == true && this.officeAddress()}
              {
                this.state.permanentVisible == true &&
                this.permanentResidenceAddr()}
              {this.employeementDetails()}
              {this.additionalContactDetails()}
              <View style={{ alignSelf: 'center', width: '45%', marginVertical: 10 }}>
                <Button
                  title={'Loan Summary'}
                  //isDisabled={!this.state.mainApplicantSummary === true}
                  onPress={() => {
                    this.props.navigation.navigate('LoanSummary', {
                      leadName: this.state.leadName,
                      "applicantUniqueId": this.state.iscoapplicant || this.state.isguarantor ? this.state.coapplicantUniqueId : this.state.applicantUniqueId,
                      leadCode: this.state.leadCode,
                      mobileNumber: this.state.mobileNumberFromProps,
                      coapplicantUniqueId: this.state.coapplicantUniqueId,
                      ismainapplicant: !(this.state.iscoapplicant || this.state.isguarantor),
                      iscoapplicant: this.state.iscoapplicant,
                      isguarantor: this.state.isguarantor,
                      isViewOnly: this.state.isViewOnly || false,
                    });
                  }}
                />
              </View>
              <View style={{ flexDirection: 'row' }}>
                <View style={{ flex: 1, marginRight: 10 }}>
                  <Button
                    title={"Cancel"}
                    onPress={() => {
                      this.props.navigation.navigate('LeadList');
                    }}
                  />
                </View>

                <View style={{ flex: 1, marginRight: 10 }}>
                  <Button
                    title={ADDITIONAL_DETAILS_CONST.BUTTON_NEXT}
                    isDisabled={
                      // !(this.state.iscoapplicant || this.state.isguarantor) ? 
                      this.getNextDisable()
                      // : null

                    }
                    onPress={() => {
                      if (this.state.indSelfSoleFlag) {
                        this.props.navigation.navigate('BusinessDetails', {
                          leadName: this.state.leadName,
                          applicantUniqueId: this.state.applicantUniqueId,
                          leadCode: this.state.leadCode,
                          mobileNumber: this.state.mobileNumberFromProps,
                          coapplicantUniqueId: this.state.coapplicantUniqueId,
                          ismainapplicant: !(this.state.iscoapplicant || this.state.isguarantor),
                          iscoapplicant: this.state.iscoapplicant,
                          isguarantor: this.state.isguarantor,
                          isViewOnly: this.state.isViewOnly || false,
                        });
                      }
                      else {
                        this.props.navigation.navigate('PersonalDetails', {
                          leadName: this.state.leadName,
                          applicantUniqueId: this.state.applicantUniqueId,
                          leadCode: this.state.leadCode,
                          mobileNumber: this.state.mobileNumberFromProps,
                          coapplicantUniqueId: this.state.coapplicantUniqueId,
                          ismainapplicant: !(this.state.iscoapplicant || this.state.isguarantor),
                          iscoapplicant: this.state.iscoapplicant,
                          isguarantor: this.state.isguarantor,
                          isViewOnly: this.state.isViewOnly || false,
                        });
                      }

                    }
                    }
                  />
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
      </WaveBackground>
    );
  }
}

AdditionalDetails.propTypes = {

  uploadDocAdditionalDetails: PropTypes.func,
  getCityState: PropTypes.func,
  getResidenceType: PropTypes.func,
  saveEmploymentDetails: PropTypes.func,
  saveAdditionalContact: PropTypes.func,
  saveOfficeAddress: PropTypes.func,
  getCityList: PropTypes.func,
  saveKYCDetail: PropTypes.func,
  getKYCDoc: PropTypes.func,
  getUtilityDoc: PropTypes.func,
  getServiceProvider: PropTypes.func,
  saveUtilityDetails: PropTypes.func,
  getDetailsElectricity: PropTypes.func,
  getDetailsGas: PropTypes.func,
  getDetailsLandline: PropTypes.func,
  uploadUtilityDoc: PropTypes.func,
  deleteUploadedUtilityDoc: PropTypes.func,
  verifyDrivingLicense: PropTypes.func,
  verifyVoterID: PropTypes.func,
  getDesignation: PropTypes.func,
  getCompanyType: PropTypes.func,
  getIndustry: PropTypes.func,

};

export default compose(
  container,
  withProps(() => { }),
)(AdditionalDetails);

const styles = StyleSheet.create({
  autocompleteContainer: {
    flex: 1,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 1
  }
});