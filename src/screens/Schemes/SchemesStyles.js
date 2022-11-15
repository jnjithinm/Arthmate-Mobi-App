import { StyleSheet } from 'react-native';

import * as colors from "../../constants/colors";
import { APP_FONTS, FONT_SIZE } from '../../constants/styleConfig';

export const SchemesStyles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: colors.COLOR_WHITE,
        marginLeft: 20,
        marginRight: 20,
        marginTop: 10,
        marginBottom: 20
    },
    buttonContainer: {
        marginTop: 20,
        marginBottom: 10,
        width: '45%',
    },
    schemesLabel: {
        fontFamily: APP_FONTS.NunitoBold,
        color: colors.COLOR_BLACK,
        fontSize: FONT_SIZE.xl,
        marginTop: 10,
        textAlign: "center"
    },
    sourceTypeLabelStyle: {
        fontFamily: APP_FONTS.NunitoBold,
        fontSize: FONT_SIZE.xl,
        color: colors.COLOR_DARK_NAVY_BLUE,
        marginTop: 10,
        marginBottom: 10
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
    inputContainer: {
        flexDirection: "column",
        justifyContent: "space-between"
    },
    disableTextStyle: {
        color: colors.COLOR_SPACE_GREY,
        fontFamily: APP_FONTS.NunitoBold,
        fontSize: FONT_SIZE.m,
        textAlign: "center"
    },
})