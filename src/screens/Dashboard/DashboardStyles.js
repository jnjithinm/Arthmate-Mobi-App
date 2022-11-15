import { StyleSheet } from "react-native";

import * as colors from "../../constants/colors";
import { APP_FONTS, FONT_SIZE } from "../../constants/styleConfig";

export const DashboardStyles = StyleSheet.create({
    circles: {
        flexDirection: "row"
    },
    circleContainer: {
        alignSelf: 'center'
    },
    leftCircle: {
        marginHorizontal: 5
    },
    rightCircle: {
        marginHorizontal: 5,
        marginTop: 30
    },
    outerCircle: {
        width: 150,
        height: 150,
        borderColor: colors.COLOR_LIGHT_NAVY_BLUE,
        borderStyle: 'solid',
        borderRadius: 75,
        borderWidth: 2,
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
    },
    innerCircle: {
        width: 148,
        height: 148,
        borderRadius: 74,
        borderWidth: 10,
        borderColor: 'rgba(216, 216, 216, 0.3)',//color.grey,
        borderStyle: 'solid',
        backgroundColor: "white",
        justifyContent: 'center',
        padding: 20,
    },
    leftCircle1: {
        marginLeft: 40
    },
    rightCircle1: {
        marginLeft: 10,
        //marginLeft: 10,
        marginTop: 30
    },
    circleTitleStyle: {
        fontSize: FONT_SIZE.m,
        fontFamily: APP_FONTS.NunitoSemiBold,
        textAlign: "center",
        color: colors.COLOR_GREY,
    },
    circleCountStyle: {
        fontSize: FONT_SIZE.xxl,
        fontFamily: APP_FONTS.NunitoBlack,
        color: colors.COLOR_LIGHT_NAVY_BLUE,
        textAlign: "center"
    },
    bikeImageStyle: { width: '100%', height: 200, position: 'absolute', bottom: -12 },
    nameStlye: {
        fontSize: FONT_SIZE.l,
        fontFamily: APP_FONTS.NunitoSemiBold,
        color: colors.COLOR_BLACK,
        textAlign: 'center',
        marginTop: 25,
        marginBottom: 30
    },
    rightArrowIcon: {
        alignSelf: "center"
    },
});