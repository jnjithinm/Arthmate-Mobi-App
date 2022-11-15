import React, { Component } from 'react';
import { View, Text, ScrollView, Alert, Linking, BackHandler, TouchableOpacity, Image } from 'react-native';
import PropTypes from 'prop-types';
import { compose, withProps } from 'recompose';
import container from '../../container/ConsentPending/index';
import { RadioButton } from "../../components/RadioButtonOtp/RadioButton";
import { Header } from "../../components/Header/Header";
import { Button } from "../../components/Button/Button";
import { WaveBackground } from "../../components/WaveBackground/WaveBackground";
import { CONSENT_PENDING_CONST } from "../../constants/screenConst";
import { ConsentPendingStyles } from "./ConsentPendingStyles";
import { Icon } from 'react-native-elements';
import { APP_FONTS, FONT_SIZE } from '../../constants/styleConfig'
import CheckBox from '@react-native-community/checkbox';
import { WebView } from 'react-native-webview';
import { handleError, handleSuccess, handleWarning } from "../../../utils";

class KycVerification extends Component {
    constructor(props) {
        super(props);
        this.state = {
            check: false,
            webviewVisible: false,
            webUrl: '',
            leadCode: this.props.navigation.state.params.leadCode || '',
            mobileNumber: this.props.navigation.state.params.mobileNumber || '',
            leadName: this.props.navigation.state.params.leadName || '',
            applicantUniqueId: this.props.navigation.state.params.applicantUniqueId || '',
            ismainapplicant: this?.props?.navigation?.state?.params?.ismainapplicant || "",
            isguarantor: this?.props?.navigation?.state?.params?.isguarantor || false,
            iscoapplicant: this?.props?.navigation?.state?.params?.iscoapplicant || false,

        };
    }

    checkBoxCheck() {
        this.setState({
            check: !this.state.check1
        })
    }
    render() {
        const { mainContainer, textStyleOTPCheck } = ConsentPendingStyles;
        return (
            <WaveBackground>
                <Header
                    label={`KYC - Bank Statement`}
                    showLeftIcon={false}
                    // showRightText={this.state.webviewVisible}
                    showLeftText={this.state.webviewVisible}
                    customTextStyle={{ flex: 1 }}
                    onPressBack={() => {
                        this.setState({ webviewVisible: false })
                    }}
                // onPress={() => {
                //     this.props.navigation.replace("PANAndGSTVerification", { iscoapplicant: this.state.iscoapplicant, isguarantor: this.state.isguarantor, leadCode: this.state.leadCode, mobileNumber: this.state.mobileNumber, applicantUniqueId: this.state.applicantUniqueId, ismainapplicant: this.state.ismainapplicant });

                // }}
                />
                {
                    <ScrollView>
                        <View style={[mainContainer, { paddingHorizontal: 30 }]}>
                            <TouchableOpacity
                                onPress={() => {
                                    this.props.navigation.replace("PANAndGSTVerification", { iscoapplicant: this.state.iscoapplicant, isguarantor: this.state.isguarantor, leadCode: this.state.leadCode, mobileNumber: this.state.mobileNumber, applicantUniqueId: this.state.applicantUniqueId, ismainapplicant: this.state.ismainapplicant });
                                }}>
                                <Image
                                    source={require('../../assets/img/cross.png')}
                                    style={{ alignSelf: 'flex-end', marginTop: 10 }}
                                />
                            </TouchableOpacity>

                            <Text style={{ fontFamily: APP_FONTS.NunitoSemiBold, fontSize: 16, fontWeight: '800', marginTop: 30 }}>
                                Now allow us to fetch your latest Bank
                                Statement securely for faster approval
                                through account aggregators (AA),
                                RBI Licensed activity.
                            </Text>

                            <Image
                                source={require('../../assets/img/object.png')}
                                style={{ alignSelf: 'center', marginTop: 60, marginBottom: 120 }}
                            />

                            {this.state.webviewVisible ? null : <View style={{ flexDirection: "row", marginBottom: 10 }}>
                                <CheckBox
                                    value={this.state.check}
                                    boxType="square"
                                    onValueChange={() => this.checkBoxCheck()}
                                    tintColors={{ true: '#334e9e', false: 'black' }}
                                />
                                <Text style={textStyleOTPCheck}>
                                    {`Consent to Fetch Data & Agree to the Terms & Conditions `}
                                    <Text style={{ color: 'blue' }}
                                        onPress={() => Linking.openURL('https://creditwisecapital.com/terms-conditions-for-using-account-aggregators/')}>
                                        Terms & Conditions
                                    </Text>
                                </Text>
                            </View>}

                            <TouchableOpacity
                                onPress={() => {
                                    if (this.state.check && !this.state.webviewVisible) {
                                        const dataToAPI = {
                                            applicantUniqueId: this.state.applicantUniqueId,
                                            mobileNo: this.state.mobileNumber,
                                        };
                                        this.props.accAggregatorAPI({
                                            dataToAPI,
                                            callback: (response) => {
                                                const dataToApi = {
                                                    applicantUniqueId: this.state.applicantUniqueId,
                                                    mobileNo: this.state.mobileNumber,
                                                    consentHandle: response.data.consentHandle,
                                                    userId: response.data.userId
                                                };
                                                this.props.aggregatorUrlCall({
                                                    dataToApi,
                                                    callback: (responseData) => {
                                                        Linking.openURL(responseData.data.webRedirectionUrl);

                                                        this.setState({
                                                            webUrl: responseData.data.webRedirectionUrl,
                                                            webviewVisible: true
                                                        })

                                                    }
                                                })

                                            }
                                        })

                                    }
                                    else {
                                        const dataToApi = {
                                            applicantUniqueId: this.state.applicantUniqueId,
                                        }
                                        this.props.getConsentStatus({
                                            dataToApi,
                                            callback: (responseData) => {
                                                responseData?.data?.aaConsentStatusFlag == "N" ?
                                                    this.setState({
                                                        // webUrl: responseData.data.webRedirectionUrl,
                                                        webviewVisible: false
                                                    }, () => {
                                                        handleWarning("Please complete verification process")
                                                    })
                                                    :
                                                    this.props.navigation.replace("PANAndGSTVerification", { iscoapplicant: this.state.iscoapplicant, isguarantor: this.state.isguarantor, leadCode: this.state.leadCode, mobileNumber: this.state.mobileNumber, applicantUniqueId: this.state.applicantUniqueId, ismainapplicant: this.state.ismainapplicant });

                                            }
                                        })
                                    }

                                }}
                                style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: this.state.check ? '#3E59E8' : "#818282", padding: 15, borderRadius: 8 }}
                            >
                                <Text style={{ color: 'white', fontSize: 18 }}>{this.state.webviewVisible ? "Continue" : 'Proceed'}</Text>
                            </TouchableOpacity>


                        </View>
                    </ScrollView>

                }
            </WaveBackground>
        )
    }
} export default compose(
    container,
    withProps((getLeadDetailsAPI) => { getLeadDetailsAPI }),
)(KycVerification);
