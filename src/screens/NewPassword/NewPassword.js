import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  Image,
  Keyboard,
  Platform,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import InputTextComponent from '../../components/inputTextComp';
import {getStyles} from './Styles';
import Header from '../../components/Header';
import {useFormik} from 'formik';
import createValidationSchema from '../../validationSchema/newPasswordValidationSchema';
import toastService from '../../services/toastService';
import {colorTheme} from '../../constants/ColorConstants';
import {AppImages} from '../../constants/AppImages';
import useAuth from '../../hooks/useAuth';
import ButtonComponent from '../../components/ButtonComp';
import LoaderModal from '../../components/Modal/LoaderModal';

const {darkGrayBackground, dimGrayBorder, whiteBorder} = colorTheme;

const NewPassword = ({navigation, route}) => {
  const {width, height} = Dimensions.get('window');
  const styles = getStyles(width, height);
  const {updatePasswordRequestHandler, passwordChangeRequestHandler, isLoading} =
    useAuth();
  const [showPassword, setPassword] = useState({
    old_password: true,
    password: true,
    password_confirmation: true,
  });
  const previousScreen = route?.params?.screenName
    ? route?.params?.screenName
    : null;

  const initialValues = {
    ...(previousScreen == 'UpdateProfile' ? {old_password: ''} : {}),
    password: '',
    password_confirmation: '',
  };

  const onSubmit = async values => {
    if (previousScreen == 'UpdateProfile') {
      const resetPasswordData = {
        old_password: values?.old_password,
        password: values?.password,
        password_confirmation: values?.password_confirmation,
      };
      passwordChangeRequestHandler(resetPasswordData)
        .then(({data}) => {
          toastService.shortToast(data?.message);
          navigation.navigate('UpdateProfile');
        })
        .catch(error => {
          const apiErrors = error?.response?.data?.errors;
          if (typeof apiErrors === 'string') {
            toastService.shortToast(apiErrors);
          } else if (typeof apiErrors === 'object') {
            for (let [key, value] of Object.entries(apiErrors)) {
              setFieldError(key, value[0]);
            }
          }
        });
    } else {
      const forgotPasswordData = {
        password: values?.password,
        password_confirmation: values?.password_confirmation,
        email: route?.params?.userData?.email,
        otp: route?.params?.userData?.otp,
      };
      updatePasswordRequestHandler(forgotPasswordData)
        .then(({data}) => {
          toastService.shortToast(data?.message);
          navigation.navigate('Login');
        })
        .catch(error => {
          const apiErrors = error?.response?.data?.errors;
          if (typeof apiErrors === 'string') {
            toastService.shortToast(apiErrors);
          } else if (typeof apiErrors === 'object') {
            for (let [key, value] of Object.entries(apiErrors)) {
              setFieldError(key, value[0]);
            }
          }
        });
    }
  };

  const validateBtnHandler = values => {
    return Object.values(values).some(
      value => value === '' || value === null || value === false,
    );
  };

  const iconHandler = inputFiled => {
    setPassword(prevState => ({
      ...prevState, // Keep the other states unchanged
      [inputFiled]: !prevState[inputFiled], // Toggle the state for the specific input field
    }));
  };

  const formik = useFormik({
    initialValues,
    validationSchema: createValidationSchema(previousScreen),
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
      <Header navigation={navigation} cancelButton={true} />
      <ScrollView>
        <View style={styles.contentView}>
          <View style={styles.titleView}>
            <Text style={styles.titleText}>Set a new Password</Text>
          </View>

          <Text style={styles.subTitle}>
            Create a new password. Ensure it differs from previous ones for
            security
          </Text>

          {previousScreen == 'UpdateProfile' && (
            <View style={{marginBottom: 21}}>
              <InputTextComponent
                secureTextEntry={showPassword?.old_password}
                placeholder={'Old Password'}
                onChangeText={handleChange('old_password')}
                onBlur={handleBlur('old_password')}
                value={values?.old_password}
                bgColor={darkGrayBackground}
                imageRight={{show: true, url: AppImages?.passwordHide, color: showPassword?.old_password
                  ? dimGrayBorder
                  : whiteBorder,}}
                onPressIcon={() => {
                  iconHandler('old_password');
                }}
              />
              {errors?.old_password && touched?.old_password && (
                <Text style={styles.errorText}>{errors?.old_password}</Text>
              )}
            </View>
          )}

          <View>
            <InputTextComponent
              secureTextEntry={showPassword?.password}
              placeholder={'Password'}
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values?.password}
              bgColor={darkGrayBackground}
              imageRight={{show: true, url: AppImages?.passwordHide, color: showPassword?.password
                ? dimGrayBorder
                : whiteBorder,}}
              onPressIcon={() => {
                iconHandler('password');
              }}
            />
            {errors?.password && touched?.password && (
              <Text style={styles.errorText}>{errors?.password}</Text>
            )}
          </View>

          <View style={{marginVertical: 21}}>
            <InputTextComponent
              secureTextEntry={showPassword?.password_confirmation}
              placeholder={'Confirm Password'}
              onChangeText={handleChange('password_confirmation')}
              onBlur={handleBlur('password_confirmation')}
              value={values.password_confirmation}
              bgColor={darkGrayBackground}
              imageRight={{
                show: true,
                url: AppImages?.passwordHide,
                color: showPassword?.password_confirmation
                  ? dimGrayBorder
                  : whiteBorder,
              }}
              onPressIcon={() => {
                iconHandler('password_confirmation');
              }}
            />
            {errors?.password_confirmation &&
              touched?.password_confirmation && (
                <Text style={styles.errorText}>
                  {errors?.password_confirmation}
                </Text>
              )}
          </View>
        </View>
      </ScrollView>
      <View style={styles.btnContainer}>
        <ButtonComponent
          disabled={validateBtnHandler(values) || !isValid}
          // disabled={false}
          pressStatus={isLoading}
          title={'Update Password'}
          btnStyle={
            validateBtnHandler(values) || !isValid
              ? styles.btnStyle
              : styles.activeBtnStyle
          }
          onPress={handleSubmit}
        />
      </View>
    </SafeAreaView>
  );
};
export default NewPassword;
