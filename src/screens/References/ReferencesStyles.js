import { StyleSheet, Platform } from 'react-native';

import * as colors from "../../constants/colors";
import { APP_FONTS, FONT_SIZE } from '../../constants/styleConfig';

export const ReferencesStyles = StyleSheet.create({
    mainContainer: {
        marginLeft: 20,
        marginRight: 20,
    },
    buttonContainer: {
        flexDirection: "row",
        marginTop: 20,
        marginBottom: 10,
        width: '60%',
        alignSelf: 'center'
    },
    inputTextStyle: {
        color: colors.COLOR_SPACE_GREY,
        fontFamily: APP_FONTS.NunitoRegular,
        paddingHorizontal: 4,
        marginTop: 8,
        marginBottom: -20,
        fontSize: 18
    },
    addressStyle: {
        color: colors.COLOR_BLUE,
        fontFamily: APP_FONTS.NunitoRegular,
        fontSize: 16,
        marginLeft: -4
    },
    inputStyle: {
        borderWidth: 0,
        marginTop: 10,
        marginBottom: 10,
    },
    errorLabel: {
        marginTop: 2,
        color: 'red'
    },
    viewDrop: {
        marginTop: 10,
        ...(Platform.OS !== 'android' && {
            zIndex: 10
        })
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
    textStyleDrop: {
        color: colors.COLOR_LIGHT_GREY,
        fontFamily: APP_FONTS.NunitoRegular,
        fontSize: FONT_SIZE.l,
        marginLeft: 4
    },
    separatorStyle1: {
        height: 2,
        backgroundColor: colors.COLOR_BLUE,
        marginBottom: 10,
    },
    schemesLabel: {
        fontFamily: APP_FONTS.NunitoBold,
        color: colors.COLOR_BLACK,
        fontSize: FONT_SIZE.xl,
        marginTop: 10,
        textAlign: "center"
    },
    cancelButtonStyle: {
        borderColor: colors.COLOR_LIGHT_NAVY_BLUE,
        backgroundColor: colors.COLOR_WHITE,
        borderWidth: 1,
        marginRight: 10
    },
    textInputStyle: {
        borderRadius: 2,
        borderWidth: 1,
        height: 100,
        borderColor: colors.COLOR_LIGHT_GREY,
        marginTop: 10,
        color: colors.COLOR_BLACK,
        fontFamily: APP_FONTS.NunitoRegular,
        fontSize: FONT_SIZE.l,
    },
    cancelButtonTitleStyle: {
        color: colors.COLOR_LIGHT_NAVY_BLUE
    },
    plusImageStyle: {
        height: 20,
        width: 20
    },
    seperatorStyle: {
        height: 1,
        backgroundColor: colors.COLOR_BORDER_GREY,
        marginTop: 5,
        marginBottom: 10
    },
    inputContainer: {
        flexDirection: "column",
        justifyContent: "space-between"
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
    familyReferenceLabel: {
        fontFamily: APP_FONTS.NunitoBold,
        color: colors.COLOR_LIGHT_NAVY_BLUE,
        fontSize: FONT_SIZE.l,
    },
    collapsedContainer: {
        // marginTop: 20,
        marginLeft: -20,
        marginRight: -20,
        marginBottom: 20
    },
    plusImageStyle: {
        height: 20,
        width: 20
    },
    expandedContainer: {
        backgroundColor: colors.COLOR_WHITE
    },
    expandedViewStyle: {
        backgroundColor: colors.COLOR_WHITE,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 16
    },
    plusButtonContainer: {
        marginTop: 20,
        flexDirection: "row",
        justifyContent: "space-between"
    },
})