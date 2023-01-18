import PropTypes from 'prop-types';
import React, { useEffect, useState, } from 'react';
import { ScrollView, StatusBar, Text, View } from 'react-native';
import { compose, withProps } from 'recompose';
import { Button } from '../../components/Button/Button';
import { Divider } from 'react-native-elements';
import { Header } from '../../components/Header/Header';
import { TabBar } from '../../components/TabBar/TabBar';
import { WaveBackground } from '../../components/WaveBackground/WaveBackground';
import * as colors from '../../constants/colors';
import { LOAN_SUMMARY_CONST } from '../../constants/screenConst';
import container from '../../container/LoanSummary/index';
import Dde from './dde';
import { LoanSummaryStyles } from './LoanSummaryStyles';
import Qde from './qde';

const LeadManagement = (props) => {
  var data = props.data
  var navigation = props.data.navigation.navigation
  const {
    cardHolder,
    cardContainer,
    activeCardHeaderStyle,
    buttonContainer,
  } = LoanSummaryStyles;
  return (

    <View style={cardHolder}>
      {
        data.consentStatus == 'Consent Pending' ?
          <>
            <View style={cardContainer}>
              <Text style={activeCardHeaderStyle}>{'Lead Management'}</Text>
            </View>
            <Divider style={{ margin: 20, marginTop: 20 }} />
            <View style={buttonContainer}>
              <Button
                title={LOAN_SUMMARY_CONST.BUTTON_CONSENTPENDING}
                onPress={() => {
                  navigation.navigate('ConsentPending', {
                    id: props?.data?.id,
                    title: props.data.title,
                    applicantUniqueId: props.data.mainapplicantuniqueid,
                    ismainapplicant: props.data.ismainapplicant,
                    coapplicantUniqueId: props.data.coapplicantUniqueId,
                    isguarantor: props.data.isguarantor,
                    iscoapplicant: props.data.iscoapplicant,
                  });
                }} />
            </View>
          </>
          : null
      }
    </View>

  )
};

const Agreement = (props) => {
  var data = props.data
  var navigation = props.data.navigation.navigation
  const {
    cardHolder,
    cardContainer,
    activeCardHeaderStyle,
    buttonContainer,
  } = LoanSummaryStyles;
  return (

    <View style={cardHolder}>
      {
        (data.preDisbursalFlag ? data.preDisbursalFlag : !data.preSalesFreeze) ?
          <>
       
            <View style={cardContainer}>
              <Text style={activeCardHeaderStyle}>{'Loan Agreement'}</Text>
            </View>
            <Divider style={{ margin: 20, marginTop: 20 }} />
            <View style={buttonContainer}>
              <Button
                title={LOAN_SUMMARY_CONST.BUTTON_LOANAGREEMENT}
                onPress={() => {
                  navigation.navigate('LoanAgreement', {
                    id: props?.data?.id,
                    title: props.data.title,
                    salaried: props?.data?.indSelfSoleFlag,
                    ismainapplicant: navigation.state.params.ismainapplicant,
                    coapplicantUniqueId: navigation.state.params.coapplicantUniqueId,
                    isguarantor: navigation.state.params.isguarantor,
                    iscoapplicant: navigation.state.params.iscoapplicant,
                    applicantUniqueId: navigation.state.params.applicantUniqueId,
                    leadName: navigation.state.params.leadName,
                  });
                }} />
            </View>
          </>
          : null
      }
    </View>

  )
};

