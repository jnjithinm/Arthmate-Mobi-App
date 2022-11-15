import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { Button } from '../../components/Button/Button';
import { VERIFIED_TICK } from '../../constants/imgConsts';
import { Divider } from 'react-native-elements';
import { LOAN_SUMMARY_CONST } from '../../constants/screenConst';
import { LoanSummaryStyles } from '../LoanSummary/LoanSummaryStyles';
const labelTitles = {
  itrFlag: 'ITR',
  bankDetails: 'Bank Details',
};

const ddeSections = ['bankDetails', 'itrFlag'];
function dde(props) {
  const {
    applicantUniqueId,
    customerMobile,
    customerName,
    ismainapplicant,
    leadCode,
    coapplicantUniqueId,
    cif,
    itrFlag,
    bankDetailsFalg,
    personalDetailsFlag,
    additionalDetails,
    loanDetails,
    isguarantor,
    businessDetails,
    panAndGst,
    saveScheme,
    scheme,
    mainapplicantuniqueid,
    indSelfSoleFlag,
  } = props.data;
  const navigationPayload = {
    leadCode: leadCode,
    mobileNumber: customerMobile,
    leadName: customerName,
    applicantUniqueId: applicantUniqueId || mainapplicantuniqueid,
    iscoapplicant: !ismainapplicant,
    isguarantor: !ismainapplicant,
    coapplicantUniqueId: coapplicantUniqueId,
    userDDEDataSelector: {},
  };

  const handleContinue = (e) => {
    try {
      const { itrFlag, bankDetailsFalg } = props.data;

      if (!bankDetailsFalg) {
        props.navigate('BankDetails', navigationPayload);
        return;
      }
      if (!itrFlag) {
        props.navigate('ITRVerification', navigationPayload);
        return;
      }
    } catch (err) {
    }
  };
  const {
    cifIDText,
    flexRowStyle,
    cardHolder,
    cardContainer,
    activeCardHeaderStyle,
    editTextStyle,
    editContainerStyle,
    pendingTextLabels,
    verifiedTickStyle,
    buttonContainer,
  } = LoanSummaryStyles;
  return (
    <View style={cardHolder}>

      {indSelfSoleFlag == false && ismainapplicant && loanDetails && scheme || !ismainapplicant && panAndGst && additionalDetails && personalDetailsFlag ?
        <>
          <View style={cardContainer}>
            <Text style={activeCardHeaderStyle}>{'Detailed Data Entry'}</Text>
            <View
              style={[
                flexRowStyle,
                { justifyContent: 'space-between', marginTop: 5 },
              ]}>
              <Text style={cifIDText}>{`CIF ID : ${cif == undefined ? '' : cif}`}</Text>
              {ismainapplicant && saveScheme == true ?
                <TouchableOpacity
                  style={flexRowStyle}
                  onPress={() => {
                    props.navigate('BankDetails', navigationPayload);
                  }}>
                  <Text style={editTextStyle}>{LOAN_SUMMARY_CONST.EDIT_LABEL}</Text>
                  <Icon name={'edit'} type="material" color={'#818282'} />
                </TouchableOpacity>
                :
                <TouchableOpacity
                  style={flexRowStyle}
                  onPress={() => {
                    props.navigate('BankDetails', navigationPayload);
                  }}>
                  <Text style={editTextStyle}>{LOAN_SUMMARY_CONST.EDIT_LABEL}</Text>
                  <Icon name={'edit'} type="material" color={'#818282'} />
                </TouchableOpacity>
              }
            </View>
            <Divider style={{ marginVertical: 10 }} />
            {ddeSections.map((item) => (
              <View style={editContainerStyle}>
                <Text style={[pendingTextLabels]}>{labelTitles[item]}</Text>
                {props.data[item] && (
                  <Image
                    source={VERIFIED_TICK}
                    resizeMode="contain"
                    style={verifiedTickStyle}
                  />
                )}
              </View>
            ))}
          </View>
          <View style={buttonContainer}>
            {ismainapplicant && saveScheme && itrFlag || ismainapplicant && saveScheme && bankDetailsFalg ?
              <Button
                title={LOAN_SUMMARY_CONST.BUTTON_CONTINUE}
                onPress={handleContinue}
              />
              :
              itrFlag || bankDetailsFalg ?
                <Button
                  title={LOAN_SUMMARY_CONST.BUTTON_CONTINUE}
                  onPress={handleContinue}
                /> : null
            }
          </View>
        </>
        : null
      }
      {indSelfSoleFlag == true && ismainapplicant && loanDetails && scheme || !ismainapplicant && panAndGst && additionalDetails && businessDetails ?
        <>
          <View style={cardContainer}>
            <Text style={activeCardHeaderStyle}>{'Detailed Data Entry'}</Text>
            <View
              style={[
                flexRowStyle,
                { justifyContent: 'space-between', marginTop: 5 },
              ]}>
              <Text style={cifIDText}>{`CIF ID : ${cif == undefined ? '' : cif}`}</Text>
              {ismainapplicant && saveScheme == true ?
                <TouchableOpacity
                  style={flexRowStyle}
                  onPress={() => {
                    props.navigate('BankDetails', navigationPayload);
                  }}>
                  <Text style={editTextStyle}>{LOAN_SUMMARY_CONST.EDIT_LABEL}</Text>
                  <Icon name={'edit'} type="material" color={'#818282'} />
                </TouchableOpacity>
                :
                <TouchableOpacity
                  style={flexRowStyle}
                  onPress={() => {
                    props.navigate('BankDetails', navigationPayload);
                  }}>
                  <Text style={editTextStyle}>{LOAN_SUMMARY_CONST.EDIT_LABEL}</Text>
                  <Icon name={'edit'} type="material" color={'#818282'} />
                </TouchableOpacity>
              }
            </View>
            <Divider style={{ marginVertical: 10 }} />
            {ddeSections.map((item) => (
              <View style={editContainerStyle}>
                <Text style={[pendingTextLabels]}>{labelTitles[item]}</Text>
                {props.data[item] && (
                  <Image
                    source={VERIFIED_TICK}
                    resizeMode="contain"
                    style={verifiedTickStyle}
                  />
                )}
              </View>
            ))}
          </View>
          <View style={buttonContainer}>
            {ismainapplicant && saveScheme && itrFlag || ismainapplicant && saveScheme && bankDetailsFalg ?
              <Button
                title={LOAN_SUMMARY_CONST.BUTTON_CONTINUE}
                onPress={handleContinue}
              />
              :
              itrFlag || bankDetailsFalg ?
                <Button
                  title={LOAN_SUMMARY_CONST.BUTTON_CONTINUE}
                  onPress={handleContinue}
                /> : null
            }
          </View>
        </>
        : null
      }
    </View>
  );
}

export default dde;
