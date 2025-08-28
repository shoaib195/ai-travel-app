import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AuthStack from './AuthStack';
import HomeStack from './HomeStack';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useSelector} from 'react-redux';
import {KeyboardAvoidingView, Platform} from 'react-native';
import ProfileStack from './ProfileStack';

const AppNavigator = () => {
  const reducerData = useSelector(state => state.userReducer);
  const authUser = reducerData?.auth?.customer;
  console.log('authUser', authUser);

  return (
    <NavigationContainer>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
        style={[{flex: 1}]}>
        {authUser ? (
          authUser?.is_profile_completed ? (
            <HomeStack />
          ) : (
            <ProfileStack />
          )
        ) : (
          <AuthStack />
        )}
      </KeyboardAvoidingView>
    </NavigationContainer>
  );
};

export default AppNavigator;
