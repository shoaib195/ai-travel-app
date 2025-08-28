import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Experience = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>This is the Experience screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16,backgroundColor:'#D9D9D9' },
  text: { fontSize: 16 },
});

export default Experience;