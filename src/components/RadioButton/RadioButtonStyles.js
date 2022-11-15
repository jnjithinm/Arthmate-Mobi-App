import { StyleSheet } from 'react-native';

import * as colors from "../../constants/colors";
import { APP_FONTS, FONT_SIZE } from "../../constants/styleConfig";

export const RadioButtonStyles = StyleSheet.create({
    mainContainer: {
        height: 20,
        width: 20,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: colors.COLOR_BORDER_GREY,
        justifyContent: "center",
        marginTop: 4,

    },
    contentContainer: {
        flexDirection: "row"
    },
    selectedButtonStyle: {
        height: 12,
        width: 12,
        borderRadius: 6,
        backgroundColor: colors.COLOR_LIGHT_NAVY_BLUE,
        alignSelf: "center"
    },
    titleStyle: {
        marginLeft: 5,
        marginRight: 20,
        color: colors.COLOR_GREY,
        fontFamily: APP_FONTS.NunitoRegular,
        fontSize: FONT_SIZE.l,
    },
});
