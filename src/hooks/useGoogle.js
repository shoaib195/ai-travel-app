import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import useUser from './useUser';
import authService from '../services/auth-service';
import toastService from '../services/toastService';

const useGoogle = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {logUserHandler} = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const [activeButtonIndex, setActiveButtonIndex] = useState(null);
  const reducerData = useSelector((state) => state.userReducer);

  useEffect(() => {
    GoogleSignin.configure({
      scopes: ['email', 'profile'],
      webClientId: '291468761586-gmb48rq02vmnroncsvek389s7jlnpf00.apps.googleusercontent.com', // From Google API Console
      iosClientId: '291468761586-572phudl9vt16pdj75ksjdrddbt20dli.apps.googleusercontent.com', // From Google API Console
    });
  }, []);
  


  const googleSignIn = async () => {
    setActiveButtonIndex(2);
    setIsLoading(true);
    try {
      // Ensure Google Play services are available on Android
      await GoogleSignin.hasPlayServices();
      // Attempt Google Sign-In
      const userInfo = await GoogleSignin.signIn();
      const {accessToken} = await GoogleSignin.getTokens();
      console.log('accessTokenaccessToken',userInfo?.data);
      if(accessToken){
        if(userInfo && userInfo?.data){
        sendGoogleRequestHandler(accessToken);
        }
      }else{
      }
      
    } catch (error) {
      setActiveButtonIndex(null);
        setIsLoading(false);
       
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // User cancelled the sign-in process
        toastService.shortToast('User cancelled sign-in');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // Sign-in is already in progress
        toastService.shortToast('Sign-in is in progress');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // Play services not available on Android
        toastService.shortToast('Google Play Services not available');
      } else {
        // Other errors
        toastService.shortToast(error);
      }
    }
  };

  const signOut = async () => {
    try {
      // Sign out the user
      await GoogleSignin.signOut();
    } catch (error) {
      console.error('Error during sign-out:', error);
    }
  };

  const sendGoogleRequestHandler = (accessToken) => {
    const data ={
        token : accessToken
    }
    console.log('data',data);
    setIsLoading(true);
    authService
      .googleRequestHandler(data)
      .then(({data}) => {
        toastService.shortToast(data?.message);
        logUserHandler(data?.data);
        setIsLoading(false);
        setActiveButtonIndex(null);
      })
      .catch(err => {
        setActiveButtonIndex(null);
        setIsLoading(false);
        if (err?.response?.data?.message) {
          toastService.shortToast(err?.response?.data?.message);
        }
      });
  };

  return {googleSignIn, signOut, setActiveButtonIndex, sendGoogleRequestHandler, activeButtonIndex, isLoading};
};

export default useGoogle;