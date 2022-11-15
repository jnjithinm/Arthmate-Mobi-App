import React, { Component } from 'react';
import { View, Text, ScrollView, Image } from 'react-native';
import PropTypes from 'prop-types';
import { compose, withProps } from 'recompose';
import container from '../../container/ConsentPending/index';
import container1 from '../../container/LoanSummary/index';

import { Header } from "../../components/Header/Header";
import { WaveBackground } from "../../components/WaveBackground/WaveBackground";
import { Button } from "../../components/Button/Button";
import { VERIFICATION_CONST } from "../../constants/screenConst";
import { VerificationStyles } from "./VerificationStyles";
import { handleWarning } from '../../../utils';
import { VERIFIED_TICK } from "../../constants/imgConsts";


class Verification extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.navigation.state.params.id || "",
            title: this.props.navigation.state.params.title || "",
            ismainapplicant: this.props.navigation.state.params.ismainapplicant || "",
            leadName: this.props.navigation.state.params.leadName || "",
            mobileNumber: this.props.navigation.state.params.mobileNumber || "",
            emailAddress: this.props.navigation.state.params.emailAddress || "",
            iscoapplicant: this.props.navigation.state.params.iscoapplicant || false,
            isguarantor: this.props.navigation.state.params.isguarantor || false,
            coapplicantUniqueId: this.props.navigation.state.params.coapplicantUniqueId || "",
            leadCode: this.props.navigation.state.params.leadCode || "",
            applicantUniqueId:
                (this.props.navigation &&
                    this.props.navigation.state &&
                    this.props.navigation.state.params &&
                    this.props.navigation.state.params.applicantUniqueId) ||
                (this.props.newLeadDataSelector &&
                    this.props.newLeadDataSelector.newLead &&
                    this.props.newLeadDataSelector.newLead.applicantUniqueId) ||
                '',
        }
    }
    renderInputs() {
        const { textInputStyle, textInputStyleMargin, viewLine } = VerificationStyles;

        return (

            <View style={{ marginTop: 20, marginBottom: 20 }}>
                <View style={viewLine}></View>

                <Text style={textInputStyle}>
                    {VERIFICATION_CONST.CUSTOMER_NAME}
                </Text>
                <Text style={textInputStyleMargin}>
                    {this.state.leadName}
                </Text>

                <Text style={textInputStyle}>
                    {VERIFICATION_CONST.MOBILE_NUMBER}
                </Text>
                <Text style={textInputStyleMargin}>
                    {this.state.mobileNumber}
                </Text>

                <Text style={textInputStyle}>
                    {VERIFICATION_CONST.EMAIL}
                </Text>
                <Text style={textInputStyleMargin}>
                    {this.state.emailAddress}
                </Text>
            </View>
        )
    }

    render() {
        const {
            mainContainer, buttonContainer, textInputStyleConsent
        } = VerificationStyles;
        return (
            <WaveBackground>
                <ScrollView>
                    <Header
                        label={VERIFICATION_CONST.HEADER}
                        showLeftIcon={false}
                        onPress={() => {

                        }
                        } />
                    <View style={mainContainer}>
                        <Image
                            style={{ alignSelf: "center", width: 90, height: 90 }}
                            source={VERIFIED_TICK}
                        />
                        <Text style={textInputStyleConsent}>{VERIFICATION_CONST.TEXT_CONSENTREQUEST}</Text>
                        {this.renderInputs()}
                        <View style={buttonContainer}>
                            <View style={{ width: '40%' }}>
                                <Button
                                    onPress={() => {
                                        this.props.navigation.navigate('ConsentPending', {
                                            id: this.state.id,
                                            title: this.state.title,
                                            ismainapplicant: this.state.ismainapplicant,
                                            coapplicantUniqueId: this.state.coapplicantUniqueId,
                                            isguarantor: this.state.isguarantor,
                                            iscoapplicant: this.state.iscoapplicant,
                                            applicantUniqueId: this.state.applicantUniqueId,
                                        });
                                    }}

                                    title={VERIFICATION_CONST.BUTTON_TITLE_BACK}
                                />
                            </View>
                            <View style={{ width: '40%' }}>
                                <Button
                                    title={VERIFICATION_CONST.BUTTON_TITLE_VERIFY}
                                    onPress={() => {
                                        if (this.state.isguarantor || this.state.iscoapplicant) {

                                            const dataToAPI = {
                                                coapplicantUniqueId: this.state.coapplicantUniqueId,
                                                id: this.state.id
                                            };
                                            this.props.getCoAppGuarantor({
                                                dataToAPI,
                                                callback: (response) => {
                                                    response.consentStatus == 'Consent Approved' ?
                                                        this.props.navigation.replace("PANAndGSTVerification", { iscoapplicant: this.state.iscoapplicant, isguarantor: this.state.isguarantor, coapplicantUniqueId: this.state.coapplicantUniqueId, leadCode: this.state.leadCode, mobileNumber: this.state.mobileNumber })
                                                        :
                                                        handleWarning("Consent not verfied.")
                                                }
                                            });
                                        } else {
                                            this.props.getLeadDetailsAPI({
                                                data: {
                                                    id: this.state.id
                                                },
                                                callback: (response) => {
                                                    response.data.consentStatus == 'Consent Approved' ?
                                                        this.props.navigation.replace("PANAndGSTVerification", { iscoapplicant: this.state.iscoapplicant, isguarantor: this.state.isguarantor, applicantUniqueId: this.state.applicantUniqueId, leadCode: this.state.leadCode, mobileNumber: this.state.mobileNumber })
                                                        :
                                                        handleWarning("Consent not verified.")
                                                }

                                            })
                                        }
                                        // this.props.navigation.replace("PANAndGSTVerification", { iscoapplicant: this.state.iscoapplicant, isguarantor: this.state.isguarantor, coapplicantUniqueId: this.state.coapplicantUniqueId, leadCode: this.state.leadCode, mobileNumber: this.state.mobileNumber });
                                    }} />
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </WaveBackground>
        )
    }
}

Verification.propTypes = {
    userDataSelector: PropTypes.object,
    getLeadDetailsAPI: PropTypes.func,
    getCoAppGuarantor: PropTypes.func,

};

export default compose(
    container, container1,
    withProps(() => { }),
)(Verification);
