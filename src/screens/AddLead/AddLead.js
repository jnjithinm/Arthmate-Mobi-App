import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Image, Keyboard, Platform, StatusBar, Text, View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { FloatingLabelInput } from 'react-native-floating-label-input';
import { ScrollView } from 'react-native-gesture-handler';
import { compose, withProps } from 'recompose';
import { Button } from '../../components/Button/Button';
import { Header } from '../../components/Header/Header';
import { RadioButton } from '../../components/RadioButton/RadioButton';
import { WaveBackground } from '../../components/WaveBackground/WaveBackground';
import * as colors from '../../constants/colors';
import { DOWN_ARROW, UP_ARROW } from '../../constants/imgConsts';
import { ADD_LEAD_CONST } from '../../constants/screenConst';
import container from '../../container/AddLead/index';
import { AddLeadStyles } from './AddLeadStyles';

const pincodeRegex1 = /^[1-9][0-9]{5}$/;

class AddLead extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sourceType: [
        {
          title: 'Dealer',
          isSelected: false,
        },
        // {
        //   title: 'DSA',
        //   isSelected: false,
        // },
        // {
        //   title: 'Direct',
        //   isSelected: false,
        // },
        /*   {
                      title: "Reference",
                      isSelected: true,
                  }, */
      ],
      city: '',
      state: '',
      selectedSourceType: 'Dealer',
      dropDownItem: [],
      dropDownItemDSA: [],
      customerName: {
        value: '',
        isValid: true,
      },
      emailAddress: {
        value: '',
        isValid: true,
      },
      panNumber: {
        value: '',
        isValid: true,
      },
      pincode: {
        value: '',
        isValid: true,
      },
      mobileNumber: {
        value: '',
        isValid: true,
      },
      selectedItem: {
        isValid: true,
      },
      selectedBranch: {
        isValid: true,
      },
      productId: '',
      title: this.props.navigation.state.params.title,
      ismainapplicant:
        this.props.navigation.state.params.applicantFlow === 'coapplicant'
          ? false
          : true,
      isguarantor:
        this.props.navigation.state.params.applicantFlow === 'guarantor'
          ? true
          : false,
      leadName: this.props.navigation.state.params.leadName || '',
      mainApplicantUniqueId:
        this.props.navigation.state.params.mainApplicantUniqueId || '',
      leadCode: this.props.navigation.state.params.leadCode || '',
      iscoapplicant:
        this.props.navigation.state.params.applicantFlow === 'coapplicant'
          ? true
          : false,
      employeeId: (this.props.userDataSelector?.userData?.data?.employeeId) || "",
      branchName: (this.props.userDataSelector?.userData?.data?.branchName) || "",
      buttonPress: false,
      dropDownItemBranch: [],
      firstName: {
        value: '',
        isValid: true,
      },
      middleName: {
        value: '',
        isValid: true,
      },
      lastName: {
        value: '',
        isValid: true,
      },
    };
  }
  isfirstName(text) {
    let valid = false;
    const customerRegex = /^[a-zA-Z\s]*$/;
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
    const customerRegex = /^[a-zA-Z\s]*$/;
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
    const customerRegex = /^[a-zA-Z\s]*$/;
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
    //const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (text != '' && text != null && emailRegex.test(text)) {
      valid = true;
    }

    this.setState({
      emailAddress: {
        ...this.state.emailAddress,
        isValid: valid,
      },
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
    if (text != '' && text != null && pincodeRegex.test(text)) {
      valid = true;
    }

    this.setState({
      pincode: {
        ...this.state.pincode,
        isValid: valid,
      },
    });
  }
  ismobileNumber(text) {
    let valid = false;
    const mobileRegex = /^[6-9]\d{9}$/;
    if (text != '' && text != null && mobileRegex.test(text)) {
      valid = true;
    }

    this.setState({
      mobileNumber: {
        ...this.state.mobileNumber,
        isValid: valid,
      },
    });
  }

  isSelectedItem() {
    if (this.state.selectedItem.value == null) {
      this.setState({
        selectedItem: {
          isValid: false,
        },
      });
    }
  }

  isSelectedBranch() {
    if (this.state.selectedBranch.value == null) {
      this.setState({
        selectedBranch: {
          isValid: false,
        },
      });
    }
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

  componentDidMount() {
   if (this.props.navigation.state.params.title === 'New Two Wheeler') {
      this.setState({ productId: 1 });
    } else if (
      this.props.navigation.state.params.title === 'Electric Two Wheeler'
    ) {
      this.setState({ productId: 2 });
    } else if (
      this.props.navigation.state.params.title === 'Used Two Wheeler'
    ) {
      this.setState({ productId: 3 });
    } else if (
      this.props.navigation.state.params.title === 'Other Two Wheeler'
    ) {
      this.setState({ productId: 4 });
    }

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

    this.props.dsaAPI({
      callback: (response) => {
        const tempDsaArray = [];
        for (const dsa of response.data) {
          tempDsaArray.push({
            label: `${dsa.companyname} - ${dsa.dsacode}`,
            /*      value: dsa.dsacode ? dsa.dsacode : dsa.companyname */
            value: dsa.companyname,
            id: dsa.dsacode,
          });
        }
        this.setState({ dropDownItemDSA: [...tempDsaArray] || [] });
      },
    });

    if (
      this.props.navigation.state.params.iscoapplicant ||
      this.props.navigation.state.params.isguarantor
    ) {
      try {
        const { id } = this.props.navigation.state.params;
        this.props.getLeadDetailsEditPageAPI({
          data: { id },
          callback: (response) => {
            const {
              applicantUniqueId,
              leadCode,
              productId,
              sourceType,
              sourceName,
              branchName,
            } = response.data;
            const data = {

              isguarantor: this.props.navigation.state.params.isguarantor,
              iscoapplicant: this.props.navigation.state.params.iscoapplicant,
              leadCode: leadCode,
              mainapplicantUniqueId: applicantUniqueId,
              productId: productId,
              selectedItem: { ...this.state.selectedItem, value: sourceName },
              selectedSourceType: sourceType,
              ismainapplicant: false,
              selectedBranch: { ...this.state.selectedBranch, value: branchName },
            };
            this.setState({ ...data });
          },
        });
      } catch (err) {
      }
    }
  }

  selectRadioButton(value, index) {
    this.setState({
      selectedSourceType: value.title,
      lastName: {
        value: '',
        isValid: true,
      },
      firstName: {
        value: '',
        isValid: true,
      },
      middleName: {
        value: '',
        isValid: true,
      },
      emailAddress: {
        value: '',
        isValid: true,
      },
      pincode: {
        value: '',
        isValid: true,
      },
      mobileNumber: {
        value: '',
        isValid: true,
      },
      selectedItem: {
        isValid: true,
      },
      selectedBranch: {
        isValid: true,
      },
    });
  }

  renderDropDownBranchName() {
    const {
      separatorStyle,
      textStyle,
      errorLabel,
      sourceTypeLabelStyle,
      inputContainer,
    } = AddLeadStyles;
    if (!this.state.ismainapplicant) {
      return (
        <View>
          <Text style={sourceTypeLabelStyle}>
            {ADD_LEAD_CONST.BRANCH_NAME_LABEL}
          </Text>
          <View style={inputContainer}>
            <Text style={textStyle}>{this.state.selectedBranch.value}</Text>
          </View>
        </View>
      );
    }
    return (
      <View
        style={{
          ...(Platform.OS !== 'android' && {
            zIndex: 10,
          }),
        }}>
        <DropDownPicker
          items={this.state.dropDownItemBranch}
          containerStyle={{ flex: 1, marginTop: 5, marginBottom: 10 }}
          zIndex={10}
          style={{ backgroundColor: '#ffffff', borderWidth: 0 }}
          itemStyle={{
            justifyContent: 'flex-start',
            marginLeft: 4,
          }}
          placeholder={ADD_LEAD_CONST.PLACEHOLDER_DROPDOWN_BRANCH}
          dropDownStyle={{ backgroundColor: '#ffffff' }}
          onChangeItem={(item) =>
            this.setState({ selectedBranch: { ...item, isValid: true } }, () => {
              this.props.dealerAPI({
                data: {
                  branch: this.state.selectedBranch.label,
                  employeeId: this.props.userDataSelector?.userData?.data?.employeeId
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
            })
          }
          customArrowUp={() => <Image source={UP_ARROW} />}
          customArrowDown={() => <Image source={DOWN_ARROW} />}
          labelStyle={textStyle}
          selectedLabelStyle={textStyle}
        />

        <View style={separatorStyle} />
        {!this.state.selectedBranch.isValid && (
          <Text style={errorLabel}>Branch name is mandatory.</Text>
        )}
      </View>
    );
  }
  renderDropDown() {
    const {
      separatorStyle,
      textStyle,
      errorLabel,
      sourceTypeLabelStyle,
      inputContainer
    } = AddLeadStyles;
    if (!this.state.ismainapplicant) {
      return (
        <View>
          <Text style={sourceTypeLabelStyle}>
            {ADD_LEAD_CONST.SOURCE_NAME_LABEL}
          </Text>
          <View style={inputContainer}>
            <Text style={textStyle}>{this.state.selectedItem.value}</Text>
          </View>
        </View>
      );
    }
    return (
      <View
        style={{
          ...(Platform.OS !== 'android' && {
            zIndex: 10,
          }),
        }}>
        <DropDownPicker
          items={this.state.dropDownItem}
          containerStyle={{ flex: 1, marginTop: 15, marginBottom: 10 }}
          searchable={true}
          zIndex={10}
          style={{ backgroundColor: '#ffffff', borderWidth: 0 }}
          itemStyle={{
            justifyContent: 'flex-start',
            marginLeft: 4,
          }}
          placeholder={ADD_LEAD_CONST.PLACEHOLDER_DROPDOWN_DEALER}
          dropDownStyle={{ backgroundColor: '#ffffff' }}
          onChangeItem={(item) =>
            this.setState({ selectedItem: { value: item.value, isValid: true } })
          }
          customArrowUp={() => <Image source={UP_ARROW} />}
          customArrowDown={() => <Image source={DOWN_ARROW} />}
          labelStyle={textStyle}
          selectedLabelStyle={textStyle}
        />

        <View style={separatorStyle} />
        {!this.state.selectedItem.isValid && (
          <Text style={errorLabel}>Dealer is mandatory.</Text>
        )}
      </View>
    );
  }

  renderDSADropDown() {
    const { separatorStyle, textStyle, errorLabel, sourceTypeLabelStyle, inputContainer } = AddLeadStyles;
    if (!this.state.ismainapplicant) {
      return (
        <View>
          <Text style={sourceTypeLabelStyle}>
            {ADD_LEAD_CONST.SOURCE_NAME_LABEL}
          </Text>
          <View style={inputContainer}>
            <Text style={textStyle}>{this.state.selectedItem.value}</Text>
          </View>
        </View>
      );
    }
    return (
      <View
        style={{
          ...(Platform.OS !== 'android' && {
            zIndex: 10,
          }),
        }}>
        <DropDownPicker
          items={this.state.selectedBranch.value === undefined ? [] : this.state.dropDownItemDSA}
          containerStyle={{ flex: 1, marginTop: 15, marginBottom: 10 }}
          style={{ backgroundColor: '#ffffff', borderWidth: 0 }}
          itemStyle={{
            justifyContent: 'flex-start',
            marginLeft: 4,
          }}
          placeholder={ADD_LEAD_CONST.PLACEHOLDER_DROPDOWN_DSA}
          dropDownStyle={{ backgroundColor: '#ffffff' }}
          onChangeItem={(item) =>
            this.setState({ selectedItem: { value: item.value, isValid: true } })
          }
          customArrowUp={() => <Image source={UP_ARROW} />}
          customArrowDown={() => <Image source={DOWN_ARROW} />}
          labelStyle={textStyle}
          selectedLabelStyle={textStyle}
        />
        <View style={separatorStyle} />
        {!this.state.selectedItem.isValid && (
          <Text style={errorLabel}>DSA is mandatory.</Text>
        )}
      </View>
    );
  }

  renderInputs() {
    const {
      separatorStyle,
      textInputStyle,
      errorLabel,
      inputStyle1,
    } = AddLeadStyles;

    return (
      <View>
        <FloatingLabelInput
          inputStyles={textInputStyle}
          value={this.state.mobileNumber.value || undefined}
          keyboardType={'numeric'}
          maxLength={10}
          onChangeText={(text) => {
            this.setState(
              {
                mobileNumber: {
                  ...this.state.mobileNumber,
                  value: text,
                },
              },
              () => {
                this.ismobileNumber(this.state.mobileNumber.value);
              },
            );
          }}
          label={ADD_LEAD_CONST.PLACEHOLDER_MOBILE}
          containerStyles={inputStyle1}
          customLabelStyles={{
            colorFocused: colors.COLOR_BLUE,
            colorBlurred: colors.COLOR_LIGHT_GREY,
            fontSizeFocused: 15,
            fontSizeBlurred: 15,
          }}
        />
        <View style={separatorStyle} />
        {!this.state.mobileNumber.isValid && (
          <Text style={errorLabel}>
            {this.state.mobileNumber.value === '' ||
              this.state.mobileNumber.value === null
              ? ADD_LEAD_CONST.MANDATORY_PHONE
              : ADD_LEAD_CONST.VALID_PHONE}
          </Text>
        )}

        <FloatingLabelInput
          value={this.state.emailAddress.value || undefined}
          maxLength={50}
          onChangeText={(text) => {
            this.setState(
              {
                emailAddress: {
                  ...this.state.emailAddress,
                  value: text,
                },
              },
              () => {
                this.isemailAddress(this.state.emailAddress.value);
              },
            );
          }}
          label={ADD_LEAD_CONST.PLACEHOLDER_EMAIL}
          inputStyles={textInputStyle}
          containerStyles={inputStyle1}
          customLabelStyles={{
            colorFocused: colors.COLOR_BLUE,
            colorBlurred: colors.COLOR_LIGHT_GREY,
            fontSizeFocused: 15,
            fontSizeBlurred: 15,
          }}
        />
        <View style={separatorStyle} />
        {!this.state.emailAddress.isValid && (
          <Text style={errorLabel}>
            {this.state.emailAddress.value === '' ||
              this.state.emailAddress.value === null
              ? ADD_LEAD_CONST.MANDATORY_EMAIL
              : ADD_LEAD_CONST.VALID_EMAIL}
          </Text>
        )}

        <FloatingLabelInput
          value={this.state.panNumber.value || undefined}
          maxLength={10}
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
          label={ADD_LEAD_CONST.LABEL_PAN_NUMBER}
          inputStyles={textInputStyle}
          containerStyles={inputStyle1}
          customLabelStyles={{
            colorFocused: colors.COLOR_BLUE,
            colorBlurred: colors.COLOR_LIGHT_GREY,
            fontSizeFocused: 15,
            fontSizeBlurred: 15,
          }}
        />
        <View style={separatorStyle} />
        {!this.state.panNumber.isValid && (
          <Text style={errorLabel}>
            {this.state.panNumber.value === '' ||
              this.state.panNumber.value === null
              ? ADD_LEAD_CONST.MANDATORY_PAN
              : ADD_LEAD_CONST.VALID_PAN}
          </Text>
        )}


        <FloatingLabelInput
          value={this.state.pincode.value || undefined}
          keyboardType={'numeric'}
          maxLength={6}
          onChangeText={(text) => {
            const valid = pincodeRegex1.test(text);

            this.setState(
              {
                pincode: {
                  ...this.state.pincode,
                  value: text,
                  isValid: valid
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
          label={ADD_LEAD_CONST.PLACEHOLDER_PINCODE}
          inputStyles={textInputStyle}
          containerStyles={inputStyle1}
          customLabelStyles={{
            colorFocused: colors.COLOR_BLUE,
            colorBlurred: colors.COLOR_LIGHT_GREY,
            fontSizeFocused: 15,
            fontSizeBlurred: 15,
          }}
        />
        <View style={separatorStyle} />
        {!this.state.pincode.isValid && (
          <Text style={errorLabel}>
            {this.state.pincode.value === '' ||
              this.state.pincode.value === null
              ? ADD_LEAD_CONST.MANDATORY_PINCODE
              : ADD_LEAD_CONST.VALID_PINCODE}
          </Text>
        )}
      </View>
    );
  }

  renderNameInput() {
    const {
      separatorStyle,
      textInputStyle,
      errorLabel,
      inputStyle1,
    } = AddLeadStyles;

    return (
      <View>
        <FloatingLabelInput
          label={ADD_LEAD_CONST.PLACEHOLDER_FIRST_NAME}
          value={this.state.firstName.value || undefined}
          maxLength={50}
          containerStyles={inputStyle1}
          onChangeText={(text) => {
            this.setState(
              {
                firstName: {
                  ...this.state.firstName,
                  value: text,
                },
              },
              () => {
                this.isfirstName(this.state.firstName.value);
              },
            );
          }}
          inputStyles={textInputStyle}
          customLabelStyles={{
            colorFocused: colors.COLOR_BLUE,
            colorBlurred: colors.COLOR_LIGHT_GREY,
            fontSizeFocused: 15,
            fontSizeBlurred: 15,
          }}
        /*  placeholder={this.state.selectedSourceType.toLowerCase() === "direct" ?
                 ADD_LEAD_CONST.PLACEHOLDER_NAME : ADD_LEAD_CONST.PLACEHOLDER_CUSTOMER_NAME} */
        />
        <View style={separatorStyle} />
        {!this.state.firstName.isValid && (
          <Text style={errorLabel}>
            {this.state.firstName.value === '' ||
              this.state.firstName.value === null
              ? ADD_LEAD_CONST.MANDATORY_CUSTOMER_NAME
              : ADD_LEAD_CONST.VALID_CUSTOMER_NAME}
          </Text>
        )}

        <FloatingLabelInput
          label={ADD_LEAD_CONST.PLACEHOLDER_MIDDLE_NAME}
          /*       style={textInputStyle} */
          value={this.state.middleName.value || undefined}
          maxLength={20}
          containerStyles={inputStyle1}
          onChangeText={(text) => {
            this.setState(
              {
                middleName: {
                  ...this.state.middleName,
                  value: text,
                },
              },
              () => {
                this.ismiddleName(this.state.middleName.value);
              },
            );
          }}
          inputStyles={textInputStyle}
          customLabelStyles={{
            colorFocused: colors.COLOR_BLUE,
            colorBlurred: colors.COLOR_LIGHT_GREY,
            fontSizeFocused: 15,
            fontSizeBlurred: 15,
          }}
        /*  placeholder={this.state.selectedSourceType.toLowerCase() === "direct" ?
                 ADD_LEAD_CONST.PLACEHOLDER_NAME : ADD_LEAD_CONST.PLACEHOLDER_CUSTOMER_NAME} */
        />
        <View style={separatorStyle} />
        {!this.state.middleName.isValid && (
          <Text style={errorLabel}>
            {ADD_LEAD_CONST.VALID_MIDDLE_NAME}
          </Text>
        )}
        <FloatingLabelInput
          label={ADD_LEAD_CONST.PLACEHOLDER_LAST_NAME}
          /*       style={textInputStyle} */
          value={this.state.lastName.value || undefined}
          maxLength={20}
          containerStyles={inputStyle1}
          onChangeText={(text) => {
            this.setState(
              {
                lastName: {
                  ...this.state.lastName,
                  value: text,
                },
              },
              () => {
                this.islastName(this.state.lastName.value);
              },
            );
          }}
          inputStyles={textInputStyle}
          customLabelStyles={{
            colorFocused: colors.COLOR_BLUE,
            colorBlurred: colors.COLOR_LIGHT_GREY,
            fontSizeFocused: 15,
            fontSizeBlurred: 15,
          }}
        /*  placeholder={this.state.selectedSourceType.toLowerCase() === "direct" ?
                 ADD_LEAD_CONST.PLACEHOLDER_NAME : ADD_LEAD_CONST.PLACEHOLDER_CUSTOMER_NAME} */
        />
        <View style={separatorStyle} />
        {!this.state.lastName.isValid && (
          <Text style={errorLabel}>
            {this.state.lastName.value === '' ||
              this.state.lastName.value === null
              ? ADD_LEAD_CONST.MANDATORY_LAST_NAME
              : ADD_LEAD_CONST.VALID_LAST_NAME}
          </Text>
        )}
      </View>
    );
  }

  renderSourceType = () => {
    const {
      textStyle
    } = AddLeadStyles;
    if (this.state.ismainapplicant) {
      return this.state.sourceType.map((value, index) => (
        <View key={index}>
          <RadioButton
            title={value.title}
            isSelected={
              this.state.selectedSourceType.toLowerCase() ===
                value.title.toLowerCase()
                ? true
                : false
            }
            onPress={() => {
              return this.selectRadioButton(value, index);
            }}
          />
        </View>
      ));
    } else {
      const asd = this.props.navigation.state.params.mainApplicant;
      return (
        <View style={{}}>
          <Text style={textStyle}>{this.state.selectedSourceType}</Text>
        </View>
      );
    }
  };

  render() {
    const {
      mainContainer,
      sourceTypeLabelStyle1,
      sourceTypeLabelStyle,
      buttonContainer,
      cancelButtonStyle,
      cancelButtonTitleStyle,
      inputContainer,
      inputContainer1,
    } = AddLeadStyles;

    return (
      <WaveBackground>
        <StatusBar
          backgroundColor={colors.COLOR_WHITE}
          barStyle={'dark-content'}
          translucent={false}
          hidden={false}
        />
        <Header
          label={`Add Lead - ${this.props.navigation.state.params.title}`}
          showLeftIcon={false}
          onPress={() => {
          }}
        />

        <ScrollView keyboardShouldPersistTaps="handled">
          <View style={mainContainer}>
            {/* <Text style={this.state.ismainapplicant ? sourceTypeLabelStyle1 : sourceTypeLabelStyle}>
              {ADD_LEAD_CONST.SOURCE_TYPE_LABEL}
            </Text> */}
            {/* <View style={this.state.ismainapplicant ? inputContainer1 : inputContainer}>{this.renderSourceType()}</View> */}

            <View style={{ marginTop: !this.state.ismainapplicant ? 0 : 20 }}>
              {this.state.selectedSourceType.toLowerCase() === 'dealer' &&
                this.renderDropDownBranchName()}
              {this.state.selectedSourceType.toLowerCase() === 'dsa' &&
                this.renderDropDownBranchName()}
              {this.state.selectedSourceType.toLowerCase() === 'dealer' &&
                this.renderDropDown()}
              {this.state.selectedSourceType.toLowerCase() === 'dsa' &&
                this.renderDSADropDown()}
              {this.renderNameInput()}
              {this.renderInputs()}
            </View>

            <View style={buttonContainer}>
              <Button
                title={ADD_LEAD_CONST.BUTTON_TITLE_CANCEL}
                onPress={() => {
                  this.props.navigation.navigate('LeadList');
                }}
                customContainerStyle={cancelButtonStyle}
                cutomTitleStyle={cancelButtonTitleStyle}
              />
              <Button
                title={ADD_LEAD_CONST.BUTTON_TITLE}
                onPress={() => {
                  Keyboard.dismiss();
                  if (this.state.selectedSourceType !== 'Direct') {
                    this.isfirstName(this.state.firstName.value);
                    this.ismiddleName(this.state.middleName.value);
                    this.islastName(this.state.lastName.value);
                    this.isemailAddress(this.state.emailAddress.value);
                    this.isPanValid(this.state.panNumber.value);
                    this.ispincode(this.state.pincode.value);
                    this.ismobileNumber(this.state.mobileNumber.value);
                    this.isSelectedItem();
                    this.isSelectedBranch();
                    if (
                      this.state.firstName.value != '' &&
                      this.state.firstName.value != null &&
                      this.state.firstName.isValid &&
                      this.state.middleName.isValid &&
                      this.state.lastName.value != '' &&
                      this.state.lastName.value != null &&
                      this.state.lastName.isValid &&
                      this.state.emailAddress.value != '' &&
                      this.state.emailAddress.value != null &&
                      this.state.panNumber.value != '' &&
                      this.state.panNumber.value != null &&
                      this.state.emailAddress.isValid &&
                      this.state.pincode.value != '' &&
                      this.state.pincode.value != null &&
                      this.state.pincode.isValid &&
                      this.state.mobileNumber.value != '' &&
                      this.state.mobileNumber.value != null &&
                      this.state.mobileNumber.isValid &&
                      this.state.selectedItem.isValid &&
                      this.state.selectedItem.value != null &&
                      this.state.selectedBranch.isValid &&
                      this.state.selectedBranch.value != null
                    ) {
                      Keyboard.dismiss();
                      if (
                        this.props.navigation.state.params.applicantFlow &&
                        (this.props.navigation.state.params.applicantFlow ===
                          'coapplicant' ||
                          this.props.navigation.state.params.applicantFlow ===
                          'guarantor')
                      ) {
                        const dataToAPI = {
                          customerEmail: this.state.emailAddress.value,
                          pan: this.state.panNumber.value,
                          customerMobile: this.state.mobileNumber.value,
                          customerPincode: this.state.pincode.value,
                          iscoapplicant:
                            this.props.navigation.state.params.applicantFlow ===
                              'coapplicant'
                              ? true
                              : false,
                          isguarantor: this.state.isguarantor,
                          leadCode: this.state.leadCode,
                          firstName: this.state.firstName.value,
                          middleName: this.state.middleName.value,
                          lastName: this.state.lastName.value,
                          city: this.state.city,
                          state: this.state.state,
                          leadName:
                            this.state.firstName.value +
                            ' ' +
                            (this.state.middleName.value || '') +
                            ' ' +
                            this.state.lastName.value,
                          mainapplicantUniqueId: this.state.mainApplicantUniqueId,
                          productId: this.state.productId,
                          sourceName: this.state.selectedItem.value,
                          sourceType: this.state.selectedSourceType,
                          branchName: this.state.selectedBranch.value,
                        };
                        this.props.saveCoAppGuarantor({
                          dataToAPI,
                          callback: (response) => {
                            this.props.navigation.navigate('ConsentPending', {
                              id: response.id,
                              applicantUniqueId: response.mainapplicantUniqueId,
                              leadCode: response.leadCode,
                              title: this.state.title,
                              coapplicantUniqueId: response.coapplicantUniqueId,
                              ismainapplicant: this.state.ismainapplicant,
                              isguarantor: this.state.isguarantor,
                              branchName: response.branchName,
                              iscoapplicant: this.state.iscoapplicant,
                            });
                          },
                        });
                      } else {

                        this.props.addLeadAPI({
                          data: {
                            productId: this.state.productId,
                            pan: this.state.panNumber.value,
                            selectedSourceType: this.state.selectedSourceType,
                            selectedItem: this.state.selectedItem.value,
                            firstName: this.state.firstName.value,
                            middleName: this.state.middleName.value,
                            lastName: this.state.lastName.value,
                            city: this.state.city,
                            state: this.state.state,
                            customerName:
                              this.state.firstName.value +
                              ' ' +
                              (this.state.middleName.value || '') +
                              ' ' +
                              this.state.lastName.value,
                            emailAddress: this.state.emailAddress.value,
                            pincode: this.state.pincode.value,
                            mobileNumber: this.state.mobileNumber.value,
                            employeeId: this.state.employeeId,
                            branchName: this.state.selectedBranch.value,
                          },

                          callback: (response) => {
                            this.props.navigation.navigate('ConsentPending', {
                              id: response.data.id,
                              applicantUniqueId: response.data.applicantUniqueId,
                              leadCode: response.data.leadCode,
                              title: this.state.title,
                              coapplicantUniqueId: response.coapplicantUniqueId || '',
                              ismainapplicant: this.state.ismainapplicant,
                              isguarantor: this.state.isguarantor,
                              iscoapplicant: this.state.iscoapplicant,
                            });
                          },
                        });
                      }
                    }
                  } else {
                    this.isfirstName(this.state.firstName.value);
                    this.ismiddleName(this.state.middleName.value);
                    this.islastName(this.state.lastName.value);
                    this.isemailAddress(this.state.emailAddress.value);
                    this.ispincode(this.state.pincode.value);
                    this.ismobileNumber(this.state.mobileNumber.value);

                    if (
                      this.state.firstName.value != '' &&
                      this.state.firstName.value != null &&
                      this.state.firstName.isValid &&
                      // this.state.middleName.value != '' &&
                      // this.state.middleName.value != null &&
                      this.state.middleName.isValid &&
                      this.state.lastName.value != '' &&
                      this.state.lastName.value != null &&
                      this.state.lastName.isValid &&
                      this.state.emailAddress.value != '' &&
                      this.state.emailAddress.value != null &&
                      this.state.emailAddress.isValid &&
                      this.state.pincode.value != '' &&
                      this.state.pincode.value != null &&
                      this.state.pincode.isValid &&
                      this.state.mobileNumber.value != '' &&
                      this.state.mobileNumber.value != null &&
                      this.state.mobileNumber.isValid
                    ) {
                      Keyboard.dismiss();
                      if (
                        this.props.navigation.state.params.applicantFlow &&
                        (this.props.navigation.state.params.applicantFlow ===
                          'coapplicant' ||
                          this.props.navigation.state.params.applicantFlow ===
                          'guarantor')
                      ) {
                        const dataToAPI = {
                          customerEmail: this.state.emailAddress.value,
                          customerMobile: this.state.mobileNumber.value,
                          pan: this.state.panNumber.value,
                          customerPincode: this.state.pincode.value,
                          iscoapplicant:
                            this.props.navigation.state.params.applicantFlow ===
                              'coapplicant'
                              ? true
                              : false,
                          isguarantor: this.state.isguarantor,
                          leadCode: this.state.leadCode,
                          city: this.state.city,
                          state: this.state.state,
                          leadName:
                            this.state.firstName.value +
                            ' ' +
                            (this.state.middleName.value || '') +
                            ' ' +
                            this.state.lastName.value,
                          mainapplicantUniqueId: this.state.mainApplicantUniqueId,
                          productId: this.state.productId,
                          firstName: this.state.firstName.value,
                          middleName: this.state.middleName.value,
                          lastName: this.state.lastName.value,
                          sourceType: this.state.selectedSourceType,
                          branchName: this.state.selectedBranch.value,
                        };

                        ("datatosave coapp api ", dataToAPI);
                        this.props.saveCoAppGuarantor({
                          dataToAPI,
                          callback: (response) => {
                            this.props.navigation.navigate('ConsentPending', {
                              id: response.id,
                              applicantUniqueId: response.mainapplicantUniqueId,
                              leadCode: response.leadCode,
                              title: this.state.title,
                              branchName: response.branchName,
                              coapplicantUniqueId: response.coapplicantUniqueId,
                              ismainapplicant: this.state.ismainapplicant,
                              isguarantor: this.state.isguarantor,
                              iscoapplicant: this.state.iscoapplicant,
                            });
                          },
                        });
                      } else {
                        this.props.addLeadAPI({
                          data: {
                            productId: this.state.productId,
                            selectedSourceType: this.state.selectedSourceType,
                            firstName: this.state.firstName.value,
                            middleName: this.state.middleName.value,
                            lastName: this.state.lastName.value,
                            city: this.state.city,
                            state: this.state.state,
                            customerName:
                              this.state.firstName.value +
                              ' ' +
                              (this.state.middleName.value || '') +
                              ' ' +
                              this.state.lastName.value,
                            emailAddress: this.state.emailAddress.value,
                            pincode: this.state.pincode.value,
                            mobileNumber: this.state.mobileNumber.value,
                            employeeId: this.state.employeeId,
                            branchName: this.state.branchName,
                          },
                          callback: (response) => {
                            this.props.navigation.navigate('ConsentPending', {
                              id: response.data.id,
                              applicantUniqueId:
                                response.data.applicantUniqueId,
                              leadCode: response.data.leadCode,
                              title: this.state.title,
                              coapplicantUniqueId:
                                response.coapplicantUniqueId || '',
                              ismainapplicant: this.state.ismainapplicant,
                              isguarantor: this.state.isguarantor,
                              iscoapplicant: this.state.iscoapplicant,
                            });
                          },
                        });
                      }
                    }
                  }
                }}
              />
            </View>
          </View>
        </ScrollView>
      </WaveBackground>
    );
  }
}

/**
 * propTypes declaration
 */
AddLead.propTypes = {
  dsaAPI: PropTypes.func,
  dealerAPI: PropTypes.func,
  addLeadAPI: PropTypes.func,
  userDataSelector: PropTypes.object,
};

export default compose(
  container,
  withProps((dsaAPI) => {
    dsaAPI;
  }),
  withProps((dealerAPI) => {
    dealerAPI;
  }),
  withProps((addLeadAPI) => {
    addLeadAPI;
  }),
)(AddLead);
