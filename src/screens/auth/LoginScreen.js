import {View, Text, StatusBar, SafeAreaView, Image, Switch} from 'react-native';
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
import {fontFamilies} from '../../constants/fontFamilies';
import {appColors} from '../../constants/appColors';
import Octicons from 'react-native-vector-icons/Octicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SocialLogin from './components/SocialLogin';
import {Validate} from '../../utils/validate';
import {LoadingModal} from '../../modals';
import authenticationAPI from '../../apis/authApi';
import {useDispatch} from 'react-redux';
import {addAuth} from '../../redux/reducers/authReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {putListLike} from '../../redux/reducers/listLikeReducer';

const LoginScreen = ({navigation}) => {
  const [isRemember, setIsRemember] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  const handleLogin = async () => {
    if (!email) {
      setErrorMessage('Vui lòng nhập email');
      return;
    } else if (!Validate.email(email)) {
      setErrorMessage('Email không đúng định dạng');
      return;
    } else if (!password) {
      setErrorMessage('Vui lòng nhập mật khẩu');
      return;
    }

    try {
      setIsLoading(true);

      const res = await authenticationAPI.HandleAuthentication(
        '/login',
        {email, password},
        'post',
      );

      if (!res.success && res.message === 'Incorrect username or password') {
        setErrorMessage('Mật khẩu không chính xác');
      }

      if (res.success && !res.data.isVerification) {
        const res1 = await authenticationAPI.HandleAuthentication(
          '/findOtp',
          {email},
          'post',
        );

        if (res1.success) {
          navigation.navigate('VerificationScreen', {email});
        }
      }

      if (res.success) {
        dispatch(addAuth(res.data));
        await AsyncStorage.setItem('auth', JSON.stringify(res.data));
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
      <View className="mt-[44px] flex items-center">
        <Image source={require('../../assets/images/logo.png')} />
      </View>
      <SectionComponent
        styles={{
          marginTop: 60,
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
          Sign in
        </Text>
      </SectionComponent>
      <SectionComponent
        styles={{
          marginTop: 20,
        }}>
        <View style={{flex: 1, position: 'relative', marginTop: 10}}>
          <InputComponent
            value={email}
            onChange={val => {
              setEmail(val);
              setErrorMessage('');
            }}
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
            value={password}
            onChange={val => {
              setPassword(val);
              setErrorMessage('');
            }}
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

        {errorMessage && (
          <View>
            <TextComponent text={errorMessage} color={appColors.danger} />
            <SpaceComponent height={6} />
          </View>
        )}

        <RowComponent justify="space-between">
          <RowComponent onPress={() => setIsRemember(prev => !prev)}>
            <Switch
              trackColor={{true: appColors.primary}}
              thumbColor={appColors.white}
              value={isRemember}
            />
            <TextComponent color={appColors.text1} text="Remember Me" />
          </RowComponent>
          <ButtonComponent
            textColor={appColors.text1}
            text="Forgot Password?"
            onPress={() => navigation.navigate('ForgotPasswordScreen')}
            type="text"
          />
        </RowComponent>
      </SectionComponent>

      <SectionComponent styles={{alignItems: 'center'}}>
        <ButtonComponent
          onPress={handleLogin}
          type="primary"
          text="Log in"></ButtonComponent>
      </SectionComponent>

      <SocialLogin />

      <SectionComponent styles={{alignItems: 'center', marginTop: 20}}>
        <RowComponent>
          <TextComponent text="Don't have an account yet? " />
          <ButtonComponent
            onPress={() => navigation.navigate('RegisterScreen')}
            text="Sign up"
            textFont={fontFamilies.bold}
          />
        </RowComponent>
      </SectionComponent>
      {isLoading && <LoadingModal />}
    </ContainerComponent>
  );
};

export default LoginScreen;
