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
  errorText,
  primaryBackground,
  disableBackground,
  defaultBackground,
  primaryBorder,
  defaultText,
  secondaryBackground,
} = colorTheme;

const numColumns = 4;
const screenWidth = Dimensions.get('window').width;
const itemWidth = screenWidth / numColumns;
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
    header: {
      marginBottom: Metrics.heightRatio(29),
    },
    headerTitle: {
      fontSize: Metrics.generatedFontSize(16),
      fontFamily: AppFonts.visbyBold,
      color: '#000',
      lineHeight: Platform.OS === 'ios' ? 18 : 16,
      marginBottom: Metrics.heightRatio(7),
    },
    headerSubTitle: {
      fontSize: Metrics.generatedFontSize(14),
      fontFamily: AppFonts.visbyRegular,
      color: '#000',
      letterSpacing: Metrics.widthRatio(0.5),
    },

    checkboxContainer: {
      flexDirection: 'row',
    },
    checkbox: {
      width: Metrics.widthRatio(18),
      height: Metrics.heightRatio(18),
      borderWidth: 0.9,
      borderColor: '#000',
      marginRight: Metrics.widthRatio(11),
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 2.7,
    },
    checkboxTick: {
      width: 20,
      height: 20,
      color: 'red',
      fill: 'red',
    },
    checkedBox: {
      backgroundColor: '#4CAF50',
      borderColor: '#4CAF50',
    },
    checkmark: {
      color: '#fff',
      fontSize: 16,
    },
    label: {
      fontSize: Metrics.generatedFontSize(14),
      fontFamily: AppFonts.visbyRegular,
      color: '#000',
      lineHeight: Platform.OS === 'ios' ? 17 : 16,
    },
    cardDetailsTypeRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      // marginTop: Metrics.heightRatio(20),
    },
    cardDetailsLogoRow: {
      flexDirection: 'row',
    },
    cardLogo: {
      width: Metrics.widthRatio(56),
      height: Metrics.heightRatio(18),
      objectFit: 'contain',
    },
    cardDetails: {
      flex: 1,
    },
    cardDetailsFormBlock: {
      marginTop: Metrics.heightRatio(37),
      gap: 19,
      marginBottom: Metrics.heightRatio(28),
    },
    inputField: {
      // marginBottom: Metrics.heightRatio(19),
    },
    inputFlex: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    inputFieldFlex: {
      width: '48%',
    },
    btnContainer: {
      flex:1,
      justifyContent:'center'
      // marginTop: Metrics.heightRatio(139),
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
