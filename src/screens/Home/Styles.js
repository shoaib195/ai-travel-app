import {Dimensions, Platform, StyleSheet} from 'react-native';
import {colorTheme} from '../../constants/ColorConstants';
import {AppFonts} from '../../constants/AppFonts';
import Metrics from '../../constants/Metrics';
import { moderateVerticalScale } from 'react-native-size-matters';

const {
  primaryBackground,
  defaultBackground,
  darkBlack,
  primaryText,
  disableBackground,
  darkPurple,
} = colorTheme;
const screenWidth = Dimensions.get('window').width;
const ITEM_WIDTH = (screenWidth - 30) / 2; // 15px total horizontal spacing
export const getStyles = () =>
  StyleSheet.create({
    safeArea: {
      flex: 1,
    },
    container: {
      flex: 1,
      paddingHorizontal: Metrics.widthRatio(16),
      backgroundColor: defaultBackground,
    },
    headerContainer: {
      paddingTop: Metrics.heightRatio(19),
      marginBottom: Metrics.heightRatio(23)
    },
    headerTitle: {
      fontSize: Metrics.generatedFontSize(26),
      fontFamily: AppFonts.visbyBold,
      color: '#333',
      marginBottom: Metrics.heightRatio(3),
      lineHeight: Platform.OS === 'ios' ? 27 : 23,
    },
    headerSubtitle: {
      fontSize: Metrics.generatedFontSize(16),
      fontFamily: AppFonts.visbyRegular,
      color: '#666',
      lineHeight: Platform.OS === 'ios' ? 16 : 15,
    },
    text: {
      color: '#333',
      fontSize: Metrics.generatedFontSize(18),
      fontFamily: AppFonts.visbyBold,
      textAlign: 'center',
    },
    row: {
      gap:14
    },
    contentContainerStyle:{
      gap: 14,
      paddingVertical: Metrics.heightRatio(14),
    },
    cardContainer: {
      flex:1,
        marginTop: moderateVerticalScale(14),
    },
    categoryTitle:{
      fontSize: Metrics.generatedFontSize(20),
      fontFamily: AppFonts.visbyBold,
      color: '#000',
      lineHeight:Platform.OS === 'ios' ? 22 : 18
    },
    item: {
      backgroundColor: '#ccc',
      borderRadius: 22,
      flex: 1,
      justifyContent: 'center',
      height: Metrics.heightRatio(167),
      maxWidth: '48%',
    },
    contentContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      gap: 33
    },
    icon: {
      width: Metrics.widthRatio(30),
      height: Metrics.heightRatio(30),
      // marginBottom: 5,
    },
  });
