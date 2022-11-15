import React, { Component } from 'react';
import { Image, View, StatusBar, Text, TouchableOpacity, TextInput } from 'react-native';
import PropTypes from 'prop-types';
import { compose, withProps } from 'recompose';
import { Icon } from 'react-native-elements';
import { FloatingLabelInput } from 'react-native-floating-label-input';
import DropDownPicker from 'react-native-dropdown-picker';
import { ReferencesStyles } from "./ReferencesStyles";
import { BLUE_PLUS_ICON, MINUS_ICON, TOOL_TIP, DOWN_ARROW, UP_ARROW } from '../../constants/imgConsts';
import container from '../../container/References/index';
import { WaveBackground } from "../../components/WaveBackground/WaveBackground";
import * as colors from "../../constants/colors";
import { REFERENCES_CONST } from "../../constants/screenConst";
import { Header } from "../../components/Header/Header";
import { DottedProgressBar } from "../../components/DottedProgressBar/DottedProgressBar";
import { ScrollView } from 'react-native-gesture-handler';
import { Button } from "../../components/Button/Button";

class References extends Component {

    constructor(props) {
        super(props);
        this.state = {
            nameFamily: {
                value: null,
                isValid: true,
            },
            mobileFamily: {
                value: null,
                isValid: true,
            },
            addressFamily: {
                value: '',
                isValid: true,
            },
            nonnameFamily: {
                value: null,
                isValid: true,
            },
            nonmobileFamily: {
                value: null,
                isValid: true,
            },
            nonaddressFamily: {
                value: '',
                isValid: true,
            },
            dropDownItemFamilyRef: [{
                label: "Father",
                value: "Father"
            }, {
                label: "Mother",
                value: "Mother"
            }, {
                label: "Brother",
                value: "Brother"
            },
            {
                label: "Sister",
                value: "Sister"
            },
            {
                label: "Spouse",
                value: "Spouse"
            },],
            selectedFamilyRef: {
                isValid: true,
                value: ''
            },
            dropDownItemNonFamilyRef: [{
                label: "Colleague",
                value: "Colleague"
            }, {
                label: "Friend",
                value: "Friend"
            }, {
                label: "Neighbour",
                value: "Neighbour"
            },],
            selectedNonFamilyRef: {
                isValid: true,
                value: ''
            },
            creditButtonFlag: false,
            additionalDetailOptions: {
                familyReference: false,
                nonFamilyReference: true,
            },
            leadCode: (this.props.navigation && this.props.navigation.state && this.props.navigation.state.params && this.props.navigation.state.params.leadCode) ||
                (this.props.newLeadDataSelector && this.props.newLeadDataSelector.newLead && this.props.newLeadDataSelector.newLead.leadCode) || "",
            leadName: (this.props.navigation && this.props.navigation.state && this.props.navigation.state.params && this.props.navigation.state.params.leadName) ||
                (this.props.newLeadDataSelector && this.props.newLeadDataSelector.newLead && this.props.newLeadDataSelector.newLead.leadName) || "",
            applicantUniqueId: (this.props.navigation && this.props.navigation.state && this.props.navigation.state.params && this.props.navigation.state.params.applicantUniqueId) ||
                (this.props.newLeadDataSelector && this.props.newLeadDataSelector.newLead && this.props.newLeadDataSelector.newLead.applicantUniqueId) || "",
            iscoapplicant: this.props.navigation.state.params.iscoapplicant || false,
            isguarantor: this.props.navigation.state.params.isguarantor || false,
            coapplicantUniqueId: this.props.navigation.state.params.coapplicantUniqueId || "",
            savedNonFamilyReference: false,
            savedFamilyReference: false,
            idToEditFamilyRef: null,
            idToEditNonFamilyRef: null,
            cancelButtonTitle: "Cancel",
            mobileNumber:
                (this.props.navigation &&
                    this.props.navigation.state &&
                    this.props.navigation.state.params &&
                    this.props.navigation.state.params.mobileNumber) ||
                '',
            ismainapplicant: this.props.navigation.state.params.ismainapplicant,
            isViewOnly: false
        }
    }

