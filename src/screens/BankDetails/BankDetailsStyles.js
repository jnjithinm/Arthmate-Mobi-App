import { StyleSheet, Platform } from 'react-native';

import * as colors from "../../constants/colors";
import { APP_FONTS, FONT_SIZE } from '../../constants/styleConfig';

export const BankDetailsStyles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: colors.COLOR_WHITE,
        marginLeft: 20,
        paddingLeft: 10,
        marginRight: 20,
        marginTop: 30,
        marginBottom: 20,
    },
    progressBarContainer: {
        // alignContent: "center",
        // zIndex: 1,
        // marginLeft: 60,
        marginTop: 10
    },
    mainHeadingText: {
        color: colors.COLOR_BLACK,
        fontFamily: APP_FONTS.NunitoBold,
        fontSize: FONT_SIZE.l,
        alignSelf: 'center',
        marginTop: 20,
    },
    uploadSalaryText: {
        color: colors.COLOR_BLUE,
        fontFamily: APP_FONTS.NunitoBold,
        fontSize: FONT_SIZE.l,
        marginTop: 20,
    },
    inputContainer: {
        flexDirection: "column",
        justifyContent: "space-between"
    },
    textGoogle: {
        fontFamily: APP_FONTS.NunitoRegular,
        marginLeft: 25,
        marginTop: -5,
        fontSize: FONT_SIZE.xs,
        color: colors.COLOR_GREY
    },
    textStyle: {
        color: colors.COLOR_LIGHT_GREY,
        fontFamily: APP_FONTS.NunitoRegular,
        fontSize: FONT_SIZE.l,
        marginLeft: -4
    },
    errorLabel: {
        marginTop: 2,
        color: 'red'
    },
    separatorStyle: {
        height: 1,
        marginBottom: 5,
        backgroundColor: colors.COLOR_BORDER_GREY,
    },
    inputStyle: {
        borderWidth: 0,
        marginTop: 10,
        marginBottom: 10,
    },
    inputTextPasswordStyle: {
        color: colors.COLOR_SPACE_GREY,
        fontFamily: APP_FONTS.NunitoRegular,
        paddingHorizontal: 4,
        marginTop: 6,
        marginBottom: -10,
        fontSize: 18
    },
    imageContainer: {
        backgroundColor: colors.COLOR_LIGHT_NAVY_BLUE,
        height: 70,
        width: 70,
        borderRadius: 35,
        justifyContent: "center"
    },
    uploadContainer: {
        marginTop: 10,
    },
    flexRowStyle: {
        flexDirection: "row",
    },
    buttonContainer: {
        flexDirection: "row",
        marginTop: 20,
        marginBottom: 20,
        width: '100%',
        alignSelf: 'center'
    },
    buttonContainer1: {
        marginTop: 20,
        marginBottom: 10,
        width: '50%',
        alignSelf: 'center'
    },
    buttonContainer2: {
        marginTop: 10,
        marginBottom: 10,
        width: '50%',
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
    salarySlipText: {
        marginTop: 25,
        marginLeft: 15,
        marginRight: 15,
    },
    salarySlipName: {
        flex: 1,
        marginRight: 15,
    },
    mainSalaryView: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    toolTipContainer: {
        height: 20,
        width: 20,
        borderRadius: 10,
        borderColor: colors.COLOR_BLACK_SHADE,
        borderWidth: 1,
        marginTop: 10,
        alignItems: "center",
        justifyContent: "center"
    },
    informationToolTipText: {
        color: colors.COLOR_BLACK_SHADE,
    },
    fetchMainView: {
        flex: 1,
        flexDirection: 'row'
    },
    floatingPointView: {
        marginTop: 10,
        flex: 8,
        borderColor: "black",
        borderRadius: 1,
        borderBottomWidth: 1
    },
    floatingPointView1: {
        flex: 1,
        borderColor: "black",
        borderRadius: 1,
        borderBottomWidth: 1
    },
    listBoxStyle: {
        flex: 1,
        backgroundColor: colors.COLOR_WHITE,
        shadowColor: colors.COLOR_BLACK,
        shadowOpacity: 1,
        shadowRadius: 2,
        shadowOffset: { height: 0.5, width: 0.5 },
        elevation: 3,
        marginBottom: 10,
        marginTop: 10,
    },
    dataContainer: {
        marginLeft: 20,
        marginRight: 20,
        flexDirection: 'row',
        justifyContent: "space-between",
    },
    lableStyle: {
        color: colors.COLOR_DARK_NAVY_BLUE,
        fontFamily: APP_FONTS.NunitoBold,
        fontSize: FONT_SIZE.m,
        marginTop: 5
    },
    lableStyleButton: {
        color: colors.COLOR_NIMBUS_GREY,
        fontFamily: APP_FONTS.NunitoRegular,
        fontSize: FONT_SIZE.m,
        marginTop: 5
    },
    dataStyle: {
        color: colors.COLOR_NIMBUS_GREY,
        fontFamily: APP_FONTS.NunitoRegular,
        fontSize: FONT_SIZE.m,
        marginTop: 2
    },
    flexRow: {
        flexDirection: "row"
    },
    imageStyle: {
        marginTop: 12,
        flex: 0.5,
        height: 10,
        width: 10
    },
    actionLabelStyle: {
        fontFamily: APP_FONTS.NunitoRegular,
        fontSize: FONT_SIZE.m,
        marginTop: 2,
        color: colors.COLOR_LIGHT_NAVY_BLUE
    },
    tabularLayout: {
        flex: 1,
        alignSelf: 'stretch'
    },
    flatListStyle: {
        flex: 1,
        marginTop: 20
    },
})