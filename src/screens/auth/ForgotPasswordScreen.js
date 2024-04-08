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
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Validate} from '../../utils/validate';
import authenticationAPI from '../../apis/authApi';
import {LoadingModal} from '../../modals';

const ForgotPasswordScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleForgotPassword = async () => {
    if (!email) {
      setErrorMessage('Vui lòng nhập email');
      return;
    } else if (!Validate.email(email)) {
      setErrorMessage('Email không đúng định dạng');
      return;
    }

    try {
      setIsLoading(true);

      const res = await authenticationAPI.HandleAuthentication(
        '/findOtp',
        {email},
        'post',
      );

      if (res.success) {
        navigation.navigate('VerificationPasswordScreen', {email});
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
        <TextComponent text="Resset Password" title />
        <SpaceComponent height={6} />
        <TextComponent text="Please enter your email address to request a password reset" />

        <SpaceComponent height={36} />
        <View style={{flex: 1, position: 'relative'}}>
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
          onPress={() => handleForgotPassword()}
        />
      </SectionComponent>
      {isLoading && <LoadingModal />}
    </ContainerComponent>
  );
};

export default ForgotPasswordScreen;
