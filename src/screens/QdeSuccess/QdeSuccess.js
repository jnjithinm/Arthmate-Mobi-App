import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  StatusBar,
  Text,
  View,
  Modal,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {Tooltip} from 'react-native-elements';
import {compose, withProps} from 'recompose';
import {Button} from '../../components/Button/Button';
import {Header} from '../../components/Header/Header';
import {WaveBackground} from '../../components/WaveBackground/WaveBackground';
import * as colors from '../../constants/colors';
import {QDESUCCESS_CONST} from '../../constants/screenConst';
import container from '../../container/QdeSuccess/index';
import {QdeSuccessStyles} from './QdeSuccessStyles';
import {HUMAN_HAPPY} from '../../constants/imgConsts';
import {ImageBackground} from 'react-native';
import {COLOR_LIGHT_NAVY_BLUE} from '../../constants/colors';
import {handleWarning, handleError} from '../../../utils';
import {FONT_SIZE, APP_FONTS} from '../../constants/styleConfig';
import DropDownPicker from 'react-native-dropdown-picker';
import {DOWN_ARROW, UP_ARROW} from '../../constants/imgConsts';
import {Dropdown} from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';

class QdeSuccess extends Component {
  constructor(props) {
    super(props);
    this.state = {
      responseData: {},
      employeeId: this.props.userDataSelector?.userData?.data?.employeeId || '',
      isVisible: false,
      addressNominee: {
        value: null,
        isValid: true,
      },
      count: 0,
      applicantUniqueId:
        (this.props.navigation &&
          this.props.navigation.state &&
          this.props.navigation.state.params &&
          this.props.navigation.state.params.applicantUniqueId) ||
        (this.props.newLeadDataSelector &&
          this.props.newLeadDataSelector.newLead &&
          this.props.newLeadDataSelector.newLead.applicantUniqueId) ||
        '',
      coapplicantUniqueId:
        this.props?.navigation?.state?.params?.coapplicantUniqueId || '',
      offerType: this.props.navigation.state.params.offerType,
      redirection: this.props.navigation.state.params.redirection,
      ddeflag: this.props.navigation.state.params.ddeflag,
      isViewOnly: false,
      reasonData: [],
      selectedReason: null,
      isFocus: false,
      reasonVisible: false,
      validReason: false,
      creditVisible: false,
      visible_button: true,
    };
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

  qdeSuccessApi() {
    const {coapplicantUniqueId} = this.props.navigation.state.params;
    const {iscoapplicant} = this.props.navigation.state.params;
    const {isguarantor} = this.props.navigation.state.params;

    var appliId =
      iscoapplicant || isguarantor
        ? coapplicantUniqueId
        : this.state.applicantUniqueId;
    this.props.qdeSuccessAPI({
      data: {
        applicant_uniqueid: appliId,
        ddeflag: this.state.redirection == 'qde' ? false : true,
      },
      callback: (response) => {
        this.setState({
          responseData: response.data.data,
        });
      },
    });

    this.props.getReasonMasterList({
      callback: (response) => {
        var temp = [];
        Object.keys(response.data).map((items, index) => {
          (response.data[items]['value'] = response.data[items].reason),
            (response.data[items]['label'] = response.data[items].reason);
        });
        this.setState({
          reasonData: response.data,
        });
      },
    });
  }

  loanSummary() {
    const dataToAPI = {
      applicant_uniqueid: this.state.applicantUniqueId,
      lead_code: this.state.leadCode,
      roleId: this.props?.userDataSelector?.userData?.data?.roleId,
    };
    this.props.getLoanSummary({
      dataToAPI,
      callback: (response) => {
        console.log('response is ...............', response);
        var creditVisible = false;

        response?.coapplicant?.length != 0
          ? Object.keys(response?.coapplicant).map((item, index) => {
              if (
                response?.coapplicant[item]?.additionalDetails &&
                response?.coapplicant[item]?.panAndGst &&
                (response?.coapplicant[item]?.personalDetailsFlag ||
                  response?.coapplicant[item]?.businessDetails)
              ) {
                console.log('');
              } else {
                creditVisible = true;
              }
            })
          : null;

        response?.gurantor?.length != 0
          ? Object.keys(response?.gurantor).map((item, index) => {
              if (
                response?.gurantor[item]?.additionalDetails &&
                response?.gurantor[item]?.panAndGst &&
                (response?.gurantor[item]?.personalDetailsFlag ||
                  response?.gurantor[item]?.businessDetails)
              ) {
                console.log('');
              } else {
                creditVisible = true;
              }
            })
          : null;

        this.setState({
          creditVisible: creditVisible,
          reasonVisible: response?.mainapplicant?.reasonDropDownFlag,
          isViewOnly:
            response?.mainapplicant?.arthmateBreStatus == 'GO' &&
            response?.mainapplicant?.arthmateLoanStatus == 'NOGO'
              ? true
              : response?.mainapplicant?.loanAgreementFlag
              ? true
              : response?.modelAccess[0]?.read
              ? true
              : false,
          visible_button:
            response?.mainapplicant?.arthmateBreStatus == 'GO' &&
            response?.mainapplicant?.arthmateLoanStatus == 'NOGO'
              ? false
              : true,
        });
      },
    });
  }

  componentDidMount() {
    //const { applicantUniqueId } = this.props.navigation.state.params;
    const {redirection} = this.props.navigation.state.params;
    const {ismainapplicant} = this.props.navigation.state.params;
    this.focusListener = this.props.navigation.addListener('didFocus', () => {
      this.qdeSuccessApi();
      this.loanSummary();
    });

    this.qdeSuccessApi();
    this.loanSummary();
  }

  componentWillUnmount() {
    if (this.focusListener != null && this.focusListener.remove) {
      this.focusListener.remove();
    }
  }

  render() {
    const {
      mainContainer,
      buttonContainer,
      buttonContainerButtons,
      cancelButtonStyle,
      cancelButtonTitleStyle,
      QdeSuccessLabel,
      QdeSuccessGreet,
      separatorStyle1,
      LightText,
      DarkText,
      toolTipContainer,
      informationToolTipText,
      modalView,
      touchButton,
      text,
      separatorStyle,
      textInputStyleAddress,
      errorLabel,
      textStyle,
    } = QdeSuccessStyles;
    const {
      id,
      customerId,
      emiAmount,
      isMainApplicant,
      leadCode,
      loanAmount,
      loanDuration,
      name,
      rateOfInterest,
    } = this.state.responseData;

    const mainApplicant = isMainApplicant;
    const viewAgreement = this.state.offerType === 'final';
    const okButton = !isMainApplicant && this.state.redirection === 'dde';
    const continueLater = !isMainApplicant && this.state.redirection === 'qde';
    const loanSummary = isMainApplicant && this.state.offerType === 'tentative';
    const dde =
      this.state.redirection === 'qde' && this.state.offerType === 'tentative';
    const submitToCredits = this.props.navigation.state.params.creditButtonFlag;
    // isMainApplicant && this.state.offerType === 'tentative';
    return (
      <WaveBackground>
        <StatusBar
          backgroundColor={colors.COLOR_WHITE}
          barStyle={'dark-content'}
          translucent={false}
          hidden={false}
        />

        <Header
          showLeftIcon={false}
          label={
            this.state.ddeflag == true
              ? 'Detailed Data Entry'
              : 'Quick Data Entry'
          }
          onPress={() => {}}
        />
        {/* <ImageBackground source={HUMAN_HAPPY} style={{ width: '100%', alignSelf: 'center', flex: 1 }}> */}
        <ScrollView keyboardShouldPersistTaps="handled">
          <View style={mainContainer}>
            <Modal
              animationType={'fade'}
              transparent={true}
              visible={this.state.isVisible}
              onRequestClose={() => {}}>
              <View style={modalView}>
                <Text style={text}>
                  Loan case moved to Credit Module with BRE decision as
                  Approved. Please check the Final Loan Offer after Credit
                  Decisioning.
                </Text>
                {this.state.reasonVisible && (
                  <Text style={[text, {marginTop: 10}]}>Reason Type*</Text>
                )}

                {this.state.reasonVisible && (
                  <Dropdown
                    style={[styles.dropdown]}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.iconStyle}
                    data={this.state.reasonData}
                    // search
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder={!this.state.isFocus ? 'Select item' : '...'}
                    searchPlaceholder="Search..."
                    value={this.state.selectedReason}
                    onFocus={() => this.setState({isFocus: true})}
                    onBlur={() => this.setState({isFocus: false})}
                    onChange={(item) => {
                      this.setState({
                        selectedReason: item.value,
                        isFocus: false,
                        validReason: false,
                      });
                    }}
                  />
                )}
                {this.state.validReason && (
                  <Text style={errorLabel}>{'Reason type is mandatory'}</Text>
                )}

                <View style={{marginTop: 20}}>
                  {/* {this.state.addressNominee.value !== null && */}
                  <Text style={text}>Comment*</Text>
                  <TextInput
                    style={textInputStyleAddress}
                    value={this.state.addressNominee.value}
                    multiline={true}
                    maxLength={255}
                    underlineColorAndroid={COLOR_LIGHT_NAVY_BLUE}
                    onChangeText={(text) => {
                      this.setState(
                        {
                          addressNominee: {
                            ...this.state.addressNominee,
                            value: text,
                          },
                        },
                        () => {
                          this.isAddressNominee(
                            this.state.addressNominee.value,
                          );
                        },
                      );
                    }}
                  />
                </View>
                {!this.state.addressNominee.isValid && (
                  <Text style={errorLabel}>
                    {QDESUCCESS_CONST.MANDATORY_ADDRESS}
                  </Text>
                )}

                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    alignItems: 'center',
                  }}>
                  <TouchableOpacity
                    style={touchButton}
                    onPress={() => {
                      this.setState({isVisible: !this.state.isVisible});
                    }}>
                    <Text
                      style={[text, {color: '#ffffff', textAlign: 'center'}]}>
                      Cancel
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={touchButton}
                    onPress={() => {
                      this.setState({count: this.state.count + 1}, () => {
                        if (this.state.count == 1) {
                          if (submitToCredits) {
                            this.isAddressNominee(
                              this.state.addressNominee.value,
                            );
                            this.state.reasonVisible &&
                            this.state.selectedReason == null
                              ? this.setState({validReason: true})
                              : null;
                            if (
                              this.state.reasonVisible == false &&
                              this.state.addressNominee.value != null &&
                              this.state.addressNominee.value != ''
                            ) {
                              this.props.submitToCredit({
                                data: {
                                  applicant_uniqueid: this.state
                                    .applicantUniqueId,
                                  employeeId: this.state.employeeId,
                                  comment: this.state.addressNominee.value,
                                  reason: this.state.selectedReason,
                                },
                                callback: (response) => {
                                  console.log('mjjjjjjmkkkj', response?.data);
                                  this.setState({
                                    isVisible: !this.state.isVisible,
                                  });

                                  response?.data?.arthmateBreStatus == 'NOGO'
                                    ? this.props.navigation.navigate(
                                        'CaseReject',
                                      )
                                    : this.props.createUpdateCUSTOMER({
                                        data: {
                                          applicant_uniqueid: this.state
                                            .applicantUniqueId,
                                          ismainapplicant: mainApplicant,
                                          isguarantor: false,
                                          type: 'BRE',
                                        },
                                        callback: (response1) => {
                                          this.setState({
                                            isVisible: !this.state.isVisible,
                                          });
                                          // response?.data?.arthmateBreStatus ==
                                          // 'GO'
                                          //   ? response.data
                                          //       ?.arthmateLoanStatus == 'GO'
                                          //     ? this.props.navigation.navigate(
                                          //         'CaseReject',
                                          //         {
                                          //           status: 'Go',
                                          //           leadName: name,
                                          //           applicantUniqueId: this
                                          //             .state.applicantUniqueId,
                                          //           leadCode: leadCode,
                                          //         },
                                          //       )
                                          //     : this.props.navigation.navigate(
                                          //         'CaseReject',
                                          //         {
                                          //           status: 'NoGo',
                                          //         },
                                          //       )
                                          //   : this.props.navigation.navigate(
                                          //       'LoanSummary',
                                          //       {
                                          //         leadName: name,
                                          //         applicantUniqueId: this.state
                                          //           .applicantUniqueId,
                                          //         leadCode: leadCode,
                                          //       },
                                          //     );
                                          response?.data?.arthmateBreStatus ==
                                            'GO' &&
                                          response?.data?.arthmateLoanStatus ==
                                            'NOGO'
                                            ? this.setState(
                                                {
                                                  isVisible: false,
                                                  visible_button: false,
                                                  isViewOnly: true,
                                                },
                                                () => {
                                                  this.props.navigation.navigate(
                                                    'CaseReject',
                                                    {
                                                      status: 'NoGo',
                                                      // leadName: name,
                                                      // applicantUniqueId: this.state
                                                      //   .applicantUniqueId,
                                                      // leadCode: leadCode,
                                                      message:
                                                        response.data.message,
                                                    },
                                                  );
                                                },
                                              )
                                            : // handleError(
                                              //   `${response.data.message}`,
                                              // )})
                                              this.props.navigation.navigate(
                                                'CaseReject',
                                                {
                                                  status: 'Go',
                                                  leadName: name,
                                                  applicantUniqueId: this.state
                                                    .applicantUniqueId,
                                                  leadCode: leadCode,
                                                },
                                              );
                                        },
                                      });
                                },
                              });
                            } else if (
                              this.state.reasonVisible &&
                              this.state.selectedReason !== null &&
                              this.state.addressNominee.value != null &&
                              this.state.addressNominee.value != ''
                            ) {
                              this.props.submitToCredit({
                                data: {
                                  applicant_uniqueid: this.state
                                    .applicantUniqueId,
                                  employeeId: this.state.employeeId,
                                  comment: this.state.addressNominee.value,
                                  reason: this.state.selectedReason,
                                },
                                callback: (response) => {
                                  console.log(
                                    'mjjjjjjj',
                                    response,
                                    response?.data?.arthmateLoanStatus ==
                                      'NOGO',
                                  );
                                  this.setState({
                                    isVisible: !this.state.isVisible,
                                  });
                                  response?.data?.arthmateBreStatus == 'GO' &&
                                  response?.data?.arthmateLoanStatus == 'NOGO'
                                    ? this.setState(
                                        {
                                          isVisible: false,
                                          visible_button: false,
                                          isViewOnly: true,
                                        },
                                        () => {
                                          this.props.navigation.navigate(
                                            'CaseReject',
                                            {
                                              status: 'NoGo',
                                              // leadName: name,
                                              // applicantUniqueId: this.state
                                              //   .applicantUniqueId,
                                              // leadCode: leadCode,
                                              message: response.data.message,
                                            },
                                          );
                                        },
                                      )
                                    : this.props.navigation.navigate(
                                        'CaseReject',
                                        {
                                          status: 'Go',
                                          leadName: name,
                                          applicantUniqueId: this.state
                                            .applicantUniqueId,
                                          leadCode: leadCode,
                                        },
                                      );
                                },
                              });
                            }
                          } else {
                            handleWarning('User access denied');
                          }
                        } else {
                          console.log('mjjjj');
                          this.setState({isVisible: !this.state.isVisible});
                        }
                      });
                    }}>
                    <Text
                      style={[text, {color: '#ffffff', textAlign: 'center'}]}>
                      Ok
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
            <View>
              <Text
                style={
                  QdeSuccessLabel
                }>{`Your tentative loan offer has been generated. Final offer subject to credit decisioning.`}</Text>
              {/* <Text style={QdeSuccessGreet}>
                  {this.state.redirection === 'qde'
                    ? QDESUCCESS_CONST.GREETDESCRIPTION
                    : QDESUCCESS_CONST.GREETDESCRIPTIONDDE}
                </Text> */}
              {(!isMainApplicant && this.state.redirection === 'qde') ||
              (!isMainApplicant && this.state.redirection === 'dde') ? (
                <View style={{height: 50}} />
              ) : (
                <Text style={QdeSuccessGreet}>
                  {QDESUCCESS_CONST.GREET.replace(
                    'loanType',
                    this.state.offerType,
                  )}
                </Text>
              )}
              <View style={{flexDirection: 'row'}}>
                <View style={{flexDirection: 'column'}}>
                  <Text style={LightText}>{QDESUCCESS_CONST.CUSTOMERID}</Text>
                  <Text style={DarkText}>{customerId}</Text>
                </View>

