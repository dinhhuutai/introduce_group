import {View, Text, StatusBar, SafeAreaView} from 'react-native';
import React, {useState} from 'react';
import {
  ButtonComponent,
  ContainerComponent,
  InputComponent,
  RowComponent,
  SectionComponent,
  TextComponent,
} from '../../components';
import {fontFamilies} from '../../constants/fontFamilies';
import {appColors} from '../../constants/appColors';
import Octicons from 'react-native-vector-icons/Octicons';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SocialLogin from './components/SocialLogin';
import {Validate} from '../../utils/validate';
import {LoadingModal} from '../../modals';
import authenticationAPI from '../../apis/authApi';
import {useDispatch} from 'react-redux';
import {addAuth} from '../../redux/reducers/authReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initValue = {
  name: '',
  phone: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const RegisterScreen = ({navigation}) => {
  const [values, setValues] = useState(initValue);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const dispatch = useDispatch();

  const handleChangeValue = (key, value) => {
    setErrorMessage('');

    const data = {...values};

    data[key] = value;

    setValues(data);
  };

  const handleRegister = async () => {
    const {name, phone, email, password, confirmPassword} = values;

    if (!name) {
      setErrorMessage('Vui lòng nhập tên');
      return;
    } else if (!phone) {
      setErrorMessage('Vui lòng nhập số điện thoại');
      return;
    } else if (!Validate.phone(phone)) {
      setErrorMessage('Số điện thoại không đúng');
      return;
    } else if (!email) {
      setErrorMessage('Vui lòng nhập email');
      return;
    } else if (!Validate.email(email)) {
      setErrorMessage('Email không đúng định dạng');
      return;
    } else if (!password) {
      setErrorMessage('Vui lòng nhập mật khẩu');
      return;
    } else if (!Validate.password(password)) {
      setErrorMessage('Mật khẩu phải có 6 ký tự trở lên');
      return;
    } else if (password !== confirmPassword) {
      setErrorMessage('Nhập lại mật khẩu không chính xác');
      return;
    }

    try {
      setIsLoading(true);

      const res = await authenticationAPI.HandleAuthentication(
        '/register',
        values,
        'post',
      );

      if (!res.success && res.message === 'Username already taken') {
        setErrorMessage('Email đã được đăng ký');
      }

      if (res.success) {
        navigation.navigate('VerificationScreen', {email});
      }

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  return (
    <ContainerComponent isScroll>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" />
      <SectionComponent
        styles={{
          marginTop: 58,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text
          className="text-[20px]"
          style={{
            fontFamily: fontFamilies.bold,
            fontSize: 24,
            color: appColors.text,
          }}>
          Create your Account
        </Text>
      </SectionComponent>
      <SectionComponent
        styles={{
          marginTop: 20,
        }}>
        <View style={{flex: 1, position: 'relative'}}>
          <InputComponent
            value={values.name}
            onChange={val => handleChangeValue('name', val)}
            allowClear
            affix={<Octicons name="person" size={22} color={appColors.text} />}
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
            Your name
          </Text>
        </View>
        <View style={{flex: 1, position: 'relative', marginTop: 10}}>
          <InputComponent
            type="number-pad"
            value={values.phone}
            onChange={val => handleChangeValue('phone', val)}
            allowClear
            affix={
              <Feather name="smartphone" size={22} color={appColors.text} />
            }
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
            Phone number
          </Text>
        </View>
        <View style={{flex: 1, position: 'relative', marginTop: 10}}>
          <InputComponent
            value={values.email}
            onChange={val => handleChangeValue('email', val)}
            allowClear
            affix={
              <MaterialCommunityIcons
                name="email-outline"
                size={22}
                color={appColors.text}
              />
            }
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
            Email
          </Text>
        </View>
        <View style={{flex: 1, position: 'relative', marginTop: 10}}>
          <InputComponent
            value={values.password}
            onChange={val => handleChangeValue('password', val)}
            allowClear
            isPassword
            affix={<Octicons name="key" size={22} color={appColors.text} />}
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
            Set password
          </Text>
        </View>
        <View style={{flex: 1, position: 'relative', marginTop: 10}}>
          <InputComponent
            value={values.confirmPassword}
            onChange={val => handleChangeValue('confirmPassword', val)}
            allowClear
            isPassword
            affix={<Octicons name="key" size={22} color={appColors.text} />}
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
            Set password again
          </Text>
        </View>

        {errorMessage && (
          <TextComponent text={errorMessage} color={appColors.danger} />
        )}
      </SectionComponent>

      <SectionComponent styles={{alignItems: 'center'}}>
        <ButtonComponent
          onPress={() => handleRegister()}
          type="primary"
          text="Create"></ButtonComponent>
      </SectionComponent>

      <SocialLogin />

      <SectionComponent styles={{alignItems: 'center', marginTop: 20}}>
        <RowComponent>
          <TextComponent text="Already have an account? " />
          <ButtonComponent
            onPress={() => navigation.navigate('LoginScreen')}
            text="Sign in"
            textFont={fontFamilies.bold}
          />
        </RowComponent>
      </SectionComponent>
      {isLoading && <LoadingModal />}
    </ContainerComponent>
  );
};

export default RegisterScreen;
