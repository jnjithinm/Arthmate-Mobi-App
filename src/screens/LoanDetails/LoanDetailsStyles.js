import { StyleSheet } from 'react-native';

import * as colors from "../../constants/colors";
import { APP_FONTS, FONT_SIZE } from '../../constants/styleConfig';

export const LoanDetailsStyles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: colors.COLOR_WHITE,
        marginLeft: 20,
        marginRight: 20,
        marginTop: 10,
        marginBottom: 20
    },
    mainHeadingText: {
        color: colors.COLOR_BLACK,
        fontFamily: APP_FONTS.NunitoExtraBold,
        fontSize: FONT_SIZE.l,
        alignSelf: 'center'
    },
    viewDrop: {
        marginTop: 10,
        marginBottom: 20,
        ...(Platform.OS !== 'android' && {
            zIndex: 10,
        })
    },
    viewDrop1: {
        marginTop: 10,
        marginBottom: 20,
        ...(Platform.OS !== 'android' && {
            zIndex: 600,
        })
    },
    viewDrop2: {
        marginTop: 10,
        marginBottom: 20,
        ...(Platform.OS !== 'android' && {
            zIndex: 500,
        })
    },
    viewDrop3: {
        marginTop: 10,
        marginBottom: 20,
        ...(Platform.OS !== 'android' && {
            zIndex: 400,
        })
    },
    viewDrop4: {
        marginTop: 10,
        marginBottom: 20,
        ...(Platform.OS !== 'android' && {
            zIndex: 300,
        })
    },
    viewDrop5: {
        marginTop: 10,
        // marginBottom: 10,
        ...(Platform.OS !== 'android' && {
            zIndex: 200,
        })
    },
    textStyle1: {
        color: colors.COLOR_BLACK,
        fontFamily: APP_FONTS.NunitoRegular,
        fontSize: FONT_SIZE.l,
        marginLeft: -4
    },

    textStyle: {
        color: colors.COLOR_BLACK,
        fontFamily: APP_FONTS.NunitoRegular,
        fontSize: FONT_SIZE.l,
        marginLeft: -4
    },
    textStyleDrop: {
        color: colors.COLOR_LIGHT_NAVY_BLUE,
        fontFamily: APP_FONTS.NunitoRegular,
        fontSize: FONT_SIZE.l,
        marginLeft: 4
    },
    separatorStyle: {
        height: 2,
        backgroundColor: colors.COLOR_BLUE,
    },
    buttonContainer: {
        flexDirection: "row",
        marginTop: 20,
        marginBottom: 10,
        width: '100%',
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
    addressStyle: {
        color: colors.COLOR_BLUE,
        fontFamily: APP_FONTS.NunitoRegular,
        fontSize: 16,
        marginLeft: -4
    },
    errorLabel: {
        marginTop: 2,
        color: 'red'
    },
    inputStyle: {
        borderWidth: 0,
        marginTop: 10,
        marginBottom: 10,
    },
    inputStyle1: {
        borderWidth: 0,
        marginBottom: 10,
        width: "45%",
        backgroundColor: "red"
    },
    inputTextPasswordStyle: {
        color: colors.COLOR_SPACE_GREY,
        fontFamily: APP_FONTS.NunitoRegular,
        paddingHorizontal: 4,
        marginTop: 6,
        marginBottom: -10,
        fontSize: 18
    },
    textEMI: {
        marginLeft: 4,
        color: colors.COLOR_METEOR_GREY,
        fontSize: FONT_SIZE.m
    },
    textEMIRIGHT: {
        marginRight: 4,
        color: '#625f5f'
    },
    loanTextMain: {
        color: colors.COLOR_BLACK,
        fontFamily: APP_FONTS.NunitoRegular,
        paddingHorizontal: 4,
        marginBottom: -10,
        fontSize: FONT_SIZE.l,
    },
    loanMainView: {
        marginTop: 45,
    },
    radioContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "30%",
        marginLeft: 20,
    },
    radioContainer2: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "30%",
        marginTop: 20,
        marginLeft: 4
    },
    labelDateOfIncStyle: {
        fontFamily: APP_FONTS.NunitoRegular,
        fontSize: 15,
        color: colors.COLOR_LIGHT_GREY,
        marginTop: 20,
        marginBottom: 22,
        marginLeft: 6
    },
    calendarIconWithText: {
        position: "absolute",
        top: 28,
        right: 10,
    },
    textForInputStyle: {
        color: colors.COLOR_SPACE_GREY,
        fontFamily: APP_FONTS.NunitoRegular,
        fontSize: FONT_SIZE.l,
        marginTop: -15,
        marginBottom: 5,
        marginLeft: 5
    },
    textInputStyleNominee: {
        borderRadius: 2,
        borderWidth: 1,
        height: 100,
        borderColor: colors.COLOR_LIGHT_GREY,
        marginTop: 10,
        color: colors.COLOR_BLACK,
        fontFamily: APP_FONTS.NunitoRegular,
        fontSize: FONT_SIZE.l,
    },
    textInputStyle: {
        color: colors.COLOR_LIGHT_GREY,
        fontFamily: APP_FONTS.NunitoRegular,
        fontSize: FONT_SIZE.l,
        marginBottom: -10,
        marginTop: 6,
    },
    inputStyle1: {
        borderWidth: 0,
        marginTop: 10,
        marginBottom: 5,
    },
})
