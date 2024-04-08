/* eslint-disable prettier/prettier */
import {SafeAreaView, StatusBar} from 'react-native';
import React, {useEffect, useState} from 'react';
import AuthNavigator from './src/navigators/AuthNavigator';
import {NavigationContainer} from '@react-navigation/native';
import {globalStyles} from './src/styles/globalStyles';
import AppRouters from './src/navigators/AppRouters';
import {Provider} from 'react-redux';
import store from './src/redux/store';
import {
  DetailHotelScreen,
  SearchScreen,
  SelectDateScreen,
  SelectRoomTypeScreen,
} from './src/screens';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

const App = () => {
  return (
    <SafeAreaView style={[globalStyles.container]}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
        hidden={false}
      />
      <Provider store={store}>
        <NavigationContainer>
          <AppRouters />
        </NavigationContainer>
      </Provider>
    </SafeAreaView>
  );
};

export default App;
