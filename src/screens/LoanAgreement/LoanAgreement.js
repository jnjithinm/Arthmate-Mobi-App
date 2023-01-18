import React, {Component} from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  StatusBar,
  Platform,
  TouchableOpacity,
  Modal,
  Linking,
  PermissionsAndroid,
  Alert,
  AppState,
} from 'react-native';
import PropTypes from 'prop-types';
import {compose, withProps} from 'recompose';
import container from '../../container/LoanAgreement/index';
import {Header} from '../../components/Header/Header';
import {WaveBackground} from '../../components/WaveBackground/WaveBackground';
import {LOAN_AGREEMENT_CONST} from '../../constants/screenConst';
import {LoanAgreementStyles} from './LoanAgreementStyles';
import {RadioButton} from '../../components/RadioButtonSchemes/RadioButton';
import * as colors from '../../constants/colors';
import {Button} from '../../components/Button/Button';
import {Tooltip, Icon} from 'react-native-elements';
import DropDownPicker from 'react-native-dropdown-picker';
import Pdf from 'react-native-pdf';
import {
  ARROW_DOWN,
  ATTACHMENT,
  UP_ARROW,
  DOWN_ARROW,
} from '../../constants/imgConsts';
import {selectFilePDF, zipSalaryUpload} from '../../../uploadImageUtils';
import {handleError, handleSuccess, handleWarning} from '../../../utils';
import RNFetchBlob from 'rn-fetch-blob';
import {uatURL} from '../../../baseURL';
import CheckBox from '@react-native-community/checkbox';
import {APP_FONTS, FONT_SIZE} from '../../constants/styleConfig';

const RNFS = require('react-native-fs');

