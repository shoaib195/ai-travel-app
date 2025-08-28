import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Platform } from 'react-native';
import Metrics from '../../constants/Metrics';
import { AppFonts } from '../../constants/AppFonts';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import ButtonComponent from '../ButtonComp';
import { colorTheme } from '../../constants/ColorConstants';

const {
  primaryText,
  secondaryText,
  primaryBackground,
  primaryBorder,
  defaultText,
  secondaryBackground,
  defaultBackground,
  disableBackground,
  errorText,
} = colorTheme;

const PromoCard = ({ discount, description, buttonText, icon, onPress }) => (
  <View style={styles.card}>
    <View style={styles.col}>
      <Text style={styles.discount}>{discount}</Text>
      <Text style={styles.description}>{description}</Text>
      <View style={styles.btnContainer}>
        <ButtonComponent
          disabled={false}
          pressStatus={false}
          title={buttonText}
          btnStyle={styles.activeBtnStyle}
          titleStyle={styles.titleStyle}
          onPress={() => { }}
        />
      </View>
    </View>
    <View style={styles.ImageView}>
      <Image source={icon} style={styles.icon} />
    </View>
  </View>
);

const styles = StyleSheet.create({
  alignCenter: {
    alignItems: 'center',
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#4285F4',
    borderRadius: 22,
    paddingVertical: Metrics.heightRatio(28),
    paddingHorizontal: Metrics.widthRatio(24),
    alignItems: 'center',
  },
  icon: {
    width: Metrics.widthRatio(69),
    height: Metrics.heightRatio(69),
  },
  col: {
    flex: 1,
    alignItems: 'left',
    justifyContent: 'center',
    gap: 4
  },
  ImageView: {
    width: Metrics.widthRatio(72),
    height: Metrics.heightRatio(72),
    alignItems: 'center',
    justifyContent: 'center',
  },
  discount: {
    fontSize: Metrics.generatedFontSize(26),
    fontFamily: AppFonts.visbyBold,
    color: 'white',
    lineHeight: Platform.OS === 'ios' ? 27 : 23,
  },
  description: {
    fontSize: Metrics.generatedFontSize(14),
    fontFamily: AppFonts.visbyRegular,
    color: 'white',
    paddingRight: Metrics.widthRatio(50),
  },
  btnContainer: {
    marginTop: Metrics.heightRatio(17),
  },
  activeBtnStyle: {
    backgroundColor: defaultBackground,
    borderColor: 'transparent',
    borderWidth: 0,
    height: Metrics.heightRatio(30),
    width: Metrics.widthRatio(107),
    borderRadius: 9
  },
  titleStyle: {
    color: defaultText,
    fontSize: Metrics.generatedFontSize(12),
    fontFamily: AppFonts.visbyRegular
  }
});

export default PromoCard;