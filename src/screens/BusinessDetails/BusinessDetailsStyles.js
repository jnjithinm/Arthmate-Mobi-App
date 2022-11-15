import { StyleSheet, Platform } from 'react-native';

import * as colors from "../../constants/colors";
import { APP_FONTS, FONT_SIZE } from '../../constants/styleConfig';

export const BusinessDetailsStyles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: colors.COLOR_WHITE,
        marginLeft: 20,
        marginRight: 20,
        marginTop: 30,
        marginBottom: 20,
    },
    verifiedTextStyle: {
        fontFamily: APP_FONTS.NunitoBold,
        fontSize: FONT_SIZE.l,
        color: colors.COLOR_GREEN,
    },
    verifiedTickImageStyle: {
        height: 25,
        width: 25,
        marginRight: 5
    },
    mainHeadingText: {
        color: colors.COLOR_DARK_NAVY_BLUE,
        fontFamily: APP_FONTS.NunitoExtraBold,
        fontSize: FONT_SIZE.l,
        alignSelf: 'center',
        marginTop: 10,
    },
    checkboxText: {
        color: colors.COLOR_DARK_NAVY_BLUE,
        fontFamily: APP_FONTS.NunitoBold,
        fontSize: 16,
        alignSelf: 'center',
        marginTop: 0,
    },
    viewDrop: {
        marginTop: 10,
        marginBottom: 20,
        ...(Platform.OS !== 'android' && {
            zIndex: 10,
        })
    },
    viewDrop2: {
        marginTop: 0,
        marginBottom: 20,
        ...(Platform.OS !== 'android' && {
            zIndex: 100,
        })
    },
    viewDrop3: {
        marginTop: 10,
        marginBottom: 20,
        ...(Platform.OS !== 'android' && {
            zIndex: 50,
        })
    },
    viewDrop4: {
        marginTop: 10,
        marginBottom: 20,
        ...(Platform.OS !== 'android' && {
            zIndex: 40,
        })
    },
    viewDrop1: {
        marginBottom: 20,
    },
    inputTextStyle: {
        color: colors.COLOR_SPACE_GREY,
        fontFamily: APP_FONTS.NunitoRegular,
        paddingHorizontal: 4,
        marginTop: 8,
        marginBottom: -30,
        fontSize: 18
    },
    errorLabel: {
        marginTop: 2,
        color: 'red'
    },
    inputStyle1: {
        borderWidth: 0,
        marginBottom: 20,
    },
    inputStyle: {
        borderWidth: 0,
        marginBottom: 20,
    },
    textStyle: {
        color: colors.COLOR_LIGHT_GREY,
        fontFamily: APP_FONTS.NunitoRegular,
        fontSize: FONT_SIZE.l,
        marginLeft: -4
    },
    textStyle1: {
        color: colors.COLOR_BLACK,
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
    separatorStyle: {
        height: 2,
        backgroundColor: colors.COLOR_BLUE,
    },
    buttonContainer: {
        flexDirection: "row",
        marginTop: 20,
        marginBottom: 10,
        width: '90%',
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
})