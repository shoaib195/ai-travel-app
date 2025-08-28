import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  ActivityIndicator,
  Image,
  Platform,
} from 'react-native';
import {
  moderateScale,
  moderateVerticalScale,
  scale,
} from 'react-native-size-matters';
// import { AppFonts } from '../../../_constants/AppFonts';
import { useSelector } from 'react-redux';
import { AppFonts } from '../../constants/AppFonts';
import { colorTheme } from '../../constants/ColorConstants';
import Metrics from '../../constants/Metrics';

const {disableBackground, primaryBackground, defaultText,primaryText, secondaryBackground} = colorTheme;

const ButtonComponent = ({
  title,
  disabled = true,
  icon,
  pressStatus,
  disabledIconColor = 'red',
  btnStyle,
  onPressIn,
  onPressOut,
  titleStyle,
  iconRight,
  indicatorColor,
  activeOpacity,
  isTouchDisable=false,
  onPress = () => {},
}) => {
    const {colors, scheme} = useSelector(state => state.userReducer);
    const styles = getStyles(colors,disabled);
  return (
    <TouchableOpacity
      disabled={disabled || pressStatus || isTouchDisable}
      onPress={onPress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      style={[{
        ...styles.btnStyle,
        backgroundColor: disabled ? disableBackground : secondaryBackground,
        ...btnStyle,
      }]}
      activeOpacity={activeOpacity ? activeOpacity : 0.8}>
      {icon && !iconRight && (
        <>
          {pressStatus ? (
            <ActivityIndicator
              size={28}
              color={indicatorColor ?? colors?.purpleBackground}
              style={{padding: 3}}
            />
          ) : (
            <Image
            source={icon?.name}
            style={{width: icon?.width, height: icon?.height}}
            />
            // <IconComponent
            //   name={icon?.name}
            //   size={icon?.size}
            //   color={disabled ? disabledIconColor : icon.color}
            // />
          )}
        </>
      )}
      {title && (
        <>
          {pressStatus ? (
            <ActivityIndicator
              size={28}
              color={indicatorColor ?? colors?.purpleBackground}
              style={{padding: 3}}
            />
          ) : (
            <Text style={{...styles.titleStyle, ...titleStyle}}>{title}</Text>
          )}
        </>
      )}

      {iconRight && (
        <>
          {pressStatus ? (
            <ActivityIndicator
              size={28}
              color={indicatorColor ?? colors?.purpleBackground}
              style={{padding: 3}}
            />
          ) : (
            <Image
            source={iconRight?.name}
            style={{width: iconRight?.width, height: iconRight?.height}}
            />
            // <IconComponent
            //   name={iconRight?.name}
            //   size={iconRight?.size}
            //   color={disabled ? disabledIconColor : iconRight.color}
            // />
          )}
        </>
      )}
    </TouchableOpacity>
  );
};

const getStyles = (colors,disabled) =>
 StyleSheet.create({
  btnStyle: {
    height: moderateScale(50),
    width: '100%',
    backgroundColor: 'red',
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection:'row',
    gap:6,
  },
  titleStyle: {
    fontSize: Metrics.generatedFontSize(18),
    color: disabled ? primaryText : primaryText,
    fontFamily: AppFonts?.visbyRegular,
    textAlign: 'center',
    // lineHeight: moderateScale(24),
    // paddingTop: Platform.OS == 'android' ? moderateScale(18 - 18 * 0.75) : moderateScale(18 - 18 * 0.85),
  },
});

export default ButtonComponent;