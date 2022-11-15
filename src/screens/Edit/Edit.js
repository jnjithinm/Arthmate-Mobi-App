import React, { Component } from 'react';
import { View, Text, ScrollView, Image, TextInput } from 'react-native';
import PropTypes from 'prop-types';
import { compose, withProps } from 'recompose';
import container from '../../container/Edit/index';
import { Header } from "../../components/Header/Header";
import { Button } from "../../components/Button/Button";
import { WaveBackground } from "../../components/WaveBackground/WaveBackground";
import { EDIT_CONST } from "../../constants/screenConst";
import { EditStyles } from "./EditStyles";
import DropDownPicker from 'react-native-dropdown-picker';
import { DOWN_ARROW, UP_ARROW } from '../../constants/imgConsts';
import { CONSENT_PENDING_CONST } from "../../constants/screenConst";
const pincodeRegex1 = /^[1-9][0-9]{5}$/;

class Edit extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dropDownItem: [],
            dropDownItemBranch: [],
            dropDownItemDSA: [],
            city: '',
            state: '',
            customerName: {
                value: "",
                isValid: true,
            },
            firstName: {
                value: "",
                isValid: true,
            },
            middleName: {
                value: "",
                isValid: true,
            },
            lastName: {
                value: "",
                isValid: true,
            },
            emailAddress: {
                value: "",
                isValid: true,
            },
            panNumber: {
                value: '',
                isValid: true,
              },
            pincode: {
                value: "",
                isValid: true,
            },
            mobileNumber: {
                value: "",
                isValid: true,
            },
            productId: "",
            selectedBranch: {
                label: "",
                value: "",
            },
            selectedItem: {
                label: "",
                value: "",
            },
            consentPending: '',
            selectedSourceType: "",
            id: this.props.navigation.state.params.id,
            leadCode: this.props.navigation.state.params.leadCode,
            applicantUniqueId: (this.props.navigation &&
                this.props.navigation.state &&
                this.props.navigation.state.params &&
                this.props.navigation.state.params.applicantUniqueId) ||
                (this.props.newLeadDataSelector &&
                    this.props.newLeadDataSelector.newLead &&
                    this.props.newLeadDataSelector.newLead.applicantUniqueId) ||
                '',
            title: this.props.navigation.state.params.title,
            iscoapplicant: this.props.navigation.state.params.iscoapplicant || false,
            isguarantor: this.props.navigation.state.params.isguarantor || false,
            coapplicantUniqueId: this.props.navigation.state.params.coapplicantUniqueId || "",
            mainapplicantUniqueId: "",
            leadName: "",
            employeeId: (this.props.userDataSelector?.userData?.data?.employeeId) || "",
            branchName: (this.props.userDataSelector?.userData?.data?.branchName) || "",
            isViewOnly: false,
        }
        console.log("ggggg",this.props.userDataSelector?.userData?.data);
    }
 
 isCustomerName(text) {
        let valid = false;
        const customerRegex = /^[a-zA-Z ]*$/;
        if (text != "" && text != null && customerRegex.test(text)) {
            valid = true;
        }

        this.setState({
            customerName: {
                ...this.state.customerName,
                isValid: valid,
            }
        });
    }

    getDataFromPincode(pincode) {
        // this.props.getCityState({
        //   pincode,
        //   callback: (response) => {
           
        //       this.setState({
        //         city: response.data.city || '',
        //         state: response.data.state || '',
        //       });
            
        //   },
        // });
      }

    isfirstName(text) {
        let valid = false;
        const customerRegex = /^[a-zA-Z ]*$/;
        if (text != '' && text != null && customerRegex.test(text)) {
            valid = true;
        }

        this.setState({
            firstName: {
                ...this.state.firstName,
                isValid: valid,
            },
        });
    }

    ismiddleName(text) {
        let valid = false;
        const customerRegex = /^[a-zA-Z ]*$/;
        if (customerRegex.test(text)) {
            valid = true;
        }

        this.setState({
            middleName: {
                ...this.state.middleName,
                isValid: valid,
            },
        });
    }

    islastName(text) {
        let valid = false;
        const customerRegex = /^[a-zA-Z ]*$/;
        if (text != '' && text != null && customerRegex.test(text)) {
            valid = true;
        }

        this.setState({
            lastName: {
                ...this.state.lastName,
                isValid: valid,
            },
        });
    }

    isemailAddress(text) {
        let valid = false;
        const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if (text != "" && text != null && emailRegex.test(text)) {
            valid = true;
        }

        this.setState({
            emailAddress: {
                ...this.state.emailAddress,
                isValid: valid,
            }
        });
    }

    isPanValid(text) {
        let valid = false;
        //const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        const PAN_REGEX = /([A-Za-z]){5}([0-9]){4}([A-Za-z]){1}$/;
        if (text != '' && text != null && PAN_REGEX.test(text)) {
          valid = true;
        }
    
        this.setState({
          panNumber: {
            ...this.state.panNumber,
            isValid: valid,
          },
        });
      }

    ispincode(text) {
        let valid = false;
        const pincodeRegex = /^[1-9][0-9]{5}$/;
        if (text != "" && text != null && pincodeRegex.test(text)) {
            valid = true;
        }
        this.setState({
            pincode: {
                ...this.state.pincode,
                isValid: valid,
            }
        });
    }
    ismobileNumber(text) {
        let valid = false;
        const mobileRegex = /^[6-9]\d{9}$/;
        if (text != "" && text != null && mobileRegex.test(text)) {
            valid = true;
        }
        this.setState({
            mobileNumber: {
                ...this.state.mobileNumber,
                isValid: valid,
            }
        });
    }

    caseSummary() {
        const dataToAPI = {
            applicant_uniqueid: this.state.applicantUniqueId,
            lead_code: this.state.leadCode,
            roleId: this.props.userDataSelector.userData.data.roleId
        };
        this.props.getLoanSummary({
            dataToAPI,
            callback: (response) => {

                this.setState({
                    isViewOnly: response?.mainapplicant?.loanAgreementFlag ? true : response?.modelAccess[0]?.read ? true : false
                })
            }
        })
    }

    componentDidMount() {
        this.caseSummary();
        if (this.state.iscoapplicant || this.state.isguarantor) {
            const dataToAPI = {
                coapplicantUniqueId: this.state.coapplicantUniqueId,
            };
            this.props.getCoAppGuarantor({
                dataToAPI,
                callback: (response) => {
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
                        customerName: {
                            value: response.leadName || "",
                            isValid: true,
                        },
                        city: response?.city || "",
                        state: response?.state || "",
                        firstName: {
                            value: response.firstName || "",
                            isValid: true,
                        },
                        middleName: {
                            value: response.middleName || "",
                            isValid: true,
                        },
                        lastName: {
                            value: response.lastName || "",
                            isValid: true,
                        },
                        emailAddress: {
                            value: response.customerEmail || "",
                            isValid: true,
                        },
                        panNumber: {
                            value: response.pan || "",
                            isValid: true,
                        },
                        mobileNumber: {
                            value: `${response.customerMobile}` || "",
                            isValid: true,
                        },
                        pincode: {
                            value: `${response.customerPincode}` || "",
                            isValid: true,
                        },
                        consentPending: response['Consent Pending'],
                        iscoapplicant: response.iscoapplicant,
                        isguarantor: response.isguarantor,
                        leadCode: response.leadCode || "",
                        mainapplicantUniqueId: response.mainapplicantUniqueId,
                        leadName: response.leadName,
                        selectedSourceType: response.sourceType || "",
                        selectedBranch: { label: response.branchName, value: response.branchName } || {
                            label: "",
                            value: ""
                        },
                        selectedItem: { label: response.sourceName, value: response.sourceName } || {
                            label: "",
                            value: ""
                        },
                        productId: response.productId,
                        id: response.id,
                    }, () => {
                        this.props.branchNAME({
                            data: {
                                employeeId: this.state.employeeId,
                            },
                            callback: (response) => {
                                const tempbranchArray = [];
                                for (const branch of response.data) {
                                    tempbranchArray.push({
                                        label: branch.branchName,
                                        value: branch.branchName,
                                        id: branch.id,
                                    });
                                }
                                this.setState({ dropDownItemBranch: [...tempbranchArray] || [] });
                            },
                        });
                        if (this.state.selectedSourceType === 'Dealer') {
                            this.props.dealerAPI({
                                data: {
                                    branch: this.state.selectedBranch.value
                                },
                                callback: (response) => {
                                    const tempDealerArray = [];
                                    for (const dealer of response.data) {

                                        tempDealerArray.push({
                                            label: dealer.dealer_name,
                                            value: dealer.dealer_name,
                                            id: dealer.id,
                                        })
                                    }
                                    this.setState({ dropDownItem: [...tempDealerArray] || [] })
                                }
                            }
                            );
                        } else {
                            this.props.dsaAPI(
                                {
                                    callback: (response) => {
                                        const tempDsaArray = [];
                                        for (const dsa of response.data) {
                                            tempDsaArray.push({
                                                label: `${dsa.companyname} - ${dsa.dsacode}`,
                                                /*      value: dsa.dsacode ? dsa.dsacode : dsa.companyname */
                                                value: dsa.companyname,
                                                id: dsa.dsacode
                                            })
                                        }
                                        this.setState({ dropDownItemDSA: [...tempDsaArray] || [] })
                                    },
                                }
                            );
                        }
                    })
                }
            });
        } else {

            this.props.getLeadDetailsEditPageAPI({
                data: { id: this.state.id },

                callback: (response) => {
                    this.setState({
                        customerName: { ...this.state.customerName, value: response.data.leadName } || { ...this.state.customerName },
                        firstName: { ...this.state.firstName, value: response.data.firstName } || { ...this.state.firstName },
                        middleName: { ...this.state.middleName, value: response.data.middleName } || { ...this.state.middleName },
                        lastName: { ...this.state.lastName, value: response.data.lastName } || { ...this.state.lastName },
                        emailAddress: { ...this.state.emailAddress, value: response.data.customerEmail } || { ...this.state.emailAddress },
                        panNumber: { ...this.state.panNumber, value: response.data.pan } || { ...this.state.pan },
                        mobileNumber: { ...this.state.mobileNumber, value: "" + response.data.customerMobile } || { ...this.state.mobileNumber },
                        city: response?.data?.city,
                        state: response?.data?.state,
                        pincode: {
                            ...this.state.pincode, value: "" + response.data.customerPincode
                        } || { ...this.state.pincode },
                        selectedBranch: { label: response.data.branchName, value: response.data.branchName } || {
                            label: "",
                            value: ""
                        },
                        selectedItem: { label: (response?.data?.sourceName) == 'Choose Dealership of Your Choice!'? null : (response?.data?.sourceName), 
                                        value: (response?.data?.sourceName) == 'Choose Dealership of Your Choice!'? null : (response?.data?.sourceName) } || {
                            label: "",
                            value: ""
                        },
                        productId: response.data.productId || "",
                        selectedSourceType: response.data.sourceType || ""
                    }, () => {
                        this.props.branchNAME({
                            data: {
                                employeeId: this.state.employeeId,
                            },
                            callback: (response) => {
                                const tempbranchArray = [];
                                for (const branch of response.data) {

                                    tempbranchArray.push({
                                        label: branch.branchName,
                                        value: branch.branchName,
                                        id: branch.id,
                                    });
                                }
                                this.setState({ dropDownItemBranch: [...tempbranchArray] || [] });
                            },
                        });
                        if (this.state.selectedSourceType === 'Dealer') {

                            this.props.dealerAPI({
                                data: {
                                    branch: this.state.selectedBranch.value
                                },
                                callback: (response) => {
                                    const tempDealerArray = [];
                                    for (const dealer of response.data) {

                                        tempDealerArray.push({
                                            label: dealer.dealer_name,
                                            value: dealer.dealer_name,
                                            id: dealer.id,
                                        })
                                    }

                                    this.setState({ dropDownItem: [...tempDealerArray] || [] })
                                }
                            }
                            );
                        } else {
                            this.props.dsaAPI(
                                {
                                    callback: (response) => {
                                        const tempDsaArray = [];
                                        for (const dsa of response.data) {
                                            tempDsaArray.push({
                                                label: `${dsa.companyname} - ${dsa.dsacode}`,
                                                /*      value: dsa.dsacode ? dsa.dsacode : dsa.companyname */
                                                value: dsa.companyname,
                                                id: dsa.dsacode
                                            })
                                        }
                                        this.setState({ dropDownItemDSA: [...tempDsaArray] || [] })
                                    },
                                }
                            );
                        }
                    })
                },
            });

        }
    }

    renderBranchDropDown() {
        const {
            separatorStyle,
            textStyle,
            errorLabel,
            sourceTypeLabelStyle,
            inputContainer,
        } = EditStyles;
        if (this.state.iscoapplicant || this.state.isguarantor) {
            return (
                <View>
                    <Text style={sourceTypeLabelStyle}>
                        {EDIT_CONST.BRANCH_NAME_LABEL}
                    </Text>
                    <View style={inputContainer}>
                        <Text style={[textStyle, { marginTop: -20 }]}>{this.state.selectedBranch.value}</Text>
                    </View>
                </View>
            );
        }
        return (
            <View style={{
                ...(Platform.OS !== 'android' && {
                    zIndex: 10
                })
            }}>
                <DropDownPicker
                    disabled={this.state.isViewOnly}
                    items={this.state.dropDownItemBranch}
                    containerStyle={{ flex: 1 }}
                    style={{ backgroundColor: '#ffffff', borderWidth: 0 }}
                    itemStyle={{
                        justifyContent: 'flex-start',
                        marginLeft: 4
                    }}
                    // defaultValue={this.state.selectedItem.value}
                    placeholder={this.state.selectedBranch.value}
                    dropDownStyle={{ backgroundColor: '#ffffff' }}
                    onChangeItem={item => 
                        this.setState({
                             selectedBranch: { label: item.value, value: item.value } 
                            },()=>{
                                this.props.dealerAPI({
                                    data: {
                                      branch: this.state.selectedBranch.label,
                                    },
                                    callback: (response) => {
                                      const tempDealerArray = [];
                                      for (const dealer of response.data) {
                                        tempDealerArray.push({
                                          label: dealer.dealer_name,
                                          value: dealer.dealer_name,
                                          id: dealer.id,
                                        });
                                      }
                                      this.setState({ dropDownItem: [...tempDealerArray] || [] });
                                    },
                                  });
                            })}
                    customArrowUp={() => <Image source={UP_ARROW} />}
                    customArrowDown={() => <Image source={DOWN_ARROW} />}
                    labelStyle={textStyle}
                    selectedLabelStyle={textStyle}
                />
                <View style={separatorStyle} />
            </View>
        );
    }

    renderDropDown() {
        const { separatorStyle, textStyle, textInputStyle, sourceTypeLabelStyle, inputContainer, } = EditStyles;
        if (this.state.iscoapplicant || this.state.isguarantor) {
            return (
                <View>
                    <Text style={sourceTypeLabelStyle}>
                        {EDIT_CONST.SOURCE_NAME_LABEL}
                    </Text>
                    <View style={inputContainer}>
                        <Text style={[textStyle, { marginTop: -20 }]}>{this.state.selectedItem.value}</Text>
                    </View>
                </View>
            );
        }
        return (
            <View style={{
                ...(Platform.OS !== 'android' && {
                    zIndex: 10
                })
            }}>
                <DropDownPicker
                    disabled={this.state.isViewOnly}
                    items={this.state.dropDownItem}
                    containerStyle={{ flex: 1 }}
                    style={{ backgroundColor: '#ffffff', borderWidth: 0 }}
                    itemStyle={{
                        justifyContent: 'flex-start',
                        marginLeft: 4
                    }}
                    // defaultValue={this.state.selectedItem.value}
                    placeholder={this.state.selectedItem.value}
                    dropDownStyle={{ backgroundColor: '#ffffff' }}
                    onChangeItem={item => this.setState({ selectedItem: { label: item.value, value: item.value } })}
                    customArrowUp={() => <Image source={UP_ARROW} />}
                    customArrowDown={() => <Image source={DOWN_ARROW} />}
                    labelStyle={textStyle}
                    selectedLabelStyle={textStyle}
                />
                <View style={separatorStyle} />
            </View>
        );
    }

    renderDSADropDown() {
        const { separatorStyle, textStyle, textInputStyle, sourceTypeLabelStyle, inputContainer, } = EditStyles;
        if (this.state.iscoapplicant || this.state.isguarantor) {
            return (
                <View>
                    <Text style={sourceTypeLabelStyle}>
                        {EDIT_CONST.SOURCE_NAME_LABEL}
                    </Text>
                    <View style={inputContainer}>
                        <Text style={[textStyle, { marginTop: -20 }]}>{this.state.selectedItem.value}</Text>
                    </View>
                </View>
            );
        }
        return (
            <View style={{
                ...(Platform.OS !== 'android' && {
                    zIndex: 10
                })
            }}>
                <DropDownPicker
                    disabled={this.state.isViewOnly}
                    items={this.state.dropDownItemDSA}
                    containerStyle={{ flex: 1 }}
                    style={{ backgroundColor: '#ffffff', borderWidth: 0 }}
                    itemStyle={{
                        justifyContent: 'flex-start',
                        marginLeft: 4
                    }}
                    // defaultValue={this.state.selectedItem.value}
                    placeholder={this.state.selectedItem.value}
                    dropDownStyle={{ backgroundColor: '#ffffff' }}
                    onChangeItem={item => this.setState({ selectedItem: { label: item.value, value: item.value } })}
                    customArrowUp={() => <Image source={UP_ARROW} />}
                    customArrowDown={() => <Image source={DOWN_ARROW} />}
                    labelStyle={textStyle}
                    selectedLabelStyle={textStyle}
                />
                <View style={separatorStyle} />
            </View>
        );
    }
    render() {
        const { separatorStyle, colorText, textInputStyleMargin, textInputStyle1, textInputStyle, errorLabel, mainContainer, buttonContainer1, cancelButtonStyle, cancelButtonTitleStyle } = EditStyles;
        return (
            <WaveBackground>
                <ScrollView>
                    <Header
                        label={`Edit Lead - ${this.state.title}`}
                        showLeftIcon={false}
                        customTextStyle={{ flex: 1 }}
                        onPress={() => {

                        }
                        } />
                    <View style={mainContainer}>
                        {/* <Text style={colorText}>Source Type</Text>
                        <Text style={textInputStyleMargin}>{this.state.selectedSourceType}</Text> */}
                        {this.state.selectedSourceType.toLowerCase() !== "direct" && <Text style={[textInputStyle, {}]}>
                            {CONSENT_PENDING_CONST.BRANCH_NAME}</Text>}
                        {this.state.selectedSourceType.toLowerCase() !== "direct" && this.renderBranchDropDown()}

                        {this.state.selectedSourceType.toLowerCase() === "dealer" && <Text style={[textInputStyle, {}]}>{this.state.selectedSourceType}*</Text>}
                        {this.state.selectedSourceType.toLowerCase() === "dsa" && <Text style={[textInputStyle, {}]}>{this.state.selectedSourceType}*</Text>}
                        {/* {this.state.selectedSourceType === 'Dealer' ? this.renderDropDown() : this.renderDSADropDown()} */}
                        {this.state.selectedSourceType.toLowerCase() === "dealer" && this.renderDropDown()}
                        {this.state.selectedSourceType.toLowerCase() === "dsa" && this.renderDSADropDown()}

                        <Text style={textInputStyle}>{EDIT_CONST.FIRST_NAME}</Text>
                        <TextInput
                            style={textInputStyle1}
                            editable={!this.state.isViewOnly}
                            value={this.state.firstName.value}
                            onChangeText={(text) => {
                                this.setState({
                                    firstName: {
                                        ...this.state.firstName,
                                        value: text,
                                    }
                                }, () => { this.isfirstName(this.state.firstName.value) });
                            }}
                            placeholder={EDIT_CONST.FIRST_NAME}
                            maxLength={20}
                        />
                        <View style={separatorStyle} />
                        {!this.state.firstName.isValid && <Text style={errorLabel}>{(this.state.firstName.value === "" || this.state.firstName.value === null) ?
                            EDIT_CONST.MANDATORY_FIRST_NAME : EDIT_CONST.VALID_FIRST_NAME}</Text>}

                        <Text style={textInputStyle}>{EDIT_CONST.MIDDLE_NAME}</Text>
                        <TextInput
                            style={textInputStyle1}
                            editable={!this.state.isViewOnly}
                            value={this.state.middleName.value}
                            onChangeText={(text) => {
                                this.setState({
                                    middleName: {
                                        ...this.state.middleName,
                                        value: text,
                                    }
                                }, () => { this.ismiddleName(this.state.middleName.value) });
                            }}
                            placeholder={EDIT_CONST.MIDDLE_NAME}
                            maxLength={20}
                        />
                        <View style={separatorStyle} />
                        {!this.state.middleName.isValid && <Text style={errorLabel}>{EDIT_CONST.VALID_CUSTOMER_NAME}</Text>}

                        <Text style={textInputStyle}>{EDIT_CONST.LAST_NAME}</Text>
                        <TextInput
                            style={textInputStyle1}
                            editable={!this.state.isViewOnly}
                            value={this.state.lastName.value}
                            onChangeText={(text) => {
                                this.setState({
                                    lastName: {
                                        ...this.state.lastName,
                                        value: text,
                                    }
                                }, () => { this.isCustomerName(this.state.lastName.value) });
                            }}
                            placeholder={EDIT_CONST.LAST_NAME}
                            maxLength={20}
                        />
                        <View style={separatorStyle} />
                        {!this.state.lastName.isValid && <Text style={errorLabel}>{(this.state.lastName.value === "" || this.state.lastName.value === null) ?
                            EDIT_CONST.MANDATORY_LAST_NAME : EDIT_CONST.VALID_LAST_NAME}</Text>}

                        <Text style={textInputStyle}>{EDIT_CONST.MOBILE_NUMBER}</Text>
                        <TextInput
                            style={textInputStyle1}
                            editable={!this.state.isViewOnly}
                            value={this.state.mobileNumber.value}
                            keyboardType={'numeric'}
                            onChangeText={(text) => {
                                this.setState({
                                    mobileNumber: {
                                        ...this.state.mobileNumber,
                                        value: text,
                                    }
                                }, () => { this.ismobileNumber(this.state.mobileNumber.value) });
                            }}
                            placeholder={EDIT_CONST.MOBILE_NUMBER}
                            maxLength={10}
                        />
                        <View style={separatorStyle} />
                        {!this.state.mobileNumber.isValid && <Text style={errorLabel}>{(this.state.mobileNumber.value === "" || this.state.mobileNumber.value === null) ?
                            EDIT_CONST.MANDATORY_PHONE : EDIT_CONST.VALID_PHONE}</Text>}
                        <Text style={textInputStyle}>{EDIT_CONST.EMAIL}</Text>
                        
                        <TextInput
                            value={this.state.emailAddress.value}
                            editable={!this.state.isViewOnly}
                            onChangeText={(text) => {
                                this.setState({
                                    emailAddress: {
                                        ...this.state.emailAddress,
                                        value: text,
                                    }
                                }, () => { this.isemailAddress(this.state.emailAddress.value) });
                            }}
                            placeholder={EDIT_CONST.EMAIL}
                            style={textInputStyle1}
                            maxLength={30}
                        />
                        <View style={separatorStyle} />
                        {!this.state.emailAddress.isValid && <Text style={errorLabel}>{(this.state.emailAddress.value === "" || this.state.emailAddress.value === null) ?
                            EDIT_CONST.MANDATORY_EMAIL : EDIT_CONST.VALID_EMAIL}</Text>}
                       
                       <Text style={textInputStyle}>{"Pan Number"}</Text>
                       <TextInput
                            value={this.state.panNumber.value}
                            editable={!this.state.isViewOnly}
                            
                            onChangeText={(text) => {
                                this.setState(
                                    {
                                      panNumber: {
                                        ...this.state.panNumber,
                                        value: text,
                                      },
                                    },
                                    () => {
                                      this.isPanValid(this.state.panNumber.value);
                                      if (this.state.panNumber.value.length === 10) {
                                        this.setState({
                                          panNumber: {
                                            ...this.state.panNumber,
                                            value: text.toUpperCase(),
                                          },
                                        }, () => {
                                          this.isPanValid(this.state.panNumber.value);
                                        })
                                      }
                                    },
                                  );    
                            }}
                            placeholder={'Pan Number'}
                            style={textInputStyle1}
                            maxLength={30}
                        />
                        <View style={separatorStyle} />
                        {!this.state.panNumber.isValid && <Text style={errorLabel}>{(this.state.panNumber.value === "" || this.state.panNumber.value === null) ?
                            EDIT_CONST.MANDATORY_PAN : EDIT_CONST.VALID_PAN}</Text>}
                       
                       
                        <Text style={textInputStyle}>{EDIT_CONST.PINCODE}</Text>
                        <TextInput
                            value={this.state.pincode.value}
                            editable={!this.state.isViewOnly}
                            keyboardType={'numeric'}
                            onChangeText={(text) => {
                                const valid = pincodeRegex1.test(text);
                    
                                this.setState(
                                  {
                                    pincode: {
                                      ...this.state.pincode,
                                      value: text,
                                      isValid:  valid
                                    },
                                  },
                                  () => {
                                    // this.ispincode(this.state.pincode.value);
                                    if (
                                      this.state.pincode.value.length === 6 && this.state.pincode.isValid
                                    ) {
                                      this.getDataFromPincode(text);
                                    }
                                  },
                                );
                              }}
                            placeholder={EDIT_CONST.PINCODE}
                            style={textInputStyle1}
                            maxLength={6}
                        />
                        <View style={separatorStyle} />
                        {!this.state.pincode.isValid && <Text style={errorLabel}>{(this.state.pincode.value === "" || this.state.pincode.value === null) ?
                            EDIT_CONST.MANDATORY_PINCODE : EDIT_CONST.VALID_PINCODE}</Text>}
                        <View style={buttonContainer1}>
                            <Button
                                title={EDIT_CONST.BUTTON_TITLE_CANCEL}
                                onPress={() => { this.props.navigation.navigate("LeadList") }}
                                customContainerStyle={cancelButtonStyle}
                                cutomTitleStyle={cancelButtonTitleStyle} />
                            <Button
                                isDisabled={this.state.isViewOnly}
                                title={EDIT_CONST.BUTTON_TITLE_SAVE}
                                onPress={() => {
                                    this.isfirstName(this.state.firstName.value)
                                    this.ismiddleName(this.state.middleName.value)
                                    this.islastName(this.state.lastName.value)
                                    this.isemailAddress(this.state.emailAddress.value)
                                    this.isPanValid(this.state.panNumber.value);
                                    this.ispincode(this.state.pincode.value)
                                    this.ismobileNumber(this.state.mobileNumber.value)
                                    if (this.state.firstName.value != "" && this.state.firstName.value != null && this.state.firstName.isValid &&
                                        this.state.middleName.isValid &&
                                        this.state.lastName.value != "" && this.state.lastName.value != null && this.state.lastName.isValid &&
                                        this.state.emailAddress.value != "" && this.state.emailAddress.value != null && this.state.emailAddress.isValid &&
                                        this.state.panNumber.value != "" && this.state.panNumber.value != null && this.state.panNumber.isValid &&
                                        this.state.pincode.value != "" && this.state.pincode.value != null && this.state.pincode.isValid &&
                                        this.state.mobileNumber.value != "" && this.state.mobileNumber.value != null && this.state.mobileNumber.isValid) {
                                        if (this.state.iscoapplicant || this.state.isguarantor) {
                                            const dataToAPI = {
                                                customerEmail: this.state.emailAddress.value,
                                                pan: this.state.panNumber.value,
                                                customerMobile: this.state.mobileNumber.value,
                                                customerPincode: this.state.pincode.value,
                                                iscoapplicant: this.state.iscoapplicant,
                                                // this.props.navigation.state.params.applicantFlow === 'coapplicant' ? true : false,
                                                isguarantor: this.state.isguarantor,
                                                leadCode: this.state.leadCode,
                                                firstName: this.state.firstName.value,
                                                middleName: this.state.middleName.value,
                                                lastName: this.state.lastName.value,
                                                customerName:
                                                    this.state.firstName.value +
                                                    ' ' +
                                                    (this.state.middleName.value || '') +
                                                    ' ' +
                                                    this.state.lastName.value,
                                                mainapplicantUniqueId: this.state.mainapplicantUniqueId,
                                                productId: this.state.productId,
                                                sourceName: this.state.selectedItem.value,
                                                sourceType: this.state.selectedSourceType,
                                                branchName: this.state.selectedBranch.value,
                                                id: this.state.id,
                                                // branchName: this.state.branchName,
                                                city:this.state.city,
                                                state: this.state.state,
                                                consentStatus: this.state.consentPending,
                                                coapplicantUniqueId: this.state.coapplicantUniqueId,
                                                "coSaveScheme": false
                                            };
                                            console.log("ccccccccc",dataToAPI);
                                            this.props.saveCoAppGuarantor({
                                                dataToAPI,
                                                callback: (response) => {
                                                    this.props.navigation.navigate("ConsentPending", { id: response.id, applicantUniqueId: response.mainapplicantUniqueId, leadCode: response.leadCode, title: this.state.title, coapplicantUniqueId: response.coapplicantUniqueId, ismainapplicant: this.state.ismainapplicant, isguarantor: this.state.isguarantor })
                                                }
                                            });
                                        }
                                        else {
                                            this.props.editLeadDetailsAPI({
                                                data: {
                                                    id: this.state.id,
                                                    productId: this.state.productId,
                                                    selectedSourceType: this.state.selectedSourceType,
                                                    selectedItem: this.state.selectedItem.value,
                                                    customerName:
                                                        this.state.firstName.value +
                                                        ' ' +
                                                        (this.state.middleName.value || '') +
                                                        ' ' +
                                                        this.state.lastName.value,
                                                        city:this.state.city,
                                                        state: this.state.state,
                                                    firstName: this.state.firstName.value,
                                                    middleName: this.state.middleName.value,
                                                    lastName: this.state.lastName.value,
                                                    emailAddress: this.state.emailAddress.value,
                                                    pan: this.state.panNumber.value,
                                                    pincode: this.state.pincode.value,
                                                    mobileNumber: this.state.mobileNumber.value,
                                                    applicantUniqueId: this.state.applicantUniqueId,
                                                    branchName: this.state.selectedBranch.value,
                                                    employeeId: this.state.employeeId
                                                },
                                                callback: (leadData) => {
                                                    this.props.navigation.navigate("ConsentPending", { id: leadData.data.id, applicantUniqueId: leadData.data.applicantUniqueId, leadCode: leadData.data.leadCode, title: this.state.title })
                                                },
                                            });
                                        }
                                    }
                                }} />
                        </View>
                    </View>
                </ScrollView>
            </WaveBackground>
        );
    }
}
Edit.propTypes = {
    userDataSelector: PropTypes.object,
};

export default compose(
    container,
    withProps(() => { }),
)(Edit);