import React, { forwardRef } from 'react';
import {
  TextInput,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import {getStyles} from './Styles';
import {colorTheme} from '../../constants/ColorConstants';
import { AppConstants } from '../../constants/AppConstants';
import IconComponent from '../IconComponent.js';

const {
  lightGrayBackground,
  primaryBackground,
  placeholderText,
  darkGrayBackgrounud,
  dimGrayBorder,
} = colorTheme;
const InputTextComponent = forwardRef (({
  numberOfLines,
  placeholder,
  keyboardType,
  onChangeText,
  iconLeft,
  imageLeft,
  imageRight,
  iconRight,
  editable,
  bgColor,
  width,
  defaultValue,
  height,
  hasBorder,
  borderRadius,
  value,
  borderShadow,
  onPressIcon,
  borderColor,
  isTouchDisable = false,
  ...props
},ref) => {
  const styles = getStyles(
    bgColor,
    hasBorder,
    borderRadius,
    borderShadow,
    borderColor,
  );
  
  return (
    <View style={{...styles.mainInputStyle, width: width, height: height}}>
      {/* For Image */}
      {imageLeft?.show && (
        <Image source={imageLeft?.url} style={styles.imageIcon} />
      )}

      {/* For Icon */}
      {iconLeft && (
        <IconComponent
          name={iconLeft.name}
          size={iconLeft.size}
          color={iconLeft.color}
        />
      )}

      {/* For Input */}
      <TextInput
        ref={ref}
        defaultValue={defaultValue}
        editable={editable}
        style={styles.textInputStyle}
        numberOfLines={numberOfLines}
        placeholder={placeholder}
        keyboardType={keyboardType}
        onChangeText={onChangeText}
        value={value}
        placeholderTextColor={placeholderText}
        {...props}
      />

      {/* For Icon */}
      {iconRight && (
        <IconComponent
          name={iconRight.name}
          size={iconRight.size}
          color={iconRight.color}
        />
      )}
      {/* For Image */}
      {imageRight?.show && (
        <TouchableOpacity
          activeOpacity={AppConstants.buttonActiveOpacity}
          disabled={isTouchDisable}
          style={styles.imageIconView}
          onPress={onPressIcon}>
          <Image
          resizeMode='contain'
            source={imageRight?.url}
            style={{
              ...styles.imageIcon,
              tintColor: imageRight?.color ? imageRight?.color : dimGrayBorder,
              ...(imageRight?.width && { width: imageRight?.width }),
              ...(imageRight?.height && { height: imageRight?.height }),
            }}
          />
        </TouchableOpacity>
      )}
    </View>
  );
});

export default InputTextComponent;