                <View style={{flexDirection: 'column', flex: 1}}>
                  <Text style={LightText}>
                    {QDESUCCESS_CONST.APPLICATIONID}
                  </Text>
                  <Text style={DarkText}>{id}</Text>
                </View>
              </View>
              {isMainApplicant && (
                <View style={{flexDirection: 'row'}}>
                  <View style={{flexDirection: 'column'}}>
                    <Text style={LightText}>{QDESUCCESS_CONST.LOANAMOUNT}</Text>
                    <Text style={DarkText}>{`₹ ${loanAmount}`}</Text>
                  </View>

                  <View style={{flexDirection: 'column', flex: 1}}>
                    <Text style={LightText}>
                      {QDESUCCESS_CONST.DURATIONOFLOAN}
                    </Text>
                    <Text style={DarkText}>{`${loanDuration} Months`}</Text>
                  </View>
                </View>
              )}
              {isMainApplicant && (
                <View style={{flexDirection: 'row'}}>
                  {/* <View style={{ flexDirection: 'column' }}>
                      <Text style={LightText}>
                        {QDESUCCESS_CONST.RATEOFINTEREST}
                      </Text>
                      <Text style={DarkText}>{`${rateOfInterest} %`}</Text>
                    </View> */}

                  <View style={{flexDirection: 'column', flex: 2}}>
                    <Text style={LightText}>{QDESUCCESS_CONST.EMIAMOUNT}</Text>
                    <Text style={DarkText}>{`₹ ${
                      emiAmount !== undefined
                        ? Math.round(emiAmount)
                        : Math.round(emiAmount)
                    }`}</Text>
                  </View>
                </View>
              )}
            </View>
            <View style={[separatorStyle1, {marginBottom: 20}]} />
            <View style={buttonContainer}>
              {okButton && (
                <Button
                  style={buttonContainerButtons}
                  title={QDESUCCESS_CONST.BUTTON_OK}
                  onPress={() => {
                    this.props.navigation.navigate('LoanSummary', {
                      leadName: name,
                      applicantUniqueId: this.state.applicantUniqueId,
                      leadCode: leadCode,
                    });
                  }}
                  //OK BUTTON
                />
              )}
              {viewAgreement && (
                <Button
                  style={buttonContainerButtons}
                  title={QDESUCCESS_CONST.BUTTON_VIEW_AGREEMENT}
                />
                //VIEW AGREEMENT
              )}

