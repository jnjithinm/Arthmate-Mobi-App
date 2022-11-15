import { StyleSheet } from "react-native";

import * as colors from "../../constants/colors";
import { APP_FONTS, FONT_SIZE } from "../../constants/styleConfig";

export const LoginStyles = StyleSheet.create({
  childContainer: {
    marginLeft: 20,
    marginRight: 20,
    justifyContent: 'center',
  },
  imageStyle: {
    height: 113,
    width: 182,
    marginTop: 68
  },
  welcomeText: {
    fontFamily: APP_FONTS.NunitoExtraBold,
    color: colors.COLOR_LIGHT_NAVY_BLUE,
    fontSize: FONT_SIZE.xxl,
    lineHeight: 32,
    marginTop: 30,
    marginBottom: 30
  },
  inputStyle: {
    borderWidth: 0, marginTop: 10, marginBottom: 10,
  },
  separatorStyle: {
    height: 2,
    backgroundColor: colors.COLOR_BLUE,
    marginTop: -6
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 30,
  },
  buttonStyle: {
    paddingLeft: 50,
    paddingVertical: 0,
    width: 200,
    borderRadius: 35,
    backgroundColor: colors.COLOR_LIGHT_NAVY_BLUE,
    justifyContent: "space-between"
  },
  buttonTitle: {
    fontFamily: APP_FONTS.NunitoExtraBold,
    fontSize: FONT_SIZE.l,
  },
  resetPasswordText: {
    fontFamily: APP_FONTS.NunitoSemiBold,
    alignSelf: 'center',
    fontSize: FONT_SIZE.m,
    color: colors.COLOR_LIGHT_NAVY_BLUE
  },
  errorLabel: {
    marginTop: 2,
    color: 'red'
  },
  inputTextStyle: {
    color: colors.COLOR_SPACE_GREY,
    fontFamily: APP_FONTS.NunitoRegular,
    paddingHorizontal: 4,
    marginTop: 8,
    marginBottom: -10,
    fontSize: 18
  },
  inputTextPasswordStyle: {
    color: colors.COLOR_SPACE_GREY,
    fontFamily: APP_FONTS.NunitoRegular,
    paddingHorizontal: 4,
    marginTop: 6,
    marginBottom: -10,
    fontSize: 18
  },
});
