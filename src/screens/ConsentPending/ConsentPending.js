import React, { Component } from 'react';
import { View, Text, ScrollView, Alert, BackHandler, TouchableOpacity } from 'react-native';
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

class ConsentPending extends Component {

    constructor(props) {
        super(props);
        this.state = {
            sourceType: [{
                title: 'OTP',
                isSelected: true,
            },
            // {
            //     title: 'Send link to customer',
            //     isSelected: false,
            // },
            ],
            selectedSourceType: "OTP",
            CUSTOMER_NAME: "",
            firstName: "",
            middleName: '',
            lastName: '',
            EMAIL_ADDRESS: "",
            pan: '',
            MOBILE_NUMBER: "",
            PINCODE: "",
            SELECTEDITEM: "",
            SELECTEDSOURCE: "",
            LEADCODE: "",
            BRANCHNAME: "",
            consentStatus: '',
            id: this.props.navigation.state.params.id || '',
            title: this.props.navigation.state.params.title || '',
            branchName: this.props.navigation.state.params.branchName,
            ismainapplicant: this.props.navigation.state.params.ismainapplicant || true,
            isguarantor: this.props.navigation.state.params.isguarantor || false,
            coapplicantUniqueId: this.props.navigation.state.params.coapplicantUniqueId || "",
            iscoapplicant: this.props.navigation.state.params.iscoapplicant || false,
            applicantUniqueId:
                (this.props.navigation &&
                    this.props.navigation.state &&
                    this.props.navigation.state.params &&
                    this.props.navigation.state.params.applicantUniqueId) ||
                (this.props.newLeadDataSelector &&
                    this.props.newLeadDataSelector.newLead &&
                    this.props.newLeadDataSelector.newLead.applicantUniqueId) ||
                '',
            isViewOnly: false,
        }
    }
    selectRadioButton(value, index) {
        this.setState({ selectedSourceType: value.title });
    }

    loanSummary() {
        const dataToAPI = {
            applicant_uniqueid: this.state.applicantUniqueId,
            lead_code: this.state.leadCodeFromProps,
            roleId: this.props.userDataSelector.userData.data.roleId
        };
        this.props.getLoanSummary({
            dataToAPI,
            callback: (response) => {

                this.setState({
                    isViewOnly: 
                    response?.mainapplicant?.loanAgreementFlag ? true :
                     response?.modelAccess[0]?.read ? true :
                      false
                })
            }
        })
    }

    fetchData() {
        this.props.getLeadDetailsAPI({
            data: { id: this.state.id },
            callback: (response) => {
                this.setState({
                    BRANCHNAME: response.data.branchName || "",
                    CUSTOMER_NAME: response.data.leadName || "",
                    firstName: response.data.firstName || "",
                    middleName: response.data.middleName || "",
                    lastName: response.data.lastName || "",
                    pan: response.data.pan || "",
                    EMAIL_ADDRESS: response.data.customerEmail || "",
                    MOBILE_NUMBER: response.data.customerMobile || "",
                    PINCODE: response.data.customerPincode || "",
                    SELECTEDITEM: response.data.sourceName || "",
                    LEADCODE: response.data.leadCode || "",
                    SELECTEDSOURCE: response.data.sourceType || "",
                    applicantUniqueId: response.data.applicantUniqueId || "",
                    consentStatus: response.data.consentStatus || "",
                    iscoapplicant: response.data.iscoapplicant || "",
                    isguarantor: response.data.isguarantor || "",
                    mainapplicantUniqueId: response.data.mainapplicantUniqueId || '',
                })
            },
        });
    }

    backAction = () => {
        if (this.props.navigation && this.props.navigation.navigate) {
            this.props.navigation.navigate('LeadList');
            return true;
        }
        return false;
    };

