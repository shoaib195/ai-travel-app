import React, {useEffect, useState} from 'react';
import {Dimensions, Image, Keyboard, Platform, SafeAreaView, Text, View} from 'react-native';
import InputTextComponent from '../../components/inputTextComp';
import {getStyles} from './ForgotPasswordStyle';
import Header from '../../components/Header';
import {useFormik} from 'formik';
import validationSchema from '../../validationSchema/emailValidationSchema';
import toastService from '../../services/toastService';
import { colorTheme } from '../../constants/ColorConstants';
import useAuth from '../../hooks/useAuth';
import ButtonComponent from '../../components/ButtonComp';
import LoaderModal from '../../components/Modal/LoaderModal';

const {
  darkGrayBackground,
} = colorTheme;

const ForgotPassword = ({navigation}) => {
  const { width, height } = Dimensions.get('window');
  const styles = getStyles(width, height);
  const { resendOtpRequestHandler, isLoading } = useAuth();

  const initialValues = {
    email: '',
  };

  const onSubmit = async values => {
    if(values?.email != ''){
        resendOtpRequestHandler(values?.email).then(({data})=> {
          toastService.shortToast(data?.message);
          navigation.navigate('OtpVerification', {
            email: values?.email,
            screenName:'ForgotPassword'
          });
        }).catch((error)=> {
          const apiErrors = error?.response?.data?.errors;
          if (typeof apiErrors === 'string') {
            toastService.shortToast(apiErrors);
          } else if (typeof apiErrors === 'object') {
            for (let [key, value] of Object.entries(apiErrors)) {
              setFieldError(key, value[0]);
            }
          }
        });
    }else{
      toastService.shortToast('Email is required');
    }
  };

  const validateBtnHandler = () => {
    if (!isValid || values?.email === '') {
      return true;
    } else {
      return false;
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  const {
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    isSubmitting,
    isValid,
    handleSubmit,
    setFieldError,
  } = formik;

  return (
    <SafeAreaView style={styles.container}>
      {isLoading && <LoaderModal load={isLoading} textShow={false}/>}
      <Header
        navigation={navigation}
        cancelButton={true}
      />
      <View style={styles.contentView}>
        <View style={styles.titleView}>
        <Text style={styles.titleText}>
        Forgot Password
      </Text>
        </View>

        <Text style={styles.subTitle}>
        Please enter your email to reset the password
        </Text>

        <InputTextComponent
          placeholder={'Email'}
          onChangeText={handleChange('email')}
          onBlur={handleBlur('email')}
          value={values?.email}
          bgColor={darkGrayBackground}
        />
        {errors?.email && touched?.email && (
          <Text style={styles.errorText}>{errors?.email}</Text>
        )}
      </View>
      <View style={styles.btnContainer}>
        <ButtonComponent
          disabled={validateBtnHandler()}
          // disabled={false}
          pressStatus={isLoading}
          title={'Reset Password'}
          btnStyle={
            validateBtnHandler() ? styles.btnStyle : styles.activeBtnStyle
          }
          onPress={handleSubmit}
        />
      </View>
    </SafeAreaView>
  );
};
export default ForgotPassword;









