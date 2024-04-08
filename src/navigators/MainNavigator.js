/* eslint-disable prettier/prettier */
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TabNavigator from './TabNavigator';
import {
  SelectDateScreen,
  SelectRoomTypeScreen,
  SearchScreen,
  DetailHotelScreen,
  FitureScreen,
  BookingScreen,
  PaymentScreen,
  AddCardPaymentScreen,
  VerificationPhoneScreen,
  DetailRoomScreen,
  ListRoomScreen,
  UtilHotelScreen,
  ListHotelScreen,
  SelectAddressScreen,
  FilterHotelScreen,
  EvaluateScreen,
  SearchNameHotelScreen,
  BookingSuccessScreen,
  HomeScreen,
  DetailBookingScreen,
} from '../screens';

const MainNavigator = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Main" component={TabNavigator} />
      <Stack.Screen name="DetailBookingScreen" component={DetailBookingScreen} />
      <Stack.Screen
        name="BookingSuccessScreen"
        component={BookingSuccessScreen}
      />
      <Stack.Screen name="DetailHotelScreen" component={DetailHotelScreen} />
      <Stack.Screen
        name="VerificationPhoneScreen"
        component={VerificationPhoneScreen}
      />
      <Stack.Screen name="PaymentScreen" component={PaymentScreen} />
      <Stack.Screen name="BookingScreen" component={BookingScreen} />
      <Stack.Screen name="SelectDateScreen" component={SelectDateScreen} />
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen
        name="SelectRoomTypeScreen"
        component={SelectRoomTypeScreen}
      />
      <Stack.Screen name="SearchScreen" component={SearchScreen} />
      <Stack.Screen name="FitureScreen" component={FitureScreen} />
      <Stack.Screen
        name="AddCardPaymentScreen"
        component={AddCardPaymentScreen}
      />
      <Stack.Screen name="DetailRoomScreen" component={DetailRoomScreen} />
      <Stack.Screen name="ListRoomScreen" component={ListRoomScreen} />
      <Stack.Screen name="UtilHotelScreen" component={UtilHotelScreen} />
      <Stack.Screen name="ListHotelScreen" component={ListHotelScreen} />
      <Stack.Screen
        name="SelectAddressScreen"
        component={SelectAddressScreen}
      />
      <Stack.Screen name="FilterHotelScreen" component={FilterHotelScreen} />
      <Stack.Screen name="EvaluateScreen" component={EvaluateScreen} />
      <Stack.Screen
        name="SearchNameHotelScreen"
        component={SearchNameHotelScreen}
      />
    </Stack.Navigator>
  );
};

export default MainNavigator;
