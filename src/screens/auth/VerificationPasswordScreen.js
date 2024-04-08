import React, {useEffect, useRef, useState} from 'react';
import {
  ButtonComponent,
  ContainerComponent,
  RowComponent,
  SectionComponent,
  SpaceComponent,
  TextComponent,
} from '../../components';
import {ArrowRight, Sms} from 'iconsax-react-native';
import {appColors} from '../../constants/appColors';
import {StyleSheet, TextInput, View} from 'react-native';
import {fontFamilies} from '../../constants/fontFamilies';
import secureEmail from '../../utils/secureEmail';
import authenticationAPI from '../../apis/authApi';
import {LoadingModal} from '../../modals';
import {addAuth} from '../../redux/reducers/authReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from 'react-redux';

const VerificationPasswordScreen = ({navigation, route}) => {
  const {email} = route.params;

  const [num1, setNum1] = useState('');
  const [num2, setNum2] = useState('');
  const [num3, setNum3] = useState('');
  const [num4, setNum4] = useState('');

  const [limit, setLimit] = useState(300);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const ref1 = useRef();
  const ref2 = useRef();
  const ref3 = useRef();
  const ref4 = useRef();


  useEffect(() => {
    if (limit > 0) {
      const interval = setInterval(() => {
        setLimit(limit => limit - 1);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, []);

  const handleVerification = async () => {
    if (limit <= 0) {
      setErrorMessage('Mã otp hết thời gian');
      return;
    }

    try {
      setIsLoading(true);

      const res = await authenticationAPI.HandleAuthentication(
        '/verification',
        {email, codeVerification: '' + num1 + num2 + num3 + num4},
        'post',
      );

      if (res.success) {
        navigation.navigate('ChangePasswordNewScreen', {email});
      }

      setIsLoading(false);
    } catch (error) {
      setErrorMessage('Mã otp không đúng');
      setIsLoading(false);
      console.log(error);
    }
  };

  const handleResendVerification = async () => {
    try {
      setIsLoading(true);
      const res = await authenticationAPI.HandleAuthentication(
        '/findOtp',
        {email},
        'post',
      );
      setLimit(300);
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
        <TextComponent text="Verification" title />
        <SpaceComponent height={6} />
        <TextComponent
          text={`We’ve send you the verification code on ${
            secureEmail(email) || email
          }`}
        />

        <SpaceComponent height={26} />

        <RowComponent
          styles={{
            justifyContent: 'space-around',
          }}>
          <View style={[styles.inputContainer]}>
            <TextInput
              ref={ref1}
              keyboardType="number-pad"
              style={[styles.input]}
              value={num1}
              onChangeText={val => {
                val.length === 1 && ref2.current.focus();
                setNum1(val);
                setErrorMessage('');
              }}
              maxLength={1}
            />
          </View>
          <View style={[styles.inputContainer]}>
            <TextInput
              ref={ref2}
              keyboardType="number-pad"
              style={[styles.input]}
              value={num2}
              onChangeText={val => {
                val.length === 1 && ref3.current.focus();
                setNum2(val);
                setErrorMessage('');
              }}
              maxLength={1}
              onKeyPress={({nativeEvent}) => {
                if (nativeEvent.key === 'Backspace') {
                  if (num2.length === 0) {
                    setNum1('');
                    ref1.current.focus();
                  }
                }
              }}
            />
          </View>
          <View style={[styles.inputContainer]}>
            <TextInput
              ref={ref3}
              keyboardType="number-pad"
              style={[styles.input]}
              value={num3}
              onChangeText={val => {
                val.length === 1 && ref4.current.focus();
                setNum3(val);
                setErrorMessage('');
              }}
              maxLength={1}
              onKeyPress={({nativeEvent}) => {
                if (nativeEvent.key === 'Backspace') {
                  if (num3.length === 0) {
                    setNum2('');
                    ref2.current.focus();
                  }
                }
              }}
            />
          </View>
          <View style={[styles.inputContainer]}>
            <TextInput
              ref={ref4}
              keyboardType="number-pad"
              style={[styles.input]}
              value={num4}
              onChangeText={val => {
                setNum4(val);
                setErrorMessage('');
              }}
              maxLength={1}
              onKeyPress={({nativeEvent}) => {
                if (nativeEvent.key === 'Backspace') {
                  if (num4.length === 0) {
                    setNum3('');
                    ref3.current.focus();
                  }
                }
              }}
            />
          </View>
        </RowComponent>
      </SectionComponent>
      <SpaceComponent height={20} />
      <SectionComponent styles={{alignItems: 'center'}}>
        <ButtonComponent
          onPress={handleVerification}
          text="Continue"
          type="primary"
          icon={<ArrowRight size={20} color={appColors.white} />}
          iconFlex="right"
        />
        <SpaceComponent height={10} />

        {errorMessage && (
          <SectionComponent>
            <TextComponent text={errorMessage} color={appColors.danger} />
          </SectionComponent>
        )}
        {limit > 0 ? (
          <RowComponent justify="center">
            <TextComponent text="Re-send code in " />
            <TextComponent
              text={`0${(limit - (limit % 60)) / 60}:${
                limit - (limit - (limit % 60))
              }`}
              font={fontFamilies.semiBold}
              size={16}
            />
          </RowComponent>
        ) : (
          <SectionComponent styles={{justifyContent: 'center'}}>
            <ButtonComponent
              onPress={handleResendVerification}
              text="Resend email verification"
            />
          </SectionComponent>
        )}
      </SectionComponent>
      {isLoading && <LoadingModal />}
    </ContainerComponent>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    width: 64,
    height: 64,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: appColors.text1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: appColors.white,
  },

  input: {
    width: 64,
    height: 64,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    color: appColors.text,
    fontSize: 30,
    fontFamily: fontFamilies.bold,
  },
});

export default VerificationPasswordScreen;
