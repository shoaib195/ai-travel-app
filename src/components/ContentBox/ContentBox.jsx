import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ContentBox = ({ children }) => (
  <View style={styles.container}>
    <Text style={styles.text}>{children}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    marginHorizontal: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'start',
    elevation: 0,
    marginBottom: 20,
  },
  text: {
    fontSize: 18,
    color: '#999',
  },
});

export default ContentBox;