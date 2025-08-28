import React, { useState, useMemo ,memo} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  Modal,
  TouchableOpacity,
  Platform,
  Text,
} from 'react-native';
import {
  moderateScale,
  moderateVerticalScale,
  scale,
} from 'react-native-size-matters';
import DateTimePicker from '@react-native-community/datetimepicker';
import { colorTheme } from '../../constants/ColorConstants';
import ButtonComponent from '../ButtonComp';
import { AppFonts } from '../../constants/AppFonts';

const {darkGrayBackground , secondaryBackground, primaryText, secondaryText} = colorTheme;

const CalandarComponent = ({
  modalVisible = false,
  dateOfBirth,
  setDateOfBirth,
  setDatePickerVisibility,
  setFieldTouched,
  getDateOfBirth = () => {},
  onClose = () => {},
  onPress = () => {},
  onDaySelect = () => {},
  ...props
}) => {

  const [date, setDate] = useState(dateOfBirth);

  //For IOS only
  const onChange = (event, selectedDate) => {
    if (event.type === 'dismissed') {
      setDatePickerVisibility(false);
      return;
    }
    const currentDate = selectedDate || date;
    setDate(currentDate);
  };

  //For Android only
  const onChangeAndroidHandler = (event, selectedDate) => {
    
    if (event?.type === 'dismissed') {
      setDatePickerVisibility(false);
      setFieldTouched('dob', true, true);
      return;
    }
    const currentDate = selectedDate || date;
    setDate(currentDate);
    formatDate(currentDate);
  }

  const cancelHandler = () => {
    setDatePickerVisibility(false);
    setFieldTouched('dob', true, true);
  }

  const confirmHandler = () => {
    formatDate(date);
    setDatePickerVisibility(false);
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    // Get day, month, and year
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // getMonth is 0-indexed
    const year = String(date.getFullYear()); // Get last two digits of the year
    getDateOfBirth(`${day}-${month}-${year}`);
  };

  return (
    <View style={Styles.centeredView}>
      {Platform.OS === 'ios' && (
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={onClose}>
          <TouchableOpacity
            onPress={onClose}
            activeOpacity={1}
            style={[Styles.centeredView, { backgroundColor: 'rgba(0,0,0,0.5)' }]}>
            <View style={Styles.modalView}>
              <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode="date"
                display="spinner"
                onChange={onChange}
                textColor= {primaryText}
                themeVariant= 'dark'
              />
              <View style={Styles.buttonContainer}>
                <TouchableOpacity onPress={confirmHandler} style={Styles.confirmButton}>
                  <Text style={Styles.buttonText}>Confirm</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        </Modal>
      )}

      {/* For Android, show the DateTimePicker directly without nesting in modal */}
      {Platform.OS === 'android' && modalVisible && (
        <DateTimePicker
          style={{ backgroundColor: 'red' }}
          testID="dateTimePicker"
          value={date}
          mode="date"
          display="default"
          positiveButton={{label: 'OK', textColor: secondaryText}}
          negativeButton={{label: 'Cancel', textColor: secondaryText}}
          onChange={onChangeAndroidHandler}
        />
      )}
    </View>
  );
}
export default memo(CalandarComponent);

const Styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    width: '80%',
    backgroundColor: darkGrayBackground,
    borderRadius: moderateScale(14),
    padding: moderateScale(5),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  selectedDateStyle: {
    color: '#fff',
    backgroundColor: 'orange',
    padding: moderateScale(3),
    borderRadius: moderateScale(5),
    fontWeight: 'bold',
    justifyContent: 'center',
    alignItems: 'center',
    width: scale(30),
    height: scale(30),
    fontSize: scale(16),
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: moderateVerticalScale(8),
    width: '100%',
  },
  confirmButton: {
    padding: 6,
    backgroundColor: secondaryBackground,
    borderRadius: 6,
    width: '35%',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: scale(14),
    fontFamily: AppFonts.visbyMedium,
    color: primaryText
  },
});