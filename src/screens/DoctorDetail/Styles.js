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
      // backgroundColor: 'red',
    },
    container: {
      flex: 1,
      paddingHorizontal: Metrics.widthRatio(16),
      backgroundColor: defaultBackground,
      paddingTop: Metrics.heightRatio(10),
    },
    doctorCard: {
      backgroundColor: '#D9D9D9',
      borderRadius: 32,
      paddingVertical: Metrics.heightRatio(20),
      paddingHorizontal: Metrics.widthRatio(38),
      marginBottom: Metrics.heightRatio(10)
    },
    doctorCardImageBox: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    },
    doctorCardImage: {
      backgroundColor: '#A7A7A7',
      width: Metrics.heightRatio(84),
      height: Metrics.heightRatio(84),
      borderRadius: 50,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: Metrics.heightRatio(8)
    },
    doctorCardIcon: {
      width: Metrics.heightRatio(20),
      height: Metrics.heightRatio(20)
    },
    doctorCardName: {
      fontSize: Metrics.generatedFontSize(16),
      fontFamily: AppFonts.visbyBold,
      color: '#000',
      lineHeight: Platform.OS === 'ios' ? 18 : 16,
      marginBottom: Metrics.heightRatio(3)
    },
    doctorCardSpeciality: {
      fontSize: Metrics.generatedFontSize(14),
      fontFamily: AppFonts.visbyRegular,
      color: '#000',
    },
    doctorAboutCardList: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: Metrics.heightRatio(31)
    },
    doctorAboutCard: {
      justifyContent: 'center',
      alignItems: 'center'
    },
    doctorAboutCardIcon: {
      width: Metrics.heightRatio(20),
      height: Metrics.heightRatio(20),
      marginBottom: Metrics.heightRatio(7)
    },
    doctorAboutCardName: {
      fontSize: Metrics.generatedFontSize(12),
      fontFamily: AppFonts.visbyBold,
      color: '#000',
      lineHeight: Platform.OS === 'ios' ? 14 : 12,
    },
    doctorAboutCardSpeciality: {
      fontSize: Metrics.generatedFontSize(12),
      fontFamily: AppFonts.visbyRegular,
      color: '#000',
      lineHeight: Platform.OS === 'ios' ? 15 : 13,
    },

    availableSlotCard: {
      backgroundColor: '#D9D9D9',
      borderRadius: 32,
      paddingVertical: Metrics.heightRatio(14),
      marginBottom: Metrics.heightRatio(10)
    },
    availableSlotCardTitle: {
      fontSize: Metrics.generatedFontSize(16),
      fontFamily: AppFonts.visbyBold,
      color: '#000',
      textAlign: 'center',
      lineHeight: Platform.OS === 'ios' ? 18 : 16,
      marginBottom: Metrics.heightRatio(16)
    },
    availableSlotCardTimings: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    availableSlotCardTimgsCard: {
      flex:1,
      alignItems: 'center',
      gap:4
    },
    lineSeparator: {
      borderRightColor: '#000',
      borderRightWidth: 1
    },
    verticalLineView: {
      width: 1,
      marginTop:5,
        backgroundColor: 'black',
    },
    availableSlotTimingsTites: {
      fontSize: Metrics.generatedFontSize(12),
      fontFamily: AppFonts.visbyRegular,
      color: '#000',
      lineHeight: Platform.OS === 'ios' ? 14 : 12,
    },

    doctorTabsCard: {
      backgroundColor: '#D9D9D9',
      borderRadius: 32,
      overflow:'hidden',
      height: Metrics.heightRatio(315),
      paddingTop: Metrics.heightRatio(22),
      paddingBottom: Metrics.heightRatio(5),
      paddingHorizontal:Metrics.widthRatio(14),
    },

    rowContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 12,
    },
    centeredRow: {
      justifyContent: 'center',
    },
    slotBox: {
      backgroundColor: '#B4B4B4',
      paddingVertical: 10,
      paddingHorizontal: 15,
      borderRadius: 10,
      width: '47%',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    activeBtnStyle: {
      backgroundColor: secondaryBackground,
      borderColor: 'transparent',
      borderWidth: 0,
    },
      btnContainer: {
        marginTop: Metrics.heightRatio(16),
          marginHorizontal: Metrics.widthRatio(8),
          marginBottom: Metrics.heightRatio(21),
        },
  });
