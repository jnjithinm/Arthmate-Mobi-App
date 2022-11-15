import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { Button } from '../../components/Button/Button';
import { VERIFIED_TICK } from '../../constants/imgConsts';
import { Divider } from 'react-native-elements';
import { LOAN_SUMMARY_CONST } from '../../constants/screenConst';
import { LoanSummaryStyles } from '../LoanSummary/LoanSummaryStyles';
const labelTitles = {
  additionalDetails: 'Additional Details',
  bankDetails: 'Bank Details',
  businessDetails: 'Business Details',
  itrFlag: 'ITR',
  loanDetails: 'Loan Details',
  loanOffer: 'Loan Offer',
  panAndGst: 'Pan & Gst Verification',
  reference: 'References',
  scheme: 'Schemes',
  personalDetailsFlag: 'Personal Details',
};

const qdeSections = [
  'panAndGst',
  'additionalDetails',
  'personalDetailsFlag',
  'loanDetails',
  'reference',
  'scheme',
];

const qdeSectionsforSelfEmp = [
  'panAndGst',
  'additionalDetails',
  'businessDetails',
  'loanDetails',
  'reference',
  'scheme',
];

function qde(props) {
  const {
    cif,
    index,
    applicantUniqueId,
    customerMobile,
    customerName,
    coapplicantUniqueId,
    ismainapplicant,
    leadCode,
    submitCreditFlag,
    personalDetailsFlag,
    iscoapplicant,
    isguarantor,
    businessDetails,
    itrFlag,
    additionalDetails,
    loanDetails,
    bankDetailsFalg,
    loanOffer,
    reference,
    panAndGst,
    scheme,
    saveScheme,
    mainapplicantuniqueid,
    indSelfSoleFlag,
    dedupeStatus
  } = props.data;
  
  const navigationPayload = {
    leadCode: leadCode,
    mobileNumber: customerMobile,
    leadName: customerName,
    applicantUniqueId: applicantUniqueId || mainapplicantuniqueid,
    isViewOnly: submitCreditFlag,
    iscoapplicant: iscoapplicant,
    isguarantor: isguarantor,
    ismainapplicant: ismainapplicant,
    index: index
  };

  if (!ismainapplicant) {
    navigationPayload.coapplicantUniqueId = coapplicantUniqueId;
  }
  const handleContinue = (e) => {
    try {
      const {
        additionalDetails,
        applicantUniqueId,
        coapplicantUniqueId,
        loanDetails,
        panAndGst,
        reference,
        saveScheme,
        scheme,
      } = props.data;
      // if(dedupeStatus){
      //   props.navigate('Dedupe', navigationPayload);
      //   return;
      // }
      if (!panAndGst) {
        props.navigate('PANAndGSTVerification', navigationPayload);
        return;
      }
      if (!additionalDetails) {
        props.navigate('AdditionalDetails', navigationPayload);
        return;
      }
      if (!personalDetailsFlag) {
        props.navigate('PersonalDetails', navigationPayload);
        return;
      }
      if (!ismainapplicant && panAndGst && additionalDetails && personalDetailsFlag) {
        props.navigate('PersonalDetails', navigationPayload);
        return;
      }
      if (!loanDetails && ismainapplicant) {
        props.navigate('LoanDetails', navigationPayload);
        return;
      }
      if (!reference && ismainapplicant) {
        props.navigate('References', navigationPayload);
        return;
      }

      
      //changes Schemes
      if (
        (!scheme && ismainapplicant) ||
        (ismainapplicant && scheme && !saveScheme)
      ) {
        props.navigate('Schemes', navigationPayload);
        return;
      }
      if (!ismainapplicant && panAndGst && additionalDetails && personalDetailsFlag) {
        props.navigate('PersonalDetails', navigationPayload);
        return;
      }
      if (ismainapplicant && scheme && saveScheme) {
        props.navigate('QdeSuccess', {
          applicantUniqueId,
          redirection: 'qde',
          offerType: 'tentative',
        });
        return;
      }
    } catch (err) {
    }
  };

  const handleContinueForSelfEmp = (e) => {
    try {
      const {
        additionalDetails,
        applicantUniqueId,
        coapplicantUniqueId,
        loanDetails,
        panAndGst,
        reference,
        saveScheme,
        scheme,
      } = props.data;
      // if(dedupeStatus){
      //   props.navigate('Dedupe', navigationPayload);
      //   return;
      // }
      if (!panAndGst) {
        props.navigate('PANAndGSTVerification', navigationPayload);
        return;
      }
      if (!additionalDetails) {
        props.navigate('AdditionalDetails', navigationPayload);
        return;
      }
      if (!personalDetailsFlag) {
        props.navigate('BusinessDetails', navigationPayload);
        return;
      }
      if (!ismainapplicant && panAndGst && additionalDetails && personalDetailsFlag) {
        props.navigate('BusinessDetails', navigationPayload);
        return;
      }
      if (!loanDetails && ismainapplicant) {
        props.navigate('LoanDetails', navigationPayload);
        return;
      }
      if (!reference && ismainapplicant) {
        props.navigate('References', navigationPayload);
        return;
      }

    
      //changes Schemes
      if (
        (!scheme && ismainapplicant) ||
        (ismainapplicant && scheme && !saveScheme)
      ) {
        props.navigate('Schemes', navigationPayload);
        return;
      }
      if (!ismainapplicant && panAndGst && additionalDetails && businessDetails) {
        props.navigate('businessDetails', navigationPayload);
        return;
      }
      if (ismainapplicant && scheme && saveScheme) {
        props.navigate('QdeSuccess', {
          applicantUniqueId,
          redirection: 'qde',
          offerType: 'tentative',
        });
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

      <View style={cardContainer}>
        <Text style={activeCardHeaderStyle}>{'Quick Data Entry'}</Text>
        <View
          style={[
            flexRowStyle,
            { justifyContent: 'space-between', marginTop: 15 }, ``
          ]}>
          <Text style={cifIDText}>{`CIF ID : ${cif == undefined ? '' : cif}`}</Text>
          <TouchableOpacity
            style={flexRowStyle}
            onPress={() => {
              props.navigate('PANAndGSTVerification', navigationPayload);
            }}>
            <Text style={editTextStyle}>{LOAN_SUMMARY_CONST.EDIT_LABEL}</Text>
            <Icon name={'edit'} type="material" color={'#818282'} />
          </TouchableOpacity>
        </View>
        <Divider style={{ marginVertical: 10 }} />

        {indSelfSoleFlag == false && qdeSections.map((item) => (
          <View style={editContainerStyle}>
            {
              ismainapplicant !== false ?
                <>
                  <Text style={[pendingTextLabels]}>{labelTitles[item]}</Text>
                  {props.data[item] && (
                    <Image
                      source={VERIFIED_TICK}
                      resizeMode="contain"
                      style={verifiedTickStyle}
                    />
                  )}
                </>
                :
                <>
                  {
                    item === 'panAndGst' || item == 'additionalDetails' || item === 'personalDetailsFlag' ?
                      <>
                        <Text style={[pendingTextLabels]}>{labelTitles[item]}</Text>
                        {props.data[item] && (
                          <Image
                            source={VERIFIED_TICK}
                            resizeMode="contain"
                            style={verifiedTickStyle}
                          />
                        )}
                      </>
                      : null
                  }
                </>
            }
          </View>
        ))}
        {indSelfSoleFlag == true && qdeSectionsforSelfEmp.map((item) => (
          <View style={editContainerStyle}>
            {
              ismainapplicant !== false ?
                <>
                  <Text style={[pendingTextLabels]}>{labelTitles[item]}</Text>
                  {props.data[item] && (
                    <Image
                      source={VERIFIED_TICK}
                      resizeMode="contain"
                      style={verifiedTickStyle}
                    />
                  )}
                </>
                :
                <>
                  {
                    item === 'panAndGst' || item == 'additionalDetails' || item === 'businessDetails' ?
                      <>
                        <Text style={[pendingTextLabels]}>{labelTitles[item]}</Text>
                        {props.data[item] && (
                          <Image
                            source={VERIFIED_TICK}
                            resizeMode="contain"
                            style={verifiedTickStyle}
                          />
                        )}
                      </>
                      : null
                  }
                </>
            }
          </View>
        ))}
      </View>
      {indSelfSoleFlag == false &&
        <View style={buttonContainer}>
          {ismainapplicant && panAndGst && additionalDetails && personalDetailsFlag && reference && loanDetails && scheme ?
            null
            : iscoapplicant || isguarantor ?
              panAndGst && additionalDetails && personalDetailsFlag ?
                null
                :
                <Button
                  title={LOAN_SUMMARY_CONST.BUTTON_CONTINUE}
                  onPress={handleContinue}
                />
              :
              <Button
                title={LOAN_SUMMARY_CONST.BUTTON_CONTINUE}
                onPress={handleContinue}
              />
          }
        </View>}
      {indSelfSoleFlag == true &&
        <View style={buttonContainer}>
          {ismainapplicant && panAndGst && additionalDetails && businessDetails && loanDetails && scheme ?
            null
            : iscoapplicant || isguarantor ?
              panAndGst && additionalDetails && businessDetails ?
                null
                :
                <Button
                  title={LOAN_SUMMARY_CONST.BUTTON_CONTINUE}
                  onPress={handleContinueForSelfEmp}
                />
              :
              <Button
                title={LOAN_SUMMARY_CONST.BUTTON_CONTINUE}
                onPress={handleContinueForSelfEmp}
              />
          }
        </View>}
    </View>
  );
}

export default qde;
