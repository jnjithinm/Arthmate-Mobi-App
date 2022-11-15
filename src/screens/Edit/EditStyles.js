import { StyleSheet } from 'react-native';

import * as colors from "../../constants/colors";
import { APP_FONTS, FONT_SIZE } from '../../constants/styleConfig';

export const EditStyles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: colors.COLOR_WHITE,
        marginLeft: 20,
        marginRight: 20,
        marginTop: 30,
        marginBottom: 20
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
        justifyContent: "space-between",
        width: "85%",
        marginLeft: 5,

    },
    textInputStyle: {
        marginTop: 10,
        color: colors.COLOR_LIGHT_GREY,
        fontFamily: APP_FONTS.NunitoBold,
        fontSize: FONT_SIZE.l,

    },
    textInputStyle1: {
        color: colors.COLOR_LIGHT_GREY,
        fontFamily: APP_FONTS.NunitoRegular,
        fontSize: FONT_SIZE.l,
    },
    textInputStyleMargin: {
        color: colors.COLOR_LIGHT_GREY,
        fontFamily: APP_FONTS.NunitoBold,
        fontSize: FONT_SIZE.l,
        marginBottom: 6
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
        marginTop: 30,
        marginBottom: 20,
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
        marginBottom: 2
    },
    errorLabel: {
        marginTop: 2,
        color: 'red'
    },
});