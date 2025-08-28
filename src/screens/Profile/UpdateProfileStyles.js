import {Platform, StyleSheet} from 'react-native';
// import { THEME } from '../../shared/theme';
import {
  scale,
  moderateScale,
  moderateVerticalScale,
} from 'react-native-size-matters';
import {colorTheme} from '../../constants/ColorConstants';
import {AppFonts} from '../../constants/AppFonts';
import Metrics from '../../constants/Metrics';

// const {colorWhite,colorBlack} = THEME.colors;

const {
  primaryText,
  errorText,
  primaryBackground,
  defaultText,
  whiteBorder,
  secondaryBackground,
  primaryBorder,
} = colorTheme;

export const getStyles = (width, height) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    contentView: {
      flex: 1,
      marginHorizontal: moderateScale(17),
      marginTop: moderateVerticalScale(10),
    },
    profileContainer: {
        justifyContent:'center',
        alignItems:'center',
        gap:16
    },
    profileName:{
    fontSize: Metrics.generatedFontSize(16),
      fontFamily: AppFonts.visbyDemiBold,
      color: '#000',
      lineHeight: 18
    },
    iconContainer: {
      marginBottom: moderateVerticalScale(3),
    },
    inputContainer: {
      marginVertical: Metrics.heightRatio(27),
      gap:19
    },
    btnContainer: {
      flex: 1,
      marginHorizontal: Metrics.widthRatio(17),
      marginBottom: Metrics.heightRatio(21),
      marginTop: Metrics.heightRatio(15),
      justifyContent: 'flex-end',
    },
    checkBoxMainContainer: {
      flex: 1,
      flexDirection: 'row',
      marginBottom: moderateVerticalScale(10),
    },
    ckeckBoxTextView: {
      flex: 1,
      gap: 14,
    },
    ckeckBoxText: {
      fontSize: scale(14),
      fontFamily: AppFonts.visbyRegular,
      color: '#000',
      lineHeight: moderateScale(17),
      // paddingTop:  moderateScale(14 - (14 * 0.99)),
    },
    checkboxContainer: {
      width: moderateScale(20),
      height: moderateScale(20),
      borderWidth: 1,
      borderColor: whiteBorder,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 10,
      borderRadius: 3,
    },
    checkbox: {
      borderWidth: 1,
      borderColor: '#fff',
      width: moderateScale(20),
      height: moderateScale(20),
      borderRadius: 3,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: primaryBackground,
    },
    text: {
      marginLeft: 10,
      color: '#fff', // Text color similar to the image
      fontSize: 14,
    },
    boldText: {
      fontWeight: 'bold',
      color: '#fff', // Color of the bold text
    },

    checkmark: {
      color: '#1c1c1e',
      fontSize: 16,
      fontWeight: 'bold',
    },
    activeBtnStyle: {
      // backgroundColor: secondaryBackground,
      borderColor: 'transparent',
      borderWidth: 0,
    },
    btnStyle: {
      // backgroundColor: primaryBackground,
      borderColor: primaryBorder,
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
    checked: {
      backgroundColor: secondaryBackground,
      borderColor: secondaryBackground,
    },
  });
