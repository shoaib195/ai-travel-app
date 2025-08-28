import React, {useState} from 'react';
import {
  Dimensions,
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from 'react-native';
import {colorTheme} from '../../constants/ColorConstants';
import {getStyles} from './Styles';
import Header from '../../components/Header';
import toastService from '../../services/toastService';
import CountDown from 'react-native-countdown-fixed';
import useUser from '../../hooks/useUser';
import ButtonComponent from '../../components/ButtonComp';
import useAuth from '../../hooks/useAuth';
import OtpInputs from '../../components/OtpContainer/OtpContainer';
import LoaderModal from '../../components/Modal/LoaderModal';

const {
  primaryText,
  defaultText,
  primaryBackground,
  secondaryBackground,
  primaryBorder,
} = colorTheme;

const OtpVerification = ({navigation, route}) => {
  const {width, height} = Dimensions.get('window');
  const email = route?.params?.email;
  const screenName = route?.params?.screenName;
  const styles = getStyles(width, height);
  const {logUserHandler} = useUser();
  const [otp, setOtp] = useState('');
  const [otpTimer, setOtpTimer] = useState(60);
  // const [resendCode, setResendCode] = useState(false);
  const {
    userAuthenticateHandler,
    setError,
    setBtnPress,
    btnPress,
    error,
    isLoading,
    resendCode,
    setResendCode,
    verificationResendOtpRequestHandler,
  } = useAuth();

  const validateBtnHandler = () => {
    if (otp && otp.length >= 4) {
      return false;
    } else {
      return true;
    }
  };

  const ResendOTPFunc = () => {
    verificationResendOtpRequestHandler(email)
      .then(({data}) => {
        toastService.shortToast(data?.message);
        setOtpTimer(60);
        setResendCode(false);
      })
      .catch(error => {
        setResendCode(false);
        toastService.shortToast(error?.response?.data?.errors);
      });
  };

  const authenticateUser = otp => {
    const userData = {
      email: email,
      otp: otp,
      ...(screenName === 'ForgotPassword' && {forgot_password: true}),
    };
    userAuthenticateHandler(userData)
      .then(({data}) => {
        if (data?.data?.token) {
          toastService.shortToast(data?.message);
          logUserHandler(data?.data);
        } else {
          navigation.navigate('NewPassword', {
            userData: userData,
          });
        }
      })
      .catch(error => {
        if (error?.response?.data?.message) {
          toastService.shortToast(error?.response?.data?.message);
        }
      });
  };

  const getOtp = otp => {
    const lengthArray = otp?.split('');

    setOtp(otp);
    if (Array.isArray(lengthArray) && lengthArray.length > 3) {
      if (!isLoading) {
        authenticateUser(otp);
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {(isLoading || btnPress) && (
          <LoaderModal load={isLoading || btnPress} textShow={false} />
        )}
      <View style={{flex: 1}}>
        <Header navigation={navigation} cancelButton={true} />
        <ScrollView contentContainerStyle={styles.scrollViewStyle}>
          <View style={styles.contentView}>
            <View style={styles.titleView}>
              <Text style={styles.titleText}>Confirm your Email</Text>
            </View>

            <Text style={styles.subTitle}>
              Enter the code we send to the email
            </Text>

            <View style={styles.otpContainer}>
              <OtpInputs getOtp={otp => getOtp(otp)} />
            </View>
          </View>
          <View style={styles.btnContainer}>
            <ButtonComponent
              disabled={validateBtnHandler()}
              pressStatus={isLoading}
              title={'Confirm'}
              btnStyle={
                validateBtnHandler() ? styles.btnStyle : styles.activeBtnStyle
              }
              onPress={() => {
                authenticateUser(otp);
              }}
            />

            {resendCode ? (
              <ButtonComponent
                disabled={btnPress}
                pressStatus={btnPress}
                title={'Send code again'}
                // textStyle={styles.btnResendTextStyle}
                btnStyle={styles.btnResendStyle}
                onPress={() => {
                  ResendOTPFunc();
                }}
              />
            ) : (
              <CountDown
                until={otpTimer}
                size={18}
                onChange={e => setOtpTimer(e)}
                onFinish={() => setResendCode(true)}
                digitStyle={null}
                digitTxtStyle={{color: defaultText}}
                separatorStyle={{color: defaultText}}
                timeToShow={['M', 'S']}
                timeLabels={{m: null, s: null}}
                showSeparator
              />
            )}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};
export default OtpVerification;
