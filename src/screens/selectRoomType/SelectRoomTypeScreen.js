import {View, Text, StatusBar} from 'react-native';
import React from 'react';
import {ContainerComponent} from '../../components';
import Top from './components/Top';
import Bottom from './components/Bottom';

const SelectRoomTypeScreen = () => {
  return (
    <ContainerComponent back title='Room & quantity'>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" />
      <Top />
      <Bottom />
    </ContainerComponent>
  );
};

export default SelectRoomTypeScreen;
