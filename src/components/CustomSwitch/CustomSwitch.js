import React, { useState, useRef, useEffect } from 'react';
import { View, TouchableOpacity, Animated, StyleSheet } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import Metrics from '../../constants/Metrics';

const CustomSwitch = ({ isOn, onToggle }) => {
  const [isEnabled, setIsEnabled] = useState(isOn);
  const animatedValue = useRef(new Animated.Value(isEnabled ? 1 : 0)).current;

  useEffect(() => {
    setIsEnabled(isOn); // Sync internal state with prop
    Animated.timing(animatedValue, {
      toValue: isOn ? 1 : 0,
      duration: 30,
      useNativeDriver: false,
    }).start();
  }, [isOn]);


  // Toggle the switch and start the animation
  const toggleSwitch = () => {
    const newValue = !isEnabled;
    setIsEnabled(newValue);
    Animated.timing(animatedValue, {
      toValue: newValue ? 1 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
    onToggle(newValue);
  };

  // Interpolate the background color and thumb position based on the animated value
  const backgroundColor = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['#ccc', '#4a90e2'], // Gray when off, blue when on
  });

  const thumbPosition = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [2, 22], // Thumb moves from left to right
  });

  return (
    <TouchableOpacity onPress={toggleSwitch} style={styles.switchContainer}>
      <Animated.View style={[styles.switchBackground, { backgroundColor }]}>
        <Animated.View
          style={[
            styles.switchThumb,
            { transform: [{ translateX: thumbPosition }] },
          ]}
        />
      </Animated.View>
    </TouchableOpacity>
  );
};

// const App = () => {
//   const [switchState, setSwitchState] = useState(false);

//   const handleToggle = (newState) => {
//     setSwitchState(newState);
//   };

//   return (
//     <View style={styles.container}>
//       <CustomSwitch isOn={switchState} onToggle={handleToggle} />
//     </View>
//   );
// };

const styles = StyleSheet.create({
  switchContainer: {
    padding: 4,
  },
  switchBackground: {
    width: Metrics.widthRatio(35),
    height: Metrics.heightRatio(18),
    borderRadius: 30,
    // padding: 2,
    justifyContent: 'center',
  },
  switchThumb: {
    width: Metrics.heightRatio(14),
    height: Metrics.heightRatio(14),
    borderRadius: 13,
    backgroundColor: 'white',
  },
});

export default CustomSwitch;