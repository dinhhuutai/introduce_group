import {StatusBar, View, Text, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import AsyncStorage, {
  useAsyncStorage,
} from '@react-native-async-storage/async-storage';
import {
  ButtonComponent,
  ContainerComponent,
  InputComponent,
  RowComponent,
  SectionComponent,
  SpaceComponent,
  TextComponent,
} from '../../../components';
import {fontFamilies} from '../../../constants/fontFamilies';
import {appColors} from '../../../constants/appColors';
import Octicons from 'react-native-vector-icons/Octicons';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch, useSelector} from 'react-redux';
import {authSelector, removeAuth} from '../../../redux/reducers/authReducer';
import CardDebit from '../../../components/CardDebit';
import {userSelector} from '../../../redux/reducers/userReducer';

const ProfileScreen = ({navigation}) => {
  const {getItem} = useAsyncStorage('auth');
  const [user, setUser] = useState();
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [id, setId] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [payments, setPayments] = useState([]);

  const dispatch = useDispatch();
  const userRe = useSelector(userSelector);

  useEffect(() => {
    checkLogin();
  }, [userRe]);

  const checkLogin = async () => {
    setName(userRe?.name);
    setAddress(userRe?.address);
    setId(userRe?._id);
    setEmail(userRe?.email);
    setPhone(userRe?.phone);
    setPayments(userRe?.payments);

    setUser(userRe);
  };

  const handleLogout = async () => {
    await AsyncStorage.clear();
    dispatch(removeAuth());
  };

  return (
    <ContainerComponent isScroll>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" />
      <SpaceComponent height={60} />
      <RowComponent justify="center">
        <TextComponent text="Personal" title />
      </RowComponent>

      <SpaceComponent height={30} />
      <SectionComponent>
        <TextComponent
          text="Personal data"
          size={18}
          font={fontFamilies.semiBold}
        />
        <SpaceComponent height={10} />
        <View
          style={{
            borderWidth: 1,
            borderRadius: 10,
            borderColor: appColors.text1,
            paddingTop: 20,
          }}>
          <SectionComponent
            styles={{
              marginBottom: -20,
            }}>
            <TextComponent
              text="Full name"
              size={16}
              font={fontFamilies.medium}
            />
            <InputComponent
              stylesO={{borderWidth: 0, marginBottom: 0, paddingHorizontal: 0}}
              stylesInput={{fontFamily: fontFamilies.semiBold, fontSize: 16}}
              value={name}
              onChange={val => {
                setName(val);
                setErrorMessage('');
              }}
              affix={<Octicons name="person" size={24} />}
            />
          </SectionComponent>

          <SectionComponent>
            <View
              style={{
                width: '100%',
                height: 0.5,
                backgroundColor: appColors.text1,
              }}></View>
          </SectionComponent>

          <SectionComponent
            styles={{
              marginBottom: -20,
            }}>
            <TextComponent
              text="Address"
              size={16}
              font={fontFamilies.medium}
            />
            <InputComponent
              stylesO={{borderWidth: 0, marginBottom: 0, paddingHorizontal: 0}}
              stylesInput={{fontFamily: fontFamilies.semiBold, fontSize: 16}}
              value={address}
              onChange={val => {
                setAddress(val);
                setErrorMessage('');
              }}
              affix={<Octicons name="location" size={24} />}
            />
          </SectionComponent>

          <SectionComponent>
            <View
              style={{
                width: '100%',
                height: 0.5,
                backgroundColor: appColors.text1,
              }}></View>
          </SectionComponent>

          <SectionComponent
            styles={{
              marginBottom: -20,
            }}>
            <TextComponent text="ID" size={16} font={fontFamilies.medium} />
            <InputComponent
              stylesO={{borderWidth: 0, marginBottom: 0, paddingHorizontal: 0}}
              stylesInput={{fontFamily: fontFamilies.semiBold, fontSize: 16}}
              value={id}
              onChange={val => {
                setId(val);
                setErrorMessage('');
              }}
              affix={<Octicons name="note" size={24} />}
            />
          </SectionComponent>
        </View>
      </SectionComponent>

      <SpaceComponent height={10} />
      <SectionComponent>
        <TextComponent text="Contact" size={18} font={fontFamilies.semiBold} />
        <SpaceComponent height={10} />
        <View
          style={{
            borderWidth: 1,
            borderRadius: 10,
            borderColor: appColors.text1,
            paddingTop: 20,
          }}>
          <SectionComponent
            styles={{
              marginBottom: -20,
            }}>
            <TextComponent text="Email" size={16} font={fontFamilies.medium} />
            <InputComponent
              stylesO={{borderWidth: 0, marginBottom: 0, paddingHorizontal: 0}}
              stylesInput={{fontFamily: fontFamilies.semiBold, fontSize: 16}}
              value={email}
              onChange={val => {
                setEmail(val);
                setErrorMessage('');
              }}
              isPassword
              affix={<MaterialCommunityIcons name="email-outline" size={24} />}
            />
          </SectionComponent>

          <SectionComponent>
            <View
              style={{
                width: '100%',
                height: 0.5,
                backgroundColor: appColors.text1,
              }}></View>
          </SectionComponent>

          <SectionComponent
            styles={{
              marginBottom: -20,
            }}>
            <TextComponent text="Phone" size={16} font={fontFamilies.medium} />
            <InputComponent
              stylesO={{borderWidth: 0, marginBottom: 0, paddingHorizontal: 0}}
              stylesInput={{fontFamily: fontFamilies.semiBold, fontSize: 16}}
              value={phone}
              onChange={val => {
                setPhone(val);
                setErrorMessage('');
              }}
              isPassword
              affix={<Feather name="smartphone" size={24} />}
            />
          </SectionComponent>
        </View>
      </SectionComponent>

      <SpaceComponent height={16} />
      <SectionComponent>
        <TextComponent text="Payment" size={18} font={fontFamilies.semiBold} />
        <SpaceComponent height={16} />

        {payments?.length > 0 ? (
          <CardDebit
            number={payments[0]?.numCard}
            name={payments[0]?.name}
            exp={`${
              new Date(payments[0]?.exp).getMonth() + 1 < 10
                ? '0' + (new Date(payments[0]?.exp).getMonth() + 1)
                : new Date(payments[0]?.exp).getMonth() + 1
            }/${new Date(payments[0]?.exp).getFullYear().toString().slice(-2)}`}
          />
        ) : (
          ''
        )}

        <SpaceComponent height={16} />
        <TouchableOpacity
          onPress={() => navigation.navigate('AddCardPaymentScreen', {id: id})}
          style={{
            borderWidth: 1,
            borderColor: appColors.gray1,
            borderRadius: 10,
            paddingVertical: 10,
          }}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              flex: 1,
            }}>
            <Octicons name="plus-circle" size={24} />
          </View>
        </TouchableOpacity>
      </SectionComponent>

      <SpaceComponent height={30} />

      <SectionComponent styles={{alignItems: 'center'}}>
        <ButtonComponent
          onPress={handleLogout}
          type="primary"
          text="Log out"></ButtonComponent>
      </SectionComponent>

      <SpaceComponent height={90} />
    </ContainerComponent>
  );
};

export default ProfileScreen;
