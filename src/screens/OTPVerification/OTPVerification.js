import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { compose, withProps } from 'recompose';
import container from '../../container/OTPVerifcation/index';
import { Header } from "../../components/Header/Header";
import { WaveBackground } from "../../components/WaveBackground/WaveBackground";
import { Button } from "../../components/Button/Button";
import { OTPVERIFICATION_CONST } from "../../constants/screenConst";
import { OTPVerificationStyles } from "./OTPVerificationStyles";

import CheckBox from '@react-native-community/checkbox';
import OTPInputView from '@twotalltotems/react-native-otp-input'
import { colors } from 'react-native-elements';

class OTPVerification extends Component {
    constructor(props) {
        super(props);
        this.state = {
            check1: false,
            check2: false,
            otp: "",
            id: this?.props?.navigation?.state?.params?.id || "",
            title: this?.props?.navigation?.state?.params?.title || "",
            ismainapplicant: this?.props?.navigation?.state?.params?.ismainapplicant || "",
            leadName: this?.props?.navigation?.state?.params?.leadName || "",
            mobileNumber: this?.props?.navigation?.state?.params?.mobileNumber || "",
            emailAddress: this?.props?.navigation?.state?.params?.emailAddress || "",
            iscoapplicant: this?.props?.navigation?.state?.params?.iscoapplicant || false,
            isguarantor: this?.props?.navigation?.state?.params?.isguarantor || false,
            coapplicantUniqueId: this?.props?.navigation?.state?.params?.coapplicantUniqueId || "",
            leadCode: this?.props?.navigation?.state?.params?.leadCode || "",
            source: this?.props?.navigation?.state?.params?.source || "",
            request_id: this?.props?.navigation?.state?.params?.request_id || "",

            applicantUniqueId:
                (
                    this?.props?.navigation?.state?.params?.applicantUniqueId) ||
                (this.props.newLeadDataSelector &&
                    this.props.newLeadDataSelector.newLead &&
                    this.props.newLeadDataSelector.newLead.applicantUniqueId) ||
                '',
        }
    }

    checkBoxCheck1() {
        this.setState({
            check1: !this.state.check1
        })
    }

    checkBoxCheck2() {
        this.setState({
            check2: !this.state.check2
        })
    }



