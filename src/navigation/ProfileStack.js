import * as React from 'react';
import Profile from '../screens/Profile/Profile';
import {createStackNavigator} from '@react-navigation/stack';
import { useSelector } from 'react-redux';


const AuthStack = createStackNavigator();

function ProfileStack() {

  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false ,gestureEnabled: true}}>
      <AuthStack.Screen name="Profile" component={Profile} />
    </AuthStack.Navigator>
  );
}

export default ProfileStack;