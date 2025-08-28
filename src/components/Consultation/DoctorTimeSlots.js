import React from 'react';
import {View, Text, StyleSheet, Platform} from 'react-native';
import Metrics from '../../constants/Metrics';
import { AppFonts } from '../../constants/AppFonts';

const SlotBox = ({day, time}) => (
  <View style={styles.slotBox}>
    <Text style={styles.dayText}>{day}</Text>
    <Text style={styles.timeText}>{time}</Text>
  </View>
);

const DoctorTimeSlots = ({timeSlots}) => (
  <View style={styles.container}>
    {Array.from({length: Math.ceil(timeSlots.length / 2)}).map((_, i) => {
      const [first, second] = [timeSlots[i * 2], timeSlots[i * 2 + 1]];
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
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: Metrics.widthRatio(15),
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Metrics.heightRatio(8),
  },
  centeredRow: {justifyContent: 'center'},
  slotBox: {
    backgroundColor: '#B4B4B4',
    paddingVertical: Metrics.heightRatio(10),
    paddingHorizontal: Metrics.widthRatio(13),
    borderRadius: 8,
    width: '49%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dayText: {
    fontSize: Metrics.generatedFontSize(11),
    fontFamily: AppFonts?.visbyRegular,
    lineHeight: Platform.OS === 'ios' ? 14 : 12,
    color: '#000'
},
  timeText: {
    fontSize: Metrics.generatedFontSize(11),
    fontFamily: AppFonts?.visbyRegular,
    lineHeight: Platform.OS === 'ios' ? 14 : 12,
    color: '#000'
},
});

export default DoctorTimeSlots;
