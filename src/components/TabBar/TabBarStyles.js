import { StyleSheet } from 'react-native';

import * as colors from "../../constants/colors";
import { APP_FONTS, FONT_SIZE } from "../../constants/styleConfig";

export const TabBarStyles = StyleSheet.create({
    titleStyle: {
        padding: 10,
        color: colors.COLOR_LIGHT_NAVY_BLUE,
        fontFamily: APP_FONTS.NunitoBold,
        fontSize: FONT_SIZE.m
    },
    mainContainer: {
        backgroundColor: colors.COLOR_LILAC,
        borderWidth: 1,
        borderColor: colors.COLOR_BORDER_GREY,
        marginLeft: 2,
        marginRight: 2,
    },
    selectedMainConatiner: {
        backgroundColor: colors.COLOR_WHITE,
        borderWidth: 1,
        borderColor: colors.COLOR_BORDER_GREY,
        marginLeft: 2,
        marginRight: 2,
        borderBottomWidth: 0
    },
    tabBarContainer: {
        height: 50,
    },
});
