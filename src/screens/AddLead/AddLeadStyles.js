import { StyleSheet } from 'react-native';

import * as colors from "../../constants/colors";
import { APP_FONTS, FONT_SIZE } from '../../constants/styleConfig';

export const AddLeadStyles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: colors.COLOR_WHITE,
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 20,
        paddingLeft: 5,
        paddingRight: 5
    },
    sourceTypeLabelStyle1: {
        fontFamily: APP_FONTS.NunitoBold,
        fontSize: FONT_SIZE.xl,
        color: colors.COLOR_DARK_NAVY_BLUE,
        marginTop: 10,
        marginBottom: 10
    },
    sourceTypeLabelStyle: {
        color: colors.COLOR_BLUE,
        fontFamily: APP_FONTS.NunitoRegular,
        fontSize: 15,
        // marginBottom: 10,
        marginTop: 6,
    },
    inputStyle: {
        width: "100%"
    },
    inputStyle1: {
        borderWidth: 0,
        marginTop: 10,
        marginBottom: 5,
    },
    separatorStyle: {
        marginBottom: 5,
        height: 1,
        backgroundColor: colors.COLOR_BORDER_GREY,
    },
    inputContainer1: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "85%",
        marginLeft: 20,
    },
    inputContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "85%",
        marginLeft: 5,
        marginBottom: 10
    },
    textInputStyle: {
        color: colors.COLOR_LIGHT_GREY,
        fontFamily: APP_FONTS.NunitoRegular,
        fontSize: FONT_SIZE.l,
        marginBottom: -10,
        marginTop: 6,
    },
    buttonContainer: {
        flexDirection: "row",
        marginTop: 20,
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
    errorLabel: {
        color: 'red'
    },
});