    componentDidMount() {
        this.loanSummary()
        this.focusListener = this.props.navigation.addListener('didFocus', () => {
            if (this.state.iscoapplicant || this.state.isguarantor) {
                this.loanSummary()
                this.setState({
                    coapplicantUniqueId: this.props.navigation.state.params.coapplicantUniqueId || "",
                }, () => {
                    const dataToAPI = {
                        coapplicantUniqueId: this.state.coapplicantUniqueId,
                    };

                    this.props.getCoAppGuarantor({
                        dataToAPI,
                        callback: (response) => {
                            console.log("mmmmmmmm",response);
                            if (response.productId === 1) {
                                this.setState({ title: 'New Two Wheeler' });
                            } else if (
                                response.productId === 2
                            ) {
                                this.setState({ title: 'Electric Two Wheeler' });
                            } else if (
                                response.productId === 3
                            ) {
                                this.setState({ title: 'Used Two Wheeler' });
                            } else if (
                                response.productId === 4
                            ) {
                                this.setState({ title: 'Other Two Wheeler' });
                            }
                            this.setState({
                                CUSTOMER_NAME: response.customerName || response.leadName || "",
                                firstName: response.firstName || "",
                                middleName: response.middleName || "",
                                lastName: response.lastName || "",
                                EMAIL_ADDRESS: response.customerEmail || "",
                                MOBILE_NUMBER: response.customerMobile || "",
                                PINCODE: response.customerPincode || "",
                                SELECTEDITEM: response.sourceName || "",
                                LEADCODE: response.leadCode || "",
                                SELECTEDSOURCE: response.sourceType || "",
                                coapplicantUniqueId: response.coapplicantUniqueId || "",
                                BRANCHNAME: response.branchName || "",
                                pan: response.pan || "",

                            })
                        }
                    });
                });
            } else {
                this.loanSummary()
                this.fetchData();
            }
        });
        BackHandler.addEventListener("hardwareBackPress", this.backAction);
    }

    componentWillUnmount() {
        if (this.focusListener != null && this.focusListener.remove) {
            this.focusListener.remove();
        }
        BackHandler.removeEventListener("hardwareBackPress", this.backAction);
    }


    renderInputs() {
        const { textInputStyle, textInputStyleMargin } = ConsentPendingStyles;

        return (

            <View style={{ marginBottom: 10 }}>
                {this.state.SELECTEDSOURCE.toLowerCase() !== "direct" && <Text style={textInputStyle}>
                    {CONSENT_PENDING_CONST.BRANCH_NAME}</Text>}
                {this.state.SELECTEDSOURCE.toLowerCase() !== "direct" && <Text style={textInputStyleMargin}>
                    {this.state.BRANCHNAME}</Text>}

                {this.state.SELECTEDSOURCE.toLowerCase() === "dealer" && <Text style={textInputStyle}>{this.state.SELECTEDSOURCE} Name </Text>}
                {this.state.SELECTEDSOURCE.toLowerCase() === "dsa" && <Text style={textInputStyle}>{this.state.SELECTEDSOURCE} Name </Text>}

                {this.state.SELECTEDSOURCE.toLowerCase() === "dealer" && <Text style={textInputStyleMargin}>{this.state.SELECTEDITEM} </Text>}
                {this.state.SELECTEDSOURCE.toLowerCase() === "dsa" && <Text style={textInputStyleMargin}>{this.state.SELECTEDITEM} </Text>}

                <Text style={textInputStyle}>
                    {CONSENT_PENDING_CONST.FIRST_NAME}
                </Text>
                <Text style={textInputStyleMargin}>
                    {this.state.firstName}
                </Text>

                <Text style={textInputStyle}>
                    {CONSENT_PENDING_CONST.MIDDLE_NAME}
                </Text>
                <Text style={textInputStyleMargin}>
                    {this.state.middleName}
                </Text>

                <Text style={textInputStyle}>
                    {CONSENT_PENDING_CONST.LAST_NAME}
                </Text>
                <Text style={textInputStyleMargin}>
                    {this.state.lastName}
                </Text>

                <Text
                    style={textInputStyle}>
                    {CONSENT_PENDING_CONST.MOBILE_NUMBER}
                </Text>
                <Text
                    style={textInputStyleMargin}>
                    {this.state.MOBILE_NUMBER}
                </Text>

                <Text
                    style={textInputStyle}>
                    {CONSENT_PENDING_CONST.EMAIL}
                </Text>
                <Text
                    style={textInputStyleMargin}>
                    {this.state.EMAIL_ADDRESS}
                </Text>
                <Text
                    style={textInputStyle}>
                    {'Pan'}
                </Text>
                <Text
                    style={textInputStyleMargin}>
                    {this.state.pan}
                </Text>

                <Text
                    style={textInputStyle}>
                    {CONSENT_PENDING_CONST.PINCODE}
                </Text>
                <Text
                    style={textInputStyleMargin}>
                    {/*  {CONSENT_PENDING_CONST.PINCODE_FIELD} */}
                    {this.state.PINCODE}
                </Text>

            </View>
        );
    }

