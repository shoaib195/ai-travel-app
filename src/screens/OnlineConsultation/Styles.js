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
    safeArea: {
      flex: 1,
    },
    container: {
      flex: 1,
      paddingHorizontal: Metrics.widthRatio(16),
      backgroundColor: defaultBackground,
       paddingTop: Metrics.heightRatio(10),
    },
    categoryContainer: {
      marginTop: Metrics.heightRatio(23),
      marginBottom: Metrics.heightRatio(26),
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: Metrics.heightRatio(15),
    },
    categoryTilesContainer: {
      flexDirection: 'row',
      gap:10
    },
    contentContainerStyle: {
      gap: 14,
      paddingBottom: Metrics.heightRatio(14),
    },
    row: {
      gap: 14,
    },
    headerTitle: {
      fontSize: Metrics.generatedFontSize(20),
      fontFamily: AppFonts.visbyBold,
      color: '#333',
      lineHeight: Platform.OS === 'ios' ? 22 : 18,
    },
    headerButton: {
      fontSize: Metrics.generatedFontSize(14),
      fontFamily: AppFonts.visbyRegular,
      color: '#000',
      lineHeight: Platform.OS === 'ios' ? 18 : 14,
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
      marginBottom: Metrics.heightRatio(30),
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
    searchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    searchInput: {
      flex: 1,
      backgroundColor: '#ddd',
      borderRadius: 13,
      paddingVertical: 10,
      paddingHorizontal: 16,
      fontSize: 16,
    },
    searchButton: {
      marginLeft: 10,
      backgroundColor: '#ddd',
      borderRadius: 13,
      padding: 12,
    },
    SmallBoxSkeletonStyle: {
      marginBottom: -33
    }
  });
