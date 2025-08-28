import { Platform, StyleSheet } from "react-native";
import {scale, moderateScale} from 'react-native-size-matters';
import { colorTheme } from "../../constants/ColorConstants";
import { AppFonts } from "../../constants/AppFonts";

// const {colorWhite,colorBlack} = THEME.colors;

const {
    primaryText,
    grayText,
    primaryBackground,
    defaultBackground,
    primaryBorder,
  } = colorTheme;

export const getStyles = (bgColor,hasBorder,borderRadius,borderShadow,borderColor) => StyleSheet.create({
    mainInputStyle: {
        flexDirection: 'row',
        backgroundColor: bgColor ? bgColor : primaryBackground,
        borderRadius: borderRadius ? borderRadius : 14,
        alignSelf: 'center',
        alignItems: 'center',
        borderColor: borderColor ? borderColor : primaryBorder,
        borderWidth: hasBorder ? 1 : 0,
        paddingHorizontal:moderateScale(10),

      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowOpacity: borderShadow ? 0.27 : 0,
      shadowRadius: borderShadow ? 4.65 : 0,
      elevation: borderShadow ? 5 : 0,
        
      },
      textInputStyle: {
        height: moderateScale(46),
        flex:1,
        color: primaryText,
        marginHorizontal: Platform.OS === 'ios' ? moderateScale(5) : moderateScale(0),
        fontSize: scale(14),
        fontFamily: AppFonts.visbyRegular,
        lineHeight: moderateScale(17),
      },
      imageIcon: {
        width: moderateScale(16),
        height: moderateScale(16),
      },
      imageIconView: {
            width: 30,
            height: 30,
            justifyContent: 'center',
            alignItems: 'center',
      }
      
})