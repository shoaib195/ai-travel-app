import React, {useState,memo} from 'react';
import {StyleSheet, Platform, Image} from 'react-native';
import {
  moderateScale,
  moderateVerticalScale,
  scale,
} from 'react-native-size-matters';
import DropDownPicker from 'react-native-dropdown-picker';
import { colorTheme } from '../../constants/ColorConstants';
import IconComponent from '../IconComponent.js';
import { AppImages } from '../../constants/AppImages';

const {darkGrayBackground, dimGrayBorder, placeholderText, primaryText, whiteBorder} = colorTheme;

const DropDownPickerComponent = ({
  value,
  setValue,
  setOpen,
  setItems,
  items,
  open,
  placeholder,
  onChangeValue,
  isTouchDisable=false,
  searchable=false,
  onClose,
}) => {
  const styles = getStyles();

  const countryHandler = () => {
    const vehicleObject = items.map((item) => {
      return {label: item?.country_name, value: item?.id.toString()};
    });
    return vehicleObject;
  };
 
  return (
    <DropDownPicker
      disabled={isTouchDisable}
      open={open}
      value={value}
      listMode="SCROLLVIEW"
      dropDownDirection='BOTTOM'
      scrollViewProps={{
        nestedScrollEnabled: true,
      }}
      ArrowUpIconComponent={({ style }) => (
        // <IconComponent
        //   name= 'chevron-up'
        //   size={22}
        //   color={whiteBorder}
        // />
        <Image
        resizeMode='contain'
          source={AppImages?.arrowUp}
          style={styles.imageIcon}
        />
      )}
      ArrowDownIconComponent={({ style }) => (
        <Image
        resizeMode='contain'
          source={AppImages?.arrowDown}
          style={styles.imageIcon}
        />
      )}
      listItemContainerStyle={styles.listItemContainerStyle}
      dropDownContainerStyle={styles.dropDownContainerStyle}
      items={items || countryHandler()}
      setOpen={setOpen}
      setValue={setValue}
      setItems={setItems}
      placeholder={placeholder}
      labelStyle= {{
        // color: defaultText,
        color: primaryText,
        fontSize: scale(12),
      }}
      onClose={onClose}
      onChangeValue={(value) => {
        onChangeValue(value)
      }}
      textStyle={styles.textStyle}
      style={styles.style}
      placeholderStyle={styles.placeholderStyle}
      searchable={searchable}
        searchPlaceholder="Search for a country or city"
        searchContainerStyle={{
          borderBottomColor: "#ccc"
        }}
        searchTextInputStyle={{
          color: '#fff'
        }}
    />
  );
};
export default memo(DropDownPickerComponent);

const getStyles = () =>
  StyleSheet.create({
    listItemContainerStyle: {
      borderBottomWidth: 1,
    borderBottomColor: dimGrayBorder,
    },
    dropDownContainerStyle: {
      position: 'relative',
      top: 0,
      borderColor: darkGrayBackground,
      borderRadius: 8,
      backgroundColor: darkGrayBackground,
    },
    textStyle: {
      fontSize: scale(11),
      color: placeholderText,
    //   fontFamily: latoSemiBold,
      paddingHorizontal: moderateScale(5),
    },
    style: {
    backgroundColor: darkGrayBackground,
      borderWidth: 0,
      // paddingVertical:
      //   Platform.OS === 'ios'
      //     ? moderateVerticalScale(12)
      //     : moderateVerticalScale(6),
      borderRadius: 12,
      // marginBottom: moderateVerticalScale(5),
    },
    placeholderStyle: {
      color: placeholderText,
      fontSize: scale(12),
    //   fontFamily: latoSemiBold,
    },
    imageIcon: {
      width: moderateScale(14),
      height: moderateScale(14),
      marginRight: moderateScale(9)
    },
  });