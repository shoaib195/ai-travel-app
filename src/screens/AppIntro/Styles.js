import {Platform, StyleSheet} from 'react-native';
import Metrics from '../../constants/Metrics';
import {colorTheme} from '../../constants/ColorConstants';
import { AppFonts } from '../../constants/AppFonts';
const {defaultText, secondaryBackground} = colorTheme;
export const getStyles = () =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    backgroundImage: {
      flex: 1,
      justifyContent: 'center',
    },
    imageContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    image: {
      width: Metrics.widthRatio(150),
      height: Metrics.heightRatio(150),
    },
    buttonContainer: {
      marginHorizontal:Metrics.widthRatio(24),
      marginBottom: Metrics.heightRatio(34),
      marginTop: Metrics.heightRatio(15),
      justifyContent: 'center',
      alignItems: 'center',
    },
    intro: {
      textAlign: 'center',
      fontSize: Metrics.generatedFontSize(45),
      fontFamily: AppFonts.visbyDemiBold,
      color: defaultText,
      marginBottom: Metrics.heightRatio(32),
      // lineHeight: Platform.OS == 'ios' ? 55 : 50,
    },
    activeBtnStyle: {
      backgroundColor: secondaryBackground,
      borderColor: 'transparent',
      borderWidth: 0,
    },
  });
