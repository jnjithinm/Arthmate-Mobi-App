import moment from 'moment';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
  Image,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { DatePickerDialog } from 'react-native-datepicker-dialog';
import DropDownPicker from 'react-native-dropdown-picker';
import { Icon } from 'react-native-elements';
import { FloatingLabelInput } from 'react-native-floating-label-input';
import { compose, withProps } from 'recompose';
import { baseURL, uatURL } from '../../../baseURL';
import { selectCamera, selectFile, selectPDF } from '../../../uploadImageUtils';
import { handleError, handleWarning } from '../../../utils';
import { NAME_REGEX, PAN_REGEX } from '../../../validations ';
import { Button } from '../../components/Button/Button';
import { DottedProgressBar } from '../../components/DottedProgressBar/DottedProgressBar';
import { Header } from '../../components/Header/Header';
import { RadioButton } from '../../components/RadioButton/RadioButton';
import { WaveBackground } from '../../components/WaveBackground/WaveBackground';
import * as colors from '../../constants/colors';
import { DOWN_ARROW, UP_ARROW, VERIFIED_TICK } from '../../constants/imgConsts';
import { PAN_GST_CONST } from '../../constants/screenConst';
import container from '../../container/PANAndGSTVerification/index';
import { PANAndGSTVerificationStyles } from './PANAndGSTVerificationStyles';

