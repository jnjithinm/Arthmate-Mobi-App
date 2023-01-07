import Slider from '@react-native-community/slider';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {
  Image,
  ScrollView,
  StatusBar,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import {FloatingLabelInput} from 'react-native-floating-label-input';
import {compose, withProps} from 'recompose';
import {Button} from '../../components/Button/Button';
import {DottedProgressBar} from '../../components/DottedProgressBar/DottedProgressBar';
import {Header} from '../../components/Header/Header';
import {WaveBackground} from '../../components/WaveBackground/WaveBackground';
import * as colors from '../../constants/colors';
import {DOWN_ARROW, UP_ARROW} from '../../constants/imgConsts';
import {LOANDETAILS_CONST} from '../../constants/screenConst';
import container from '../../container/LoanDetails/index';
import {LoanDetailsStyles} from './LoanDetailsStyles';
import {RadioButton} from '../../components/RadioButton/RadioButton';
import {DatePickerDialog} from 'react-native-datepicker-dialog';
import {Icon} from 'react-native-elements';
import moment from 'moment';
import CheckBox from '@react-native-community/checkbox';
import {handleError} from '../../../utils';

const roiRegex = /^(100|([0-9][0-9]?(\.[0-9]+)?))$/;
const NAME_REGEX = /^[a-zA-Z\s]*$/;
var tempValue = 0;
class LoanDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dropDownItemVehicle: [],
      dropDownItemBrandofVehicle: [],
      dropDownItemModel: [],
      dropDownItemSubModel: [],
      dropDownItemDealer: [],
      dropDownItemSubDealer: [],
      masterState: null,
      valueaR: '',
      valueaR1: '',
      gstonProcessingFee: '',
      ltvGridPercentage: '',
      ltvGridId: '',
      ltvGridRule: '',
      amountSelected: 0,
      valuetR: 12,
      valueRateofInterest: {
        value: '',
        isValid: true,
      },
      emi: '0',
      opdAmount: '',
      pfAmountTypeMaster: '',
      nachChargesMaster: '',
      stampDutyMaster: '',
      pfAmountMaster: '',
      valueTenure: 12,
      entry_dt: '',
      loanVehicleDetails: {isValid: true},
      loanVehicleBrand: {isValid: true},
      loanVehicleModel: {isValid: true},
      loanVehicleSubModel: {isValid: true},
      selectedDealer: {isValid: true},
      selectedSubDealer: {isValid: true},
      ismainapplicant: true,
      isguarantor: false,
      ProcessingFees_calc: {
        value: 0,
        isValid: true,
      },
      saveEnable: true,
      idToEdit: null,
      cancelButtonTitle: 'Cancel',
      isDataSaved: false,
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
      branchName: this.props.userDataSelector?.userData?.data?.branchName || '',
      selectedSourceType: 'Yes',
      selectedSourceValid: true,
      selectedSourceValid2: true,
      selectedSourceType2: '',
      selectedSourceValid3: true,
      selectedSourceType3: '',
      selectedSourceValid4: true,
      selectedSourceType4: '',
      sourceType: [
        {
          title: 'Yes',
          isSelected: false,
        },
        {
          title: 'No',
          isSelected: false,
        },
      ],
      sourceType2: [
        {
          title: 'Yes',
          isSelected: false,
        },
        {
          title: 'No',
          isSelected: false,
        },
      ],
      premiumAmount: {
        value: '',
        isValid: true,
      },
      premiumAmountFreez: false,
      nameNominee: {
        value: '',
        isValid: true,
      },
      addressNominee: {
        value: null,
        isValid: true,
      },
      dobValid: true,
      dateOfIncorporation: null,
      dateOfIncorporationText: '',
      invalidDate: false,
      dropDownRelation: [
        {
          label: 'Father',
          value: 'Father',
        },
        {
          label: 'Mother',
          value: 'Mother',
        },
        {
          label: 'Brother',
          value: 'Brother',
        },
        {
          label: 'Sister',
          value: 'Sister',
        },
        {
          label: 'Spouse',
          value: 'Spouse',
        },
        // {
        //   label: "Cousin",
        //   value: "Cousin"
        // },
        // {
        //   label: "Colleague",
        //   value: "Colleague"
        // },
        // {
        //   label: "Friend",
        //   value: "Friend"
        // },
        // {
        //   label: "Neighbour",
        //   value: "Neighbour"
        // },
      ],
      selectedRelation: {
        value: null,
        isValid: true,
      },
      dealerCharges: {
        value: '0',
        isValid: true,
      },
      processingFees: {
        value: '0',
        isValid: true,
      },
      insuranceAmount: {
        value: '0',
        isValid: true,
      },
      bureauCharges: {
        value: '0',
        isValid: true,
      },
      otherCharges: {
        value: '0',
        isValid: true,
      },
      dealerSubvention: {
        value: '0',
        isValid: true,
      },
      exShowroomPrice: {
        value: '',
        isValid: true,
      },
      insurance: {
        value: '',
        isValid: true,
      },
      adminFees: {
        value: '0',
        isValid: true,
      },
      nachCharges: {
        value: '118',
        isValid: true,
      },
      preEMI: {
        value: '0',
        isValid: true,
      },
      podCharges: {
        value: '0',
        isValid: true,
      },
      convenienceCharges: {
        value: '0',
        isValid: true,
      },
      stampDuty: {
        value: '0',
        isValid: true,
      },
      dealerPayout: {
        value: null,
        isValid: true,
      },
      dropDownDealerPayout: [
        {
          label: 'Percent',
          value: 'Percent',
        },
        {
          label: 'Number',
          value: 'Number',
        },
      ],
      schemeCode: [],
      selectedSchemeCode: {isValid: true},
      schemeDetails: [],
      startDate: '',
      endDate: '',
      schemeName: '',
      schemeNameValid: true,
      ltv: '',
      approveAmount: 0,
      dealerPayoutType: {isValid: true},
      pfAmountType: {isValid: true},
      pfAmount1: '0',
      maxAmount: 500000,
      validAmount: true,
      isViewOnly: false,
      indSelfSoleFlag: false,
      processingCharges: '',
    };
  }

  emiamount = () => {
    if (
      this.state.valueRateofInterest.value != '' &&
      this.state.valueRateofInterest.value != null &&
      this.state.valueRateofInterest.isValid
    ) {
      let aa =
        parseFloat(this.state.valueaR) *
        (parseFloat(this.state.valueRateofInterest.value) / 100 / 12);
      let bb = Math.pow(
        1 + parseFloat(this.state.valueRateofInterest.value) / 100 / 12,
        this.state.valuetR,
      );
      let cc =
        Math.pow(
          1 + parseFloat(this.state.valueRateofInterest.value) / 100 / 12,
          this.state.valuetR,
        ) - 1;
      var dd = bb / cc;
      var ee = aa * dd;
      let emi = ee;

      let fees = (5 / 100) * Number(this.state.valueaR);
      console.log('fffff', fees);
      emi = Math.ceil(emi);
      return this.setState({emi});
      // this.setState({processingCharges: fees});
     
    }
  };
  isNameNominee(text) {
    let valid = false;
    const customerRegex = /^[a-zA-Z ]*$/;
    if (text != '' && text != null && customerRegex.test(text)) {
      valid = true;
    }

    this.setState({
      nameNominee: {
        ...this.state.nameNominee,
        isValid: valid,
      },
    });
  }

  isRelation() {
    if (this.state.selectedRelation.value == null) {
      this.setState({selectedRelation: {isValid: false}});
    }
  }

  // onDOBDatePicked = (date) => {
  //   this.setState({
  //     dateOfIncorporation: date,
  //     dateOfIncorporationText: moment(date).format('YYYY-MM-DD'),
  //   });
  // };

  onDOBDatePicked = (date) => {
    this.setState({
      dateOfIncorporation: date,
      dateOfIncorporationText: moment(date).format('DD/MM/YYYY'),
      invalidDate: moment(date) > moment().clone().subtract(18, 'years'),
      invalidDateMessage:
        moment(date) > moment().clone().subtract(18, 'years')
          ? LOANDETAILS_CONST.INVALID_DATE_OF_BIRTH
          : this.state.invalidDateMessage,
    });
  };

  isDobValid() {
    this.setState({
      dobValid: this.state.dateOfIncorporationText !== '' ? true : false,
    });
  }
  isSelectedSourceValid() {
    this.setState({selectedSourceValid: false});
  }
  isSelectedSourceValid2() {
    this.setState({selectedSourceValid2: false});
  }
  isSelectedSourceValid3() {
    this.setState({selectedSourceValid3: false});
  }
  isSelectedSourceValid4() {
    this.setState({selectedSourceValid4: false});
  }
  isValidAmount() {
    this.setState({validAmount: false});
  }
  isAddressNominee(text) {
    let valid = false;
    const addressRegex = /.*/;
    if (text != '' && text != null && addressRegex.test(text)) {
      valid = true;
    }
    this.setState({
      addressNominee: {
        ...this.state.addressNominee,
        isValid: valid,
      },
    });
  }
  isSelectedRelation() {
    if (this.state.selectedRelation.value == null) {
      this.setState({selectedRelation: {isValid: false}});
    }
  }

  isLoanVehicleDetails() {
    if (this.state.loanVehicleDetails.value == null) {
      this.setState({loanVehicleDetails: {isValid: false}});
    }
  }

  isDealerPayoutType() {
    if (this?.state?.dealerPayout?.value == '') {
      this.setState({dealerPayoutType: {isValid: false}}, () => {});
    } else if (this?.state?.dealerPayout?.value == null) {
      this.setState({dealerPayoutType: {isValid: false}}, () => {});
    }
  }

  isPFType() {
    if (this.state.pfAmountType.value == null) {
      this.setState({pfAmountType: {isValid: false}});
    }
  }

  isLoanVehicleBrand() {
    if (this.state.loanVehicleBrand.value == null) {
      this.setState({loanVehicleBrand: {isValid: false}});
    }
  }

  isLoanVehicleModel() {
    if (this.state.loanVehicleModel.value == null) {
      this.setState({loanVehicleModel: {isValid: false}});
    }
  }

  isLoanVehicleSubModel() {
    if (this.state.loanVehicleSubModel.value == null) {
      this.setState({loanVehicleSubModel: {isValid: false}});
    }
  }
  isSelectedDealer() {
    if (this.state.selectedDealer.value == null) {
      this.setState({selectedDealer: {isValid: false}});
    }
  }

  isSechemeCode() {
    if (this.state.selectedSchemeCode.value == null) {
      this.setState({selectedSchemeCode: {isValid: false}});
    }
  }

  isDealerCharges(text) {
    let valid = false;
    const pincodeRegex = /^\d+$/;
    if (text != '' && text != null && pincodeRegex.test(text)) {
      valid = true;
    }

    this.setState({
      dealerCharges: {
        ...this.state.dealerCharges,
        isValid: valid,
      },
    });
  }

  isProcessingFees(text) {
    console.log('text is ', text, this.state.valueaR1);
    console.log('text is ', text);
    let valid = false;
    if (this.state.pfAmountType.value === 'Number') {
      const pincodeRegex = /^\d+$/;
      if (
        text != '' &&
        text != null &&
        pincodeRegex.test(text) &&
        text >= this.state.pfAmountMaster &&
        (parseInt(text) > parseInt(this.state.pfAmount1) ||
          parseInt(text) == parseInt(this.state.pfAmount1))
      ) {
        valid = true;
      }
      this.setState({
        processingFees: {
          ...this.state.processingFees,
          isValid: valid,
        },
      });
    }
    if (this.state.pfAmountType.value === 'Percent') {
      console.log('text is ', text);
      const pincodeRegex = /^(100|([0-9][0-9]?(\.[0-9]+)?))$/;
      if (text != null) {
        valid = true;
        let aa = (Number(this.state.valueaR1) * 5) / 100;
        let bb = Number(aa / 1.18).toFixed(2);
        let cc = Number(aa - bb);

        console.log('is it coming ....', bb, this.state.valueaR1);
        this.setState({
          processingFees: {
            ...this.state.processingFees,
            value: bb,
            isValid: valid,
          },
          // ProcessingFees_calc: {
          //   value: bb,
          //   isValid: valid,
          // },
          gstonProcessingFee: cc,
        });
      } else {
        valid = false;
        this.setState({
          processingFees: {
            ...this.state.processingFees,
            isValid: valid,
          },
        });
      }
    }
  }

  isInsuranceAmount(text) {
    let valid = false;
    const pincodeRegex = /^\d+$/;
    if (text != '' && text != null && pincodeRegex.test(text)) {
      valid = true;
    }

    this.setState({
      insuranceAmount: {
        ...this.state.insuranceAmount,
        isValid: valid,
      },
    });
  }

  isBureauCharges(text) {
    let valid = false;
    const pincodeRegex = /^\d+$/;
    if (text != '' && text != null && pincodeRegex.test(text)) {
      valid = true;
    }
    this.setState({
      bureauCharges: {
        ...this.state.bureauCharges,
        isValid: valid,
      },
    });
  }

  isStampDuty(text) {
    let valid = false;
    const pincodeRegex = /^\d+$/;
    if (
      text != '' &&
      text != null &&
      pincodeRegex.test(text) &&
      Number(text) >= Number(this.state.stampDutyMaster)
    ) {
      valid = true;
    }
    this.setState({
      stampDuty: {
        ...this.state.stampDuty,
        isValid: valid,
      },
    });
  }

  isDealerPayout(text) {
    let valid = false;
    if (this.state.dealerPayoutType.value === 'Number') {
      const pincodeRegex = /^\d+$/;
      if (text != '' && text != null && pincodeRegex.test(text)) {
        valid = true;
      }
      this.setState({
        dealerPayout: {
          ...this.state.dealerPayout,
          isValid: valid,
        },
      });
    } else if (this.state.dealerPayoutType.value === 'Percent') {
      const pincodeRegex = /^(100|([0-9][0-9]?(\.[0-9]+)?))$/;

      if (
        text != '' &&
        text != null &&
        text >= 1 &&
        text <= 100 &&
        pincodeRegex.test(text)
      ) {
        valid = true;
        this.setState({
          dealerPayout: {
            ...this.state.dealerPayout,
            isValid: valid,
          },
        });
      } else {
        valid = false;
        this.setState({
          dealerPayout: {
            ...this.state.dealerPayout,
            isValid: valid,
          },
        });
      }
    } else {
      this.setState({
        dealerPayout: {
          ...this.state.dealerPayout,
          isValid: valid,
        },
      });
    }
  }

  isPremiumAmount(text) {
    let valid = false;
    const pincodeRegex = /^\d+$/;
    if (text != '' && text != null && pincodeRegex.test(text)) {
      valid = true;
    }

    this.setState({
      premiumAmount: {
        ...this.state.premiumAmount,
        isValid: valid,
      },
    });
  }

  isOtherCharges(text) {
    let valid = false;
    const pincodeRegex = /^\d+$/;
    if (text != '' && text != null && pincodeRegex.test(text)) {
      valid = true;
    }

    this.setState({
      otherCharges: {
        ...this.state.otherCharges,
        isValid: valid,
      },
    });
  }

  isDealerSubvention(text) {
    let valid = false;
    const pincodeRegex = /^\d+$/;
    if (text == 0) {
      valid = true;
    } else if (text != '' && text != null && pincodeRegex.test(text)) {
      valid = true;
    }

    this.setState({
      dealerSubvention: {
        ...this.state.dealerSubvention,
        isValid: valid,
      },
    });
  }

  isAdminFees(text) {
    let valid = false;
    const pincodeRegex = /^\d+$/;
    if (text == 0) {
      valid = true;
    } else if (text != '' && text != null && pincodeRegex.test(text)) {
      valid = true;
    }
    this.setState({
      adminFees: {
        ...this.state.adminFees,
        isValid: valid,
      },
    });
  }

  isInsurance(text) {
    let valid = false;
    const pincodeRegex = /^\d+$/;
    if (text === 0) {
      valid = true;
    } else if (text != '' && text != null && pincodeRegex.test(text)) {
      valid = true;
    }
    this.setState({
      insurance: {
        ...this.state.insurance,
        isValid: valid,
      },
    });
  }

  isExShowRoomPrice(text) {
    let valid = false;
    const pincodeRegex = /^\d+$/;
    if (text === 0) {
      valid = true;
    } else if (text != '' && text != null && pincodeRegex.test(text)) {
      valid = true;
    }
    this.setState({
      exShowroomPrice: {
        ...this.state.exShowroomPrice,
        isValid: valid,
      },
    });
  }

  isNachCharges(text) {
    let valid = false;

    const pincodeRegex = /^\d+$/;

    if (text === 0) {
      valid = true;
    } else if (
      text != '' &&
      text != null &&
      pincodeRegex.test(text) &&
      Number(text) >= Number(this.state.nachChargesMaster)
    ) {
      valid = true;
    }

    this.setState({
      nachCharges: {
        ...this.state.nachCharges,
        isValid: valid,
      },
    });
  }

  isPreEMI(text) {
    let valid = false;
    const pincodeRegex = /^\d+$/;
    if (text == 0) {
      valid = true;
    } else if (text != '' && text != null && pincodeRegex.test(text)) {
      valid = true;
    }

    this.setState({
      preEMI: {
        ...this.state.preEMI,
        isValid: valid,
      },
    });
  }

  isPodCharges(text) {
    let valid = false;
    const pincodeRegex = /^\d+$/;
    if (text == 0) {
      valid = true;
    } else if (text != '' && text != null && pincodeRegex.test(text)) {
      valid = true;
    }

    this.setState({
      podCharges: {
        ...this.state.podCharges,
        isValid: valid,
      },
    });
  }

  isConvenienceCharges(text) {
    let valid = false;
    const pincodeRegex = /^\d+$/;
    if (text == 0) {
      valid = true;
    } else if (text != '' && text != null && pincodeRegex.test(text)) {
      valid = true;
    }

    this.setState({
      convenienceCharges: {
        ...this.state.convenienceCharges,
        isValid: valid,
      },
    });
  }

  isValueRateofInterest(text) {
    let valid = false;
    //const roiRegex = /^(?!0+(?:\.0+)?$)\d?\d(?:\.\d\d?)?$/;
    const roiRegex = /^(100|([0-9][0-9]?(\.[0-9]+)?))$/;
    if (text != '' && text != null && roiRegex.test(text)) {
      valid = true;
    }
    this.setState({
      valueRateofInterest: {
        ...this.state.valueRateofInterest,
        isValid: valid,
      },
    });
  }

  selectRadioButton(value, index) {
    value.title == 'No'
      ? this.setState(
          {
            selectedSourceType: value.title,
            premiumAmount: {value: '', isValid: true},
            selectedSourceType2: '',
            nameNominee: {
              value: '',
              isValid: true,
            },
            addressNominee: {
              value: null,
              isValid: true,
            },
            dobValid: true,
            dateOfIncorporation: null,
            dateOfIncorporationText: '',
            selectedRelation: {
              value: null,
              isValid: true,
            },
          },
          () => {
            this.emiamount();
          },
        )
      : this.setState(
          {
            selectedSourceType: value.title,
            // premiumAmount: {
            //   value: this.state.schemeDetails.klpiBracket,
            //   isValid: true,
            // }
          },
          () => {
            this.emiamount();
          },
        );
  }

  selectRadioButton2(value, index) {
    this.setState({selectedSourceType2: value.title}, () => this.emiamount());
  }
  selectRadioButton3(value, index) {
    this.setState(
      {
        selectedSourceType3: value.title,
        selectedSourceType4:
          value.title == 'No' ? 'No' : this.state.selectedSourceType4,
      },
      () => this.emiamount(),
    );
  }
  selectRadioButton4(value, index) {
    this.setState({selectedSourceType4: value.title}, () => this.emiamount());
  }

  apiCall = () => {
    const dataToAPI = {
      applicant_uniqueid: this.state.applicantUniqueId,
      lead_code: this.state.leadCode,
      roleId: this.props.userDataSelector.userData.data.roleId,
    };
    this.props.getLoanSummary({
      dataToAPI,
      callback: (response) => {
        this.setState(
          {
            isViewOnly:
              // response?.mainapplicant?.loanSchemeFreeze ? true :
              //   response?.modelAccess[0]?.read ? true :
              false,
            branchName: response.branchName,
          },
          () => {
            this.props.loanVehicleDETAILS({
              data: {leadCode: this.state.leadCode},
              callback: (response) => {
                const tempVehicleArray = [];
                for (const vehicle of response.data) {
                  tempVehicleArray.push({
                    label: vehicle.vehicletype,
                    value: vehicle.vehicletype,
                    id: vehicle.id,
                  });
                }
                this.setState({
                  dropDownItemVehicle: [...tempVehicleArray] || [],
                });
              },
            });
            // this.props.loanDEALER({
            //   data: {
            //     branch: this.state.branchName,
            //     employeeId: this.props.userDataSelector?.userData?.data?.employeeId,
            //     brand: this.state.loanVehicleBrand.value,
            //   },
            //   callback: (response) => {
            //     const tempDealerArray = [];
            //     for (const dealer of response.data) {
            //       tempDealerArray.push({
            //         label: dealer.dealer_name,
            //         value: dealer.dealer_name,
            //         id: dealer.id,
            //       });
            //     }
            //     this.setState({ dropDownItemDealer: [...tempDealerArray] || [] });
            //   },
            // });
            this.props.loanSubDEALER({
              data: {
                branch: this.state.branchName,
                employeeId: this.props.userDataSelector?.userData?.data
                  ?.employeeId,
              },
              callback: (response) => {
                const tempSubDealerArray = [];
                for (const subDealer of response.data) {
                  tempSubDealerArray.push({
                    label: subDealer.dealer_name,
                    value: subDealer.dealer_name,
                    id: subDealer.id,
                  });
                }
                this.setState({
                  dropDownItemSubDealer: [...tempSubDealerArray] || [],
                });
              },
            });

            const dataForgetQDE = {
              applicant_uniqueid:
                this.props.navigation.state.params.iscoapplicant ||
                this.props.navigation.state.params.isguarantor
                  ? this.props.navigation.state.params.coapplicantUniqueId
                  : this.props.navigation.state.params.applicantUniqueId,
              ismainapplicant: this.props.navigation.state.params
                .ismainapplicant,
              isguarantor: this.props.navigation.state.params.isguarantor,
            };
            this.props.getQDEData({
              dataForgetQDE,
              callback: (response) => {
                this.setState({
                  masterState:
                    response?.additionalDetails?.kycaddresDetails?.state,
                  indSelfSoleFlag: response?.indSelfSoleFlag || false,
                });

                if (
                  this.props.userQDEDataSelector &&
                  this.props.userQDEDataSelector.loandetails
                ) {
                  const loanData = this.props.userQDEDataSelector.loandetails;
                  if (
                    loanData?.dealerPayouttype === 'Number' ||
                    loanData?.dealerPayouttype === 'number'
                  ) {
                    this.setState({
                      dealerPayoutType: {
                        isValid: true,
                        label: 'Number',
                        value: 'Number',
                      },
                    });
                  } else if (
                    loanData?.dealerPayouttype === 'Percent' ||
                    loanData?.dealerPayouttype === 'percent'
                  ) {
                    this.setState({
                      dealerPayoutType: {
                        isValid: true,
                        label: 'Percent',
                        value: 'Percent',
                      },
                    });
                  } else {
                    this.setState({
                      dealerPayoutType: {
                        isValid: false,
                        // label: "Percent",
                        // value: "Percent"
                      },
                    });
                  }

                  if (loanData?.pfAmountType === 'Number') {
                    this.setState({
                      pfAmountType: {
                        isValid: true,
                        label: 'Number',
                        value: 'Number',
                      },
                    });
                  }

                  if (loanData?.pfAmountType === 'Percent') {
                    this.setState({
                      pfAmountType: {
                        isValid: true,
                        label: 'Percent',
                        value: 'Percent',
                      },
                    });
                  }
                  this.setState(
                    {
                      selectedSourceType3: loanData?.isOpdCoverage
                        ? 'Yes'
                        : 'No',
                      opdAmount: loanData?.opdCoverage,
                      selectedSourceType4: loanData?.isOpdAddedInLoan
                        ? 'Yes'
                        : 'No',
                      nachChargesMaster: loanData?.nachChargesMaster || 0,
                      stampDutyMaster: loanData?.stampDutyMaster || 0,
                      pfAmountMaster: loanData?.pfAmountMaster || 0,
                      pfAmountTypeMaster: loanData?.pfAmountTypeMaster || 0,
                      startDate: loanData?.startDate,
                      endDate: loanData.endDate,
                      schemeName: loanData.schemeName,
                      pfAmount1: loanData.pfAmountMaster,
                      selectedSchemeCode: {
                        isValid: true,
                        value: loanData.schemeCode || null,
                        label: loanData.schemeCode || null,
                      },
                      ltv: loanData?.ltvPercentage?.toString(),
                      entry_dt: loanData.entry_dt || '',
                      amountSelected: loanData.amountSelected,
                      // ltvGridPercentage: this.state.ltvGridPercentage,
                      // ltvGridId: this.state.ltvGridId,
                      valueaR: loanData.amt_requested,
                      // loanData.isPremiumamount == true ? parseFloat(loanData.amt_requested) - parseFloat(loanData?.premiumAmount) : loanData?.amt_requested,
                      valuetR: loanData.tenure_requested || 6,
                      valueTenure: loanData.tenure_requested || 6,
                      valueRateofInterest: {
                        value:
                          loanData.dealerCharges == undefined
                            ? null
                            : loanData?.rateOfInterest?.toString(),
                        isValid: true,
                      },
                      loanVehicleDetails: {
                        isValid: true,
                        value: loanData.vehicle_type || null,
                        label: loanData.vehicle_type || null,
                      },
                      selectedDealer: {
                        isValid: true,
                        value: loanData.dealer_name || null,
                        label: loanData.dealer_name || null,
                      },
                      dealerPayout: {
                        value:
                          loanData.dealerPayout == undefined
                            ? ''
                            : loanData.dealerPayout.toString() || null,
                        isValid: true,
                      },
                      dealerCharges: {
                        isValid: true,
                        value:
                          loanData.dealerCharges == undefined
                            ? ''
                            : loanData.dealerCharges.toString() || null,
                      },
                      dealerSubvention: {
                        isValid: true,
                        value:
                          loanData.dealerSubvention == undefined
                            ? ''
                            : loanData.dealerSubvention.toString() || null,
                      },
                      adminFees: {
                        isValid: true,
                        value:
                          loanData.adminFees == undefined
                            ? ''
                            : loanData.adminFees.toString() || null,
                      },
                      exShowroomPrice: {
                        isValid: true,
                        value:
                          loanData.exShowroom == undefined
                            ? ''
                            : loanData.exShowroom.toString() || null,
                      },
                      insurance: {
                        isValid: true,
                        value:
                          loanData.insurance == undefined
                            ? ''
                            : loanData.insurance.toString() || null,
                      },
                      nachCharges: {
                        isValid: true,
                        value:
                          loanData.nachCharges == undefined
                            ? ''
                            : loanData.nachCharges.toString() || null,
                      },
                      preEMI: {
                        isValid: true,
                        value:
                          loanData.preEmi == undefined
                            ? ''
                            : loanData.preEmi.toString() || null,
                      },
                      processingFees: {
                        isValid: true,
                        value:
                          loanData.processingFees !== undefined
                            ? loanData.processingFees.toString()
                            : null,
                      },
                      convenienceCharges: {
                        isValid: true,
                        value:
                          loanData.convenienceCharges !== undefined
                            ? loanData.convenienceCharges.toString()
                            : null,
                      },
                      podCharges: {
                        value:
                          loanData.pddCharges !== undefined
                            ? loanData.pddCharges.toString()
                            : null,
                        isValid: true,
                      },
                      stampDuty: {
                        value:
                          loanData.stampDuty !== undefined
                            ? loanData.stampDuty.toString()
                            : null,
                        isValid: true,
                      },
                      bureauCharges: {
                        isValid: true,
                        value:
                          loanData.bureauCharges !== undefined
                            ? loanData.bureauCharges.toString()
                            : null,
                      },
                      otherCharges: {
                        isValid: true,
                        value:
                          loanData.otherCharges !== undefined
                            ? loanData.otherCharges.toString()
                            : null,
                      },
                      processingCharges:
                        loanData.otherCharges !== undefined
                          ? loanData.otherCharges.toString()
                          : '',
                      premiumAmount: {
                        value:
                          loanData.premiumAmount !== undefined
                            ? loanData.premiumAmount.toString()
                            : '',
                        isValid: true,
                      },
                      nameNominee: {
                        value: loanData.name || '',
                        isValid: true,
                      },
                      addressNominee: {
                        value: loanData.address || '',
                        isValid: true,
                      },
                      selectedRelation: {
                        value: loanData.relationType || '',
                        isValid: true,
                      },
                      emi: Math.ceil(loanData.emi) || '',
                      idToEdit: loanData.id || null,
                      dateOfIncorporationText: loanData.dateOfBirth || '',
                      dobValid: true,
                      selectedSourceType2: loanData.isPremiumamount
                        ? 'Yes'
                        : 'No',
                      selectedSourceType: loanData.islifeInsurance
                        ? 'Yes'
                        : 'No',
                      selectedSubDealer: {
                        isValid: true,
                        value: loanData.subDealerName,
                        label: loanData.subDealerName,
                      },
                      ismainapplicant: loanData.ismainapplicant || false,
                      isguarantor: loanData.isguarantor || false,
                      leadCode:
                        this.props.userQDEDataSelector.leadCode ||
                        this.state.leadCode,
                      applicantUniqueId:
                        this.props.userQDEDataSelector.applicant_uniqueid ||
                        this.state.applicantUniqueId,
                      cancelButtonTitle: 'Cancel',
                      isDataSaved: true,
                    },
                    () => {
                      this.props.getSchemeCode({
                        data: {
                          dealerName: loanData.dealer_name,
                          location: this.state.branchName,
                        },
                        callback: (response) => {
                          var temp = '';
                          Object.keys(response.data).map((item, index) => {
                            response.data[item].schemeCode ==
                            loanData.schemeCode
                              ? (temp = response.data[item].dealerName)
                              : null;
                          });

                          this.props.getSchemeDetails({
                            data: {
                              dealerName: temp,
                              location: this.state.branchName,
                              schemeCode: loanData.schemeCode,
                              applicantUniqueId: this.state.applicantUniqueId,
                            },
                            callback: (response) => {
                              this.setState({
                                // stampDuty: {
                                //   value: response?.data?.state.toLowerCase() == "maharashtra" ? this.state.valueaR > 100000 ? "200" : "100" : "100",
                                //   isValid: true,
                                // },
                                nachChargesMaster: response?.data?.nachCharges,
                                stampDutyMaster: response?.data?.stampDuty,
                                pfAmountMaster: response?.data?.pfAmount,
                                pfAmountTypeMaster:
                                  response?.data?.pfAmountType,
                                pfAmount1: response?.data?.pfAmount,
                                premiumAmountFreez:
                                  response?.data?.premiumAmountFreez,
                              });
                            },
                          });
                        },
                      });

                      if (
                        this.state.loanVehicleDetails &&
                        this.state.loanVehicleDetails.value !== null
                      ) {
                        this.props.loanVehicleBRAND({
                          data: {
                            leadCode: this.state.leadCode,
                            vehicleType: this.state.loanVehicleDetails.label,
                          },
                          callback: (response) => {
                            const tempBrandArray = [];
                            for (const brand of response.data) {
                              tempBrandArray.push({
                                label: brand.vehiclebrand,
                                value: brand.vehiclebrand,
                                id: brand.id,
                              });
                            }
                            this.setState(
                              {
                                dropDownItemBrandofVehicle:
                                  [...tempBrandArray] || [],
                                loanVehicleBrand: {
                                  isValid: true,
                                  value: loanData.brand_nm || null,
                                  label: loanData.brand_nm || null,
                                },
                              },
                              () => {
                                if (
                                  this.state.loanVehicleBrand.label !== null
                                ) {
                                  this.props.loanVehicleMODEL({
                                    data: {
                                      leadCode: this.state.leadCode,
                                      vehicleBrand: this.state.loanVehicleBrand
                                        .label,
                                      vehicleType: this.state.loanVehicleDetails
                                        .label,
                                    },
                                    callback: (response) => {
                                      const tempModelArray = [];
                                      for (const model of response.data) {
                                        tempModelArray.push({
                                          label: model.model,
                                          value: model.model,
                                          id: model.id,
                                        });
                                      }

                                      this.setState(
                                        {
                                          dropDownItemModel:
                                            [...tempModelArray] || [],
                                          loanVehicleModel: {
                                            isValid: true,
                                            value: loanData.model || null,
                                            label: loanData.model || null,
                                          },
                                        },
                                        () => {
                                          if (
                                            this.state.loanVehicleModel
                                              .label !== null
                                          ) {
                                            this.props.loanVehicleSubMODEL({
                                              data: {
                                                leadCode: this.state.leadCode,
                                                model: this.state
                                                  .loanVehicleModel.label,
                                                vehicleBrand: this.state
                                                  .loanVehicleBrand.label,
                                                vehicleType: this.state
                                                  .loanVehicleDetails.label,
                                              },
                                              callback: (response) => {
                                                const tempSubModelArray = [];
                                                for (const subModel of response.data) {
                                                  tempSubModelArray.push({
                                                    label: subModel.submodel,
                                                    value: subModel.submodel,
                                                    id: subModel.id,
                                                  });
                                                }
                                                this.setState(
                                                  {
                                                    dropDownItemSubModel:
                                                      [...tempSubModelArray] ||
                                                      [],
                                                    loanVehicleSubModel: {
                                                      isValid: true,
                                                      value:
                                                        loanData?.submodel ||
                                                        null,
                                                      label:
                                                        loanData?.submodel ||
                                                        null,
                                                    },
                                                  },
                                                  () => {
                                                    this.props.getSchemeCode({
                                                      data: {
                                                        dealerName: this.state
                                                          .selectedDealer.value,
                                                        location: this.state
                                                          .branchName,
                                                      },
                                                      callback: (response) => {
                                                        var temp = [];
                                                        Object.keys(
                                                          response.data,
                                                        ).map((item, index) => {
                                                          temp.push({
                                                            label:
                                                              response.data[
                                                                item
                                                              ].schemeCode,
                                                            value:
                                                              response.data[
                                                                item
                                                              ].schemeCode,
                                                            id:
                                                              response.data[
                                                                item
                                                              ].id,
                                                            dealerName:
                                                              response.data[
                                                                item
                                                              ].dealerName,
                                                            schemeCode:
                                                              response.data[
                                                                item
                                                              ].schemeCode,
                                                          });
                                                        });
                                                        this.setState({
                                                          schemeCode:
                                                            temp || [],
                                                        });
                                                      },
                                                    });
                                                    if (
                                                      this.state
                                                        .loanVehicleSubModel
                                                        .label !== null
                                                    ) {
                                                      this.props.loanMaximumAmount(
                                                        {
                                                          data: {
                                                            leadCode: this.state
                                                              .leadCode,
                                                            submodel: this.state
                                                              .loanVehicleSubModel
                                                              .label,
                                                            vehicletype: this
                                                              .state
                                                              .loanVehicleDetails
                                                              .label,
                                                            vehiclebrand: this
                                                              .state
                                                              .loanVehicleBrand
                                                              .label,
                                                            model: this.state
                                                              .loanVehicleModel
                                                              .label,
                                                            location: this.state
                                                              .branchName,
                                                            exShowroom: this
                                                              .state
                                                              .exShowroomPrice
                                                              .value,
                                                            insurance: this
                                                              .state.insurance
                                                              .value,
                                                          },
                                                          callback: (
                                                            response,
                                                          ) => {
                                                            this.setState({
                                                              // approveAmount: Math.round(Number(response?.data?.maxamt) * Number(this?.state?.ltv) / 100),
                                                              maxAmount:
                                                                response?.data
                                                                  ?.maxamt ||
                                                                this.state
                                                                  .maxAmount,
                                                            });
                                                          },
                                                        },
                                                      );
                                                    }
                                                  },
                                                );
                                              },
                                            });
                                          }
                                        },
                                      );
                                    },
                                  });
                                }
                              },
                            );
                          },
                        });
                      }
                    },
                  );
                }
              },
            });
          },
        );
      },
    });
  };

  componentDidMount() {
    this.apiCall();
  }

  renderDropDownVehicle() {
    const {
      viewDrop1,
      separatorStyle,
      textStyle,
      textStyle1,
      textStyleDrop,
      errorLabel,
    } = LoanDetailsStyles;
    return (
      <View style={viewDrop1}>
        <Text style={textStyleDrop}>Vehicle Type*</Text>
        <DropDownPicker
          disabled={this.state.isViewOnly}
          items={this.state.dropDownItemVehicle}
          containerStyle={{flex: 1}}
          style={{backgroundColor: '#ffffff', borderWidth: 0}}
          itemStyle={{
            justifyContent: 'flex-start',
            marginLeft: 4,
          }}
          defaultValue={
            this.state.loanVehicleDetails.value !== ''
              ? this.state.loanVehicleDetails.value
              : LOANDETAILS_CONST.PLACEHOLDER_DROPDOWN_VEHICLE
          }
          dropDownStyle={{backgroundColor: '#ffffff'}}
          onChangeItem={(item) =>
            this.setState(
              {
                loanVehicleDetails: {...item, isValid: true},
                loanVehicleBrand: {isValid: true},
                loanVehicleModel: {isValid: true},
                loanVehicleSubModel: {isValid: true},
                dropDownItemModel: [],
                dropDownItemSubModel: [],
              },
              () => {
                this.props.loanVehicleBRAND({
                  data: {
                    leadCode: this.state.leadCode,
                    vehicleType: this.state.loanVehicleDetails.label,
                  },
                  callback: (response) => {
                    const tempBrandArray = [];
                    for (const brand of response.data) {
                      tempBrandArray.push({
                        label: brand.vehiclebrand,
                        value: brand.vehiclebrand,
                        id: brand.id,
                      });
                    }
                    this.setState({
                      dropDownItemBrandofVehicle: [...tempBrandArray] || [],
                      loanVehicleBrand: {isValid: true},
                      loanVehicleModel: {isValid: true},
                      dropDownItemModel: [],
                      loanVehicleSubModel: {isValid: true},
                      dropDownItemSubModel: [],
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
        {!this.state.loanVehicleDetails.isValid && (
          <Text style={errorLabel}>Vehicle name is mandatory.</Text>
        )}
      </View>
    );
  }

  renderDropDownBrandofVehicle() {
    const {
      viewDrop2,
      separatorStyle,
      textStyle,
      textStyle1,
      textStyleDrop,
      errorLabel,
    } = LoanDetailsStyles;

    return (
      <View style={viewDrop2}>
        <Text style={textStyleDrop}>Brand of Vehicle*</Text>
        <DropDownPicker
          disabled={this.state.isViewOnly}
          items={this.state.dropDownItemBrandofVehicle}
          containerStyle={{flex: 1}}
          style={{backgroundColor: '#ffffff', borderWidth: 0}}
          itemStyle={{
            justifyContent: 'flex-start',
            marginLeft: 4,
          }}
          defaultValue={
            this.state.loanVehicleBrand.value !== ''
              ? this.state.loanVehicleBrand.value
              : LOANDETAILS_CONST.PLACEHOLDER_DROPDOWN_BRANDOFVEHICLE
          }
          dropDownStyle={{backgroundColor: '#ffffff'}}
          onChangeItem={(item) =>
            this.setState(
              {
                loanVehicleBrand: {...item, isValid: true},
                loanVehicleModel: {isValid: true},
                loanVehicleSubModel: {isValid: true},
                dropDownItemSubModel: [],
              },
              () => {
                this.props.loanVehicleMODEL({
                  data: {
                    leadCode: this.state.leadCode,
                    vehicleBrand: this.state.loanVehicleBrand.label,
                    vehicleType: this.state.loanVehicleDetails.label,
                  },
                  callback: (response) => {
                    const tempModelArray = [];
                    for (const model of response.data) {
                      tempModelArray.push({
                        label: model.model,
                        value: model.model,
                        id: model.id,
                      });
                    }

                    this.setState({
                      dropDownItemModel: [...tempModelArray] || [],
                      loanVehicleModel: {isValid: true},
                      loanVehicleSubModel: {isValid: true},
                      dropDownItemSubModel: [],
                    });

                    this.props.loanDEALER({
                      data: {
                        branch: this.state.branchName,
                        employeeId: this.props.userDataSelector?.userData?.data
                          ?.employeeId,
                        brand: this.state.loanVehicleBrand.label,
                      },
                      callback: (response) => {
                        const tempDealerArray = [];
                        for (const dealer of response.data) {
                          tempDealerArray.push({
                            label: dealer.dealer_name,
                            value: dealer.dealer_name,
                            id: dealer.id,
                          });
                        }
                        this.setState({
                          dropDownItemDealer: [...tempDealerArray] || [],
                        });
                      },
                    });
                  },
                });
              },
            )
          }
          customArrowUp={() => <Image source={UP_ARROW} />}
          customArrowDown={() => <Image source={DOWN_ARROW} />}
          labelStyle={[textStyle, {color: colors.COLOR_BLACK}]}
          selectedLabelStyle={[textStyle1, {color: colors.COLOR_BLACK}]}
        />
        <View style={separatorStyle} />
        {!this.state.loanVehicleBrand.isValid && (
          <Text style={errorLabel}>Brand name is mandatory.</Text>
        )}
      </View>
    );
  }

  renderDropDownModel() {
    const {
      viewDrop3,
      separatorStyle,
      textStyle,
      textStyle1,
      textStyleDrop,
      errorLabel,
    } = LoanDetailsStyles;

    return (
      <View style={viewDrop3}>
        <Text style={textStyleDrop}>Model*</Text>
        <DropDownPicker
          disabled={this?.state?.isViewOnly}
          items={this?.state?.dropDownItemModel}
          containerStyle={{flex: 1}}
          style={{backgroundColor: '#ffffff', borderWidth: 0}}
          itemStyle={{
            justifyContent: 'flex-start',
            marginLeft: 4,
          }}
          defaultValue={
            this.state.loanVehicleModel.value !== ''
              ? this.state.loanVehicleModel.value
              : LOANDETAILS_CONST.PLACEHOLDER_DROPDOWN_MODEL
          }
          dropDownStyle={{backgroundColor: '#ffffff'}}
          onChangeItem={(item) =>
            this.setState(
              {
                loanVehicleModel: {...item, isValid: true},
                loanVehicleSubModel: {isValid: true},
              },
              () => {
                this.props.loanVehicleSubMODEL({
                  data: {
                    leadCode: this.state.leadCode,
                    model: this.state.loanVehicleModel.label,
                    vehicleBrand: this.state.loanVehicleBrand.label,
                    vehicleType: this.state.loanVehicleDetails.label,
                  },
                  callback: (response) => {
                    const tempSubModelArray = [];
                    for (const subModel of response.data) {
                      tempSubModelArray.push({
                        label: subModel.submodel,
                        value: subModel.submodel,
                        id: subModel.id,
                      });
                    }
                    this.setState({
                      dropDownItemSubModel: [...tempSubModelArray] || [],
                      loanVehicleSubModel: {isValid: true},
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
        {!this.state.loanVehicleModel.isValid && (
          <Text style={errorLabel}>Model name is mandatory.</Text>
        )}
      </View>
    );
  }

  renderDropDownSubModel() {
    const {
      viewDrop4,
      separatorStyle,
      textStyle,
      textStyle1,
      textStyleDrop,
      errorLabel,
    } = LoanDetailsStyles;
    return (
      <View style={viewDrop4}>
        <Text style={textStyleDrop}>Sub-Model*</Text>
        <DropDownPicker
          disabled={this.state.isViewOnly}
          items={this?.state?.dropDownItemSubModel}
          containerStyle={{flex: 1}}
          style={{backgroundColor: '#ffffff', borderWidth: 0}}
          itemStyle={{
            justifyContent: 'flex-start',
            marginLeft: 4,
          }}
          defaultValue={
            this?.state?.loanVehicleSubModel?.value !== ''
              ? this?.state?.loanVehicleSubModel?.value
              : LOANDETAILS_CONST.PLACEHOLDER_DROPDOWN_SUBMODEL
          }
          dropDownStyle={{backgroundColor: '#ffffff'}}
          onChangeItem={(item) =>
            this.setState(
              {
                loanVehicleSubModel: {...item, isValid: true},
              },
              () => {
                this.props.loanMaximumAmount({
                  data: {
                    leadCode: this.state.leadCode,
                    submodel: this.state.loanVehicleSubModel.label,
                    vehicletype: this.state.loanVehicleDetails.label,
                    vehiclebrand: this.state.loanVehicleBrand.label,
                    model: this.state.loanVehicleModel.label,
                    location: this.state.branchName,
                    exShowroom: this.state.exShowroomPrice.value,
                    insurance: this.state.insurance.value,
                  },
                  callback: (response) => {
                    this.setState({
                      // approveAmount: Math.round(Number(response?.data?.maxamt) * Number(this?.state?.ltv) / 100),
                      maxAmount: response?.data?.maxamt || this.state.maxAmount,
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
        {!this.state.loanVehicleSubModel.isValid && (
          <Text style={errorLabel}>Sub-Model name is mandatory.</Text>
        )}
      </View>
    );
  }

  renderDropDownDealer() {
    const {
      viewDrop5,
      separatorStyle,
      textStyle,
      textStyle1,
      textStyleDrop,
      errorLabel,
    } = LoanDetailsStyles;

    return (
      <View style={[viewDrop5, {marginBottom: 20}]}>
        <Text style={textStyleDrop}>Dealer Name*</Text>
        <DropDownPicker
          disabled={this.state.isViewOnly}
          items={this.state.dropDownItemDealer}
          containerStyle={{flex: 1}}
          style={{backgroundColor: '#ffffff', borderWidth: 0}}
          itemStyle={{
            justifyContent: 'flex-start',
            marginLeft: 4,
          }}
          placeholder={
            this.state.selectedDealer.value !== ''
              ? this.state.selectedDealer.value
              : LOANDETAILS_CONST.PLACEHOLDER_DROPDOWN_DEALER
          }
          dropDownStyle={{backgroundColor: '#ffffff'}}
          onChangeItem={(item) =>
            this.setState({selectedDealer: {...item, isValid: true}}, () => {
              this.props.getSchemeCode({
                data: {
                  dealerName: this.state.selectedDealer.value,
                  location: this.state.branchName,
                },
                callback: (response) => {
                  var temp = [];
                  Object.keys(response.data).map((item, index) => {
                    temp.push({
                      label: response.data[item].schemeCode,
                      value: response.data[item].schemeCode,
                      id: response.data[item].id,
                      dealerName: response.data[item].dealerName,
                      schemeCode: response.data[item].schemeCode,
                    });
                  });
                  this.setState({schemeCode: temp || []});
                },
              });
            })
          }
          customArrowUp={() => <Image source={UP_ARROW} />}
          customArrowDown={() => <Image source={DOWN_ARROW} />}
          labelStyle={textStyle}
          selectedLabelStyle={textStyle1}
        />
        <View style={separatorStyle} />
        {!this.state.selectedDealer.isValid && (
          <Text style={errorLabel}>Dealer name is mandatory.</Text>
        )}
      </View>
    );
  }

  renderDropDownSchemeCode() {
    const {
      viewDrop5,
      separatorStyle,
      textStyle,
      textStyle1,
      textStyleDrop,
      errorLabel,
      inputStyle,
      inputStyle1,
      inputTextPasswordStyle,
    } = LoanDetailsStyles;

    return (
      <>
        <View style={[viewDrop5, {marginBottom: 20}]}>
          <Text style={textStyleDrop}>Schemecode*</Text>
          <DropDownPicker
            disabled={this.state.isViewOnly}
            items={this.state.schemeCode}
            containerStyle={{flex: 1}}
            style={{backgroundColor: '#ffffff', borderWidth: 0}}
            itemStyle={{
              justifyContent: 'flex-start',
              marginLeft: 4,
            }}
            placeholder={
              this?.state?.selectedSchemeCode?.value !== null
                ? this.state.selectedSchemeCode.value
                : 'Please select schemecode'
            }
            dropDownStyle={{backgroundColor: '#ffffff'}}
            onChangeItem={(item) =>
              this.setState(
                {selectedSchemeCode: {...item, isValid: true}},
                () => {
                  this.props.getSchemeDetails({
                    data: {
                      dealerName: this.state.selectedSchemeCode.dealerName,
                      location: this.state.branchName,
                      schemeCode: this.state.selectedSchemeCode.schemeCode,
                      applicantUniqueId: this.state.applicantUniqueId,
                    },
                    callback: (response) => {
                      this.setState(
                        {
                          schemeDetails: response?.data || [],
                          startDate: response?.data?.startDate,
                          endDate: response?.data?.endDate,
                          opdAmount: response?.data?.opdCoverage,
                          schemeName: response?.data?.schemeName,
                          premiumAmount: {
                            value: response?.data?.klpiBracket,
                            isValid: true,
                          },
                          premiumAmountFreez:
                            response?.data?.premiumAmountFreez,
                          nachChargesMaster: response?.data?.nachCharges,
                          stampDutyMaster: response?.data?.stampDuty,
                          pfAmountMaster: response?.data?.pfAmount,
                          pfAmountTypeMaster: response?.data?.pfAmountType,
                          ltv: response?.data?.ltv,
                          // approveAmount: Math.round(this?.state?.maxAmount * response?.data?.ltv / 100),
                          otherCharges: {
                            value: response?.data?.anyOtherCharges,
                            isValid: true,
                          },
                          bureauCharges: {
                            value: response?.data?.bureauCharges,
                            isValid: true,
                          },
                          dealerSubvention: {
                            value:
                              response?.data?.dealerSubvention,
                            isValid: true,
                          },
                          nachCharges: {
                            value: response?.data?.nachCharges,
                            isValid: true,
                          },
                          podCharges: {
                            value: response?.data?.pdd,
                            isValid: true,
                          },
                          processingFees: {
                            value: response?.data?.pfAmount,
                            isValid: true,
                          },
                          pfAmount1: response?.data?.pfAmount,
                          preEMI: {
                            value: response?.data?.preEmiChanrges,
                            isValid: true,
                          },
                          valueRateofInterest: {
                            value: response?.data?.roi,
                            isValid: true,
                          },
                          stampDuty: {
                            value: response?.data?.stampDuty,
                            // .toLowerCase() == "maharashtra" ? this.state.valueaR > 100000 ? "200" : "100" : "100",
                            isValid: true,
                          },
                          pfAmountType: {
                            value: response?.data?.pfAmountType,
                            isValid: true,
                          },
                        },
                        () => {
                          this.emiamount();
                        },
                      );
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
          {!this.state.selectedSchemeCode.isValid && (
            <Text style={errorLabel}>Schemecode is mandatory.</Text>
          )}
        </View>

        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View style={{width: '45%', marginTop: 15}}>
            <FloatingLabelInput
              editable={false}
              label={'Start Date'}
              containerStyles={inputStyle1}
              value={this.state.startDate || undefined}
              customLabelStyles={{
                colorFocused: colors.COLOR_BLUE,
                colorBlurred: colors.COLOR_LIGHT_GREY,
                fontSizeFocused: 15,
                fontSizeBlurred: 15,
              }}
              inputStyles={inputTextPasswordStyle}
            />
            <View style={separatorStyle} />
          </View>

          <View style={{width: '45%', marginTop: 15}}>
            <FloatingLabelInput
              editable={false}
              label={'End Date'}
              containerStyles={inputStyle1}
              value={this.state.endDate || undefined}
              customLabelStyles={{
                colorFocused: colors.COLOR_BLUE,
                colorBlurred: colors.COLOR_LIGHT_GREY,
                fontSizeFocused: 15,
                fontSizeBlurred: 15,
              }}
              inputStyles={inputTextPasswordStyle}
            />
            <View style={separatorStyle} />
          </View>
        </View>

        <View style={{marginTop: 10}}>
          <FloatingLabelInput
            editable={!this.state.isViewOnly}
            label={'Scheme Name'}
            value={this.state.schemeName || undefined}
            containerStyles={inputStyle}
            maxLength={20}
            onChangeText={(text) => {
              const validName = NAME_REGEX.test(text);
              this.setState({schemeName: text, schemeNameValid: validName});
            }}
            customLabelStyles={{
              colorFocused: colors.COLOR_LIGHT_NAVY_BLUE,
              colorBlurred: colors.COLOR_LIGHT_GREY,
              fontSizeFocused: 15,
              fontSizeBlurred: 15,
            }}
            inputStyles={inputTextPasswordStyle}
          />
          <View style={[separatorStyle, {}]} />
          {!this.state.schemeNameValid && (
            <Text style={errorLabel}>
              {this.state.schemeName != ''
                ? 'Invalid scheme name'
                : 'Mobile Number is mandatory'}
            </Text>
          )}
        </View>
      </>
    );
  }

  renderDropDownSubDealer() {
    const {
      viewDrop,
      separatorStyle,
      textStyle,
      textStyle1,
      textStyleDrop,
      errorLabel,
      inputStyle,
      inputTextPasswordStyle,
      inputStyle1,
    } = LoanDetailsStyles;

    return (
      <>
        <View style={viewDrop}>
          <Text style={textStyleDrop}>Sub-Dealer Name</Text>
          <DropDownPicker
            disabled={this.state.isViewOnly}
            items={this.state.dropDownItemSubDealer}
            containerStyle={{flex: 1}}
            style={{backgroundColor: '#ffffff', borderWidth: 0}}
            itemStyle={{
              justifyContent: 'flex-start',
              marginLeft: 4,
            }}
            placeholder={
              this.state.selectedSubDealer.value !== ''
                ? this.state.selectedSubDealer.value
                : LOANDETAILS_CONST.PLACEHOLDER_DROPDOWN_SUBDEALER
            }
            dropDownStyle={{backgroundColor: '#ffffff'}}
            onChangeItem={(item) =>
              this.setState({selectedSubDealer: {...item, isValid: true}})
            }
            customArrowUp={() => <Image source={UP_ARROW} />}
            customArrowDown={() => <Image source={DOWN_ARROW} />}
            labelStyle={textStyle}
            selectedLabelStyle={textStyle1}
          />
          <View style={separatorStyle} />
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 20,
          }}>
          <View style={{width: '45%', marginTop: 15}}>
            {/* <NumberFormat thousandSeparator={true} thousandsGroupStyle="lakh"  value={'123456789'}/> */}
            <FloatingLabelInput
              editable={!this.state.isViewOnly}
              label={LOANDETAILS_CONST.EXSHOWROOM}
              containerStyles={inputStyle1}
              maxLength={10}
              keyboardType="numeric"
              value={this.state.exShowroomPrice.value || undefined}
              onChangeText={(text) => {
                this.setState(
                  {
                    exShowroomPrice: {
                      ...this.state.exShowroomPrice,
                      value: text,
                    },
                  },
                  () => {
                    this.isExShowRoomPrice(this.state.exShowroomPrice.value);
                    this.props.loanMaximumAmount({
                      data: {
                        leadCode: this.state.leadCode,
                        submodel: this.state.loanVehicleSubModel.label,
                        vehicletype: this.state.loanVehicleDetails.label,
                        vehiclebrand: this.state.loanVehicleBrand.label,
                        model: this.state.loanVehicleModel.label,
                        location: this.state.branchName,
                        exShowroom: this.state.exShowroomPrice.value,
                        insurance: this.state.insurance.value,
                      },
                      callback: (response) => {
                        this.setState({
                          // approveAmount: Math.round(Number(response?.data?.maxamt) * Number(this?.state?.ltv) / 100),
                          maxAmount:
                            response?.data?.maxamt || this.state.maxAmount,
                        });
                      },
                    });
                  },
                );
              }}
              customLabelStyles={{
                colorFocused: colors.COLOR_BLUE,
                colorBlurred: colors.COLOR_LIGHT_GREY,
                fontSizeFocused: 15,
                fontSizeBlurred: 15,
              }}
              inputStyles={inputTextPasswordStyle}
            />
            <View style={separatorStyle} />
            {!this.state.exShowroomPrice.isValid && (
              <Text style={errorLabel}>
                {this.state.exShowroomPrice.value === '' ||
                this.state.exShowroomPrice.value === null
                  ? LOANDETAILS_CONST.MANDATORY_EXSHOWROOM
                  : LOANDETAILS_CONST.VALID_EXSHOWROOM}
              </Text>
            )}
          </View>
          <View style={{width: '45%', marginTop: 15}}>
            <FloatingLabelInput
              editable={!this.state.isViewOnly}
              label={LOANDETAILS_CONST.INSURANCE}
              containerStyles={inputStyle1}
              maxLength={10}
              keyboardType="numeric"
              value={this.state.insurance.value || undefined}
              onChangeText={(text) => {
                this.setState(
                  {
                    insurance: {
                      ...this.state.insurance,
                      value: text,
                    },
                  },
                  () => {
                    this.isInsurance(this.state.insurance.value);
                    this.props.loanMaximumAmount({
                      data: {
                        leadCode: this.state.leadCode,
                        submodel: this.state.loanVehicleSubModel.label,
                        vehicletype: this.state.loanVehicleDetails.label,
                        vehiclebrand: this.state.loanVehicleBrand.label,
                        model: this.state.loanVehicleModel.label,
                        location: this.state.branchName,
                        exShowroom: this.state.exShowroomPrice.value,
                        insurance: this.state.insurance.value,
                      },
                      callback: (response) => {
                        this.setState({
                          // approveAmount: Math.round(Number(response?.data?.maxamt) * Number(this?.state?.ltv) / 100),
                          maxAmount:
                            response?.data?.maxamt || this.state.maxAmount,
                        });
                      },
                    });
                  },
                );
              }}
              customLabelStyles={{
                colorFocused: colors.COLOR_BLUE,
                colorBlurred: colors.COLOR_LIGHT_GREY,
                fontSizeFocused: 15,
                fontSizeBlurred: 15,
              }}
              inputStyles={inputTextPasswordStyle}
            />
            <View style={separatorStyle} />
            {!this.state.insurance.isValid && (
              <Text style={errorLabel}>
                {this.state.insurance.value === '' ||
                this.state.insurance.value === null
                  ? LOANDETAILS_CONST.MANDATORY_INSURNCE
                  : LOANDETAILS_CONST.VALID_INSURNCE}
              </Text>
            )}
          </View>
        </View>
      </>
    );
  }

  renderSlider() {
    const {
      inputStyle,
      inputTextPasswordStyle,
      separatorStyle,
      errorLabel,
      cancelButtonStyle,
      cancelButtonTitleStyle,
      buttonContainer,
      textEMI,
      textEMIRIGHT,
    } = LoanDetailsStyles;

    return (
      <View style={{marginTop: 20}}>
        <Text style={{marginLeft: 4, color: 'black', fontSize: 16}}>
          Finance Required*
        </Text>
        <Slider
          style={{width: '100%', height: 40}}
          disabled={this.state.isViewOnly}
          value={parseFloat(this.state.amountSelected)}
          onValueChange={(amountSelected) => {
            if (amountSelected != 0 && amountSelected != null) {
              this.setState({amountSelected, valueaR1: amountSelected});
            }
          }}
          minimumValue={25000}
          maximumValue={this.state.maxAmount}
          minimumTrackTintColor="#16244f"
          maximumTrackTintColor="#4a4a4a"
          step={100}
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: -10,
          }}>
          <Text style={textEMI}>25K</Text>
          <Text style={textEMIRIGHT}>{this?.state?.maxAmount?.toString()}</Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: 15,
          }}>
          {/* <View style={{marginTop: 25, backgroundColor:'red'}}/> */}
          <Text style={textEMI}>
            {`Amount Selected`}: {'\u20B9'}
          </Text>

          <TextInput
            style={{
              height: 40,
              width: '20%',
              marginTop: -10,
              borderBottomWidth: 0.6,
              textAlign: 'center',
            }}
            keyboardType="numeric"
            defaultValue={this?.state?.amountSelected?.toString()}
            editable={!this.state.isViewOnly}
            onChangeText={(text) => {
              this.setState({valueaR1: text});
              if (!isNaN(text)) {
                if (text > 0 && text <= this.state.maxAmount) {
                  this.setState(
                    {
                      amountSelected: text,
                    },
                    () => {
                      this.emiamount();
                    },
                  );
                }
              }
            }}
          />
        </View>
        <Text style={errorLabel}>
          {this.state.valueaR1 <= this.state.maxAmount == false
            ? `Please select the amount between 25,000 to ${this.state.maxAmount}.`
            : null}
        </Text>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginVertical: 20,
          }}>
          <Button
            title={'Get Approved Loan \nAmount'}
            customContainerStyle={{width: '55%'}}
            isDisabled={
              this.state.amountSelected == 0 ||
              !(this.state.valueaR1 <= this.state.maxAmount)
            }
            onPress={() => {
              Keyboard.dismiss();
              this.isLoanVehicleBrand();
              this.isLoanVehicleDetails();
              this.isLoanVehicleModel();
              this.isLoanVehicleSubModel();
              this.isSelectedDealer();
              this.isSechemeCode();
              this.isPFType();
              this.isValueRateofInterest(this.state.valueRateofInterest.value);
              this.isDealerCharges(this.state.dealerCharges.value);
              this.isProcessingFees(this.state.processingFees.value);
              this.isDealerPayout(this.state.dealerPayout.value);
              this.isInsurance(this.state.insurance.value);
              this.isExShowRoomPrice(this.state.exShowroomPrice.value);
              this.isBureauCharges(this.state.bureauCharges.value);
              this.isOtherCharges(this.state.otherCharges.value);
              this.isSelectedSourceValid();
              // uncomment opd
              // this.isSelectedSourceValid3(),
              // this.isSelectedSourceValid4(),
              this.state.selectedSourceType == 'Yes'
                ? (this.isPremiumAmount(this.state.premiumAmount.value),
                  this.isNameNominee(this.state.nameNominee.value),
                  this.isRelation(this.state.selectedRelation.value),
                  this.isDobValid(),
                  // this.state.invalidDate == true ? false : true,
                  this.isSelectedSourceValid2(),
                  this.isAddressNominee(this.state.addressNominee.value))
                : null;

              this.isDealerSubvention(this.state.dealerSubvention.value);
              this.isAdminFees(this.state.adminFees.value);
              this.isNachCharges(this.state.nachCharges.value);
              this.isPreEMI(this.state.preEMI.value);
              this.isPodCharges(this.state.podCharges.value);
              this.isConvenienceCharges(this.state.convenienceCharges.value);
              this.isStampDuty(this.state.stampDuty.value);
              // this.isDealerPayoutType();

              if (this.state.valuetR < 6) {
                handleError('Tenure is less than 6 month');
              } else if (this.state.valueTenure == 0) {
                handleError('Tenure is less thaff 6 month');
              } else if (this.state.valuetR > 36) {
                handleError('Tenure is greater than 36 month');
              } else if (
                this.state.loanVehicleDetails.value != null &&
                this.state.loanVehicleDetails.value != '' &&
                this.state.loanVehicleBrand.value != null &&
                this.state.loanVehicleBrand.value != '' &&
                this.state.loanVehicleModel.value != null &&
                this.state.loanVehicleModel.value != '' &&
                this.state.valueRateofInterest.value != '' &&
                this.state.valueRateofInterest.value != null &&
                this.state.valueRateofInterest.isValid &&
                this.state.loanVehicleSubModel.value != null &&
                this.state.loanVehicleSubModel.value != '' &&
                this.state.selectedDealer.value != null &&
                this.state.selectedDealer.value != '' &&
                this.state.selectedSchemeCode.value != null &&
                this.state.selectedSchemeCode.value != '' &&
                this.state.selectedDealer.value != null &&
                this.state.selectedDealer.value != '' &&
                this.state.dealerCharges.value != null &&
                this.state.dealerCharges.value != '' &&
                this.state.dealerSubvention.value != null &&
                this.state.dealerSubvention.value != '' &&
                this.state.adminFees.value != null &&
                this.state.adminFees.value != '' &&
                this.state.nachCharges.value != null &&
                this.state.nachCharges.value != '' &&
                this.state.nachCharges.isValid &&
                this.state.preEMI.value != null &&
                this.state.preEMI.value != '' &&
                this.state.podCharges.value != null &&
                this.state.podCharges.value != '' &&
                this.state.convenienceCharges.value != null &&
                this.state.convenienceCharges.value != '' &&
                this.state.exShowroomPrice.value != null &&
                this.state.exShowroomPrice.value != undefined &&
                this.state.exShowroomPrice.value != '' &&
                this.state.exShowroomPrice.isValid &&
                this.state.insurance.value != null &&
                this.state.insurance.value != undefined &&
                this.state.insurance.value != '' &&
                this.state.insurance.isValid &&
                this.state.stampDuty.value != null &&
                this.state.stampDuty.value != '' &&
                this.state.stampDuty.isValid &&
                this.state.pfAmountType.value != null &&
                this.state.pfAmountType.value != '' &&
                this.state.pfAmountType.isValid &&
                this.state.processingFees.value != null &&
                this.state.processingFees.value != '' &&
                this.state.processingFees.isValid &&
                this.state.dealerPayout.value != null &&
                this.state.dealerPayout.value != undefined &&
                this.state.dealerPayout.value != '' &&
                this.state.dealerPayout.isValid &&
                this.state.dealerPayoutType.isValid &&
                this.state.bureauCharges.value != null &&
                this.state.bureauCharges.value != '' &&
                this.state.otherCharges.value != null &&
                this.state.otherCharges.value != '' &&
                // uncomment opd
                // this.state.selectedSourceType3 != "" &&
                // this.state.selectedSourceType4 != "" &&
                this.state.schemeNameValid &&
                (this.state.selectedSourceType == 'Yes'
                  ? this.state.selectedSourceType2 != '' &&
                    this.state.premiumAmount.value !== '' &&
                    this.state.nameNominee.value !== '' &&
                    this.state.selectedRelation.value !== null &&
                    this.state.selectedRelation.value != '' &&
                    this.state.invalidDate !== true &&
                    this.state.addressNominee.value !== null &&
                    this.state.addressNominee.value != ''
                  : this.state.selectedSourceType != '')
              ) {
                this.state.processingFees.isValid
                  ? this.props.getApprovedLoanAmount({
                      data: {
                        emi: this.state.emi,
                        isOpdCoverage: this.state.selectedSourceType3,
                        opdCoverage: this.state.opdAmount,
                        isOpdAddedInLoan: this.state.selectedSourceType4,
                        pfAmountTypeMaster: this.state.pfAmountTypeMaster,
                        nachChargesMaster: this.state.nachChargesMaster,
                        stampDutyMaster: this.state.stampDutyMaster,
                        pfAmountMaster: this.state.pfAmountMaster,
                        valueaR: Number(this.state.valueaR),
                        // this.state.selectedSourceType2 == 'Yes' ?
                        //   Number(this.state.valueaR) + Number(this.state.premiumAmount.value) : Number(this.state.valueaR),
                        valuetR: this.state.valuetR,
                        premiumAmount: this.state.premiumAmount.value,
                        relationType: this.state.selectedRelation.value,
                        otherCharges: this.state.otherCharges.value,
                        processingFees: this.state.processingFees.value,
                        rateOfInterest: this.state.valueRateofInterest.value,
                        loanVehicleBrand: this.state.loanVehicleBrand.value,
                        isPremiumamount: this.state.selectedSourceType2,
                        applicantUniqueId: this.state.applicantUniqueId,
                        loanVehicleModel: this.state.loanVehicleModel.value,
                        id: this.state.idToEdit,
                        maxAmt: this.state.maxAmount,
                        startDate: this.state.startDate,
                        endDate: this.state.endDate,
                        schemeCode: this.state.selectedSchemeCode.value,
                        schemeName: this.state.schemeName,
                        ltv: this.state.ltv,
                        pfAmountType: this.state.pfAmountType.value,
                        pfAmountMaster: this.state.pfAmount1,
                        //insuranceAmount: this.state.insuranceAmount.value,
                        bureauCharges: this.state.bureauCharges.value,
                        address: this.state.addressNominee.value,
                        loanVehicleSubModel: this.state.loanVehicleSubModel
                          .value,
                        loanVehicleDetails: this.state.loanVehicleDetails.value,
                        dateOfBirth: this.state.dateOfIncorporationText,
                        isguarantor: false,
                        leadCode: this.state.leadCode,
                        subDealerName: this.state.selectedSubDealer.value,
                        name: this.state.nameNominee.value,
                        selectedDealer: this.state.selectedDealer.value,
                        islifeInsurance:
                          this.state.selectedSourceType === 'Yes'
                            ? true
                            : false,
                        ismainapplicant: true,
                        dealerCharges: this.state.dealerCharges.value,
                        dealerSubvention: this.state.dealerSubvention.value,
                        adminFees: this.state.adminFees.value,
                        exShowroomPrice: this.state.exShowroomPrice.value,
                        insurance: this.state.insurance.value,
                        nachCharges: this.state.nachCharges.value,
                        preEmi: this.state.preEMI.value,
                        convenienceCharges: this.state.convenienceCharges.value,
                        pddCharges: this.state.podCharges.value,
                        dealerPayout: this.state.dealerPayout.value,
                        dealerPayouttype: this?.state?.dealerPayoutType?.value?.toLowerCase(),
                        stampDuty: this.state.stampDuty.value,
                        amountSelected: this.state.amountSelected,
                      },
                      callback: (response) => {
                        this.setState(
                          {
                            valueaR: response.data.amt_requested,
                            ltvGridPercentage: response.data.ltvGridPercentage,
                            ltvGridId: response.data.ltvGridId,
                            ltvGridRule: response.data.ltvGridRule,
                            saveEnable: false,
                          },
                          () => {
                            this.emiamount();
                            // this.isProcessingFees(this.state.processingFees.value);
                          },
                        );
                      },
                    })
                  : null;
              }
            }}
          />
        </View>

        {this.state.valueaR != '' ? (
          <Text style={[textEMI, {fontSize: 16, marginTop: 15}]}>
            {` ${`Approved Loan Amount: ${'\u20B9'} ${Number(this.state.valueaR)
              .toFixed(2)
              .toString()
              .replace('-', '')}`}`}
              
          </Text>
        ) : null}
        {this.state.valueaR != '' ? (
          <Text style={[textEMI, {fontSize: 16, marginTop: 20}]}>
            {` ${`Amount Requested: ${'\u20B9'} ${Number(
              this.state.valueaR,
            ).toFixed(2)}`}`}{' '}
          </Text>
        ) : null}
        {/* {this.state.valueaR != '' ?
          <Text style={[textEMI, { fontSize: 16, marginTop: 20 }]}>{` ${`Processing Fees (5%): ${'\u20B9'} ${Number(this.state.processingCharges)}`}`} </Text>
          : null} */}
        {console.log(
          'mmmmmmm',
          (Number(this.state.valueaR) - Number(this.state.processingFees.value))
            .toString()
            .replace('-', '') -
            Number((18 / 100) * Number(this.state.processingFees.value)) -
            Number(this.state.nachCharges.value) -
            Number(this.state.podCharges.value) -
            Number(this.state.dealerCharges.value) -
            Number(this.state.bureauCharges.value) -
            Number(this.state.otherCharges.value),
        )}

        {/* Loan Amount - Processing Fees - GST on prossessing fees - NACH Charges - PDD Charges - Dealer Charges - Bureau Charges - Other Charges */}
        {/* { tempValue = 18 /100 * (Number(this.state.processingCharges) )} */}
        {console.log(
          'proceeee',
          Number(this.state.valueaR),
          (18 / 100) * Number(this.state.processingCharges),
        )}
        {console.log('processingCharges', Number(this.state.processingCharges))}
        {console.log('processingFees', Number(this.state.processingFees.value))}
        {console.log('nachCharges', Number(this.state.nachCharges.value))}
        {console.log('podCharges', Number(this.state.podCharges.value))}
        {console.log('dealerCharges', Number(this.state.dealerCharges.value))}
        {console.log('bureauCharges', Number(this.state.bureauCharges.value))}
        {console.log('otherCharges', Number(this.state.otherCharges.value))}

        {this.state.valueaR != '' ? (
          <Text style={[textEMI, {fontSize: 16, marginTop: 15}]}>
            {` ${`Net disbursement amount: ${'\u20B9'} ${Number(
              Number(this.state.valueaR) -
                Number(this.state.processingFees.value) -
                Number(this.state.gstonProcessingFee) -
                Number(this.state.nachCharges.value) -
                Number(this.state.podCharges.value) -
                Number(this.state.dealerCharges.value) -
                Number(this.state.bureauCharges.value) -
                Number(this.state.otherCharges.value),
            ).toFixed(2)}`}`}
          </Text>
        ) : null}

        {console.log(
          'vvvvvvv',
          (Number(this.state.valueaR), Number(this.state.processingCharges))
            .toString()
            .replace('-', ''),
          Number((18 / 100) * Number(this.state.processingCharges)),
          Number(this.state.nachCharges.value),
          Number(this.state.podCharges.value),
          Number(this.state.dealerCharges.value),
          Number(this.state.bureauCharges.value),
          Number(this.state.otherCharges.value),
        )}
        {this.state.valueaR != '' ? (
          <Text style={[textEMI, {fontSize: 16, marginTop: 20, padding: 5}]}>
            {`To increase LTV on above Approved Loan , add Ownership Proof`}{' '}
          </Text>
        ) : null}

        <View style={[separatorStyle, {marginTop: 25, marginBottom: 25}]} />
        <Text
          style={{
            marginLeft: 4,
            color: 'black',
            fontSize: 16,
          }}>
          Tenure Required*
        </Text>
        <Slider
          style={{width: '100%', height: 40}}
          disabled={this.state.isViewOnly}
          value={parseFloat(this.state.valuetR)}
          onValueChange={(valuetR) =>
            this.setState({valuetR}, () => {
              this.setState({valueTenure: valuetR});
            })
          }
          minimumValue={6}
          maximumValue={36}
          minimumTrackTintColor="#16244f"
          maximumTrackTintColor="#4a4a4a"
          step={1}
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 10,
            marginTop: -10,
          }}>
          <Text style={textEMI}>6 Months</Text>
          <Text style={textEMIRIGHT}>36 Months</Text>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <Text style={textEMI}>Tenure selected:</Text>
          <TextInput
            style={{
              height: 40,
              width: '20%',
              marginTop: -10,
              borderBottomWidth: 0.6,
              textAlign: 'center',
            }}
            keyboardType="numeric"
            editable={!this.state.isViewOnly}
            onChangeText={(valuetR) => {
              if (!isNaN(valuetR)) {
                if (valuetR > 0) {
                  this.setState({valuetR, valueTenure: valuetR}, () =>
                    this.emiamount(),
                  );
                }
              }
            }}
            defaultValue={this.state.valuetR.toString()}
          />
          <Text style={textEMI}>Months</Text>
        </View>

        <View style={[separatorStyle, {marginTop: 25, marginBottom: 10}]} />
        <FloatingLabelInput
          editable={!this.state.isViewOnly}
          label={LOANDETAILS_CONST.ROI}
          value={this.state.valueRateofInterest.value || undefined}
          containerStyles={inputStyle}
          keyboardType={'number-pad'}
          maxLength={5}
          onChangeText={(text) => {
            this.setState(
              {
                valueRateofInterest: {
                  ...this.state.valueRateofInterest,
                  value: text,
                  isValid: roiRegex.test(text),
                },
              },
              () => {
                // this.isValueRateofInterest(this.state.valueRateofInterest.value);
                this.emiamount();
              },
            );
          }}
          customLabelStyles={{
            colorFocused: colors.COLOR_BLUE,
            colorBlurred: colors.COLOR_LIGHT_GREY,
            fontSizeFocused: 15,
            fontSizeBlurred: 15,
          }}
          inputStyles={inputTextPasswordStyle}
        />
        <View style={separatorStyle} />
        {!this.state.valueRateofInterest.isValid && (
          <Text style={errorLabel}>
            {this.state.valueRateofInterest.value === '' ||
            this.state.valueRateofInterest.value === null
              ? LOANDETAILS_CONST.MANDATORY_ROI
              : LOANDETAILS_CONST.VALID_ROI}
          </Text>
        )}
        <View style={{flexDirection: 'row', marginTop: 10}}>
          <Text style={inputTextPasswordStyle}>EMI Amount is:</Text>
          {this.state.emi != '' && (
            <Text style={inputTextPasswordStyle}>{this.state.emi}</Text>
          )}
        </View>
        <View style={[separatorStyle, {marginTop: 25}]} />
      </View>
    );
  }

  renderCharges() {
    const {
      errorLabel,
      inputStyle1,
      inputTextPasswordStyle,
      separatorStyle,
      textStyle,
      textStyle1,
      textStyleDrop,
    } = LoanDetailsStyles;

    return (
      <View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View style={{width: '45%', marginTop: 15}}>
            {/* <NumberFormat thousandSeparator={true} thousandsGroupStyle="lakh"  value={'123456789'}/> */}

            <FloatingLabelInput
              editable={false}
              // {!this.state.isViewOnly}
              label={LOANDETAILS_CONST.DEALERSUBVENTION}
              containerStyles={inputStyle1}
              maxLength={10}
              keyboardType="numeric"
              value={this.state.dealerSubvention.value || undefined}
              onChangeText={(text) => {
                this.setState(
                  {
                    dealerSubvention: {
                      ...this.state.dealerSubvention,
                      value: text,
                    },
                  },
                  () => {
                    this.isDealerSubvention(this.state.dealerSubvention.value);
                  },
                );
              }}
              customLabelStyles={{
                colorFocused: colors.COLOR_BLUE,
                colorBlurred: colors.COLOR_LIGHT_GREY,
                fontSizeFocused: 15,
                fontSizeBlurred: 15,
              }}
              inputStyles={inputTextPasswordStyle}
            />
            <View style={separatorStyle} />
            {!this.state.dealerSubvention.isValid && (
              <Text style={errorLabel}>
                {this.state.dealerSubvention.value === '' ||
                this.state.dealerSubvention.value === null
                  ? LOANDETAILS_CONST.MANDATORY_DEALERSUBVENTION
                  : LOANDETAILS_CONST.VALID_DEALERSUBVENTION}
              </Text>
            )}
          </View>
          <View style={{width: '45%', marginTop: 15}}>
            <FloatingLabelInput
              // editable={!this.state.isViewOnly}
              editable={false}
              label={LOANDETAILS_CONST.ADMINFEES}
              containerStyles={inputStyle1}
              maxLength={10}
              keyboardType="numeric"
              value={this.state.adminFees.value || undefined}
              onChangeText={(text) => {
                this.setState(
                  {
                    adminFees: {
                      ...this.state.adminFees,
                      value: text,
                    },
                  },
                  () => {
                    this.isAdminFees(this.state.adminFees.value);
                  },
                );
              }}
              customLabelStyles={{
                colorFocused: colors.COLOR_BLUE,
                colorBlurred: colors.COLOR_LIGHT_GREY,
                fontSizeFocused: 15,
                fontSizeBlurred: 15,
              }}
              inputStyles={inputTextPasswordStyle}
            />
            <View style={separatorStyle} />
            {!this.state.adminFees.isValid && (
              <Text style={errorLabel}>
                {this.state.adminFees.value === '' ||
                this.state.adminFees.value === null
                  ? LOANDETAILS_CONST.MANDATORY_ADMIN
                  : LOANDETAILS_CONST.VALID_ADMIN}
              </Text>
            )}
          </View>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View style={{width: '45%', marginTop: 15}}>
            <FloatingLabelInput
              // editable={!this.state.isViewOnly}
              editable={false}
              label={LOANDETAILS_CONST.NACHCHARGES}
              containerStyles={inputStyle1}
              maxLength={10}
              keyboardType="numeric"
              value={this.state.nachCharges.value || undefined}
              onChangeText={(text) => {
                this.setState(
                  {
                    nachCharges: {
                      ...this.state.nachCharges,
                      value: text,
                    },
                  },
                  () => {
                    this.isNachCharges(this.state.nachCharges.value);
                  },
                );
              }}
              customLabelStyles={{
                colorFocused: colors.COLOR_BLUE,
                colorBlurred: colors.COLOR_LIGHT_GREY,
                fontSizeFocused: 15,
                fontSizeBlurred: 15,
              }}
              inputStyles={inputTextPasswordStyle}
            />
            <View style={separatorStyle} />
            {!this.state.nachCharges.isValid && (
              <Text style={errorLabel}>
                {this.state.nachCharges.value === '' ||
                this.state.nachCharges.value === null
                  ? LOANDETAILS_CONST.MANDATORY_NACH
                  : `Nach Charges must be greater than ${this.state.nachChargesMaster}`}
              </Text>
            )}
          </View>

          <View style={{width: '45%', marginTop: 15}}>
            <FloatingLabelInput
              // editable={!this.state.isViewOnly}
              editable={false}
              label={LOANDETAILS_CONST.PREEMI}
              containerStyles={inputStyle1}
              maxLength={10}
              keyboardType="numeric"
              value={this.state.preEMI.value || undefined}
              onChangeText={(text) => {
                this.setState(
                  {
                    preEMI: {
                      ...this.state.preEMI,
                      value: text,
                    },
                  },
                  () => {
                    this.isPreEMI(this.state.preEMI.value);
                  },
                );
              }}
              customLabelStyles={{
                colorFocused: colors.COLOR_BLUE,
                colorBlurred: colors.COLOR_LIGHT_GREY,
                fontSizeFocused: 15,
                fontSizeBlurred: 15,
              }}
              inputStyles={inputTextPasswordStyle}
            />
            <View style={separatorStyle} />
            {!this.state.preEMI.isValid && (
              <Text style={errorLabel}>
                {this.state.preEMI.value === '' ||
                this.state.preEMI.value === null
                  ? LOANDETAILS_CONST.MANDATORY_PREEMI
                  : LOANDETAILS_CONST.VALID_PREEMI}
              </Text>
            )}
          </View>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View style={{width: '45%', marginTop: 15}}>
            <FloatingLabelInput
              editable={false} //{!this.state.isViewOnly}
              label={LOANDETAILS_CONST.PDDCHARGES}
              containerStyles={inputStyle1}
              maxLength={10}
              keyboardType="numeric"
              value={this.state.podCharges.value || undefined}
              onChangeText={(text) => {
                this.setState(
                  {
                    podCharges: {
                      ...this.state.podCharges,
                      value: text,
                    },
                  },
                  () => {
                    this.isPodCharges(this.state.podCharges.value);
                  },
                );
              }}
              customLabelStyles={{
                colorFocused: colors.COLOR_BLUE,
                colorBlurred: colors.COLOR_LIGHT_GREY,
                fontSizeFocused: 15,
                fontSizeBlurred: 15,
              }}
              inputStyles={inputTextPasswordStyle}
            />
            <View style={separatorStyle} />
            {!this.state.podCharges.isValid && (
              <Text style={errorLabel}>
                {this.state.podCharges.value === '' ||
                this.state.podCharges.value === null
                  ? LOANDETAILS_CONST.MANDATORY_PDD
                  : LOANDETAILS_CONST.VALID_PDD}
              </Text>
            )}
          </View>

          <View style={{width: '45%', marginTop: 15}}>
            <FloatingLabelInput
              // editable={!this.state.isViewOnly}
              editable={false}
              label={LOANDETAILS_CONST.CONVENIENCECHARGES}
              containerStyles={inputStyle1}
              maxLength={10}
              keyboardType="numeric"
              value={this.state.convenienceCharges.value || undefined}
              onChangeText={(text) => {
                this.setState(
                  {
                    convenienceCharges: {
                      ...this.state.convenienceCharges,
                      value: text,
                    },
                  },
                  () => {
                    this.isConvenienceCharges(
                      this.state.convenienceCharges.value,
                    );
                  },
                );
              }}
              customLabelStyles={{
                colorFocused: colors.COLOR_BLUE,
                colorBlurred: colors.COLOR_LIGHT_GREY,
                fontSizeFocused: 15,
                fontSizeBlurred: 15,
              }}
              inputStyles={inputTextPasswordStyle}
            />
            <View style={separatorStyle} />
            {!this.state.convenienceCharges.isValid && (
              <Text style={errorLabel}>
                {this.state.convenienceCharges.value === '' ||
                this.state.convenienceCharges.value === null
                  ? LOANDETAILS_CONST.MANDATORY_CONVENIENCE
                  : LOANDETAILS_CONST.VALID_CONVENIENCE}
              </Text>
            )}
          </View>
        </View>

        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View style={{width: '45%', marginTop: 15}}>
            <FloatingLabelInput
              // editable={!this.state.isViewOnly}
              editable={false}
              label={LOANDETAILS_CONST.DEALERCHARGES}
              containerStyles={inputStyle1}
              maxLength={10}
              keyboardType="numeric"
              value={this.state.dealerCharges.value || undefined}
              onChangeText={(text) => {
                this.setState(
                  {
                    dealerCharges: {
                      ...this.state.dealerCharges,
                      value: text,
                    },
                  },
                  () => {
                    this.isDealerCharges(this.state.dealerCharges.value);
                  },
                );
              }}
              customLabelStyles={{
                colorFocused: colors.COLOR_LIGHT_NAVY_BLUE,
                colorBlurred: colors.COLOR_LIGHT_GREY,
                fontSizeFocused: 15,
                fontSizeBlurred: 15,
              }}
              inputStyles={inputTextPasswordStyle}
            />
            <View style={separatorStyle} />
            {!this.state.dealerCharges.isValid && (
              <Text style={errorLabel}>
                {this.state.dealerCharges.value === '' ||
                this.state.dealerCharges.value === null
                  ? LOANDETAILS_CONST.MANDATORY_DEALERCHARGES
                  : LOANDETAILS_CONST.VALID_DEALERCHARGES}
              </Text>
            )}
          </View>
        </View>

        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View style={{width: '45%', marginTop: 13}}>
            <Text style={[textStyleDrop, {fontSize: 15, fontWeight: '900'}]}>
              PF Amount Type*
            </Text>
            <DropDownPicker
              // disabled={this.state.isViewOnly}
              disabled={true}
              items={this.state.dropDownDealerPayout}
              style={{backgroundColor: '#ffffff', borderWidth: 0}}
              itemStyle={{
                justifyContent: 'flex-start',
                marginLeft: 4,
              }}
              placeholder={
                this.state.pfAmountType.value !== ''
                  ? this.state.pfAmountType.value
                  : 'PF Amount Type'
              }
              dropDownStyle={{backgroundColor: '#ffffff'}}
              onChangeItem={(item) =>
                this.setState({
                  pfAmountType: {...item, isValid: true},
                  processingFees: {value: null, isValid: true},
                })
              }
              customArrowUp={() => <Image source={UP_ARROW} />}
              customArrowDown={() => <Image source={DOWN_ARROW} />}
              labelStyle={textStyle}
              selectedLabelStyle={textStyle1}
            />
            <View style={[separatorStyle]} />
            {!this.state.pfAmountType.isValid && (
              <Text style={errorLabel}>PF Amount Type is mandatory.</Text>
            )}
          </View>
          <View style={{width: '45%', flexDirection: 'row'}}>
            <View
              style={{
                width:
                  this.state.pfAmountType.value == 'Number' ? '100%' : '80%',
                marginTop: 14,
              }}>
              <FloatingLabelInput
                // editable={!this.state.isViewOnly}
                editable={false}
                label={LOANDETAILS_CONST.PROCESSINGFEES}
                containerStyles={inputStyle1}
                maxLength={10}
                keyboardType="numeric"
                value={
                  this.state.processingFees.value
                    ? this.state.processingFees.value
                    : 5
                }
                // onChangeText={(text) => {
                //   this.setState({
                //     processingFees: {
                //       ...this.state.processingFees,
                //       value: text,
                //     }
                //   }, () => {
                //     this.isProcessingFees(this.state.processingFees.value);
                //   });
                // }}
                customLabelStyles={{
                  colorFocused: colors.COLOR_LIGHT_NAVY_BLUE,
                  colorBlurred: colors.COLOR_LIGHT_GREY,
                  fontSizeFocused: 15,
                  fontSizeBlurred: 15,
                }}
                inputStyles={inputTextPasswordStyle}
              />
              <View style={separatorStyle} />
              {!this.state.processingFees.isValid && (
                <Text style={errorLabel}>
                  {this.state.processingFees.value === '' ||
                  this.state.processingFees.value === null
                    ? LOANDETAILS_CONST.MANDATORY_PROCESSINGFEES
                    : this.state.pfAmountType.value === 'Number' &&
                      (parseInt(this.state.processingFees.value) <
                        parseInt(this.state.pfAmount1) ||
                        parseInt(this.state.processingFees.value) ==
                          parseInt(this.state.pfAmount1))
                    ? `Amount cannot be lesser than ${this.state.pfAmount1} Rs`
                    : this.state.pfAmountType.value === 'Percent'
                    ? null
                    : LOANDETAILS_CONST.VALID_PROCESSINGFEES}
                </Text>
              )}
            </View>
            {/* {
              this.state.pfAmountType.value != 'Number' ?
                <View style={{ width: '20%', marginTop: 45 }}>
                  <Text>%</Text>
                </View>
                : null
            } */}
          </View>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View style={{width: '45%', marginTop: 15}}>
            <FloatingLabelInput
              // editable={!this.state.isViewOnly}
              editable={false}
              label={LOANDETAILS_CONST.STAMPDUTY}
              containerStyles={inputStyle1}
              maxLength={10}
              keyboardType="numeric"
              value={this.state.stampDuty.value || undefined}
              onChangeText={(text) => {
                this.setState(
                  {
                    stampDuty: {
                      ...this.state.stampDuty,
                      value: text,
                    },
                  },
                  () => {
                    this.isStampDuty(this.state.stampDuty.value);
                  },
                );
              }}
              customLabelStyles={{
                colorFocused: colors.COLOR_BLUE,
                colorBlurred: colors.COLOR_LIGHT_GREY,
                fontSizeFocused: 15,
                fontSizeBlurred: 15,
              }}
              inputStyles={inputTextPasswordStyle}
            />
            <View style={[separatorStyle, {marginBottom: 10}]} />
            {!this.state.stampDuty.isValid && (
              <Text style={errorLabel}>
                {this.state.stampDuty.value === '' ||
                this.state.stampDuty.value === null
                  ? LOANDETAILS_CONST.MANDATORY_STAMP
                  : `Stamp Charges must be greater than ${this.state.stampDutyMaster}`}
              </Text>
            )}
          </View>

          <View style={{width: '45%', marginTop: 15}}>
            <FloatingLabelInput
              editable={false} //{!this.state.isViewOnly}
              label={LOANDETAILS_CONST.BUREAUECHARGES}
              containerStyles={inputStyle1}
              maxLength={10}
              keyboardType="numeric"
              value={this.state.bureauCharges.value || undefined}
              onChangeText={(text) => {
                this.setState(
                  {
                    bureauCharges: {
                      ...this.state.bureauCharges,
                      value: text,
                    },
                  },
                  () => {
                    this.isBureauCharges(this.state.bureauCharges.value);
                  },
                );
              }}
              customLabelStyles={{
                colorFocused: colors.COLOR_LIGHT_NAVY_BLUE,
                colorBlurred: colors.COLOR_LIGHT_GREY,
                fontSizeFocused: 15,
                fontSizeBlurred: 15,
              }}
              inputStyles={inputTextPasswordStyle}
            />
            <View style={[separatorStyle, {marginBottom: 10}]} />
            {!this.state.bureauCharges.isValid && (
              <Text style={errorLabel}>
                {this.state.bureauCharges.value === '' ||
                this.state.bureauCharges.value === null
                  ? LOANDETAILS_CONST.MANDATORY_BUREAUCHARGES
                  : LOANDETAILS_CONST.VALID_BUREAUCHARGES}
              </Text>
            )}
          </View>
        </View>

        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View style={{width: '45%', marginTop: 15}}>
            <FloatingLabelInput
              // editable={!this.state.isViewOnly}
              editable={false}
              label={LOANDETAILS_CONST.OTHERCHARGES}
              containerStyles={inputStyle1}
              maxLength={10}
              keyboardType="numeric"
              value={this.state.otherCharges.value || undefined}
              onChangeText={(text) => {
                this.setState(
                  {
                    otherCharges: {
                      ...this.state.otherCharges,
                      value: text,
                    },
                  },
                  () => {
                    this.isOtherCharges(this.state.otherCharges.value);
                  },
                );
              }}
              customLabelStyles={{
                colorFocused: colors.COLOR_LIGHT_NAVY_BLUE,
                colorBlurred: colors.COLOR_LIGHT_GREY,
                fontSizeFocused: 15,
                fontSizeBlurred: 15,
              }}
              inputStyles={inputTextPasswordStyle}
            />
            <View style={[separatorStyle, {marginBottom: 10}]} />
            {!this.state.otherCharges.isValid && (
              <Text style={errorLabel}>
                {this.state.otherCharges.value === '' ||
                this.state.otherCharges.value === null
                  ? LOANDETAILS_CONST.MANDATORY_OTHERCHARGES
                  : LOANDETAILS_CONST.VALID_OTHERCHARGES}
              </Text>
            )}
          </View>
          {/* <View style={{ width: '45%', marginTop: 15 }}>
            <FloatingLabelInput
              // editable={!this.state.isViewOnly}
              editable={false}
              label={"LTV Percentage"}
              containerStyles={inputStyle1}
              maxLength={10}
              keyboardType='numeric'
              value={this.state.ltv || undefined}
              onChangeText={(text) => {
                this.setState({
                  ltv: text,

                }, () => {
                  // this.isOtherCharges(this.state.otherCharges.value);
                });
              }}
              customLabelStyles={{
                colorFocused: colors.COLOR_LIGHT_NAVY_BLUE,
                colorBlurred: colors.COLOR_LIGHT_GREY,
                fontSizeFocused: 15,
                fontSizeBlurred: 15,
              }}
              inputStyles={inputTextPasswordStyle}
            />
            <View style={[separatorStyle, { marginBottom: 10 }]} />
            {!this.state.otherCharges.isValid &&
              <Text style={errorLabel}>
                {(this.state.otherCharges.value === "" ||
                  this.state.otherCharges.value === null)
                  ? LOANDETAILS_CONST.MANDATORY_OTHERCHARGES
                  : LOANDETAILS_CONST.VALID_OTHERCHARGES}</Text>}
          </View> */}
        </View>

        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View style={{width: '45%', marginTop: 13}}>
            <Text style={[textStyleDrop, {fontSize: 15, fontWeight: '900'}]}>
              Payout Type
            </Text>
            <DropDownPicker
              // disabled={true}
              disabled={this.state.isViewOnly}
              items={this.state.dropDownDealerPayout}
              style={{backgroundColor: '#ffffff', borderWidth: 0}}
              itemStyle={{
                justifyContent: 'flex-start',
                marginLeft: 4,
              }}
              placeholder={
                this.state.dealerPayoutType.value !== ''
                  ? this.state.dealerPayoutType.value
                  : LOANDETAILS_CONST.PLACEHOLDER_DROPDOWN_DEALERPAYOUT
              }
              dropDownStyle={{backgroundColor: '#ffffff'}}
              onChangeItem={(item) =>
                this.setState({
                  dealerPayoutType: {...item, isValid: true},
                  dealerPayout: {value: null, isValid: true},
                })
              }
              customArrowUp={() => <Image source={UP_ARROW} />}
              customArrowDown={() => <Image source={DOWN_ARROW} />}
              labelStyle={textStyle}
              selectedLabelStyle={textStyle1}
            />
            <View style={[separatorStyle]} />
            {this.state.dealerPayoutType.isValid == false && (
              <Text style={errorLabel}>Payout Type is mandatory.</Text>
            )}
          </View>

          <View style={{width: '45%', marginTop: 15}}>
            <FloatingLabelInput
              editable={!this.state.isViewOnly}
              // editable={false}
              label={LOANDETAILS_CONST.DEALERPAYOUT}
              containerStyles={inputStyle1}
              maxLength={10}
              keyboardType="numeric"
              value={this.state.dealerPayout.value || undefined}
              onChangeText={(text) => {
                this.setState(
                  {
                    dealerPayout: {
                      ...this.state.dealerPayout,
                      value: text,
                    },
                  },
                  () => {
                    this.isDealerPayout(this.state.dealerPayout.value);
                  },
                );
              }}
              customLabelStyles={{
                colorFocused: colors.COLOR_BLUE,
                colorBlurred: colors.COLOR_LIGHT_GREY,
                fontSizeFocused: 15,
                fontSizeBlurred: 15,
              }}
              inputStyles={inputTextPasswordStyle}
            />
            <View style={[separatorStyle, {marginBottom: 10}]} />
            {!this.state.dealerPayout.isValid && (
              <Text style={errorLabel}>
                {this.state.dealerPayout.value === '' ||
                this.state.dealerPayout.value === null
                  ? LOANDETAILS_CONST.MANDATORY_DEALERPAYOUT
                  : LOANDETAILS_CONST.VALID_DEALERPAYOUT}
              </Text>
            )}
          </View>
        </View>
      </View>
    );
  }

  renderRadio() {
    return this.state.sourceType.map((value, index) => (
      <View key={index}>
        <RadioButton
          title={value.title}
          isSelected={
            this.state.selectedSourceType.toLowerCase() ===
            value.title.toLowerCase()
              ? true
              : false
          }
          onPress={() => {
            if (!this.state.isViewOnly && value.title == 'Yes') {
              return this.selectRadioButton(value, index);
            }
          }}
        />
      </View>
    ));
  }
  renderOPDRadio() {
    return this.state.sourceType.map((value, index) => (
      <View key={index}>
        <RadioButton
          title={value.title}
          isSelected={
            this.state.selectedSourceType3.toLowerCase() ===
            value.title.toLowerCase()
              ? true
              : false
          }
          onPress={() => {
            if (!this.state.isViewOnly) {
              return this.selectRadioButton3(value, index);
            }
          }}
        />
      </View>
    ));
  }

  renderRadioButton() {
    return this.state.sourceType2.map((value, index) => (
      <View key={index}>
        <RadioButton
          title={value.title}
          isSelected={
            this.state.selectedSourceType2.toLowerCase() ===
            value.title.toLowerCase()
              ? true
              : false
          }
          onPress={() => {
            if (!this.state.isViewOnly) {
              return this.selectRadioButton2(value, index);
            }
          }}
        />
      </View>
    ));
  }

  renderOPDAmountRadioButton() {
    return this.state.sourceType2.map((value, index) => (
      <View key={index}>
        <RadioButton
          title={value.title}
          isSelected={
            this.state.selectedSourceType4.toLowerCase() ===
            value.title.toLowerCase()
              ? true
              : false
          }
          onPress={() => {
            if (!this.state.isViewOnly) {
              return this.selectRadioButton4(value, index);
            }
          }}
        />
      </View>
    ));
  }

  renderOPDCoverage() {
    const {
      loanTextMain,
      radioContainer2,
      inputStyle,
      loanMainView,
      radioContainer,
      errorLabel,
      separatorStyle,
      addressStyle,
      labelDateOfIncStyle,
      inputTextPasswordStyle,
      calendarIconWithText,
      textForInputStyle,
    } = LoanDetailsStyles;
    return (
      <View style={loanMainView}>
        <Text style={[loanTextMain, {color: colors.COLOR_LIGHT_NAVY_BLUE}]}>
          {'OPD Coverage'}
        </Text>
        <View style={{marginTop: 15}}>
          <Text style={[loanTextMain]}>Do you want OPD Coverage?*</Text>
          <View style={radioContainer2}>{this.renderOPDRadio()}</View>
        </View>
        <View style={[{height: 1}]} />
        {!this.state.selectedSourceValid3 && (
          <Text style={errorLabel}>
            {this.state.selectedSourceType3 === ''
              ? 'Please Select an Option'
              : null}
          </Text>
        )}
        {this.state.selectedSourceType3 == 'Yes' && (
          <>
            <View style={{marginTop: 15}}>
              <FloatingLabelInput
                editable={false}
                label={LOANDETAILS_CONST.OPDPREMIUMAMOUT}
                value={this?.state?.opdAmount?.toString() || ''}
                containerStyles={inputStyle}
                maxLength={10}
                keyboardType={'numeric'}
                customLabelStyles={{
                  colorFocused: colors.COLOR_LIGHT_NAVY_BLUE,
                  colorBlurred: colors.COLOR_LIGHT_GREY,
                  fontSizeFocused: 15,
                  fontSizeBlurred: 15,
                }}
                inputStyles={inputTextPasswordStyle}
              />
            </View>
            <View style={[separatorStyle, {height: 1, width: '50%'}]} />
          </>
        )}

        <View style={{marginTop: 15}}>
          <Text style={loanTextMain}>
            OPD amount to be added to loan amount?
          </Text>
          <View style={radioContainer2}>
            {this.renderOPDAmountRadioButton()}
          </View>
        </View>
        <View style={[{height: 1}]} />
        {!this.state.selectedSourceValid4 && (
          <Text style={errorLabel}>
            {this.state.selectedSourceType4 === ''
              ? 'Please Select an Option'
              : null}
          </Text>
        )}
      </View>
    );
  }

  renderLoanInsurance() {
    const {
      loanTextMain,
      loanMainView,
      radioContainer,
      errorLabel,
      separatorStyle,
    } = LoanDetailsStyles;
    return (
      <View style={loanMainView}>
        <Text style={loanTextMain}>{LOANDETAILS_CONST.LOANPROTECT}</Text>
        {/* <View style={{ flexDirection: "row", marginTop: 15 }}>
          <Text style={[loanTextMain, { marginTop: 3, fontSize: 16 }]}>{LOANDETAILS_CONST.LIFE_INSURANCE}</Text>
          <View style={radioContainer}>{this.renderRadio()}</View>
        </View> */}
        <View style={[{height: 1}]} />
        {!this.state.selectedSourceValid && (
          <Text style={errorLabel}>
            {this.state.selectedSourceType === ''
              ? 'Please Select an Option'
              : null}
          </Text>
        )}
      </View>
    );
  }

  renderNomineeDetails() {
    const {
      loanTextMain,
      addressStyle,
      labelDateOfIncStyle,
      errorLabel,
      inputStyle,
      separatorStyle,
      textInputStyleNominee,
      radioContainer2,
      inputTextPasswordStyle,
      calendarIconWithText,
      textForInputStyle,
    } = LoanDetailsStyles;
    return (
      <View>
        <View style={{marginTop: 15}}>
          <FloatingLabelInput
            editable={
              this.state.premiumAmountFreez ? false : !this.state.isViewOnly
            }
            label={LOANDETAILS_CONST.PREMIUMAMOUT}
            value={this.state.premiumAmount.value || undefined}
            containerStyles={inputStyle}
            maxLength={10}
            keyboardType={'numeric'}
            onChangeText={(text) => {
              this.setState(
                {
                  premiumAmount: {
                    ...this.state.premiumAmount,
                    value: text,
                  },
                },
                () => {
                  this.isPremiumAmount(this.state.premiumAmount.value);
                  this.emiamount();
                },
              );
            }}
            customLabelStyles={{
              colorFocused: colors.COLOR_LIGHT_NAVY_BLUE,
              colorBlurred: colors.COLOR_LIGHT_GREY,
              fontSizeFocused: 15,
              fontSizeBlurred: 15,
            }}
            inputStyles={inputTextPasswordStyle}
          />
        </View>
        <View style={[separatorStyle, {height: 1, width: '50%'}]} />
        {!this.state.premiumAmount.isValid && (
          <Text style={errorLabel}>
            {this.state.premiumAmount.value === '' ||
            this.state.premiumAmount.value === null
              ? LOANDETAILS_CONST.MANDATORY_PREMIUMAMOUNT
              : LOANDETAILS_CONST.VALID_PREMIUMAMOUNT}
          </Text>
        )}

        <View style={{marginTop: 15}}>
          <Text style={loanTextMain}>
            Premium amount to be added to loan amount?
          </Text>
          <View style={radioContainer2}>{this.renderRadioButton()}</View>
        </View>
        <View style={[{height: 1}]} />
        {!this.state.selectedSourceValid2 && (
          <Text style={errorLabel}>
            {this.state.selectedSourceType2 === ''
              ? 'Please Select an Option'
              : null}
          </Text>
        )}
        {/* {this.state.selectedSourceType2 == "" &&
          <Text style={errorLabel}>Please select any one of the radio button.</Text>} */}
        <View style={[separatorStyle, {marginTop: 20, marginBottom: 30}]} />
        <Text style={loanTextMain}>Nominee Details</Text>

        <View style={{marginTop: 10}}>
          <FloatingLabelInput
            editable={!this.state.isViewOnly}
            label={LOANDETAILS_CONST.NAMENOMINEE}
            value={this.state.nameNominee.value || undefined}
            containerStyles={inputStyle}
            maxLength={20}
            onChangeText={(text) => {
              this.setState(
                {
                  nameNominee: {
                    ...this.state.nameNominee,
                    value: text,
                  },
                },
                () => {
                  this.isNameNominee(this.state.nameNominee.value);
                },
              );
            }}
            customLabelStyles={{
              colorFocused: colors.COLOR_LIGHT_NAVY_BLUE,
              colorBlurred: colors.COLOR_LIGHT_GREY,
              fontSizeFocused: 15,
              fontSizeBlurred: 15,
            }}
            inputStyles={inputTextPasswordStyle}
          />
        </View>
        <View style={[separatorStyle, {height: 1, marginBottom: 10}]} />
        {!this.state.nameNominee.isValid && (
          <Text style={errorLabel}>
            {this.state.nameNominee.value === '' ||
            this.state.nameNominee.value === null
              ? LOANDETAILS_CONST.MANDATORY_NAMENOMINEE
              : LOANDETAILS_CONST.VALID_NAMENOMINEE}
          </Text>
        )}
        {this.renderRelationDropDown()}
        <TouchableOpacity
          onPress={() => {
            if (!this.state.isViewOnly) {
              this.refs.dobDialog.open({
                date: new Date(),
                maxDate: new Date(), //To restirct future date
              });
            }
          }}>
          <View style={{backgroundColor: 'transparent'}}>
            <View>
              <Text style={labelDateOfIncStyle}>{LOANDETAILS_CONST.DOB}</Text>
              {this.state.dateOfIncorporationText !== '' && (
                <Text style={textForInputStyle}>
                  {this.state.dateOfIncorporationText}
                </Text>
              )}
            </View>

            <View style={calendarIconWithText}>
              <Icon
                size={30}
                name="calendar"
                type="antdesign"
                color={'#334e9e'}
              />
            </View>
          </View>

          {/* <View style={separatorStyle} /> */}
        </TouchableOpacity>
        <View style={[separatorStyle, {height: 1}]} />
        {!this.state.dobValid && (
          <Text style={errorLabel}>
            {this.state.dateOfIncorporation === null
              ? LOANDETAILS_CONST.MANDATORY_DATEOFBIRTH
              : null}
          </Text>
        )}
        {this.state.invalidDate && (
          <Text style={errorLabel}>{this.state.invalidDateMessage}</Text>
        )}
        <DatePickerDialog
          ref="dobDialog"
          date={this.state.dateOfIncorporation}
          onDatePicked={this.onDOBDatePicked.bind(this)}
        />

        <View style={{marginTop: 15}}>
          {this.state.addressNominee.value !== '' ? (
            <Text style={[addressStyle, {marginLeft: 5}]}>{'Address*'}</Text>
          ) : null}
          <TextInput
            style={textInputStyleNominee}
            editable={!this.state.isViewOnly}
            value={this.state.addressNominee.value}
            multiline={true}
            maxLength={255}
            onChangeText={(text) => {
              this.setState(
                {
                  addressNominee: {
                    ...this.state.addressNominee,
                    value: text,
                  },
                },
                () => {
                  this.isAddressNominee(this.state.addressNominee.value);
                },
              );
            }}
            placeholder={LOANDETAILS_CONST.ADDRESS}
          />
        </View>
        <View style={[separatorStyle, {height: 1, marginBottom: 10}]} />
        {!this.state.addressNominee.isValid && (
          <Text style={errorLabel}>{LOANDETAILS_CONST.MANDATORY_ADDRESS}</Text>
        )}
      </View>
    );
  }

  renderRelationDropDown() {
    const {
      viewDrop5,
      separatorStyle,
      textStyle,
      textStyle1,
      textStyleDrop,
      errorLabel,
    } = LoanDetailsStyles;

    return (
      <View style={viewDrop5}>
        <Text style={textStyleDrop}>Relationship*</Text>
        <DropDownPicker
          disabled={this.state.isViewOnly}
          items={this.state.dropDownRelation}
          containerStyle={{flex: 1}}
          style={{backgroundColor: '#ffffff', borderWidth: 0}}
          itemStyle={{
            justifyContent: 'flex-start',
            marginLeft: 4,
          }}
          placeholder={
            this.state.selectedRelation.value !== ''
              ? this.state.selectedRelation.value
              : ''
          }
          dropDownStyle={{backgroundColor: '#ffffff'}}
          onChangeItem={(item) =>
            this.setState({selectedRelation: {...item, isValid: true}}, () => {
              this.isRelation(this.state.selectedRelation.value);
            })
          }
          customArrowUp={() => <Image source={UP_ARROW} />}
          customArrowDown={() => <Image source={DOWN_ARROW} />}
          labelStyle={textStyle}
          selectedLabelStyle={textStyle1}
        />
        <View style={[separatorStyle, {height: 1, marginBottom: 10}]} />
        {!this.state.selectedRelation.isValid && (
          <Text style={errorLabel}>{LOANDETAILS_CONST.MANDATORY_RELATION}</Text>
        )}
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
      separatorStyle,
    } = LoanDetailsStyles;
    console.log(
      'is it zero?',
      this.state.ProcessingFees_calc,
      this.state.valueaR1,
      this.state.processingFees.value,
    );
    return (
      <WaveBackground>
        <StatusBar
          backgroundColor={colors.COLOR_WHITE}
          barStyle={'dark-content'}
          translucent={false}
          hidden={false}
        />
        <Header
          label={LOANDETAILS_CONST.HEADER}
          showLeftIcon={false}
          onPress={() => {}}
        />
        <View style={{alignContent: 'center'}}>
          <View style={{}}>
            <DottedProgressBar
              totalSteps={
                this.state.indSelfSoleFlag
                  ? [1, 2, 3, 4, 5]
                  : [1, 2, 3, 4, 5, 6]
              }
              currentIndex={this.state.indSelfSoleFlag ? 4 : 4}
            />
          </View>
        </View>
        <View style={mainContainer}>
          <Text style={mainHeadingText}>Loan Details</Text>
          <ScrollView keyboardShouldPersistTaps="handled">
            {this.renderDropDownVehicle()}
            {this.renderDropDownBrandofVehicle()}
            {this.renderDropDownModel()}
            {this.renderDropDownSubModel()}
            {this.renderDropDownDealer()}
            {this.renderDropDownSubDealer()}
            {this.renderDropDownSchemeCode()}
            {this.renderCharges()}
            {/* {this.renderOPDCoverage()} */}
            {this.renderLoanInsurance()}
            {this.state.selectedSourceType === 'Yes' &&
              this.renderNomineeDetails()}
            {this.renderSlider()}
            <View style={buttonContainer}>
              <Button
                title={this.state.cancelButtonTitle}
                onPress={() => {
                  if (this.state.cancelButtonTitle.toLowerCase() === 'cancel') {
                    this.props.navigation.navigate('LeadList');
                  }
                }}
                customContainerStyle={cancelButtonStyle}
                cutomTitleStyle={cancelButtonTitleStyle}
              />
              <Button
                title={LOANDETAILS_CONST.BUTTON_NEXT}
                isDisabled={this.state.isViewOnly || this.state.saveEnable}
                onPress={() => {
                  Keyboard.dismiss();
                  this.isLoanVehicleBrand();
                  this.isLoanVehicleDetails();
                  this.isLoanVehicleModel();
                  this.isLoanVehicleSubModel();
                  this.isSelectedDealer();
                  this.isSechemeCode();
                  this.isPFType();
                  this.isValueRateofInterest(
                    this.state.valueRateofInterest.value,
                  );
                  this.isDealerCharges(this.state.dealerCharges.value);
                  this.isProcessingFees(this.state.processingFees.value);
                  this.isDealerPayout(this.state.dealerPayout.value);
                  this.isInsurance(this.state.insurance.value);
                  this.isExShowRoomPrice(this.state.exShowroomPrice.value);
                  this.isBureauCharges(this.state.bureauCharges.value);
                  this.isOtherCharges(this.state.otherCharges.value);
                  this.isSelectedSourceValid();
                  // uncomment opd
                  // this.isSelectedSourceValid3(),
                  // this.isSelectedSourceValid4(),
                  this.state.selectedSourceType == 'Yes'
                    ? (this.isPremiumAmount(this.state.premiumAmount.value),
                      this.isNameNominee(this.state.nameNominee.value),
                      this.isRelation(this.state.selectedRelation.value),
                      this.isDobValid(),
                      // this.state.invalidDate == true ? false : true,
                      this.isSelectedSourceValid2(),
                      this.isAddressNominee(this.state.addressNominee.value))
                    : null;
                  this.isDealerSubvention(this.state.dealerSubvention.value);
                  this.isAdminFees(this.state.adminFees.value);
                  this.isNachCharges(this.state.nachCharges.value);
                  this.isPreEMI(this.state.preEMI.value);
                  this.isPodCharges(this.state.podCharges.value);
                  this.isConvenienceCharges(
                    this.state.convenienceCharges.value,
                  );
                  this.isStampDuty(this.state.stampDuty.value);
                  // this.isDealerPayoutType();

                  if (this.state.valuetR < 6) {
                    handleError('Tenure is less than 6 month');
                  } else if (this.state.valueTenure == 0) {
                    handleError('Tenure is less thaff 6 month');
                  } else if (this.state.valuetR > 36) {
                    handleError('Tenure is greater than 36 month');
                  } else if (
                    this.state.loanVehicleDetails.value != null &&
                    this.state.loanVehicleDetails.value != '' &&
                    this.state.loanVehicleBrand.value != null &&
                    this.state.loanVehicleBrand.value != '' &&
                    this.state.loanVehicleModel.value != null &&
                    this.state.loanVehicleModel.value != '' &&
                    this.state.valueRateofInterest.value != '' &&
                    this.state.valueRateofInterest.value != null &&
                    this.state.valueRateofInterest.isValid &&
                    this.state.loanVehicleSubModel.value != null &&
                    this.state.loanVehicleSubModel.value != '' &&
                    this.state.selectedDealer.value != null &&
                    this.state.selectedDealer.value != '' &&
                    this.state.selectedSchemeCode.value != null &&
                    this.state.selectedSchemeCode.value != '' &&
                    this.state.selectedDealer.value != null &&
                    this.state.selectedDealer.value != '' &&
                    this.state.dealerCharges.value != null &&
                    this.state.dealerCharges.value != '' &&
                    this.state.dealerSubvention.value != null &&
                    this.state.dealerSubvention.value != '' &&
                    this.state.adminFees.value != null &&
                    this.state.adminFees.value != '' &&
                    this.state.nachCharges.value != null &&
                    this.state.nachCharges.value != '' &&
                    this.state.nachCharges.isValid &&
                    this.state.preEMI.value != null &&
                    this.state.preEMI.value != '' &&
                    this.state.podCharges.value != null &&
                    this.state.podCharges.value != '' &&
                    this.state.convenienceCharges.value != null &&
                    this.state.convenienceCharges.value != '' &&
                    this.state.exShowroomPrice.value != null &&
                    this.state.exShowroomPrice.value != undefined &&
                    this.state.exShowroomPrice.value != '' &&
                    this.state.exShowroomPrice.isValid &&
                    this.state.insurance.value != null &&
                    this.state.insurance.value != undefined &&
                    this.state.insurance.value != '' &&
                    this.state.insurance.isValid &&
                    this.state.stampDuty.value != null &&
                    this.state.stampDuty.value != '' &&
                    this.state.stampDuty.isValid &&
                    this.state.pfAmountType.value != null &&
                    this.state.pfAmountType.value != '' &&
                    this.state.pfAmountType.isValid &&
                    this.state.processingFees.value != null &&
                    this.state.processingFees.value != '' &&
                    this.state.processingFees.isValid &&
                    this.state.dealerPayout.value != null &&
                    this.state.dealerPayout.value != undefined &&
                    this.state.dealerPayout.value != '' &&
                    this.state.dealerPayout.isValid &&
                    this.state.dealerPayoutType.isValid &&
                    this.state.bureauCharges.value != null &&
                    this.state.bureauCharges.value != '' &&
                    this.state.otherCharges.value != null &&
                    this.state.otherCharges.value != '' &&
                    // uncomment opd
                    // this.state.selectedSourceType3 != "" &&
                    // this.state.selectedSourceType4 != "" &&
                    this.state.schemeNameValid &&
                    (this.state.selectedSourceType == 'Yes'
                      ? this.state.selectedSourceType2 != '' &&
                        this.state.premiumAmount.value !== '' &&
                        this.state.nameNominee.value !== '' &&
                        this.state.selectedRelation.value !== null &&
                        this.state.selectedRelation.value != '' &&
                        this.state.invalidDate !== true &&
                        this.state.addressNominee.value !== null &&
                        this.state.addressNominee.value != ''
                      : this.state.selectedSourceType != '')
                  ) {
                    this.state.processingFees.isValid
                      ? this.props.saveUpdateLoanINFO({
                          data: {
                            emi: this.state.emi,
                            isOpdCoverage: this.state.selectedSourceType3,
                            opdCoverage: this.state.opdAmount,
                            isOpdAddedInLoan: this.state.selectedSourceType4,
                            pfAmountTypeMaster: this.state.pfAmountTypeMaster,
                            nachChargesMaster: this.state.nachChargesMaster,
                            stampDutyMaster: this.state.stampDutyMaster,
                            pfAmountMaster: this.state.pfAmountMaster,
                            valueaR: Number(this.state.valueaR),
                            // this.state.selectedSourceType2 == 'Yes' ?
                            //   Number(this.state.valueaR) + Number(this.state.premiumAmount.value) : Number(this.state.valueaR),
                            valuetR: this.state.valuetR,
                            ltvGridPercentage: this.state.ltvGridPercentage,
                            ltvGridId: this.state.ltvGridId,
                            ltvGridRule: this.state.ltvGridRule,
                            premiumAmount: this.state.premiumAmount.value,
                            relationType: this.state.selectedRelation.value,
                            otherCharges: this.state.processingCharges,
                            processingFees: this.state.processingFees.value,
                            rateOfInterest: this.state.valueRateofInterest
                              .value,
                            loanVehicleBrand: this.state.loanVehicleBrand.value,
                            isPremiumamount: this.state.selectedSourceType2,
                            applicantUniqueId: this.state.applicantUniqueId,
                            loanVehicleModel: this.state.loanVehicleModel.value,
                            id: this.state.idToEdit,
                            maxAmt: this.state.maxAmount,
                            startDate: this.state.startDate,
                            endDate: this.state.endDate,
                            schemeCode: this.state.selectedSchemeCode.value,
                            schemeName: this.state.schemeName,
                            ltv: this.state.ltv,
                            pfAmountType: this.state.pfAmountType.value,
                            pfAmountMaster: this.state.pfAmount1,
                            //insuranceAmount: this.state.insuranceAmount.value,
                            bureauCharges: this.state.bureauCharges.value,
                            address: this.state.addressNominee.value,
                            loanVehicleSubModel: this.state.loanVehicleSubModel
                              .value,
                            loanVehicleDetails: this.state.loanVehicleDetails
                              .value,
                            dateOfBirth: this.state.dateOfIncorporationText,
                            isguarantor: false,
                            leadCode: this.state.leadCode,
                            subDealerName: this.state.selectedSubDealer.value,
                            name: this.state.nameNominee.value,
                            selectedDealer: this.state.selectedDealer.value,
                            islifeInsurance:
                              this.state.selectedSourceType === 'Yes'
                                ? true
                                : false,
                            ismainapplicant: true,
                            dealerCharges: this.state.dealerCharges.value,
                            dealerSubvention: this.state.dealerSubvention.value,
                            adminFees: this.state.adminFees.value,
                            exShowroomPrice: this.state.exShowroomPrice.value,
                            insurance: this.state.insurance.value,
                            nachCharges: this.state.nachCharges.value,
                            preEmi: this.state.preEMI.value,
                            convenienceCharges: this.state.convenienceCharges
                              .value,
                            pddCharges: this.state.podCharges.value,
                            dealerPayout: this.state.dealerPayout.value,
                            dealerPayouttype: this?.state?.dealerPayoutType?.value?.toLowerCase(),
                            stampDuty: this.state.stampDuty.value,
                            amountSelected: this.state.amountSelected,
                          },
                          callback: () => {
                            this.setState({isDataSaved: true});
                          },
                        })
                      : nullSlider;
                  } else {
                    void 0;
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
                  title={LOANDETAILS_CONST.BUTTON_TITLE_NEXT}
                  isDisabled={!this.state.isDataSaved}
                  onPress={() => {
                    this.props.navigation.navigate('References', {
                      leadCode: this.state.leadCode,
                      leadName: this.state.leadName,
                      applicantUniqueId: this.state.applicantUniqueId,
                      iscoapplicant: this.state.iscoapplicant,
                      isguarantor: this.state.isguarantor,
                      ismainapplicant: this.state.ismainapplicant,
                      coapplicantUniqueId: this.state.coapplicantUniqueId,
                    });
                  }}
                />
              </View>
            </View>
          </ScrollView>
        </View>
      </WaveBackground>
    );
  }
}
LoanDetails.propTypes = {
  userDataSelector: PropTypes.object,
};

export default compose(
  container,
  withProps(() => {}),
)(LoanDetails);
