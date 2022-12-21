import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
  FlatList,
  Image,
  StatusBar,
  Alert,
  Text,
  TextInput,
  PermissionsAndroid,
  TouchableOpacity,
  View,
  Linking
} from 'react-native';
import { handleSuccess } from '../../../utils';
import { Icon } from 'react-native-elements';
import { compose, withProps } from 'recompose';
import { Header } from '../../components/Header/Header';
import { WaveBackground } from '../../components/WaveBackground/WaveBackground';
import * as colors from '../../constants/colors';
import { DOWN_ARROW, UP_ARROW, NO_DATA } from '../../constants/imgConsts';
import { LEAD_LIST_CONST } from '../../constants/screenConst';
import container from '../../container/Lead/index';
import { LeadListStyles } from './LeadListStyles';
import { NavigationEvents } from 'react-navigation';
import { handleWarning } from '../../../utils';
import moment from 'moment';
import RNFetchBlob from 'rn-fetch-blob';
import { uatURL } from '../../../baseURL';

const RNFS = require('react-native-fs');

class LeadList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      leadtype: 'Lead',
      expandedItem: null,
      params: this.props.navigation.state.params,
      employeeId: (this.props.userDataSelector?.userData?.data?.employeeId) || "",
      branchName: (this.props.userDataSelector?.userData?.data?.branchName) || "",
      searchString: "",
      pageNumber: 1,
      totalCount: 0,
      initalCount: 10,
      lead: [],
      prospect: [],
      listCaseDetails: '',
      isUserAccess: this.props.userDataSelector?.userData?.ModelAccess[0]?.read || false
    };
  }

  listCaseStatus = (applicationUniqueId, index) => {
    this.props.searchLEAD({
      data: {
        applicationUniqueId: applicationUniqueId,
        type: 'listCaseDetails'
      },
      callback: (response) => {
        this.setState({
          expandedItem: index,
          listCaseDetails: response.data
        });
      }
    })
  }

  apiCall() {
    this.props.searchLEAD({
      data: {
        searchString: this.state.searchString,
        employeeId: this.state.employeeId,
        pageNumber: this.state.pageNumber,
        leadType: this.state.leadtype,
        count: this.state.initalCount,
        productId: this.state.params.productId,
        branchName: this.state.branchName,
      },
      callback: (response) => {
        if (this.state.leadtype === 'Lead') {
          if (this.state.searchString.length > 0) {
            if (response.data.pageNumber > 1) {
              this.setState({ totalCount: response.data.totalCount, lead: [...this.state.lead, ...response.data.leadlist] })
            } else {
              this.setState({ totalCount: response.data.totalCount, lead: response.data.leadlist && response.data.leadlist.length > 0 ? [...response.data.leadlist] : [] })
            }
          } else {
            if (response.data.pageNumber > 1) {
              this.setState({ totalCount: response.data.totalCount, lead: [...this.state.lead, ...response.data.leadlist] })
            } else {
              this.setState({ totalCount: response.data.totalCount, lead: response.data.leadlist && response.data.leadlist.length > 0 ? [...response.data.leadlist] : [] })
            }
          }
        }
        else {
          if (this.state.searchString.length > 0) {
            if (response.data.pageNumber > 1) {
              this.setState({ totalCount: response.data.totalCount, prospect: [...this.state.prospect, ...response.data.leadlist] })
            } else {
              this.setState({ totalCount: response.data.totalCount, prospect: response.data.leadlist && response.data.leadlist.length > 0 ? [...response.data.leadlist] : [] })
            }
          } else {
            if (response.data.pageNumber > 1) {
              this.setState({ totalCount: response.data.totalCount, prospect: [...this.state.prospect, ...response.data.leadlist] })
            } else {
              this.setState({ totalCount: response.data.totalCount, prospect: response.data.leadlist && response.data.leadlist.length > 0 ? [...response.data.leadlist] : [] })
            }
          }
        }

      }
    });
  }

  componentDidMount() {
    this.apiCall();
    this.setState({
      searchString: ""
    })

  }

  componentWillUnmount() {
    if (this.focusListener != null && this.focusListener.remove) {
      this.focusListener.remove();
    }
  }

  renderSearchBar() {
    const { separatorStyle, inputContainer, textInputStyle } = LeadListStyles;
    return (
      <View style={{ width: '95%', marginLeft: 10 }}>

        <View style={inputContainer}>
          <Icon size={30} name="search1" type="antdesign" color={'#818282'} />
          <TextInput
            style={textInputStyle}
            placeholder={this.state.leadtype == 'Lead' ? LEAD_LIST_CONST.PLACEHOLDER_SEARCHBAR_LEAD : LEAD_LIST_CONST.PLACEHOLDER_SEARCHBAR}
            value={this.state.searchString}
            onChangeText={((text) => {
              this.setState({
                searchString: text,
                pageNumber: 1
              }, () => {
                this.apiCall()
              });
            })}
          />
          {this.state.searchString !== "" &&
            <View style={{ justifyContent: "space-around" }}>
              <TouchableOpacity onPress={() => {
                this.setState({
                  searchString: ""
                }, this.apiCall)
              }} >
                <Icon size={30} name="closecircle" type="antdesign" color={'#818282'} />
              </TouchableOpacity>
            </View>}
        </View>
        <View style={separatorStyle} />
      </View>
    );
  }

  actualDownload = async (sanctionLetter, leadName) => {
    var link = sanctionLetter.replace('/var/www/html', uatURL.URL)
    var fileName = `Sanction Letter ${leadName + Date.now()}.pdf`
    if (link) {
      if (Platform.OS === 'android') {

        const android = RNFetchBlob.android
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            {
              title: 'App need Storage Permission',
              message:
                'App needs access to your Storage ',
              buttonNeutral: 'Ask Me Later',
              buttonNegative: 'Cancel',
              buttonPositive: 'OK',
            },
          );

          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            const downloadDest = `${RNFS.ExternalStorageDirectoryPath}/Download/${fileName}`;
            RNFetchBlob
              .config({
                addAndroidDownloads: {
                  useDownloadManager: true,
                  notification: true,
                  title: fileName,
                  path: downloadDest,
                  mime: 'application/pdf',
                  description: 'File downloaded successfully.',
                  mediaScannable: true,
                }
              })
              .fetch('GET', link)
              // eslint-disable-next-line no-console
              .catch(e => { })
              .then((resp) => {

                Alert.alert(
                  'File downloaded',
                  `${fileName} downloaded successfully.`,
                  [
                    {
                      text: 'OPEN',
                      onPress: () => {
                        android.actionViewIntent(resp.path(), 'application/pdf');
                      }
                    },
                    {
                      text: 'CANCEL',
                      onPress: () => { },
                      style: 'cancel',
                    },
                  ],
                  { cancelable: false },
                );
                resp.path();
              });
          } else {
          }
        } catch (err) {
          
        }
      }
    }

  }

  renderRow(item, index) {
    const {
      lableStyle,
      lableStyleButton,
      listBoxStyle,
      dataContainer,
      dataStyle,
      flexRow,
      imageStyle,
      actionLabelStyle,
      tabularLayout,
    } = LeadListStyles;

    // if (!item.isExpanded) {
    if (index == this.state.expandedItem) {

      return (
        <View style={listBoxStyle}>
          <View style={flexRow}>
            <View style={{ flex: 4 }}>
              <View style={dataContainer}>
                <View style={tabularLayout}>
                  <Text style={lableStyle}>{'Application ID'}</Text>
                  <Text style={dataStyle}>{item.id}</Text>
                </View>
                <View style={tabularLayout}>
                  <Text style={lableStyle}>{'Lead Name'}</Text>
                  <Text
                    flexwrap={'wrap'}
                    ellipsizeMode={'tail'}
                    numberOfLines={2}
                    style={dataStyle}>
                    {item.leadName}
                  </Text>
                </View>
                {/* <View style={tabularLayout}>
                  <Text style={lableStyle}>{'Mobile No.'}</Text>
                  <Text
                    flexwrap={'wrap'}
                    ellipsizeMode={'tail'}
                    numberOfLines={2}
                    style={dataStyle}>
                    {item.customerMobile}
                  </Text>
                </View> */}
              </View>

              <View style={[dataContainer, { marginTop: 5 }]}>
                <View style={tabularLayout}>
                  <Text style={lableStyle}>{'Date/Time'}</Text>
                  <Text style={dataStyle}>{moment(item.updatedDate).format("DD-MM-YYYY,")}</Text>
                  <Text style={dataStyle}>{moment(item.updatedDate).format("h:mm a")}</Text>
                </View>
                {/* <View style={tabularLayout}>
                  <Text style={lableStyle}>{'Email Address'}</Text>
                  <Text
                    flexwrap={'wrap'}
                    ellipsizeMode={'tail'}
                    numberOfLines={2}
                    style={dataStyle}>
                    {item.customerEmail}
                  </Text>
                </View> */}
                <View style={tabularLayout}>
                  <Text style={lableStyle}>{'Module\nStatus'}</Text>
                  <Text style={dataStyle}>{item.consentStatus}</Text>
                </View>
                {/* {
                  this.state.leadtype !== 'Lead' ?
                    <View style={tabularLayout}>
                      <Text style={lableStyle}>{'Case\nModule'}</Text>
                      <Text style={dataStyle}>{item.caseModule || 'Sales Module'}</Text>
                    </View> : null
                } */}
              </View>

              <View style={[dataContainer, { marginTop: 5, marginBottom: 10 }]}>
                {
                  this.state.leadtype !== 'Lead' ?
                    <View style={tabularLayout}>
                      <Text style={lableStyle}>{"Bureau \nStatus"}</Text>
                      <Text style={[dataStyle, { color: this?.state?.listCaseDetails[0]?.bureau_flag_status?.toLowerCase() || 'black' }]}>{this?.state?.listCaseDetails[0]?.bureau_score ? `CRIF ${this?.state?.listCaseDetails[0]?.bureau_score}` : 'NTC'}</Text>
                    </View>
                    : null
                }
                {/* <View style={tabularLayout}>
                      <Text style={lableStyle}>{"KYC Verification"}</Text>
                      <View style={{ flexDirection: 'row' }}>
                        <Text style={[dataStyle, { color: this?.state?.listCaseDetails[0]?.rcu_waiver_doc_status_flag == 'Green' ? 'green' : 'orange' }]}>
                          {this?.state?.listCaseDetails[0]?.rcu_waiver_doc_status_flag == 'Green' ? '' :
                            this?.state?.listCaseDetails[0]?.rcu_case_status == 'RCU_Approved_1' ? '' :
                              this?.state?.listCaseDetails[0]?.rcu_case_status == 'RCU_Rejected_1' ? '' :
                                this?.state?.listCaseDetails[0]?.rcu_waiver_doc_status_flag == 'Yellow' ? 'In RCU Queue' : null}
                        </Text>
                        {
                          this?.state?.listCaseDetails[0]?.rcu_waiver_doc_status_flag != 'Green' ?
                            <View style={{}}>
                              <Image
                                source={this?.state?.listCaseDetails[0]?.rcu_case_status == 'RCU_Approved_1' ? require('../../assets/img/correct.png') : this?.state?.listCaseDetails[0]?.rcu_case_status == 'RCU_Rejected_1' ? require('../../assets/img/remove.png') : null}
                                style={{ height: 25, width: 25, marginTop: 5 }}
                                resizeMode={'contain'}
                              />
                            </View>
                            :
                            this?.state?.listCaseDetails[0]?.rcu_waiver_doc_status_flag == 'Green' ?
                              <View style={{}}>
                                <Image
                                  source={require('../../assets/img/correct.png')
                                  }
                                  style={{ height: 25, width: 25, marginTop: 5 }}
                                  resizeMode={'contain'}
                                />
                              </View>
                              : null
                        }
                      </View>
                    </View>

                    <View style={[tabularLayout, {}]}>
                      <Text style={lableStyle}>{"Credit \nStatus"}</Text>
                      <View style={{ flexDirection: 'row' }}>
                        <Text style={[dataStyle, { color: this?.state?.listCaseDetails[0]?.credit_case_status_flag == 'Orange' ? 'orange' : 'orange' }]}>{this?.state?.listCaseDetails[0]?.credit_case_status_flag == 'Green' || this?.state?.listCaseDetails[0]?.credit_case_status_flag == 'Red' ? '' : this?.state?.listCaseDetails[0]?.credit_case_status || 'Pending'}  </Text>
                        {
                          this?.state?.listCaseDetails[0]?.credit_case_status_flag != 'Orange' ?
                            <View style={{}}>
                              <Image
                                source={this?.state?.listCaseDetails[0]?.credit_case_status_flag == 'Green' ? require('../../assets/img/correct.png') : this?.state?.listCaseDetails[0]?.credit_case_status_flag == 'Red' ? require('../../assets/img/remove.png') : null}
                                style={{ height: 25, width: 25, marginTop: 5 }}
                                resizeMode={'contain'}
                              />
                            </View>
                            : null
                        }
                      </View>
                    </View> */}

                <View style={tabularLayout}>
                  <Text style={[lableStyle]}>{'Action'}</Text>
                  <TouchableOpacity
                    onPress={() => {
                      if (this.state.leadtype.toLowerCase() === 'lead') {
                        this.props.navigation.navigate('Edit', {
                          id: item.id,
                          title: this.state.params.title,
                          applicantUniqueId: item.applicantUniqueId,
                        });
                      } else {
                        if (
                          item.consentStatus.toLowerCase() !== 'consent pending' &&
                          item.consentStatus.toLowerCase() !== 'consent approved'
                        ) {
                          //LoanSummary KycVerification LoanDetails RepaymentDetails Schemes PersonalDetails Dedupe AdditionalDetails References BusinessDetails
                          this.props.navigation.navigate('LoanDetails', {
                            leadCode: item.leadCode,
                            mobileNumber: item.customerMobile,
                            leadName: item.leadName,
                            applicantUniqueId: item.applicantUniqueId,
                            title: this.state.params.title,
                          })
                        } else {
                          //PANAndGSTVerification
                          this.props.navigation.navigate('LoanDetails', {
                            leadCode: item.leadCode,
                            mobileNumber: item.customerMobile,
                            leadName: item.leadName,
                            applicantUniqueId: item.applicantUniqueId,
                            title: item.title,
                            ismainapplicant: true
                          },
                          );
                        }
                      }
                    }}>
                    <View>
                      <Text style={[lableStyleButton,{color: 'green'}]}>
                        {this.state.leadtype.toLowerCase() === 'lead'
                          ? LEAD_LIST_CONST.EDIT
                          : LEAD_LIST_CONST.UPDATEPROFILE}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>

              </View>

              {/* {
                this.state.leadtype !== 'Lead' ?
                  <View style={[dataContainer, { marginTop: 5, marginBottom: 10 }]}>
                    <View style={[tabularLayout, {}]}>
                      <Text style={lableStyle}>{"TVR"}</Text>
                      <View style={{ flexDirection: 'row' }}>
                        <Text style={[dataStyle, { color: this?.state?.listCaseDetails[0]?.tvr_waiver_flag == 'Yellow' ? 'orange' : 'green' }]}>
                          {
                            this?.state?.listCaseDetails[0]?.tvr_status_flag == 'Green tick' ? '' :
                              this?.state?.listCaseDetails[0]?.tvr_status_flag == 'Red cross' ? '' :
                                this?.state?.listCaseDetails[0]?.tvr_waiver_flag == 'Yellow' ? 'Required' :
                                  this?.state?.listCaseDetails[0]?.tvr_waiver_flag == 'Green' ? '' : null
                          }
                        </Text>
                        {
                          this?.state?.listCaseDetails[0]?.tvr_waiver_flag == 'Yellow' ?
                            <View style={{}}>
                              <Image
                                source={this?.state?.listCaseDetails[0]?.tvr_status_flag == 'Green tick' ? require('../../assets/img/correct.png') : this?.state?.listCaseDetails[0]?.tvr_status_flag == 'Red cross' ? require('../../assets/img/remove.png') : null}
                                style={{ height: 25, width: 25, marginTop: 5 }}
                                resizeMode={'contain'}
                              />
                            </View>
                            :
                            this?.state?.listCaseDetails[0]?.tvr_waiver_flag == 'Green' ?
                              <View style={{}}>
                                <Image
                                  source={require('../../assets/img/correct.png')}
                                  style={{ height: 25, width: 25, marginTop: 5 }}
                                  resizeMode={'contain'}
                                />
                              </View>
                              : null
                        }
                      </View>
                    </View>

                    <View style={[tabularLayout, {}]}>
                      <Text style={lableStyle}>{"CPV"}</Text>
                      <View style={{ flexDirection: 'row' }}>
                        <Text style={[dataStyle, { color: this?.state?.listCaseDetails[0]?.fi_waiver_rule_status_flag == 'Green' ? 'green' : 'orange' }]}>
                          {
                            this?.state?.listCaseDetails[0]?.fi_waiver_rule_status_flag == 'Green' ? '' :
                              this?.state?.listCaseDetails[0]?.fi_status_flag == 'Green tick' ? "" :
                                this?.state?.listCaseDetails[0]?.fi_status_flag == 'Red cross' ? "" :
                                  this?.state?.listCaseDetails[0]?.fi_waiver_rule_status_flag == 'Yellow' ? 'Required' : null
                          }
                        </Text>
                        {
                          this?.state?.listCaseDetails[0]?.fi_waiver_rule_status_flag != 'Green' ?
                            <View style={{}}>
                              <Image
                                source={this?.state?.listCaseDetails[0]?.fi_status_flag == 'Green tick' ? require('../../assets/img/correct.png') :
                                  this?.state?.listCaseDetails[0]?.fi_status_flag == 'Red cross' ? require('../../assets/img/remove.png') : null}
                                style={{ height: 25, width: 25, marginTop: 5 }}
                                resizeMode={'contain'}
                              />
                            </View>
                            :
                            this?.state?.listCaseDetails[0]?.fi_waiver_rule_status_flag == 'Green' ?
                              <View style={{}}>
                                <Image
                                  source={require('../../assets/img/correct.png')}
                                  style={{ height: 25, width: 25, marginTop: 5 }}
                                  resizeMode={'contain'}
                                />
                              </View>
                              : null
                        }
                      </View>
                    </View>

                    <View style={tabularLayout}>
                      <Text style={lableStyle}>{"Final Status"}</Text>
                      <Text style={dataStyle}>{item.caseStatus ? item.caseStatus : item.consentStatus}</Text>
                    </View>

                  </View>
                  : null
              } */}



              {/* <View style={[dataContainer, { marginTop: 5, marginBottom: 10 }]}>

                {
                  this.state.leadtype !== 'Lead' ?
                    <View style={tabularLayout}>
                      <Text style={lableStyle}>{"Remarks"}</Text>
                      {
                        item.caseStatus ?
                          <Text style={dataStyle}>{item.remark}</Text>
                          : null
                      }
                    </View>
                    : null
                }

                {
                  this.state.leadtype !== 'Lead' ?
                    <View style={tabularLayout}>
                      <Text style={lableStyle}>{"Decision"}</Text>
                      <Image
                        source={
                          this?.state?.listCaseDetails[0]?.decision_case_status_flag == 'Approved' ? require('../../assets/img/approve.png') :
                            this?.state?.listCaseDetails[0]?.decision_case_status_flag == 'Pending' ? require('../../assets/img/Pending.png') :
                              this?.state?.listCaseDetails[0]?.decision_case_status_flag == 'Disbursed' ? require('../../assets/img/disbursed.png') :
                                this?.state?.listCaseDetails[0]?.decision_case_status_flag == 'Reject' ? require('../../assets/img/rejected.png') :
                                  require('../../assets/img/Pending.png')
                        }
                        style={{ height: 50, width: 50 }}
                        resizeMode={'contain'}
                      />
                    </View>
                    : null
                }
                {
                  this.state.leadtype !== 'Lead' ?
                    <View style={tabularLayout}>
                      <Text style={lableStyle}>{"Payment Status"}</Text>
                      <Text style={dataStyle}>{item.paymentStatus}</Text>
                    </View>
                    : null
                }
              </View> */}

              {/* <View style={[dataContainer, { marginTop: 5, marginBottom: 10 }]}>
                {
                  this.state.leadtype !== 'Lead' ?
                    <View style={tabularLayout}>
                      <Text style={lableStyle}>{"Sanction Letter"}</Text>
                      <TouchableOpacity
                        onPress={() => {
                          this.actualDownload(item.sanctionLetterPdfFilePath, item.leadName)
                        }}>
                        <View>
                          <Text style={lableStyleButton}>Click Here</Text>
                        </View>
                      </TouchableOpacity>
                    </View>

                    : null
                }
                <View style={tabularLayout}>
                  <Text style={lableStyle}>{'Action'}</Text>
                  <TouchableOpacity
                    onPress={() => {
                      if (this.state.leadtype.toLowerCase() === 'lead') {
                        this.props.navigation.navigate('Edit', {
                          id: item.id,
                          title: this.state.params.title,
                          applicantUniqueId: item.applicantUniqueId,
                        });
                      } else {
                        if (
                          item.consentStatus.toLowerCase() !== 'consent pending' &&
                          item.consentStatus.toLowerCase() !== 'consent approved'
                        ) {
                          //LoanSummary KycVerification LoanDetails RepaymentDetails Schemes PersonalDetails Dedupe AdditionalDetails References BusinessDetails
                          this.props.navigation.navigate('LoanSummary', {
                            leadCode: item.leadCode,
                            mobileNumber: item.customerMobile,
                            leadName: item.leadName,
                            applicantUniqueId: item.applicantUniqueId,
                            title: this.state.params.title,
                          })
                        } else {
                          //PANAndGSTVerification
                          this.props.navigation.navigate('PANAndGSTVerification', {
                            leadCode: item.leadCode,
                            mobileNumber: item.customerMobile,
                            leadName: item.leadName,
                            applicantUniqueId: item.applicantUniqueId,
                            title: item.title,
                            ismainapplicant: true
                          },
                          );
                        }
                      }
                    }}>
                    <View>
                      <Text style={lableStyleButton}>
                        {this.state.leadtype.toLowerCase() === 'lead'
                          ? LEAD_LIST_CONST.EDIT
                          : LEAD_LIST_CONST.UPDATEPROFILE}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>



              </View> */}

            </View>
            <Image
              source={item.isExpanded ? DOWN_ARROW : UP_ARROW}
              style={imageStyle}
              resizeMode={'contain'}
            />
          </View>
        </View>
      );
    }
    return (
      <TouchableOpacity
        style={listBoxStyle}
        onPress={() => {
          this.state.leadtype == 'Lead' ?
            this.setState({
              expandedItem: index,
            })
            :
            this.listCaseStatus(item.applicantUniqueId, index)
        }}>
        <View style={flexRow}>
          <View style={{ flex: 4 }}>
            <View style={dataContainer}>
              <View style={tabularLayout}>
                <Text style={lableStyle}>{'Application ID'}</Text>
                <Text style={dataStyle}>{item.id}</Text>
              </View>
              <View style={tabularLayout}>
                <Text style={lableStyle}>{'Lead Name'}</Text>
                <Text
                  flexwrap={'wrap'}
                  ellipsizeMode={'tail'}
                  numberOfLines={2}
                  style={dataStyle}>
                  {item.leadName}
                  {/*    {item.firstName  + (item.middleName || "") + " " + item.lastName} */}
                </Text>
              </View>
              {/* <View style={tabularLayout}>
                <Text style={lableStyle}>{'Mobile No.'}</Text>
                <Text
                  flexwrap={'wrap'}
                  ellipsizeMode={'tail'}
                  numberOfLines={2}
                  style={dataStyle}>
                  {item.customerMobile}
                </Text>
              </View> */}
            </View>
          </View>
          <Image
            source={item.isExpanded ? UP_ARROW : DOWN_ARROW}
            style={imageStyle}
            resizeMode="contain"
          />
        </View>
      </TouchableOpacity>
    );
  }

  renderList(leadList) {
    const { flatListStyle } = LeadListStyles;
    return (
      <>
        {
          leadList.length !== 0 ?
            <FlatList
              style={flatListStyle}
              data={leadList}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item, index }) => this.renderRow(item, index)}
              onEndReached={() => {
                this.setState({
                  pageNumber: this.state.pageNumber + 1
                }, () => {
                  if (this.state.pageNumber * this.state.initalCount < this.state.totalCount) {
                    this.apiCall()
                  }
                })
              }}
            />
            :
            <>
              <Image
                source={NO_DATA}
                style={{ height: 40, width: 40, alignSelf: 'center', marginTop: 10 }}
              />
              <Text style={{ alignSelf: 'center' }}> No Data </Text>
            </>
        }
      </>
    );
  }

  renderAddLeadButton() {
    const {
      outerCircleStyle,
      innerCircleStyle,
      buttonTextStyle,
    } = LeadListStyles;
    return (
      <TouchableOpacity
        style={outerCircleStyle}
        onPress={() => {
          if (!this.state.isUserAccess) {
            this.props.navigation.navigate('AddLead', { title: this.state.params.title });
          } else {
            handleWarning("User access denied")
          }

        }}>
        <View style={innerCircleStyle}>
          <Text style={[buttonTextStyle, { fontSize: 38, marginTop: -16 }]}>
            +
          </Text>
          <Text style={[buttonTextStyle, { marginTop: -8 }]}>
            {LEAD_LIST_CONST.BUTTON_TITLE}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }

  render() {
    const {
      buttonbackground,
      buttonTitle,
      button,
      selected,
      selectedButtonTitle,
    } = LeadListStyles;

    return (
      <WaveBackground>
        <StatusBar
          barStyle={'dark-content'}
          backgroundColor={colors.COLOR_WHITE}
        />
        <NavigationEvents
          onDidFocus={() =>
            this.setState({
              lead: [],
              prospect: [],
              leadtype: this.state.leadtype,
              searchString: "",
              pageNumber: 1,
              totalCount: 0,
              initalCount: 10,
            }, () => { this.componentDidMount() })}
        />
        <Header
          label={LEAD_LIST_CONST.HEADER}
          showLeftIcon={false}
          onPress={() => {
            Alert.alert("Logout!", `Are you sure you want to logout?`, [
              {
                  text: "No",
                  onPress: () => null,
                  style: "cancel"
              },
              {
                  text: "YES", onPress: () => this.props.clearUserData(
                      handleSuccess('Logout Successfully.'),
                      this.props.navigation.navigate("Splash")
                  )
              }
          ]);
          }}
        />
        {this.renderSearchBar()}
        <View style={buttonbackground}>
          <TouchableOpacity
            onPress={() => {
              this.setState({ leadtype: 'Lead', expandedItem: null, pageNumber: 1 }, this.apiCall);
            }}
            style={[button, this.state.leadtype == 'Lead' ? selected : '']}>
            <Text
              style={
                this.state.leadtype == 'Lead'
                  ? selectedButtonTitle
                  : buttonTitle
              }>
              Lead
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              this.setState({ leadtype: 'Prospect', expandedItem: null, pageNumber: 1 }, this.apiCall);
            }}
            style={[button, this.state.leadtype == 'Prospect' ? selected : '']}>
            <Text
              style={
                this.state.leadtype == 'Prospect'
                  ? selectedButtonTitle
                  : buttonTitle
              }>
              Prospect
            </Text>
          </TouchableOpacity>
        </View>

        {this.renderList(this.state.leadtype === 'Lead' ? this.state.lead : this.state.prospect)}
        {this.renderAddLeadButton()}
      </WaveBackground >
    );
  }
}


LeadList.propTypes = {
  searchLEADReducer: PropTypes.func,
  leadDataSelector: PropTypes.object,
  userDataSelector: PropTypes.object,
};

export default compose(
  container,
  withProps((searchLEADReducer) => searchLEADReducer),
)(LeadList);
