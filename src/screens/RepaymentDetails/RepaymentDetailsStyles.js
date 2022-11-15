import { StyleSheet } from 'react-native';
import * as colors from '../../constants/colors';
import { APP_FONTS, FONT_SIZE } from '../../constants/styleConfig';

export const RepaymentDetailsStyles = StyleSheet.create({
    mainContainer: {
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 20,
        flex: 1,
        backgroundColor: colors.COLOR_WHITE
    },
    mainLabel: {
        fontFamily: APP_FONTS.NunitoBold,
        color: colors.COLOR_DARK_NAVY_BLUE,
        fontSize: FONT_SIZE.xl,
        textAlign: "center",
        marginBottom: 20
    },
    calendarIcon: {
        position: "absolute", top: 18, right: 10
    },
    calendarIconWithText: {
        position: "absolute", top: 42, right: 10
    },
    radioLabel: {
        fontFamily: APP_FONTS.NunitoRegular,
        color: colors.COLOR_BLACK,
        fontSize: FONT_SIZE.l,
        marginBottom: 10
    },
    seperatorStyle: {
        height: 1,
        backgroundColor: colors.COLOR_BORDER_GREY,
        marginTop: 10,
        marginBottom: 10
    },
    textStyle: {
        color: colors.COLOR_LIGHT_GREY,
        fontFamily: APP_FONTS.NunitoRegular,
        fontSize: FONT_SIZE.l,
        marginLeft: -4
    },
    inputStyle1: {
        borderWidth: 0,
        marginTop: 10,
        marginBottom: 5,
    },
    buttonNavigation: {
        flexDirection: 'row',
        width: '100%',
        marginTop: 20
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
    separatorStyle: {
        marginBottom: 5,
        height: 1,
        backgroundColor: colors.COLOR_BORDER_GREY,
    },
    buttonSave: {
        marginTop: 20,
        width: '80%',
        alignSelf: 'center',
        marginBottom: 10,
    },
    pddLabel: {
        fontFamily: APP_FONTS.NunitoBold,
        color: colors.COLOR_LIGHT_NAVY_BLUE,
        fontSize: FONT_SIZE.l,
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
    errorLabel: {
        color: 'red'
    },
    floatInputStyle: {
        color: colors.COLOR_LIGHT_GREY,
        fontFamily: APP_FONTS.NunitoRegular,
        fontSize: FONT_SIZE.l,
        marginBottom: -10,
        marginTop: 6,
    },
    plusImageStyle: {
        height: 30,
        width: 30,
        alignSelf: 'center',
    },
    plusImageStyle1: {
        height: 43,
        width: 36,
        marginTop: 15,
        marginBottom: 15,
        marginLeft: 15,
        marginRight: 15,
    },
    uploadContainer: {
        marginTop: 10,
    },
    flexRowStyle: {
        flexDirection: "row",
    },
    imageContainer: {
        backgroundColor: colors.COLOR_LIGHT_NAVY_BLUE,
        height: 70,
        width: 70,
        borderRadius: 35,
        justifyContent: "center"
    },
    mainnachView: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    nachFileName: {
        flex: 1,
        marginRight: 15,
    },
    textInput: {
        height: 40,
        borderColor: 'black',
        borderWidth: 1,
        marginLeft: 10,
        marginBottom: 10,
        width: '70%'
    }
})
