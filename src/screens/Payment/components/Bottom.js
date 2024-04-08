import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  ButtonComponent,
  RowComponent,
  SectionComponent,
  SpaceComponent,
  TextComponent,
} from '../../../components';
import {fontFamilies} from '../../../constants/fontFamilies';
import {RadioButton} from 'react-native-paper';
import {appColors} from '../../../constants/appColors';
import {Mastercard, Paypal, Visa} from '../../../assets/svgs';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {useDispatch, useSelector} from 'react-redux';
import {
  addMethodPaymennt,
  bookingSelector,
} from '../../../redux/reducers/bookingReducer';
import {useNavigation} from '@react-navigation/native';

const Bottom = () => {
  const [checked, setChecked] = useState('hotel');

  const dispatch = useDispatch();
  const navigation = useNavigation();
  const booking = useSelector(bookingSelector);

  useEffect(() => {
    if (booking?.methodPaymennt) {
      setChecked(booking?.methodPaymennt);
    }
  }, []);

  const handlePayment = async () => {
    dispatch(addMethodPaymennt(checked));

    navigation.goBack();
  };

  return (
    <SectionComponent>
      <TextComponent
        text="Choose payment methods"
        size={16}
        font={fontFamilies.semiBold}
      />
      <SpaceComponent height={20} />

      <View
        style={{
          borderWidth: 1,
          borderColor: appColors.gray,
          borderRadius: 10,
          paddingHorizontal: 16,
          paddingVertical: 10,
        }}>
        <RowComponent justify="space-between">
          <View
            style={{
              flexDirection: 'row',
              gap: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Fontisto name="hotel" size={20} color={appColors.primary1} />

            <TextComponent
              text="Thanh toán tại khách sạn"
              font={fontFamilies.semiBold}
              size={14}
            />
          </View>
          <RadioButton
            value="hotel"
            status={checked === 'hotel' ? 'checked' : 'unchecked'}
            onPress={() => setChecked('hotel')}
          />
        </RowComponent>
        <SpaceComponent height={10} />
        <View
          style={{
            height: 1,
            width: '100%',
            backgroundColor: appColors.gray,
          }}></View>

        <SpaceComponent height={14} />

        <RowComponent justify="space-between">
          <View
            style={{
              flexDirection: 'row',
              gap: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Mastercard />

            <TextComponent
              text="Mastercard"
              font={fontFamilies.semiBold}
              size={14}
            />
          </View>
          <RadioButton
            value="mastercard"
            status={checked === 'mastercard' ? 'checked' : 'unchecked'}
            onPress={() => setChecked('mastercard')}
          />
        </RowComponent>
        <SpaceComponent height={10} />
        <View
          style={{
            height: 1,
            width: '100%',
            backgroundColor: appColors.gray,
          }}></View>

        <SpaceComponent height={14} />
        <RowComponent justify="space-between">
          <View
            style={{
              flexDirection: 'row',
              gap: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Paypal />
            <TextComponent
              text="Paypal"
              font={fontFamilies.semiBold}
              size={14}
            />
          </View>
          <RadioButton
            value="paypal"
            status={checked === 'paypal' ? 'checked' : 'unchecked'}
            onPress={() => setChecked('paypal')}
          />
        </RowComponent>
        <SpaceComponent height={10} />
        <View
          style={{
            height: 1,
            width: '100%',
            backgroundColor: appColors.gray,
          }}></View>

        <SpaceComponent height={14} />
        <RowComponent justify="space-between">
          <View
            style={{
              flexDirection: 'row',
              gap: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Visa />
            <TextComponent text="Visa" font={fontFamilies.semiBold} size={14} />
          </View>
          <RadioButton
            value="visa"
            status={checked === 'visa' ? 'checked' : 'unchecked'}
            onPress={() => setChecked('visa')}
          />
        </RowComponent>
      </View>

      <SpaceComponent height={40} />
      <ButtonComponent
        onPress={handlePayment}
        type="primary"
        text="Done"></ButtonComponent>
    </SectionComponent>
  );
};

export default Bottom;
