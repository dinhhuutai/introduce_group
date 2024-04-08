import {View, Text, StatusBar} from 'react-native';
import React from 'react';
import {ContainerComponent} from '../../components';
import Top from './components/Top';
import Bottom from './components/Bottom';
import {
  TouchableOpacity,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import {appColors} from '../../constants/appColors';
import {Add} from 'iconsax-react-native';
import {useSelector} from 'react-redux';
import {userSelector} from '../../redux/reducers/userReducer';

const PaymentScreen = () => {
  const navigation = useNavigation();

  const user = useSelector(userSelector);

  return (
    <ContainerComponent
      back
      title="Payment method"
      next
      isScroll
      onNext={() =>
        navigation.navigate('AddCardPaymentScreen', {id: user._id})
      }>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" />
      <Top />
      <Bottom />
    </ContainerComponent>
  );
};

export default PaymentScreen;
