import { StyleSheet } from 'react-native';

import * as colors from "../../constants/colors";
import { APP_FONTS, FONT_SIZE } from '../../constants/styleConfig';

export const ITRVerificationStyles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: colors.COLOR_WHITE,
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 20,
        marginTop: -12
    },
    progressBarContainer: { alignContent: "center", zIndex: 1, },
    itrVerificationTextStyle: {
        fontSize: FONT_SIZE.xl,
        fontFamily: APP_FONTS.NunitoBold,
        color: colors.COLOR_BLACK,
        textAlign: "center",
        marginTop: 10
    },
    verificationModeTextStyle: {
        fontSize: FONT_SIZE.l,
        fontFamily: APP_FONTS.NunitoBold,
        color: colors.COLOR_LIGHT_NAVY_BLUE,
        marginTop: 20
    },
    contentContainer: {
        marginLeft: 20,
        marginRight: 20
    },
    radioButtonContainer: {
        marginTop: 10
    },
    radioButtonStyle: {
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
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 30,
        marginBottom: 30
    },
    imageContainer: {
        backgroundColor: colors.COLOR_LIGHT_NAVY_BLUE,
        height: 70,
        width: 70,
        borderRadius: 35,
        justifyContent: "center"
    },
    imageContentContainer: {
        flexDirection: "row",
        marginTop: 30,
        marginBottom: 30
    },
    buttonLink: {
        flex: 1,
        height: 60,
        borderRadius: 30,
        backgroundColor: colors.COLOR_LIGHT_GREY,
        alignSelf: "center",
        width: "40%",
        marginTop: 20,
        marginBottom: 30
    },
    uploadITRTextStyle: {
        alignSelf: "center",
        marginLeft: 10,
        fontFamily: APP_FONTS.NunitoBold,
        color: colors.COLOR_DARK_NAVY_BLUE
    },
    placeHolderImageStyle: {
        height: 40,
        width: 40,
        marginLeft: 18
    },
    flexRowStyle: {
        flexDirection: "row"
    },
    imageNameTextStyle: {
        marginLeft: 10,
        flex: 1,
        marginRight: 10,
        color: colors.COLOR_LIGHT_GREY,
        fontFamily: APP_FONTS.NunitoRegular,
        fontSize: FONT_SIZE.m,
        alignSelf: "center"
    },
    closeIconContainer: {
        marginTop: 5
    },
});