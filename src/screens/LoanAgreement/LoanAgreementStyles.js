import { StyleSheet, Platform, Dimensions } from 'react-native';

import * as colors from "../../constants/colors";
import { APP_FONTS, FONT_SIZE } from '../../constants/styleConfig';

export const LoanAgreementStyles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: colors.COLOR_WHITE,
        marginLeft: 20,
        marginRight: 20,
        marginTop: 20,
        marginBottom: 20,
    },
    salarySlipName: {
        flex: 1,
        marginRight: 15,
    },
    plusImageStyle: {
        height: 36,
        width: 30,
        alignSelf: 'center',
    },
    plusImageStyle1: {
        height: 36,
        width: 36,
        marginTop: 15,
        marginBottom: 15,
        marginLeft: 15,
        marginRight: 15,
    },
    mainSalaryView: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    mainHeadingText: {
        color: colors.COLOR_DARK_NAVY_BLUE,
        fontFamily: APP_FONTS.NunitoExtraBold,
        fontSize: FONT_SIZE.l,
        // alignSelf: 'center',
        // marginTop: 20,
    },
    agreementLetter: {
        fontFamily: APP_FONTS.NunitoBold,
        color: colors.COLOR_BLACK,
        fontSize: FONT_SIZE.l,
        marginTop: 2,
        textAlign: "center",
        marginBottom: 20
    },
    agreementGreet: {
        fontFamily: APP_FONTS.NunitoBold,
        color: colors.COLOR_BLACK,
        fontSize: FONT_SIZE.l,
        marginBottom: 20,
        textAlign: "center"
    },
    inputContainer: {
        flexDirection: "column",
    },
    buttonContainer: {
        alignSelf: 'center',
        justifyContent: "space-between",
        flexDirection: "row",
        marginLeft: 20,
        marginRight: 20,
        width: "95%"
    },
    buttonSecondContainer: {
        alignSelf: 'center',
        justifyContent: "space-between",
        flexDirection: "row",
        marginLeft: 20,
        marginRight: 20,
        marginTop: 20,
        width: "95%"
    },
    modalView: {
        height: 60,
        width: "50%",
        borderRadius: 30,
        backgroundColor: colors.COLOR_LIGHT_NAVY_BLUE,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 10,
        marginTop: 10,
        alignSelf: "center"
    },
    modalView1: {
        margin: 10,
        backgroundColor: "white",
        borderRadius: 10,
        padding: 10,
        alignSelf: "center",
        shadowColor: "#000",
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        marginTop: 80,
        width: "90%",
    
      },
      text: {
        fontFamily: APP_FONTS.NunitoBold,
        color: colors.COLOR_BLACK,
        fontSize: FONT_SIZE.m,
      },
      touchButton: {
        marginTop: 30,
        width: "40%",
        height: 45,
        borderRadius: 30,
        justifyContent: "center",
      },
    modalText: {
        color: colors.COLOR_WHITE,
        fontFamily: APP_FONTS.NunitoBold,
        fontSize: FONT_SIZE.m,
        textAlign: "center"
    },
    buttonThirdContainer: {
        flexDirection: "row",
        marginTop: 20,
        width: '80%',
        justifyContent: "space-between",
        alignSelf: "center",
        marginLeft: 20,
        marginRight: 20,
    },
    buttonContainerProceed: {
        marginTop: 10,
        marginBottom: 10,
        width: '40%',
        alignSelf: 'center'
    },
    buttonContainerLink: {
        flex: 1,
        marginTop: 10,
        marginBottom: 10,
        justifyContent: "space-between",
        flexDirection: "row"
    },
    toolTipContainer: {
        height: 30,
        width: 30,
        borderRadius: 20,
        borderColor: colors.COLOR_WHITE,
        borderWidth: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.COLOR_LIGHT_NAVY_BLUE,


    },
    informationToolTipText: {
        color: colors.COLOR_WHITE,
        fontSize: 20,
    },
    titleStyle: {
        color: colors.COLOR_WHITE,
        fontFamily: APP_FONTS.NunitoBold,
        fontSize: FONT_SIZE.m,
        textAlign: "center",
        marginTop: 20,
    },
    touchableButtonStyle: {
        width: '90%',
        height: 60,
        flexDirection: 'row',
        borderRadius: 30,
        backgroundColor: colors.COLOR_LIGHT_NAVY_BLUE,
        justifyContent: "center",
        marginRight: 20
    },
    pdfContainer: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginRight: 20,
        marginLeft: 20
    },
    pdf: {
        flex: 1,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        marginRight: 40,
        marginLeft: 20
    },
    textStyle: {
        color: colors.COLOR_BLACK,
        fontFamily: APP_FONTS.NunitoRegular,
        fontSize: FONT_SIZE.l,
        marginLeft: -4
    },
    textStyle1: {
        color: colors.COLOR_LIGHT_GREY,
        fontFamily: APP_FONTS.NunitoRegular,
        fontSize: FONT_SIZE.l,
        marginLeft: -4
    },

})