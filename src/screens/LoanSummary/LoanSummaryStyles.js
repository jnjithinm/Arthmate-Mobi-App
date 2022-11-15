import {StyleSheet} from 'react-native';
import * as colors from '../../constants/colors';
import {APP_FONTS, FONT_SIZE} from '../../constants/styleConfig';

export const LoanSummaryStyles = StyleSheet.create({
  mainContainer: {
    backgroundColor: colors.COLOR_WHITE,
    height: '100%',
    width: '100%',
  },
  buttonContainer: {
    width: '45%',
    marginLeft: 20,
    marginBottom: 20,
    borderColor: colors.COLOR_LIGHT_NAVY_BLUE,
    backgroundColor: colors.COLOR_WHITE,
  },
  cardHolder: {
    backgroundColor: colors.COLOR_WHITE,
    // margin: 15,
    shadowColor: colors.COLOR_BLACK,
    shadowOpacity: 1,
    shadowRadius: 2,
    shadowOffset: {height: 3, width: 3},
    elevation: 3,
    marginBottom: 30,
    width: '88%',
    marginTop: 28,
    marginLeft: 20,
  },
  cardContainer: {
    marginLeft: 20,
    marginRight: 20,
      marginTop: 15,
    marginBottom: 20,
  },
  activeCardHeaderStyle: {
    color: colors.COLOR_DARK_NAVY_BLUE,
    fontFamily: APP_FONTS.NunitoBold,
    fontSize: FONT_SIZE.xl,
  },
  verifiedLabelStyle: {
    color: colors.COLOR_GREEN,
    fontFamily: APP_FONTS.NunitoRegular,
    marginTop: 10,
    fontSize: FONT_SIZE.l,
  },
  pendingTextLabels: {
    fontFamily: APP_FONTS.NunitoRegular,
    color: colors.COLOR_LIGHT_GREY,
    fontSize: FONT_SIZE.l,
    marginTop: 10,
  },
  horizontalScrollStyle: {marginTop: 30, marginLeft: 20, marginRight: 20},
  flexRowStyle: {
    flexDirection: 'row',
  },
  cifIDText: {
    fontFamily: APP_FONTS.NunitoRegular,
    color: colors.COLOR_LIGHT_GREY,
    fontSize: FONT_SIZE.l,
    alignSelf: 'center',
  },
  greenCircle: {
    height: 30,
    width: 30,
    borderRadius: 15,
    backgroundColor: colors.COLOR_GREEN,
    justifyContent: 'center',
  },
  greenLine: {
    width: 2,
    height: '100%',
    backgroundColor: colors.COLOR_GREEN,
    marginLeft: 15,
  },
  stepTextStyle: {
    color: colors.COLOR_WHITE,
    textAlign: 'center',
    fontFamily: APP_FONTS.NunitoExtraBold,
  },
  separatorStyle: {
    // height: 10,
    margin: 10,
    borderWidth: 0.5,
    borderColor: colors.COLOR_LIGHT_NAVY_BLUE,
    // width: "100%",
    marginTop: -1,
    marginLeft: 20,
    marginRight: 20,
  },
  stepTitleStyle: {
    fontFamily: APP_FONTS.NunitoBold,
    fontSize: FONT_SIZE.l,
    color: colors.COLOR_STEPPER_GREY,
    marginLeft: 20,
    marginTop: -30,
  },
  editContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  editTextStyle: {
    fontFamily: APP_FONTS.NunitoRegular,
    fontSize: FONT_SIZE.l,
    color: colors.COLOR_LIGHT_GREY,
    marginRight: 2,
  },
  verifiedTickStyle: {
    height: 20,
    width: 20,
    marginTop: 12,
  },
  buttonAddContainer: {
    width: '70%',
    alignSelf: 'center',
  },
  addGuarantorButtonStyle: {marginTop: 20, marginBottom: 20},
});