    render() {
        const {
            mainContainer, flexRowStyle, editTextStyle, sourceTypeLabelStyle, buttonContainer, buttonContainer1, cancelButtonStyle, cancelButtonTitleStyle, inputContainer, backgroundBlue, colorText, textInputStyleMargin
        } = ConsentPendingStyles;
        return (
            <WaveBackground>
                <ScrollView>
                    <Header
                        label={`View Lead - ${this.state.title}`}
                        showLeftIcon={false}
                        customTextStyle={{ flex: 1 }}
                        onPress={() => {

                        }
                        } />
                    <View style={mainContainer}>
                        <View style={{ flexDirection: "row", justifyContent: "flex-end", marginTop: 5 }}>

                            <TouchableOpacity onPress={() => {
                                if (!this.state.isViewOnly) {
                                    Alert.alert(
                                        "Delete this lead.",
                                        "Do you really want to delete the lead?",
                                        [
                                            {
                                                text: "Cancel",
                                                onPress: () => {},
                                                style: "cancel"
                                            },
                                            {
                                                text: "Delete", onPress: () => {
                                                    if (this.state.iscoapplicant || this.state.isguarantor) {
                                                        const dataToAPI = {
                                                            "coapplicantUniqueId": this.state.coapplicantUniqueId,
                                                            "lead_code": this.state.LEADCODE,
                                                        };

                                                        this.props.deleteCoAppGuarantor({
                                                            dataToAPI,
                                                            callback: () => {
                                                                this.props.navigation.navigate("LeadList");
                                                            }
                                                        });
                                                    }
                                                    else {
                                                        this.props.deleteLeadAPI({
                                                            data: { id: this.state.id },
                                                            callback: (response) => {
                                                                this.props.navigation.navigate("LeadList");
                                                            },
                                                        });
                                                    }
                                                }
                                            }
                                        ],
                                        { cancelable: false }
                                    );
                                }
                            }}
                                style={[flexRowStyle, { marginRight: 10 }]}>
                                <Text style={editTextStyle}>Delete</Text>
                                <Icon
                                    name={"delete"}
                                    type="material"
                                    color={'#818282'}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {
                                if (!this.state.isViewOnly) {
                                    { 
                                        console.log("this.state.BRANCHNAME",this.state.BRANCHNAME);
                                        this.props.navigation.navigate("Edit", { id: this.state.id, title: this.state.title, branchName: this.state.BRANCHNAME, iscoapplicant: this.state.iscoapplicant, isguarantor: this.state.isguarantor, coapplicantUniqueId: this.state.coapplicantUniqueId, ismainapplicant: this.state.ismainapplicant })
                                     }
                                }
                            }}
                                style={[flexRowStyle, { marginRight: 10 }]}>
                                <Text style={editTextStyle}>Edit</Text>
                                <Icon
                                    name={"edit"}
                                    type="material"
                                    color={'#818282'}
                                />
                            </TouchableOpacity>
                        </View>
                        {/* <Text style={sourceTypeLabelStyle}>{CONSENT_PENDING_CONST.SOURCE_TYPE_LABEL}</Text>
                        <Text style={textInputStyleMargin}>{this.state.SELECTEDSOURCE}</Text> */}
                        {this.renderInputs()}
                        <View style={backgroundBlue}>
                            <Text style={colorText}>{CONSENT_PENDING_CONST.SELECT_MODE_LABEL}</Text>
                            <View style={inputContainer}>
                                {this.state.sourceType.map((value, index) => (
                                    <RadioButton
                                        title={value.title}
                                        isSelected={this.state.selectedSourceType.toLowerCase() === value.title.toLowerCase() ? true : false}
                                        onPress={() => {
                                            if (!this.state.isViewOnly) {
                                                this.selectRadioButton(value, index)
                                            }
                                        }
                                        } />
                                ))}
                            </View>
                        </View>
                        <View style={buttonContainer1}>
                            <Button
                                title={CONSENT_PENDING_CONST.BUTTON_TITLE_CANCEL}
                                onPress={() => { this.props.navigation.navigate("LeadList") }}
                                customContainerStyle={cancelButtonStyle}
                                cutomTitleStyle={cancelButtonTitleStyle} />
                            <Button
                                isDisabled={this.state.isViewOnly}
                                title={CONSENT_PENDING_CONST.BUTTON_TITLE_PROCEED}
                                onPress={() => {
                                    if (this.state.iscoapplicant || this.state.isguarantor) {
                                        const dataToAPI = {
                                            "coapplicantUniqueId": this.state.coapplicantUniqueId,
                                            "lead_code": this.state.LEADCODE,
                                            "consentType": this.state.selectedSourceType
                                        };
                                        this.props.createConsentCoAppGuarantor({
                                            dataToAPI,
                                            callback: (response) => {

                                                if (response && !response.error) {
                                                    this.state.selectedSourceType === 'OTP' ?
                                                        this.props.navigation.navigate("OTPVerification", { id: this.state.id, source: response.data.source, request_id: response.data.requestId || '', title: this.state.title, ismainapplicant: this.state.ismainapplicant, leadName: this.state.CUSTOMER_NAME, emailAddress: this.state.EMAIL_ADDRESS, mobileNumber: this.state.MOBILE_NUMBER, coapplicantUniqueId: this.state.coapplicantUniqueId, leadCode: this.state.LEADCODE, iscoapplicant: this.state.iscoapplicant, isguarantor: this.state.isguarantor , applicantUniqueId: this.state.applicantUniqueId})
                                                        :
                                                        this.props.navigation.navigate("Verification", { id: this.state.id, title: this.state.title, ismainapplicant: this.state.ismainapplicant, leadName: this.state.CUSTOMER_NAME, emailAddress: this.state.EMAIL_ADDRESS, mobileNumber: this.state.MOBILE_NUMBER, coapplicantUniqueId: this.state.coapplicantUniqueId, leadCode: this.state.LEADCODE, iscoapplicant: this.state.iscoapplicant, isguarantor: this.state.isguarantor })
                                                }
                                            }
                                        });
                                    }
                                    else {
                                        this.props.consentPendingAPI({
                                            data: {
                                                leadCode: this.state.LEADCODE,
                                                consentType: this.state.selectedSourceType
                                            },

                                            callback: (response) => {
                                                this.state.selectedSourceType === 'OTP' ?
                                                    this.props.navigation.navigate("OTPVerification", { id: this.state.id, source: response.data.source, request_id: response.data.requestId || '',  title: this.state.title, ismainapplicant: this.state.ismainapplicant, leadName: this.state.CUSTOMER_NAME, emailAddress: this.state.EMAIL_ADDRESS, mobileNumber: this.state.MOBILE_NUMBER, coapplicantUniqueId: this.state.coapplicantUniqueId, leadCode: this.state.LEADCODE, iscoapplicant: this.state.iscoapplicant, isguarantor: this.state.isguarantor, applicantUniqueId: this.state.applicantUniqueId })
                                                    :
                                                    this.props.navigation.navigate("Verification", { id: this.state.id, title: this.state.title, ismainapplicant: this.state.ismainapplicant, leadName: this.state.CUSTOMER_NAME, emailAddress: this.state.EMAIL_ADDRESS, mobileNumber: this.state.MOBILE_NUMBER, coapplicantUniqueId: this.state.coapplicantUniqueId, leadCode: this.state.LEADCODE, iscoapplicant: this.state.iscoapplicant, isguarantor: this.state.isguarantor, applicantUniqueId: this.state.applicantUniqueId })
                                            },
                                        });
                                    }
                                }} 
                                />
                        </View>
                    </View>
                </ScrollView>
            </WaveBackground>
        )
    }
}

ConsentPending.propTypes = {
    userDataSelector: PropTypes.object,
    getLeadDetailsAPI: PropTypes.func,
};

export default compose(
    container,
    withProps((getLeadDetailsAPI) => { getLeadDetailsAPI }),
)(ConsentPending);