class PANAndGSTVerification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dropDownItem: [],
      selectedEntity: 'Individual',
      sourceType: [
        {
          title: 'Salaried',
          isSelected: false,
        },
        {
          title: 'Self-Employed',
          isSelected: false,
        },
      ],
      form60Flag: true,
      selectedOccupation: 'Salaried',
      selectedEntityDropdown: '',
      panName: {
        value: '',
        isValid: true,
      },
      dateOfIncorporation: "",
      dateOfIncorporationText: '',
      panNumber: {
        value: '',
        isValid: true,
      },
      panImageURI: '',
      saveEnable: false,
      isPANVerified: false,
      isPANSelected: true,
      invalidDate: false,
      invalidDateMessage: PAN_GST_CONST.MADATORY_DATE_OF_BIRTH,
      isForm60Success: false,
      idToEdit: null,
      leadCodeFromProps:
        (this.props.navigation &&
          this.props.navigation.state &&
          this.props.navigation.state.params &&
          this.props.navigation.state.params.leadCode) ||
        (this.props.newLeadDataSelector &&
          this.props.newLeadDataSelector.newLead &&
          this.props.newLeadDataSelector.newLead.leadCode) ||
        '',
      mobileNumberFromProps:
        (this.props.navigation &&
          this.props.navigation.state &&
          this.props.navigation.state.params &&
          this.props.navigation.state.params.mobileNumber) ||
        (this.props.newLeadDataSelector &&
          this.props.newLeadDataSelector.newLead &&
          this.props.newLeadDataSelector.newLead.customerMobile) ||
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
      cancelButtonTitle: 'Cancel',
      isDataSaved: false,
      gstEnableSelfEmployed: false,
      ismainapplicant: this.props.navigation.state.params.ismainapplicant,
      dropDownGender: [
        {
          value: 'Male',
          label: 'Male',
        },
        {
          value: 'Female',
          label: 'Female',
        },
        {
          value: 'Transgender',
          label: 'Transgender',
        },
      ],
      selectedGender: {
        value: null,
        label: '',
        isValid: true
      },
      dropDownEntity: [
        {
          value: 'Sole Proprietory Firm',
          label: 'Sole Proprietory Firm',
        },
        {
          value: 'Partnership Firm',
          label: 'Partnership Firm',
        },
      ],
      selectedEntityDrop: {
        value: 'Sole Proprietory Firm',
        label: 'Sole Proprietory Firm',
      },
      dropDownGST: [],
      selectedGSTDrop: {
        value: null,
        label: null,
        isValid: true
      },
      iscoapplicant:
        (this.props.navigation &&
          this.props.navigation.state &&
          this.props.navigation.state.params &&
          this.props.navigation.state.params.iscoapplicant) ||
        false,
      isguarantor:
        (this.props.navigation &&
          this.props.navigation.state &&
          this.props.navigation.state.params &&
          this.props.navigation.state.params.isguarantor) ||
        false,
      coapplicantUniqueId:
        this.props.navigation.state.params.coapplicantUniqueId || '',
      mandatoryGender: false,
      isViewOnly: false,
    };
    this.controller;
  }
  selectRadioButton(value, index) {
    this.setState({ selectedOccupation: value.title });
  }
  isselectedGender() {
    if (this.state.panImageURI === '') {
      handleError(PAN_GST_CONST.DOC_VALIDATION);
    }
    if (
      this.state.isPANSelected &&
      this.state.panNumber.value === '' ||
      // this.state.isPANSelected === 'pan' &&
      !this.state.panNumber.isValid
    ) {
      this.setState({
        panNumber: {
          ...this.state.panNumber,
          isValid: false,
          message:
            this.state.panNumber.value === ''
              ? PAN_GST_CONST.MANDATORY_PAN_NUMBER
              : PAN_GST_CONST.INVALID_PAN_NUMBER,
        },
      });
    }
    if (
      this.state.selectedGender.value === '' ||
      this.state.selectedGender.value === null
    ) {
      this.setState({
        selectedGender: {
          isValid: false
        },
      });
    }
    if (
      this.state.panName.value === '' ||
      !this.state.panName.isValid
    ) {
      this.setState({
        panName: {
          ...this.state.panName,
          isValid: false,
        },
      });
    }
    if (this.state.dateOfIncorporationText === '' ||
      this.state.dateOfIncorporationText === null) {
      this.setState({ invalidDate: true });
    }

    if (this.state.selectedGender.value == null) {
      this.setState({ selectedGender: { isValid: false } });
    }
  }

  isselectedGST() {
    if (this.state.panImageURI === '') {
      handleError(PAN_GST_CONST.DOC_VALIDATION);
    }
    if (
      this.state.isPANSelected &&
      this.state.panNumber.value === '' &&
      // this.state.isPANSelected === 'pan' &&
      this.state.panNumber.isValid
    ) {
      this.isPan(this.state.panNumber.value)
    }
    if (this.state.selectedGSTDrop.value == null || this.state.selectedGSTDrop.value == '') {
      this.setState({
        selectedGSTDrop: { isValid: false }
      })
    }
    if (
      this.state.panName.value === '' ||
      !this.state.panName.isValid
    ) {
      this.setState({
        panName: {
          ...this.state.panName,
          isValid: false,
        },
      });
    }
    if (this.state.dateOfIncorporationText === '' ||
      this.state.dateOfIncorporationText === null) {
      this.setState({ invalidDate: true });
    }
  }

  isPan(value) {
    if (this.state.selectedOccupation == 'Self-Employed') {
      let valid = PAN_REGEX.test(value);
      let validPan = valid == true ? this.state.selectedEntity.toLowerCase() === 'individual'
      // && value.substring(3, 4) == 'C' ? true : false 
      : valid
      this.setState({
        panNumber: {
          ...this.state.panNumber,
          value: value,
          isPANVerified: false,
          isValid: value === '' ? true : validPan,
          message: PAN_GST_CONST.INVALID_PAN_NUMBER,
        },
      });
    } else {
      let valid = PAN_REGEX.test(value);
      let validPan = valid == true ? this.state.selectedEntity.toLowerCase() === 'individual' &&
        value.substring(3, 4) == 'P' ? true : false : valid
      this.setState({
        panNumber: {
          ...this.state.panNumber,
          value: value,
          isPANVerified: false,
          isValid: value === '' ? true : validPan,
          message: PAN_GST_CONST.INVALID_PAN_NUMBER,
        },
      });
    }

  }

  loanSummary() {
    const dataToAPI = {
      applicant_uniqueid: this.state.applicantUniqueId,
      lead_code: this.state.leadCodeFromProps,
      roleId: this.props.userDataSelector.userData.data.roleId
    };
    this.props.getLoanSummary({
      dataToAPI,
      callback: (response) => {        
      
        this.setState({
          isViewOnly:
          response?.mainapplicant?.bureauStatus ? true :
          response?.mainapplicant?.dedupeStatus ? true :
          response?.mainapplicant?.loanAgreementFlag ? true : 
          response?.modelAccess[0]?.read ? true :
          this.state.iscoapplicant ? response?.coapplicant[this.props.navigation.state.params.index]?.panFreeze? true : false :
          this.state.isguarantor ? response?.gurantor[this.props.navigation.state.params.index]?.panFreeze? true : false :
          response?.mainapplicant?.panFreeze? true : 
              false
        })
      }
    })
  }

  componentDidMount() {
    this.loanSummary()
    this.props.getEntityList({
      callback: (response) => {
        const dataForDropdown = response.data.map((value) => ({
          value: value,
          label: value.companyType,
        }));
        this.setState({ dropDownItem: dataForDropdown || [] });
      },
    });
    const dataForgetQDE = {
      applicant_uniqueid:
        this.state.iscoapplicant || this.state.isguarantor
          ? this.props.navigation.state.params.coapplicantUniqueId
          : this.state.applicantUniqueId,
      ismainapplicant: this.state.iscoapplicant || this.state.isguarantor ? false : true,
      isguarantor: this.state.isguarantor || false,
    };
    this.props.getQDEData({
      dataForgetQDE,
      callback: (response) => {
        this.setState({
          form60Flag: response.form60Flag
        })
        if (
          this.props.userQDEDataSelector &&
          this.props.userQDEDataSelector.pangstdetails
        ) {
          const panData = this.props.userQDEDataSelector.pangstdetails;

          if (panData?.occupationType == 'selfemployed') {

            // if (panData?.documentType == 'pan') {
              this.setState({
                selectedEntityDrop: {
                  value: panData?.entity || null,
                  label: panData?.entity || null,
                },
              })
            // }
            
            if (panData?.documentType == 'form60') {
              this.setState({
                isForm60Success: panData?.documentType === 'form60' ? true : false,
                selectedOccupation: 'Self-Employed',
              })
            } else {
              this.setState({
                selectedOccupation: 'Self-Employed',
                saveEnable: true,
              })
              const dataToAPI = {
                panNumber: panData?.panNumber.toUpperCase()
              }
              // this.props.gstWrapperAPI({
              //   dataToAPI,
              //   callback: (response) => {
              //     if (response?.data.length > 0) {
              //       const responseGST = response.data.map((value) => ({
              //         value: value?.gstinId,
              //         label: value?.gstinId,

              //       }));
              //       this.setState({
              //         dropDownGST: responseGST || [],
              //         selectedGSTDrop: {
              //           value: panData?.gst,
              //           label: panData?.gst,
              //           isValid: true,
              //         },
              //         gstEnableSelfEmployed: true
              //       });
              //     }
              //   }
              // })
            }

          } else {
            this.setState({
              selectedOccupation: 'Salaried',
              invalidDate:
                panData &&
                moment(panData.dateOfBirth, ["MM-DD-YYYY", "DD-MM-YYYY", "YYYY-MM-DD", "DD/MM/YYYY", "YYYY/MM/DD", "MM/DD/YYYY"]) >
                moment().clone().subtract(18, 'years'),
              invalidDateMessage:
                panData &&
                  moment(panData.dateOfBirth) >
                  moment().clone().subtract(18, 'years')
                  ? "" : PAN_GST_CONST.MADATORY_DATE_OF_BIRTH,
            })
          }
          this.setState({
            selectedEntity:
              panData && panData.customerType ? panData.customerType : '',
            /*  selectedOccupation:
               panData && panData.occupationType ? panData.occupationType : '', */
            idToEdit: panData && panData.id ? panData.id : null,
            isguarantor:
              panData && panData.isguarantor ? panData.isguarantor : false,
            ismainapplicant:
              panData && panData.ismainapplicant
                ? panData.ismainapplicant
                : false,
            leadCodeFromProps: response.leadCode || this.state.leadCodeFromProps,
            panName: {
              value: panData && panData.panName ? panData.panName : '',
              isValid: true,
            },
            dateOfIncorporation:
              panData && panData.dateOfBirth
                ? this.FormataStringData(panData.dateOfBirth)
                : '',
            dateOfIncorporationText:
              panData && panData.dateOfBirth
                ? this.FormataStringData(panData.dateOfBirth)
                : '',

            /* : panData && panData.customerType
              ? PAN_GST_CONST.MADATORY_DATE_OF_BIRTH
              : PAN_GST_CONST.MADATORY_DATE_OF_INCORPORATION */
            panNumber: {
              value: panData && panData?.panNumber ? panData?.panNumber : '',
              isValid:
                panData?.customerType.toLowerCase() === 'individual' &&
                 panData?.panNumber?.toUpperCase().substring(3, 4) == 'P',
            },
            //https://app.creditwisecapital.in/cwc-document/pan/80073111311627562023899/pan-card-500x500.jpg
            //https://app.creditwisecapital.in/cwc-sales/cwc-document/pan/80073111311627562023899/pan-card-500x500.jpg
            panImageURI: panData && panData.filePath ? panData.filePath.replace('/var/www/html', uatURL.URL) : '',
            isPANSelected: panData && panData.documentType && panData.documentType === 'pan' ? true : false,
            isPANVerified: panData.documentType === 'form60' ? false : panData.verifyStatus == 'Approved' ? true : panData.verifyStatus == 'Manual Certififed' ? true : false,
            cancelButtonTitle: 'Loan Summary',
            //applicantUniqueId: response.applicantUniqueId,
            isDataSaved: true,
            isForm60Success: panData.documentType === 'form60' ? true : false,
            selectedGender: {
              value: panData.gender || null,
              label: panData.gender || null,
              isValid: true
            },
          });
        }
      },
    });
  }

  renderDropDownENTITIY() {

    const { lableStyle, textStyle, marginTop5 } = PANAndGSTVerificationStyles;

    return (
      <View style={[marginTop5, { marginBottom: 0 }]}>
        <Text style={[lableStyle, { marginBottom: 4, marginLeft: 5 }]}>
          Entity
        </Text>
        <DropDownPicker
          disabled={this.state.isViewOnly}
          items={this.state.dropDownEntity}
          containerStyle={{ flex: 1 }}
          style={{ backgroundColor: '#ffffff', borderWidth: 0 }}
          itemStyle={{
            justifyContent: 'flex-start',
            marginLeft: 4,
          }}
          placeholder={''}
          defaultValue={this.state.selectedEntityDrop.value}
          dropDownStyle={{ backgroundColor: '#ffffff' }}
          onChangeItem={(item) =>
            this.setState({
              selectedEntityDrop: {
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
        {/* <View style={[separatorStyle, { marginTop: 5 }]} /> */}
      </View>
    );
  }

  /* renderGSTDropDown() {
    const {
      separatorStyle,
      textStyle,
      marginTopStyle,
    } = PANAndGSTVerificationStyles;

    return (
      <View style={marginTopStyle}>
        <DropDownPicker
          items={this.state.dropDownItem}
          containerStyle={{ flex: 1 }}
          style={{ backgroundColor: '#ffffff', borderWidth: 0 }}
          itemStyle={{
            justifyContent: 'flex-start',
            marginLeft: 4,
          }}
          placeholder={PAN_GST_CONST.PLACEHOLDER_GST_DROPDOWN}
          dropDownStyle={{ backgroundColor: '#ffffff' }}
          onChangeItem={(item) =>
            this.setState({ selectedEntityDropdown: item.value })
          }
          customArrowUp={() => <Image source={UP_ARROW} />}
          customArrowDown={() => <Image source={DOWN_ARROW} />}
          labelStyle={textStyle}
          selectedLabelStyle={[textStyle, { color: colors.COLOR_BLACK }]}
        />
        <View style={separatorStyle} />
      </View>
    );
  } */

  /**
   * Call back for dob date picked event
   *
   */
  onDOBDatePicked = (date) => {
    if (this.state.selectedOccupation == 'Salaried') {
      this.setState({
        isPANVerified: false,
        dateOfIncorporation: date,
        dateOfIncorporationText: moment(date).format('YYYY-MM-DD'),
        invalidDate: moment(date) > moment().clone().subtract(18, 'years'),
        invalidDateMessage:
          moment(date) > moment().clone().subtract(18, 'years')
            ? PAN_GST_CONST.INVALID_DATE_OF_BIRTH
            : this.state.invalidDateMessage,
      });
    } else {
      this.setState({
        isPANVerified: false,
        dateOfIncorporation: date,
        dateOfIncorporationText: moment(date).format('YYYY-MM-DD'),
        invalidDateMessage: this.state.invalidDateMessage,
      });
    }

  };

  FormataStringData(data) {
    var dia = data.split('/')[0];
    var mes = data.split('/')[1];
    var ano = data.split('/')[2];
    return ano + '-' + ('0' + mes).slice(-2) + '-' + ('0' + dia).slice(-2);
  }

  formatDateToSlash(date) {
    var dia = date.split('-')[0];
    var mes = date.split('-')[1];
    var ano = date.split('-')[2];

    return ano + '/' + ('0' + mes).slice(-2) + '/' + dia;
  }

  errorcallback = (results) => {
    this.setState({
      panImageURI: results.uri || results.path
    })
  }

  callback = (panInfoData) => {
    if (!this.state.isPANSelected && panInfoData.path) {
      this.setState({ isForm60Success: true, panImageURI: panInfoData.path });
    }
    if (
      !this.state.isPANSelected &&
      !panInfoData.path &&
      panInfoData.fileCopyUri &&
      panInfoData.type === 'application/pdf'
    ) {
      this.setState({
        isForm60Success: true,
        panImageURI: panInfoData.uri,
      });
    }
    if (!this.state.isPANSelected && !panInfoData.path && panInfoData.uri) {
      this.setState({ isForm60Success: true, panImageURI: panInfoData.uri });
    }
    if (panInfoData && panInfoData.panName && panInfoData.panNo) {
      if (this.state.selectedOccupation == 'Self-Employed') {
        this.setState({
          panNumber: {
            isValid: true,
            // panInfoData.panNo.toUpperCase().substring(3, 4) !== 'C' ? false : true,
            value: panInfoData.panNo,
            message: PAN_GST_CONST.INVALID_PAN_NUMBER,
          },
        })
      }
      if (this.state.selectedOccupation == 'Salaried') {
        this.setState({
          panNumber: {
            isValid: panInfoData.panNo.toUpperCase().substring(3, 4) !== 'P' ? false : true,
            value: panInfoData.panNo,
            message: PAN_GST_CONST.INVALID_PAN_NUMBER,
          },
        })
      }
      this.setState({
        panName: {
          isValid: true,
          value: panInfoData.panName,
        },
        dateOfIncorporation: panInfoData.dateOfbirth,
        dateOfIncorporationText:
          panInfoData && panInfoData.dateOfbirth
            ? this.FormataStringData(panInfoData.dateOfbirth)
            : '',
        invalidDate: false,

        panImageURI: panInfoData.uri || panInfoData.path,
      });
    }
  };

  renderPANDetails() {
    const {
      lableStyle,
      mandatoryLabelStyle,
      imageContainer,
      uploadContainer,
      uploadTextStyle,
      inputTextStyle,
      inputStyle,
      separatorStyle,
      buttonContainer,
      labelDateOfIncStyle,
      textForInputStyle,
      imagePlaceHolderStyle,
      flexRowStyle,
      verifiedTextStyle,
      verifiedTickImageStyle,
      errorLabel,
      closeIconStyle,
      calendarIconWithText,
      calendarIcon,
      marginTop5,
      textStyle,
    } = PANAndGSTVerificationStyles;
    return (
      <View>
        <View style={[flexRowStyle, { justifyContent: 'space-between' }]}>
          <View>
            <Text style={lableStyle}>{this.state.isPANSelected ? PAN_GST_CONST.PAN_DETAILS : PAN_GST_CONST.Form60_DETAILS}</Text>
          </View>
          <View style={[flexRowStyle, { marginTop: 22 }]}>
            <Text
              style={[
                mandatoryLabelStyle,
                { color: colors.COLOR_LIGHT_NAVY_BLUE, fontSize: 18 },
              ]}>{`* `}</Text>
            <Text style={mandatoryLabelStyle}>
              {PAN_GST_CONST.MANDATORY_LABEL}
            </Text>
          </View>
        </View>
        <View style={[flexRowStyle, uploadContainer]}>
          <View style={[flexRowStyle, { marginRight: 30 }]}>
            <TouchableOpacity
              style={imageContainer}
              onPress={() => {
                const dataToAPI = {
                  panInfo: JSON.stringify({
                    leadCode: this.state.leadCodeFromProps,
                    mobileNumber: `${this.state.mobileNumberFromProps}`,
                    docType: 'pan',
                    applicantUniqueId:
                      this.state.isguarantor || this.state.iscoapplicant
                        ? this.state.coapplicantUniqueId
                        : this.state.applicantUniqueId,
                    ismainapplicant: this.state.iscoapplicant ? false : true,
                    isguarantor: this.state.isguarantor,
                  }),
                };
                if (!this.state.isViewOnly) {
                  if (this.state.isPANSelected) {
                    selectPDF(
                      this.props.uploadPANWrapperAPI,
                      dataToAPI,
                      this.callback,
                      this.errorcallback
                    );
                  } else {
                    const dataToAPI = {
                      panInfo: JSON.stringify({
                        leadCode: this.state.leadCodeFromProps,
                        mobileNumber: `${this.state.mobileNumberFromProps}`,
                        docType: 'form60',
                        ismainapplicant: this.state.iscoapplicant
                          ? false
                          : true,
                        isguarantor: this.state.isguarantor,
                        applicantUniqueId:
                          this.state.isguarantor || this.state.iscoapplicant
                            ? this.state.coapplicantUniqueId
                            : this.state.applicantUniqueId,
                      }),
                    };
                    selectPDF(
                      this.props.uploadPANWrapperAPI,
                      dataToAPI,
                      this.callback,
                    );
                  }
                }
              }}>
              <Icon size={30} name="image" type="entypo" color={'#ffffff'} />
            </TouchableOpacity>
            <Text style={uploadTextStyle}>{PAN_GST_CONST.UPLOAD_PHTO}</Text>
          </View>

          <View style={flexRowStyle}>
            <TouchableOpacity
              style={imageContainer}
              onPress={() => {
                const dataToAPI = {
                  panInfo: JSON.stringify({
                    leadCode: this.state.leadCodeFromProps,
                    mobileNumber: `${this.state.mobileNumberFromProps}`,
                    docType: this.state.isPANSelected ? 'pan' : 'form60',
                    ismainapplicant: this.state.iscoapplicant ? false : true,
                    isguarantor: this.state.isguarantor,
                    applicantUniqueId:
                      this.state.isguarantor || this.state.iscoapplicant
                        ? this.state.coapplicantUniqueId
                        : this.state.applicantUniqueId,
                  }),
                };
                if (!this.state.isViewOnly) {
                  selectCamera(
                    this.props.uploadPANWrapperAPI,
                    dataToAPI,
                    this.callback,
                    this.errorcallback,
                  );
                }
              }}>
              <Icon
                size={30}
                name="camera"
                type="antdesign"
                color={'#ffffff'}
              />
            </TouchableOpacity>
            <Text style={uploadTextStyle}>{PAN_GST_CONST.TAKE_PHOTO}</Text>
          </View>
        </View>

        {this.state.panImageURI !== '' && (
          <View>
            <Image
              source={{ uri: `${this.state.panImageURI}` }}
              style={imagePlaceHolderStyle}
              onError={() =>
                this.setState({
                  panImageURI:
                    'https://www.toddbershaddvm.com/wp-content/uploads/sites/257/2018/09/placeholder-img.jpg',
                })
              }
            />
            <TouchableOpacity
              style={closeIconStyle}
              onPress={() => {
                const dataToAPI = {
                  leadCode: this.state.leadCodeFromProps,
                  applicantUniqueId:
                    this.state.isguarantor || this.state.iscoapplicant
                      ? this.state.coapplicantUniqueId
                      : this.state.applicantUniqueId,
                };
                if (!this.state.isViewOnly) {
                  this.props.deletePANAPI({
                    dataToAPI,
                    callback: (response) => {
                      this.setState({
                        panName: {
                          value: '',
                          isValid: true,
                        },
                        dropDownGST: [],
                        saveEnable: false,
                        isDataSaved:false,
                        gstEnableSelfEmployed: false,
                        selectedGSTDrop: {
                          value: null,
                          label: '',
                          isValid: true
                        },
                        dateOfIncorporation: "",
                        dateOfIncorporationText: '',
                        invalidDate: false,
                        panNumber: {
                          value: '',
                          isValid: true,
                        },
                        selectedGender: {
                          value: null,
                          label: '',
                          isValid: true
                        },
                        panImageURI: '',
                        isPANVerified: false,
                        invalidDate: false,
                        isForm60Success: false,
                      });
                    },
                  });
                }
              }}>
              <Icon name="closecircle" type="antdesign" color={'#5f5c60'} />
            </TouchableOpacity>
          </View>
        )
        }

        <View style={{ marginTop: 45 }}>
          {this.state.isPANSelected && (
            <View>
              <FloatingLabelInput
                editable={!this.state.isViewOnly}
                autoCompleteType={'off'}
                autoCorrect={false}
                maxLength={10}
                label={PAN_GST_CONST.LABEL_PAN_NUMBER}
                containerStyles={inputStyle}
                value={this.state.panNumber.value || undefined}
                onChangeText={(value) => {
                  this.setState({
                    isPANVerified: false,
                    panNumber: {
                      ...this.state.panNumber,
                      value: value,
                    },
                  }, () => {
                    this.isPan(this.state.panNumber.value);
                    if (this.state.panNumber.value.length === 10) {
                      this.setState({
                        panNumber: {
                          ...this.state.panNumber,
                          value: value.toUpperCase(),
                        },
                      }, () => {
                        this.isPan(this.state.panNumber.value);
                      })
                    }
                  });
                }}
                customLabelStyles={{
                  colorFocused: colors.COLOR_LIGHT_GREY,
                  colorBlurred: colors.COLOR_LIGHT_GREY,
                  fontSizeFocused: 15,
                  fontSizeBlurred: 15,
                }}
                inputStyles={inputTextStyle}
              />
              <View
                style={[
                  separatorStyle,
                  { marginTop: -8 }
                ]}
              />
              {
                !this.state.panNumber.isValid && (
                  <Text style={errorLabel}>{this.state.panNumber.message}</Text>
                )
              }

            </View>


          )}



          <View>
            <TouchableOpacity
              onPress={() => {

                if (!this.state.isViewOnly) {
                  this.refs.dobDialog.open({
                    date: new Date(),
                    maxDate: new Date(), //To restirct future date
                  });
                }
              }}
              style={
                { marginBottom: 0, marginTop: 0 }
              }>
              <View>
                <Text style={labelDateOfIncStyle}>
                  {this.state.selectedOccupation == 'Salaried'
                    ? PAN_GST_CONST.LABEL_DOB
                    : PAN_GST_CONST.LABEL_DATE}
                </Text>
                <View
                  style={
                    this.state.dateOfIncorporationText === ''
                      ? calendarIcon
                      : calendarIconWithText
                  }>
                  <Icon
                    size={30}
                    name="calendar"
                    type="antdesign"
                    color={'#334e9e'}
                  />
                </View>
              </View>
              {this.state.dateOfIncorporationText !== '' && (
                <Text style={textForInputStyle}>
                  {this.state.dateOfIncorporationText}
                </Text>
              )}
              <View style={separatorStyle} />
              {this.state.invalidDate && (
                <Text style={errorLabel}>{this.state.invalidDateMessage}</Text>
              )}
            </TouchableOpacity>

            <DatePickerDialog
              ref="dobDialog"
              date={this.state.dateOfIncorporation}
              onDatePicked={this.onDOBDatePicked.bind(this)}
            />
          </View>

          <View style={separatorStyle} style={{ marginTop: 0 }}>

            <FloatingLabelInput
              editable={!this.state.isViewOnly}
              label={PAN_GST_CONST.LABEL_NAME}
              containerStyles={inputStyle}
              value={this.state.panName.value}
              onChangeText={(value) => {
                const validName = this.state.isPANSelected || !this.state.isPANSelected
                  ? NAME_REGEX.test(value)
                  : true;
                this.setState({
                  isPANVerified: false,
                  panName: {
                    ...this.state.panName,
                    value: value,
                    isValid: value === '' ? true : validName,
                  },
                });
              }}
              customLabelStyles={{
                colorFocused: colors.COLOR_LIGHT_GREY,
                colorBlurred: colors.COLOR_LIGHT_GREY,
                fontSizeFocused: 15,
                fontSizeBlurred: 15,
              }}
              inputStyles={inputTextStyle}
            />
          </View>
          <View
            style={[
              separatorStyle,
            ]}
          />
          {/* //mj */}
          {!this.state.panName.isValid && (
            <Text style={errorLabel}>
              {this.state.panName.value != ''
                ? this.state.isPANSelected ? PAN_GST_CONST.IVALID_PAN_NAME : PAN_GST_CONST.IVALID_Form_NAME
                : this.state.isPANSelected ? PAN_GST_CONST.MANDATORY_PAN_NAME : PAN_GST_CONST.MANDATORY_Form_NAME}
            </Text>
          )}
        </View>
        
        {this.state.selectedOccupation == 'Salaried' &&
          <View style={{ marginTop: 26 }}>
            <Text style={[textStyle, { marginBottom: -4, marginLeft: 5 }]}>
              {PAN_GST_CONST.PLACEHOLDER_GENDER}
            </Text>
            <DropDownPicker
              disabled={this.state.isViewOnly}
              items={this.state.dropDownGender}
              placeholder={''}
              controller={instance => this.controller = instance}
              containerStyle={{ flex: 1 }}
              style={{ backgroundColor: '#ffffff', borderWidth: 0 }}
              itemStyle={{
                justifyContent: 'flex-start',
                marginLeft: 4,
              }}
              defaultValue={this.state.selectedGender.value}
              dropDownStyle={{ backgroundColor: '#ffffff' }}
              onChangeItem={(item) => {
                this.setState({
                  selectedGender: {
                    value: item.value || null,
                    label: item.label || null,
                    isValid: true
                  },
                });

              }}
              customArrowUp={() => <Image source={UP_ARROW} />}
              customArrowDown={() => <Image source={DOWN_ARROW} />}
              labelStyle={textStyle}
              selectedLabelStyle={[textStyle, { color: colors.COLOR_BLACK }]}
            />
            <View style={[separatorStyle, { marginTop: -4 }]} />
            {!this.state.selectedGender.isValid && (
              <Text style={errorLabel}>{PAN_GST_CONST.MANDATORY_GENDER}</Text>
            )}
          </View>
        }
        {this.state.selectedOccupation == 'Self-Employed' && this.state.isPANSelected && this.state.gstEnableSelfEmployed &&
          <View style={{ marginTop: 26 }}>
            <Text style={[textStyle, { marginBottom: -4, marginLeft: 5 }]}>
              GST*
            </Text>
            <DropDownPicker
              disabled={this.state.isViewOnly}
              items={this.state.dropDownGST}
              placeholder={''}
              controller={instance => this.controller = instance}
              containerStyle={{ flex: 1 }}
              style={{ backgroundColor: '#ffffff', borderWidth: 0 }}
              itemStyle={{
                justifyContent: 'flex-start',
                marginLeft: 4,
              }}
              defaultValue={this.state.selectedGSTDrop.value}
              dropDownStyle={{ backgroundColor: '#ffffff' }}
              onChangeItem={(item) => {
                this.setState({
                  isDataSaved: false,
                  selectedGSTDrop: {
                    value: item.value || null,
                    label: item.label || null,
                    isValid: true
                  },
                });

              }}
              customArrowUp={() => <Image source={UP_ARROW} />}
              customArrowDown={() => <Image source={DOWN_ARROW} />}
              labelStyle={textStyle}
              selectedLabelStyle={[textStyle, { color: colors.COLOR_BLACK }]}
            />
            <View style={[separatorStyle, { marginTop: -4 }]} />
            {!this.state.selectedGSTDrop.isValid && (
              <Text style={errorLabel}>GST is mandatory</Text>
            )}
          </View>
        }

        {
          this.state.isPANVerified &&
          <View style={buttonContainer}>
            {this.state.isPANSelected && (
              <View style={[flexRowStyle, { justifyContent: 'center' }]}>

                <View
                  style={
                    this.state.isPANVerified ? { width: '60%' } : { width: '63%' }
                  }>
                  <Button
                    isDisabled={this.state.isPANVerified || this.state.isViewOnly}
                    title={PAN_GST_CONST.BUTTON_TITLE_VERIFY}
                    onPress={() => {
                      if (this.state.panImageURI === '') {
                        handleError(PAN_GST_CONST.DOC_VALIDATION);
                      }
                      if (
                        this.state.selectedGender.value === '' ||
                        this.state.selectedGender.value === null
                      ) {
                        this.setState({
                          selectedGender: {
                            isValid: false
                          },
                        });
                      }
                      if (
                        this.state.panName.value === '' ||
                        !this.state.panName.isValid
                      ) {
                        this.setState({
                          panName: {
                            ...this.state.panName,
                            isValid: false,
                          },
                        });
                      }
                      if (this.state.dateOfIncorporationText === '') {
                        this.setState({ invalidDate: true });
                      }


                      else {
                        const dataToAPI = {
                          panNumber: this.state.panNumber.value.toUpperCase(),
                          dateOfBirth: `${this.formatDateToSlash(
                            this.state.dateOfIncorporationText,
                          )}`,
                          panName: this.state.panName.value,
                          leadCode: this.state.leadCodeFromProps,
                          customerType: this.state.selectedEntity,
                          applicantUniqueId:
                            this.state.isguarantor || this.state.iscoapplicant
                              ? this.state.coapplicantUniqueId
                              : this.state.applicantUniqueId,

                        };

                        this.props.verifyPANAPI({
                          dataToAPI,
                          callback: (response) => {
                            if (!response.error) {
                              this.setState({ isPANVerified: true, });
                            }
                          },
                          errorcallback: () => {

                            this.setState({ saveEnable: true })
                          },
                        });
                        if (this.state.selectedOccupation == 'Self-Employed') {
                          const dataToAPI = {
                            panNumber: this.state.panNumber.value.toUpperCase()
                          }
                          this.props.gstWrapperAPI({
                            dataToAPI,
                            callback: (response) => {
                            }
                          })
                        }
                      }

                    }}
                  />
                </View>

                {this.state.isPANVerified && (
                  <View
                    style={[
                      flexRowStyle,
                      { alignSelf: 'center', marginLeft: 20 },
                    ]}>
                    <Image
                      source={VERIFIED_TICK}
                      resizeMode="contain"
                      style={verifiedTickImageStyle}
                    />
                    <Text style={verifiedTextStyle}>
                      {PAN_GST_CONST.TEXT_VERIFIED}
                    </Text>
                  </View>
                )}
              </View>
            )}
          </View>
        }

      </View >
    );
  }

  selectEntityType(entityType) {
    this.setState({
      selectedEntity: entityType,
      invalidDateMessage:
        entityType === 'individual'
          ? PAN_GST_CONST.MADATORY_DATE_OF_BIRTH
          : PAN_GST_CONST.MADATORY_DATE_OF_INCORPORATION,
      selectedOccupation: '',
      panName: {
        value: '',
        isValid: true,
      },
      invalidDate: false,
      panNumber: {
        value: '',
        isValid: true,
      },
      panImageURI: '',
      dateOfIncorporationText: '',
      dateOfIncorporation: "",
      isPANVerified: false,
    });
  }


  renderPANForm60Options() {
    const {
      flexRowStyle,
      radioButtonContainer,
      marginTop5,
    } = PANAndGSTVerificationStyles;

    return (
      <View style={flexRowStyle}>
        <View style={[radioButtonContainer, { marginTop: 10 }]}>
          <RadioButton
            title={PAN_GST_CONST.OPTION_PAN}
            isSelected={this.state.isPANSelected}
            onPress={() => {

              if (!this.state.isViewOnly) {
                this.controller.reset();
                const dataToAPI = {
                  leadCode: this.state.leadCodeFromProps,
                  applicantUniqueId:
                    this.state.isguarantor || this.state.iscoapplicant
                      ? this.state.coapplicantUniqueId
                      : this.state.applicantUniqueId,
                };

                this.state.dateOfIncorporationText !== '' || this.state.panName.value !== "" || this.state.selectedGender.value !== null ?
                  (handleWarning('Form 60 data will reset'),
                    this.props.deletePANAPI({
                      dataToAPI,
                      callback: (response) => {

                      }
                    }))
                  : null
                this.setState({
                  isPANSelected: true,
                  dropDownGST: [],
                  saveEnable: false,
                  gstEnableSelfEmployed: false,
                  selectedGSTDrop: {
                    value: null,
                    label: '',
                    isValid: true
                  },
                  panImageURI: '',
                  panName: {
                    value: '',
                    isValid: true,
                  },
                  dateOfIncorporation: "",
                  dateOfIncorporationText: '',
                  invalidDateMessage: this.state.invalidDateMessage,
                  invalidDate: false,
                  isDataSaved: false,
                  panNumber: {
                    value: '',
                    isValid: true,
                  },
                  selectedGender: {
                    value: null,
                    label: '',
                    isValid: true
                  },
                });
              }
            }}
          />
        </View>
        {/* <View style={marginTop5}>
          <RadioButton
            title={PAN_GST_CONST.OPTION_FORM_60}
            isSelected={!this.state.isPANSelected}
            onPress={() => {
              if (!this.state.isViewOnly) {
                this.controller.reset();
                const dataToAPI = {
                  leadCode: this.state.leadCodeFromProps,
                  applicantUniqueId:
                    this.state.isguarantor || this.state.iscoapplicant
                      ? this.state.coapplicantUniqueId
                      : this.state.applicantUniqueId,
                };

                this.state.panNumber.value !== '' || this.state.dateOfIncorporationText !== '' || this.state.panName.value !== "" || this.state.selectedGender.value !== null ?
                  (handleWarning('Pan data will reset'),
                    this.props.deletePANAPI({
                      dataToAPI,
                      callback: (response) => {

                      }
                    })) : null
                this.setState({
                  isPANSelected: false,
                  dropDownGST: [],
                  saveEnable: false,
                  gstEnableSelfEmployed: false,
                  selectedGSTDrop: {
                    value: null,
                    label: '',
                    isValid: true
                  },
                  panName: {
                    value: "",
                    isValid: true,
                  },
                  dateOfIncorporation: "",
                  dateOfIncorporationText: '',
                  invalidDateMessage: this.state.invalidDateMessage,
                  isPANVerified: false,
                  invalidDate: false,
                  isDataSaved: false,
                  panNumber: {
                    value: '',
                    isValid: true,
                  },
                  panImageURI: '',
                  selectedGender: {
                    value: null,
                    label: '',
                    isValid: true
                  },
                });
              }
            }}
          />
        </View> */}
      </View>
    );
  }



  getSaveDisable() {
    if (this.state.selectedOccupation == 'Salarmied' && !this.state.isPANSelected) {
      if (
        !this.state.isPANSelected &&
        (this.state.panName.value === '' ||
          !this.state.panName.isValid) ||
        this.state.dateOfIncorporationText === '' ||
        this.state.selectedGender.value === '' ||
        this.state.selectedGender.value === null ) {
        return true;
      }
      if (this.state.panImageURI === '') {
        handleError(PAN_GST_CONST.DOC_VALIDATION);
        return true
      }
    }

    if (this.state.selectedOccupation == 'Self-Employed' && !this.state.isPANSelected) {
      if (!this.state.isPANSelected &&
        (this.state.panName.value === '' ||
          !this.state.panName.isValid) ||
        this.state.dateOfIncorporationText === '') {
        return true;
      }
      if (this.state.panImageURI === '') {
        handleError(PAN_GST_CONST.DOC_VALIDATION);
        return true
      }

    }

    if (this.state.selectedOccupation == 'Salaried' && this.state.isPANSelected) {
      if (!this.state.panNumber.isValid) {
        return true
      }
      if (!this.state.isPANSelected && !this.state.isForm60Success) {
        return true;
      }
      if (
        !this.state.isPANSelected &&
        (this.state.panName.value === '' ||
          !this.state.panName.isValid) ||
        this.state.dateOfIncorporationText === '' ||
        this.state.selectedGender.value === '' ||
        this.state.selectedGender.value === null) {
        return true;
      }
    }
    if (this.state.selectedOccupation == 'Self-Employed' && this.state.isPANSelected && this.state.panNumber.isValid) {
      if (!this.state.isPANSelected && !this.state.isForm60Success) {

        return true;
      }

      // if (!this.state.isPANSelected &&
      //   (this.state.panName.value === '' ||
      //     !this.state.panName.isValid) ||
      //   this.state.dateOfIncorporationText === '') {

      //   return true;
      // }
      if (this.state.gstEnableSelfEmployed || this.state.saveEnable) {
        if (this.state.dropDownGST.length > 0
          && (this.state.selectedGSTDrop.value == ''
            || this.state.selectedGSTDrop.value == null)) {

          return true
        }

      } else {
        return false
      }
    }
    return false;
  }

  render() {

    const {
      mainContainer,
      flexRowStyle,
      lableStyle,
      panGSTLabel,
      radioButtonContainer,
      leftRightPadding,
      cancelButtonStyle,
      panGSTSeparator1,
      buttonContainer,
      panGSTSeparator,
    } = PANAndGSTVerificationStyles;

    return (
      <WaveBackground>
        <StatusBar
          backgroundColor={colors.COLOR_WHITE}
          barStyle={'dark-content'}
          translucent={false}
          hidden={false}
        />
        <Header
          label={PAN_GST_CONST.HEADER}
          showLeftIcon={false}
          customTextStyle={{ marginLeft: 32 }}
          onPress={() => {
          }}
        />
        <View style={{ alignContent: 'center', zIndex: 1 }}>
          <View style={{}}>
            <DottedProgressBar totalSteps={this.state.iscoapplicant || this.state.isguarantor ? [1, 2, 3] : this.state.selectedOccupation == 'Self-Employed' ? [1, 2, 3, 4, 5] : [1, 2, 3, 4, 5, 6]} currentIndex={1} />
          </View>
        </View>

        <View style={mainContainer}>
          <Text style={panGSTLabel}>{PAN_GST_CONST.PAN_GST_LABEL}</Text>
        </View>
        <ScrollView>
          <View style={leftRightPadding} >
            <Text style={lableStyle}>{PAN_GST_CONST.ENTITY_TYPE}</Text>
            <View style={flexRowStyle}>
              <View style={radioButtonContainer}>
                <RadioButton
                  title={PAN_GST_CONST.PAN_INDIVIDUAL}
                  isSelected={
                    this.state.selectedEntity.toLowerCase() === 'individual'
                  }
                  onPress={() => {
                    if (!this.state.isViewOnly) {
                      this.selectEntityType(PAN_GST_CONST.PAN_INDIVIDUAL)
                    }
                  }

                  }
                />
              </View>
            </View>
            {this.state.selectedEntity.toLowerCase() === 'individual' && (
              <View >
                <Text style={lableStyle}>{PAN_GST_CONST.OCCUPATION_TYPE}</Text>
                <View style={flexRowStyle}>
                  <View  style={[radioButtonContainer, { flexDirection: 'row', }]}>
                    {this.state.sourceType.map((value, index) => (
                      <RadioButton
                        title={value.title}
                        
                        isSelected={
                          this.state.selectedOccupation.toLowerCase() ===
                            value.title.toLowerCase()
                            ? true
                            : false
                        }
                        onPress={() => {
                          if (!this.state.isViewOnly) {
                            this.controller.reset();
                            const dataToAPI = {
                              leadCode: this.state.leadCodeFromProps,
                              applicantUniqueId:
                                this.state.isguarantor || this.state.iscoapplicant
                                  ? this.state.coapplicantUniqueId
                                  : this.state.applicantUniqueId,
                            };

                            this.state.panNumber.value !== '' || this.state.dateOfIncorporationText !== '' || this.state.panName.value !== "" || this.state.selectedGender.value !== null || this.state.selectedGSTDrop.value ?
                              (handleWarning(this.state.selectedOccupation == 'Self-Employed' ? 'Self-Employed data will get reset' : 'Salaried Data will get reset'),
                                this.props.deletePANAPI({
                                  dataToAPI,
                                  callback: (response) => {

                                  }
                                })) : null
                            this.setState({
                              isPANSelected: true,
                              gstEnableSelfEmployed: false,
                              saveEnable: false,
                              dropDownGST: [],
                              selectedGSTDrop: {
                                value: null,
                                label: '',
                                isValid: true
                              },
                              panName: {
                                value: "",
                                isValid: true,
                              },
                              dateOfIncorporation: "",
                              dateOfIncorporationText: '',
                              invalidDateMessage: this.state.invalidDateMessage,
                              isPANVerified: false,
                              invalidDate: false,
                              isDataSaved: false,
                              panNumber: {
                                value: '',
                                isValid: true,
                              },
                              panImageURI: '',
                              selectedGender: {
                                value: null,
                                label: '',
                                isValid: true
                              },
                            });

                            return this.selectRadioButton(value, index);

                          }
                        }

                        }
                      />
                    ))}

                  </View>
                </View>
              </View>
            )}

            {this.state.selectedOccupation == 'Self-Employed' &&
              this.renderDropDownENTITIY()}
            <View style={this.state.selectedOccupation == 'Self-Employed' ? panGSTSeparator : panGSTSeparator1} />
            {((this.state.selectedEntity.toLowerCase() === 'individual' &&
              this.state.selectedOccupation.toLowerCase() === 'self-employeed') ||
              this.state.selectedEntity.toLowerCase() === 'non individual') &&
              this.renderDropDown()}
            {this.renderPANForm60Options()}
            {this.renderPANDetails()}

            <View
              style={[
                flexRowStyle,
                buttonContainer,
                {
                  marginTop: 30,
                  marginBottom: 20,
                  width: '100%',
                  justifyContent: 'center',
                },
              ]}>
              {this.state.isPANSelected ? this.state.isPANVerified ?
                <Button
                  title={PAN_GST_CONST.BUTTON_TITLE_RESET}
                  onPress={() => {
                    if (!this.state.isViewOnly) {
                      this.controller.reset();
                      const dataToAPI = {
                        leadCode: this.state.leadCodeFromProps,
                        applicantUniqueId:
                          this.state.isguarantor || this.state.iscoapplicant
                            ? this.state.coapplicantUniqueId
                            : this.state.applicantUniqueId,
                      };

                      this.props.deletePANAPI({
                        dataToAPI,
                        callback: (response) => {

                        }
                      })
                      this.setState({
                        panName: {
                          value: '',
                          isValid: true,
                        },
                        dropDownGST: [],
                        saveEnable: false,
                        gstEnableSelfEmployed: false,
                        selectedGSTDrop: {
                          value: null,
                          label: '',
                          isValid: true
                        },
                        cancelButtonTitle: 'Cancel',
                        dateOfIncorporation: "",
                        dateOfIncorporationText: '',
                        invalidDate: false,
                        panNumber: {
                          value: '',
                          isValid: true,
                        },
                        panImageURI: '',
                        isPANVerified: false,
                        isPANSelected: true,
                        isDataSaved: false,
                        selectedGender: {
                          value: null,
                          label: '',
                          isValid: true
                        },
                        invalidDate: false
                      });
                    }
                    else {
                      handleWarning("User access denied")
                    }
                  }}
                />
                :
                <View style={{ marginRight: 5, flex: 1 }}>
                  <Button
                    isDisabled={this.state.isPANSelected ? this.state.isPANVerified : true}
                    title={PAN_GST_CONST.BUTTON_TITLE_VERIFY}
                    onPress={() => {

                      if (!this.state.isViewOnly) {
                        if (this.state.panImageURI === '') {
                          handleError(PAN_GST_CONST.DOC_VALIDATION);
                        }
                        else if (this.state.panImageURI !== '' &&
                          (this.state.isPANSelected &&
                            this.state.panNumber.value === '' ||
                            // this.state.isPANSelected === 'pan' &&
                            !this.state.panNumber.isValid)
                        ) {

                          this.isPan(this.state.panNumber.value)
                        }

                        else if (this.state.panImageURI !== '' &&
                          (this.state.panName.value === '' ||
                            !this.state.panName.isValid)
                        ) {

                          this.setState({
                            panName: {
                              ...this.state.panName,
                              isValid: false,
                            },
                          });
                        }
                        else if (this.state.panImageURI !== '' && (this.state.dateOfIncorporationText === '' ||
                          this.state.dateOfIncorporationText === null)) {
                          this.setState({ invalidDate: true });
                        }

                        else {
                          if (this.state.panNumber.isValid == true) {
                            const dataToAPI = {
                              panNumber: this.state.panNumber.value.toUpperCase(),
                              dateOfBirth: `${this.formatDateToSlash(
                                this.state.dateOfIncorporationText,
                              )}`,
                              panName: this.state.panName.value,
                              leadCode: this.state.leadCodeFromProps,
                              customerType: this.state.selectedEntity.toLowerCase(),
                              applicantUniqueId:
                                this.state.isguarantor || this.state.iscoapplicant
                                  ? this.state.coapplicantUniqueId
                                  : this.state.applicantUniqueId,

                            };

                            this.props.verifyPANAPI({
                              dataToAPI,
                              callback: (response) => {
                                this.getSaveDisable()
                                if (!response.error) {
                                  this.setState({ isPANVerified: true, saveEnable: true });
                                }
                              },
                              errorcallback: () => {
                                this.setState({ saveEnable: true })
                              },
                            });
                            if (this.state.selectedOccupation == 'Self-Employed') {
                              const dataToAPI = {
                                panNumber: this.state.panNumber.value.toUpperCase()
                              }
                              // this.props.gstWrapperAPI({
                              //   dataToAPI,
                              //   callback: (response) => {
                              //     if (response?.data.length > 0) {


                              //       const responseGST = response.data.map((value) => ({
                              //         value: value.gstinId,
                              //         label: value.gstinId,

                              //       }));
                              //       this.setState({ dropDownGST: responseGST || [], gstEnableSelfEmployed: true, selectedGSTDrop: { isValid: false } });
                              //     }
                              //   }
                              // })
                            }
                          }

                        }
                      }

                      else {
                        handleWarning("User access denied")
                      }

                    }}
                  />
                </View>
                : null
              }

              <View style={{ marginLeft: 5, width: '50%' }}>
                <Button
                  isDisabled={this.getSaveDisable() || this.state.isViewOnly}
                  //isDisabled={true}
                  title={PAN_GST_CONST.BUTTON_TITLE_SAVE}
                  onPress={() => {
                    this.isselectedGST()
                    if (this.state.selectedOccupation == 'Salaried') {
                      this.isselectedGender();
                      if (this.state.panImageURI !== '' &&
                        this.state.selectedGender.value != '' &&
                        this.state.selectedGender.value != null &&
                        !(moment(this.state.dateOfIncorporationText, ["MM-DD-YYYY", "DD-MM-YYYY", "YYYY-MM-DD", "DD/MM/YYYY", "YYYY/MM/DD", "MM/DD/YYYY"]) >
                          moment().clone().subtract(18, 'years'))
                      ) {
                        const dataToAPI = {

                          occupationType: this.state.selectedOccupation.toLowerCase(),
                          documentType: this.state.isPANSelected ? 'pan' : 'form60',
                          panNumber: this.state.panNumber.value.toUpperCase(),
                          dateOfBirth: moment(
                             this.state.dateOfIncorporationText,
                          ).format('DD/MM/YYYY'),
                          panName: this.state.panName.value,
                          leadCode: this.state.leadCodeFromProps,
                          customerType: this.state.selectedEntity.toLowerCase(),
                          applicantUniqueId:
                            this.state.isguarantor || this.state.iscoapplicant
                              ? this.state.coapplicantUniqueId
                              : this.state.applicantUniqueId,
                          ismainapplicant: this.state.iscoapplicant || this.state.isguarantor ? false : true,
                          isguarantor: this.state.isguarantor,
                          id: this.state.idToEdit,
                          gender: this.state.selectedGender.value,
                        };
                        this.props.savePANAPI({
                          dataToAPI,
                          callback: (response) => {
                            if (response && !response.error) {
                              // this.setState({ isDataSaved: true, cancelButtonTitle: 'Loan Summary' });

                              this.props.createUpdateCUSTOMER({
                                data: {
                                  applicant_uniqueid: this.state.isguarantor || this.state.iscoapplicant ? this.state.coapplicantUniqueId : this.state.applicantUniqueId,
                                  ismainapplicant: this.state.ismainapplicant,
                                  isguarantor: this.state.isguarantor,
                                  type: "age"
                                },
                                callback: (response) => {
                                  // this.componentDidMount()
                                  if (response.data.error) {
        
                                    this.setState({ isViewOnly: true })
                                  }
                                  else{
                                    this.setState({ isDataSaved: true, cancelButtonTitle: 'Loan Summary' });
                                  }
                                }
                              });

                            
                            }
                          },
                        });
                      }
                    } else if (this.state.selectedOccupation == 'Self-Employed') {
                      if (this.state.isPANSelected ? this.state.panImageURI !== '' && this.state.panName !== '' && this.state.panNumber.isValid : this.state.panImageURI !== '' && this.state.panName !== '') {
                        this.isselectedGST()
                        const dataToAPI = {
                          // "gstNumber": "12345678",
                          occupationType: this.state.selectedOccupation.toLowerCase().replace('-', ''),
                          documentType: this.state.isPANSelected ? 'pan' : 'form60',
                          panNumber: this.state.panNumber.value.toUpperCase(),
                          dateOfBirth: moment(
                            this.state.dateOfIncorporationText,
                          ).format('DD/MM/YYYY'),
                          panName: this.state.panName.value,
                          leadCode: this.state.leadCodeFromProps,
                          customerType: this.state.selectedEntity.toLowerCase(),
                          applicantUniqueId:
                            this.state.isguarantor || this.state.iscoapplicant
                              ? this.state.coapplicantUniqueId
                              : this.state.applicantUniqueId,
                          ismainapplicant: this.state.iscoapplicant || this.state.isguarantor ? false : true,
                          isguarantor: this.state.isguarantor,
                          id: this.state.idToEdit,
                          entity: this.state.selectedEntityDrop.value,
                          gst: this.state.selectedGSTDrop.value,
                        };
                        this.props.savePANAPI({
                          dataToAPI,
                          callback: (response) => {
                            if (response && !response.error) {
                              // this.setState({ isDataSaved: true, cancelButtonTitle: 'Loan Summary' });

                              this.props.createUpdateCUSTOMER({
                                data: {
                                  applicant_uniqueid: this.state.isguarantor || this.state.iscoapplicant ? this.state.coapplicantUniqueId : this.state.applicantUniqueId,
                                  ismainapplicant: this.state.ismainapplicant,
                                  isguarantor: this.state.isguarantor,
                                  type: "age"
                                },
                                callback: (response) => {
                                  // this.componentDidMount()
                                  if (response.data.error) {
        
                                    this.setState({ isViewOnly: true })
                                  }
                                  else{
                                    this.setState({ isDataSaved: true, cancelButtonTitle: 'Loan Summary' });
                                  }
                                }
                              });                      
                                  }
                          },
                        });
                      }
                    }
                    
                  }}
                />
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                marginBottom: 20,
                alignSelf: 'center',
              }}>
              <View style={{ marginRight: 5, flex: 1 }}>
                <Button title={this.state.cancelButtonTitle}
                  onPress={() => {
                    if (this.state.cancelButtonTitle.toLowerCase() === "cancel") {
                      this.props.navigation.navigate("LeadList")
                    } if (this.state.cancelButtonTitle.toLowerCase() === "loan summary") {
                      this.props.navigation.navigate("LoanSummary", {
                        leadName: this.state.leadName,
                        applicantUniqueId: this.state.applicantUniqueId,
                        leadCode: this.state.leadCodeFromProps,
                        mobileNumber: this.state.mobileNumberFromProps,
                        coapplicantUniqueId: this.state.coapplicantUniqueId,
                        ismainapplicant: this.state.ismainapplicant,
                        iscoapplicant: this.state.iscoapplicant,
                        isguarantor: this.state.isguarantor,
                      })
                    }
                  }} />
              </View>
              <View style={{ marginLeft: 5, flex: 1 }}>

                <Button
                  title={PAN_GST_CONST.BUTTON_NEXT}
                  isDisabled={
                    // this.state.iscoapplicant == true || this.state.isguarantor == true ? false :
                    this.state.selectedOccupation == 'Self-Employed' && this.state.isPANSelected && this.state.gstEnableSelfEmployed && !this.state.selectedGSTDrop.isValid ? true : 
                    this.state.selectedOccupation == 'Salaried' &&  (this.state.selectedGender.value == null ) ? true  :
                    this.state.isDataSaved == false ? true :
                    this.state.isPANSelected ? this.state.isPANVerified ? false : true 

                       :false
                      }
                  onPress={() => {
                    this.props.navigation.navigate('AdditionalDetails', {
                      leadName:  this.state.leadName,
                      applicantUniqueId: this.state.applicantUniqueId,
                      leadCode: this.state.leadCodeFromProps,
                      mobileNumber: this.state.mobileNumberFromProps,
                      coapplicantUniqueId: this.state.coapplicantUniqueId,
                      ismainapplicant: this.state.ismainapplicant,
                      iscoapplicant: this.state.iscoapplicant,
                      isguarantor: this.state.isguarantor,
                    });
                  }}
                />
              </View>
            </View>
          </View>
        </ScrollView>
      </WaveBackground>
    );
  }
}

/**
 * propTypes declaration
 */
PANAndGSTVerification.propTypes = {
  getEntityList: PropTypes.func,
  uploadPANWrapperAPI: PropTypes.func,
  userPANDataSelector: PropTypes.object,
  verifyPANAPI: PropTypes.func,
  savePANAPI: PropTypes.func,
};

export default compose(
  container,
  withProps((getEntityList) => getEntityList),
)(PANAndGSTVerification);