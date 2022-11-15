import React, { Component } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import PropTypes from 'prop-types';
import { compose, withProps } from 'recompose';
import { Icon } from 'react-native-elements';
import DocumentPicker from 'react-native-document-picker';
import container from '../../container/ITRVerification/index';
import { Header } from "../../components/Header/Header";
import { Button } from "../../components/Button/Button";
import { WaveBackground } from "../../components/WaveBackground/WaveBackground";
import { ITR_VERIFICATION_CONST } from "../../constants/screenConst";
import { ITRVerificationStyles } from "./ITRVerificationStyles";
import { DottedProgressBar } from "../../components/DottedProgressBar/DottedProgressBar";
import { RadioButton } from "../../components/RadioButton/RadioButton";
import { UPLOADIMAGEPDF } from "../../constants/imgConsts";
import { bytesToMegaBytes } from "../../../utils";
import * as colors from "../../constants/colors";
import { handleError, handleWarning } from '../../../utils'
class ITRVerification extends Component {

    constructor(props) {
        super(props);
        this.state = {
            radioButtonType: [{
                title: ITR_VERIFICATION_CONST.LABEL_VERIFY_VIA_LINK,
                isSelected: false,
            },
            {
                title: ITR_VERIFICATION_CONST.LABEL_UPLOAD_ITR,
                isSelected: false,
            }],
            verificationMode: "Via Link to Customer",
            imageData: {},
            isUploaded: false,
            ismainapplicant: true,
            saveDisable: false,
            isguarantor: false,
            mode: "upload",
            getDDEComAPI: {},
            uploadITR: {},
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
            path: "",
            uploadITRPath: "",
            mobileNumber:
                (this.props.navigation &&
                    this.props.navigation.state &&
                    this.props.navigation.state.params &&
                    this.props.navigation.state.params.mobileNumber) ||
                '',
            ismainapplicant: this.props.navigation.state.params.ismainapplicant || false,
            isViewOnly: false,
            ddeflag: true,
            creditButtonFlag:false,

        }
    }

    loanSummary() {
        const dataToAPI = {
            applicant_uniqueid: this.state.applicantUniqueId,
            lead_code: this.state.leadCode,
            roleId: this.props.userDataSelector.userData.data.roleId
        };
        this.props.getLoanSummary({
            dataToAPI,
            callback: (response) => {
                this.setState({
                    creditButtonFlag: response?.mainapplicant?.creditButtonFlag,
                    isViewOnly: 
                    response?.mainapplicant?.ddeFreezeFlag ? true : response?.modelAccess[0]?.read ? true :
                     false
                })
            }
        })
    }

    componentDidMount() {
        this.loanSummary();
        const dataToAPI = {
            applicantUniqueId: !(this.state.iscoapplicant || this.state.isguarantor) ? this.state.applicantUniqueId : this.state.coapplicantUniqueId,
            // "ismainapplicant": this.state.ismainapplicant
        };
        this.props.getDDECommonAPI({
            dataToAPI,
            callback: (response) => {
                response
                this.setState({
                    getDDEComAPI: response.data
                })
                if (this.props.userDDEDataSelector && this.props.userDDEDataSelector.itr) {
                    const itrData = this.props.userDDEDataSelector.itr;
                    var filename = itrData.pdfPath !== undefined ? itrData.pdfPath.replace(/^.*[\\\/]/, '') : null
                    this.setState({
                        isUploaded: !itrData.mode == "link" ? true : false,
                        path: itrData.mode === "link" ? "" : itrData.pdfPath,
                        imageData: itrData.mode == "link" ? null : { name: filename },
                        mode: itrData.mode == '' ? 'upload' : itrData.mode,
                        verificationMode: itrData.mode === "link" ? "Via Link to Customer" : "Upload ITR Document (Pdf only)"
                    }, () => {
                        itrData.pdfPath !== undefined ? this.setState({ saveDisable: true, isUploaded: true }) : null

                    });
                }
            }
        });
    }

