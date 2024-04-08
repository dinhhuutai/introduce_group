import {View, Text, StatusBar} from 'react-native';
import React, {useState} from 'react';
import {
  ButtonComponent,
  ContainerComponent,
  InputComponent,
  RowComponent,
  SectionComponent,
  SpaceComponent,
  TextComponent,
} from '../../components';
import CardDebit from '../../components/CardDebit';
import {appColors} from '../../constants/appColors';
import {fontFamilies} from '../../constants/fontFamilies';
import {useDispatch} from 'react-redux';
import {useNavigation, useRoute} from '@react-navigation/native';
import userAPI from '../../apis/userApi';
import {LoadingModal} from '../../modals';
import {addAuth} from '../../redux/reducers/authReducer';
import {addUser} from '../../redux/reducers/userReducer';

const AddCardPaymentScreen = () => {
  const [values, setValues] = useState({
    name: '',
    numCard: '',
    exp: '',
    cvv: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const route = useRoute();
  const {id} = route.params;

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleChangeValue = (key, val) => {
    const data = {...values};

    if (key === 'exp' && val.length === 3 && !val.includes('/')) {
      val = val.slice(0, 2) + '/' + val.slice(2);
    }

    if (val.length === 3 && val.includes('/')) {
      val = val.slice(0, 2);
    }

    data[key] = val;

    setValues(data);
  };

  const handleAddPayment = async () => {
    if (!values.name || !values.numCard || !values.exp || !values.cvv) {
      setErrorMessage('Vui lòng nhập đầy đủ thông tin');
      return;
    }
    setIsLoading(true);

    let parts = values.exp.split('/');
    const data = {
      ...values,
      exp: {
        year: parts[1] * 1,
        month: parts[0] * 1,
      },
    };

    const res = await userAPI.HandleUser(`/addPayment/${id}`, data, 'post');

    dispatch(addUser(res.data));
    setIsLoading(false);

    navigation.goBack();
  };

  return (
    <ContainerComponent back isScroll title="Add payment">
      <StatusBar barStyle="dark-content" backgroundColor="transparent" />
      <SectionComponent>
        <SpaceComponent height={30} />
        <CardDebit
          name={values.name}
          number={values.numCard}
          exp={values.exp}
        />

        <SpaceComponent height={40} />
        <View>
          <View style={{}}>
            <InputComponent
              placeholder="VD: NGUYEN VAN A"
              value={values.name}
              onChange={val => {
                handleChangeValue('name', val);
                setErrorMessage('');
              }}
              allowClear
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
              Tên chủ thẻ
            </Text>
          </View>

          <SpaceComponent height={10} />
          <View style={{}}>
            <InputComponent
              value={values.numCard}
              onChange={val => {
                handleChangeValue('numCard', val);
                setErrorMessage('');
              }}
              allowClear
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
              Số thẻ
            </Text>
          </View>

          <SpaceComponent height={10} />
          <View style={{flexDirection: 'row', gap: 20}}>
            <View style={{flex: 1}}>
              <InputComponent
                placeholder="MM/YY"
                value={values.exp}
                onChange={val => {
                  handleChangeValue('exp', val);
                  setErrorMessage('');
                }}
                type="number-pad"
                maxLength={5}
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
                Exp
              </Text>
            </View>

            <View style={{width: 100}}>
              <InputComponent
                value={values.cvv}
                onChange={val => {
                  handleChangeValue('cvv', val);
                  setErrorMessage('');
                }}
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
                CVV
              </Text>
            </View>
          </View>
        </View>

        {errorMessage && (
          <View>
            <TextComponent text={errorMessage} color={appColors.danger} />
            <SpaceComponent height={6} />
          </View>
        )}

        <SpaceComponent height={30} />
        <ButtonComponent
          onPress={handleAddPayment}
          type="primary"
          text="Add Card"></ButtonComponent>
      </SectionComponent>
      {isLoading && <LoadingModal />}
    </ContainerComponent>
  );
};

export default AddCardPaymentScreen;
