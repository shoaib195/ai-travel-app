import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import InputTextComponent from '../../components/inputTextComp';
import {AppImages} from '../../constants/AppImages';
import {getStyles} from './Styles';
import Header from '../../components/Header';
import {useFormik} from 'formik';
import validationSchema from '../../validationSchema/loginValidationSchema';
import {colorTheme} from '../../constants/ColorConstants';
import CustomSwitch from '../../components/CustomSwitch/CustomSwitch';
import {AppConstants} from '../../constants/AppConstants';
import { useDispatch } from 'react-redux';
import ButtonComponent from '../../components/ButtonComp';
import useAuth from '../../hooks/useAuth';
import useBiometric from '../../hooks/useBiometric';
import { setAuthPassword } from '../../redux/action';
import toastService from '../../services/toastService';
import LoaderModal from '../../components/Modal/LoaderModal';
import useUser from '../../hooks/useUser';

const {darkGrayBackground, dimGrayBorder, whiteBorder} = colorTheme;

const Login = ({navigation}) => {
  const {width, height} = Dimensions.get('window');
  const dispatch = useDispatch();
  const styles = getStyles(width, height);
  const [activeButtonIndex, setActiveButtonIndex] = useState(null);
  const [showPassword, setPassword] = useState(true);
  const {loginRequestHandler, isLoading} = useAuth();
  const {logUserHandler} = useUser();
  const {
    isBiometricAvailable,
    biometryType,
    modalVisible,
    credentials,
    isSignedUp,
    handleLogin,
    setModalVisible,
    handleSignUp,
    handleGetCredentials,
    handleSaveCredentials,
  } = useBiometric();
  const [switchState, setSwitchState] = useState(false);

  const initialValues = {
    email: '',
    password: '',
  };

  const onSubmit = async values => {
    if (values?.email != '' && values?.password) {
      loginRequestHandler(values)
        .then(async({data}) => {
          toastService.shortToast(data?.message);
          if(switchState){
            setSwitchState(false);
            await handleSaveCredentials(values?.email, values?.password);
          }
          dispatch(setAuthPassword(values?.password));
          logUserHandler(data?.data);
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

  const handleToggle = newState => {
    handleGetCredentials().then((data)=> {
      if(newState && data){
        handleLogin().then().catch((error)=> {
          setSwitchState(false);
        });
      }else{
        if(validateBtnHandler(values) && newState){
          toastService.shortToast('Please fill login detail');
        }
      } 
    }).catch((error)=> {
    });
    setSwitchState(newState);
  };

  const validateBtnHandler = values => {
    return Object.values(values).some(
      value => value === '' || value === null || value === false,
    );
  };

  const forgotPasswordHandler = () => {
    navigation.navigate('ForgotPassword');
  };

  const iconHandler = () => {
    setPassword(!showPassword);
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
      <Header navigation={navigation} />
      <View style={styles.contentView}>
        <View style={styles.titleView}>
          <Text style={styles.titleText}>
            Login
          </Text>
        </View>

        <View style={{}}>
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

        <View style={{marginTop: 21}}>
          <InputTextComponent
            secureTextEntry={showPassword}
            placeholder={'Password'}
            onChangeText={handleChange('password')}
            onBlur={handleBlur('password')}
            // value={values.password}
            bgColor={darkGrayBackground}
            imageRight={{
              show: true,
              url: AppImages?.passwordHide,
              color: showPassword
                ? dimGrayBorder
                : whiteBorder,
            }}
            onPressIcon={() => {
              iconHandler();
            }}
          />
          {errors?.password && touched?.password && (
            <Text style={styles.errorText}>{errors?.password}</Text>
          )}
        </View>

        <TouchableOpacity
          activeOpacity={AppConstants.buttonActiveOpacity}
          onPress={forgotPasswordHandler}>
          <Text style={styles.forgetPasswordText}>Forgot Password?</Text>
        </TouchableOpacity>

        {isBiometricAvailable && 
        <View style={styles.biometriContainer}>
          <Image source={AppImages.fingerPrint} style={styles.fingerPrintImg} />
          <View style={styles.verticalLine} />
          <Image source={AppImages.faceid} style={styles.faceidImg} />
          <Text style={styles.biometricLoginText}>Biometric Login</Text>
          <CustomSwitch isOn={switchState} onToggle={handleToggle} />
        </View>
        }
      </View>
      <View style={styles.btnContainer}>
        <ButtonComponent
          disabled={validateBtnHandler(values) || !isValid}
          // disabled={false}
          pressStatus={isLoading}
          title={'Continue'}
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
export default Login;