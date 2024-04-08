import {View, Text, StatusBar} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  ButtonComponent,
  ContainerComponent,
  InputComponent,
  RowComponent,
  SectionComponent,
  SpaceComponent,
  TextComponent,
} from '../../components';
import {appColors} from '../../constants/appColors';
import {fontFamilies} from '../../constants/fontFamilies';
import {useDispatch, useSelector} from 'react-redux';
import {addPhone, bookingSelector} from '../../redux/reducers/bookingReducer';
import {Validate} from '../../utils/validate';
import {useNavigation} from '@react-navigation/native';

const VerificationPhoneScreen = () => {
  const [valuePhone, setValuePhone] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const booking = useSelector(bookingSelector);

  const dispatch = useDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    setValuePhone(booking.phone);
  };

  const handlePhone = async () => {
    if (!valuePhone) {
      setErrorMessage('Vui lòng nhập số điện thoại');
      return;
    } else if (!Validate.phone(valuePhone)) {
      setErrorMessage('Số điện thoại không đúng');
      return;
    }

    dispatch(addPhone(valuePhone));

    navigation.goBack();
  };

  return (
    <ContainerComponent back isScroll title="Verification">
      <StatusBar barStyle="dark-content" backgroundColor="transparent" />
      <SectionComponent>
        <SpaceComponent height={40} />
        <View style={{}}>
          <InputComponent
            placeholder="VD: 1234567890"
            value={valuePhone}
            onChange={val => setValuePhone(val)}
            allowClear
            type="number-pad"
          />
          <Text
            style={{
              color: appColors.text,
              fontFamily: fontFamilies.semiBold,
              fontSize: 14,
              position: 'absolute',
              paddingHorizontal: 4,
              backgroundColor: appColors.white,
              top: -10,
              left: 16,
            }}>
            Phone
          </Text>

          {errorMessage && (
            <TextComponent text={errorMessage} color={appColors.danger} />
          )}
        </View>

        <SpaceComponent height={30} />
        <ButtonComponent
          onPress={handlePhone}
          type="primary"
          text="Done"></ButtonComponent>
      </SectionComponent>
    </ContainerComponent>
  );
};

export default VerificationPhoneScreen;
