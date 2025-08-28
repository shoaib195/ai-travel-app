import React, {useEffect, useState} from 'react';
import {Image, ImageBackground, Text, View} from 'react-native';
import {AppImages} from '../../constants/AppImages';
// import { userAppIntro } from '../../redux/actions';
import {useDispatch} from 'react-redux';
import ButtonComponent from '../../components/ButtonComp';
import {getStyles} from './Styles';
import { userAppIntro } from '../../redux/action';

const AppIntro = ({navigation}) => {
  const styles = getStyles();
  const dispatch = useDispatch();

  const appIntroHandler = async () => {
    try {
      dispatch(userAppIntro());
    navigation.navigate('UserSelectService');
    } catch (err) {}
  };

   useEffect(() => {
    const timer = setTimeout(() => {
      appIntroHandler();
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      {/* <ImageBackground
        source={AppImages.bgImage}
        resizeMode="cover"
        style={styles.backgroundImage}>
        <View style={styles.imageContainer}>
          <Image source={AppImages.congratulation} style={styles.image} />
        </View>

        <View style={styles.buttonContainer}>
          <Text style={styles.intro}>Start your IHS experience</Text>
          <ButtonComponent
            disabled={false}
            title={`Let's Go!`}
            btnStyle={styles.activeBtnStyle}
            onPress={appIntroHandler}
          />
        </View>
      </ImageBackground> */}
      <View style={styles.mainLogo}>
        <Text></Text>
        <Image source={AppImages.mainLogo} style={styles.logo} resizeMode='contain' />
        <Text style={styles.splashTitle}>Travenor</Text>
      </View>
    </View>
  );
};
export default AppIntro;