              {continueLater && (
                <View style={{marginVertical: 10}}>
                  <Button
                    style={buttonContainerButtons}
                    title={QDESUCCESS_CONST.BUTTON_CONTINUE_LATER}
                    onPress={() => {
                      this.props.navigation.navigate('LoanSummary', {
                        leadName: name,
                        applicantUniqueId: this.state.applicantUniqueId,
                        leadCode: leadCode,
                      });
                    }}
                  />
                </View>
                //LATER
              )}

              {loanSummary && (
                <View style={{marginBottom: 10}}>
                  <Button
                    style={buttonContainerButtons}
                    title={QDESUCCESS_CONST.BUTTON_TITLE_ADD}
                    onPress={() => {
                      this.props.navigation.navigate('LoanSummary', {
                        leadName: name,
                        applicantUniqueId: this.state.applicantUniqueId,
                        leadCode: leadCode,
                      });
                    }}
                  />
                </View>
              )}

              {dde && (
                <View style={{marginBottom: 10}}>
                  <Button
                    style={buttonContainerButtons}
                    title={QDESUCCESS_CONST.BUTTON_TITLE_PROCEED}
                    onPress={() => {
                      this.props.navigation.navigate('BankDetails', {
                        selectedSourceType: 'Income Proof',
                        applicantUniqueId: isMainApplicant
                          ? this.state.applicantUniqueId
                          : this.state.coapplicantUniqueId,
                        leadCode: leadCode,
                      });
                    }}
                  />
                </View>
              )}

