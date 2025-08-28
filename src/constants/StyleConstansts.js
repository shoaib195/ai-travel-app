import { StyleSheet } from 'react-native';
import { colorTheme } from './ColorConstants';
import { AppFonts } from './AppFonts';

const { primaryBackground,defaultBackground, darkBlack, primaryText, disableBackground, darkPurple } = colorTheme;

const commonStyles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: 'red',
  },
  h1: {
    fontSize: 34,
    color: darkBlack,
  },
  text: {
    color: 'black'
  },
  textStyle: {
    color: primaryText,
    fontFamily: AppFonts.visbyMedium,
    textAlign: 'center',
  },
  button: {
    backgroundColor: darkPurple,
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  disabledButton: {
    backgroundColor: disableBackground,
  },
});

export default commonStyles;
