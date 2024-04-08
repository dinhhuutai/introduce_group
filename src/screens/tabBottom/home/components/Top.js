import {
  View,
  Image,
  TouchableOpacity,
  TextInput,
  Button,
  Text,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  ButtonComponent,
  RowComponent,
  SectionComponent,
  SpaceComponent,
  TextComponent,
} from '../../../../components';
import LinearGradient from 'react-native-linear-gradient';
import {appColors} from '../../../../constants/appColors';
import Octicons from 'react-native-vector-icons/Octicons';
import {fontFamilies} from '../../../../constants/fontFamilies';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {searchSelector} from '../../../../redux/reducers/searchReducer';
import distanceTwoDay from '../../../../utils/distanceTwoDay';

const Top = ({user}) => {
  const [date, setDate] = useState();
  const [address, setAddress] = useState();
  const [quantityPerson, setQuantityPerson] = useState();
  const [name, setName] = useState();

  const navigation = useNavigation();
  const search = useSelector(searchSelector);

  useEffect(() => {
    setDate({
      startDate: {
        d: search.searchDate.startDate.d,
        m: search.searchDate.startDate.m,
        y: search.searchDate.startDate.y,
      },
      endDate: {
        d: search.searchDate.endDate.d,
        m: search.searchDate.endDate.m,
        y: search.searchDate.endDate.y,
      },
    });

    setAddress(search.searchAddress);
    setQuantityPerson(search.searchQuantityPerson);
    setName(search.searchName);
  }, [search]);

  return (
    <LinearGradient
      style={[
        {
          borderBottomRightRadius: 40,
          flex: 1,
          paddingBottom: 0,
          overflow: 'hidden',
          height: 'auto',
        },
      ]}
      colors={['#2D2D2D', '#275B8B']}
      start={{x: 0.4, y: 0.5}}
      end={{x: 1, y: 0}}
      locations={[0, 1]}>
      <SpaceComponent height={50} />
      <RowComponent justify="space-between">
        <SectionComponent>
          <TouchableOpacity
            onPress={() => navigation.navigate('ProfileScreen')}>
            <Image
              style={{width: 35, height: 35, borderRadius: 50}}
              source={
                user?.avatar
                  ? {uri: user?.avatar}
                  : require('../../../../assets/images/logo.png')
              }
            />
          </TouchableOpacity>
        </SectionComponent>
        <SectionComponent>
          <TouchableOpacity
            onPress={() => navigation.navigate('SelectAddressScreen')}>
            <RowComponent>
              <Octicons name="location" size={18} color={appColors.white} />
              <SpaceComponent width={10} />
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={{
                  fontFamily: fontFamilies.bold,
                  color: appColors.white,
                  maxWidth: 200,
                }}>{`${address?.commune?.name ? address?.commune?.name : ''}${
                address?.commune?.name ? ',' : ''
              } ${address?.district?.name ? address?.district?.name : ''}${
                address?.district?.name ? ',' : ''
              } ${address?.province?.name}`}</Text>
            </RowComponent>
          </TouchableOpacity>
        </SectionComponent>
        <SectionComponent>
          <TouchableOpacity onPress={() => navigation.navigate('NoticeScreen')}>
            <Octicons name="bell" size={24} color={appColors.white} />
          </TouchableOpacity>
        </SectionComponent>
      </RowComponent>
      <SpaceComponent height={8} />
      <SectionComponent>
        <TouchableOpacity
          onPress={() => navigation.navigate('SelectDateScreen')}
          style={{
            borderWidth: 1,
            borderColor: appColors.white,
            borderRadius: 10,
            paddingHorizontal: 16,
            paddingVertical: 16,
          }}>
          <SectionComponent>
            <RowComponent>
              <Octicons name="clock" size={20} color={appColors.white} />
              <SpaceComponent width={30} />
              <TextComponent
                text={
                  date?.startDate.d
                    ? `${
                        date?.startDate.d < 10
                          ? '0' + date?.startDate.d
                          : date?.startDate.d
                      }/${
                        date?.startDate.m < 10
                          ? '0' + date?.startDate.m
                          : date?.startDate.m
                      }/${date?.startDate.y}`
                    : 'Check in - Check out'
                }
                font={fontFamilies.semiBold}
                size={16}
                color={appColors.white}
              />
            </RowComponent>
          </SectionComponent>
          <View
            style={{
              width: '100%',
              height: 1,
              backgroundColor: appColors.white,
              marginBottom: 20,
            }}></View>
          <RowComponent styles={{paddingHorizontal: 16}}>
            <Octicons name="calendar" size={20} color={appColors.white} />
            <SpaceComponent width={30} />
            <TextComponent
              text={
                distanceTwoDay(
                  date?.startDate.d,
                  date?.startDate.m,
                  date?.startDate.y,
                  date?.endDate.d,
                  date?.endDate.m,
                  date?.endDate.y,
                )
                  ? `${distanceTwoDay(
                      date?.startDate.d,
                      date?.startDate.m,
                      date?.startDate.y,
                      date?.endDate.d,
                      date?.endDate.m,
                      date?.endDate.y,
                    )} Night`
                  : 'Check in - Check out'
              }
              font={fontFamilies.semiBold}
              size={16}
              color={appColors.white}
            />
          </RowComponent>
        </TouchableOpacity>
      </SectionComponent>

      <SectionComponent>
        <TouchableOpacity
          onPress={() => navigation.navigate('SelectRoomTypeScreen')}
          style={{
            borderWidth: 1,
            borderColor: appColors.white,
            borderRadius: 10,
            paddingHorizontal: 32,
            paddingVertical: 14,
          }}>
          <RowComponent>
            <Octicons name="person" size={20} color={appColors.white} />
            <SpaceComponent width={30} />

            <TextComponent
              text={`${quantityPerson?.adult} adult - ${quantityPerson?.kid} kid`}
              font={fontFamilies.semiBold}
              size={16}
              color={appColors.white}
            />
          </RowComponent>
        </TouchableOpacity>
      </SectionComponent>

      <SectionComponent>
        <RowComponent>
          <TouchableOpacity
            onPress={() => navigation.navigate('SearchNameHotelScreen')}
            style={{
              flex: 1,
              borderWidth: 1,
              borderColor: appColors.white,
              borderRadius: 10,
              paddingHorizontal: 16,
            }}>
            <View style={{flex: 1, justifyContent: 'center'}}>
              <TextComponent
                text={`${name ? name : 'Find the best Hotels'}`}
                color={appColors.white}
                font={fontFamilies.semiBold}
                size={14}
              />
            </View>
          </TouchableOpacity>
          <SpaceComponent width={10} />
          <TouchableOpacity
            onPress={() => navigation.navigate('SearchScreen')}
            style={{
              width: 51,
              height: 51,
              backgroundColor: appColors.primary,
              borderRadius: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Octicons name="search" size={24} color={appColors.white} />
          </TouchableOpacity>
        </RowComponent>
      </SectionComponent>
    </LinearGradient>
  );
};

export default Top;
