import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import Metrics from '../../constants/Metrics';
import {AppFonts} from '../../constants/AppFonts';
import {AppConstants} from '../../constants/AppConstants';

const SlotBox = ({title, value}) => (
  <View style={styles.slotBox}>
    <Text style={styles.title}>{title}</Text>
    <Text style={styles.value}>{value}</Text>
  </View>
);

const About = () => {
  return (
    <View style={styles.container}>
      <ScrollView>
      <Text style={styles.text}>
        Lorem ipsum dolor sit amet, consaetur adipiscing elit. Duis suscipit
        lacinia conigue. Fusce vulsputate odi pretium egestas. Ut sed sem quis
        dui posuere aliquet sed vitae velit. Morbi blandit orci.
      </Text>

      <View style={styles.boxContainer}>
      {Array.from({
        length: Math.ceil(AppConstants?.consultantAbout.length / 2),
      }).map((_, i) => {
        const [first, second] = [
          AppConstants?.consultantAbout[i * 2],
          AppConstants?.consultantAbout[i * 2 + 1],
        ];
        return (
          <View
            key={i}
            style={[styles.rowContainer, !second && styles.centeredRow]}>
            <SlotBox {...first} />
            {second && <SlotBox {...second} />}
          </View>
        );
      })}
      </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D9D9D9',
    paddingVertical: Metrics.heightRatio(4),
  },
  text: {
    fontSize: Metrics.generatedFontSize(14),
    fontFamily: AppFonts?.visbyRegular,
    color: '#000',
    paddingTop: Metrics.heightRatio(14)
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Metrics.heightRatio(14),
  },
  centeredRow: {justifyContent: 'center'},
  slotBox: {
    backgroundColor: '#A7A7A7',
    paddingVertical: Metrics.heightRatio(14),
    paddingLeft: Metrics.widthRatio(14),
    borderRadius: 16,
    width: '48%',
    gap:3
  },
  title: {
    fontSize: Metrics.generatedFontSize(14),
    fontFamily: AppFonts?.visbyRegular,
    lineHeight: Platform.OS === 'ios' ? 16 : 14,
    color: '#000',
  },
  value: {
    fontSize: Metrics.generatedFontSize(16),
    fontFamily: AppFonts?.visbyBold,
    lineHeight: Platform.OS === 'ios' ? 18 : 16,
    color: '#000',
  },
  boxContainer: {
    marginTop: Metrics.heightRatio(20)
  }
});

export default About;
