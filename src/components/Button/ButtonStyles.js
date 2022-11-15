import { StyleSheet } from 'react-native';

import * as colors from "../../constants/colors";
import { APP_FONTS, FONT_SIZE } from "../../constants/styleConfig";

export const ButtonStyles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        height: 60,
        borderRadius: 30,
        backgroundColor: colors.COLOR_LIGHT_NAVY_BLUE,
        justifyContent: "center",
    },
    titleStyle: {
        color: colors.COLOR_WHITE,
        fontFamily: APP_FONTS.NunitoBold,
        fontSize: FONT_SIZE.m,
        textAlign: "center"
    },
    disableStyle: {
        flex: 1,
        height: 60,
        borderRadius: 30,
        backgroundColor: colors.COLOR_LIGHT_GREY,
        justifyContent: "center",
    },
    disableTextStyle: {
        color: colors.COLOR_SPACE_GREY,
        fontFamily: APP_FONTS.NunitoBold,
        fontSize: FONT_SIZE.m,
        textAlign: "center"
    },
});
