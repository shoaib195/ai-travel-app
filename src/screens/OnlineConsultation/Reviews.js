import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Reviews = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>This is the Reviews screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16,backgroundColor:'#D9D9D9' },
  text: { fontSize: 16 },
});

export default Reviews;