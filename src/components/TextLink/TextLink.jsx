import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const TextLink = ({
  text,
  routeName,       // Target screen name
  params,         // Optional navigation params
  onPress,        // Custom press handler (overrides default navigation)
  textStyle,      // Custom text styling
  containerStyle, // Custom container styling
  disabled = false,
}) => {
  const navigation = useNavigation();

  const handlePress = () => {
    if (onPress) {
      onPress();
    } else if (routeName) {
      navigation.navigate(routeName, params);
    }
  };

  return (
    <TouchableOpacity 
      style={[styles.container, containerStyle]}
      onPress={handlePress}
      disabled={disabled}
      activeOpacity={0.7}
    >
      <Text style={[styles.text, textStyle]}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'flex-start'
  },
  text: {
    color: '#4285F4',
    marginHorizontal: 4,
    fontSize: 14,
  },
});

export default TextLink;