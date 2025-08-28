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
    OrderSummeryBlock: {
      backgroundColor: '#D9D9D9',
      width: '100%',
      borderRadius: 18,
      paddingHorizontal: Metrics.widthRatio(23),
      paddingVertical: Metrics.heightRatio(22),
    },
    paymentSummeryBlock: {
      backgroundColor: '#D9D9D9',
      width: '100%',
      borderRadius: 18,
      paddingHorizontal: Metrics.widthRatio(23),
      paddingVertical: Metrics.heightRatio(22),
      marginTop: Metrics.heightRatio(18),
    },
    headingBlock: {
      fontSize: Metrics.generatedFontSize(16),
      fontFamily: AppFonts.visbyBold,
      color: '#000',
      lineHeight: Platform.OS === 'ios' ? 18 : 16,
      marginBottom: Metrics.heightRatio(18),
    },
    headingBlockRow: {
      fontSize: Metrics.generatedFontSize(16),
      fontFamily: AppFonts.visbyBold,
      color: '#000',
      lineHeight: Platform.OS === 'ios' ? 18 : 16,
    },
    orderSummaryView: {
      gap: 15,
    },
    PaymentstableRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    PaymentstableCol1: {
      fontSize: Metrics.generatedFontSize(16),
      fontFamily: AppFonts.visbyRegular,
      color: '#000',
      lineHeight: Platform.OS === 'ios' ? 18 : 16,
    },
    PaymentstableCol2: {
      fontSize: Metrics.generatedFontSize(16),
      fontFamily: AppFonts.visbyDemiBold,
      color: '#000',
      lineHeight: 32,
      lineHeight: Platform.OS === 'ios' ? 18 : 16,
    },
    PaymentstableRowGap: {
      marginBottom: 28,
    },
    cardDetailsFlex: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    cardLogo: {
    width: Metrics.widthRatio(29),
      height: Metrics.heightRatio(18),
      marginBottom: Metrics.heightRatio(5)
    },
    PaymentstableColCard: {
      fontSize: Metrics.generatedFontSize(16),
      fontFamily: AppFonts.visbyMedium,
      color: '#000',
    },
    PaymentstableRowGap2: {
      marginBottom: 18,
    },
    header: {
      marginVertical: Metrics.heightRatio(14),
    },
    headerTitle: {
      fontSize: Metrics.generatedFontSize(16),
      fontFamily: AppFonts.visbyBold,
      color: '#000',
      marginBottom: Metrics.heightRatio(7),
      lineHeight: Platform.OS === 'ios' ? 18 : 16,
    },
    headerSubTitle: {
      fontSize: Metrics.generatedFontSize(14),
      fontFamily: AppFonts.visbyRegular,
      color: '#000',
      // letterSpacing: Metrics.widthRatio(.5),
    },
    btnContainer: {
      marginTop: 33,
      marginBottom: 20,
    },
  });
