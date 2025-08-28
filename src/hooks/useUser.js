import {View, Text} from 'react-native';
import React, {useState} from 'react';
// import {SetUserLoggin,updateAuthData, USER_IS_LOGOUT} from '../redux/actions';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import toastService from '../services/toastService';
import { SetUserLoggin, updateAuthData, USER_IS_LOGOUT} from '../redux/action';

const useUser = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const reducerData = useSelector((state) => state.userReducer);

  const logUserHandler = (authData) => {
    dispatch(SetUserLoggin(authData));
     AsyncStorage.setItem('auth', JSON.stringify(authData));
    if (authData?.is_profile_completed == 0) {
      navigation.navigate('Profile');
    }
  };

  const updateUserHandler = (authData) => {
    dispatch(updateAuthData(authData));
    updateUserInStorage(authData);
  };

  const logoutUserHandler = (showToast = true) => {
    dispatch({type: USER_IS_LOGOUT});
    AsyncStorage.removeItem('auth');
    if(showToast){
      const timeout = setTimeout(() => {
        toastService.shortToast('Successfully logged out');
      }, 50);
  
      return () => {
        clearTimeout(timeout);
      };
    }
   
  };

  const updateUserInStorage = async (newUserData) => {
    try {
      const authDataString = await AsyncStorage.getItem('auth');
      
      if (authDataString) {
        const authData = JSON.parse(authDataString);
  
        authData.user = {
          ...authData.user,
          ...newUserData,
        };

        await AsyncStorage.setItem('auth', JSON.stringify(authData));
      } else {
        console.log('No auth data found in AsyncStorage.');
      }
    } catch (error) {
      console.error('Error updating user in AsyncStorage:', error);
    }
  };

  return {logUserHandler, updateUserHandler, logoutUserHandler, isLoading};
};

export default useUser;