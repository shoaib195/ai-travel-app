import {useNavigation} from '@react-navigation/native';
import React, {useContext, useEffect, useState, useCallback} from 'react';
import {Alert, Linking, Platform} from 'react-native';
import ReactNativeBiometrics, {BiometryTypes} from 'react-native-biometrics';
import * as Keychain from 'react-native-keychain';
import {useDispatch, useSelector} from 'react-redux';
import useAuth from './useAuth';
import useUser from './useUser';
import toastService from '../services/toastService';
import { updateAuthData } from '../redux/action';

const useBiometric = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {logUserHandler} = useUser();
  const {loginRequestHandler, isLoading} = useAuth();
  const reducerData = useSelector(state => state.userReducer);
  const [isBiometricAvailable, setIsBiometricAvailable] = useState(false);
  const [biometryType, setBiometryType] = useState(null);
  const [email, setEmail] = useState(reducerData?.auth?.user?.email);
  const [password, setPassword] = useState(reducerData?.password);
  const [modalVisible, setModalVisible] = useState(false);
  const [isSignedUp, setIsSignedUp] = useState(false);
  const [credentials, setCredentials] = useState(null);

  useEffect(() => {
    checkBiometricAvailability();
  }, []);

  const checkBiometricAvailability = async () => {
    const rnBiometrics = new ReactNativeBiometrics();

    rnBiometrics
      .isSensorAvailable()
      .then(resultObject => {
        console.log('eeeee',resultObject);
        const {available, biometryType} = resultObject;
        if (available && biometryType !== ReactNativeBiometrics.Biometrics) {
          console.log('eeeee',available, biometryType);
          
          setIsBiometricAvailable(true);
          setBiometryType(biometryType);
        } else {
          const biometricLabel =
            Platform.OS === 'ios' ? 'Face ID or Touch ID' : 'Fingerprint';
            setIsBiometricAvailable(available);
          // Alert.alert(
          //   'Error',
          //   `${biometricLabel} is not available or not enrolled on this device. Please go to settings and enable it.`,
          //   [
          //     {
          //       text: 'Ok',
          //       onPress: () => {
          //         Platform.OS === 'ios'
          //           ? Linking.openURL('app-settings:')
          //           : Linking.openSettings();
          //       },
          //     },
          //   ],
          // );
        }
      })
      .catch(error => {
        // console.log('Biometric error: ', error);
        // console.log('Error', 'Biometrics not available on this device');
      });
  };

  const handleSignUp = async btnType => {
    if (btnType == 'continue') {
      if (!email || !password) {
        console.log('Error', 'Please enter email and password.');
        return;
      }

      // Optionally save credentials to Keychain for biometric login
      if (isBiometricAvailable) {
        await handleSaveCredentials(email, password);
      }
      setModalVisible(false);
      setIsSignedUp(true); // User signed up successfully
      // console.log(
      //   'Success',
      //   'User signed up successfully! You can now log in.',
      // );
      const authData = {
        ...reducerData?.auth?.user,
        survey_completed: 1,
      };
      dispatch(updateAuthData(authData));
      // dispatch(removeUserPassword());
      // navigation.navigate('Home');
    } else {
      setModalVisible(false);
      const authData = {
        ...reducerData?.auth?.user,
        survey_completed: 1,
      };
      dispatch(updateAuthData(authData));
      // navigation.navigate('Home');
    }
  };

  const saveCredentialsToBackend = async data => {
    const loginData = {
      email: data?.username,
      password: JSON.parse(data?.password)?.password,
      biometric_enable: true,
    };
    loginRequestHandler(loginData)
      .then(({data}) => {
        if (reducerData?.auth?.token) {
          const authData = {
            ...reducerData?.auth?.user,
            survey_completed: 1,
          };
          dispatch(updateAuthData(authData));
        } else {
          logUserHandler(data?.data);
        }
        toastService.shortToast(data?.message);
        //  toastService.shortToast(data?.message);
      })
      .catch(error => {
        const apiErrors = error?.response?.data?.errors;
      });
  };

  const handleSaveCredentials = async (username, password) => {
    try {
      await Keychain.setGenericPassword(username, JSON.stringify({password}));
      console.log('Success', 'Credentials saved successfully!');
    } catch (err) {
      console.log('Error saving credentials:', err);
      console.log('Error', 'Failed to save credentials.');
    }
  };

  const handleGetCredentials = async () => {
    try {
      const savedCredentials = await Keychain.getGenericPassword();
      if (savedCredentials && savedCredentials.username) {
        setCredentials(savedCredentials);
        return savedCredentials;
      } else {
        return null;
      }
    } catch (err) {
      console.log('Error retrieving credentials:', err);
      return null;
    }
  };

  const authenticateBiometrics = () => {
    const rnBiometrics = new ReactNativeBiometrics();
console.log('rnBiometrics',rnBiometrics);

    return new Promise((resolve, reject) => {
      rnBiometrics
        .simplePrompt({promptMessage: 'Confirm fingerprint'})
        .then(resultObject => {
          const {success} = resultObject;
          if (success) {
            resolve(true);
          } else {
            reject('Authentication failed');
          }
        })
        .catch(error => {
          console.log('Authentication error: ', error);
          reject('Biometric authentication error');
        });
    });
  };

  const handleLogin = async () => {
    return new Promise(async (resolve, reject) => {
    const savedCredentials = await handleGetCredentials();


    if (savedCredentials) {
      console.log('savedCredentials',savedCredentials);
      try {
        const isAuthenticated = await authenticateBiometrics();
         console.log('isAuthenticated',isAuthenticated);
        if (isAuthenticated) {
          console.log(
            'Success',
            'Authenticated successfully!',
            savedCredentials,
          );
          try {
            await saveCredentialsToBackend(savedCredentials);
          } catch (error) {
            reject(error);
            console.log('Error', 'Failed to save credentials to server.');
            return;
          }
          // Use saved credentials to login to server or app
        }
      } catch (err) {
        reject(err);
        console.log('Error', 'Authentication failed. ' + err);
      }
    } else {
      console.log(
        'No saved credentials',
        'Please log in with your username and password.',
      );
    }
  });
  };

  const clearKeychainData = async () => {
    try {
      const result = await Keychain.resetGenericPassword();
      if (result) {
        console.log('Keychain data successfully cleared!');
      } else {
        console.log('No data was stored in Keychain.');
      }
    } catch (error) {
      console.error('Failed to clear Keychain data:', error);
    }
  };

  return {
    isBiometricAvailable,
    credentials,
    biometryType,
    modalVisible,
    isSignedUp,
    handleLogin,
    setIsSignedUp,
    setModalVisible,
    handleSignUp,
    handleGetCredentials,
    handleSaveCredentials,
    clearKeychainData,
  };
};

export default useBiometric;