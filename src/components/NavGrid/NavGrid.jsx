import React from 'react';
import { View, StyleSheet } from 'react-native';
import NavButton from '../NavButton/NavButton';

const NavGrid = ({ buttons, cols = 2 }) => {

  const chunkArray = (arr, size) => 
    Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
      arr.slice(i * size, i * size + size)
    );

  const rows = chunkArray(buttons, cols);

  return (
    <View style={styles.container}>
      {rows.map((row, rowIndex) => (
        <View key={`row-${rowIndex}`} style={styles.row}>
          {row.map((button, index) => (
            <NavButton
              key={`button-${rowIndex}-${index}`}
              cols={cols}
              label={button.label}
              icon={button.icon}
              onPress={button.onPress}
              iconPosition={button.iconPosition}
              buttonStyle={button.buttonStyle}
            />
          ))}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#EEE',
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
});

export default NavGrid;