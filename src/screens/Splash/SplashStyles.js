import { StyleSheet } from 'react-native';

import * as colors from "../../constants/colors";

export const SplashStyles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.COLOR_WHITE,
    justifyContent: 'center',
  },
  imageStyle: {
    height: 174,
    alignSelf: 'center',
    width: 255,
  },
  imageContainer: { justifyContent: 'center', flex: 1 }
});
