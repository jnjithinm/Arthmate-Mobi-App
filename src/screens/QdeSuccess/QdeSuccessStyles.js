import { StyleSheet } from 'react-native';
import * as colors from '../../constants/colors';
import { APP_FONTS, FONT_SIZE } from '../../constants/styleConfig';

export const QdeSuccessStyles = StyleSheet.create({
  mainContainer: {
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 20,
    flex: 1,
  },
  QdeSuccessLabel: {
    fontFamily: APP_FONTS.NunitoExtraBold,
    color: colors.COLOR_GREEN,
    fontSize: FONT_SIZE.xl,
    marginTop: 20,
    textAlign: 'center',
  },
  toolTipContainer: {
    height: 40,
    width: 40,
    borderRadius: 20,
    borderColor: colors.COLOR_WHITE,
    borderWidth: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.COLOR_LIGHT_NAVY_BLUE,
  },
  informationToolTipText: {
    color: colors.COLOR_WHITE,
    fontSize: 20,
  },
  LightText: {
    fontFamily: APP_FONTS.NunitoRegular,
    color: colors.COLOR_LIGHT_GREY,
    fontSize: FONT_SIZE.m,
    marginTop: 20,
    paddingRight: 30,
    paddingLeft: 30,
    textAlign: 'center',
  },
  DarkText: {
    fontFamily: APP_FONTS.NunitoBold,
    color: colors.COLOR_DARK_GREY,
    fontSize: FONT_SIZE.m,
    paddingRight: 30,
    paddingLeft: 30,
    textAlign: 'center',
  },
  QdeSuccessGreet: {
    fontFamily: APP_FONTS.NunitoRegular,
    color: colors.COLOR_BLUE,
    fontSize: FONT_SIZE.l,
    marginTop: 20,
    textAlign: 'center',
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: 10,
    marginBottom: 10,
    width: '70%',
    alignSelf: 'center',
  },
  buttonContainerButtons: {
    paddingVertical: 10,
  },
  cancelButtonStyle: {
    borderColor: colors.COLOR_LIGHT_NAVY_BLUE,
    backgroundColor: colors.COLOR_WHITE,
    borderWidth: 1,
  },
  cancelButtonTitleStyle: {
    color: colors.COLOR_LIGHT_NAVY_BLUE,
  },
  separatorStyle1: {
    height: 1,
    marginTop: 10,
    backgroundColor: colors.COLOR_NIMBUS_GREY,
  },
  modalView: {
    margin: 10,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    alignSelf: "center",
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    marginTop: 80,
    width: "90%",

  },
  text: {
    fontFamily: APP_FONTS.NunitoBold,
    color: colors.COLOR_BLACK,
    fontSize: FONT_SIZE.m,
  },
  touchButton: {
    marginTop: 30,
    width: "40%",
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.COLOR_LIGHT_NAVY_BLUE,
    justifyContent: "center",
  },
  separatorStyle: {
    height: 2,
    backgroundColor: colors.COLOR_BLUE,
  },
  textInputStyleAddress: {
    // borderRadius: 2,
    // borderWidth: 1,
    //height: 100,
    // width: 300,
    borderColor: colors.COLOR_LIGHT_GREY,
    //marginTop: 10,
    color: colors.COLOR_BLACK,
    fontFamily: APP_FONTS.NunitoRegular,
    fontSize: FONT_SIZE.l,
  },
  errorLabel: {
    marginTop: 2,
    color: 'red'
  },
  textStyle: {
    color: colors.COLOR_LIGHT_GREY,
    fontFamily: APP_FONTS.NunitoRegular,
    fontSize: FONT_SIZE.l,
    marginLeft: -4
},
});
