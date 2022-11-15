import React, { Component } from 'react';
import { Alert, ScrollView, StatusBar, Text, View } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import { compose } from 'recompose';
import { Button } from '../../components/Button/Button';
import { DottedProgressBar } from '../../components/DottedProgressBar/DottedProgressBar';
import { Header } from '../../components/Header/Header';
import { RadioButton } from '../../components/RadioButtonSchemes/RadioButton';
import { WaveBackground } from '../../components/WaveBackground/WaveBackground';
import * as colors from '../../constants/colors';
import { SCHEMES_CONST } from '../../constants/screenConst';
import container from '../../container/Schemes/index';
import { SchemesStyles } from './SchemesStyles';

class Schemes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sourceType: [
        {
          title: 'Fasttrack',
          isSelected: false,
        },
        {
          title: 'No Income Proof',
          isSelected: false,
        },
        {
          title: 'Income Proof',
          isSelected: false,
        },
      ],
      selectedSourceType: '',
      isDataSaved: false,
      idToEdit: null,
      responseSchemeData: {},
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
      cifCode: '',
      cancelButtonTitle: 'Loan Summary',
      mobileNumber:
        (this.props.navigation &&
          this.props.navigation.state &&
          this.props.navigation.state.params &&
          this.props.navigation.state.params.mobileNumber) ||
        '',
      ismainapplicant: this.props.navigation.state.params.ismainapplicant || false,
      iscoapplicant: this.props.navigation.state.params.iscoapplicant || false,
      isguarantor: this.props.navigation.state.params.isguarantor || false,
      coapplicantUniqueId:
        this.props.navigation.state.params.coapplicantUniqueId || '',
      isViewOnly: false,
      indSelfSoleFlag: false,
      creditButtonFlag: false,
    };
  }
  selectRadioButton(value, index) {
    this.setState({ selectedSourceType: value.title });
  }

  componentDidMount() {
    const dataToAPI = {
      applicant_uniqueid: this.state.applicantUniqueId,
      lead_code: this.state.leadCode,
      roleId: this.props.userDataSelector.userData.data.roleId
    };
    this.props.getLoanSummary({
      dataToAPI,
      callback: (response) => {
        this.setState({
          creditButtonFlag: response?.mainapplicant?.creditButtonFlag,
          isViewOnly:
            response?.mainapplicant?.loanSchemeFreeze ? true : response?.modelAccess[0]?.read ? true :
              false
        })
      }
    })
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
        this.setState({
          indSelfSoleFlag: response?.indSelfSoleFlag || false
        })
        if (response.scheme) {
          const schemeData = response.scheme;
          this.setState({
            selectedSourceType: schemeData.scheme || '',
            // isDataSaved: schemeData.scheme !== undefined ? true : false,
            leadCode:
              this.props.userQDEDataSelector.leadCode || this.state.leadCode,
            applicantUniqueId:
              this.props.userQDEDataSelector.applicantUniqueId ||
              this.state.applicantUniqueId,
            idToEdit: schemeData.id,
            cancelButtonTitle: 'Loan Summary',
          });
        }
      }
    })
  }
  render() {
    const {
      mainContainer,
      buttonContainer,
      cancelButtonStyle,
      cancelButtonTitleStyle,
      inputContainer,
      schemesLabel,
      disableTextStyle,
    } = SchemesStyles;

    return (
      <WaveBackground>
        <StatusBar
          backgroundColor={colors.COLOR_WHITE}
          barStyle={'dark-content'}
          translucent={false}
          hidden={false}
        />
        <Header label={SCHEMES_CONST.HEADER} showLeftIcon={false} onPress={() => {

        }
        }
        />
        <View style={{ alignContent: 'center' }}>
          <View style={{}}>
            <DottedProgressBar totalSteps={this.state.indSelfSoleFlag ? [1, 2, 3, 4, 5] : [1, 2, 3, 4, 5, 6]}
              currentIndex={this.state.indSelfSoleFlag ? 5 : 6} />
          </View>
        </View>
        <View style={mainContainer}>
          <Text style={schemesLabel}>{SCHEMES_CONST.SCHEMES_LABEL}</Text>

          <ScrollView>
            <View style={inputContainer}>
              {this.state.sourceType.map((value, index) => (
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
                      if (!this.state.isViewOnly) {
                        return this.selectRadioButton(value, index);
                      }
                    }}
                  />
                </View>
              ))}
            </View>
            <View
              style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
              <View style={buttonContainer}>
                <Button
                  isDisabled={this.state.isViewOnly}
                  title={SCHEMES_CONST.BUTTON_TITLE_SAVE}
                  onPress={() => {
                    if (this.state.selectedSourceType == '') {
                      showMessage({
                        message: 'Please select option',
                        type: 'danger',
                      });
                    } else {
                      this.props.saveSCHEME({
                        data: {
                          leadCode: this.state.leadCode,
                          selectedSourceType: this.state.selectedSourceType,
                          id: this.state.idToEdit,
                          ismainapplicant: true,
                          applicantUniqueId: this.state.applicantUniqueId,
                        },
                        callback: (response) => {
                          this.setState({
                            isDataSaved: true,
                            cifCode: response.data.cif,
                            responseSchemeData: response.data,
                          });
                        },
                      });
                    }
                  }}
                />
              </View>
              <View style={buttonContainer} pointerEvents={!this.state.isViewOnly ? null : "none"}>
                <Button
                  isDisabled={!this.state.isDataSaved}
                  title={SCHEMES_CONST.BUTTON_TITLE_NEXT}
                  onPress={() => {
                    // this.props.createUpdateCUSTOMER({
                    //   data: {
                    //     applicant_uniqueid: this.state.applicantUniqueId,
                    //     ismainapplicant: this.state.ismainapplicant,
                    //     isguarantor: this.state.isguarantor
                    //   },
                    //   callback: (response) => {
                    //     this.setState({
                    //       responseSchemeData: response.data,
                    //     });
                    //     setTimeout(() => {
                    //       if (
                    //         this.state.responseSchemeData.customerCreation ===
                    //         false ||
                    //         this.state.responseSchemeData.bureauPull === false
                    //       ) {
                    //         Alert.alert(
                    //           'Alert',
                    //           'Please try again',
                    //           [
                    //             {
                    //               text: 'OK',
                    //               onPress: () => {},
                    //               style: 'cancel',
                    //             },
                    //           ],
                    //           { cancelable: false },
                    //         );
                    //       } else {
                    // if (
                    //   this.state.responseSchemeData.BRE === 'System Approved' ||
                    //   this.state.responseSchemeData.BRE === ''
                    // ) {
                    //   this.props.navigation.navigate('LoanSummary', {
                    //     leadName: this.state.leadName,
                    //     applicantUniqueId: this.state.applicantUniqueId,
                    //     leadCode: this.state.leadCode,
                    //   });
                    //   return;
                    // }
                    // if (
                    //   this.state.responseSchemeData.BRE === 'System Rejected' ||
                    //   this.state.responseSchemeData.BRE === 'Manual Underwriting'
                    // )
                    
                    {
                      this.state.selectedSourceType === 'Income Proof'
                        ? this.props.navigation.navigate('BankDetails', {
                          selectedSourceType: this.state.selectedSourceType,
                          applicantUniqueId: this.state.applicantUniqueId,
                          leadCode: this.state.leadCode,
                        })
                        :
                        this.props.navigation.navigate('QdeSuccess', {
                          applicantUniqueId: this.state.applicantUniqueId,
                          redirection: 'qde',
                          offerType: 'tentative',
                          creditButtonFlag: this.state.creditButtonFlag
                        });
                      return;
                    }
                    //       }
                    //     }, 1000)
                    //   },
                    // });
                  }}
                  customContainerStyle={
                    !this.state.isDataSaved
                      ? [
                        cancelButtonStyle,
                        { backgroundColor: colors.COLOR_LIGHT_GREY },
                      ]
                      : cancelButtonStyle
                  }
                  cutomTitleStyle={
                    !this.state.isDataSaved
                      ? disableTextStyle
                      : cancelButtonTitleStyle
                  }
                />
              </View>
            </View>
            <View style={{ width: '48%', alignSelf: 'center' }}>
              <Button
                title={this.state.cancelButtonTitle}
                //isDisabled={!this.state.mainApplicantSummary === true}
                onPress={() => {

                  this.props.navigation.navigate('LoanSummary', {
                    leadName: this.state.leadName,
                    applicantUniqueId: this.state.applicantUniqueId,
                    leadCode: this.state.leadCode,
                    mobileNumber: this.state.mobileNumber,
                    coapplicantUniqueId: this.state.coapplicantUniqueId,
                    ismainapplicant: this.state.ismainapplicant,
                    iscoapplicant: this.state.iscoapplicant,
                    isguarantor: this.state.isguarantor,
                    isViewOnly: this.state.isViewOnly || false,
                  });
                }}
              />
            </View>
          </ScrollView>
        </View>
      </WaveBackground>
    );
  }
}

export default compose(container)(Schemes);
