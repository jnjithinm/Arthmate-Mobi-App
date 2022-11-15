import { StyleSheet, Platform } from 'react-native';

import * as colors from "../../constants/colors";
import { APP_FONTS, FONT_SIZE } from "../../constants/styleConfig";

export const HeaderStyles = StyleSheet.create({
    containerStyle: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: 'center',
        //height: 50,
        width: '100%',
        backgroundColor: 'transparent',
        paddingLeft: 20,
        paddingRight: 20,
        ...(Platform.OS !== 'android' && {
            /*    paddingBottom: 10, */
            marginTop: 20
        })
    },
    headerStyle: {
        marginTop: 10,
        alignSelf: 'center',
        flexWrap: 'wrap',
        color: colors.COLOR_DARK_BLUE,
        fontSize: FONT_SIZE.xl,
        fontFamily: APP_FONTS.NunitoExtraBold,
        // marginLeft: 10
    },
    imageStyle: {
        height: 40,
        width:40,
        marginTop: 10
    },
});
