import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Linking, ScrollView, StatusBar, Text, View, TouchableOpacity, Image, TextInput, StyleSheet } from 'react-native';
import { compose, withProps } from 'recompose';
import { Button } from '../../components/Button/Button';
import { BLUE_PLUS_ICON, MINUS_ICON, TOOL_TIP, DOWN_ARROW, UP_ARROW, UPLOADIMAGEPDF, DELETEBUTTON, PLACEHOLDER_IMAGE } from '../../constants/imgConsts';
import { Header } from '../../components/Header/Header';
import { TextImage } from '../../components/TextImage/TextImage';
import { WaveBackground } from '../../components/WaveBackground/WaveBackground';
import * as colors from '../../constants/colors';
import { RadioButton } from '../../components/RadioButtonSchemes/RadioButton';
import { REPAYMENT_DETAILS_CONST } from '../../constants/screenConst';
import container from '../../container/RepaymentDetails/index';
import { RepaymentDetailsStyles } from './RepaymentDetailsStyles';
import { FloatingLabelInput } from 'react-native-floating-label-input';
import DropDownPicker from 'react-native-dropdown-picker';
import { selectFilePDF } from '../../../uploadImageUtils';
import { handleError, handleWarning } from '../../../utils'
import { DatePickerDialog } from 'react-native-datepicker-dialog';
import { Icon } from 'react-native-elements';
import moment from 'moment';
import { AdditionalDetailsStyles } from '../AdditionalDetails/AdditionalDetailsStyles';
import { AADHAR_REGEX, VPA_REGEX } from '../../../validations ';
import { ADDITIONAL_DETAILS_CONST } from '../../constants/screenConst';


const countPDC = /^[0-9][0-9]*$/;

class RepaymentDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modeType: [
                {
                    title: 'NACH',
                    isSelected: false,
                },
                // {
                //     title: 'UPI 2.0',
                //     isSelected: false,
                // },
                // {
                //     title: 'PDC',
                //     isSelected: false,
                // },
                // {
                //     title: 'Cash',
                //     isSelected: false,
                // },
                // {
                //     title: 'Others',
                //     isSelected: false,
                // },
            ],
            adharID: '',
            vpa: '',
            vpaValid: true,
            vpaVisible: false,
            txnStatus: true,
            adharIdValid: true,
            selectedRepaymentMode: 'NACH',
            debitStartDate: {
                value: '',
                isValid: true,
            },
            nachTYPE: [
                {
                    title: 'enach',
                    isSelected: true,
                },
                // {
                //     title: 'Physical NACH',
                //     isSelected: false,
                // },
            ],
            selectednachTYPE: 'enach',
            mode: '',
            paymentTYPE: [
                {
                    title: 'Aadhaar',
                    mode: 'A',
                    isSelected: false,
                },
                {
                    title: 'Debit Card',
                    mode: 'D',
                    isSelected: false,
                },
                {
                    title: 'Internet Banking',
                    mode: 'N',
                    isSelected: false,

                },
                // {
                //     title: 'UPI 2.0',
                //     mode: 'V',
                //     isSelected: false,
                // }
            ],
            selectedPaymentType: '',
            enachData: '',
            comment: {
                value: '',
                isValid: true,
            },
            commentCash: {
                value: '',
                isValid: true,
            },
            commentOther: {
                value: '',
                isValid: true,
            },
            countPDC: {
                value: '',
                isValid: true,
            },
            umrn: {
                value: '',
                isValid: true,
            },
            nachForm: {
                docName: null,
            },
            nachStatus: { isValid: true },
            dropDownNachStatus: [],

            chequeNum: {
                value: '',
                isValid: true,
            },
            inputData: [],
            applicantUniqueId: (this.props.navigation && this.props.navigation.state && this.props.navigation.state.params && this.props.navigation.state.params.applicantUniqueId) || "",
            employeeId: (this.props.userDataSelector?.userData?.data?.employeeId) || "",
            repaymentModeFetch: "",
            type: "repayment",
            leadCode: (this.props.navigation && this.props.navigation.state && this.props.navigation.state.params && this.props.navigation.state.params.leadCode) || "",
            ismainapplicant: (this.props.navigation && this.props.navigation.state && this.props.navigation.state.params && this.props.navigation.state.params.ismainapplicant) || "",
            disbursementDisable: true,
            isViewOnly: false,
            isDisable: false
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
                    isViewOnly:
                        response?.mainapplicant?.preSalesFreeze ? true : response?.modelAccess[0]?.read ? true :
                        false
                })
            }
        })
    }

    componentDidMount() {
        this.loanSummary();

        this.props.getRepaymentDETAILS({
            data: {
                applicantUniqueId: this.state.applicantUniqueId
            },
            callback: (response) => {
                this.setState({
                    repaymentModeFetch: response.data.repaymentMode || "",
                })

                if (response.data.repaymentMode === "enach") {
                    this.setState({
                        selectedRepaymentMode: 'NACH',
                        selectedPaymentType: response?.data?.authenticationMode == "A" ? 'Aadhaar' :
                            response?.data?.authenticationMode == "D" ? 'Debit Card' :
                                response?.data?.authenticationMode == "V" ? 'UPI 2.0' :
                                    response?.data?.authenticationMode == "N" ? 'Internet Banking' : '',
                        mode: response?.data?.authenticationMode,
                        adharID: response?.data?.aadharNo?.replace(/\d{4}(?=.)/g, '$& ') || "",
                        vpa: response?.data?.vpa,
                        selectednachTYPE: response.data.paymentType == 'eNACH' ? "enach" : response.data.paymentType || "",
                        debitStartDate: {
                            value: response.data.debitStartDate,
                            isValid: true,
                        },
                    }, () => {
                        this.props.generateEnachToken({
                            data: {
                                applicantUniqueId: this.state.applicantUniqueId
                            },
                            callback: (response) => {
                                this.setState({
                                    vpaVisible: response.data.status.toLowerCase() == 'failure' ? true : false,
                                    enachData: response.data,
                                    disbursementDisable:
                                        // response.data.txnStatus == "success" ? 
                                        false
                                    // : true

                                })
                            },
                        })
                    })
                }

                if (response.data.repaymentMode === "other") {
                    this.setState({
                        selectedRepaymentMode: 'Others',
                        disbursementDisable: response.data.comments != "" ? false : true,
                        commentOther: {
                            value: response.data.comments || "",
                            isValid: true
                        }
                    })
                }

                if (response.data.repaymentMode === "cash") {
                    this.setState({
                        selectedRepaymentMode: 'Cash',
                        disbursementDisable: response.data.comments != "" ? false : true,
                        commentCash: {
                            value: response.data.comments || "",
                            isValid: true
                        }
                    })

                }

                if (response.data.repaymentMode === "pdc") {
                    const numberOfPdc = response.data.pdc.length;
                    const tempArray = (response.data.pdc || []).map(data => {
                        return {
                            text: data,
                            valid: true
                        }
                    })
                    this.setState({
                        selectedRepaymentMode: 'PDC',
                        disbursementDisable: false,
                        countPDC: {
                            value: numberOfPdc.toString(),
                            isValid: true
                        },
                        inputData: tempArray
                    })
                }
            },
        })
        this.props.getDisbursementRepaymentDETAILS({
            data: {
                applicantUniqueId: this.state.applicantUniqueId,
                type: this.state.type
            },
            callback: (response) => {
                if (response?.data?.disbursementComments) {
                    this.setState({
                        disbursementDisable: false
                    })
                }
                this.setState({
                    comment: {
                        value: response.data.disbursementComments || "",
                        isValid: true
                    }
                })
            }
        })
    }

    iscomment(text) {
        let valid = false;
        const commentRegex = /.*/;
        if (text != "" && text != null && commentRegex.test(text)) {
            valid = true;
        }
        this.setState({
            comment: {
                ...this.state.comment,
                isValid: valid,
            }
        });
    }

    iscommentCash(text) {
        let valid = false;
        const commentRegex = /.*/;
        if (text != "" && text != null && commentRegex.test(text)) {
            valid = true;
        }
        this.setState({
            commentCash: {
                ...this.state.commentCash,
                isValid: valid,
            }
        });
    }

    iscommentOther(text) {
        let valid = false;
        const commentRegex = /.*/;
        if (text != "" && text != null && commentRegex.test(text)) {
            valid = true;
        }
        this.setState({
            commentOther: {
                ...this.state.commentOther,
                isValid: valid,
            }
        });
    }

    isCount(text) {
        let valid = false;
        const countPDC = /^(?:[1-9]|[1-4][0-9]|50)$/;
        if (text != '' && text != null && countPDC.test(text)) {
            valid = true;
        }
        this.setState({
            countPDC: {
                ...this.state.countPDC,
                isValid: valid,
            },
        }, () => {
            if (this.state.inputData.length !== parseInt(text)) {
                let tempArray = [];
                if (parseInt(text) > 0 && this.state.countPDC.isValid) {

                    if (this.state.inputData.length === 0) {
                        tempArray = new Array(parseInt(this.state.countPDC.value)).fill({
                            text: '',
                            valid: true
                        })
                    }
                    else if (this.state.inputData.length < parseInt(text)) {
                        let arr = new Array(parseInt(this.state.countPDC.value)).fill({
                            text: '',
                            valid: true
                        })
                        tempArray = [...this.state.inputData, ...arr]
                    }
                    else if (this.state.inputData.length > parseInt(text)) {
                        tempArray = this.state.inputData.slice(0, parseInt(text))
                    }
                }

                this.setState({
                    inputData: [...tempArray]
                });
            }
        });

        return valid;
    }

    validateInputData() {
        let newArray = this.state.inputData.map(data => {
            const valid = this.ischequeNum(data.text);
            return {
                ...data,
                valid
            }
        })
        this.setState({
            inputData: [...newArray]
        });

        return newArray.every(data => data.valid);
    }

    ischequeNum(text) {
        let valid = false;
        if (text != '' && text != null && countPDC.test(text)) {
            valid = true;
        }
        return valid
    }

    isumrn(text) {
        let valid = false;
        const countPDC = /^[1-9][0-9]*$/;
        if (text != '' && text != null && countPDC.test(text)) {
            valid = true;
        }

        this.setState({
            umrn: {
                ...this.state.umrn,
                isValid: valid,
            },
        });
    }

    isnachStatus() {
        if (this.state.nachStatus.value == null) {
            this.setState({ nachStatus: { isValid: false } });
        }
    }

    selectRadioButton(value, index) {
        this.setState({
            selectedRepaymentMode: value.title,
            disbursementDisable: true,
            commentOther: {
                value: "",
                isValid: true
            },
            commentCash: {
                value: "",
                isValid: true
            },
            countPDC: {
                value: '',
                isValid: true,
            },
            selectednachTYPE: 'enach',
            inputData: [],
            comment: {
                value: '',
                isValid: true,
            },
        });
    }

    renderRepaymentRadio = () => {
        return this.state.modeType.map((value, index) => (
            <View key={index}>
                <RadioButton
                    title={value.title}
                    isSelected={
                        this.state.selectedRepaymentMode.toLowerCase() ===
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
        ));
    };

    selectRadioButton1(value, index) {
        this.setState({
            selectednachTYPE: value.title,
            debitStartDate: {
                value: '',
                isValid: true,
            }
        });
    }
    selectRadioButton2(value, index) {
        this.setState({
            selectedPaymentType: value.title,
            aadharNo: '',
            txnStatus: true,
            mode: value.mode,
            debitStartDate: {
                value: '',
                isValid: true,
            }
        });
    }

    renderNACHType = () => {
        return this.state.nachTYPE.map((value, index) => (
            <View key={index}>
                <RadioButton
                    title={value.title}
                    isSelected={
                        this?.state?.selectednachTYPE?.toLowerCase() ===
                            value.title.toLowerCase()
                            ? true
                            : false
                    }
                    onPress={() => {
                        if (!this.state.isViewOnly) {
                            return this.selectRadioButton1(value, index);
                        }
                    }}
                />
            </View>
        ));
    };

    renderPaymentType = () => {
        // let paymentTYPE = this.state.vpaVisible ? this.state.paymentTYPE : this.state.paymentTYPE.slice(0, 3)
        return this.state.paymentTYPE.map((value, index) => (
            <View key={index}>
                <RadioButton
                    title={value.title}
                    isSelected={
                        this?.state?.selectedPaymentType?.toLowerCase() ===
                            value.title.toLowerCase()
                            ? true
                            : false
                    }
                    onPress={() => {
                        if (!this.state.isViewOnly) {
                            return this.selectRadioButton2(value, index);
                        }
                    }}
                />

            </View>
        ));
    };

    renderNACHFrom() {
        const {
            buttonNavigation,
            radioLabel,
            inputStyle1,
            separatorStyle,
            floatInputStyle
        } = RepaymentDetailsStyles;



        return (
            <View style={{ marginBottom: 20, marginTop: 20 }}>
                <Text style={[radioLabel, { textAlign: 'center' }]}>NACH Form</Text>
                {/* <Text style={radioLabel}>NACH Type</Text>
                {this.renderNACHType()} */}
                {this.state.selectednachTYPE === "enach" &&
                    <>
                        <Text style={[radioLabel, { marginTop: 10 }]}>NACH Mode</Text>
                        {this.renderPaymentType()}
                    </>
                }

                {this.state.selectednachTYPE === "Physical NACH" && this.renderPhysicalNACH()}
                {this.state.selectedPaymentType != "" && this.rendereNACH()}



                <View style={[buttonNavigation, { justifyContent: 'center', alignItems: 'center', marginBottom: 10 }]}>
                    <View style={{ width: "50%", }}>
                        <Button
                            title={"Submit to eNACH"}
                            isDisabled={
                                this.state.mode == 'A' ?
                                    (this?.state?.debitStartDate?.value == '') || this.state.adharID == "" || !this.state.adharIdValid
                                    :
                                    this.state.mode == 'V' ?
                                        (this?.state?.debitStartDate?.value == '') || this.state.vpa == "" || !this.state.vpaValid
                                        :
                                        this?.state?.debitStartDate?.value == ''

                            }
                            onPress={() => {
                                if (!this.state.isViewOnly && this?.state?.debitStartDate?.value >= moment(new Date()).format('DD-MM-YYYY') ) {
                                    this.props.getEnachData({
                                        data: {
                                            applicantUniqueId: this.state.applicantUniqueId
                                        },
                                        callback: (response) => {
                                            this.props.saveRepaymentDETAILS({
                                                data: {
                                                    repaymentMode: "enach",
                                                    debitStartDate: this?.state?.debitStartDate?.value,
                                                    paymentType: this.state.selectednachTYPE,
                                                    applicantUniqueId: this.state.applicantUniqueId,
                                                    authenticationMode: this?.state?.mode,
                                                    aadharNo: this.state.adharID.toString()?.replace(/ /g, ""),
                                                    vpa: this.state.vpa || ''
                                                },
                                                callback: (sveResponse) => {

                                                    this.state.mode == 'V' ?
                                                        this.props.validateVpa({
                                                            data: {
                                                                applicantUniqueId: this.state.applicantUniqueId,
                                                                vpa: this.state.vpa,
                                                                service: 'salesApp'
                                                            },
                                                            callback: (vpaResponse) => {
                                                                this.props.validateVpa({
                                                                    data: {

                                                                        emi: response?.data?.emi?.toFixed(2) || '',
                                                                        applicantUniqueId: response?.data?.applicantUniqueId || '',
                                                                        debitStartDate: this?.state?.debitStartDate?.value || '',
                                                                        payerName: vpaResponse?.data?.payerName,
                                                                        payerVpa: vpaResponse?.data?.payerVpa,
                                                                        service: 'salesApp',
                                                                        type: 'vpaTesting',
                                                                        authenticationMode: this?.state?.mode,

                                                                    },
                                                                    callback: (response) => {

                                                                        // var temp = response?.data?.enachResponseUrl?.split("to ")?.pop()
                                                                        // // Linking.openURL(temp)
                                                                        // this.props.navigation.navigate("RepaymentProcess", { url: temp })

                                                                    },
                                                                })
                                                            }
                                                        })
                                                        :

                                                        this.props.submitEnach({
                                                            data: {

                                                                emi: response?.data?.emi?.toFixed(2) || '',
                                                                tenure: response?.data?.tenure || '',
                                                                emailId: response?.data?.emailId || '',
                                                                mobileNumber: response?.data?.mobileNumber || '',
                                                                applicantUniqueId: response?.data?.applicantUniqueId || '',
                                                                debitStartDate: this?.state?.debitStartDate?.value || '',
                                                                accountHolderName: response?.data?.accountHolderName || '',
                                                                bankCode: response?.data?.bankCode || '',
                                                                ifsc: response?.data?.ifsc || '',
                                                                accountNumber: response?.data?.accountNumber || '',
                                                                service: 'salesApp',
                                                                authenticationMode: this?.state?.mode,
                                                                aadharNo: this?.state?.adharID?.toString()?.replace(/ /g, "") || '',

                                                            },
                                                            callback: (response) => {

                                                                var temp = response?.data?.enachResponseUrl?.split("to ")?.pop()
                                                                // Linking.openURL(temp)
                                                                this.props.navigation.navigate("RepaymentProcess", { url: temp })

                                                            },
                                                        })

                                                }
                                            })

                                        },
                                    })
                                }
                                else{
                                    handleError("Please select today's date")
                                }

                            }}
                        />
                    </View>
                </View>

                <View style={[buttonNavigation, { marginBottom: 15 }]}>
                    <View style={{ flex: 1, marginRight: 10 }}>
                        <Button
                            title={REPAYMENT_DETAILS_CONST.BUTTON_TITLE_LOAN_SUMMARY}
                            onPress={() => {
                                this.props.navigation.navigate('LoanSummary', { applicantUniqueId: this.state.applicantUniqueId, leadCode: this.state.leadCode, ismainapplicant: this.state.ismainapplicant })
                            }}
                        />
                    </View>
                    <View style={{ flex: 1 }}>
                        <Button
                            title={"Get eNACH Response"}
                            isDisabled={this?.state?.debitStartDate?.value == ''}
                            onPress={() => {
                                if (!this.state.isViewOnly && this?.state?.debitStartDate?.value >= moment(new Date()).format('DD-MM-YYYY') ) {
                                    this.props.saveRepaymentDETAILS({
                                        data: {
                                            repaymentMode: "enach",
                                            debitStartDate: this?.state?.debitStartDate?.value,
                                            paymentType: this.state.selectednachTYPE,
                                            applicantUniqueId: this.state.applicantUniqueId,
                                            authenticationMode: this?.state?.mode,
                                            aadharNo: this.state.adharID.toString()?.replace(/ /g, ""),
                                            vpa: this.state.vpa || ''
                                        },
                                        callback: (response) => {

                                            this.props.generateEnachToken({
                                                data: {
                                                    applicantUniqueId: this.state.applicantUniqueId
                                                },
                                                callback: (response1) => {
                                                    this.setState({
                                                        vpaVisible: response1.data.status.toLowerCase() == 'failure' ? true : false,
                                                        enachData: response1.data,
                                                        txnStatus: false,
                                                        disbursementDisable: false
                                                    })
                                                },
                                            })
                                        },
                                    })
                                }
                                else{
                                    handleError("Please select today's date")
                                }
                            }}
                        />

                    </View>
                </View>


                {
                    this.state.selectednachTYPE === "enach" && this.state.enachData != '' ?
                        <>
                            <FloatingLabelInput
                                inputStyles={floatInputStyle}
                                editable={false}
                                value={this.state.enachData.status || undefined}
                                label={"Transaction Status"}
                                containerStyles={inputStyle1}
                                customLabelStyles={{
                                    colorFocused: colors.COLOR_BLUE,
                                    colorBlurred: colors.COLOR_LIGHT_GREY,
                                    fontSizeFocused: 15,
                                    fontSizeBlurred: 15,
                                }}
                            />
                            <View style={separatorStyle} />
                            <FloatingLabelInput
                                editable={false}
                                inputStyles={floatInputStyle}
                                multiline
                                value={this.state.enachData.statusDesc || undefined}
                                label={"Transaction Message"}
                                containerStyles={inputStyle1}
                                customLabelStyles={{
                                    colorFocused: colors.COLOR_BLUE,
                                    colorBlurred: colors.COLOR_LIGHT_GREY,
                                    fontSizeFocused: 15,
                                    fontSizeBlurred: 15,
                                }}
                            />
                            <View style={separatorStyle} />
                            {/* <FloatingLabelInput
                                editable={false}
                                inputStyles={floatInputStyle}
                                value={this.state.enachData.txnErrMsg || undefined}
                                label={"Transaction Error Message"}
                                containerStyles={inputStyle1}
                                customLabelStyles={{
                                    colorFocused: colors.COLOR_BLUE,
                                    colorBlurred: colors.COLOR_LIGHT_GREY,
                                    fontSizeFocused: 15,
                                    fontSizeBlurred: 15,
                                }}
                            /> */}
                            {/* <View style={separatorStyle} /> */}
                            <FloatingLabelInput
                                inputStyles={floatInputStyle}
                                editable={false}
                                value={this.state.enachData.trxnNo || undefined}
                                label={"Client Transaction Reference"}
                                containerStyles={inputStyle1}
                                customLabelStyles={{
                                    colorFocused: colors.COLOR_BLUE,
                                    colorBlurred: colors.COLOR_LIGHT_GREY,
                                    fontSizeFocused: 15,
                                    fontSizeBlurred: 15,
                                }}
                            />
                            <View style={separatorStyle} />
                            <FloatingLabelInput
                                inputStyles={floatInputStyle}
                                editable={false}
                                value={this.state.enachData.enachAmount || undefined}
                                label={"Transaction Amount"}
                                containerStyles={inputStyle1}
                                customLabelStyles={{
                                    colorFocused: colors.COLOR_BLUE,
                                    colorBlurred: colors.COLOR_LIGHT_GREY,
                                    fontSizeFocused: 15,
                                    fontSizeBlurred: 15,
                                }}
                            />
                            <View style={separatorStyle} />
                            <FloatingLabelInput
                                inputStyles={floatInputStyle}
                                editable={false}
                                multiline
                                value={this.state.enachData.acceptanceRefNo || undefined}
                                label={"Acceptance Ref Number"}
                                containerStyles={inputStyle1}
                                customLabelStyles={{
                                    colorFocused: colors.COLOR_BLUE,
                                    colorBlurred: colors.COLOR_LIGHT_GREY,
                                    fontSizeFocused: 15,
                                    fontSizeBlurred: 15,
                                }}
                            />
                            <View style={separatorStyle} />
                            <FloatingLabelInput
                                inputStyles={floatInputStyle}
                                editable={false}
                                multiline
                                value={this.state.enachData.mandateRefNo || undefined}
                                label={"Mandate Ref Number"}
                                containerStyles={inputStyle1}
                                customLabelStyles={{
                                    colorFocused: colors.COLOR_BLUE,
                                    colorBlurred: colors.COLOR_LIGHT_GREY,
                                    fontSizeFocused: 15,
                                    fontSizeBlurred: 15,
                                }}
                            />
                            <View style={separatorStyle} />

                        </>
                        : null
                }

            </View>
        )
    }

    onDOBDatePicked = (date) => {
        this.setState({
            debitStartDate: { value: moment(date).format('DD-MM-YYYY'), isValid: true },
        });
    };

    rendereNACH() {
        const {
            radioLabel,
            floatInputStyle,
            separatorStyle,
            inputStyle1,
            textForInputStyle,
            labelDateOfIncStyle,
            errorLabel,
            calendarIconWithText,
            calendarIcon,
        } = RepaymentDetailsStyles;
        const {
            inputStyle,
            inputTextStyle,
            separatorInputStyle,
            textStyle,
            textStyle1,
            calendarTextStyle,
            marginTop20Style,
        } = AdditionalDetailsStyles;
        return (
            <>
                {
                    <View>
                        <TouchableOpacity
                            onPress={() => {

                                if (!this.state.isViewOnly) {
                                    this.refs.dobDialog.open({
                                        date: new Date(),
                                        minDate: new Date(), //To restirct future date
                                    });
                                }
                            }}
                            style={
                                { marginBottom: 0, marginTop: 0 }
                            }>
                            <View>
                                <Text style={labelDateOfIncStyle}>
                                    {"Debit Start Date*"}
                                </Text>
                                <View
                                    style={
                                        this?.state?.debitStartDate?.value === ''
                                            ? calendarIcon
                                            : calendarIconWithText
                                    }>
                                    <Icon
                                        size={30}
                                        name="calendar"
                                        type="antdesign"
                                        color={'#334e9e'}
                                    />
                                </View>
                            </View>
                            {this.state.debitStartDate.value !== '' && (
                                <Text style={textForInputStyle}>
                                    {this.state.debitStartDate.value}
                                </Text>
                            )}
                            <View style={separatorStyle} />
                            {this.state.invalidDate && (
                                <Text style={errorLabel}>{"Please enter Debit Start Date"}</Text>
                            )}
                        </TouchableOpacity>

                        <DatePickerDialog
                            ref="dobDialog"
                            date={this.state.debitStartDate.value}
                            onDatePicked={this.onDOBDatePicked.bind(this)}
                        />
                    </View>
                }
                {this.state.mode == 'A' && <View style={marginTop20Style}>
                    <FloatingLabelInput
                        label={'Aadhar ID*'}
                        containerStyles={inputStyle}
                        value={this.state.adharID}
                        mask="9999 9999 9999"
                        editable={!this.state.isViewOnly}
                        onChangeText={(value) => {
                            this.setState({
                                adharID: value,
                                adharIdValid: AADHAR_REGEX.test(value)
                            });
                        }}
                        keyboardType={'number-pad'}
                        maxLength={12}
                        customLabelStyles={{
                            colorFocused: colors.COLOR_LIGHT_NAVY_BLUE,
                            colorBlurred: colors.COLOR_LIGHT_GREY,
                            fontSizeFocused: 15,
                            fontSizeBlurred: 15,
                        }}
                        inputStyles={inputTextStyle}
                    />
                    <View style={separatorStyle} />
                    {!this.state.adharIdValid && (
                        <Text style={{ color: 'red', marginTop: 3, }}>{this.state.adharID == '' ? ADDITIONAL_DETAILS_CONST.REQUIRED_AADHAR_NUMBER : ADDITIONAL_DETAILS_CONST.INVALID_AADHAR_NUMBER}</Text>)}
                </View>}

                {this.state.mode == 'V' && <View style={marginTop20Style}>
                    <FloatingLabelInput
                        label={'Enter UPI Id*'}
                        containerStyles={inputStyle}
                        value={this.state.vpa}
                        editable={!this.state.isViewOnly}
                        onChangeText={(value) => {
                            this.setState({
                                vpa: value,
                                vpaValid: VPA_REGEX.test(value)
                            });
                        }}
                        // keyboardType={'number-pad'}
                        // maxLength={12}
                        customLabelStyles={{
                            colorFocused: colors.COLOR_LIGHT_NAVY_BLUE,
                            colorBlurred: colors.COLOR_LIGHT_GREY,
                            fontSizeFocused: 15,
                            fontSizeBlurred: 15,
                        }}
                        inputStyles={inputTextStyle}
                    />
                    <View style={separatorStyle} />
                    {!this.state.vpaValid && (
                        <Text style={{ color: 'red', marginTop: 3, }}>{this.state.vpa == '' ? ADDITIONAL_DETAILS_CONST.REQUIRED_VPA : ADDITIONAL_DETAILS_CONST.INVALID_VPA}</Text>)}
                </View>}
            </>
        )
    }

    renderPhysicalNACH() {
        const {
            radioLabel,
            floatInputStyle,
            separatorStyle,
            inputStyle1,
            errorLabel,
            textStyle,
            flexRowStyle,
            uploadContainer,
            imageContainer,
            plusImageStyle1,
            plusImageStyle,
            mainnachView,
            nachFileName
        } = RepaymentDetailsStyles;
        return (
            <View>
                <Text style={[radioLabel, { marginTop: 20 }]}>Physical NACH</Text>

                <View style={[flexRowStyle, uploadContainer]}>
                    <TouchableOpacity
                        style={imageContainer}
                        onPress={async () => {
                            let fileDetails = await selectFilePDF();

                            this.setState((state, props) => ({
                                nachForm: {
                                    ...state.nachForm,
                                    docName: fileDetails?.name,
                                },

                            }));
                        }}>
                        <Image source={PLACEHOLDER_IMAGE} style={plusImageStyle} />

                    </TouchableOpacity>
                    <Text style={[radioLabel, { marginTop: 10, marginLeft: 10 }]}>Upload NACH Form</Text>
                </View>

                {this.state.nachForm.docName !== null &&
                    this.state.nachForm.docName !== undefined && (
                        <View style={mainnachView}>
                            <Image source={UPLOADIMAGEPDF} style={plusImageStyle1} />
                            <Text style={nachFileName}>
                                {this.state.nachForm?.docName}
                            </Text>
                            <TouchableOpacity
                                onPress={() => {
                                    this.setState((state, props) => ({
                                        nachForm: {
                                            ...state.nachForm,
                                            docName: null,
                                        },
                                    }));
                                }}>
                                <Image source={DELETEBUTTON} style={plusImageStyle} />
                            </TouchableOpacity>
                        </View>
                    )}

                <FloatingLabelInput
                    inputStyles={floatInputStyle}
                    value={this.state.umrn.value || undefined}
                    maxLength={10}
                    onChangeText={(text) => {
                        this.setState(
                            {
                                umrn: {
                                    ...this.state.umrn,
                                    value: text,
                                },
                            },
                            () => {
                                this.isumrn(this.state.umrn.value);
                            },
                        );
                    }}
                    label={"UMRN*"}
                    containerStyles={inputStyle1}
                    customLabelStyles={{
                        colorFocused: colors.COLOR_BLUE,
                        colorBlurred: colors.COLOR_LIGHT_GREY,
                        fontSizeFocused: 15,
                        fontSizeBlurred: 15,
                    }}
                />
                <View style={separatorStyle} />
                {!this.state.umrn.isValid && (
                    <Text style={errorLabel}>
                        {this.state.umrn.value === '' ||
                            this.state.umrn.value === null
                            ? REPAYMENT_DETAILS_CONST.MANDATORY_UMRN
                            : REPAYMENT_DETAILS_CONST.VALID_UMRN}
                    </Text>
                )}

                <DropDownPicker
                    items={this.state.dropDownNachStatus}
                    containerStyle={{ flex: 1, marginTop: 20 }}
                    style={{ backgroundColor: '#ffffff', borderWidth: 0 }}
                    itemStyle={{
                        justifyContent: 'flex-start',
                        marginLeft: 4,
                    }}
                    placeholder={REPAYMENT_DETAILS_CONST.PLACEHOLDER_NACHSTATUS}
                    dropDownStyle={{ backgroundColor: '#ffffff' }}
                    onChangeItem={(item) =>
                        this.setState({
                            nachStatus: { value: item.value, isValid: true },
                        })
                    }
                    customArrowUp={() => <Image source={UP_ARROW} />}
                    customArrowDown={() => <Image source={DOWN_ARROW} />}
                    labelStyle={textStyle}
                    selectedLabelStyle={textStyle}
                />
                <View style={separatorStyle} />
                {!this.state.nachStatus.isValid && (
                    <Text style={errorLabel}>NACH status is mandatory</Text>
                )}
            </View>
        )
    }
    renderUPI() {
        const {
            radioLabel
        } = RepaymentDetailsStyles;
        return (
            <View style={{ marginBottom: 20, marginTop: 20 }}>
                <Text style={[radioLabel, { textAlign: 'center' }]}>UPI 2.0</Text>
            </View>
        )
    }

    countDisplayCheque() {
        const {
            errorLabel,
            textStyle,
            textInput
        } = RepaymentDetailsStyles;
        if (!this.state.countPDC.isValid)
            return null

        let a = [];
        for (let index = 0; index < parseInt(this.state.countPDC.value); index++) {
            a.push(
                <View key={index}>
                    <View style={{ flexDirection: 'row' }} >
                        <Text style={[textStyle, { marginBottom: -10 }]}>{`${REPAYMENT_DETAILS_CONST.CHEQUE} ${index + 1} :`}</Text>
                        <TextInput style={textInput}
                            editable={this.state.isDisable ? false : !this.state.isViewOnly}
                            onChangeText={(text) => this.addValues(text, index)}
                            keyboardType={'numeric'}
                            placeholder={`${REPAYMENT_DETAILS_CONST.CHEQUE} ${index + 1}`}
                            value={this.state.inputData[index]?.text || ""}
                        />
                    </View >
                    {!this.state.inputData[index]?.valid &&
                        <Text style={[errorLabel, { textAlign: 'center', marginBottom: 25 }]}>
                            {this.state.inputData[index]?.valid || this.state.inputData[index]?.text.length == 0 ? REPAYMENT_DETAILS_CONST.MANDATORY_CHEQUE : REPAYMENT_DETAILS_CONST.VALID_CHEQUE}</Text>}
                </View>)
        }
        return a
    }

    addValues = (text, index) => {
        let dataArray = this.state.inputData;
        let checkBool = false;
        let valid = countPDC.test(text);
        dataArray[index] = ({ text: text, valid: valid })
        this.setState({
            inputData: [...dataArray]
        });
    }

    renderPDC() {
        const {
            floatInputStyle,
            separatorStyle,
            inputStyle1,
            errorLabel,
            buttonNavigation,
            radioLabel
        } = RepaymentDetailsStyles;

        return (
            <View style={{ marginBottom: 20, marginTop: 20 }}>
                <Text style={[radioLabel, { textAlign: 'center' }]}>PDC</Text>
                <FloatingLabelInput
                    inputStyles={floatInputStyle}

                    value={this.state.countPDC.value || undefined}
                    maxLength={2}
                    editable={this.state.isDisable ? false : !this.state.isViewOnly}
                    keyboardType={'numeric'}
                    onChangeText={(text) => {
                        this.setState(
                            {
                                countPDC: {
                                    ...this.state.countPDC,
                                    value: text,
                                },
                            },
                            () => {
                                this.isCount(this.state.countPDC.value);

                            },
                        );
                    }}
                    label={REPAYMENT_DETAILS_CONST.COUNT}
                    containerStyles={inputStyle1}
                    customLabelStyles={{
                        colorFocused: colors.COLOR_BLUE,
                        colorBlurred: colors.COLOR_LIGHT_GREY,
                        fontSizeFocused: 15,
                        fontSizeBlurred: 15,
                    }}
                />
                <View style={[separatorStyle, { marginBottom: 20 }]} />
                {!this.state.countPDC.isValid && (
                    <Text style={errorLabel}>
                        {this.state.countPDC.value === '' ||
                            this.state.countPDC.value === null
                            ? REPAYMENT_DETAILS_CONST.MANDATORY_COUNT
                            : REPAYMENT_DETAILS_CONST.VALID_COUNT}
                    </Text>
                )}

                {this.countDisplayCheque()}

                <View style={buttonNavigation}>
                    <View style={{ flex: 1, marginRight: 10 }}>
                        <Button
                            title={REPAYMENT_DETAILS_CONST.BUTTON_TITLE_LOAN_SUMMARY}
                            onPress={() => {
                                this.props.navigation.navigate('LoanSummary', { applicantUniqueId: this.state.applicantUniqueId, leadCode: this.state.leadCode, ismainapplicant: this.state.ismainapplicant })
                            }}
                        />
                    </View>
                    <View style={{ flex: 1 }}>
                        <Button
                            title={REPAYMENT_DETAILS_CONST.BUTTON_TITLE_SAVE}
                            isDisabled={this.state.isDisable}

                            onPress={() => {
                                if (!this.state.isViewOnly) {
                                    if (this.isCount(this.state.countPDC.value) && this.validateInputData()) {

                                        const pdc = this.state.inputData.map(data => data.text)

                                        this.props.saveRepaymentDETAILS({
                                            data: {
                                                repaymentMode: "pdc",
                                                pdc: this.state.inputData.map(data => data.text),
                                                applicantUniqueId: this.state.applicantUniqueId
                                            },
                                            callback: (response) => {
                                                this.setState({
                                                    disbursementDisable: false
                                                })
                                            },
                                        })
                                    }
                                }
                                else {
                                    handleWarning("User access denied")
                                }
                            }}
                        />
                    </View>
                </View>
            </View>
        )
    }
    renderCash() {
        const {
            textInputStyle,
            errorLabel,
            radioLabel,
            buttonNavigation
        } = RepaymentDetailsStyles;
        return (
            <View>
                <Text style={[radioLabel, { marginBottom: -10, marginTop: 20 }]}>Comments</Text>
                <TextInput
                    style={textInputStyle}
                    editable={this.state.isDisable ? false : !this.state.isViewOnly}
                    value={this.state.commentCash.value}
                    multiline={true}
                    maxLength={255}
                    onChangeText={(text) => {
                        this.setState({
                            commentCash: {
                                ...this.state.commentCash,
                                value: text,
                            }
                        }, () => { this.iscommentCash(this.state.commentCash.value) });
                    }}
                    placeholder={REPAYMENT_DETAILS_CONST.COMMENT}
                />
                {!this.state.commentCash.isValid && <Text style={errorLabel}>Comment is mandatory</Text>}

                <View style={buttonNavigation}>
                    <View style={{ flex: 1, marginRight: 10 }}>
                        <Button
                            title={REPAYMENT_DETAILS_CONST.BUTTON_TITLE_LOAN_SUMMARY}
                            onPress={() => {
                                this.props.navigation.navigate('LoanSummary', { applicantUniqueId: this.state.applicantUniqueId, leadCode: this.state.leadCode, ismainapplicant: this.state.ismainapplicant })
                            }}
                        />
                    </View>
                    <View style={{ flex: 1 }}>
                        <Button
                            title={REPAYMENT_DETAILS_CONST.BUTTON_TITLE_SAVE}
                            isDisabled={this.state.isDisable}
                            onPress={() => {
                                if (!this.state.isViewOnly) {
                                    this.iscommentCash(this.state.commentCash.value);

                                    if (this.state.commentCash.value != null && this.state.commentCash.value != "" && this.state.commentCash.isValid) {
                                        this.props.saveRepaymentDETAILS({
                                            data: {
                                                repaymentMode: "cash",
                                                comments: this.state.commentCash.value,
                                                applicantUniqueId: this.state.applicantUniqueId
                                            },
                                            callback: (response) => {
                                                this.setState({
                                                    disbursementDisable: false
                                                })
                                            },
                                        })
                                    }
                                }
                                else {
                                    handleWarning("User access denied")
                                }
                            }}
                        />
                    </View>
                </View>
            </View>
        )
    }
    renderOthers() {
        const {
            textInputStyle,
            errorLabel,
            buttonNavigation,
            radioLabel,
        } = RepaymentDetailsStyles;
        return (
            <View>
                <Text style={[radioLabel, { marginBottom: -10, marginTop: 20 }]}>Comments</Text>
                <TextInput
                    style={textInputStyle}
                    editable={this.state.isDisable ? false : !this.state.isViewOnly}
                    value={this.state.commentOther.value}
                    multiline={true}
                    maxLength={255}
                    onChangeText={(text) => {
                        this.setState({
                            commentOther: {
                                ...this.state.commentOther,
                                value: text,
                            }
                        }, () => { this.iscommentOther(this.state.commentOther.value) });
                    }}
                    placeholder={REPAYMENT_DETAILS_CONST.COMMENT}
                />
                {!this.state.commentOther.isValid && <Text style={errorLabel}>Comment is mandatory</Text>}

                <View style={buttonNavigation}>
                    <View style={{ flex: 1, marginRight: 10 }}>
                        <Button
                            title={REPAYMENT_DETAILS_CONST.BUTTON_TITLE_LOAN_SUMMARY}

                            onPress={() => {
                                this.props.navigation.navigate('LoanSummary', { applicantUniqueId: this.state.applicantUniqueId, leadCode: this.state.leadCode, ismainapplicant: this.state.ismainapplicant })
                            }}
                        />
                    </View>
                    <View style={{ flex: 1 }}>
                        <Button
                            title={REPAYMENT_DETAILS_CONST.BUTTON_TITLE_SAVE}
                            isDisabled={this.state.isDisable}

                            onPress={() => {
                                if (!this.state.isViewOnly) {
                                    this.iscommentOther(this.state.commentOther.value);
                                    if (this.state.commentOther.value != null && this.state.commentOther.value != "" && this.state.commentOther.isValid) {
                                        this.props.saveRepaymentDETAILS({
                                            data: {
                                                repaymentMode: "other",
                                                comments: this.state.commentOther.value,
                                                applicantUniqueId: this.state.applicantUniqueId
                                            },
                                            callback: (response) => {
                                                this.setState({
                                                    disbursementDisable: false
                                                })
                                            },
                                        })
                                    }
                                }
                                else {
                                    handleWarning("User access denied")
                                }
                            }
                            }
                        />
                    </View>
                </View>
            </View>
        )
    }

    renderSubmitToDisbursement() {
        const {
            buttonSave,
            pddLabel,
            textInputStyle,
            errorLabel,
        } = RepaymentDetailsStyles;
        return (
            <View>
                <Text style={[pddLabel, { marginTop: 30 }]}>{REPAYMENT_DETAILS_CONST.SUBMITTODISBURSEMENT}</Text>
                <TextInput
                    style={textInputStyle}
                    editable={this.state.isDisable ? false : !this.state.isViewOnly}
                    value={this.state.comment.value}
                    multiline={true}
                    maxLength={255}
                    onChangeText={(text) => {
                        this.setState({
                            comment: {
                                ...this.state.comment,
                                value: text,
                            }
                        }, () => { this.iscomment(this.state.comment.value) });
                    }}
                    placeholder={REPAYMENT_DETAILS_CONST.COMMENT}
                />
                {!this.state.comment.isValid && <Text style={errorLabel}>Comment is mandatory</Text>}

                <View style={buttonSave} >
                    <Button
                        isDisabled={this.state.disbursementDisable}
                        title={REPAYMENT_DETAILS_CONST.SUBMITTODISBURSEMENT}
                        onPress={() => {
                            if (!this.state.isViewOnly) {
                                this.iscomment(this.state.comment.value);
                                if (this.state.comment.value != null && this.state.comment.value != "" && this.state.comment.isValid) {
                                    this.props.saveDisbursementRepaymentDETAILS({
                                        data: {
                                            comments: this.state.comment.value,
                                            applicantUniqueId: this.state.applicantUniqueId,
                                            employeeId: this.state.employeeId,
                                            repaymentMode: this.state.repaymentModeFetch,
                                            type: this.state.type
                                        },
                                        callback: (response) => {
                                            if (response.error === false) {
                                                this.setState({ isDisable: true, disbursementDisable: true }, () => { this.componentDidMount() })
                                            }
                                        }
                                    })
                                }
                            }
                            else {
                                handleWarning("User access denied")
                            }
                        }}
                    />
                </View>
            </View>
        )
    }

    render() {
        const {
            mainContainer,
            mainLabel,
            radioLabel,
        } = RepaymentDetailsStyles;
        return (

            <WaveBackground>
                <StatusBar
                    backgroundColor={colors.COLOR_WHITE}
                    barStyle={'dark-content'}
                    translucent={false}
                    hidden={false}
                />
                <Header showLeftIcon={false}
                    label={REPAYMENT_DETAILS_CONST.HEADER}
                    onPress={() => {
                    }
                    } />
                <ScrollView style={{ marginBottom: 20 }}>
                    <View style={mainContainer}>
                        <Text style={radioLabel}>Repayment Mode</Text>
                        {this.renderRepaymentRadio()}

                        {this.state.selectedRepaymentMode === 'NACH' && this.renderNACHFrom()}
                        {this.state.selectedRepaymentMode === 'UPI 2.0' && this.renderUPI()}
                        {this.state.selectedRepaymentMode === 'PDC' && this.renderPDC()}
                        {this.state.selectedRepaymentMode === 'Cash' && this.renderCash()}
                        {this.state.selectedRepaymentMode === 'Others' && this.renderOthers()}
                        {this.renderSubmitToDisbursement()}
                    </View>
                </ScrollView>
            </WaveBackground>
        )
    }
}
const styles = StyleSheet.create({

});


export default compose(
    container,
    withProps(
        (saveRepaymentDETAILS) => saveRepaymentDETAILS,
        (getRepaymentDETAILS) => getRepaymentDETAILS,
        (saveDisbursementRepaymentDETAILS) => saveDisbursementRepaymentDETAILS,
        (getDisbursementRepaymentDETAILS) => getDisbursementRepaymentDETAILS,
    ),
)(RepaymentDetails);
