import React, { Component } from 'react';
import {
  Image,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View, Linking
} from 'react-native';
import { Icon } from 'react-native-elements';
import { FloatingLabelInput } from 'react-native-floating-label-input';
import { compose, withProps } from 'recompose';
import { selectFilePDF, zipSalaryFiles, uploadDocuments, zipFileDisbursementUpload } from '../../../uploadImageUtils';
import { handleError, handleSuccess } from '../../../utils';
import { Button } from '../../components/Button/Button';
import { DottedProgressBar } from '../../components/DottedProgressBar/DottedProgressBar';
import { Header } from '../../components/Header/Header';
import { RadioButton } from '../../components/RadioButton/RadioButton';
import { WaveBackground } from '../../components/WaveBackground/WaveBackground';
import * as colors from '../../constants/colors';
import { baseURL, uatURL } from '../../../baseURL';
import {
  DELETEBUTTON,
  PLACEHOLDER_IMAGE,
  UPLOADIMAGEPDF,
} from '../../constants/imgConsts';
import { BANKDETAILS_CONST } from '../../constants/screenConst';
import container from '../../container/BankDetails';
import { BankDetailsStyles } from './BankDetailsStyles';
import { NavigationEvents } from 'react-navigation';

class BankDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sourceType: [
        {
          title: 'Upload Bank Statement',
          isSelected: false,
        },
        {
          title: 'Send link to customer',
          isSelected: false,
        },
      ],
      selectedSourceType: '',
      dropDownBankName: [],
      bankDetailsBankName: { isValid: true },
      saveDisable: false,
      email: {
        value: null,
        isValid: true,
      },
      password: [
        {
          value: null,
          isValid: true,
        },
      ],
      flatListPassword: {
        value: null,
        isValid: true,
      },
      bankStatement: null,
      documentName: '',
      displayfirstMonth: '',
      displaySecMonth: '',
      displayThirdMonth: '',
      firstMonthFile: {
        docName: null,
        docType: 'Salary Slip',
        ismainapplicant: true,
      },
      firstMonthURI: {},
      secondMonthFile: {
        docName: null,
        docType: 'Salary Slip',
        ismainapplicant: true,
      },
      secondMonthURI: {},
      thirdMonthFile: {
        docName: null,
        docType: 'Salary Slip',
        ismainapplicant: true,
      },
      thirdMonthURI: {},
      fetchURL: '',
      firstFileUploaded: false,
      secondFileUploaded: false,
      thirdFileUploaded: false,
      firstMonthFileUploadedInfo: {},
      secondMonthFileUploadedInfo: {},
      thirdMonthFileUploadedInfo: {},
      bankDetailFlatlist: false,
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
      getDDEComAPI:
        (this.props.navigation &&
          this.props.navigation.state &&
          this.props.navigation.state.params &&
          this.props.navigation.state.params.getDDEComAPI) ||
        {},
      iscoapplicant:
        (this.props.navigation.state &&
          this.props.navigation.state.params &&
          this.props.navigation.state.params.iscoapplicant) ||
        false,
      isguarantor:
        (this.props.navigation.state &&
          this.props.navigation.state.params &&
          this.props.navigation.state.params.isguarantor) ||
        false,
      coapplicantUniqueId:
        (this.props.navigation.state.params &&
          this.props.navigation.state.params.coapplicantUniqueId) ||
        '',
      monthArray: [],
      firstDisable: false,
      secondDisable: false,
      thirdDisable: false,
      mobileNumber:
        (this.props.navigation &&
          this.props.navigation.state &&
          this.props.navigation.state.params &&
          this.props.navigation.state.params.mobileNumber) ||
        '',
      ismainapplicant: this.props.navigation.state.params.ismainapplicant || false,
      isViewOnly: false,
    };
  }
  componentWillUnmount() {
    if (this.focusListener != null && this.focusListener.remove) {
      this.focusListener.remove();
    }
  }
  setEmailId(text) {
    this.setState({
      email: {
        ...this.state.email,
        value: text,
        isValid: true,
      },
    });
  }
  setPassword(text) {
    this.setState({
      password: {
        ...this.state.password,
        value: text,
        isValid: true,
      },
    });
  }
  setFlatListPassword(text) {
    this.setState({
      flatListPassword: {
        ...this.state.flatListPassword,
        value: text,
        isValid: true,
      },
    });
  }

  setLast3Months = (data) => {
    var monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let initialDate = data.currentDate && data.currentDate.toString();
    let splitedDate =
      initialDate.split(' ').slice(0, 3).join(' ') +
      ' ' +
      initialDate.split(' ')[5];
    var today = new Date(splitedDate);
    var month = today.getMonth();
    var last3Months = [];
    var MonthsArray = [];
    const docName = [];
    const filePath = [];
    for (let i = 1; i < 4; i++) {
      var newMonth = today.getMonth() - i;
      var newYear = today.getFullYear();
      let monthInWords = monthNames[newMonth];
      if (newMonth < 0) {
        newYear = today.getFullYear() - 1;
        monthInWords = monthNames[12 + newMonth];
      }
      var newDate = new Date(today.getDate(), newMonth, newYear);
      const monthYear = monthInWords + ' ' + newYear;

      last3Months.push(monthYear);
      MonthsArray.push(monthInWords);

      if (data.bankDetails) {
        const { salarySlip } = data.bankDetails;
        salarySlip.forEach((item) => {
          if (
            item.docType.toString().toLowerCase() === monthInWords.toLowerCase()
          ) {
            const docNameArray = item.filePath.split('/');
            const fileName = docNameArray.pop();
            const path = docNameArray.join('/') + '/'
            docName.push({ "fileName": fileName, "docType": item.docType, "month": monthInWords, 'filePath': item.filePath, 'id': item.id, 'path': path })
            filePath.push(docNameArray.join('/') + '/');
          }
        });
      }
    }

    this.setState({
      monthArray: MonthsArray
    })

    var firstMonth = null
    var secMonth = null
    var thirdMonth = null
    var filePathOne = null
    var filePathTwo = null
    var filePaththree = null
    var docNameOne = null
    var docNameTwo = null
    var docNameThree = null

    docName.forEach((item) => {
      if (item.docType.toLowerCase() === MonthsArray[0].toLowerCase()) {
        firstMonth = item.fileName
        filePathOne = item.path
        docNameOne = item
        this.setState({ firstMonthURI: item.filePath, saveDisable: true })
      }
      if (item.docType.toLowerCase() === MonthsArray[1].toLowerCase()) {
        secMonth = item.fileName
        filePathTwo = item.path
        docNameTwo = item
        this.setState({ secondMonthURI: item.filePath, saveDisable: true })
      }
      if (item.docType.toLowerCase() === MonthsArray[2].toLowerCase()) {
        thirdMonth = item.fileName
        filePaththree = item.path
        docNameThree = item
        this.setState({ thirdMonthURI: item.filePath, saveDisable: true })

      }
    })


    this.setState({
      displayfirstMonth: last3Months[0],
      displaySecMonth: last3Months[1],
      displayThirdMonth: last3Months[2],

    })

    const payload = {

      firstMonthFile: {
        ...this.state.firstMonthFile,
        // displayMonthName: last3Months[0],
        monthName: MonthsArray[0],
        docName: firstMonth,
      },
      secondMonthFile: {
        ...this.state.secondMonthFile,
        // displayMonthName: last3Months[0],
        monthName: MonthsArray[1],
        docName: secMonth,
      },
      thirdMonthFile: {
        ...this.state.thirdMonthFile,
        // displayMonthName: last3Months[2],
        monthName: MonthsArray[2],
        docName: thirdMonth,
      },
    };

    if (filePath.length) {
      payload.firstFileUploaded = true;
      payload.secondFileUploaded = true;
      payload.thirdFileUploaded = true;
      payload.firstMonthFileUploadedInfo = {
        ...this.state.firstMonthFileUploadedInfo,
        docName: docNameOne,
        applicantUniqueId: !this.state.iscoapplicant || !this.state.isguarantor ? this.state.applicantUniqueId : this.state.coapplicantUniqueId,
        ismainapplicant: !this.state.iscoapplicant || !this.state.isguarantor,
        docType: this.state.firstMonthFile.docType,
        filePath: filePathOne,
      };
      payload.secondMonthFileUploadedInfo = {
        ...this.state.secondMonthFileUploadedInfo,
        docName: docNameTwo,
        applicantUniqueId: !this.state.iscoapplicant || !this.state.isguarantor ? this.state.applicantUniqueId : this.state.coapplicantUniqueId,
        ismainapplicant: !this.state.iscoapplicant || !this.state.isguarantor,
        docType: this.state.secondMonthFile.docType,
        filePath: filePathTwo,
      };
      payload.thirdMonthFileUploadedInfo = {
        ...this.state.thirdMonthFileUploadedInfo,
        docName: docNameThree,
        applicantUniqueId: !this.state.iscoapplicant || !this.state.isguarantor ? this.state.applicantUniqueId : this.state.coapplicantUniqueId,
        ismainapplicant: !this.state.iscoapplicant || !this.state.isguarantor,
        docType: this.state.thirdMonthFile.docType,
        filePath: filePaththree,
      };
    }
    this.setState({ ...payload });
  };

  setData = () => {
    this.setLast3Months(this.state.getDDEComAPI);
  };

  componentDidMount() {
     this.props.navigation.addListener('didFocus', () => {
    })
    const dataToAPI = {
      applicant_uniqueid: this.state.applicantUniqueId,
      lead_code: this.state.leadCode,
      roleId: this.props.userDataSelector.userData.data.roleId
    };
    this.props.getLoanSummary({
      dataToAPI,
      callback: (response) => {
        this.setState({
          isViewOnly:
           response?.mainapplicant?.ddeFreezeFlag ? true : response?.modelAccess[0]?.read ? true :
            false
        })
      }
    })
    const dataToAPI1 = {
      applicantUniqueId: !(this.state.iscoapplicant || this.state.isguarantor )? this.state.applicantUniqueId : this.state.coapplicantUniqueId,
      // ismainapplicant: this.state.ismainapplicant,
    };
    // this.props.getDDECommonAPI({
    //   dataToAPI1,
    //   callback: (response) => {
    //   },
    // });
    if (!this.state.getDDEComAPI.currentDate) {
      //API DATA NOT FOUND
      const dataToAPI = {
        applicantUniqueId: !(this.state.iscoapplicant || this.state.isguarantor )? this.state.applicantUniqueId : this.state.coapplicantUniqueId,
        // ismainapplicant: this.state.ismainapplicant,
      };
      this.props.getDDECommonAPI({
        dataToAPI,
        callback: (response) => {
          this.setState(
            {
              getDDEComAPI: response?.data,
              bankStatement: response?.data?.bankDetails?.bankStatementDetails?.filePath?.replace('/var/www/html', uatURL.URL) || null,
              documentName: response?.data?.bankDetails?.bankStatementDetails?.documentName,
            },
            () => {

              this.setData();
            },
          );
        },
      });
    } else {
      this.setData();
    }
  }

  selectRadioButton(value, index) {
    if(value.title == "Send link to customer"){
      const dataToAPI = {
        applicantUniqueId: this.state.applicantUniqueId,
        type: "sendLinkToCustomer"
      };
      this.props.getFinbitUrl({
        dataToAPI,
        callback: (response) => {

        }
      })
      this.setState({ selectedSourceType: value.title });
    }
    else{
      const dataToAPI = {
        applicantUniqueId: this.state.applicantUniqueId,
        type: "uploadBankStatement"
      };
      this.props.getFinbitUrl({
        dataToAPI,
        callback: (response) => {
        
          Linking.openURL(response.data.finbitLink)

        }
      })
      this.setState({ selectedSourceType: value.title });
    }
  }

  renderRadioButton() {
    const { inputContainer } = BankDetailsStyles;
    return (
      <View style={inputContainer}>
        {this.state.sourceType.map((value, index) => (
          <View style={{marginBottom: 10}} key={index}>
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
    );
  }

 
  renderSendLinkToCustomer() {
    const { buttonContainer1 } = BankDetailsStyles;
    return (
      <View style={[buttonContainer1, { alignSelf: 'flex-start' }]}>
        <Button
          //isDisabled={this.state.isViewOnly}
          title={BANKDETAILS_CONST.BUTTON_TITLE_RESENDLINK}
          onPress={() => {
            if (!this.state.isViewOnly) {
            }
          }}
        />
      </View>
    )
  }

  renderBankStatement() {
    const {
      uploadSalaryText,
      imageContainer,
      salarySlipName,
      uploadContainer,
      flexRowStyle,
      errorLabel,
      plusImageStyle,
      plusImageStyle1,
      salarySlipText,
      mainSalaryView,
    } = BankDetailsStyles;
    return (
      <View>
        <Text style={uploadSalaryText}>
          {'Upload Bank Statement'}
        </Text>
        <View style={uploadContainer}>

          <View style={[flexRowStyle, uploadContainer]}>
            <TouchableOpacity
              style={imageContainer}
              onPress={async () => {
                if (!this.state.isViewOnly) {
                  let fileDetails = await uploadDocuments(true);
                  var data ={
                    applicantUniqueId: this.state.applicantUniqueId,
                    bankDetails: true,
                  }
                  const callback = (response) => {
                    this.setState({
                      bankStatement : response.filePath.replace('/var/www/html', uatURL.URL),
                      documentName : response.documentName
                    })
                  }
                  zipFileDisbursementUpload(fileDetails, data, this.props.uploadDoc, callback);
                }
              }}

              >
              <Image source={PLACEHOLDER_IMAGE} style={plusImageStyle} />
            </TouchableOpacity>
            <Text style={salarySlipText}>
              Upload Bank Statement
            </Text>
          </View>
          {this.state.bankStatement != null &&
            (
              <View style={mainSalaryView}>
                <Image source={UPLOADIMAGEPDF} style={plusImageStyle1} />
                <Text style={salarySlipName}>
                  {this.state.documentName}
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    if (!this.state.isViewOnly) {

                        this.props.deleteSalarySLIP({
                          data: {
                            applicantUniqueId: !(this.state.iscoapplicant || this.state.isguarantor) ?  this.state.firstMonthFileUploadedInfo.applicantUniqueId : this.state.coapplicantUniqueId ,
                            docType: 'salarySlip',
                          
                          },
                          callback: (response) => {
                            this.setState(() => ({
                              bankStatement: null,
                              documentName: '',
                            }));
                          },
                        });
                     
                    }
                  }}>
                  <Image source={DELETEBUTTON} style={plusImageStyle} />
                </TouchableOpacity>
              </View>
            )}

        
        </View>
      </View>
    );
  }

  renderUploadSalarySlips() {
    const {
      uploadSalaryText,
      imageContainer,
      salarySlipName,
      uploadContainer,
      flexRowStyle,
      errorLabel,
      plusImageStyle,
      plusImageStyle1,
      salarySlipText,
      mainSalaryView,
    } = BankDetailsStyles;
    return (
      <View>
        <Text style={uploadSalaryText}>
          {BANKDETAILS_CONST.UPLOADSALARYSLIPS}
        </Text>
        <View style={uploadContainer}>

          <View style={[flexRowStyle, uploadContainer]}>
            <TouchableOpacity
              style={imageContainer}
              onPress={async () => {
                if (!this.state.isViewOnly) {
                  if (this.state.firstMonthFile.docName == null) {
                    let fileDetails = await selectFilePDF();
                    if (
                      this.state.secondMonthFile.docName != fileDetails.name &&
                      this.state.thirdMonthFile.docName != fileDetails.name
                    ) {
                      this.setState((state, props) => ({
                        firstMonthFile: {
                          ...state.firstMonthFile,
                          // applicantUniqueId: this.state.applicantUniqueId,
                          applicantUniqueId: !(this.state.iscoapplicant || this.state.isguarantor) ? this.state.applicantUniqueId : this.state.coapplicantUniqueId,
                          leadCode: this.state.leadCode,
                          docName: fileDetails?.name,
                        },
                        firstMonthURI: {
                          fileCopyUri: fileDetails?.fileCopyUri,
                        },
                        firstDisable: true,
                        saveDisable: false
                      }));
                    } else {
                      handleError('Please select different file');
                    }
                  }
                }
              }}>
              <Image source={PLACEHOLDER_IMAGE} style={plusImageStyle} />
            </TouchableOpacity>
            <Text style={salarySlipText}>
              Upload {this.state.displayfirstMonth} Salary Slip
            </Text>
          </View>

          {this.state.firstMonthFile.docName !== null &&
            this.state.firstMonthFile.docName !== undefined && (
              <View style={mainSalaryView}>
                <Image source={UPLOADIMAGEPDF} style={plusImageStyle1} />
                <Text style={salarySlipName}>
                  {this.state.firstMonthFile?.docName}
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    if (!this.state.isViewOnly) {
                      if (this.state.firstFileUploaded == true) {

                        this.props.deleteSalarySLIP({
                          data: {
                            applicantUniqueId: !(this.state.iscoapplicant || this.state.isguarantor) ?  this.state.firstMonthFileUploadedInfo.applicantUniqueId : this.state.coapplicantUniqueId ,
                            docName: this.state.firstMonthFile.docName,
                            docType: this.state.firstMonthFile.docType,
                            filePath: this.state.firstMonthFileUploadedInfo.filePath,
                            ismainapplicant: !this.state.iscoapplicant || !this.state.isguarantor,
                          },
                          callback: (response) => {
                            this.setState((state, props) => ({
                              firstMonthFile: {
                                ...state.firstMonthFile,
                                docName: null,
                              },
                              firstMonthFileUploadedInfo: {},
                              firstFileUploaded: false,
                            }));
                          },
                        });
                      } else {
                        this.setState((state, props) => ({
                          firstMonthFile: {
                            ...state.firstMonthFile,
                            docName: null,
                          },
                        }));
                      }
                    }
                  }}>
                  <Image source={DELETEBUTTON} style={plusImageStyle} />
                </TouchableOpacity>
              </View>
            )}

          <View style={[flexRowStyle, uploadContainer]}>
            <TouchableOpacity
              style={imageContainer}
              onPress={async () => {
                if (!this.state.isViewOnly) {
                  if (this.state.secondMonthFile.docName == null) {
                    let fileDetails = await selectFilePDF();
                    if (
                      this.state.thirdMonthFile.docName != fileDetails.name &&
                      this.state.firstMonthFile.docName != fileDetails.name
                    ) {
                      this.setState((state, props) => ({
                        secondMonthFile: {
                          ...state.secondMonthFile,
                          applicantUniqueId: !(this.state.iscoapplicant || this.state.isguarantor) ? this.state.applicantUniqueId : this.state.coapplicantUniqueId,
                          leadCode: this.state.leadCode,
                          docName: fileDetails?.name,
                        },
                        secondMonthURI: {
                          fileCopyUri: fileDetails?.fileCopyUri,
                        },
                        secondDisable: true,
                        saveDisable: false

                      }));
                    } else {
                      handleError('Please select different file');
                    }
                  }
                }
              }}>
              <Image source={PLACEHOLDER_IMAGE} style={plusImageStyle} />
            </TouchableOpacity>
            <Text style={salarySlipText}>
              Upload {this.state.displaySecMonth} Salary Slip
            </Text>
          </View>

          {this.state.secondMonthFile.docName !== null &&
            this.state.secondMonthFile.docName !== undefined && (
              <View style={mainSalaryView}>
                <Image source={UPLOADIMAGEPDF} style={plusImageStyle1} />
                <Text style={salarySlipName}>
                  {this.state.secondMonthFile?.docName}
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    if (!this.state.isViewOnly) {
                      if (this.state.secondFileUploaded == true) {
                        this.props.deleteSalarySLIP({
                          data: {
                            applicantUniqueId: !(this.state.iscoapplicant || this.state.isguarantor) ?  this.state.secondMonthFileUploadedInfo.applicantUniqueId : this.state.coapplicantUniqueId,
                            docName: this.state.secondMonthFile.docName,
                            docType: this.state.secondMonthFile.docType,
                            filePath: this.state.secondMonthFileUploadedInfo.filePath,
                            ismainapplicant: !(this.state.iscoapplicant || this.state.isguarantor),
                          },
                          callback: (response) => {
                            this.setState((state, props) => ({
                              secondMonthFile: {
                                ...state.secondMonthFile,
                                docName: null,
                              },
                              secondMonthFileUploadedInfo: {},
                              secondFileUploaded: false,
                            }));
                          },
                        });
                      } else {
                        this.setState((state, props) => ({
                          secondMonthFile: {
                            ...state.secondMonthFile,
                            docName: null,
                          },
                        }));
                      }
                    }
                  }}>
                  <Image source={DELETEBUTTON} style={plusImageStyle} />
                </TouchableOpacity>
              </View>
            )}

          <View style={[flexRowStyle, uploadContainer]}>
            <TouchableOpacity
              style={imageContainer}
              onPress={async () => {
                if (!this.state.isViewOnly) {
                  if (this.state.thirdMonthFile.docName == null) {
                    let fileDetails = await selectFilePDF();
                    if (
                      this.state.firstMonthFile.docName != fileDetails.name &&
                      this.state.secondMonthFile.docName != fileDetails.name
                    ) {
                      this.setState((state, props) => ({
                        thirdMonthFile: {
                          ...state.thirdMonthFile,
                          applicantUniqueId: !(this.state.iscoapplicant || this.state.isguarantor) ? this.state.applicantUniqueId : this.state.coapplicantUniqueId,
                          leadCode: this.state.leadCode,
                          docName: fileDetails?.name,
                        },
                        thirdMonthURI: {
                          fileCopyUri: fileDetails?.fileCopyUri,
                        },
                        thirdDisable: true,
                        saveDisable: false

                      }));
                    } else {
                      handleError('Please select different file');
                    }
                  }
                }
              }}>
              <Image source={PLACEHOLDER_IMAGE} style={plusImageStyle} />
            </TouchableOpacity>
            <Text style={salarySlipText}>
              Upload {this.state.displayThirdMonth} Salary Slip
            </Text>
          </View>

          {this.state.thirdMonthFile.docName !== null &&
            this.state.thirdMonthFile.docName !== undefined && (
              <View style={mainSalaryView}>
                <Image source={UPLOADIMAGEPDF} style={plusImageStyle1} />
                <Text style={salarySlipName}>
                  {this.state.thirdMonthFile?.docName}
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    if (!this.state.isViewOnly) {
                      if (this.state.thirdFileUploaded == true) {
                        this.props.deleteSalarySLIP({
                          data: {
                            applicantUniqueId: !(this.state.iscoapplicant || this.state.isguarantor) ? this.state.thirdMonthFileUploadedInfo.applicantUniqueId :  this.state.coapplicantUniqueId,
                            docName: this.state.thirdMonthFile.docName,
                            docType: this.state.thirdMonthFile.docType,
                            filePath: this.state.thirdMonthFileUploadedInfo.filePath,
                            ismainapplicant: !this.state.iscoapplicant || !this.state.isguarantor,
                          },
                          callback: (response) => {
                            this.setState((state, props) => ({
                              thirdMonthFile: {
                                ...state.thirdMonthFile,
                                docName: null,
                              },
                              thirdMonthFileUploadedInfo: {},
                              thirdFileUploaded: false,
                            }));
                          },
                        });
                      } else {
                        this.setState((state, props) => ({
                          thirdMonthFile: {
                            ...state.thirdMonthFile,
                            docName: null,
                          },
                        }));
                      }
                    }
                  }}>
                  <Image source={DELETEBUTTON} style={plusImageStyle} />
                </TouchableOpacity>
              </View>
            )}
        </View>
      </View>
    );
  }


  render() {
    const {
      progressBarContainer,
      buttonContainer,
      cancelButtonStyle,
      cancelButtonTitleStyle,
      mainContainer,
      mainHeadingText,
      textGoogle,
    } = BankDetailsStyles;
    return (
      <WaveBackground>
        <StatusBar
          backgroundColor={colors.COLOR_WHITE}
          barStyle={'dark-content'}
          translucent={false}
          hidden={false}
        />
        <NavigationEvents
          onDidFocus={() =>
            this.componentDidMount() }
        />
        <Header label={BANKDETAILS_CONST.HEADER} showLeftIcon={false}
          onPress={() => {

          }
          } />
        <View style={{ alignContent: 'center' }}>
          <View style={progressBarContainer}>
            <DottedProgressBar totalSteps={[1, 2]} currentIndex={1} />
          </View>
          <Text style={mainHeadingText}>Bank Details</Text>
        </View>

        <ScrollView style={{ flex: 1, marginBottom: 20 }}>
          <View style={mainContainer}>
            {/* {this.renderRadioButton()} */}
            {/* <Text style={textGoogle}>{BANKDETAILS_CONST.GOOGLEMANDATORY}</Text> */}
            {/*    {this.renderUploadBankStatement()} */}
            {/*   {this.renderFetchBankStatement()} */}
            {/* {this.state.selectedSourceType === 'Send link to customer' && this.renderSendLinkToCustomer()} */}
            {this.renderBankStatement()}
            {this.renderUploadSalarySlips()}
            <View style={buttonContainer}>
              <Button
                isDisabled={this.state.isViewOnly}
                title={BANKDETAILS_CONST.BUTTON_TITLE_SAVEEXIT}
                onPress={() => {
                  const callback = (response) => {
                    const dataToAPI = {
                      applicantUniqueId: !(this.state.iscoapplicant || this.state.isguarantor) ? this.state.applicantUniqueId : this.state.coapplicantUniqueId,
                      ismainapplicant: this.state.ismainapplicant,
                    };
                    this.props.getDDECommonAPI({
                      dataToAPI,
                      callback: (response) => {
                        this.setState(
                          {
                            getDDEComAPI: response.data,
                          },
                          () => {
                            this.setData();
                          },
                        );
                      },
                    });
                  };

                  !this.state.saveDisable && zipSalaryFiles(
                    this.state.thirdMonthFile,
                    this.state.thirdMonthURI,
                    this.state.secondMonthFile,
                    this.state.secondMonthURI,
                    this.state.firstMonthFile,
                    this.state.firstMonthURI,
                    this.props.saveSalarySLIP,
                    callback
                  )
                }
                }
                customContainerStyle={cancelButtonStyle}
                cutomTitleStyle={cancelButtonTitleStyle}
              />
              <Button
                title={BANKDETAILS_CONST.BUTTON_TITLE_NEXT}
                onPress={() => {
                  this.props.navigation.navigate("ITRVerification", {
                    applicantUniqueId: this.state.applicantUniqueId,
                    leadCode: this.state.leadCode,
                    iscoapplicant: this.state.iscoapplicant,
                    isguarantor: this.state.isguarantor,
                    coapplicantUniqueId: this.state.coapplicantUniqueId,
                    getDDEComAPI: this.state.getDDEComAPI
                  })
                }}
              />
            </View>
            <View style={{ width: '50%', alignSelf: 'center' }}>
              <Button
                title={'Loan Summary'}
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
          </View>
        </ScrollView>
      </WaveBackground>
    );
  }
}
export default compose(
  container,
  withProps((getDDEComAPI) => {
    getDDEComAPI;
  }),
)(BankDetails);
