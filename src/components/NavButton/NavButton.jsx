import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

const NavButton = ({ 
  label, 
  onPress, 
  icon,
  iconPosition = 'top',
  iconStyle,
  textStyle,
  buttonStyle,
  cols = 1 // Default to full width
}) => {
  return (
    <TouchableOpacity 
      style={[
        styles.button,
        { 
          flex: 1,
          maxWidth: `${100 / cols}%`, // Dynamic width calculation
          marginHorizontal: cols > 1 ? 2 : 0, // Add gap between items
        },
        buttonStyle
      ]} 
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={[
        styles.contentContainer,
        iconPosition === 'left' && { flexDirection: 'row' },
        iconPosition === 'right' && { flexDirection: 'row-reverse' },
        iconPosition === 'bottom' && { flexDirection: 'column-reverse' }
      ]}>
        {icon && (
          <Image 
            source={icon} 
            style={[
              styles.icon, 
              iconStyle,
              iconPosition === 'left' && { marginRight: 8 },
              iconPosition === 'right' && { marginLeft: 8 },
              iconPosition === 'bottom' && { marginTop: 5 },
            ]} 
            resizeMode="contain"
          />
        )}
        <Text style={[styles.text, textStyle]}>{label}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#F3F3F3',
    borderRadius: 8,
    padding: 15,
    marginBottom: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: 24,
    height: 24,
    marginBottom: 5,
  },
  text: {
    fontWeight: '500',
    color: '#333',
    fontSize: 14,
    textAlign: 'center',
  },
});

export default NavButton;