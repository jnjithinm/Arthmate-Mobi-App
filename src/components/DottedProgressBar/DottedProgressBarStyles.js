import { StyleSheet } from 'react-native';

import * as colors from "../../constants/colors";
import { APP_FONTS, FONT_SIZE } from "../../constants/styleConfig";

export const DottedProgressBarStyles = StyleSheet.create({
    mainContainer: {
        flexDirection: "row",
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'red',
        margin:10,
        // flex: 1,
        width: '100%',
        display: 'flex',
        alignSelf: 'center'
    },
    mainContainer1: {
        flexDirection: "row",
        // flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    greenCircle: {
        height: 30,
        width: 30,
        borderRadius: 15,
        backgroundColor: colors.COLOR_GREEN,
        justifyContent: "center",
        // alignSelf: 'center'
    },
    greenLine: {
        height: 2,
        backgroundColor: colors.COLOR_GREEN,
        // flex: 1,
        // width: '100%',
        // width: 30,
        alignSelf:'center',
        // marginTop: 14
    },
    stepNumberStyle: {
        textAlign: "center",
        color: colors.COLOR_WHITE,
        fontFamily: APP_FONTS.NunitoBold,
        fontSize: FONT_SIZE.m,
    },
});
