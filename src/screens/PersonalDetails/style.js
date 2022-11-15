import { StyleSheet } from 'react-native';
import * as colors from '../../constants/colors';
import { APP_FONTS, FONT_SIZE } from '../../constants/styleConfig';

export default PersonalDetailsStyles = StyleSheet.create({
  lableStyle: {
    fontFamily: APP_FONTS.NunitoBold,
    color: colors.COLOR_LIGHT_NAVY_BLUE,
    fontSize: FONT_SIZE.xl,
    paddingRight: 15,
  },
  mainContainer: {
    flex: 1,
    backgroundColor: colors.COLOR_WHITE,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 10,
    marginBottom: 20
  },
  cardContainer: {
    padding: 5,
    marginBottom: 5,
  },
  SelfieRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  PhotoRow: {
    marginTop: 20,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  PhotoRowSelfie: {
    width: 200,
    height: 200,
  },
  closeIcon: {
    marginLeft: -150,
    marginTop: -10,
  },
  containerStyles: {
    borderWidth: 0,
    borderBottomWidth: 2,
    borderColor: colors.COLOR_BLUE,
  },
  inputStyles: {
    color: colors.COLOR_SPACE_GREY,
    fontFamily: APP_FONTS.NunitoRegular,
    fontSize: 18,
    marginTop: 15,
    marginBottom: -10,
  },
  ButtonRow: {
    marginTop: 20,
    marginBottom: 10,
    width: '45%',
    alignSelf: 'center',
  },
  ButtonRow1: {
    marginTop: 20,
    marginBottom: 10,
    width: '45%',
    alignSelf: 'center',
    marginLeft: 10
  },
  mainHeadingText: {
    color: colors.COLOR_BLACK,
    fontFamily: APP_FONTS.NunitoExtraBold,
    fontSize: FONT_SIZE.l,
    alignSelf: 'center',
    marginBottom: 10
  },

  Row: {
    marginBottom: 15,

  },

  inputTextPasswordStyle: {
    color: colors.COLOR_BLACK,
    fontFamily: APP_FONTS.NunitoRegular,
    paddingHorizontal: 4,
    marginTop: 6,
    marginBottom: -10,
    fontSize: FONT_SIZE.l
  },

  inputStyle: {
    borderWidth: 0,
    marginTop: 10,
    marginBottom: 10,
    fontFamily: APP_FONTS.NunitoRegular
  },

  separatorStyle: {
    height: 2,
    backgroundColor: colors.COLOR_BLUE,
  },

  textStyleDrop: {
    color: colors.COLOR_LIGHT_GREY,
    fontFamily: APP_FONTS.NunitoRegular,
    fontSize: FONT_SIZE.l,
    marginLeft: 4,
    marginTop: 5
  },
});
