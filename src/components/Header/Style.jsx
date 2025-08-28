import {StyleSheet} from 'react-native';
import { moderateScale, moderateVerticalScale, scale } from 'react-native-size-matters';
import { AppFonts } from '../../constants/AppFonts';
import { colorTheme } from '../../constants/ColorConstants';

const {defaultBackground, defaultText,secondaryBackground, darkGrayBackground} = colorTheme;

const screen = ['Home', 'NonPremiumEstimatedQuote'];
const backgroundColorHandler = name => {
  const getScreenName = screen.includes(name);
  if (getScreenName) {
    return 'white';
  } else {
    return defaultBackground;
  }
};

export const getStyles = (screenName) =>
  StyleSheet.create({
    mainContainer: {
      flexDirection: 'row',
      height: moderateScale(78),
      backgroundColor: backgroundColorHandler(screenName),
    },
    cancelRideComponentText: {
      lineHeight: moderateVerticalScale(15),
      fontSize: scale(12),
      fontFamily: AppFonts.ralewayRegular,
    },
    cancelRideComponentBtn: {
      backgroundColor: 'white',
      width: scale(62),
      height: scale(24),
    },
    logo: {
      height: moderateScale(24),
      width: moderateScale(104),
    },
    menuIcon: {
      height: moderateScale(22),
      width: moderateScale(22),
    },
    rightIcon: {
      height: moderateScale(20),
      width: moderateScale(20),
    },
    menuIconView: {
      justifyContent: 'center',
      height: moderateScale(35),
      width: moderateScale(35),
      alignItems: 'center',
    },
    notificationIcon: {
      height: moderateScale(30),
      width: moderateScale(30),
    },
    iconContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    iconView: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    skipStyle: {
      color: 'white',
      textDecorationLine: 'underline',
    },
    titleContainer: {
      flex: 3,
      alignItems: 'center',
      justifyContent: 'center',
    },
    titleStyle: {
      color: defaultText,
      fontFamily: AppFonts.visbyBold,
      fontSize: scale(20),
    },
    LeftTitleTextStyle: {
      color: defaultText,
      fontFamily: AppFonts.visbyBold,
      fontSize: scale(32),
    },
    navigationView: {
      justifyContent: 'center',
      alignItems: 'center',
      width: moderateScale(44),
      height: moderateScale(44),
      backgroundColor: secondaryBackground,
      borderRadius: 10,
    },
    LeftTitleContainer: {
      flex: 1.5,
      paddingLeft: moderateScale(6),
      justifyContent: 'center',
    }
  });