const PreDisbursal = (props) => {
  var data = props.data
  var navigation = props.data.navigation.navigation
  const {
    cardHolder,
    cardContainer,
    activeCardHeaderStyle,
    buttonContainer,
  } = LoanSummaryStyles;
  return (

    <View style={cardHolder}>
      {
        data.preDisbursalFlag ?
          <>
            <View style={cardContainer}>
              <Text style={activeCardHeaderStyle}>{'Pre Disbursal Documents'}</Text>
            </View>
            <Divider style={{ margin: 20, marginTop: 20 }} />
            <View style={buttonContainer}>
              <Button
                title={LOAN_SUMMARY_CONST.BUTTON_PREDISBURSAL}
                onPress={() => {
                  navigation.navigate('PreDisbursalDocument', {
                    applicantUniqueId: props.data.applicantUniqueId,
                    id: props?.data?.id,
                    leadName: props.data.customerName,
                    title: props.data.title,
                    leadCode: props.data.leadCode,
                    ismainapplicant: props.data.ismainapplicant,
                    coapplicantUniqueId: props.data.coapplicantUniqueId,
                    isguarantor: props.data.isguarantor,
                    iscoapplicant: props.data.iscoapplicant,
                  });
                }} />
            </View>
          </>
          : null
      }
    </View>
  )
};

const Repayment = (props) => {
  var data = props.data
  var navigation = props.data.navigation.navigation
  const {
    cardHolder,
    cardContainer,
    activeCardHeaderStyle,
    buttonContainer,
  } = LoanSummaryStyles;
  return (

    <View style={cardHolder}>
      {
        data.preDisbursalFlag ?
          <>
            <View style={cardContainer}>
              <Text style={activeCardHeaderStyle}>{'Repayment Mode'}</Text>
            </View>
            <Divider style={{ margin: 20, marginTop: 20 }} />
            <View style={buttonContainer}>
              <Button
                title={LOAN_SUMMARY_CONST.BUTTON_REPAYMENT}
                onPress={() => {
                  navigation.navigate('RepaymentDetails', {
                    applicantUniqueId: props.data.applicantUniqueId,
                    id: props?.data?.id,
                    title: props.data.title,
                    leadCode: props.data.leadCode,
                    ismainapplicant: props.data.ismainapplicant,
                    coapplicantUniqueId: props.data.coapplicantUniqueId,
                    isguarantor: props.data.isguarantor,
                    iscoapplicant: props.data.iscoapplicant,
                  });
                }} />
            </View>
          </>
          : null
      }
    </View>

  )
};

const PostDisbursal = (props) => {
  var data = props.data
  var navigation = props.data.navigation.navigation
  const {
    cardHolder,
    cardContainer,
    activeCardHeaderStyle,
    buttonContainer,
  } = LoanSummaryStyles;
  return (

    <View style={cardHolder}>
      {
        !data.postSalesFreeze ?
          <>
            <View style={cardContainer}>
              <Text style={activeCardHeaderStyle}>{'Post Disbursal Documents'}</Text>
            </View>
            <Divider style={{ margin: 20, marginTop: 20 }} />
            <View style={buttonContainer}>
              <Button
                title={LOAN_SUMMARY_CONST.BUTTON_POSTDISBURSAL}
                onPress={() => {
                  navigation.navigate('PostDisbursalDocument', {
                    applicantUniqueId: props.data.applicantUniqueId,
                    id: props?.data?.id,
                    title: props.data.title,
                    leadCode: props.data.leadCode,
                    ismainapplicant: props.data.ismainapplicant,
                    coapplicantUniqueId: props.data.coapplicantUniqueId,
                    isguarantor: props.data.isguarantor,
                    iscoapplicant: props.data.iscoapplicant,
                  });
                }} />
            </View>
          </>
          : null
      }
    </View>

  )
};



const BlankComponent1 = (props) => {
  const {
    cardHolder,
    cardContainer,
    activeCardHeaderStyle,
    buttonContainer,
  } = LoanSummaryStyles;
  return (

    <View style={cardHolder}>
      {/* <Text>mj</Text> */}
    </View>

  )
};

