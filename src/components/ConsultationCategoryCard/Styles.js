import {Dimensions, Platform, StyleSheet} from 'react-native';
import {
  scale,
  moderateScale,
  moderateVerticalScale,
} from 'react-native-size-matters';
import {AppFonts} from '../../constants/AppFonts';
import {colorTheme} from '../../constants/ColorConstants';
import Metrics from '../../constants/Metrics';

const {
  primaryBorder,
  secondaryBackground,
  defaultBackground,
  primaryBackground,
  defaultText,
} = colorTheme;

const numColumns = 4;
const screenWidth = Dimensions.get('window').width;
const itemWidth = screenWidth / numColumns;

export const getStyles = (width, height) =>
  StyleSheet.create({
    card: {
      backgroundColor: '#fff',
      borderRadius: 8,
      width: Metrics.widthRatio(width),
      // marginRight: Metrics.widthRatio(10),
      
    },
    imagePlaceholder: {
      width: Metrics.widthRatio(width),
      height: Metrics.heightRatio(height),
      borderRadius: 8,
      backgroundColor: '#ccc',
      justifyContent: 'center',
      alignItems: 'center',
    },
    icon: {
      width: Metrics.heightRatio(26),
      height: Metrics.heightRatio(26),
    },
    name: {
      fontSize: Metrics.generatedFontSize(6),
      fontFamily: AppFonts.visbyRegular,
      color: '#000',
      textAlign: 'center',
    },
  });
