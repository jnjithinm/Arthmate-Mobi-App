import { StyleSheet } from "react-native";

import * as colors from "../../constants/colors";
import { APP_FONTS, FONT_SIZE } from "../../constants/styleConfig";

export const PANAndGSTVerificationStyles = StyleSheet.create({
    lableStyle: {
        fontFamily: APP_FONTS.NunitoBold,
        color: colors.COLOR_LIGHT_NAVY_BLUE,
        fontSize: FONT_SIZE.l,
        marginTop: 20
    },
    mainContainer: {
        // flex: 1,
        // marginTop: 16,
        // marginBottom: 20,
        backgroundColor: colors.COLOR_WHITE,
        marginLeft: 20,
        marginRight: 20,
    },
    flexRowStyle: {
        flexDirection: "row",
    },
    panGSTLabel: {
        fontFamily: APP_FONTS.NunitoBold,
        color: colors.COLOR_BLACK,
        fontSize: FONT_SIZE.xl,
        marginTop: 20,
        textAlign: "center"
    },
    radioButtonContainer: {
        marginRight: 10,
        marginTop: 5
    },
    marginTop5: {
        marginTop: 10
    },
    // separatorStyle: {
    //     height: 1,
    //     backgroundColor: colors.COLOR_BORDER_GREY,
    // },
    textStyle: {
        color: colors.COLOR_LIGHT_GREY,
        fontFamily: APP_FONTS.NunitoRegular,
        fontSize: FONT_SIZE.l,
        marginLeft: -4
    },
    mandatoryLabelStyle: {
        fontFamily: APP_FONTS.NunitoRegular,
        fontSize: FONT_SIZE.m,
        color: colors.COLOR_LIGHT_GREY,
    },
    uploadContainer: {
        marginTop: 10,
    },
    imageContainer: {
        backgroundColor: colors.COLOR_LIGHT_NAVY_BLUE,
        height: 70,
        width: 70,
        borderRadius: 35,
        justifyContent: "center"
    },
    uploadTextStyle: {
        fontFamily: APP_FONTS.NunitoSemiBold,
        marginLeft: 10,
        fontSize: FONT_SIZE.m,
        color: colors.COLOR_DARK_NAVY_BLUE,
        alignSelf: "center",
    },
    inputTextStyle: {
        color: colors.COLOR_SPACE_GREY,
        fontFamily: APP_FONTS.NunitoRegular,
        paddingHorizontal: 4,
        marginTop: 8,
        marginBottom: 0,
        fontSize: 18
    },
    inputStyle: {
        borderWidth: 0, marginTop: 20, marginBottom: 10,
    },
    separatorStyle: {
        height: 2,
        backgroundColor: colors.COLOR_BLUE,
        marginTop: -12
    },
    leftRightPadding: {
        marginLeft: 20,
        marginRight: 20,
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: colors.COLOR_WHITE,
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
    buttonContainer: {
        marginTop: 20,
        alignSelf: "center"
    },
    panGSTSeparator: {
        height: 1,
        width: "100%",
        backgroundColor: colors.COLOR_BORDER_GREY,
        marginTop: 5,
        marginBottom: 10
    },
    panGSTSeparator1: {
        height: 1,
        width: "100%",
        backgroundColor: colors.COLOR_BORDER_GREY,
        marginTop: 20,
        marginBottom: 10
    },
    marginTopStyle: {
        marginTop: 15
    },
    labelDateOfIncStyle: {
        fontFamily: APP_FONTS.NunitoRegular,
        fontSize: 15,
        color: colors.COLOR_LIGHT_GREY,
        marginTop: 20,
        marginBottom: 22,
        marginLeft: 6
    },
    textForInputStyle: {
        color: colors.COLOR_SPACE_GREY,
        fontFamily: APP_FONTS.NunitoRegular,
        fontSize: FONT_SIZE.l,
        marginTop: -15,
        marginBottom: 18
    },
    imagePlaceHolderStyle: { height: 150, width: "60%", marginTop: 30, alignSelf: "center" },
    verifiedTextStyle: {
        fontFamily: APP_FONTS.NunitoBold,
        fontSize: FONT_SIZE.m,
        color: colors.COLOR_GREEN,
    },
    verifiedTickImageStyle: {
        height: 20,
        width: 20,
        marginRight: 5
    },
    errorLabel: {
        marginTop: 2,
        color: 'red'
    },
    closeIconStyle: {
        position: "absolute",
        right: 58,
        top: 18
    },
    calendarIcon: {
        position: "absolute", top: 18, right: 10
    },
    calendarIconWithText: {
        position: "absolute", top: 42, right: 10
    },
});