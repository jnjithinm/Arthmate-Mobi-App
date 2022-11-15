import { StyleSheet } from 'react-native';

import * as colors from "../../constants/colors";
import { APP_FONTS, FONT_SIZE } from '../../constants/styleConfig';

export const LeadListStyles = StyleSheet.create({
    button: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 35,
        backgroundColor: colors.COLOR_WHITE,
        justifyContent: "space-between",
        height: 50,
        width: 118,
        justifyContent: "center",
        alignItems: "center"
    },
    buttonTitle: {
        fontFamily: APP_FONTS.NunitoRegular,
        fontSize: 15,
        color: colors.COLOR_NIMBUS_GREY
    },
    selectedButtonTitle: {
        fontFamily: APP_FONTS.NunitoExtraBold,
        fontSize: 15,
        color: colors.COLOR_WHITE,
    },
    selected: {
        backgroundColor: colors.COLOR_LIGHT_NAVY_BLUE,
        justifyContent: "center"
    },
    buttonbackground: {
        flexDirection: "row",
        backgroundColor: colors.COLOR_WHITE,
        borderRadius: 35,
        padding: 5,
        marginVertical: 10,
        shadowColor: colors.COLOR_BLACK,
        shadowOpacity: 1,
        shadowRadius: 2,
        shadowOffset: { height: 0.5, width: 0.5 },
        elevation: 3,
        alignSelf: 'center',
        marginTop: 30,
        height: 60,
    },
    flatListStyle: {
        flex: 1,
        marginTop: 20
    },
    listBoxStyle: {
        flex: 1,
        backgroundColor: colors.COLOR_WHITE,
        marginLeft: 15,
        marginRight: 15,
        shadowColor: colors.COLOR_BLACK,
        shadowOpacity: 1,
        shadowRadius: 2,
        shadowOffset: { height: 0.5, width: 0.5 },
        elevation: 3,
        marginBottom: 10,
        marginTop: 1,
    },
    dataContainer: {
        marginLeft: 10,
        marginRight: 10,
        flexDirection: 'row',
        justifyContent: "space-between",
    },
    lableStyle: {
        color: colors.COLOR_DARK_NAVY_BLUE,
        fontFamily: APP_FONTS.NunitoBold,
        fontSize: FONT_SIZE.m,
        marginTop: 5,

    },
    lableStyleButton: {
        color: colors.COLOR_LIGHT_NAVY_BLUE,
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
    outerCircleStyle: {
        height: 86,
        width: 86,
        borderRadius: 42,
        backgroundColor: 'rgba(154, 150, 150,0.5)',
        position: "absolute",
        right: 20,
        bottom: 20
    },
    innerCircleStyle: {
        height: 84,
        width: 84,
        borderRadius: 44,
        backgroundColor: colors.COLOR_LIGHT_NAVY_BLUE,
        justifyContent: "center",
    },
    buttonTextStyle: {
        alignSelf: "center",
        textAlign: "center",
        fontSize: FONT_SIZE.m,
        color: colors.COLOR_WHITE,
        fontFamily: APP_FONTS.NunitoSemiBold
    },
    flexRow: {
        flexDirection: "row"
    },
    imageStyle: {
        marginTop: 12,
        flex: 0.5,
        height: 10,
        width: 10,
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
    separatorStyle: {
        marginTop: 10,
        height: 2,
        width: "90%",
        alignSelf: 'center',
        backgroundColor: colors.COLOR_BORDER_GREY,
    },
    inputContainer: {
        flexDirection: "row",
        width: "80%",
        marginLeft: 20,
        marginTop: 10
    },
    textInputStyle: {
        width: '90%',
        color: colors.COLOR_LIGHT_GREY,
        fontFamily: APP_FONTS.NunitoRegular,
        fontSize: FONT_SIZE.l,
        marginBottom: -12,
        marginTop: -12
    },
});