class LoanAgreement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sourceType: [
        {
          title: 'eSign Only',
          isSelected: false,
        },
        // {
        //     title: "eStamp Only",
        //     isSelected: false,
        // },
        // {
        //     title: "eSign and eStamp Both",
        //     isSelected: false,
        // },
      ],
      eStamp: 'estamp',
      eSign: 'esign',
      eSign_eStamp: 'esign_estamp',
      selectedSourceType: '',
      selectedRadio: '',
      uploadLoanURL: {},
      uploadLoanName: {
        docName: null,
      },
      isVisible: false,
      uploadLoanUploaded: false,
      responseData: {},
      selectedDocument: {isValid: true},
      dropDownItemSubDocument: [],
      applicantUniqueId:
        (this.props.navigation &&
          this.props.navigation.state &&
          this.props.navigation.state.params &&
          this.props.navigation.state.params.applicantUniqueId) ||
        (this.props.newLeadDataSelector &&
          this.props.newLeadDataSelector.newLead &&
          this.props.newLeadDataSelector.newLead.applicantUniqueId) ||
        '',
      applicantUniqueId:
        (this.props.navigation &&
          this.props.navigation.state &&
          this.props.navigation.state.params &&
          this.props.navigation.state.params.applicantUniqueId) ||
        '',
      disbursementType: 'pre',
      leadCode:
        (this.props.navigation &&
          this.props.navigation.state &&
          this.props.navigation.state.params &&
          this.props.navigation.state.params.leadCode) ||
        '',
      ismainapplicant:
        (this.props.navigation &&
          this.props.navigation.state &&
          this.props.navigation.state.params &&
          this.props.navigation.state.params.ismainapplicant) ||
        '',
      dropDownItemESign: [
        {
          label: 'Aadhaar',
          value: 'Aadhaar',
        },
        {
          label: 'DSC',
          value: 'DSC',
        },
        {
          label: 'Electronic',
          value: 'electronic',
        },
      ],
      selectedDropDownESign: {
        isValid: true,
        value: null,
      },
      selectedDropDownBoth: {
        isValid: true,
        value: null,
      },
      filePathInResponse: '',
      disableProceed: false,
      signerInfo: [],
      signDeskResponse: [],
      ap: '80083113111618459949264',
      getCommonData: '',
      displayEStamp: false,
      downloadLoanAgreementPDF: '',
      esignFilePath: '',
      downloadCallback: true,
      appState: AppState.currentState,
      isViewOnly: false,
      buttonDisable: false,
      check1: false,
      checkVisible: true,
      modalVisible: false,
    };
  }

  selectRadioButton(value, index) {
    this.setState({selectedSourceType: value.title});
  }

  getApi() {
    this.props.getEserviceCommonData({
      data: {
        applicantUniqueId: this.state.applicantUniqueId,
        ismainapplicant: true,
      },
      callback: (response) => {
        console.log("response will come or not",response)
        this.setState({
          filePathInResponse: response?.data?.loanAgreementFilePath?.replace(
            '/var/www/html',
            uatURL.URL,
          ),
          uploadLoanName:
            response?.data?.loanAgreementFilePath == undefined
              ? {docName: null}
              : {
                  docName: response?.data?.loanAgreementFilePath
                    ?.split('\\')
                    .pop()
                    .split('/')
                    .pop(),
                },
          buttonDisable: response?.data?.loanAgreementFilePath ? true : false,
          uploadLoanUploaded: response?.data?.loanAgreementFilePath
            ? true
            : false,
          disableProceed: response?.data?.loanAgreementFilePath ? true : false,
        });
        if (
          response.data.type === 'esign' ||
          response.data.type === 'esign_santion_letter'
        ) {
          console.log("response.datatype",response.data.loanAgreementFilePath)
          this.setState({
            disableProceed: true,
            selectedSourceType: 'eSign Only',
            esignFilePath:
              response?.data?.filePath.replace('/var/www/html', uatURL.URL) ||
              '',
            filePathInResponse:
              response.data.loanAgreementFilePath == undefined
                ? ''
                : response.data.loanAgreementFilePath?.replace(
                    '/var/www/html',
                    uatURL.URL,
                  ),
            uploadLoanName:
              response?.data?.loanAgreementFilePath == undefined
                ? {docName: null}
                : {
                    docName: response?.data?.loanAgreementFilePath
                      .split('\\')
                      .pop()
                      .split('/')
                      .pop(),
                  },
            buttonDisable: response?.data?.loanAgreementFilePath ? true : false,
          });
          if (response?.data?.signingMode === 'aadhaar') {
            this.setState({
              selectedDropDownESign: {
                value: 'Aadhaar',
                label: 'Aadhaar',
                isValid: true,
              },
            });
          } else if (response?.data?.signingMode === 'DSC') {
            this.setState({
              selectedDropDownESign: {
                value: 'DSC',
                label: 'DSC',
                isValid: true,
              },
            });
          } else {
            this.setState({
              selectedDropDownESign: {
                value: 'electronic',
                label: 'Electronic',
                isValid: true,
              },
            });
          }
        }
        if (response?.data?.type === 'esign_estamp') {
          this.setState({
            selectedSourceType: 'eSign and eStamp Both',
            disableProceed: true,
            esignFilePath:
              response?.data?.filePath.replace('/var/www/html', uatURL.URL) ||
              '',
          });
          if (response?.data?.signingMode === 'aadhaar') {
            this.setState({
              selectedDropDownBoth: {
                value: 'Aadhaar',
                label: 'Aadhaar',
                isValid: true,
              },
            });
          } else {
            this.setState({
              selectedDropDownBoth: {
                value: 'DSC',
                label: 'DSC',
                isValid: true,
              },
            });
          }
        }
        if (response?.data?.type === 'estamp') {
          this.setState({
            selectedSourceType: 'eStamp Only',
            disableProceed: true,
            esignFilePath:
              response?.data?.filePath.replace(
                '/var/www/html',
                uatURL.uatURL,
              ) || '',
          });
        }
        this.loanSummary();
      },
    });
  }

  reloadAPI = (nextAppState) => {
    if (
      this.state.appState.match(/inactive|background/) &&
      nextAppState === 'active'
    ) {
      this.getApi();
    }
    this.setState({appState: nextAppState});
  };

  loanSummary() {
    console.log('mjjjjjjuuuuuuu');
    const dataToAPI = {
      applicant_uniqueid: this.state.applicantUniqueId,
      lead_code: this.state.leadCodeFromProps,
      roleId: this.props.userDataSelector.userData.data.roleId,
    };
    this.props.getLoanSummary({
      dataToAPI,
      callback: (response) => {
        this.setState(
          {
            check1: response?.mainapplicant?.isSignCheck,
            checkVisible: response?.mainapplicant?.signCheckBoxFreeze,
            isViewOnly: response?.mainapplicant?.agreementSectionFreeze
              ? true
              : response?.modelAccess[0]?.read
              ? true
              : false,
          },
          // () => {
          //   this.props.getSactionLetter({
          //     data: {
          //       applicantUniqueId: this.state.applicantUniqueId,
          //     },
          //     callback: (response) => {
          //       //    console.log("fffffffffff",response);
          //     },
          //   });
          // },
        );
      },
    });
  }

  checkBoxCheck1() {
    this.setState({
      check1: !this.state.check1,
      modalVisible: true,
    });
  }

  componentDidMount() {
    this.setState({
      getCommonData: this.props.navigation.state.params,
    });
    AppState.addEventListener('change', this.reloadAPI);
    this.getApi();
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this.reloadAPI);
  }

  permissionFunc = async () => {
    if (Platform.OS == 'ios') {
      this.actualDownload();
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          this.actualDownload();
        } else {
          handleError(
            'You need to give storage permission to download the file',
          );
        }
      } catch (err) {
        console.warn(err);
      }
    }
  };

  actualDownload = async () => {
    var link = this.state.filePathInResponse.replace(
      '/var/www/html',
      uatURL.URL,
    );
    console.log("link",link)
    var fileName = `Loan_Agreement_${
      this.state.getCommonData.leadName+Date.now()
    }.pdf`;
    if (link) {
      if (Platform.OS === 'android') {
        const android = RNFetchBlob.android;
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            {
              title: 'App need Storage Permission',
              message: 'App needs access to your Storage ',
              buttonNeutral: 'Ask Me Later',
              buttonNegative: 'Cancel',
              buttonPositive: 'OK',
            },
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            const downloadDest = `${RNFS.ExternalStorageDirectoryPath}/Download/${fileName}`;
            RNFetchBlob.config({
              addAndroidDownloads: {
                useDownloadManager: true,
                notification: true,
                title: fileName,
                path: downloadDest,
                mime: 'application/pdf',
                description: 'File downloaded successfully.',
                mediaScannable: true,
              },
            })
              .fetch('GET', link)
              // eslint-disable-next-line no-console
              .catch((e) => {})
              .then((resp) => {
                Alert.alert(
                  'File downloaded',
                  `${fileName} downloaded successfully.`,
                  [
                    {
                      text: 'OPEN',
                      onPress: () => {
                        android.actionViewIntent(
                          resp.path(),
                          'application/pdf',
                        );
                      },
                    },
                    {
                      text: 'CANCEL',
                      onPress: () => {},
                      style: 'cancel',
                    },
                  ],
                  {cancelable: false},
                );
                resp.path();
              });
          } else {
          }
        } catch (err) {}
      } else {
        const spiltStr = link.split('/');
        const downloadDest = `${RNFS.DocumentDirectoryPath}/${
          spiltStr[spiltStr.length - 1]
        }.pdf`;
        RNFetchBlob.config({
          fileCache: true,
          path: downloadDest,
        })
          .fetch('GET', link, {})
          .then((res) => {
            Alert.alert(
              'File downloaded',
              `${this.state.getCommonData.leadName}.pdf downloaded successfully.`,
              [
                {
                  text: 'OPEN',
                  onPress: () => {
                    RNFetchBlob.ios.openDocument(downloadDest);
                  },
                },
                {
                  text: 'CANCEL',
                  onPress: () => {},
                  style: 'cancel',
                },
              ],
              {cancelable: false},
            );
          });
      }
    }
  };

  actualDownload1 = async () => {
    var link = this.state.esignFilePath.replace('/var/www/html', uatURL.URL);
    var fileName = `SignedDocument_${
      this.state.getCommonData.leadName + Date.now()
    }.pdf`;
    if (link) {
      if (Platform.OS === 'android') {
        const android = RNFetchBlob.android;
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            {
              title: 'App need Storage Permission',
              message: 'App needs access to your Storage ',
              buttonNeutral: 'Ask Me Later',
              buttonNegative: 'Cancel',
              buttonPositive: 'OK',
            },
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            const downloadDest = `${RNFS.ExternalStorageDirectoryPath}/Download/${fileName}`;
            RNFetchBlob.config({
              addAndroidDownloads: {
                useDownloadManager: true,
                notification: true,
                title: fileName,
                path: downloadDest,
                mime: 'application/pdf',
                description: 'File downloaded successfully.',
                mediaScannable: true,
              },
            })
              .fetch('GET', link)
              .catch((e) => {})
              .then((resp) => {
                Alert.alert(
                  'File downloaded',
                  ` ${fileName} downloaded successfully.`,
                  [
                    {
                      text: 'OPEN',
                      onPress: () => {
                        android.actionViewIntent(
                          resp.path(),
                          'application/pdf',
                        );
                      },
                    },
                    {
                      text: 'CANCEL',
                      onPress: () => {},
                      style: 'cancel',
                    },
                  ],
                  {cancelable: false},
                );
                resp.path();
              });
          } else {
            void 0;
          }
        } catch (err) {
          void 0;
        }
      } else {
        const spiltStr = link.split('/');
        const downloadDest = `${RNFS.DocumentDirectoryPath}/${
          spiltStr[spiltStr.length - 1]
        }.pdf`;
        RNFetchBlob.config({
          fileCache: true,
          path: downloadDest,
        })
          .fetch('GET', link, {})
          .then((res) => {
            Alert.alert(
              'File downloaded',
              `${this.state.getCommonData.leadName}.pdf downloaded successfully.`,
              [
                {
                  text: 'OPEN',
                  onPress: () => {
                    RNFetchBlob.ios.openDocument(downloadDest);
                  },
                },
                {
                  text: 'CANCEL',
                  onPress: () => {},
                  style: 'cancel',
                },
              ],
              {cancelable: false},
            );
          });
      }
    }
  };

  permissionFunc1 = async () => {
    if (Platform.OS == 'ios') {
      this.actualDownload1();
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          this.actualDownload1();
        } else {
          handleError(
            'You need to give storage permission to download the file',
          );
        }
      } catch (err) {
        console.warn(err);
      }
    }
  };

  render() {
    const {
      mainContainer,
      mainSalaryView,
      plusImageStyle1,
      mainHeadingText,
      agreementLetter,
      agreementGreet,
      salarySlipName,
      inputContainer,
      buttonContainer,
      toolTipContainer,
      modalText,
      titleStyle,
      plusImageStyle,
      buttonContainerProceed,
      buttonContainerLink,
      informationToolTipText,
      touchableButtonStyle,
      buttonSecondContainer,
      buttonThirdContainer,
      pdfContainer,
      pdf,
      modalView,
      modalView1,
      textStyle,
      textStyle1,
      touchButton,
      text,
    } = LoanAgreementStyles;

    const source = {uri: `${this.state.esignFilePath}`, cache: true};
    const signer_info_buttons = (this.state.signerInfo || []).map(
      (item, index) => (
        <Button
          customContainerStyle={{marginRight: 10}}
          onPress={() => {
            if (!this.state.isViewOnly) {
              Linking.openURL(item.invitation_link);
            }
          }}
          title={
            item.applicantType === 'MainApplicant'
              ? 'Main Applicant'
              : item.applicantType === 'CoApplicant'
              ? 'Co Applicant'
              : item.applicantType === 'Gurantor'
              ? 'Guarantor'
              : ''
          }></Button>
      ),
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
          label={LOAN_AGREEMENT_CONST.HEADER}
          showLeftIcon={false}
          onPress={() => {}}
        />
        <View
          style={{justifyContent: 'center', alignItems: 'center', padding: 20}}>
          <Text
            style={
              mainHeadingText
            }>{`${this.state.getCommonData.leadName}`}</Text>
          <Text style={mainHeadingText}>{`Individual- ${
            this.state.getCommonData.salaried ? 'Self-Employed' : 'Salaried'
          }`}</Text>
        </View>
        <ScrollView style={{marginBottom: 20}}>
          <View style={mainContainer}>
            <Modal
              animationType={'fade'}
              transparent={false}
              visible={this.state.isVisible}
              onRequestClose={() => {}}>
              {/*All views of Modal*/}

              <View style={pdfContainer}>
                <Pdf
                  source={source}
                  onLoadComplete={(numberOfPages, InResponse) => {}}
                  onPageChanged={(page, numberOfPages) => {}}
                  onError={(error) => {}}
                  onPressLink={(uri) => {}}
                  style={pdf}
                />
              </View>

              <TouchableOpacity
                style={modalView}
                onPress={() => {
                  this.setState({isVisible: !this.state.isVisible});
                }}>
                <Text style={modalText}>Click to close</Text>
              </TouchableOpacity>
            </Modal>

            <Modal
              animationType={'fade'}
              transparent={true}
              visible={this.state.modalVisible}
              onRequestClose={() => {}}>
              <View style={modalView1}>
                <Text style={text}>
                  {
                    "Do you Really want to proceed to Loan Agreement. Remember this action is irreversible this can't be undone."
                  }
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    alignItems: 'center',
                  }}>
                  <TouchableOpacity
                    style={[
                      touchButton,
                      {backgroundColor: colors.COLOR_WHITE, borderWidth: 1.5},
                    ]}
                    onPress={() => {
                      this.setState({
                        check1: !this.state.check1,
                        modalVisible: false,
                      });
                    }}>
                    <Text
                      style={[
                        text,
                        {
                          color: colors.COLOR_LIGHT_NAVY_BLUE,
                          textAlign: 'center',
                        },
                      ]}>
                      No
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[
                      touchButton,
                      {backgroundColor: colors.COLOR_LIGHT_NAVY_BLUE},
                    ]}
                    onPress={() => {
                      this.props.saveSignInFlag({
                        data: {
                          applicantUniqueId: this.state.applicantUniqueId,
                        },
                        callback: (response) => {
                          console.log(
                            'reeeee',
                            JSON.stringify(response, null, 4),
                          );
                          // console.log("kkkkk",response.signDeskResponse.signdeskResponse.signer_info[0].invitation_link);
                          this.setState(
                            {
                              modalVisible: false,
                              signDeskResponse:
                                response?.signDeskResponse?.signdeskResponse
                                  ?.signer_info,
                            },
                            () => {
                              this.getApi();
                              // Linking.openURL(response?.signDeskResponse?.signdeskResponse?.signer_info[0]?.invitation_link || '')
                            },
                          );
                        },
                      });
                    }}>
                    <Text
                      style={[text, {color: '#ffffff', textAlign: 'center'}]}>
                      Yes
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>

            {/* <View style={{ flexDirection: "row", justifyContent: 'flex-start', alignItems: 'center', marginBottom: 10 }}>
                            <Text style={{
                                color: colors.COLOR_LIGHT_NAVY_BLUE,
                                fontFamily: APP_FONTS.NunitoBold,
                                fontSize: FONT_SIZE.l,
                            }}>
                                {`Sign`}
                            </Text>
                            <CheckBox
                                disabled={this.state.checkVisible}
                                value={this.state.check1}
                                boxType="square"
                                onValueChange={() => this.checkBoxCheck1()}
                                tintColors={{ true: '#334e9e', false: 'black' }}
                            />

                        </View> */}
      
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginBottom: 30,
                }}>
                <TouchableOpacity
                  style={[
                    {
                      width: '50%',
                      height: 45,
                      borderRadius: 30,
                      justifyContent: 'center',
                      backgroundColor:this.state.esignFilePath ?colors.COLOR_LIGHT_GREY: colors.COLOR_LIGHT_NAVY_BLUE,
                    
                    },
                  ]}
                  disabled={this.state.esignFilePath}
                  onPress={() => {
                    !this.state.checkVisible &&
                      this.setState({
                        check1: !this.state.check1,
                        modalVisible: true,
                      });
                  }}>
                  <Text style={[text, {color: '#ffffff', textAlign: 'center'}]}>
                    Sign Sanction Letter
                  </Text>
                </TouchableOpacity>
              </View>
   
            <View style={buttonContainerLink}>
              {(this.state.signDeskResponse || []).map((item, index) => (
                <Button
                  customContainerStyle={{marginRight: 10}}
                  onPress={() => {
                    if (!this.state.isViewOnly) {
                      Linking.openURL(item.invitation_link);
                    }
                  }}
                  title={
                    item.applicantType === 'MainApplicant'
                      ? 'Main Applicant'
                      : item.applicantType === 'CoApplicant'
                      ? 'Co Applicant'
                      : item.applicantType === 'Gurantor'
                      ? 'Guarantor'
                      : ''
                  }></Button>
              ))}
            </View>
            {this.state.esignFilePath != '' &&
              this.state.esignFilePath != undefined && (
                <View style={[mainSalaryView, {marginRight: 15}]}>
                  <Image source={ATTACHMENT} style={plusImageStyle1} />
                  <Text style={[salarySlipName,{marginLeft:35}]}>
                 
                    {this.state.esignFilePath
                      .split('\\')
                      .pop()
                      .split('/')
                      .pop()}
                  </Text>

                  <Icon
                    onPress={() => {
                      // if (!this.state.isViewOnly) {
                      this.permissionFunc1();
                      // } else {
                      //     handleWarning("User access denied")
                      // }
                    }}
                    style={{marginLeft: 10}}
                    size={30}
                    name="download"
                    type="antdesign"
                    color={'black'}
                  />
                </View>
              )}

            <Text style={agreementGreet}>
              {LOAN_AGREEMENT_CONST.AGREEMENT_GREET}
            </Text>

            <View style={inputContainer}>
              {this.state.sourceType.map((value, index) => (
                <View key={index} style={{flexDirection: 'row'}}>
                  <View style={{flex: 1}}>
                    <RadioButton
                      title={value.title}
                      isSelected={
                        this?.state?.selectedSourceType?.toLowerCase() ===
                        value?.title?.toLowerCase()
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

                  {value.title === 'eSign Only' && (
                    <View style={{flex: 1, justifyContent: 'flex-start'}}>
                      <DropDownPicker
                        defaultValue={this.state.selectedDropDownESign.value}
                        disabled={
                          this.state.isViewOnly
                          // this.state.selectedSourceType == "eSign and eStamp Both" || this.state.selectedSourceType == "eStamp Only" || this.state.selectedSourceType == ""
                        }
                        items={this.state.dropDownItemESign}
                        containerStyle={{flex: 1}}
                        style={{backgroundColor: '#ffffff', borderWidth: 0}}
                        itemStyle={{
                          justifyContent: 'flex-start',
                          marginLeft: 4,
                        }}
                        placeholder={
                          LOAN_AGREEMENT_CONST.PLACEHOLDER_DROPDOWN_FAMILY
                        }
                        dropDownStyle={{backgroundColor: '#ffffff'}}
                        onChangeItem={(item) =>
                          this.setState(
                            {selectedDropDownESign: {...item, isValid: true}},
                            () => {},
                          )
                        }
                        customArrowUp={() => <Image source={UP_ARROW} />}
                        customArrowDown={() => <Image source={DOWN_ARROW} />}
                        labelStyle={textStyle1}
                        selectedLabelStyle={textStyle}
                      />
                    </View>
                  )}

                  {value.title === 'eSign and eStamp Both' && (
                    <View style={{flex: 1, justifyContent: 'flex-start'}}>
                      <DropDownPicker
                        defaultValue={this.state.selectedDropDownBoth.value}
                        disabled={
                          this.state.isViewOnly
                          // this.state.selectedSourceType == "eSign Only" || this.state.selectedSourceType == "eStamp Only" || this.state.selectedSourceType == ""
                        }
                        items={this.state.dropDownItemESign}
                        containerStyle={{flex: 1}}
                        style={{backgroundColor: '#ffffff', borderWidth: 0}}
                        itemStyle={{
                          justifyContent: 'flex-start',
                          marginLeft: 4,
                        }}
                        placeholder={
                          LOAN_AGREEMENT_CONST.PLACEHOLDER_DROPDOWN_FAMILY
                        }
                        dropDownStyle={{backgroundColor: '#ffffff'}}
                        onChangeItem={(item) =>
                          this.setState(
                            {selectedDropDownBoth: {...item, isValid: true}},
                            () => {},
                          )
                        }
                        customArrowUp={() => <Image source={UP_ARROW} />}
                        customArrowDown={() => <Image source={DOWN_ARROW} />}
                        labelStyle={textStyle1}
                        selectedLabelStyle={textStyle}
                      />
                    </View>
                  )}
                </View>
              ))}
            </View>
            {this.state.esignFilePath != '' && (
              <View>
                <Text style={agreementLetter}>
                  {LOAN_AGREEMENT_CONST.AGREEMENT_LETTER}
                </Text>

                <TouchableOpacity
                  style={[modalView, {width: '60%'}]}
                  onPress={() => {
                    // if (!this.state.isViewOnly) {
                    this.setState({isVisible: true});
                    // } else {
                    //     handleWarning("User access denied")
                    // }
                  }}>
                  <Text style={modalText}>Click To Open PDF</Text>
                </TouchableOpacity>
              </View>
            )}

            <View style={buttonContainerProceed}>
              <Button
                title={LOAN_AGREEMENT_CONST.BUTTON_PROCEED}
                // isDisabled={this.state.disableProceed}
                onPress={() => {
                  if (!this.state.isViewOnly) {
                    if (this.state.selectedSourceType === 'eStamp Only') {
                      this.props.requestStampPaper({
                        data: {
                          applicantUniqueId: this.state.applicantUniqueId,
                          ismainapplicant: true,
                          type: this.state.eStamp,
                        },
                        callback: (response) => {
                          this.setState({
                            disableProceed: response.data.status === 'success',
                            //displayEStamp: response.data.status === "success",
                          });
                        },
                      });
                    } else if (
                      this.state.selectedSourceType === 'eSign Only' &&
                      this.state.selectedDropDownESign.value != null
                    ) {
                      this.props.requestStampPaper({
                        data: {
                          applicantUniqueId: this.state.applicantUniqueId,
                          ismainapplicant: true,
                          type: this.state.eSign,
                          signingMode: this?.state?.selectedDropDownESign?.value?.toLowerCase(),
                        },
                        callback: (response) => {
                          this.setState({
                            disableProceed: response.data.status === 'success',
                            signerInfo: response.data.signer_info,
                          });
                        },
                      });
                    } else if (
                      this.state.selectedSourceType ===
                        'eSign and eStamp Both' &&
                      this.state.selectedDropDownBoth.value != null
                    ) {
                      this.props.requestStampPaper({
                        data: {
                          applicantUniqueId: this.state.applicantUniqueId,
                          ismainapplicant: true,
                          type: this.state.eSign_eStamp,
                          signingMode: this?.state?.selectedDropDownBoth?.value?.toLowerCase(),
                        },
                        callback: (response) => {
                          this.setState({
                            disableProceed: response.data.status === 'success',
                          });
                        },
                      });
                    } else {
                      this.state.selectedSourceType == '' &&
                      handleError('Please select radio button.')
                        ? null
                        : handleError('Please select dropdown value');
                    }
                  } else {
                    handleWarning('User access denied');
                  }
                }}
              />
            </View>
            {/*  {
                            this.state.displayEStamp == true &&
                            <View style={{ flexDirection: 'row', marginTop: 20, justifyContent: "center" }}>
                                <Image style={{ height: 18, width: '5%', marginRight: 5 }}
                                    source={ATTACHMENT}
                                />
                                <Text>Loan Agreement</Text>
                                <Icon style={{ marginLeft: 10 }}
                                    size={20}
                                    name="download"
                                    type="antdesign"
                                    color={'black'}
                                />
                                <View style={{ marginLeft: 5, marginTop: -5 }}>
                                    <Tooltip
                                        popover={<Text>You can download the processed agreement after eStamping/eSigning.</Text>}
                                        backgroundColor={colors.COLOR_LILAC}
                                        skipAndroidStatusBar={true}
                                        overlayColor={"transparent"}
                                        withPointer={true}
                                        height={80}>
                                        <View style={toolTipContainer}>
                                            <Text style={informationToolTipText}>{"?"}</Text>
                                        </View>
                                    </Tooltip>
                                </View>
                            </View>
                        } */}
            <View style={buttonContainerLink}>{signer_info_buttons}</View>

            {/* <Text style={agreementGreet}>
              {LOAN_AGREEMENT_CONST.LOAN_AGREEMENT}
            </Text> */}
            {/* <View style={buttonContainer}>
              <Button
                style={touchableButtonStyle}
                // isDisabled={false}
                title={LOAN_AGREEMENT_CONST.BUTTON_DOWNLOAD_LOAN}
                onPress={() => {
                  if (!this.state.isViewOnly) {
                    this.props.downloadLoanAgreement({
                      data: {
                        applicantUniqueId: this.state.applicantUniqueId,
                      },
                      callback: (response) => {
                        this.setState({
                          downloadLoanAgreementPDF: response.filePath,
                          downloadCallback: false,
                        });
                      },
                    });
                  } else {
                    handleWarning('User access denied');
                  }
                }}>
                <Icon
                  style={{marginTop: 15, marginLeft: 20, alignSelf: 'center'}}
                  size={25}
                  name="pluscircle"
                  type="antdesign"
                  color={'white'}
                />
              </Button>
              <View style={{alignSelf: 'center', marginLeft: 20}}>
                <Tooltip
                  popover={
                    <Text>Download agreement for manual Stamping/Signing.</Text>
                  }
                  backgroundColor={colors.COLOR_LILAC}
                  skipAndroidStatusBar={true}
                  overlayColor={'transparent'}
                  withPointer={true}
                  height={80}>
                  <View style={toolTipContainer}>
                    <Text style={informationToolTipText}>{'?'}</Text>
                  </View>
                </Tooltip>
              </View>
            </View> */}
            {/* {this.state.downloadLoanAgreementPDF != '' &&
              this.state.downloadLoanAgreementPDF != undefined && (
                <View style={[mainSalaryView, {marginRight: 15}]}>
                  <Image source={ATTACHMENT} style={plusImageStyle1} />
                  <Text style={salarySlipName}>
                    {this.state.downloadLoanAgreementPDF
                      .split('\\')
                      .pop()
                      .split('/')
                      .pop()}
                  </Text>

                  <Icon
                    onPress={() => {
                      if (!this.state.isViewOnly) {
                        this.permissionFunc();
                      } else {
                        handleWarning('User access denied');
                      }
                    }}
                    style={{marginLeft: 10}}
                    size={30}
                    name="download"
                    type="antdesign"
                    color={'black'}
                  />
                </View>
              )} */}
            {/* 
            <View style={buttonSecondContainer}>
              <Button
                style={touchableButtonStyle}
                isDisabled={this.state.downloadCallback}
                title={LOAN_AGREEMENT_CONST.BUTTON_UPLOAD_LOAN}
                onPress={async () => {
                  if (!this.state.isViewOnly) {
                    let fileDetails = await selectFilePDF();
                    this.setState((state, props) => ({
                      uploadLoanName: {
                        ...state.uploadLoanName,
                        docName: fileDetails?.name,
                      },
                      uploadLoanURL: {
                        fileCopyUri: fileDetails?.fileCopyUri,
                      },
                    }));
                    const callback = (response) => {
                      this.componentDidMount();
                      this.setState({
                        uploadLoanUploaded: true,
                        filePathInResponse:
                          response?.loanAgreementFilePath?.replace(
                            '/var/www/html',
                            uatURL.URL,
                          ) || '',
                        buttonDisable: response?.data?.loanAgreementFilePath
                          ? true
                          : false,
                        uploadLoanName:
                          response?.data?.loanAgreementFilePath !== undefined
                            ? {
                                docName: response?.data?.loanAgreementFilePath
                                  .split('\\')
                                  .pop()
                                  .split('/')
                                  .pop(),
                              }
                            : {docName: null},
                      });
                    };
                    zipSalaryUpload(
                      this.state.uploadLoanURL,
                      this.state.applicantUniqueId,
                      this.props.uploadLoanAgreement,
                      callback,
                    );
                  } else {
                    handleWarning('User access denied');
                  }
                }}>
                <Icon
                  style={{marginTop: 15, marginLeft: 20, alignSelf: 'center'}}
                  size={25}
                  name="pluscircle"
                  type="antdesign"
                  color={'white'}
                />
              </Button>
              <View
                style={{
                  flexDirection: 'row',
                  alignSelf: 'center',
                  marginLeft: 20,
                }}>
                <Tooltip
                  popover={
                    <Text>
                      Upload agreement,duty signed by all the stakeholders.
                    </Text>
                  }
                  backgroundColor={colors.COLOR_LILAC}
                  skipAndroidStatusBar={true}
                  overlayColor={'transparent'}
                  withPointer={true}
                  height={80}>
                  <View style={toolTipContainer}>
                    <Text style={informationToolTipText}>{'?'}</Text>
                  </View>
                </Tooltip>
              </View>
            </View> */}
            {this.state.uploadLoanName.docName !== null &&
              this.state.uploadLoanName.docName !== undefined && (
                <View style={mainSalaryView}>
                  <Image source={ATTACHMENT} style={plusImageStyle1} />
                  <TouchableOpacity
                    style={{width: '70%', marginTop: 20}}
                    onPress={() => {
                      Linking.openURL(this.state.filePathInResponse);
                    }}>
                    <Text style={[salarySlipName, {alignSelf: 'center'}]}>
                      {this.state.uploadLoanName?.docName}
                    </Text>
                  </TouchableOpacity>
                  <Icon
                    onPress={() => {
                      if (!this.state.isViewOnly) {
                        // if (this.state.uploadLoanUploaded == true) {
                        //   this.props.deleteLoanAgreement({
                        //     data: {
                        //       applicantUniqueId: this.state.applicantUniqueId,
                        //       filePathInResponse: this.state.filePathInResponse,
                        //     },
                        //     callback: (response) => {
                        //       console.log("response",response)
                        //       this.setState((state, props) => ({
                        //         uploadLoanName: {
                        //           ...state.uploadLoanName,
                        //           docName: null,
                        //         },
                        //         uploadLoanUploaded: false.valueOf,
                        //         filePathInResponse: '',
                        //       }));
                        //     },
                        //   });
                        // } else {
                        //   this.setState((state, props) => ({
                        //     uploadLoanName: {
                        //       ...state.uploadLoanName,
                        //       docName: null,
                        //     },
                        //   }));
                        // }
                        this.actualDownload();
                      } else {
                        handleWarning('User access denied');
                      }
                    }}
                    style={{marginLeft: 10}}
                    size={30}
                    name="download"
                    type="antdesign"
                    color={'black'}
                  />
                </View>
              )}

            {/* {this.state.buttonDisable === false ?
                                <View style={buttonThirdContainer}>
                                    <View style={{ flex: 1, marginRight: 20 }}>
                                        <Button title={LOAN_AGREEMENT_CONST.BUTTON_CONTINUE_LATER}
                                            onPress={() => {
                                                this.props.navigation.navigate('LoanSummary', { applicantUniqueId: this.state.applicantUniqueId, leadCode: this.state.leadCode, ismainapplicant: this.state.ismainapplicant })
                                            }} />
                                    </View>
                                    <View style={{ flex: 1, }}>
                                        <Button title={LOAN_AGREEMENT_CONST.BUTTON_SUBMIT}
                                            onPress={() => {
                                                this.props.navigation.navigate('PreDisbursalDocument', {
                                                    applicantUniqueId: this.state.applicantUniqueId, leadCode: this.state.leadCode, ismainapplicant: this.state.ismainapplicant

                                                });
                                            }} />
                                    </View>
                                </View>
                                :
                                <View style={{ alignSelf: 'center', width: '60%', marginTop: 30}}>
                                    <Button title={"Loan Summary"}
                                        onPress={() => {
                                            this.props.navigation.navigate('LoanSummary', { applicantUniqueId: this.state.applicantUniqueId, leadCode: this.state.leadCode, ismainapplicant: this.state.ismainapplicant })
                                        }} />
                                </View>
                            } */}
            <View style={{alignSelf: 'center', width: '60%', marginTop: 30}}>
              <Button
                title={'Loan Summary'}
                onPress={() => {
                  this.props.navigation.navigate('LoanSummary', {
                    applicantUniqueId: this.state.applicantUniqueId,
                    leadCode: this.state.leadCode,
                    ismainapplicant: this.state.ismainapplicant,
                  });
                }}
              />
            </View>
          </View>
        </ScrollView>
      </WaveBackground>
    );
  }
}

LoanAgreement.propTypes = {
  userDataSelector: PropTypes.object,
  requestStampPaper: PropTypes.func,
};

export default compose(
  container,
  withProps(
    (getEserviceCommonData) => getEserviceCommonData,
    (requestStampPaper) => requestStampPaper,
    (uploadLoanAgreement) => uploadLoanAgreement,
    (deleteLoanAgreement) => deleteLoanAgreement,
  ),
)(LoanAgreement);
