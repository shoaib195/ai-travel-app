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
  primaryText,
  secondaryText,
  primaryBackground,
  primaryBorder,
  defaultText,
  secondaryBackground,
  defaultBackground,
  disableBackground,
  errorText,
} = colorTheme;

export const getStyles = (width, height) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: defaultBackground,
    },
    contentView: {
      flex: 1,
      paddingHorizontal: Metrics.widthRatio(17),
      marginTop: Metrics.heightRatio(10),
    },
    titleView: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: Metrics.heightRatio(40),
    },
    titleText: {
      fontSize: Metrics.generatedFontSize(32),
      color: defaultText,
      fontFamily: AppFonts.visbyBold,
      lineHeight: moderateVerticalScale(30),
    },
    iconContainer: {
      // marginBottom: moderateVerticalScale(3),
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
    forgetPasswordText: {
      alignSelf: 'flex-end',
      fontSize: Metrics.generatedFontSize(12),
      fontFamily: AppFonts.visbyDemiBold,
      color: secondaryText,
      marginTop: Metrics.heightRatio(8),
      marginRight: moderateScale(17),
    },
    biometriContainer: {
      flexDirection: 'row',
      // gap:25,
      alignItems: 'center',
      marginTop: Metrics.heightRatio(30),
      justifyContent: 'center',
    },
    fingerPrintImg: {
      width: Metrics.widthRatio(35),
      height: Metrics.heightRatio(45),
    },
    faceidImg: {
      width: Metrics.heightRatio(43),
      height: Metrics.heightRatio(43),
    },
    verticalLine: {
      width: 2,
      height: 38,
      backgroundColor: primaryBackground,
      marginHorizontal: moderateScale(16),
    },
    biometricLoginText: {
      fontSize: scale(15),
      fontFamily: AppFonts.visbyRegular,
      color: defaultText,
      marginHorizontal: Metrics.widthRatio(22),
      textAlign: 'center',
    },
  });
