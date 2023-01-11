import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  StatusBar,
  Keyboard,
} from 'react-native';
import PropTypes from 'prop-types';
import {Icon, Tooltip} from 'react-native-elements';
import {compose, withProps} from 'recompose';
import container from '../../container/BusinessDetails/index';
import {Header} from '../../components/Header/Header';
import {WaveBackground} from '../../components/WaveBackground/WaveBackground';
import {Button} from '../../components/Button/Button';
import {
  BUSINESSDETAILS_CONST,
  PAN_GST_CONST,
} from '../../constants/screenConst';
import {BusinessDetailsStyles} from './BusinessDetailsStyles';
import DropDownPicker from 'react-native-dropdown-picker';
import {handleWarning, handleError} from '../../../utils';
import {DOWN_ARROW, UP_ARROW, VERIFIED_TICK} from '../../constants/imgConsts';
import {FloatingLabelInput} from 'react-native-floating-label-input';
import {DottedProgressBar} from '../../components/DottedProgressBar/DottedProgressBar';
import * as colors from '../../constants/colors';
import CheckBox from '@react-native-community/checkbox';
import formatAmount from 'indian-currency-formatter';
import PersonalDetailsStyles from '../PersonalDetails/style';
import ImagePicker from 'react-native-image-crop-picker';
import ImageResizer from 'react-native-image-resizer';
import {zipFileUploadSelfie} from '../../../uploadImageUtils';
import {baseURL, uatURL} from '../../../baseURL';

import {
  getQDEDataAPI,
  createUpdateCUSTOMER,
} from '../../container/Personal Details';

class BusinessDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filePath: null,
      ifscCode: {
        isValid: true,
        value: null,
      },
      bankName: {
        isValid: true,
        value: null,
      },
      accountNumber: {
        value: '',
        isValid: true,
      },
      netWorth: {
        value: '',
        isValid: true,
      },
      selectedSectorItem: {
        value: null,
        sector_code: null,
        label: null,
        isValid: true,
      },
      selectedSegmentItem: {
        value: null,
        label: null,
        isValid: true,
      },
      selectedAccountType: {
        value: null,
        label: null,
        isValid: true,
      },
      selectedIndustryItem: {
        value: null,
        label: null,
        isValid: true,
      },
      selectedSubIndustry: {
        value: null,
        label: null,
        isValid: true,
      },
      dropDownItemSector: [],
      ismainapplicant: true,
      isguarantor: false,
      dropDownItemIndustry: [],
      dropDownItemSubIndustry: [],
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
        isValid: true,
      },
      dropdownMaritalStatus: [
        {
          value: 'Single',
          label: 'Single',
        },
        {
          value: 'Married',
          label: 'Married',
        },
      ],
      SelectedMaritalStatus: {
        value: null,
        label: '',
        isValid: true,
      },
      dropDownItemSegment: [],
      dropDownItemAccountType: [
        {
          value: 'Savings',
          label: 'Savings',
        },
        {
          value: 'Current',
          label: 'Current',
        },
      ],
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
      iscoapplicant: this.props.navigation.state.params.iscoapplicant || false,
      isguarantor: this.props.navigation.state.params.isguarantor || false,
      coapplicantUniqueId:
        this.props.navigation.state.params.coapplicantUniqueId || '',
      isViewOnly: false,
      accountHolderName: '',
      iDToSave: null,
      isDataSaved: false,
      isSelected: false,
      isVerified: false,
      FatherName: {
        isValid: true,
        value: null,
      },
      SpouseName: {
        isValid: true,
        value: null,
      },
    };
  }
  setcin(text) {
    this.setState({
      cin: {
        ...this.state.cin,
        value: text,
      },
    });
  }
  isIFSCCode() {
    let valid = false;
    const ifscCode = /^[A-Za-z]{4}0[A-Za-z0-9]{6}$/;
    if (
      this.state.ifscCode?.value != '' &&
      this.state.ifscCode?.value != null &&
      ifscCode.test(this.state.ifscCode?.value)
    ) {
      valid = true;
    }
    this.setState({
      ifscCode: {
        ...this.state.ifscCode,
        isValid: valid,
      },
    });
  }

  redirect = async () => {
    // const QDEData = await getQDEDataAPI({
    //   applicant_uniqueid: this.state.iscoapplicant || this.state.isguarantor ? this.state.coapplicantUniqueId : this.state.applicantUniqueId,
    //   ismainapplicant: this.state.ismainapplicant,
    //   isguarantor: this.state.isguarantor,
    //   token,
    //   dispatch
    // });

    if (this.state.iscoapplicant || this.state.isguarantor) {
      const dataToAPI = {
        applicant_uniqueid: this.state.coapplicantUniqueId,
        ismainapplicant: this.state.ismainapplicant,
        isguarantor: this.state.isguarantor,
      };
      this.props.createCustomer({
        dataToAPI,
        callback: (response) => {
          if (
            response &&
            response.data &&
            response.data.BRE &&
            response.data.BRE.toLowerCase() === 'System Rejected'
          ) {
            this.props.navigation.navigate('LoanSummary', {
              leadCode: this.state.leadCode,
              mobileNumber: '',
              leadName: this.state.leadName,
              applicantUniqueId:
                this.state.iscoapplicant || this.state.isguarantor
                  ? this.state.coapplicantUniqueId
                  : this.state.applicantUniqueId,
            });
          } else {
            const dataForgetQDE = {
              applicant_uniqueid:
                this.state.iscoapplicant || this.state.isguarantor
                  ? this.state.coapplicantUniqueId
                  : this.state.applicantUniqueId,
              ismainapplicant: this.state.ismainapplicant,
              isguarantor: this.state.isguarantor,
            };
            this.props.getQDEData({
              dataForgetQDE,
              callback: (response) => {
                if (
                  response &&
                  response.scheme &&
                  response.scheme.scheme === 'Income Proof'
                ) {
                  this.props.navigation.navigate('BankDetails', {
                    ...this.props.navigation.state.params,
                  });
                } else {
                  this.props.navigation.navigate('QdeSuccess', {
                    leadName: this.state.leadName,
                    cif: response.cif,
                    leadCode: this.state.leadCode,
                    applicantUniqueId: this.state.applicantUniqueId,
                    iscoapplicant: this.state.iscoapplicant,
                    isguarantor: this.state.isguarantor,
                    coapplicantUniqueId: this.state.coapplicantUniqueId,
                    redirection: 'qde',
                    offerType: 'tentative',
                  });
                }
              },
            });
          }
        },
      });
    } else {
      // this.props.navigation.navigate('References', {
      //     ...this.props.navigation.state.params
      // });
      this.props.navigation.navigate('LoanDetails', {
        leadCode: this.state.leadCode,
        leadName: this.state.leadName,
        applicantUniqueId: this.state.applicantUniqueId,
        iscoapplicant: this.state.iscoapplicant,
        isguarantor: this.state.isguarantor,
        coapplicantUniqueId: this.state.coapplicantUniqueId,
      });
    }
  };

  isAccountNumber() {
    let valid = false;
    const turnoverRegex = /^[0-9\b]+$/;
    if (
      this.state.accountNumber?.value != '' &&
      this.state.accountNumber?.value != null &&
      turnoverRegex.test(this.state.accountNumber?.value)
    ) {
      valid = true;
    }
    this.setState({
      accountNumber: {
        ...this.state.accountNumber,
        isValid: valid,
      },
    });
  }

  isNetWorth() {
    let valid = false;
    const networthRegex = /\b\d[\d,]*\b/;
    if (
      this.state.netWorth?.value != '' &&
      this.state.netWorth?.value != null &&
      networthRegex.test(this.state.netWorth?.value)
    ) {
      valid = true;
    }
    this.setState({
      netWorth: {
        ...this.state.netWorth,
        isValid: valid,
      },
    });
  }

  isSelectedSectorItem() {
    if (this.state.selectedSectorItem.value == null) {
      this.setState({selectedSectorItem: {isValid: false}});
    }
  }
  isSelectedAccountItem() {
    if (this.state.selectedAccountType.value == null) {
      this.setState({selectedAccountType: {isValid: false}});
    }
  }
  isSelectedIndustryItem() {
    if (this.state.selectedIndustryItem.value == null) {
      this.setState({selectedIndustryItem: {isValid: false}});
    }
  }
  isSelectedGender() {
    if (this.state.selectedGender.value == null) {
      this.setState({selectedGender: {isValid: false}});
    }
  }
  isSelectedMaritalStatus() {
    if (this.state.SelectedMaritalStatus.value == null) {
      this.setState({SelectedMaritalStatus: {isValid: false}});
    }else{
      this.isSelectedFatherorSpouse();

    }
  }
  isSelectedFatherorSpouse(){
    if (this.state.FatherName.value == null) {
      this.setState({FatherName: {isValid: false}});
    }
    if (this.state.SpouseName.value == null) {
      this.setState({SpouseName: {isValid: false}});
    }

  }

  isSelectedSegmentItem() {
    if (this.state.selectedSegmentItem.value == null) {
      this.setState({selectedSegmentItem: {isValid: false}});
    }
  }

  isSelectedSubIndustry() {
    if (this.state.selectedSubIndustry.value == null) {
      this.setState({selectedSubIndustry: {isValid: false}});
    }
  }

  componentDidMount() {
    this.props.businessSECTOR({
      callback: (response) => {
        const tempSectorArray = [];
        for (const sector of response.data) {
          tempSectorArray.push({
            label: sector.sectorName,
            value: sector.sectorName,
            id: sector.sector_id,
            sector_code: sector.sector_code,
          });
        }
        this.setState({
          dropDownItemSector: [...tempSectorArray] || [],
        });
      },
    });
    this.props.businessINDUSTRY({
      callback: (response) => {
        const tempIndustryArray = [];
        for (const industry of response.data) {
          tempIndustryArray.push({
            label: industry.industryDesc,
            value: industry.industryDesc,
            id: industry.industryId,
          });
        }
        this.setState({dropDownItemIndustry: [...tempIndustryArray] || []});
      },
    });
    this.props.businessSEGMENT({
      callback: (response) => {
        const tempSegmentArray = [];
        for (const segment of response.data) {
          tempSegmentArray.push({
            label: segment.segmentcode,
            value: segment.segmentcode,
            id: segment.segment_id,
          });
        }

        this.setState({dropDownItemSegment: [...tempSegmentArray] || []});
      },
    });
    const dataToAPI = {
      applicant_uniqueid: this.state.applicantUniqueId,
      lead_code: this.state.leadCode,
      roleId: this.props.userDataSelector.userData.data.roleId,
    };
    this.props.getLoanSummary({
      dataToAPI,
      callback: (response) => {
        this.setState({
          isViewOnly: response?.mainapplicant?.loanSchemeFreeze
            ? true
            : // response?.mainapplicant?.loanAgreementFlag ? true :
            response?.modelAccess[0]?.read
            ? true
            : false,
        });
      },
    });
    const dataForgetQDE = {
      applicant_uniqueid:
        this.props.navigation.state.params.iscoapplicant ||
        this.props.navigation.state.params.isguarantor
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
        });
        if (response?.businessdetails !== undefined) {
          const businessdetails = response?.businessdetails;
          if (businessdetails?.monthlyIncome) {
            this.setState({
              netWorth: {
                value: formatAmount(businessdetails?.monthlyIncome)?.toString(),
                isValid: true,
              },
            });
          }
          this.setState(
            {
              isDataSaved: businessdetails?.id ? true : false,
              iDToSave: businessdetails?.id || null,
              filePath: businessdetails?.filePath,
              isSelected: businessdetails?.isItCompanyBankAccount || false,
              isVerified: businessdetails?.verified || false,
              accountHolderName: businessdetails?.accountHolderName || '',
              selectedSectorItem: {
                value: businessdetails?.sector || null,
                label: businessdetails?.sector || null,
                isValid: true,
              },
              selectedIndustryItem: {
                value: businessdetails?.industry || null,
                label: businessdetails?.industry || null,
                isValid: true,
              },
              selectedSegmentItem: {
                value: businessdetails?.segment || null,
                label: businessdetails?.segment || null,
                isValid: true,
              },
              selectedAccountType: {
                value: businessdetails?.bankAccountType || null,
                label: businessdetails?.bankAccountType || null,
                isValid: true,
              },
              accountNumber: {
                value: businessdetails?.accountNumber || null,
                isValid: true,
              },
              ifscCode: {
                value: businessdetails?.ifscCode || null,
                isValid: true,
              },
              bankName: {
                value: businessdetails?.bankName || null,
                isValid: true,
              },
              FatherName: {
                value: businessdetails?.fatherName || null,
                isValid: true,
              },
              SpouseName: {
                value: businessdetails?.spouseName || null,
                isValid: true,
              },
              selectedGender: {
                value: businessdetails?.gender || null,
                isValid: true,
              },
            },
            () => {
              if (
                this.state.selectedSectorItem &&
                this.state.selectedSectorItem.value !== null
              ) {
                var code = '';
                this.state.dropDownItemSector.forEach((item) => {
                  if (item.label == businessdetails.sector) {
                    code = item.sector_code;
                  }
                });
                if (code.length > 0) {
                  this.props.businessSUBINDUSTRY({
                    data: {
                      selectedSector: code,
                    },
                    callback: (response) => {
                      const tempSubIndustryArray = [];
                      for (const subIndustry of response.data) {
                        tempSubIndustryArray.push({
                          label: subIndustry.subindustryDesc,
                          value: subIndustry.subindustryDesc,
                          id: subIndustry.subindustryId,
                        });
                      }
                      this.setState({
                        dropDownItemSubIndustry:
                          [...tempSubIndustryArray] || [],
                        selectedSubIndustry: {
                          isValid: true,
                          value: businessdetails.subindustry || null,
                          label: businessdetails.subindustry || null,
                        },
                      });
                    },
                  });
                }
              }
              if (
                this.state.SpouseName.isValid &&
                !this.state.FatherName.isValid
              ) {
                this.setState({
                  SelectedMaritalStatus: {
                    isValid: true,
                    value: 'Married',
                  },
                });
              } else if (
                !this.state.SpouseName.isValid &&
                this.state.FatherName.isValid
              ) {
                this.setState({
                  SelectedMaritalStatus: {
                    isValid: true,
                    value: 'Single',
                  },
                });
              }
            },
          );
        }
      },
    });
  }

  renderDropDownSector() {
    const {
      viewDrop2,
      separatorStyle,
      textStyle,
      textStyle1,
      textStyleDrop,
      errorLabel,
    } = BusinessDetailsStyles;

    return (
      <View style={viewDrop2}>
        <View style={PersonalDetailsStyles.SelfieRow}>
          <Text style={PersonalDetailsStyles.lableStyle}>Upload Selfie</Text>
          <Button
            isDisabled={!!this.state.filePath}
            style={PersonalDetailsStyles.takePhotoButton}
            title={'Take a Photo'}
            onPress={() => {
              if (!this.state.isViewOnly) {
                ImagePicker.openCamera({
                  cropping: true,
                  freeStyleCropEnabled: true,
                  hideBottomControls: true,
                }).then((image) => {
                  ImageResizer.createResizedImage(
                    image.path,
                    1200,
                    1200,
                    'JPEG',
                    100,
                    0,
                  )
                    .then((response) => {
                      this.setState((state, props) => ({
                        filePath: response?.filePath,
                      }));

                      const dataToApi = {
                        applicant_uniqueid:
                          this.state.iscoapplicant || this.state.isguarantor
                            ? this.state.coapplicantUniqueId
                            : this.state.applicantUniqueId,
                        ismainapplicant: this.state.ismainapplicant,
                        isguarantor: this.state.isguarantor,
                        filename: response.name,
                        filePath: response?.path,
                      };
                      zipFileUploadSelfie(
                        response,
                        dataToApi,
                        this.props.uploadSelfie,
                        callback,
                      );
                    })
                    .catch((err) => {});
                });
                const callback = (response) => {
                  this.setState({
                    filePath: response.filePath,
                  });
                };
              }
            }}
          />
        </View>
        {this.state.filePath && (
          <View style={PersonalDetailsStyles.PhotoRow}>
            <Image
              style={PersonalDetailsStyles.PhotoRowSelfie}
              source={{
                uri: this.state.filePath.replace('/var/www/html', uatURL.URL),
              }}
            />
            <TouchableOpacity
              onPress={async (e) => {
                if (!this.state.isViewOnly) {
                  this.props.deleteSelfie({
                    data: {
                      applicant_uniqueid:
                        this.state.isguarantor || this.state.iscoapplicant
                          ? this.state.coapplicantUniqueId
                          : this.state.applicantUniqueId,
                    },
                    callback: (response) => {
                      this.setState({
                        filePath: null,
                      });
                    },
                  });
                }
              }}
              style={PersonalDetailsStyles.closeIcon}>
              <Icon name="closecircle" type="antdesign" color={'#5f5c60'} />
            </TouchableOpacity>
          </View>
        )}
        <Text style={textStyleDrop}>Sector</Text>
        <DropDownPicker
          items={this.state.dropDownItemSector}
          containerStyle={{flex: 1}}
          style={{backgroundColor: '#ffffff', borderWidth: 0}}
          disabled={this.state.isViewOnly}
          itemStyle={{
            justifyContent: 'flex-start',
            marginLeft: 4,
          }}
          defaultValue={this.state.selectedSectorItem.value}
          dropDownStyle={{backgroundColor: '#ffffff'}}
          onChangeItem={(item) =>
            this.setState(
              {
                selectedSectorItem: {
                  value: item.value || null,
                  label: item.label || null,
                  sector_code: item.sector_code || null,
                  isValid: true,
                },
                selectedSubIndustry: {isValid: true},
                dropDownItemSubIndustry: [],
              },
              () => {
                this.props.businessSUBINDUSTRY({
                  data: {
                    selectedSector: this.state.selectedSectorItem.sector_code,
                  },
                  callback: (response) => {
                    const tempSubIndustryArray = [];
                    for (const subIndustry of response.data) {
                      tempSubIndustryArray.push({
                        label: subIndustry.subindustryDesc,
                        value: subIndustry.subindustryDesc,
                        id: subIndustry.subindustryId,
                      });
                    }
                    this.setState({
                      dropDownItemSubIndustry: [...tempSubIndustryArray] || [],
                    });
                  },
                });
              },
            )
          }
          customArrowUp={() => <Image source={UP_ARROW} />}
          customArrowDown={() => <Image source={DOWN_ARROW} />}
          labelStyle={textStyle}
          selectedLabelStyle={textStyle1}
        />
        <View style={separatorStyle} />
        {/*     {!this.state.selectedSectorItem.isValid && <Text style={errorLabel}>Sector name is mandatory.</Text>} */}
      </View>
    );
  }

  renderDropDownIndustry() {
    const {
      viewDrop3,
      separatorStyle,
      textStyle,
      textStyle1,
      textStyleDrop,
      errorLabel,
    } = BusinessDetailsStyles;
    return (
      <View style={viewDrop3}>
        <Text style={textStyleDrop}>Industry</Text>
        <DropDownPicker
          items={this.state.dropDownItemIndustry}
          disabled={this.state.isViewOnly}
          containerStyle={{flex: 1}}
          style={{
            backgroundColor: '#ffffff',
            borderWidth: 0,
          }}
          itemStyle={{
            justifyContent: 'flex-start',
            marginLeft: 4,
          }}
          defaultValue={this.state.selectedIndustryItem.value}
          dropDownStyle={{backgroundColor: '#ffffff'}}
          onChangeItem={(item) =>
            this.setState({
              selectedIndustryItem: {
                value: item.value || null,
                label: item.label || null,
                isValid: true,
              },
            })
          }
          customArrowUp={() => <Image source={UP_ARROW} />}
          customArrowDown={() => <Image source={DOWN_ARROW} />}
          labelStyle={textStyle}
          selectedLabelStyle={textStyle1}
        />
        <View style={separatorStyle} />
        {/*        {!this.state.selectedIndustryItem.isValid && <Text style={errorLabel}>Industry name is mandatory.</Text>} */}
      </View>
    );
  }
  renderCIN() {
    const {separatorStyle, inputStyle, inputTextStyle} = BusinessDetailsStyles;
    return (
      <View>
        <FloatingLabelInput
          label={BUSINESSDETAILS_CONST.PLACEHOLDER_TEXTINPUT_CIN}
          editable={false}
          containerStyles={inputStyle}
          keyboardType="numeric"
          value={this.state.cin.value || undefined}
          onChangeText={(value) => this.setcin(value)}
          customLabelStyles={{
            colorFocused: colors.COLOR_LIGHT_GREY,
            colorBlurred: colors.COLOR_LIGHT_GREY,
            fontSizeFocused: 15,
            fontSizeBlurred: 15,
          }}
          inputStyles={inputTextStyle}
        />
        <View style={separatorStyle} />
      </View>
    );
  }
  renderTurnover() {
    const {
      viewDrop1,
      separatorStyle,
      inputStyle,
      inputTextStyle,
      errorLabel,
    } = BusinessDetailsStyles;
    return (
      <View style={viewDrop1}>
        <FloatingLabelInput
          label={BUSINESSDETAILS_CONST.PLACEHOLDER_TEXTINPUT_TURNOVER}
          containerStyles={inputStyle}
          maxLength={20}
          keyboardType="numeric"
          value={this.state.turnOver.value || undefined}
          onChangeText={(text) => {
            const turnoverRegex = /^[1-9][0-9]*$/;
            if (turnoverRegex.test(text)) {
              this.setState({
                turnOver: {
                  ...this.state.turnOver,
                  isValid: true,
                  value: text,
                },
              });
            }
          }}
          customLabelStyles={{
            colorFocused: colors.COLOR_LIGHT_GREY,
            colorBlurred: colors.COLOR_LIGHT_GREY,
            fontSizeFocused: 15,
            fontSizeBlurred: 15,
          }}
          inputStyles={inputTextStyle}
        />
        <View style={separatorStyle} />
        {!this.state.turnOver.isValid && (
          <Text style={errorLabel}>
            {this.state.turnOver.value === '' ||
            this.state.turnOver.value === null
              ? BUSINESSDETAILS_CONST.MANDATORY_TURNOVER
              : BUSINESSDETAILS_CONST.INVALID_TURNOVER}
          </Text>
        )}
      </View>
    );
  }
  renderNetWorth() {
    const {
      separatorStyle,
      errorLabel,
      inputStyle,
      inputTextStyle,
      textStyle,
      textStyle1,
    } = BusinessDetailsStyles;
    return (
      <View style={{marginTop: 10, marginBottom: 10}}>
        <FloatingLabelInput
          label={BUSINESSDETAILS_CONST.PLACEHOLDER_TEXTINPUT_NETWORTH}
          containerStyles={inputStyle}
          keyboardType={'number-pad'}
          currencyDivider={','}
          editable={!this.state.isViewOnly}
          maskType="currency"
          maxLength={20}
          value={this.state.netWorth.value || undefined}
          onChangeText={(text) => {
            this.setState(
              {
                netWorth: {
                  ...this.state.netWorth,
                  isValid: true,
                  value: text,
                },
              },
              () => {
                this.isNetWorth(this.state.netWorth.value);
              },
            );
          }}
          customLabelStyles={{
            colorFocused: colors.COLOR_BLUE,
            colorBlurred: colors.COLOR_LIGHT_GREY,
            fontSizeFocused: 15,
            fontSizeBlurred: 15,
          }}
          inputStyles={inputTextStyle}
        />
        <View style={separatorStyle} />
        {!this.state.netWorth.isValid && (
          <Text style={errorLabel}>
            {BUSINESSDETAILS_CONST.INVALID_NETWORTH}
          </Text>
        )}
        {
          <View style={{marginTop: 26}}>
            <Text style={[textStyle, {marginBottom: -4, marginLeft: 5}]}>
              {PAN_GST_CONST.PLACEHOLDER_GENDER}
            </Text>
            <DropDownPicker
              disabled={this.state.isViewOnly}
              items={this.state.dropDownGender}
              placeholder={''}
              controller={(instance) => (this.controller = instance)}
              containerStyle={{flex: 1}}
              style={{backgroundColor: '#ffffff', borderWidth: 0}}
              itemStyle={{
                justifyContent: 'flex-start',
                marginLeft: 4,
              }}
              defaultValue={this.state.selectedGender.value}
              dropDownStyle={{backgroundColor: '#ffffff'}}
              onChangeItem={(item) => {
                this.setState({
                  selectedGender: {
                    value: item.value || null,
                    label: item.label || null,
                    isValid: true,
                  },
                });
              }}
              customArrowUp={() => <Image source={UP_ARROW} />}
              customArrowDown={() => <Image source={DOWN_ARROW} />}
              labelStyle={textStyle}
              selectedLabelStyle={[textStyle, {color: colors.COLOR_BLACK}]}
            />
            <View style={[separatorStyle, {marginTop: -4}]} />
            {!this.state.selectedGender.isValid && (
              <Text style={errorLabel}>{PAN_GST_CONST.MANDATORY_GENDER}</Text>
            )}
          </View>
        }
        {
          <View style={{marginTop: 26}}>
            <Text style={[textStyle, {marginBottom: -4, marginLeft: 5}]}>
              {'Marital Status*'}
            </Text>
            <DropDownPicker
              disabled={this.state.isViewOnly}
              items={this.state.dropdownMaritalStatus}
              placeholder={''}
              controller={(instance) => (this.controller = instance)}
              containerStyle={{flex: 1}}
              style={{backgroundColor: '#ffffff', borderWidth: 0}}
              itemStyle={{
                justifyContent: 'flex-start',
                marginLeft: 4,
              }}
              defaultValue={this.state.SelectedMaritalStatus.value}
              dropDownStyle={{backgroundColor: '#ffffff'}}
              onChangeItem={(item) => {
                this.setState({
                  SelectedMaritalStatus: {
                    value: item.value || null,
                    label: item.label || null,
                    isValid: true,
                  },
                });
              }}
              customArrowUp={() => <Image source={UP_ARROW} />}
              customArrowDown={() => <Image source={DOWN_ARROW} />}
              labelStyle={textStyle}
              selectedLabelStyle={[textStyle, {color: colors.COLOR_BLACK}]}
            />
            <View style={[separatorStyle, {marginTop: -4}]} />
            {!this.state.SelectedMaritalStatus.isValid && (
              <Text style={errorLabel}>Select the Marital Status</Text>
            )}
          </View>
        }
        {this.state.SelectedMaritalStatus.value == 'Single' && (
          <>
            <View style={separatorStyle} style={{marginTop: 26}}>
              <FloatingLabelInput
                editable={!this.state.isViewOnly}
                label={'Father*'}
                containerStyles={inputStyle}
                value={this.state.FatherName}
                onChangeText={(value) => {
                  this.setState({
                    FatherName: {
                      value,
                      isValid: true,
                    },
                  });
                }}
                customLabelStyles={{
                  colorFocused: colors.COLOR_BLUE,
                  colorBlurred: colors.COLOR_LIGHT_GREY,
                  fontSizeFocused: 15,
                  fontSizeBlurred: 15,
                }}
                inputStyles={inputTextStyle}
              />
            </View>
            <View style={[separatorStyle]} />
            {!this.state.FatherName.isValid && (
              <Text style={errorLabel}>Enter the father name </Text>
            )}
          </>
        )}
        {this.state.SelectedMaritalStatus.value == 'Married' && (
          <>
            <View style={separatorStyle} style={{marginTop: 26}}>
              <FloatingLabelInput
                editable={!this.state.isViewOnly}
                label={'Spouse*'}
                containerStyles={inputStyle}
                value={this.state.SpouseName}
                onChangeText={(value) => {
                  this.setState({
                    SpouseName: {
                      value,
                      isValid: true,
                    },
                  });
                }}
                customLabelStyles={{
                  colorFocused: colors.COLOR_BLUE,
                  colorBlurred: colors.COLOR_LIGHT_GREY,
                  fontSizeFocused: 15,
                  fontSizeBlurred: 15,
                }}
                inputStyles={inputTextStyle}
              />
            </View>
            <View style={[separatorStyle]} />
            {!this.state.SpouseName.isValid && (
              <Text style={errorLabel}>Enter Spouse Name</Text>
            )}
          </>
        )}
      </View>
    );
  }

  renderDropDownSubIndustry() {
    const {
      viewDrop4,
      separatorStyle,
      textStyle,
      textStyle1,
      textStyleDrop,
      errorLabel,
    } = BusinessDetailsStyles;

    return (
      <View style={viewDrop4}>
        <Text style={textStyleDrop}>Sub-Industry</Text>
        <DropDownPicker
          items={this.state.dropDownItemSubIndustry}
          containerStyle={{flex: 1}}
          disabled={this.state.isViewOnly}
          style={{backgroundColor: '#ffffff', borderWidth: 0}}
          itemStyle={{
            justifyContent: 'flex-start',
            marginLeft: 4,
          }}
          defaultValue={this.state.selectedSubIndustry.value}
          dropDownStyle={{backgroundColor: '#ffffff'}}
          onChangeItem={(item) =>
            this.setState({
              selectedSubIndustry: {
                value: item.value || null,
                label: item.label || null,
                isValid: true,
              },
            })
          }
          customArrowUp={() => <Image source={UP_ARROW} />}
          customArrowDown={() => <Image source={DOWN_ARROW} />}
          labelStyle={textStyle}
          selectedLabelStyle={textStyle1}
        />
        <View style={separatorStyle} />
        {/*  {!this.state.selectedSubIndustry.isValid && <Text style={errorLabel}>Sub-Industry name is mandatory.</Text>} */}
      </View>
    );
  }

  renderDropDownSegment() {
    const {
      viewDrop,
      separatorStyle,
      textStyle,
      textStyle1,
      textStyleDrop,
      errorLabel,
    } = BusinessDetailsStyles;

    return (
      <View style={viewDrop}>
        <Text style={textStyleDrop}>Segment</Text>
        <DropDownPicker
          items={this.state.dropDownItemSegment}
          containerStyle={{flex: 1}}
          disabled={this.state.isViewOnly}
          style={{backgroundColor: '#ffffff', borderWidth: 0}}
          itemStyle={{
            justifyContent: 'flex-start',
            marginLeft: 4,
          }}
          defaultValue={this.state.selectedSegmentItem.value}
          dropDownStyle={{backgroundColor: '#ffffff'}}
          onChangeItem={(item) =>
            this.setState({
              selectedSegmentItem: {
                value: item.value || null,
                label: item.label || null,
                isValid: true,
              },
            })
          }
          customArrowUp={() => <Image source={UP_ARROW} />}
          customArrowDown={() => <Image source={DOWN_ARROW} />}
          labelStyle={textStyle}
          selectedLabelStyle={textStyle1}
        />
        <View style={separatorStyle} />
        {/*    {!this.state.selectedSegmentItem.isValid && <Text style={errorLabel}>Segment name is mandatory.</Text>} */}
      </View>
    );
  }

  renderCheckBox() {
    const {checkboxText} = BusinessDetailsStyles;
    return (
      <View
        style={{
          flexDirection: 'row',
          marginTop: 20,
          marginLeft: 5,
          marginBottom: 10,
        }}>
        <CheckBox
          disabled={this.state.isViewOnly}
          value={this.state.isSelected}
          tintColors={{true: colors.COLOR_LIGHT_NAVY_BLUE}}
          onValueChange={() => {
            this.setState({isSelected: !this.state.isSelected});
          }}
          style={{alignSelf: 'center'}}
        />
        <Text style={checkboxText}>Is it a Company Bank Account?</Text>
      </View>
    );
  }

  renderBankStuff() {
    const {
      viewDrop,
      flexRowStyle,
      verifiedTextStyle,
      verifiedTickImageStyle,
      separatorStyle,
      textStyle,
      textStyle1,
      textStyleDrop,
      errorLabel,
      inputStyle,
      inputTextStyle,
    } = BusinessDetailsStyles;

    return (
      <View style={viewDrop}>
        <Text style={textStyleDrop}>Account Type*</Text>
        <DropDownPicker
          items={this.state.dropDownItemAccountType}
          disabled={this.state.isVerified ? true : this.state.isViewOnly}
          // editable={ this.state.isVerified ? false : !this.state.isViewOnly}
          containerStyle={{flex: 1}}
          style={{backgroundColor: '#ffffff', borderWidth: 0}}
          itemStyle={{
            justifyContent: 'flex-start',
            marginLeft: 4,
          }}
          defaultValue={this.state.selectedAccountType.value}
          dropDownStyle={{backgroundColor: '#ffffff'}}
          onChangeItem={(item) =>
            this.setState({
              selectedAccountType: {
                value: item.value || null,
                label: item.label || null,
                isValid: true,
              },
            })
          }
          customArrowUp={() => <Image source={UP_ARROW} />}
          customArrowDown={() => <Image source={DOWN_ARROW} />}
          labelStyle={textStyle}
          selectedLabelStyle={textStyle1}
        />
        <View style={separatorStyle} />
        {!this.state.selectedAccountType.isValid && (
          <Text style={errorLabel}>Account type is mandatory.</Text>
        )}

        <View style={{marginTop: 30, marginBottom: 10}}>
          <FloatingLabelInput
            label={BUSINESSDETAILS_CONST.PLACEHOLDER_TEXTINPUT_ACCOUNTNUMBER}
            containerStyles={inputStyle}
            keyboardType={'number-pad'}
            maxLength={20}
            editable={this.state.isVerified ? false : !this.state.isViewOnly}
            value={this.state.accountNumber.value || undefined}
            onChangeText={(text) => {
              this.setState(
                {
                  isDataSaved: false,
                  isVerified: false,
                  accountHolderName: '',
                  accountNumber: {
                    ...this.state.accountNumber,
                    isValid: true,
                    value: text,
                  },
                },
                () => {
                  this.isAccountNumber(this.state.accountNumber.value);
                },
              );
            }}
            customLabelStyles={{
              colorFocused: colors.COLOR_BLUE,
              colorBlurred: colors.COLOR_LIGHT_GREY,
              fontSizeFocused: 15,
              fontSizeBlurred: 15,
            }}
            inputStyles={inputTextStyle}
          />
          <View style={separatorStyle} />
          {!this.state.accountNumber.isValid && (
            <Text style={errorLabel}>
              {this.state.accountNumber.value === '' ||
              this.state.accountNumber.value === null
                ? BUSINESSDETAILS_CONST.MANDATORY_ACCOUNTNUMBER
                : BUSINESSDETAILS_CONST.INVALID_NETWORTH}
            </Text>
          )}
        </View>
        <View style={{marginTop: 30, marginBottom: 10}}>
          <FloatingLabelInput
            label={BUSINESSDETAILS_CONST.PLACEHOLDER_TEXTINPUT_IFSC}
            containerStyles={inputStyle}
            maxLength={11}
            editable={this.state.isVerified ? false : !this.state.isViewOnly}
            autoCapitalize="characters"
            value={this.state.ifscCode.value || undefined}
            onChangeText={(text) => {
              this.setState(
                {
                  isVerified: false,
                  isDataSaved: false,
                  accountHolderName: '',
                  ifscCode: {
                    ...this.state.ifscCode,
                    isValid: true,
                    value: text,
                  },
                },
                () => {
                  this.isIFSCCode(this.state.ifscCode.value.toUpperCase());
                  if (this.state.ifscCode.value.length === 11) {
                    Keyboard.dismiss();
                    this.props.ifscCODE({
                      data: {
                        ifscCode: this.state.ifscCode.value.toUpperCase(),
                      },
                      callback: (response) => {
                        this.setState({
                          bankName: {
                            value: response?.data?.bank,
                            isValid: true,
                          },
                        });
                      },
                    });
                  }
                },
              );
            }}
            customLabelStyles={{
              colorFocused: colors.COLOR_BLUE,
              colorBlurred: colors.COLOR_LIGHT_GREY,
              fontSizeFocused: 15,
              fontSizeBlurred: 15,
            }}
            inputStyles={inputTextStyle}
          />
          <View style={separatorStyle} />
          {!this.state.ifscCode.isValid && (
            <Text style={errorLabel}>
              {this.state.ifscCode.value === '' ||
              this.state.ifscCode.value === null
                ? BUSINESSDETAILS_CONST.MANDATORY_IFSC
                : BUSINESSDETAILS_CONST.INVALID_NETWORTH}
            </Text>
          )}
        </View>
        {this.state.isVerified ? (
          <View
            style={[
              // flexRowStyle,
              {flexDirection: 'row', alignSelf: 'center', marginLeft: 20},
            ]}>
            <Image
              source={VERIFIED_TICK}
              resizeMode="contain"
              style={verifiedTickImageStyle}
            />
            <Text style={verifiedTextStyle}>{'Verified'}</Text>
          </View>
        ) : (
          <View style={{width: '50%', alignSelf: 'center', marginTop: 10}}>
            {this.state.accountNumber.value != '' &&
            this.state.ifscCode.value != '' &&
            this.state.accountNumber.value != null &&
            this.state.ifscCode.value != null ? (
              <Button
                isDisabled={this.state.isViewOnly}
                title={'Verify'}
                onPress={() => {
                  this.isAccountNumber();
                  this.isIFSCCode();

                  if (
                    this.state.accountNumber.value != '' &&
                    this.state.accountNumber.value != null &&
                    this.state.accountNumber.isValid &&
                    this.state.ifscCode.value != '' &&
                    this.state.ifscCode.value != null &&
                    this.state.ifscCode.isValid
                  ) {
                    const dataToAPI = {
                      applicantUniqueId: this.state.applicantUniqueId,
                      accountNumber: this.state.accountNumber.value,
                      ifscNumber: this.state.ifscCode.value.toUpperCase(),
                      type: 'business',
                    };

                    this.props.verifyBankAccoutNumber({
                      dataToAPI,
                      callback: (response) => {
                        this.setState({
                          isVerified: true,
                          accountHolderName: response.data.accountHolderName,
                        });
                      },
                    });
                  }
                }}
              />
            ) : null}
          </View>
        )}
        <View style={{marginTop: 30, marginBottom: 10}}>
          <FloatingLabelInput
            label={BUSINESSDETAILS_CONST.PLACEHOLDER_TEXTINPUT_BANKNAME}
            containerStyles={inputStyle}
            editable={this.state.isVerified ? false : true}
            maxLength={50}
            value={this.state.bankName.value || undefined}
            onChangeText={(text) => {
              this.setState({
                isDataSaved: false,
                bankName: {
                  ...this.state.bankName,
                  isValid: true,
                  value: text,
                },
              });
            }}
            customLabelStyles={{
              colorFocused: colors.COLOR_BLUE,
              colorBlurred: colors.COLOR_LIGHT_GREY,
              fontSizeFocused: 15,
              fontSizeBlurred: 15,
            }}
            inputStyles={inputTextStyle}
          />
          <View style={separatorStyle} />
          {!this.state.bankName.isValid && (
            <Text style={errorLabel}>
              {this.state.bankName.value === '' ||
              this.state.bankName.value === null
                ? BUSINESSDETAILS_CONST.MANDATORY_BANKNAME
                : BUSINESSDETAILS_CONST.INVALID_NETWORTH}
            </Text>
          )}
        </View>
        <View style={{marginTop: 30, marginBottom: 10}}>
          <FloatingLabelInput
            label={'Account Holder Name'}
            containerStyles={inputStyle}
            editable={this.state.isVerified ? false : !this.state.isViewOnly}
            // editable={this.state.isVerified ? false : true}
            maxLength={50}
            value={this.state.accountHolderName || undefined}
            onChangeText={(text) => {
              this.setState({
                accountHolderName: text,
              });
            }}
            customLabelStyles={{
              colorFocused: colors.COLOR_BLUE,
              colorBlurred: colors.COLOR_LIGHT_GREY,
              fontSizeFocused: 15,
              fontSizeBlurred: 15,
            }}
            inputStyles={inputTextStyle}
          />
          <View style={separatorStyle} />
          {!this.state.bankName.isValid && (
            <Text style={errorLabel}>
              {
                // (this.state.accountHolderName === "") ? BUSINESSDETAILS_CONST.MANDATORY_BANKNAME :
                'Invalid name'
              }
            </Text>
          )}
        </View>
      </View>
    );
  }

  render() {
    const {
      mainContainer,
      mainHeadingText,
      buttonContainer,
      cancelButtonStyle,
      cancelButtonTitleStyle,
    } = BusinessDetailsStyles;
    return (
      <WaveBackground>
        <StatusBar
          backgroundColor={colors.COLOR_WHITE}
          barStyle={'dark-content'}
          translucent={false}
          hidden={false}
        />

        <Header
          label={BUSINESSDETAILS_CONST.HEADER}
          showLeftIcon={false}
          onPress={() => {}}
        />
        <View style={{alignContent: 'center'}}>
          <DottedProgressBar
            totalSteps={
              this.state.iscoapplicant || this.state.isguarantor
                ? [1, 2, 3]
                : [1, 2, 3, 4, 5]
            }
            currentIndex={3}
          />
          <Text style={mainHeadingText}>Business Details</Text>
        </View>

        <ScrollView style={{marginBottom: 20}}>
          <View style={mainContainer}>
            {this.state.dropDownItemSector.length !== 0
              ? this.renderDropDownSector()
              : null}
            {this.renderDropDownIndustry()}
            {this.renderDropDownSubIndustry()}
            {/*    {this.renderCIN()} */}
            {this.renderDropDownSegment()}
            {/*   {this.renderTurnover()}*/}
            {this.renderNetWorth()}
            {this.renderCheckBox()}
            {this.renderBankStuff()}
            <View style={buttonContainer}>
              <Button
                title={BUSINESSDETAILS_CONST.BUTTON_SAVEEXIT}
                onPress={() => {
                  this.props.navigation.navigate('LeadList');
                }}
                customContainerStyle={cancelButtonStyle}
                cutomTitleStyle={cancelButtonTitleStyle}
              />
              <Button
                isDisabled={this.state.isViewOnly}
                title={BUSINESSDETAILS_CONST.BUTTON_NEXT}
                onPress={() => {
                  /*  this.isSelectedSectorItem();
                                     this.isSelectedIndustryItem();
                                     this.isSelectedSegmentItem();
                                     this.isSelectedSubIndustry();
                                     this.isNetWorth(); */
                  this.isSelectedAccountItem();
                  this.isAccountNumber();
                  this.isIFSCCode();
                  this.isSelectedGender();
                  this.isSelectedMaritalStatus();

                  if (this.state.filePath == null) {
                    handleError('Please upload selfie.');
                  } else if (
                    this.state.selectedAccountType.value != null &&
                    this.state.selectedAccountType.value != '' &&
                    this.state.accountNumber.value != '' &&
                    this.state.accountNumber.value != null &&
                    this.state.accountNumber.isValid &&
                    this.state.ifscCode.value != '' &&
                    this.state.ifscCode.value != null &&
                    this.state.ifscCode.isValid &&
                    this.state.bankName.value != '' &&
                    this.state.bankName.value != null &&
                    this.state.bankName.isValid &&
                    this.state.selectedGender.isValid &&
                    this.state.selectedGender.value &&
                    ((this.state.FatherName.isValid &&
                      this.state.FatherName.value) ||
                      (this.state.SpouseName.isValid &&
                        this.state.SpouseName.value))
                  ) {
                    const dataToAPI = {
                      applicant_uniqueid:
                        this.state.iscoapplicant || this.state.isguarantor
                          ? this.state.coapplicantUniqueId
                          : this.state.applicantUniqueId,
                      ismainapplicant: this.state.ismainapplicant,
                      isguarantor: this.state.isguarantor,
                      lead_code: this.state.leadCode,
                      isItCompanyBankAccount: this.state.isSelected,
                      id: this.state.iDToSave,
                      bankAccountType: this.state.selectedAccountType.value,
                      accountNumber: this.state.accountNumber.value,
                      ifscCode: this.state.ifscCode.value.toUpperCase(),
                      bankName: this.state.bankName.value,
                      verified: this.state.isVerified,
                      accountHolderName: this.state.accountHolderName,
                      fatherName: this.state.FatherName.value,
                      spouseName: this.state.SpouseName.value,
                      gender: this.state.selectedGender.value,
                    };
                    if (
                      this.state.netWorth.value != undefined &&
                      this.state.netWorth.value != null &&
                      this.state.netWorth.value != ''
                    ) {
                      dataToAPI[
                        'monthlyIncome'
                      ] = this.state.netWorth.value.replace(/,/g, '');
                    }
                    if (
                      this.state.selectedSectorItem.value != null &&
                      this.state.selectedSectorItem.value != '' &&
                      this.state.selectedSectorItem.value != undefined
                    ) {
                      dataToAPI['sector'] = this.state.selectedSectorItem.value;
                    }
                    if (
                      this.state.selectedSegmentItem.value != null &&
                      this.state.selectedSegmentItem.value != '' &&
                      this.state.selectedSegmentItem.value != undefined
                    ) {
                      dataToAPI[
                        'segment'
                      ] = this.state.selectedSegmentItem.value;
                    }
                    if (
                      this.state.selectedIndustryItem.value != null &&
                      this.state.selectedIndustryItem.value != '' &&
                      this.state.selectedIndustryItem.value != undefined
                    ) {
                      dataToAPI[
                        'industry'
                      ] = this.state.selectedIndustryItem.value;
                    }
                    if (
                      this.state.selectedSubIndustry.value != null &&
                      this.state.selectedSubIndustry.value != '' &&
                      this.state.selectedSubIndustry.value != undefined
                    ) {
                      dataToAPI[
                        'subindustry'
                      ] = this.state.selectedSubIndustry.value;
                    }
                    if (
                      this.state.SelectedMaritalStatus.isValid &&
                      this.state.selectedGender.isValid &&
                      (this.state.FatherName.isValid ||
                        this.state.SpouseName.isValid)
                    ) {
                      this.props.saveUpdateBusinessINFO({
                        dataToAPI,
                        callback: () => {
                          this.setState({isDataSaved: true});
                        },
                      });
                    }
                  }
                }}
              />
            </View>
            <View style={buttonContainer}>
              <Button
                title={'Loan Summary'}
                //isDisabled={!this.state.mainApplicantSummary === true}
                onPress={() => {
                  this.props.navigation.navigate('LoanSummary', {
                    leadName: this.state.leadName,
                    applicantUniqueId: this.state.applicantUniqueId,
                    leadCode: this.state.leadCode,
                    mobileNumber: this.state.mobileNumberFromProps,
                    coapplicantUniqueId: this.state.coapplicantUniqueId,
                    ismainapplicant: this.state.ismainapplicant,
                    iscoapplicant: this.state.iscoapplicant,
                    isguarantor: this.state.isguarantor,
                    isViewOnly: this.state.isViewOnly || false,
                  });
                }}
              />
              <View style={{flex: 1, marginLeft: 10}}>
                <Button
                  title={BUSINESSDETAILS_CONST.BUTTON_TITLE_NEXT}
                  isDisabled={!this.state.isDataSaved}
                  onPress={this.redirect}
                />
              </View>
            </View>
          </View>
        </ScrollView>
      </WaveBackground>
    );
  }
}

BusinessDetails.propTypes = {
  userDataSelector: PropTypes.object,
};

export default compose(
  container,
  withProps(() => {}),
)(BusinessDetails);
