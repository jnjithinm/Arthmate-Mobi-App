import { StyleSheet } from 'react-native';

import * as colors from "../../constants/colors";
import { APP_FONTS, FONT_SIZE } from '../../constants/styleConfig';

export const VerificationStyles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: colors.COLOR_WHITE,
        marginLeft: 20,
        marginRight: 20,
        marginTop: 30,
        marginBottom: 20
    },
    buttonContainer: {
        flexDirection: "row",
        marginTop: 5,
        marginBottom: 10,
        justifyContent: 'space-evenly',
        alignItems: 'center',
        width: "100%"
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
    textInputStyleConsent: {
        marginTop: 5,
        color: colors.COLOR_DARK_NAVY_BLUE,
        fontFamily: APP_FONTS.NunitoExtraBold,
        fontSize: FONT_SIZE.l,
        marginBottom: 3
    },
    viewLine: {
        borderBottomWidth: 2,
        borderColor: colors.COLOR_LIGHT_GREY,
        opacity: 0.2,
        marginBottom: 10,
    }
})