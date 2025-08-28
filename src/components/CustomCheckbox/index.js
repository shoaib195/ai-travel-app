import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { colorTheme } from '../../constants/ColorConstants';
import { moderateScale, scale } from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { AppFonts } from '../../constants/AppFonts';
const {
    primaryBackground,
    whiteBorder,
    secondaryBackground,
    primaryText
  } = colorTheme;
export default function CustomCheckbox({isChecked,onPress,value}) {
    return (
        <TouchableOpacity style={styles.checkboxContainer} onPress={onPress} activeOpacity={0.98}>
          <View style={[styles.checkbox, isChecked && styles.checkboxChecked]}>
            {isChecked && 
            <Icon name={'check'} size={12} color={'white'} />
             }
          </View>
          <Text style={styles.checkboxOptionTxt}>{value}</Text>
        </TouchableOpacity>
      );
}

const styles = StyleSheet.create({
      checkboxContainer: {
        flexDirection:'row',
      },
      checkbox: {
        marginRight: moderateScale(10),
        width: moderateScale(18),
        height: moderateScale(18),
        borderWidth: 1,
        borderColor: whiteBorder,
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: primaryBackground,
      },
      checkboxChecked: {
        backgroundColor: secondaryBackground,
        borderColor: secondaryBackground,
      },
      checkboxOptionTxt: {
        fontSize: scale(14),
        fontFamily: AppFonts.visbyRegular,
        color: primaryText,
        marginRight: moderateScale(10),
        lineHeight:18,
      },
  });