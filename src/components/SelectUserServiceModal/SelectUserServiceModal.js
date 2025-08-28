import {View, Text, StyleSheet} from 'react-native';
import React, {memo, useEffect, useState} from 'react';
import {
  moderateScale,
  moderateVerticalScale,
  scale,
} from 'react-native-size-matters';
import {AppFonts} from '../../constants/AppFonts';
import {colorTheme} from '../../constants/ColorConstants';
import {AppImages} from '../../constants/AppImages';
import {useNavigation} from '@react-navigation/native';
import useGoogle from '../../hooks/useGoogle';
import ButtonComponent from '../ButtonComp';
import Metrics from '../../constants/Metrics';
import { useSelector } from 'react-redux';

const {
  primaryText,
  grayText,
  primaryBackground,
  secondaryBackground,
  primaryBorder,
} = colorTheme;

const SelectUserCridentialModal = () => {
  const navigation = useNavigation();
  const {
    googleSignIn,
    signOut,
    setActiveButtonIndex,
    activeButtonIndex,
    isLoading,
  } = useGoogle();
  const reducerData = useSelector(state => state.userReducer);
  const styles = getStyles();
console.log('reducerData',reducerData?.auth);

  const getButtonStyle = index => {
    const isActive = activeButtonIndex === index;
    return {
      backgroundColor: isActive ? secondaryBackground : primaryBackground,
      borderColor: isActive ? 'transparent' : primaryBorder,
      borderWidth: isActive ? 0 : 1,
    };
  };

  const SignUpBtnHandler = () => {
    setActiveButtonIndex(0);
    const timeout = setTimeout(() => {
      navigation.navigate('SignUp');
      setActiveButtonIndex(null);
    }, 200);

    return () => {
      clearTimeout(timeout);
    };
  };

  const LoginBtnHandler = () => {
    setActiveButtonIndex(1);
    const timeout = setTimeout(() => {
      navigation.navigate('Login');
      // navigation.navigate('OnlineConsultation');
      setActiveButtonIndex(null);
    }, 200);

    return () => {
      clearTimeout(timeout);
    };
  };

  return (
    <View style={styles.modalView}>
      <ButtonComponent
        disabled={false}
        pressStatus={false}
        title={'Sign Up'}
        btnStyle={getButtonStyle(0)}
        onPress={SignUpBtnHandler}
      />

      <View style={styles.loginButton}>
        <ButtonComponent
          disabled={false}
          pressStatus={false}
          title={'Login to IHS'}
          btnStyle={getButtonStyle(1)}
          onPress={LoginBtnHandler}
        />
      </View>

      <View style={styles.horizontalLineContainer}>
        <View style={styles.horizontalLineView} />
        <View>
          <Text style={styles.lineBtwText}>Or</Text>
        </View>
        <View style={styles.horizontalLineView} />
      </View>

      <ButtonComponent
        disabled={false}
        pressStatus={isLoading}
        icon={{
          name: AppImages.google,
          width: 20,
          height: 20,
        }}
        title={!isLoading && 'Google'}
        btnStyle={getButtonStyle(2)}
        onPress={() => {
          googleSignIn();
        }}
      />
    </View>
  );
};

export default memo(SelectUserCridentialModal);

const getStyles = () =>
  StyleSheet.create({
    modalView: {
      justifyContent: 'center',
      alignItems: 'center',
      borderTopRightRadius: 25,
      borderTopLeftRadius: 25,
      backgroundColor: primaryBackground,
      paddingVertical: Metrics.heightRatio(41),
      paddingHorizontal: Metrics.widthRatio(24),
    },
    loginButton: {
      width: '100%',
      marginTop: Metrics.heightRatio(19),
    },
    horizontalLineContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: Metrics.heightRatio(23),
      marginHorizontal: Metrics.widthRatio(9),
    },
    horizontalLineView: {
      flex: 1,
      height: moderateScale(1),
      backgroundColor: primaryBorder,
    },
    lineBtwText: {
      fontSize: Metrics.generatedFontSize(12),
      width: moderateScale(45),
      textAlign: 'center',
      color: primaryText,
      //   fontFamily: AppFonts.visbyDemiBold,
    },
  });
