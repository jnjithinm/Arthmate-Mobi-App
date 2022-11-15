import { StyleSheet, Platform } from 'react-native';

import * as colors from "../../constants/colors";
import { APP_FONTS, FONT_SIZE } from '../../constants/styleConfig';

export const OTPVerificationStyles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: colors.COLOR_WHITE,
        marginLeft: 20,
        marginRight: 20,
        marginTop: 30,
        marginBottom: 20
    },
    mainContainerSecondary: {
        marginBottom: 20,
        marginTop: 30,
        alignSelf: 'center',
    },
    sourceTypeLabelStyle: {
        fontFamily: APP_FONTS.NunitoBold,
        fontSize: FONT_SIZE.xl,
        color: colors.COLOR_DARK_NAVY_BLUE,
        marginTop: 5,
    },
    inputStyle: {
        width: "100%"
    },
    separatorStyle: {
        height: 1,
        backgroundColor: colors.COLOR_BORDER_GREY,
    },
    inputContainer: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    textStyle: {
        marginTop: 10,
        color: colors.COLOR_LIGHT_GREY,
        fontFamily: APP_FONTS.NunitoRegular,
        fontSize: FONT_SIZE.l,
    },
    textStyleMargin: {
        marginTop: 5,
        color: colors.COLOR_LIGHT_GREY,
        fontFamily: APP_FONTS.NunitoRegular,
        fontSize: FONT_SIZE.l,
        marginBottom: 3
    },
    textStyleOTP: {
        marginTop: 15,
        color: colors.COLOR_LIGHT_GREY,
        fontFamily: APP_FONTS.Nunito,
        fontSize: FONT_SIZE.l,
        marginBottom: 3,
        alignSelf: 'center',

    },
    textStyleOTPCheck: {
        flex: 1,
        marginTop: 3,
        color: colors.COLOR_LIGHT_GREY,
        fontFamily: APP_FONTS.Nunito,
        fontSize: FONT_SIZE.m,
        marginBottom: 3,
        alignSelf: 'center',
        ...(Platform.OS !== 'android' && {
            paddingLeft: 5
        })
    },
    textStyleSentOTP: {
        marginTop: 30,
        color: colors.COLOR_DARK_NAVY_BLUE,
        fontFamily: APP_FONTS.NunitoBold,
        fontSize: FONT_SIZE.l,
        marginBottom: 10,
        alignSelf: 'center'
    },
    textStyleResendOTP: {
        color: colors.COLOR_LIGHT_NAVY_BLUE,
        fontFamily: APP_FONTS.Nunito,
        fontSize: FONT_SIZE.l,
    },
    buttonContainer: {
        flexDirection: "row",
        marginTop: 5,
        marginBottom: 10,
        width: '75%',
        alignSelf: 'center'
    },
    cancelButtonStyle: {
        borderColor: colors.COLOR_LIGHT_NAVY_BLUE,
        backgroundColor: colors.COLOR_WHITE,
        borderWidth: 1,
        marginRight: 10
    },
    cancelButtonTitleStyle: {
        color: colors.COLOR_LIGHT_NAVY_BLUE
    },
    textStyle: {
        color: colors.COLOR_LIGHT_GREY,
        fontFamily: APP_FONTS.NunitoRegular,
        fontSize: FONT_SIZE.l,
        marginLeft: -4
    },
    backgroundBlue: {
        backgroundColor: colors.COLOR_VIEW_BLUE,
    },
    colorText: {
        fontFamily: APP_FONTS.NunitoBold,
        fontSize: FONT_SIZE.xl,
        color: colors.COLOR_DARK_NAVY_BLUE,
        marginTop: 10,
        marginBottom: 10
    },
    underlineStyleBase: {
        width: 30,
        height: 45,
        borderWidth: 0,
        borderBottomWidth: 3,
        color: colors.COLOR_DARK_NAVY_BLUE
    },

    underlineStyleHighLighted: {
        borderColor: colors.COLOR_LIGHT_GREY,
    },
    OTPViewStyle: {
        alignSelf: 'center',
        width: '50%',
        height: 20
    }
})