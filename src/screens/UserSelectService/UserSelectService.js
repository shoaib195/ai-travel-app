import React, {useEffect, useState} from 'react';
import {Image, ImageBackground, StyleSheet, Text, View} from 'react-native';
import {AppImages} from '../../constants/AppImages';
import SelectUserServiceModal from '../../components/SelectUserServiceModal/SelectUserServiceModal';

const UserSelectService = ({navigation}) => {
  const styles = getStyles();

  return (
    <View style={styles.container}>
      <ImageBackground
        source={AppImages.congratulation}
        resizeMode="cover"
        style={styles.backgroundImage}>

        <View style={styles.imageContainer}>
        <Image source={AppImages.quadraWealth} style={styles.image} />
        </View>
        <SelectUserServiceModal/>
      </ImageBackground>
    </View>
  );
};
export default UserSelectService;

const getStyles = () =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    backgroundImage: {
      flex: 1,
      justifyContent: 'center',
    },
    imageContainer: {
      flex:1,justifyContent:'center',alignItems:'center'
    },
    image: {
      width: 247,
      height: 123.7,
    },
  });