const LoanOffer = (props) => {
  var data = props.data
  var navigation = props.data.navigation.navigation
  const {
    cardHolder,
    cardContainer,
    activeCardHeaderStyle,
    buttonContainer,
  } = LoanSummaryStyles;
  return (

    <View style={cardHolder}>
  
      {
      props.data.indSelfSoleFlag == false && props.data.ismainapplicant && props.data.additionalDetails && props.data.personalDetailsFlag
        && props.data.panAndGst && props.data.reference && props.data.loanDetails && props.data.saveScheme ?
        <>
          <View style={cardContainer}>
            <Text style={activeCardHeaderStyle}>{'Loan Offer'}</Text>
          </View>
          <Divider style={{ margin: 20, marginTop: 20 }} />
          <View style={buttonContainer}>
            <Button
              title={LOAN_SUMMARY_CONST.BUTTON_LOANOFFER}
              onPress={() => {
                navigation.navigate('QdeSuccess', {
                  id: props?.data?.id,
                  // title: this.state.title,
                  ismainapplicant: props.data.ismainapplicant,
                  applicantUniqueId: props.data.applicantUniqueId,
                  isguarantor: props.data.isguarantor,
                  iscoapplicant: props.data.iscoapplicant,
                  creditButtonFlag: props.data.creditButtonFlag,
                  redirection: 'qde',
                  offerType: 'tentative',
                });
              }} />
          </View>
        </>
        :
        null
      }
      {props.data.indSelfSoleFlag == true && props.data.ismainapplicant && props.data.additionalDetails && props.data.businessDetails
        && props.data.panAndGst && props.data.loanDetails && props.data.saveScheme ?
        <>
          <View style={cardContainer}>
            <Text style={activeCardHeaderStyle}>{'Loan Offer'}</Text>
          </View>
          <Divider style={{ margin: 20, marginTop: 20 }} />
          <View style={buttonContainer}>
            <Button
              title={LOAN_SUMMARY_CONST.BUTTON_LOANOFFER}
              // isDisabled={!props.data.itrFlag}
              onPress={() => {
                navigation.navigate('QdeSuccess', {
                  id: props?.data?.id,
                  // title: this.state.title,
                  ismainapplicant: props.data.ismainapplicant,
                  applicantUniqueId: props.data.applicantUniqueId,
                  isguarantor: props.data.isguarantor,
                  iscoapplicant: props.data.iscoapplicant,
                  creditButtonFlag: props.data.creditButtonFlag,
                  redirection: 'qde',
                  offerType: 'tentative',
                });
              }} />
          </View>
        </>
        :
        null
      }
    </View>

  )
};


const labelTitles = {
  lead: { title: 'Lead Management', status: 'completed', Component: LeadManagement, },
  qde: { title: 'Quick Data Entry', status: 'inProgress', Component: Qde },
  dde: { title: 'Detailed Data Entry', status: 'pending', Component: Dde },
  offer: { title: 'Loan Offer', status: 'pending', Component: LoanOffer },
  agreement: { title: 'Agreement', status: 'pending', Component: Agreement },
  preDisbursal: { title: 'Pre Disbursal Documents', status: 'pending', Component: PreDisbursal },
  repayment: { title: 'Repayment Mode', status: 'pending', Component: Repayment },
  postDisbursal: { title: 'Post Disbursal Documents', status: 'pending', Component: PostDisbursal },
};
const labelTitles0 = {
  lead: { title: 'Lead Management', status: 'completed', Component: LeadManagement, },
  qde: { title: 'Quick Data Entry', status: 'completed', Component: Qde },
  dde: { title: 'Detailed Data Entry', status: 'inProgress', Component: Dde },
  offer: { title: 'Loan Offer', status: 'pending', Component: LoanOffer },
  agreement: { title: 'Agreement', status: 'pending', Component: Agreement },
  preDisbursal: { title: 'Pre Disbursal Documents', status: 'pending', Component: PreDisbursal },
  repayment: { title: 'Repayment Mode', status: 'pending', Component: Repayment },
  postDisbursal: { title: 'Post Disbursal Documents', status: 'pending', Component: PostDisbursal },
};
const labelTitles3 = {
  lead: { title: 'Lead Management', status: 'completed', Component: LeadManagement, },
  qde: { title: 'Quick Data Entry', status: 'completed', Component: Qde },
  dde: { title: 'Detailed Data Entry', status: 'inProgress', Component: Dde },
  offer: { title: 'Loan Offer', status: 'pending', Component: LoanOffer },
  agreement: { title: 'Agreement', status: 'pending', Component: Agreement },
  preDisbursal: { title: 'Pre Disbursal Documents', status: 'pending', Component: PreDisbursal },
  repayment: { title: 'Repayment Mode', status: 'pending', Component: Repayment },
  postDisbursal: { title: 'Post Disbursal Documents', status: 'pending', Component: PostDisbursal },
};
const labelTitles1 = {
  lead: { title: 'Lead Management', status: 'inProgress', Component: LeadManagement, },
  qde: { title: 'Quick Data Entry', status: 'pending', Component: BlankComponent1 },
  dde: { title: 'Detailed Data Entry', status: 'pending', Component: BlankComponent1 },
  offer: { title: 'Loan Offer', status: 'pending', Component: LoanOffer },
};