    componentDidMount() {
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
                    response?.mainapplicant?.loanSchemeFreeze ? true :
                    // response?.mainapplicant?.loanAgreementFlag ? true : 
                    response?.modelAccess[0]?.read ? true : false
                })
            }
        })
        const dataForgetQDE = {
            applicant_uniqueid:
                this.props.navigation.state.params.iscoapplicant || this.props.navigation.state.params.isguarantor
                    ? this.props.navigation.state.params.coapplicantUniqueId
                    : this.props.navigation.state.params.applicantUniqueId,
            ismainapplicant: this.props.navigation.state.params.ismainapplicant,
            isguarantor: this.props.navigation.state.params.isguarantor,
        };
        this.props.getQDEData({
            dataForgetQDE,
            callback: (response) => {
                if (this.props.userQDEDataSelector && this.props.userQDEDataSelector.referencedetails && this.props.userQDEDataSelector.referencedetails.familyref) {
                    const familyRefData = this.props.userQDEDataSelector.referencedetails.familyref;
                    this.setState({
                        nameFamily: {
                            value: familyRefData.name || null,
                            isValid: true,
                        },
                        mobileFamily: {
                            value: familyRefData.mobNo.toString() || null,
                            isValid: true,
                        },
                        addressFamily: {
                            value: familyRefData.addres || null,
                            isValid: true,
                        },
                        selectedFamilyRef: {
                            isValid: true,
                            value: familyRefData.relationship || "",
                            label: familyRefData.relationship || ""
                        },
                        additionalDetailOptions: {
                            familyReference: false,
                            nonFamilyReference: this.props.userQDEDataSelector && this.props.userQDEDataSelector.referencedetails && this.props.userQDEDataSelector.referencedetails.nofamilyref ? false : true,
                        },
                        applicantUniqueId: this.props.userQDEDataSelector.applicantUniqueId || this.state.applicantUniqueId,
                        idToEditFamilyRef: familyRefData.id || null,
                        ismainapplicant: familyRefData.ismainapplicant || false,
                        leadCode: this.props.userQDEDataSelector.leadCode || this.state.leadCode,
                        cancelButtonTitle: "Cancel",
                        savedFamilyReference: true
                    });
                }
                if (this.props.userQDEDataSelector && this.props.userQDEDataSelector.referencedetails && this.props.userQDEDataSelector.referencedetails.nofamilyref) {
                    const nonFamRefData = this.props.userQDEDataSelector.referencedetails.nofamilyref;

                    this.setState({
                        nonnameFamily: {
                            value: nonFamRefData.name || null,
                            isValid: true,
                        },
                        nonmobileFamily: {
                            value: nonFamRefData.mobNo.toString() || null,
                            isValid: true,
                        },
                        nonaddressFamily: {
                            value: nonFamRefData.addres || null,
                            isValid: true,
                        },
                        selectedNonFamilyRef: {
                            isValid: true,
                            value: nonFamRefData.relationship || null,
                            label: nonFamRefData.relationship || null,
                        },
                        additionalDetailOptions: {
                            familyReference: this.props.userQDEDataSelector && this.props.userQDEDataSelector.referencedetails && this.props.userQDEDataSelector.referencedetails.familyref ? false : true,
                            nonFamilyReference: false,
                        },
                        applicantUniqueId: this.props.userQDEDataSelector.applicantUniqueId || this.state.applicantUniqueId,
                        idToEditNonFamilyRef: nonFamRefData.id || null,
                        ismainapplicant: nonFamRefData.ismainapplicant || false,
                        leadCode: this.props.userQDEDataSelector.leadCode || this.state.leadCode,
                        cancelButtonTitle: "Cancel",
                        savedNonFamilyReference: true,
                    })
                }
            }
        })
    }

    setnameFamily(text) {
        let valid = false;
        const customerRegex = /^[a-zA-Z ]*$/;
        if (text != "" && text != null && customerRegex.test(text)) {
            valid = true;
        }

        this.setState({
            nameFamily: {
                ...this.state.nameFamily,
                isValid: valid,
            }
        });
    }

    setmobileFamily(text) {
        let valid = false;
        const mobileRegex = /^[6-9]\d{9}$/;
        if (text != "" && text != null && mobileRegex.test(text)) {
            valid = true;
        }
        this.setState({
            mobileFamily: {
                ...this.state.mobileFamily,
                isValid: valid,
            }
        });
    }
    setaddressFamily(text) {
        let valid = false;
        const addressRegex = /.*/;
        if (text != "" && text != null && addressRegex.test(text)) {
            valid = true;
        }
        this.setState({
            addressFamily: {
                ...this.state.addressFamily,
                isValid: valid,
            }
        });
    }
    setnonnameFamily(text) {
        let valid = false;
        const customerRegex = /^[a-zA-Z ]*$/;
        if (text != "" && text != null && customerRegex.test(text)) {
            valid = true;
        }

        this.setState({
            nonnameFamily: {
                ...this.state.nonnameFamily,
                isValid: valid,
            }
        });
    }

    setnonmobileFamily(text) {
        let valid = false;
        const mobileRegex = /^[6-9]\d{9}$/;
        if (text != "" && text != null && mobileRegex.test(text)) {
            valid = true;
        }
        this.setState({
            nonmobileFamily: {
                ...this.state.nonmobileFamily,
                isValid: valid,
            }
        });
    }

    setnonaddressFamily(text) {
        let valid = false;
        const addressRegex = /.*/;
        if (text != "" && text != null && addressRegex.test(text)) {
            valid = true;
        }
        this.setState({
            nonaddressFamily: {
                ...this.state.nonaddressFamily,
                isValid: valid,
            }
        });
    }
    renderFamilyRefDropDown() {
        const { viewDrop, separatorStyle1, textStyle, addressStyle, textStyle1, errorLabel } = ReferencesStyles;

        return (
            <View style={viewDrop}>
                {this.state.selectedFamilyRef.value !== '' ?
                    <Text style={[addressStyle, { marginLeft: 5 }]}>
                        {'Relationship*'}
                    </Text> : null}
                <DropDownPicker
                    disabled={this.state.isViewOnly}
                    defaultValue={this.state.selectedFamilyRef.value}
                    items={this.state.dropDownItemFamilyRef}
                    containerStyle={{ flex: 1 }}
                    style={{ backgroundColor: '#ffffff', borderWidth: 0 }}
                    itemStyle={{
                        justifyContent: 'flex-start',
                        marginLeft: 4
                    }}
                    placeholder={REFERENCES_CONST.PLACEHOLDER_DROPDOWN_FAMILY}
                    dropDownStyle={{ backgroundColor: '#ffffff' }}
                    onChangeItem={item => this.setState({ selectedFamilyRef: { ...item, isValid: true } }, () => {

                    })}
                    customArrowUp={() => <Image source={UP_ARROW} />}
                    customArrowDown={() => <Image source={DOWN_ARROW} />}
                    labelStyle={textStyle1}
                    selectedLabelStyle={textStyle}
                />
                <View style={separatorStyle1} />
                {!this.state.selectedFamilyRef.isValid && <Text style={errorLabel}>Relationship selection is Mandatory.</Text>}
            </View>
        );
    }
    renderNonFamilyRefDropDown() {
        const { viewDrop, separatorStyle1, addressStyle, textStyle, textStyle1, errorLabel } = ReferencesStyles;

        return (
            <View style={viewDrop}>
                {this.state.selectedNonFamilyRef.value !== '' ?
                    <Text style={[addressStyle, { marginLeft: 5 }]}>
                        {'Relationship*'}
                    </Text> : null}
                <DropDownPicker
                    disabled={this.state.isViewOnly}
                    defaultValue={this.state.selectedNonFamilyRef.value}
                    items={this.state.dropDownItemNonFamilyRef}
                    containerStyle={{ flex: 1 }}
                    style={{ backgroundColor: '#ffffff', borderWidth: 0 }}
                    itemStyle={{
                        justifyContent: 'flex-start',
                        marginLeft: 4
                    }}
                    placeholder={REFERENCES_CONST.PLACEHOLDER_DROPDOWN_FAMILY}
                    dropDownStyle={{ backgroundColor: '#ffffff' }}
                    onChangeItem={item => this.setState({ selectedNonFamilyRef: { ...item, isValid: true } }, () => {

                    })}
                    customArrowUp={() => <Image source={UP_ARROW} />}
                    customArrowDown={() => <Image source={DOWN_ARROW} />}
                    labelStyle={textStyle1}
                    selectedLabelStyle={textStyle}
                />
                <View style={separatorStyle1} />
                {!this.state.selectedNonFamilyRef.isValid && <Text style={errorLabel}>Relationship selection is mandatory.</Text>}
            </View>
        );
    }
    handleCollapseExpand(key, valueToSet) {
        const keyToObj = this.state.additionalDetailOptions;
        keyToObj[key] = valueToSet;

        this.setState({
            additionalDetailOptions: keyToObj
        })
    }
    renderFamilyReference() {
        const { collapsedViewStyle,
            collapsedContainer,
            plusImageStyle,
            expandedContainer,
            errorLabel,
            seperatorStyle1,
            seperatorStyle,
            expandedViewStyle,
            buttonContainer,
            addressStyle,
            cancelButtonTitleStyle,
            familyReferenceLabel,
            inputStyle,
            inputTextStyle,
            textInputStyle,
            textInputStyleView
        } = ReferencesStyles;

        if (this.state.additionalDetailOptions.familyReference) {
            return (
                <View style={collapsedContainer}>
                    <TouchableOpacity style={collapsedViewStyle} onPress={() => {
                        this.handleCollapseExpand("familyReference", false);
                    }}>
                        <Text style={familyReferenceLabel}>{REFERENCES_CONST.FAMILY_REFERENCE}</Text>
                        <Image source={BLUE_PLUS_ICON} style={plusImageStyle} />
                    </TouchableOpacity>
                </View>
            );
        } else {
            return (
                <View style={expandedContainer}>
                    <View style={seperatorStyle} />
                    <View style={expandedViewStyle}>
                        <Text style={familyReferenceLabel}>{REFERENCES_CONST.FAMILY_REFERENCE}</Text>
                        <TouchableOpacity onPress={() => {
                            this.handleCollapseExpand("familyReference", true);
                        }}>
                            <Image source={MINUS_ICON} style={plusImageStyle} resizeMode="contain" />
                        </TouchableOpacity>
                    </View>
                    {this.renderFamilyRefDropDown()}
                    <FloatingLabelInput
                        editable={!this.state.isViewOnly}
                        label={REFERENCES_CONST.NAME}
                        containerStyles={inputStyle}
                        maxLength={50}
                        value={this.state.nameFamily.value || undefined}
                        onChangeText={(text) => {
                            this.setState({
                                nameFamily: {
                                    ...this.state.nameFamily,
                                    value: text,
                                }
                            }, () => { this.setnameFamily(this.state.nameFamily.value) });
                        }}
                        customLabelStyles={{
                            colorFocused: colors.COLOR_BLUE,
                            colorBlurred: colors.COLOR_LIGHT_GREY,
                            fontSizeFocused: 15,
                            fontSizeBlurred: 15,
                        }}
                        inputStyles={inputTextStyle}
                    />
                    <View style={seperatorStyle} />
                    {!this.state.nameFamily.isValid && <Text style={errorLabel}>{(this.state.nameFamily.value === "" || this.state.nameFamily.value === null) ?
                        REFERENCES_CONST.MANDATORY_NAME : REFERENCES_CONST.VALID_NAME}</Text>}
                    <FloatingLabelInput
                        editable={!this.state.isViewOnly}
                        label={REFERENCES_CONST.MOBILE}
                        containerStyles={inputStyle}
                        keyboardType={'numeric'}
                        maxLength={10}
                        value={this.state.mobileFamily.value || undefined}
                        onChangeText={(text) => {
                            this.setState({
                                mobileFamily: {
                                    ...this.state.mobileFamily,
                                    value: text,
                                }
                            }, () => { this.setmobileFamily(this.state.mobileFamily.value) });
                        }}
                        customLabelStyles={{
                            colorFocused: colors.COLOR_BLUE,
                            colorBlurred: colors.COLOR_LIGHT_GREY,
                            fontSizeFocused: 15,
                            fontSizeBlurred: 15,
                        }}
                        inputStyles={inputTextStyle}
                    />
                    <View style={seperatorStyle} />
                    {!this.state.mobileFamily.isValid && <Text style={errorLabel}>{(this.state.mobileFamily.value === "" || this.state.mobileFamily.value === null) ?

                        REFERENCES_CONST.MANDATORY_PHONE : REFERENCES_CONST.VALID_PHONE}</Text>}
                    {this.state.addressFamily.value !== '' ?
                        <Text style={[addressStyle, { marginLeft: 5 }]}>
                            {'Address*'}
                        </Text> : null}
                    <TextInput
                        editable={!this.state.isViewOnly}
                        style={textInputStyle}
                        value={this.state.addressFamily.value}
                        multiline={true}
                        maxLength={255}
                        onChangeText={(text) => {
                            this.setState({
                                addressFamily: {
                                    ...this.state.addressFamily,
                                    value: text,
                                }
                            }, () => { this.setaddressFamily(this.state.addressFamily.value) });
                        }}
                        placeholder={REFERENCES_CONST.ADDRESS}
                    />
                    {!this.state.addressFamily.isValid && <Text style={errorLabel}>Address is mandatory.</Text>}

                    <View style={buttonContainer}>
                        <Button
                            isDisabled={this.state.isViewOnly}
                            title={REFERENCES_CONST.BUTTON_TITLE_SAVE}
                            onPress={() => {
                                this.setnameFamily(this.state.nameFamily.value)
                                this.setmobileFamily(this.state.mobileFamily.value)
                                this.setaddressFamily(this.state.addressFamily.value)
                                if (this.state.selectedFamilyRef.label == null) {
                                    this.setState({
                                        selectedFamilyRef: { isValid: false },
                                    })
                                }
                                if (this.state.nameFamily.value != "" && this.state.nameFamily.value != null && this.state.nameFamily.isValid &&
                                    this.state.mobileFamily.value != null && this.state.mobileFamily.value != "" && this.state.mobileFamily.isValid &&
                                    this.state.addressFamily.value != null && this.state.addressFamily.value != "" && this.state.addressFamily.isValid &&
                                    this.state.selectedFamilyRef.label != null && this.state.selectedFamilyRef.isValid
                                ) {
                                    this.props.saveUpdateFamilyREFERENCE({
                                        data: {
                                            ismainapplicant: true,
                                            applicantUniqueId: this.state.applicantUniqueId,
                                            leadCode: this.state.leadCode,
                                            nameFamily: this.state.nameFamily.value,
                                            mobileFamily: this.state.mobileFamily.value,
                                            addressFamily: this.state.addressFamily.value,
                                            selectedFamilyRef: this.state.selectedFamilyRef.value,
                                            id: this.state.idToEditFamilyRef,
                                        },
                                        callback: (response) => {
                                            if (response && !response.error) {
                                                this.setState({
                                                    savedFamilyReference: true,
                                                    additionalDetailOptions: {
                                                        familyReference: true,
                                                        nonFamilyReference: false,
                                                    },
                                                });

                                            }
                                        },
                                    });
                                }
                            }
                            }
                        />
                    </View>
                </View>
            );
        }

    }

    renderNonFamilyReference() {
        const { collapsedViewStyle,
            collapsedContainer,
            plusImageStyle,
            expandedContainer,
            seperatorStyle1,
            errorLabel,
            seperatorStyle,
            expandedViewStyle,
            buttonContainer,
            addressStyle,
            cancelButtonTitleStyle,
            familyReferenceLabel,
            inputStyle,
            inputTextStyle,
            textInputStyle,
            textInputStyleView
        } = ReferencesStyles;

        if (this.state.additionalDetailOptions.nonFamilyReference) {
            return (
                <View style={collapsedContainer}>
                    <TouchableOpacity style={collapsedViewStyle} onPress={() => {
                        this.handleCollapseExpand("nonFamilyReference", false);
                    }}>
                        <Text style={familyReferenceLabel}>{REFERENCES_CONST.NON_FAMILY_REFERENCE}</Text>
                        <Image source={BLUE_PLUS_ICON} style={plusImageStyle} />
                    </TouchableOpacity>
                </View>
            );
        } else {
            return (
                <View style={expandedContainer}>
                    <View style={seperatorStyle} />
                    <View style={expandedViewStyle}>
                        <Text style={familyReferenceLabel}>{REFERENCES_CONST.NON_FAMILY_REFERENCE}</Text>
                        <TouchableOpacity onPress={() => {
                            this.handleCollapseExpand("nonFamilyReference", true);
                        }}>
                            <Image source={MINUS_ICON} style={plusImageStyle} resizeMode="contain" />
                        </TouchableOpacity>
                    </View>
                    {this.renderNonFamilyRefDropDown()}
                    <FloatingLabelInput
                        editable={!this.state.isViewOnly}
                        label={REFERENCES_CONST.NAME}
                        containerStyles={inputStyle}
                        maxLength={50}
                        value={this.state.nonnameFamily.value || undefined}
                        onChangeText={(text) => {
                            this.setState({
                                nonnameFamily: {
                                    ...this.state.nonnameFamily,
                                    value: text,
                                }
                            }, () => { this.setnonnameFamily(this.state.nonnameFamily.value) });
                        }}
                        customLabelStyles={{
                            colorFocused: colors.COLOR_BLUE,
                            colorBlurred: colors.COLOR_LIGHT_GREY,
                            fontSizeFocused: 15,
                            fontSizeBlurred: 15,
                        }}
                        inputStyles={inputTextStyle}
                    />
                    <View style={seperatorStyle} />
                    {!this.state.nonnameFamily.isValid && <Text style={errorLabel}>{(this.state.nonnameFamily.value === "" || this.state.nonnameFamily.value === null) ?
                        REFERENCES_CONST.MANDATORY_NAME : REFERENCES_CONST.VALID_NAME}</Text>}
                    <FloatingLabelInput
                        editable={!this.state.isViewOnly}
                        label={REFERENCES_CONST.MOBILE}
                        containerStyles={inputStyle}
                        keyboardType={'numeric'}
                        maxLength={10}
                        value={this.state.nonmobileFamily.value || undefined}
                        onChangeText={(text) => {
                            this.setState({
                                nonmobileFamily: {
                                    ...this.state.nonmobileFamily,
                                    value: text,
                                }
                            }, () => { this.setnonmobileFamily(this.state.nonmobileFamily.value) });
                        }}
                        customLabelStyles={{
                            colorFocused: colors.COLOR_BLUE,
                            colorBlurred: colors.COLOR_LIGHT_GREY,
                            fontSizeFocused: 15,
                            fontSizeBlurred: 15,
                        }}
                        inputStyles={inputTextStyle}
                    />
                    <View style={seperatorStyle} />
                    {!this.state.nonmobileFamily.isValid && <Text style={errorLabel}>{(this.state.nonmobileFamily.value === "" || this.state.nonmobileFamily.value === null) ?
                        REFERENCES_CONST.MANDATORY_PHONE : REFERENCES_CONST.VALID_PHONE}</Text>}
                    {this.state.nonaddressFamily.value !== '' ?
                        <Text style={[addressStyle, { marginLeft: 5 }]}>
                            {'Address*'}
                        </Text> : null}
                    <TextInput
                        editable={!this.state.isViewOnly}
                        style={textInputStyle}
                        value={this.state.nonaddressFamily.value}
                        multiline={true}
                        maxLength={255}
                        onChangeText={(text) => {
                            this.setState({
                                nonaddressFamily: {
                                    ...this.state.nonaddressFamily,
                                    value: text,
                                }
                            }, () => { this.setnonaddressFamily(this.state.nonaddressFamily.value) });
                        }}
                        placeholder={REFERENCES_CONST.ADDRESS}
                    />
                    {!this.state.nonaddressFamily.isValid && <Text style={errorLabel}>Address is mandatory.</Text>}

                    < View style={buttonContainer}>
                        <Button
                            isDisabled={this.state.isViewOnly}
                            title={REFERENCES_CONST.BUTTON_TITLE_SAVE}
                            onPress={() => {
                                this.setnonnameFamily(this.state.nonnameFamily.value)
                                this.setnonmobileFamily(this.state.nonmobileFamily.value)
                                this.setnonaddressFamily(this.state.nonaddressFamily.value)
                                if (this.state.selectedNonFamilyRef.label == null) {
                                    this.setState({
                                        selectedNonFamilyRef: { isValid: false },
                                    })
                                }
                                if (this.state.nonnameFamily.value != null && this.state.nonnameFamily.value != "" && this.state.nonnameFamily.isValid &&
                                    this.state.nonmobileFamily.value != null && this.state.nonmobileFamily.value != "" && this.state.nonmobileFamily.isValid &&
                                    this.state.nonaddressFamily.value != null && this.state.nonaddressFamily.value != "" && this.state.nonaddressFamily.isValid &&
                                    this.state.selectedNonFamilyRef.label != null && this.state.selectedNonFamilyRef.isValid
                                ) {
                                    this.props.saveUpdateNonFamilyREFERENCE({
                                        data: {
                                            ismainapplicant: true,
                                            applicantUniqueId: this.state.applicantUniqueId,
                                            leadCode: this.state.leadCode,
                                            nonnameFamily: this.state.nonnameFamily.value,
                                            nonmobileFamily: this.state.nonmobileFamily.value,
                                            nonaddressFamily: this.state.nonaddressFamily.value,
                                            selectedNonFamilyRef: this.state.selectedNonFamilyRef.value,
                                            id: this.state.idToEditNonFamilyRef,
                                        },
                                        callback: (response) => {
                                            if (response && !response.error) {
                                                // this.props.navigation.navigate("BusinessDetails", { leadName: this.state.leadName, applicantUniqueId: this.state.applicantUniqueId, leadCode: this.state.leadCode })
                                                this.setState({
                                                    savedNonFamilyReference: true,
                                                    additionalDetailOptions: {
                                                        familyReference: true,
                                                        nonFamilyReference: true,
                                                    },
                                                });
                                            }
                                        },
                                    });
                                }
                            }
                            }
                        />
                    </View>
                </View>
            );
        }

    }

    render() {
        const {
            mainContainer,
            inputContainer,
            schemesLabel
        } = ReferencesStyles;

        return (
            <WaveBackground>
                <StatusBar
                    backgroundColor={colors.COLOR_WHITE}
                    barStyle={'dark-content'}
                    translucent={false}
                    hidden={false}
                />
                <Header
                    label={REFERENCES_CONST.HEADER}
                    showLeftIcon={false} onPress={() => {

                    }
                    }
                />
                <View style={{ alignContent: "center", marginBottom: 20 }}>
                    <View style={{}}>
                        <DottedProgressBar
                            totalSteps={this.state.indSelfSoleFlag ? [1, 2, 3, 4, 5] : [1, 2, 3, 4, 5, 6]}
                            currentIndex={5} />
                    </View>
                    <Text style={schemesLabel}>{REFERENCES_CONST.REFERENCES_LABEL}</Text>
                </View>

                <ScrollView style={{ marginBottom: 20 }}>
                    <View style={mainContainer}>
                        {this.renderFamilyReference()}
                        {this.renderNonFamilyReference()}
                        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                            <View style={{ flex: 1, marginRight: 20 }}>
                                <Button
                                    title={this.state.cancelButtonTitle}
                                    onPress={() => {
                                        if (this.state.cancelButtonTitle.toLowerCase() === "cancel") {
                                            this.props.navigation.navigate("LeadList")
                                        }
                                    }} />
                            </View>
                            <View style={{ flex: 1 }}>
                                <Button
                                    isDisabled={!this.state.savedFamilyReference || !this.state.savedNonFamilyReference}
                                    title={REFERENCES_CONST.NEXT_BUTTON}
                                    onPress={() => {
                                        if (this.state.savedFamilyReference && this.state.savedNonFamilyReference) {
                                            // this.props.navigation.navigate("Schemes", {
                                            //     leadCode: this.state.leadCode,
                                            //     leadName: this.state.leadName,
                                            //     ismainapplicant: this.state.ismainapplicant,
                                            //     applicantUniqueId: this.state.applicantUniqueId,
                                            //     iscoapplicant: this.state.iscoapplicant,
                                            //     isguarantor: this.state.isguarantor,
                                            //     coapplicantUniqueId: this.state.coapplicantUniqueId
                                            // })
                                            this.props.saveSCHEME({
                                                data: {
                                                  leadCode: this.state.leadCode,
                                                  selectedSourceType: 'Fasttrack',
                                                  id: null,
                                                  ismainapplicant: true,
                                                  applicantUniqueId: this.state.applicantUniqueId,
                                                },
                                                callback: (response) => {
                                                    this.props.navigation.navigate('QdeSuccess', {
                                                        applicantUniqueId: this.state.applicantUniqueId,
                                                        redirection: 'qde',
                                                        offerType: 'tentative',
                                                        creditButtonFlag: this.state.creditButtonFlag
                                                      });
                                                },
                                              });
                                        }
                                    }} />
                            </View>
                        </View>
                        <View style={{ alignSelf: 'center', width: '45%', marginVertical: 10 }}>
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
                                        isViewOnly: this.state.isViewOnly || false,
                                    });
                                }}
                            />
                        </View>
                    </View>
                </ScrollView>

            </WaveBackground >
        )
    }
}

export default compose(
    container,
    withProps((getEntityList) => getEntityList),
)(References);