    selectPDF = async () => {
        try {
            const results = await DocumentPicker.pick({
                copyTo: "documentDirectory",
                type: DocumentPicker.types.pdf,
            });

            if (bytesToMegaBytes(results.size) > 5) {
                handleError("File size should be maximum 5 MB.");
            } else {
                this.setState({ imageData: results, isUploaded: true });
                return results.fileCopyUri;
            }
        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
            } else {
                throw err;
            }
        }
    }

    selectRadioButton(value, index) {
        this.setState({
            verificationMode: value.title,
            mode: value.title == 'Via Link to Customer' ? 'link' : 'upload',
            isUploaded: value.title == 'Via Link to Customer' ? true : false
        });
    }

    render() {
        const { progressBarContainer, itrVerificationTextStyle, verificationModeTextStyle,
            contentContainer, radioButtonContainer, mainContainer, radioButtonStyle,
            cancelButtonStyle, cancelButtonTitleStyle, buttonContainer, imageContainer,
            imageContentContainer, uploadITRTextStyle, placeHolderImageStyle, flexRowStyle, imageNameTextStyle, closeIconContainer } = ITRVerificationStyles;
        return (
            <WaveBackground>
                <ScrollView>
                    <Header
                        label={ITR_VERIFICATION_CONST.HEADER}
                        showLeftIcon={false}
                        onPress={() => {

                        }
                        } />
                    <View style={progressBarContainer}>
                        <View >
                            <DottedProgressBar
                                totalSteps={[1, 2]}
                                currentIndex={2} />
                        </View>
                    </View>
                    <View style={mainContainer}>
                        <View style={contentContainer}>
                            <Text style={itrVerificationTextStyle}>{ITR_VERIFICATION_CONST.ITR_VERIFICATION}</Text>
                            <Text style={verificationModeTextStyle}>{ITR_VERIFICATION_CONST.LABEL_VERIFICATION_MOD}</Text>
                            <View style={radioButtonContainer}>
                                {this.state.radioButtonType.map((value, index) =>
                                    <View style={radioButtonStyle}>
                                        <RadioButton
                                            title={value.title}
                                            isSelected={this.state.verificationMode.toLowerCase() === value.title.toLowerCase() ? true : false}
                                            onPress={() => {
                                                if (!this.state.isViewOnly) {
                                                    return this.selectRadioButton(value, index)
                                                }
                                            }} />
                                    </View>)}
                            </View>
                            {this.state.verificationMode.toLowerCase() === "Via Link to Customer".toLowerCase() && <View style={[imageContentContainer, { width: "50%" }]}>

                                <Button
                                    isDisabled={this.state.isViewOnly}
                                    title={ITR_VERIFICATION_CONST.BUTTON_EMAIL}
                                    onPress={() => {

                                        if (this.state.verificationMode == 'Via Link to Customer') {
                                            this.props.linkToCustomerAPI({
                                                data: {
                                                    leadCode: this.state.leadCode,
                                                    applicantUniqueId: !this.state.iscoapplicant || !this.state.isguarantor ? this.state.applicantUniqueId : this.state.coapplicantUniqueId,
                                                    mode: this.state.mode,
                                                    isguarantor: this.state.isguarantor,
                                                    ismainapplicant: this.state.ismainapplicant,
                                                },
                                                callback: (response) => {
                                                    this.setState({ imageData: {}, isUploaded: false, filePath: '', uploadITRPath: "" })
                                                },
                                            })
                                        }
                                    }}
                                    customContainerStyle={cancelButtonStyle}
                                    cutomTitleStyle={cancelButtonTitleStyle} />
                            </View>}
                            {this.state.verificationMode.toLowerCase() === "Upload ITR Document (Pdf only)".toLowerCase() && <View>

                                <View style={imageContentContainer}>
                                    <TouchableOpacity style={this.state.isUploaded ? [imageContainer, { backgroundColor: colors.COLOR_LIGHT_GREY }] : imageContainer}
                                        onPress={async () => {
                                            if (!this.state.isViewOnly) {
                                                if (!this.state.isUploaded) {
                                                    let path = await this.selectPDF();
                                                    this.setState({
                                                        path: path
                                                    }, () => {
                                                        this.state.path !== "" ? this.setState({ saveDisable: false }) : null
                                                        const dataToAPI = {
                                                            applicantUniqueId: !this.state.iscoapplicant || !this.state.isguarantor ? this.state.applicantUniqueId : this.state.coapplicantUniqueId,
                                                            // "ismainapplicant": this.state.ismainapplicant
                                                        };

                                                    })
                                                }
                                            }
                                        }}>
                                        <Icon
                                            size={30}
                                            name="image"
                                            type="entypo"
                                            color={'#ffffff'}
                                        />

                                    </TouchableOpacity>
                                    <Text style={uploadITRTextStyle}>{ITR_VERIFICATION_CONST.UPLOAD_ITR_TEXT}</Text>
                                </View>

                                {this.state.imageData && this.state.imageData.name && <View style={flexRowStyle}>
                                    <Image resizeMode="contain" style={placeHolderImageStyle} source={UPLOADIMAGEPDF} />
                                    <Text style={imageNameTextStyle}>{this.state.imageData.name}</Text>
                                    <TouchableOpacity style={closeIconContainer} onPress={() => {
                                        if (!this.state.isViewOnly) {
                                            this.props.deleteITRAPI({
                                                data: {
                                                    applicantUniqueId: !this.state.iscoapplicant || !this.state.isguarantor ? this.state.applicantUniqueId : this.state.coapplicantUniqueId,
                                                    filePath: this.state.path
                                                },
                                                callback: (response) => {
                                                    this.setState({ imageData: {}, isUploaded: false, filePath: '', uploadITRPath: "" })
                                                },
                                            });
                                        }
                                        else {
                                            handleWarning("User access denied")
                                        }
                                    }}>
                                        <Icon
                                            name="closecircle"
                                            type="antdesign"
                                            color={'#5f5c60'}
                                        />
                                    </TouchableOpacity>
                                </View>}
                            </View>}

                            <View style={buttonContainer}>
                                <Button
                                    isDisabled={this.state.isViewOnly}
                                    title={ITR_VERIFICATION_CONST.BUTTON_SAVE}

                                    onPress={() => {
                                        if (!this.state.saveDisable && this?.state?.path !== '' &&  this?.state?.path !== undefined && this.state.verificationMode.toLowerCase() === "Upload ITR Document (Pdf only)".toLowerCase()) {
                                            this.props.uploadITRDocumentAPI({
                                                data: {
                                                    leadCode: this.state.leadCode,
                                                    file: this.state.path,
                                                    applicantUniqueId: !this.state.iscoapplicant || !this.state.isguarantor ? this.state.applicantUniqueId : this.state.coapplicantUniqueId,
                                                    mode: this.state.mode,
                                                    isguarantor: this.state.isguarantor,
                                                    ismainapplicant: this.state.ismainapplicant,
                                                    filename: this?.state?.path?.replace(/^.*[\\\/]/, '')
                                                },
                                                callback: (response) => {

                                                    this.setState({
                                                        saveDisable: true,

                                                    }, () => {
                                                        const dataToAPI = {
                                                            applicantUniqueId: !this.state.iscoapplicant || !this.state.isguarantor ? this.state.applicantUniqueId : this.state.coapplicantUniqueId,
                                                            // "ismainapplicant": this.state.ismainapplicant
                                                        };
                                                        this.props.getDDECommonAPI({
                                                            dataToAPI,
                                                            callback: (response) => {
                                                                response
                                                                this.setState({
                                                                    getDDEComAPI: response.data
                                                                })
                                                                if (this.props.userDDEDataSelector && this.props.userDDEDataSelector.itr) {
                                                                    const itrData = this.props.userDDEDataSelector.itr;
                                                                    var filename = itrData.pdfPath !== undefined ? itrData.pdfPath.replace(/^.*[\\\/]/, '') : null
                                                                    this.setState({
                                                                        isUploaded: !itrData.mode == "link" ? true : false,
                                                                        path: itrData.mode === "link" ? "" : itrData.pdfPath,
                                                                        imageData: itrData.mode == "link" ? '' : { name: filename },
                                                                        mode: itrData.mode == '' ? 'upload' : itrData.mode,
                                                                        verificationMode: itrData.mode === "link" ? "Via Link to Customer" : "Upload ITR Document (Pdf only)"
                                                                    }, () => {
                                                                        this.state.path !== "" ? this.setState({ saveDisable: true }) : null
                                                                    });
                                                                }
                                                            }
                                                        });
                                                    })
                                                },
                                            })
                                        }
                                    }}

                                    customContainerStyle={cancelButtonStyle}
                                    cutomTitleStyle={cancelButtonTitleStyle} />

                                {!this.state.isViewOnly ?
                                    <Button
                                        title={ITR_VERIFICATION_CONST.BUTTON_NEXT}
                                        onPress={() => {
                                            this.props.navigation.replace('QdeSuccess', {
                                                leadName: this.state.leadName,
                                                applicantUniqueId: this.state.iscoapplicant || this.state.isguarantor ? this.state.coapplicantUniqueId : this.state.applicantUniqueId,
                                                leadCode: this.state.leadCodeFromProps,
                                                iscoapplicant: this.state.iscoapplicant,
                                                isguarantor: this.state.isguarantor,
                                                coapplicantUniqueId: this.state.coapplicantUniqueId,
                                                redirection: 'dde',
                                                offerType: 'tentative',
                                                ddeflag: true,
                                                creditButtonFlag: this.state.creditButtonFlag

                                            });

                                        }}
                                    />
                                    : 
                                    
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

                                        });
                                    }}
                                />
                                }
                            </View>
                            {this.state.isViewOnly ?
                                null :
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

                                        });
                                    }}
                                />
                            </View>
                                }
                        </View>
                    </View>
                </ScrollView>
            </WaveBackground>
        );
    }
}
ITRVerification.propTypes = {
    userDDEDataSelector: PropTypes.object,
};

export default compose(
    container,
    withProps(() => { }),
)(ITRVerification);