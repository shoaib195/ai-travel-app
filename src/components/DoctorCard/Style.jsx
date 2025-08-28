import { Platform, StyleSheet } from 'react-native';
import Metrics from '../../constants/Metrics';
import { colorTheme } from '../../constants/ColorConstants';
import { AppFonts } from '../../constants/AppFonts';


const { primaryText, secondaryText } = colorTheme;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#D9D9D9',
    borderRadius: 22,
    flex: 1,
    paddingTop: Metrics.heightRatio(18),
    paddingBottom: Metrics.heightRatio(14),
    height: Metrics.heightRatio(167),
    maxWidth: '48%',
  },
  imagePlaceholder: {
    backgroundColor: '#A7A7A7',
    borderRadius: (50),
    height: Metrics.heightRatio(56),
    width: Metrics.heightRatio(56),
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    overflow: 'hidden'
  },
  imageColorOfPlaceholder: {
    color: '#F5F7F8',
  },
  name: {
    fontSize: Metrics.generatedFontSize(14),
    fontFamily: AppFonts.visbyBold,
    textAlign: 'center',
    color: '#000',
    lineHeight: Platform.OS === 'ios' ? 16 : 14,
    marginTop: Metrics.heightRatio(6)
  },
  specialty: {
    fontSize: Metrics.generatedFontSize(12),
    fontFamily: AppFonts.visbyRegular,
    color: '#000',
    textAlign: 'center',
    lineHeight: Platform.OS === 'ios' ? 14 : 12,
    marginTop: Metrics.heightRatio(3)
    // marginBottom: Metrics.smallMargin,
  },
  icon: {
    width: Metrics.widthRatio(60),
    height: Metrics.heightRatio(60),
    // marginBottom: 5,
  },
  footer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingHorizontal: Metrics.widthRatio(14)
  },
  rating: {
    flexDirection: 'row',
  },
  ratingText: {
    marginLeft: Metrics.widthRatio(4),
    fontSize: Metrics.generatedFontSize(12),
    fontFamily:AppFonts.visbyRegular,
    lineHeight: 14,
    color: '#000'
  },
  fee: {
    fontSize: Metrics.generatedFontSize(12),
    fontFamily:AppFonts.visbyBold,
    color: '#000'
  },
});

export default styles;
