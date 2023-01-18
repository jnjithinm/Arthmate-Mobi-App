import React, { Component } from 'react';
import { View, Text, Image, Keyboard, ScrollView, StatusBar, BackHandler, Alert, LogBox, Linking, Pressable } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import PropTypes from 'prop-types';
import { compose, withProps } from 'recompose';
import { FloatingLabelInput } from 'react-native-floating-label-input';
import { LoginStyles } from "./LoginStyles";
import { LOGIN_CONST } from "../../constants/screenConst";
import container from '../../container/Login/index';
import { WaveBackground } from "../../components/WaveBackground/WaveBackground";
import * as colors from "../../constants/colors"
import { uatURL  } from '../../../baseURL'
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            emailAddress: {
                value: null,
                isValid: true,
            },
            password: {
                value: null,
                isValid: true,
            },
        }
    }

    setEmailId(text) {
        this.setState({
            emailAddress: {
                ...this.state.emailAddress,
                value: text,
                isValid: true
            }
        });
    }

    isValidEmail(text) {
        let valid = false;
        const emailIdRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if (emailIdRegex.test(text)) {
            valid = true;
        }

        this.setState({
            emailAddress: {
                ...this.state.emailAddress,
                isValid: valid,
            }
        });
        return valid;
    }

    setPassword(text) {
        this.setState({
            password: {
                ...this.state.password,
                value: text,
                isValid: true
            }
        });
    }

    isValidPassword(text) {
        let valid = true;
        const pwdRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
        if (pwdRegex.test(text)) {
            valid = true;
        }
        this.setState({
            password: {
                ...this.state.password,
                isValid: valid,
            }
        });
        return valid;
    }

    backAction = () => {
        Alert.alert("Hold on!", "Are you sure you want to quit application?", [
            {
                text: "No",
                onPress: () => null,
                style: "cancel"
            },
            { text: "YES", onPress: () => BackHandler.exitApp() }
        ]);
        return true;
    };

    componentDidMount() {
        this.backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            this.backAction
        );
        LogBox.ignoreAllLogs();
    }

    componentWillUnmount() {
        this.backHandler.remove();
    }
    renderInputs() {
        const { inputStyle, separatorStyle, errorLabel, inputTextStyle, inputTextPasswordStyle } = LoginStyles;
        return (
            <View>
                <FloatingLabelInput
                    label={LOGIN_CONST.EMAIL_ADDRESS}
                    containerStyles={inputStyle}
                    value={this.state.emailAddress.value || undefined}
                    onChangeText={(value) => {
                        this.setEmailId(value)
                    }}
                    customLabelStyles={{
                        colorFocused: colors.COLOR_LIGHT_GREY,
                        fontSizeFocused: 15,
                        fontSizeBlurred: 15,
                    }}
                    inputStyles={inputTextStyle}

                />

                <View style={separatorStyle} />
                {!this.state.emailAddress.isValid && <Text style={errorLabel}>{(this.state.emailAddress.value === "" ||
                    this.state.emailAddress.value === null) ?
                    LOGIN_CONST.EMPTY_EMAIL_ID : LOGIN_CONST.VALID_EMAIL_ID}</Text>}

                <FloatingLabelInput
                    label={LOGIN_CONST.PASSWORD}
                    isPassword={true}
                    value={this.state.password.value || undefined}
                    containerStyles={inputStyle}
                    customLabelStyles={{
                        colorFocused: colors.COLOR_LIGHT_GREY,
                        fontSizeFocused: 15,
                        fontSizeBlurred: 15,
                    }}
                    inputStyles={inputTextPasswordStyle}
                    onChangeText={(value) => {
                        this.setPassword(value)
                    }}
                />
                <View style={separatorStyle} />
                {!this.state.password.isValid && <Text style={errorLabel}>{(this.state.password.value === "" ||
                    this.state.password.value === null) ?
                    LOGIN_CONST.EMPTY_PASSWORD : LOGIN_CONST.VALID_PASSWORD}</Text>}

            </View>
        );
    }

    render() {
        const {
            imageStyle,
            childContainer,
            welcomeText,
            buttonContainer,
            buttonStyle,
            buttonTitle,
            resetPasswordText } = LoginStyles;

        return (
            <WaveBackground>
                <StatusBar
                    backgroundColor={colors.COLOR_WHITE}
                    barStyle={'dark-content'}
                    translucent={false}
                    hidden={false}
                />
                <ScrollView
                    keyboardShouldPersistTaps="always">
                    <View style={childContainer}>
                        <Image style={imageStyle} source={require('../../assets/img/arthmate.png')} resizeMode={"contain"} />
                        <View>
                            <Text style={welcomeText}>{uatURL.URL=='http://3.110.227.60:8087/cwc-sales'? LOGIN_CONST.HEADER :LOGIN_CONST.HEADER_PROD}</Text>
                            {this.renderInputs()}
                            <View style={buttonContainer}>
                                <Button
                                    iconRight
                                    icon={
                                        <Icon
                                            name="arrow-forward-sharp"
                                            type="ionicon"
                                            color={'#ffff'}
                                        />
                                    }
                                    titleStyle={buttonTitle}
                                    buttonStyle={[buttonStyle,{height: 50}]}
                                    title={LOGIN_CONST.BUTTON_TITLE}
                                    onPress={() => {
                                        Keyboard.dismiss();
                                        const validEmail = this.isValidEmail(this.state.emailAddress.value);
                                        const validPassword = this.isValidPassword(this.state.password.value);
                                        if (this.state.emailAddress.value != "" &&
                                            this.state.emailAddress.value != null &&
                                            this.state.password.value != "" &&
                                            this.state.password.value != null &&
                                            validEmail &&
                                            validPassword) {
                                            Keyboard.dismiss();
                                            this.props.loginAPI({
                                                data: {
                                                    emailId: this.state.emailAddress.value,
                                                    pwd: this.state.password.value,
                                                },
                                                callback: () => {
                                                    const { navigation } = this.props;
                                                    // navigation.replace('Dashboard');
                                                    navigation.replace('LeadList', { productId: 1, title: 'New Two Wheeler' });

                                                },
                                            });
                                        }
                                    }
                                    }
                                />
                                <Pressable style={{justifyContent: 'center',alignItems: 'center'}}
                                    onPress={()=>{Linking.openURL(`${uatURL.forgotPWD}/forgotpassword`)}}
                                >
                                <Text style={resetPasswordText}>{LOGIN_CONST.RESET_PASSWORD}</Text>
                            </Pressable>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </WaveBackground>
        )
    }
}

/**
 * propTypes declaration
 */
Login.propTypes = {
    loginAPI: PropTypes.func,
};

export default compose(
    container,
    withProps((loginAPI) => loginAPI),
)(Login);
