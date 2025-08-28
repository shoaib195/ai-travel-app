import React, {useEffect, useState} from 'react';
import {Dimensions, Image, Keyboard, Platform, SafeAreaView, Text, View} from 'react-native';
import InputTextComponent from '../../components/inputTextComp';
import {AppImages} from '../../constants/AppImages';
import {getStyles} from './Styles';
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

const SignUp = ({navigation}) => {
  const { width, height } = Dimensions.get('window');
  const styles = getStyles(width, height);
  const [activeButtonIndex, setActiveButtonIndex] = useState(null);
  const { sendOtpRequestHandler, isLoading } = useAuth();

  const initialValues = {
    email: '',
  };
  
  const onSubmit = async values => {
    if(values?.email != ''){
      sendOtpRequestHandler(values?.email);
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
        Enter your Email{' '}
      </Text>
        </View>

        <Text style={styles.subTitle}>
        We will send an OTP Verification to you.
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
          pressStatus={isLoading}
          title={'Send me the code'}
          btnStyle={
            validateBtnHandler() ? styles.btnStyle : styles.activeBtnStyle
          }
          onPress={handleSubmit}
        />
      </View>
    </SafeAreaView>
  );
};
export default SignUp;