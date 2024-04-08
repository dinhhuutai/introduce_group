/* eslint-disable prettier/prettier */
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  ForgotPasswordScreen,
  LoginScreen,
  OnbroadingScreen,
  RegisterScreen,
  VerificationScreen,
  ChangePasswordNewScreen,
  VerificationPasswordScreen,
} from '../screens';

const AuthNavigator = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="OnbroadingScreen" component={OnbroadingScreen} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
      <Stack.Screen
        name="ForgotPasswordScreen"
        component={ForgotPasswordScreen}
      />
      <Stack.Screen name="VerificationScreen" component={VerificationScreen} />
      <Stack.Screen
        name="ChangePasswordNewScreen"
        component={ChangePasswordNewScreen}
      />
      <Stack.Screen
        name="VerificationPasswordScreen"
        component={VerificationPasswordScreen}
      />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
