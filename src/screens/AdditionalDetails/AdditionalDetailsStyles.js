import { StyleSheet } from 'react-native';
import * as colors from "../../constants/colors";
import { APP_FONTS, FONT_SIZE } from "../../constants/styleConfig";

export const AdditionalDetailsStyles = StyleSheet.create({
    mainContainer: {
        marginLeft: 10,
        marginRight: 10,
        marginTop: 20,
        backgroundColor: colors.COLOR_WHITE,
    },
    additionalDetailsLabel: {
        fontFamily: APP_FONTS.NunitoBold,
        color: colors.COLOR_BLACK,
        fontSize: FONT_SIZE.xl,
        // marginTop: 50,
        textAlign: "center"
    },
    collapsedViewStyle: {
        backgroundColor: colors.COLOR_LILAC,
        height: 70,
        flexDirection: "row",
        justifyContent: "space-between",
        paddingLeft: 20,
        paddingRight: 20,
        alignItems: "center"
    },
    collapsedContainer: {
        // marginTop: 20,
        // marginLeft: -20,
        // marginRight: -20,
        marginBottom: 20
    },
    plusImageStyle: {
        height: 20,
        width: 20
    },
    registeredAddressLabel: {
        fontFamily: APP_FONTS.NunitoBold,
        color: colors.COLOR_LIGHT_NAVY_BLUE,
        fontSize: FONT_SIZE.l,
    },
    expandedContainer: {
        backgroundColor: colors.COLOR_WHITE,
        marginLeft: 20,
        marginRight: 20
    },
    seperatorStyle: {
        height: 1,
        backgroundColor: colors.COLOR_BORDER_GREY,
        marginTop: 5,
        marginBottom: 5,
        marginLeft: -20,
        marginRight: -20
    },
    expandedViewStyle: {
        backgroundColor: colors.COLOR_WHITE,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 16
    },
    kycDocLabel: {
        fontFamily: APP_FONTS.NunitoRegular,
        color: colors.COLOR_LIGHT_NAVY_BLUE,
        fontSize: 16,
    },
    kycDocContainer: {
        marginTop: 20
    },
    plusButtonContainer: {
        marginTop: 20,
        flexDirection: "row",
        justifyContent: "space-between",
        flexWrap: "wrap"
    },
    docTextStyle: {
        textAlign: "center",
        color: colors.COLOR_DARK_NAVY_BLUE,
        fontFamily: APP_FONTS.NunitoSemiBold,
        fontSize: 16,
        marginTop: 2
    },
    toolTipContainer: {
        height: 20,
        width: 20,
        borderRadius: 10,
        borderColor: colors.COLOR_BLACK_SHADE,
        borderWidth: 1,
        alignSelf: "center",
        marginTop: 10,
        alignItems: "center",
        justifyContent: "center"
    },
    informationToolTipText: {
        color: colors.COLOR_BLACK_SHADE,
    },
    uploadImageContainer: {
        marginTop: 20,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    uploadImageStyle: {
        height: 140,
        width: "48%",
        backgroundColor: colors.COLOR_LILAC,
        justifyContent: "center",
        borderWidth: 1,
        borderStyle: 'dashed',
        borderColor: colors.COLOR_LIGHT_GREY,
        borderRadius: 1
    },
    frontAndBackLabel: {
        fontFamily: APP_FONTS.NunitoSemiBold,
        fontSize: 16,
        textAlign: "center",
        marginTop: 10
    },
    residentialAddressContainer: {
        marginTop: 20
    },
    residentialAddressLabel: {
        color: colors.COLOR_LIGHT_NAVY_BLUE,
        fontFamily: APP_FONTS.NunitoRegular,
        fontSize: 16
    },
    inputTextStyle: {
        color: colors.COLOR_SPACE_GREY,
        fontFamily: APP_FONTS.NunitoRegular,
        paddingHorizontal: 4,
        marginTop: 8,
        marginBottom: -10,
        fontSize: 18
    },
    inputStyle: {
        borderWidth: 0, marginTop: 10, marginBottom: 10
    },
    inputStyle1: {
        borderWidth: 0,
        marginTop: 10,
        marginBottom: 5,
    },
    separatorStyle: {
        marginBottom: 15,
        height: 1,
        backgroundColor: colors.COLOR_BORDER_GREY,
    },
    textInputStyle: {
        color: colors.COLOR_LIGHT_GREY,
        fontFamily: APP_FONTS.NunitoRegular,
        fontSize: FONT_SIZE.l,
        marginBottom: -10,
        marginTop: 6,
    },
    separatorInputStyle: {
        height: 2,
        backgroundColor: colors.COLOR_BLUE,
        marginTop: -6
    },
    textStyle: {
        color: colors.COLOR_LIGHT_BLUE,
        fontFamily: APP_FONTS.NunitoRegular,
        fontSize: 16,
        marginLeft: -4
    },
    textStyle1: {
        color: colors.COLOR_BLACK,
        fontFamily: APP_FONTS.NunitoRegular,
        fontSize: 16,
        marginLeft: -4
    },
    saveButtonStyle: {
        borderColor: colors.COLOR_LIGHT_NAVY_BLUE,
        backgroundColor: colors.COLOR_WHITE,
        borderWidth: 1,
        alignSelf: "center",
        width: "40%",
        marginTop: 20,
        // marginBottom: 20
    },
    saveButtonTitleStyle: {
        color: colors.COLOR_LIGHT_NAVY_BLUE
    },
    calendarTextStyle: {
        color: colors.COLOR_SPACE_GREY,
        fontFamily: APP_FONTS.NunitoRegular,
        fontSize: 18,
        marginBottom: 2
    },
    marginTop20Style: {
        marginTop: 20
    },
    uploadedImageStyle: {
        height: 140,
        flex: 1
    },
    errorLabel: {
        marginTop: 2,
        color: 'red'
    },
    style50PercentRow: {
        flexDirection: "row", width: "50%", marginRight: 10,
    },
    closeImageStyle: { position: "absolute", left: 133, top: -9, width: 25 },
    marginTop20: { marginTop: 15 },
    disableStyle: {
        // flex: 1,
        height: 60,
        borderRadius: 30,
        backgroundColor: colors.COLOR_LIGHT_GREY,
        alignSelf: "center",
        width: "40%",
        marginTop: 20,
        // marginBottom: 20,
    },
    disableTextStyle: {
        color: colors.COLOR_SPACE_GREY,
        fontFamily: APP_FONTS.NunitoBold,
        fontSize: FONT_SIZE.m,
        textAlign: "center"
    },
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
    flexRowStyle: {
        flexDirection: "row",
    },
    scrollViewStyle: { marginBottom: 180, marginLeft: -20, marginRight: -20, paddingLeft: 10, paddingRight: 10 },
    progressBarContainer: { marginTop: 30, backgroundColor: colors.COLOR_WHITE, marginLeft: 20, marginRight: 20 },
    headerTextContrainer: { backgroundColor: colors.COLOR_WHITE, marginTop: 16, marginLeft: 10, marginRight: 10 }
});