              {mainApplicant && submitToCredits && this.state.visible_button && (
                <View style={{marginBottom: 10}}>
                  <Button
                    style={buttonContainerButtons}
                    title={QDESUCCESS_CONST.BUTTON_TITLE_SUBMIT}
                    onPress={() => {
                      // console.log("mjjjjj");
                      this.state.creditVisible
                        ? handleError('Co-Applicant/ Guaranter are mandatory')
                        : this.setState({isVisible: true});
                    }}
                  />
                </View>
              )}
            </View>

            {isMainApplicant && this.state.offerType !== 'final' && (
              <View style={toolTipContainer}>
                <Tooltip
                  popover={
                    <Text>
                      Since you have selected Fasttrack/No Income Proof
                      scheme,you can directly check your loan agreement subject
                      to credit decisioning.
                    </Text>
                  }
                  backgroundColor={colors.COLOR_LILAC}
                  skipAndroidStatusBar={true}
                  overlayColor={'transparent'}
                  withPointer={true}
                  height={150}>
                  <View style={toolTipContainer}>
                    <Text style={informationToolTipText}>{'?'}</Text>
                  </View>
                </Tooltip>
              </View>
            )}
          </View>
        </ScrollView>
        {/* </ImageBackground> */}
      </WaveBackground>
    );
  }
}

/**
 * propTypes declaration
 */
QdeSuccess.propTypes = {
  qdeSuccessAPI: PropTypes.func,
};

export default compose(
  container,
  withProps(
    (qdeSuccessAPI) => qdeSuccessAPI,
    (submitToCredit) => submitToCredit,
  ),
)(QdeSuccess);

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 16,
  },
  dropdown: {
    height: 50,
    borderColor: COLOR_LIGHT_NAVY_BLUE,
    borderBottomWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
