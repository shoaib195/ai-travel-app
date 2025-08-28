import {Platform, StyleSheet} from 'react-native';
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
    scrollViewStyle: {
      flexGrow: 1,
    },
    titleView: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: Metrics.heightRatio(10),
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
    },
    otpContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginBottom: Metrics.heightRatio(30)
    },
    activeBtnStyle: {
      backgroundColor: secondaryBackground,
      borderColor: 'transparent',
      borderWidth: 0,
    },
    btnStyle: {
      backgroundColor: secondaryBackground,
      borderColor: secondaryBackground,
      borderWidth: 1,
    },
    btnResendTextStyle: {
      fontSize: scale(20),
    },
    btnResendStyle: {
      marginTop: 25,
      marginBottom: 25,
      backgroundColor: secondaryBackground,
    },
  });
