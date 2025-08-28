import {Platform, StyleSheet} from 'react-native';
import {
  scale,
  moderateScale,
  moderateVerticalScale,
} from 'react-native-size-matters';
import {colorTheme} from '../../constants/ColorConstants';
import {AppFonts} from '../../constants/AppFonts';
import Metrics from '../../constants/Metrics';

const {
  errorText,
  primaryBackground,
  disableBackground,
  defaultBackground,
  primaryBorder,
  defaultText,
  secondaryBackground,
} = colorTheme;

export const getStyles = (width, height) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: defaultBackground,
    },
    contentView: {
      flex: 1,
      marginHorizontal: Metrics.widthRatio(17),
      marginTop: Metrics.heightRatio(10),
    },
    titleView: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: Metrics.heightRatio(6),
    },
    titleText: {
      fontSize: Metrics.generatedFontSize(32),
      color: defaultText,
      fontFamily: AppFonts.visbyBold,
      lineHeight: moderateVerticalScale(30),
    },
    subTitle: {
      fontSize: Metrics.generatedFontSize(16),
      fontFamily: AppFonts.visbyRegular,
      color: defaultText,
      marginBottom: Metrics.heightRatio(30),
      paddingLeft: moderateScale(4),
      lineHeight: moderateVerticalScale(15),
    },
    btnContainer: {
      marginHorizontal: Metrics.widthRatio(24),
      marginBottom: Metrics.heightRatio(21),
    },
    activeBtnStyle: {
      backgroundColor: secondaryBackground,
      borderColor: 'transparent',
      borderWidth: 0,
    },
    btnStyle: {
      backgroundColor: disableBackground,
      borderColor: disableBackground,
      borderWidth: 1,
    },
    errorText: {
      fontSize: scale(12),
      color: errorText,
      marginTop: moderateScale(6),
      marginLeft: moderateScale(5),
      fontFamily: AppFonts.visbyRegular,
      // backgroundColor:'green'
    },
  });