    renderCheckBox() {

        const { textStyleOTPCheck } = OTPVerificationStyles
        return (
            <View>
                <View style={{ flexDirection: "row" }}>
                    <CheckBox

                        value={this.state.check1}

                        boxType="square"
                        onValueChange={() => this.checkBoxCheck1()}
                        tintColors={{ true: '#334e9e', false: 'black' }}
                    />
                    <Text style={textStyleOTPCheck}
                    >
                        {`It is advised to read the terms and conditions before applying vehicle loan from the mobile application of Mamta Projects Private Limited (“MPPL”) designed for the purpose of facilitating the vehicle loan needs of the customers.

The customer must furnish its basic information like Name, Address, Mobile Number, Email Address etc. and submit its KYC documents, income proofs, bank statements, income tax returns, financial statements to MPPL before applying for the loan on the mobile application. The customer understands and agrees that the documents and information is required by MPPL for sanctioning loan to the customer. 

The customer hereby authorises MPPL to fetch its credit reports from different credit rating agencies including but not limited to TransUnion, Experian etc. for conducting the eligibility checks and checking the credit history of the customer prior to the sanctioning of the loan. 

The customer(s) hereby agrees and give consent for disclosure by MPPL all or any (a) information and data relating to the customer / borrower(s) (b) information or data relating to any credit facility availed or/to be availed by the customer / borrower(s) and default, if any, committed by the borrower(s) in discharge of his/their such obligation as MPPL may deem appropriate and necessary, to disclose and furnish to Credit Information Bureau (India) Ltd. (CIBIL), and any other agency authorized in this behalf by RBI.

The customer understands that the loan sanctioned by MPPL shall be subject to a rate of interest calculated by MPPL upon various factors including but not limited to eligibility criteria and credit norms of MPPL and the rate of interest may be varied by MPPL depending upon case to case basis or due to any change in statutory and / regulatory guideline and the customer agrees to abide by the same.
`}
                    </Text>
                </View>
                <View style={{ flexDirection: "row", marginTop: 10, }}>
                    <CheckBox
                        value={this.state.check2}
                        boxType="square"
                        onValueChange={() => this.checkBoxCheck2()}
                        tintColors={{ true: '#334e9e', false: 'black' }}
                    />
                    <Text style={textStyleOTPCheck}
                    >
                        {`I, ${this.state.leadName}, agree to consent Arthmate for collecting my Aadhaar/Driving license and storing and using the same for KYC purpose.`}
                    </Text>
                </View>
            </View>
        )
    }
    renderOTP() {
        const {
            textStyleResendOTP, mainContainerSecondary, textStyleOTP, textStyleSentOTP, underlineStyleBase, underlineStyleHighLighted, OTPViewStyle
        } = OTPVerificationStyles

        return (
            <View style={{ flexDirection: 'column', width: '100%', }}>
                <Text style={textStyleSentOTP}>
                    An OTP has been sent to {this.state.mobileNumber.toString().substring(0, 2) + 'XXXXXX' + this.state.mobileNumber.toString().substring(8)} & {this.state.emailAddress}
                    {/* An OTP has been sent to {this.state.mobileNumber.toString().substring(0, 2) + 'XXXXXX' + this.state.mobileNumber.toString().substring(8)} */}
                </Text>
                <Text style={textStyleOTP}>{OTPVERIFICATION_CONST.ENTEROTP}</Text>
                {/* <OTPInputView
                    style={OTPViewStyle}
                    pinCount={6}
                    secureTextEntry
                    autoFocusOnLoad
                    // code={this.state.code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
                    // onCodeChanged = {code => { this.setState({code})}}
                    autoFocusOnLoad
                    codeInputFieldStyle={underlineStyleBase}
                    codeInputHighlightStyle={underlineStyleHighLighted}
                    onCodeFilled={(code => {
                        this.setState({
                            otp: code
                        })
                    })}
                /> */}
                <View style={{ flex: 1, width: '100%', justifyContent: 'center', alignItems: 'center', }}>
                    <TextInput
                        style={styles.input}
                        onChangeText={(code) => {
                            this.setState({
                                otp: code
                            })
                        }}
                        secureTextEntry
                        autoFocus
                        allowFontScaling
                        // underlineColorAndroid={"#334e9e"}
                        value={this.state.otp}
                        keyboardType="numeric"
                    />
                </View>

                <View style={mainContainerSecondary}>
                    <TouchableOpacity
                        onPress={() => {
                            if (this.state.iscoapplicant || this.state.isguarantor) {
                                const dataToAPI = {
                                    "coapplicantUniqueId": this.state.coapplicantUniqueId,
                                    "lead_code": this.state.leadCode,
                                    "consentType": 'otp'
                                };
                                this.props.createConsentCoAppGuarantor({
                                    dataToAPI,
                                    callback: (response) => {
                                        // if (response && !response.error) {
                                        //     this.state.selectedSourceType === 'OTP' ?
                                        //         this.props.navigation.navigate("OTPVerification", { id: this.state.id, title: this.state.title, ismainapplicant: this.state.ismainapplicant, leadName: this.state.CUSTOMER_NAME, emailAddress: this.state.EMAIL_ADDRESS, mobileNumber: this.state.MOBILE_NUMBER, coapplicantUniqueId: this.state.coapplicantUniqueId, leadCode: this.state.LEADCODE, iscoapplicant: this.state.iscoapplicant, isguarantor: this.state.isguarantor })
                                        //         :
                                        //         this.props.navigation.navigate("Verification", { id: this.state.id, title: this.state.title, ismainapplicant: this.state.ismainapplicant, leadName: this.state.CUSTOMER_NAME, emailAddress: this.state.EMAIL_ADDRESS, mobileNumber: this.state.MOBILE_NUMBER, coapplicantUniqueId: this.state.coapplicantUniqueId, leadCode: this.state.LEADCODE, iscoapplicant: this.state.iscoapplicant, isguarantor: this.state.isguarantor })
                                        // }
                                    }
                                });
                            }
                            else {
                                this.props.consentPendingAPI({
                                    data: {
                                        leadCode: this.state.leadCode,
                                        consentType: 'otp'
                                    },

                                    callback: (response) => {
                                        // this.state.selectedSourceType === 'OTP' ?
                                        //     this.props.navigation.navigate("OTPVerification", { id: this.state.id, title: this.state.title, ismainapplicant: this.state.ismainapplicant, leadName: this.state.CUSTOMER_NAME, emailAddress: this.state.EMAIL_ADDRESS, mobileNumber: this.state.MOBILE_NUMBER, coapplicantUniqueId: this.state.coapplicantUniqueId, leadCode: this.state.LEADCODE, iscoapplicant: this.state.iscoapplicant, isguarantor: this.state.isguarantor, applicantUniqueId: this.state.applicantUniqueId })
                                        //     :
                                        //     this.props.navigation.navigate("Verification", { id: this.state.id, title: this.state.title, ismainapplicant: this.state.ismainapplicant, leadName: this.state.CUSTOMER_NAME, emailAddress: this.state.EMAIL_ADDRESS, mobileNumber: this.state.MOBILE_NUMBER, coapplicantUniqueId: this.state.coapplicantUniqueId, leadCode: this.state.LEADCODE, iscoapplicant: this.state.iscoapplicant, isguarantor: this.state.isguarantor, applicantUniqueId: this.state.applicantUniqueId })
                                    },
                                });
                            }
                        }}
                    >
                        <Text style={textStyleResendOTP}>Resend OTP</Text>
                    </TouchableOpacity>
                </View>
            </View>

        )
    }
    render() {
        const {
            mainContainer, cancelButtonTitleStyle, cancelButtonStyle, buttonContainer
        } = OTPVerificationStyles;
        return (
            <WaveBackground>
                <ScrollView>
                    <Header
                        label={OTPVERIFICATION_CONST.HEADER}
                        showLeftIcon={false} onPress={() => {

                        }
                        } />
                    <View style={mainContainer}>
                        {this.renderCheckBox()}
                        {this.renderOTP()}
                        <View style={buttonContainer}>
                            <Button
                                title={OTPVERIFICATION_CONST.BUTTON_TITLE_CANCEL}
                                onPress={() => {
                                    this.props.navigation.navigate('ConsentPending', {
                                        id: this.state.id,
                                        title: this.state.title,
                                        ismainapplicant: this.state.ismainapplicant,
                                        coapplicantUniqueId: this.state.coapplicantUniqueId,
                                        isguarantor: this.state.isguarantor,
                                        iscoapplicant: this.state.iscoapplicant,
                                    });
                                }}
                                customContainerStyle={cancelButtonStyle}
                                cutomTitleStyle={cancelButtonTitleStyle} />
                            {/* <Button
                                title={"Next"}
                                isDisabled={!this.state.check1 || !this.state.check2 || (this.state.otp.length == 0)}
                                onPress={() => {
                                    // if (this.state.isguarantor || this.state.iscoapplicant) {
                                    //     const dataToAPI = {
                                    //         coapplicantUniqueId: this.state.coapplicantUniqueId,
                                    //         lead_code: this.state.leadCode,
                                    //         otp: this.state.otp,
                                    //         source: this.state.source,
                                    //         request_id: this.state.request_id
                                    //     };

                                        this.props.verifyConentCoAppGuarantor({
                                            dataToAPI,
                                            callback: (response) => {
                                                this.props.navigation.replace("KycVerification", {
                                                     iscoapplicant: this.state.iscoapplicant, 
                                                     isguarantor: this.state.isguarantor, 
                                                     coapplicantUniqueId: this.state.coapplicantUniqueId, 
                                                     leadCode: this.state.leadCode, 
                                                     mobileNumber: this.state.mobileNumber,
                                                      ismainapplicant: this.state.ismainapplicant,
                                                      applicantUniqueId: this.state.applicantUniqueId,
                                                     });
                                            }
                                        });
                                    // } else {
                                    //     this.props.otpVerificationAPI({
                                    //         data: {
                                    //             otp: this.state.otp,
                                    //             leadCode: this.state.leadCode,
                                    //             source: this.state.source,
                                    //             request_id: this.state.request_id
                                    //         },
                                    //         callback: (response) => {
                                    //             this.props.navigation.replace("PANAndGSTVerification", { iscoapplicant: this.state.iscoapplicant, isguarantor: this.state.isguarantor, leadCode: this.state.leadCode, mobileNumber: this.state.mobileNumber, applicantUniqueId: this.state.applicantUniqueId, ismainapplicant: this.state.ismainapplicant });
                                    //             // this.props.navigation.navigate("Verification")
                                    //         }

                                    //     })
                                    // }
                                }} /> */}

                            <Button
                                title={OTPVERIFICATION_CONST.BUTTON_TITLE_PROCEED}
                                isDisabled={!this.state.check1 || !this.state.check2 || (this.state.otp.length == 0)}
                                onPress={() => {
                                    if (this.state.isguarantor || this.state.iscoapplicant) {
                                        const dataToAPI = {
                                            coapplicantUniqueId: this.state.coapplicantUniqueId,
                                            lead_code: this.state.leadCode,
                                            otp: this.state.otp,
                                            source: this.state.source,
                                            request_id: this.state.request_id
                                        };

                                        this.props.verifyConentCoAppGuarantor({
                                            dataToAPI,
                                            callback: (response) => {
                                                this.props.navigation.replace("PANAndGSTVerification", { iscoapplicant: this.state.iscoapplicant, isguarantor: this.state.isguarantor, coapplicantUniqueId: this.state.coapplicantUniqueId, leadCode: this.state.leadCode,  applicantUniqueId: this.state.applicantUniqueId, mobileNumber: this.state.mobileNumber, ismainapplicant: this.state.ismainapplicant });
                                            }
                                        });
                                    } else {
                                        this.props.otpVerificationAPI({
                                            data: {
                                                otp: this.state.otp,
                                                leadCode: this.state.leadCode,
                                                source: this.state.source,
                                                request_id: this.state.request_id
                                            },
                                            callback: (response) => {
                                                this.props.navigation.replace("PANAndGSTVerification", { iscoapplicant: this.state.iscoapplicant, isguarantor: this.state.isguarantor, leadCode: this.state.leadCode, mobileNumber: this.state.mobileNumber, applicantUniqueId: this.state.applicantUniqueId, ismainapplicant: this.state.ismainapplicant });
                                                // this.props.navigation.navigate("PANAndGSTVerification KycVerification")
                                            }

                                        })
                                    }
                                }} />

                                 {/* <Button
                                title={OTPVERIFICATION_CONST.BUTTON_TITLE_PROCEED}
                                isDisabled={!this.state.check1 || !this.state.check2 || (this.state.otp.length == 0)}
                                onPress={() => {
                                    if (this.state.isguarantor || this.state.iscoapplicant) {
                                        const dataToAPI = {
                                            coapplicantUniqueId: this.state.coapplicantUniqueId,
                                            lead_code: this.state.leadCode,
                                            otp: this.state.otp,
                                            source: this.state.source,
                                            request_id: this.state.request_id
                                        };

                                        this.props.verifyConentCoAppGuarantor({
                                            dataToAPI,
                                            callback: (response) => {
                                                this.props.navigation.replace("PANAndGSTVerification", { iscoapplicant: this.state.iscoapplicant, isguarantor: this.state.isguarantor, coapplicantUniqueId: this.state.coapplicantUniqueId, leadCode: this.state.leadCode, mobileNumber: this.state.mobileNumber, ismainapplicant: this.state.ismainapplicant });
                                            }
                                        });
                                    } else {
                                        this.props.otpVerificationAPI({
                                            data: {
                                                otp: this.state.otp,
                                                leadCode: this.state.leadCode,
                                                source: this.state.source,
                                                request_id: this.state.request_id
                                            },
                                            callback: (response) => {
                                                this.props.navigation.replace("PANAndGSTVerification", { iscoapplicant: this.state.iscoapplicant, isguarantor: this.state.isguarantor, leadCode: this.state.leadCode, mobileNumber: this.state.mobileNumber, applicantUniqueId: this.state.applicantUniqueId, ismainapplicant: this.state.ismainapplicant });
                                                // this.props.navigation.navigate("Verification")
                                            }

                                        })
                                    }
                                }} /> */}
                        </View>
                    </View>
                </ScrollView>
            </WaveBackground>
        )
    }
}

OTPVerification.propTypes = {
    userDataSelector: PropTypes.object,
    otpVerificationAPI: PropTypes.func,
};

export default compose(
    container,
    withProps(() => { }),
)(OTPVerification);

const styles = StyleSheet.create({
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        width: '50%',
        borderColor: '#334e9e'
    },
});