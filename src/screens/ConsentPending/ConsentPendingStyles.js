import { StyleSheet } from 'react-native';

import * as colors from "../../constants/colors";
import { APP_FONTS, FONT_SIZE } from '../../constants/styleConfig';

export const ConsentPendingStyles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: colors.COLOR_WHITE,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 10,
        marginBottom: 20,
        paddingLeft: 10,
        paddingRight: 10
    },
    flexRowStyle: {
        flexDirection: "row",
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
    editTextStyle: {
        fontFamily: APP_FONTS.NunitoRegular,
        fontSize: FONT_SIZE.l,
        color: colors.COLOR_GREY,
        marginRight: 2
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
        height: 40,
        paddingLeft: 10,
        width: "95%",
        flexDirection: "row",
        justifyContent: "space-between"
    },
    textInputStyle: {
        marginTop: 10,
        color: colors.COLOR_LIGHT_GREY,
        fontFamily: APP_FONTS.NunitoRegular,
        fontSize: FONT_SIZE.l,
    },
    textInputStyleMargin: {
        marginTop: 5,
        color: colors.COLOR_LIGHT_GREY,
        fontFamily: APP_FONTS.NunitoBold,
        fontSize: FONT_SIZE.l,
        marginBottom: 3
    },
    buttonContainer: {
        flexDirection: "row",
        marginTop: 5,
        marginBottom: 10,
        width: '75%',
        alignSelf: 'center'
    },
    buttonContainer1: {
        flexDirection: "row",
        marginTop: 20,
        marginBottom: 15,
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
        marginTop: 5,
        marginBottom: 5,
        marginLeft: 5
    }
});