import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DashboardHomeScreen from '../screens/Home/Home';
import AppIntro from '../screens/AppIntro/AppIntro';
import UserSelectService from '../screens/UserSelectService/UserSelectService';
import SignUp from '../screens/Signup/Signup';
import OtpVerification from '../screens/OtpVerification/OtpVerification';
import Login from '../screens/Login/Login';
import ForgotPassword from '../screens/Login/ForgotPassword';
import NewPassword from '../screens/NewPassword/NewPassword';
import OnlineConsultation from '../screens/OnlineConsultation/OnlineConsultation';
import Home from '../screens/Home/Home';
import SpecialistCategory from '../screens/SpecialistCategory/SpecialistCategory';
import Checkout from '../screens/Checkout/Checkout';
import PaymentDetails from '../screens/PaymentDetails/PaymentDetails';
import DoctorDetail from '../screens/DoctorDetail/DoctorDetail';
import UserProfileScreen from '../screens/Profile/Profile';
import Profile from '../screens/Profile/Profile';
import { useSelector } from 'react-redux';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  const reducerData = useSelector(state => state.userReducer);
  const tutorial = reducerData?.appIntro;
console.log('tutorial',tutorial);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="AppIntro" component={AppIntro} />
      <Stack.Screen name="UserSelectService" component={UserSelectService} />
      {/* <Stack.Screen name="OnlineConsultation" component={OnlineConsultation} /> */}
      {/* <Stack.Screen name="DoctorDetail" component={DoctorDetail} /> */}
      {/* <Stack.Screen name="Checkout" component={Checkout} /> */}
      {/* <Stack.Screen name="PaymentDetails" component={PaymentDetails} /> */}
      {/* <Stack.Screen name="Home" component={Home} /> */}
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="OtpVerification" component={OtpVerification} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="NewPassword" component={NewPassword} />
      {/* <Stack.Screen name="SpecialistCategory" component={SpecialistCategory} /> */}
      
      
    </Stack.Navigator>
  );
};

export default AuthStack;
