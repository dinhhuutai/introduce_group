import React, {useState} from 'react';
import {
  ButtonComponent,
  ContainerComponent,
  InputComponent,
  SectionComponent,
  SpaceComponent,
  TextComponent,
} from '../../components';
import {ArrowRight, Sms} from 'iconsax-react-native';
import {appColors} from '../../constants/appColors';
import {fontFamilies} from '../../constants/fontFamilies';
import {Text, View} from 'react-native';
import Octicons from 'react-native-vector-icons/Octicons';
import {LoadingModal} from '../../modals';
import authenticationAPI from '../../apis/authApi';
import { Validate } from '../../utils/validate';

const ChangePasswordNewScreen = ({navigation, route}) => {
  const {email} = route.params;

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleChangePasswordNew = async () => {
    if (!password) {
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
        '/changePasswordNew',
        {email, password},
        'post',
      );

      if (res.success) {
        navigation.navigate('LoginScreen');
      }

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  return (
    <ContainerComponent isScroll back>
      <SectionComponent>
        <SpaceComponent height={20} />
        <TextComponent text="New Password" title />
        <SpaceComponent height={6} />
        <TextComponent text="Please enter your password new" />

        <SpaceComponent height={36} />
        <View style={{flex: 1, position: 'relative'}}>
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

        <View style={{flex: 1, position: 'relative'}}>
          <InputComponent
            value={confirmPassword}
            onChange={val => {
              setConfirmPassword(val);
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
            Set password again
          </Text>
        </View>

        {errorMessage && (
          <TextComponent text={errorMessage} color={appColors.danger} />
        )}
      </SectionComponent>
      <SectionComponent styles={{alignItems: 'center'}}>
        <ButtonComponent
          text="Send"
          type="primary"
          icon={<ArrowRight size={20} color={appColors.white} />}
          iconFlex="right"
          onPress={() => handleChangePasswordNew()}
        />
      </SectionComponent>
      {isLoading && <LoadingModal />}
    </ContainerComponent>
  );
};

export default ChangePasswordNewScreen;
