import { StyleSheet, Platform } from 'react-native';

import * as colors from "../../constants/colors";
import { APP_FONTS, FONT_SIZE } from "../../constants/styleConfig";

export const TextImageStyles = StyleSheet.create({
    containerStyle: {
        flexDirection: "row",
        paddingLeft: 10,
    },
    headerStyle: {
        color: colors.COLOR_DARK_BLUE,
        fontSize: FONT_SIZE.l,
        fontFamily: APP_FONTS.NunitoBold,
        marginLeft: 10
    },
    imageStyle: {
        height: 40,
        width: 40,
        borderRadius: 10
    },

});