const labelTitles2 = {
  lead: { title: 'Lead Management', status: 'completed', Component: LeadManagement, },
  qde: { title: 'Quick Data Entry', status: 'inProgress', Component: Qde },
  dde: { title: 'Detailed Data Entry', status: 'pending', Component: Dde },
  offer: { title: 'Loan Offer', status: 'pending', Component: LoanOffer },
};

const LoanSummary = (props) => {
  const { navigation, newLeadDataSelector, userDataSelector } = props;
  const leadCode =
    navigation?.state?.params?.leadCode ||
    newLeadDataSelector?.newLead?.leadCode;

  const mobileNumber =
    navigation?.state?.params?.mobileNumber ||
    newLeadDataSelector?.newLead?.customerMobile;

  const roleId =
    userDataSelector?.userData?.data?.roleId;

  const applicantUniqueId =
    navigation?.state?.params?.applicantUniqueId ||
    newLeadDataSelector?.newLead?.applicantUniqueId;
  const coapplicantUniqueId =
    navigation?.state?.params?.coapplicantUniqueId ||
    newLeadDataSelector?.newLead?.coapplicantUniqueId;

  const title = navigation?.state?.params?.title;

  const leadName = navigation?.state?.params?.leadName;

  const [indSelfSoleFlag, setindSelfSoleFlag] = useState(false);
  const [response, setResponse] = useState({});
  const [tabs, setTabs] = useState([]);
  const [selectedTab, setStelectedTab] = useState(0);
  const [loanSummary, setLoanSummary] = useState(labelTitles);
  const [ddeFlag, setDdeFlag] = useState(false);
  const [ddeMandatoryFlag, setDdeMandatoryFlag] = useState(false);
  const [isViewOnly, setisViewOnly] = useState(false);
  const [dedupeStatus, setDedupeStatus] = useState({});

  const handleLoanSummaryResponse = (response) => {
    // !response?.mainapplicant?.coapplicantGarantorButtonFlag
    setisViewOnly(response?.mainapplicant?.loanAgreementFlag  ? true : response?.modelAccess[0]?.read ? true : false)
    setStelectedTab(selectedTab)
    setDedupeStatus(response?.mainapplicant?.dedupeStatus)
    setResponse(response);
    setDdeMandatoryFlag(response?.ddeMandatory);
    setDdeFlag(response?.mainapplicant?.saveScheme == true ? true : false)
    setLoanSummary(response?.mainapplicant?.saveScheme && response?.ddeMandatory ? labelTitles3 :
      response?.mainapplicant?.saveScheme && !response?.ddeMandatory ? labelTitles0 : labelTitles)
    try {
      const tempTabs = [
        {
          title: `MainApplicant`,
          id: 0,
          value: response.mainapplicant,
          ismainapplicant: true,
          mainapplicantuniqueid: response.mainapplicant.applicantUniqueId,
          indSelfSoleFlag: indSelfSoleFlag

        },
      ];
      if (response && response.coapplicant && response.coapplicant.length > 0) {
        response.coapplicant.slice(0, 3).map((value, index) => {
          tempTabs.push({
            ismainapplicant: false,
            iscoapplicant: true,
            title: `CoApp${index + 1}`,
            id: index + 2,
            value,
            position: index,
            mainapplicantuniqueid: response.mainapplicant.applicantUniqueId,
            indSelfSoleFlag: indSelfSoleFlag

          });
        });
      }

      if (response && response.gurantor && response.gurantor.length > 0) {
        response.gurantor.slice(0, 3).map((value, index) => {
          tempTabs.push({
            ismainapplicant: false,
            isguarantor: true,
            title: `Guarantor${index + 1}`,
            id: index + 3,
            value,
            position: index,
            mainapplicantuniqueid: response.mainapplicant.applicantUniqueId,
            indSelfSoleFlag: indSelfSoleFlag

          });
        });
      }
      setTabs(tempTabs);
    } catch (err) {
    }
  };

  const getStepColor = (status) => {
    const { greenCircle, greenLine, stepTitleStyle } = LoanSummaryStyles;
    const data = {
      stepper: [greenCircle],
      stepperLine: [greenLine],
      stepperTitle: [stepTitleStyle],
    };
    if (status === 'completed') {
      data.stepperTitle.push({ color: colors.COLOR_GREEN });
    } else if (status === 'inProgress') {
      data.stepper.push({ backgroundColor: colors.COLOR_LIGHT_NAVY_BLUE });
      data.stepperTitle.push({ color: colors.COLOR_LIGHT_NAVY_BLUE });
    } else {
      data.stepper.push({ backgroundColor: colors.COLOR_METEOR_GREY });
      data.stepperTitle.push({ color: colors.COLOR_METEOR_GREY });
    }
    return data;
  };

  useEffect(() => {
    const dataToAPI = {
      applicant_uniqueid: applicantUniqueId,
      lead_code: leadCode,
      roleId: roleId
    };
    props.getLoanSummary({
      dataToAPI,
      callback: handleLoanSummaryResponse,
    });
    props.getQDEData({
      dataForgetQDE: {
        applicant_uniqueid: applicantUniqueId,
        ismainapplicant: true,
        isguarantor: false,
      },
      callback: (response) => {
        setindSelfSoleFlag(response?.indSelfSoleFlag || false)
      }
    })
  }, []);

  useEffect(() => {
    const reload = navigation.addListener('didFocus', () => {
      const dataToAPI = {
        applicant_uniqueid: applicantUniqueId,
        lead_code: leadCode,
        roleId: roleId
      };
      props.getLoanSummary({
        dataToAPI,
        callback: handleLoanSummaryResponse,
      });
      props.getQDEData({
        dataForgetQDE: {
          applicant_uniqueid: applicantUniqueId,
          ismainapplicant: true,
          isguarantor: false,
        },
        callback: (response) => {
          setindSelfSoleFlag(response?.indSelfSoleFlag || false)
        }
      })
    });
    return () => {
      reload.remove();
    };
  }, []);

  const selectedTabvalue = (item, index) => {
    if (item.value.consentStatus == 'Consent Pending') {
      setLoanSummary(labelTitles1)
      setStelectedTab(index)
    }
    else if (item.iscoapplicant == true || item.isguarantor == true) {
      setLoanSummary(labelTitles2)
      setStelectedTab(index)
    }
    else {
      if (ddeFlag && ddeMandatoryFlag) {
        setLoanSummary(labelTitles0)
        setStelectedTab(index)
      }
      else if (ddeFlag && !ddeMandatoryFlag) {
        setLoanSummary(labelTitles3)
        setStelectedTab(index)
      }
      else {
        setLoanSummary(labelTitles)
        setStelectedTab(index)
      }
    }
  }

  const {
    mainContainer,
    horizontalScrollStyle,
    separatorStyle,
    buttonAddContainer,
    addGuarantorButtonStyle,
    stepTextStyle,
    flexRowStyle,
  } = LoanSummaryStyles;

  return (
    <View style={mainContainer}>
      <WaveBackground>
        <StatusBar
          backgroundColor={colors.COLOR_WHITE}
          barStyle={'dark-content'}
          translucent={false}
          hidden={false}
        />
        <Header
          label={LOAN_SUMMARY_CONST.HEADER}
          showLeftIcon={false}
          onPress={() => {
          }}
        />

        <ScrollView
          horizontal={true}
          style={horizontalScrollStyle}
          showsHorizontalScrollIndicator={false}>
          <View style={{ flexDirection: 'row' }}>
            {tabs.map((item, index) => (
              <View>
                <TabBar
                  title={item.title}
                  isSelected={index === selectedTab}
                  onPress={(e) => selectedTabvalue(item, index)}
                />
                {index === selectedTab && (
                  <View style={{ width: '100%', marginTop: 0 }}>
                    <View style={separatorStyle} />
                  </View>
                )}
              </View>
            ))}
          </View>
        </ScrollView>
        <ScrollView keyboardShouldPersistTaps="always" style={mainContainer}>
          {Object.values(loanSummary).map((item, index) => {
            const { status, Component, title } = item;
            const stepStyle = getStepColor(status);
         
            return (
              <View>
                <View style={stepStyle.stepper}>
                  <Text style={stepTextStyle}>{index + 1}</Text>
                </View>
                <View style={[flexRowStyle]}>
                  <View style={stepStyle.stepperLine} />
                  <View style={{ flex: 1, }}>
                    <Text style={stepStyle.stepperTitle}>{title}</Text>
                    {Component && tabs[selectedTab] && (
                      <Component
                        data={{
                          ...tabs[selectedTab].value,
                          name: "mjjjjjjj",
                          navigation: props,
                          leadCode,
                          mainapplicantuniqueid: tabs[selectedTab].mainapplicantuniqueid,
                          ismainapplicant: tabs[selectedTab].ismainapplicant,
                          iscoapplicant: tabs[selectedTab]?.iscoapplicant,
                          isguarantor: tabs[selectedTab]?.isguarantor,
                          dedupeStatus: dedupeStatus,
                          index: tabs[selectedTab]?.position
                        }}
                        navigate={props.navigation.navigate}
                      />
                    )}
                  </View>
                </View>
              </View>
            );
          })}
          {response?.mainapplicant?.saveScheme && (
            <View style={buttonAddContainer}>
              <Button
                isDisabled={isViewOnly}
                title={LOAN_SUMMARY_CONST.ADD_CO_APPLICANT}
                onPress={() => {
                  props.navigation.navigate('AddLead', {
                    title: title,
                    applicantFlow: 'coapplicant',
                    leadCode: leadCode,
                    leadName: leadName,
                    mainApplicantUniqueId: applicantUniqueId,
                    iscoapplicant: true,
                    isguarantor: false,
                    id: response?.mainapplicant?.id,
                  });
                }}
              />
              <View style={addGuarantorButtonStyle}>
                <Button
                  isDisabled={isViewOnly}
                  title={LOAN_SUMMARY_CONST.ADD_GUARANTOR}
                  onPress={() => {
                    props.navigation.navigate('AddLead', {
                      title: title,
                      applicantFlow: 'guarantor',
                      leadCode: leadCode,
                      leadName: leadName,
                      mainApplicantUniqueId: applicantUniqueId,
                      iscoapplicant: false,
                      isguarantor: true,
                      id: response?.mainapplicant?.id,
                    });
                  }}
                />
              </View>
            </View>
         )} 
        </ScrollView>
      </WaveBackground>
    </View>
  );
};
LoanSummary.propTypes = {
  getLoanSummary: PropTypes.func,
};

export default compose(
  container,
  withProps((getLoanSummary) => getLoanSummary),
)(LoanSummary);
