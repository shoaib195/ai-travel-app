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
      marginBottom: Metrics.heightRatio(6),
      gap: 12,
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
      marginTop: Metrics.heightRatio(15),
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
      fontSize: scale(11),
      fontFamily: AppFonts.visbyDemiBold,
      color: secondaryText,
      marginTop: moderateVerticalScale(8),
      marginRight: moderateScale(17),
    },
    biometriContainer: {
      flexDirection: 'row',
      // gap:25,
      alignItems: 'center',
      marginTop: moderateVerticalScale(30),
      justifyContent: 'center',
    },
    fingerPrintImg: {
      width: moderateScale(35),
      height: moderateScale(45),
    },
    faceidImg: {
      width: moderateScale(43),
      height: moderateScale(43),
    },
    verticalLine: {
      width: 2,
      height: 38,
      backgroundColor: defaultBackground,
      marginHorizontal: moderateScale(16),
    },
    biometricLoginText: {
      fontSize: scale(15),
      fontFamily: AppFonts.visbyRegular,
      color: primaryText,
      marginHorizontal: moderateScale(22),
      textAlign: 'center',
    },
  });
